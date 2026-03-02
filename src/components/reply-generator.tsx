"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  generateReply,
  toGmailExport,
  toIntercomSnippet,
  toZendeskMacro,
  type GeneratorInput,
} from "@/lib/reply-engine";
import type { GeneratorTemplate, PolicyMode, ToneMode } from "@/lib/templates";

type SavedPlaybook = {
  id: string;
  slug: string;
  title: string;
  tone: ToneMode;
  policy: PolicyMode;
  input: {
    customerName: string;
    orderRef: string;
    issueDetails: string;
    requestedOutcome: string;
  };
  updatedAt: string;
};

type UsageResponse = {
  isPro?: boolean;
  freeLimit?: number;
  freeUsesRemaining?: number;
  reachedFreeLimit?: boolean;
  lockedByTemplate?: boolean;
  allowed?: boolean;
  message?: string;
};

export function ReplyGenerator({ template }: { template: GeneratorTemplate }) {
  const [tone, setTone] = useState<ToneMode>("friendly");
  const [policy, setPolicy] = useState<PolicyMode>("within-policy");
  const [input, setInput] = useState<GeneratorInput>({
    customerName: "",
    orderRef: "",
    issueDetails: "",
    requestedOutcome: "",
  });

  const [generatedReply, setGeneratedReply] = useState("");

  const [exportType, setExportType] = useState<"gmail" | "zendesk" | "intercom">("gmail");
  const [playbookTitle, setPlaybookTitle] = useState("");
  const [authLoading, setAuthLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [usageLoading, setUsageLoading] = useState(true);
  const [lockedByTemplate, setLockedByTemplate] = useState(false);
  const [reachedFreeLimit, setReachedFreeLimit] = useState(false);
  const [freeUsesRemaining, setFreeUsesRemaining] = useState(5);
  const [freeLimit, setFreeLimit] = useState(5);
  const [upgradeLoading, setUpgradeLoading] = useState(false);
  const [playbookMessage, setPlaybookMessage] = useState("");
  const [savedPlaybooks, setSavedPlaybooks] = useState<SavedPlaybook[]>([]);

  useEffect(() => {
    async function loadMe() {
      try {
        const response = await fetch("/api/me", { cache: "no-store" });
        const data = (await response.json()) as {
          authenticated?: boolean;
          isPro?: boolean;
        };

        setAuthenticated(Boolean(data.authenticated));
        setIsPro(Boolean(data.isPro));
      } finally {
        setAuthLoading(false);
      }
    }

    void loadMe();
  }, []);

  useEffect(() => {
    async function loadUsage() {
      setUsageLoading(true);
      const response = await fetch(`/api/usage?slug=${template.slug}`, { cache: "no-store" });
      const data = (await response.json().catch(() => null)) as UsageResponse | null;

      if (data) {
        setIsPro(Boolean(data.isPro));
        setFreeLimit(Number(data.freeLimit ?? 5));
        setFreeUsesRemaining(Number(data.freeUsesRemaining ?? 0));
        setReachedFreeLimit(Boolean(data.reachedFreeLimit));
        setLockedByTemplate(Boolean(data.lockedByTemplate));
      }

      setUsageLoading(false);
    }

    void loadUsage();
  }, [template.slug, authenticated]);

  useEffect(() => {
    async function loadPlaybooks() {
      if (!authenticated || !isPro) {
        setSavedPlaybooks([]);
        return;
      }

      const response = await fetch(`/api/playbooks?slug=${template.slug}`, {
        cache: "no-store",
      });

      if (!response.ok) {
        setSavedPlaybooks([]);
        return;
      }

      const data = (await response.json()) as { playbooks?: Array<Record<string, unknown>> };
      const next = (data.playbooks ?? []).map((playbook) => ({
        id: String(playbook.id ?? ""),
        slug: String(playbook.slug ?? ""),
        title: String(playbook.title ?? ""),
        tone: String(playbook.tone ?? "friendly") as ToneMode,
        policy: String(playbook.policy ?? "within-policy") as PolicyMode,
        input: {
          customerName: String(playbook.customerName ?? ""),
          orderRef: String(playbook.orderRef ?? ""),
          issueDetails: String(playbook.issueDetails ?? ""),
          requestedOutcome: String(playbook.requestedOutcome ?? ""),
        },
        updatedAt: String(playbook.updatedAt ?? ""),
      }));
      setSavedPlaybooks(next);
    }

    void loadPlaybooks();
  }, [authenticated, isPro, template.slug]);

  const draftReply = useMemo(() => generateReply(template, tone, policy, input), [
    input,
    policy,
    template,
    tone,
  ]);

  useEffect(() => {
    setGeneratedReply(draftReply);
  }, [template.slug]);

  const exportOutput = useMemo(() => {
    const subject = `${template.title} - ${input.orderRef || "customer case"}`;

    if (exportType === "gmail") {
      return toGmailExport(subject, generatedReply);
    }
    if (exportType === "zendesk") {
      return toZendeskMacro(template.title, generatedReply);
    }

    return toIntercomSnippet(template.title, generatedReply);
  }, [exportType, generatedReply, input.orderRef, template.title]);

  function updateField(field: keyof GeneratorInput, value: string) {
    setInput((prev) => ({ ...prev, [field]: value }));
  }

  async function copyExport() {
    await navigator.clipboard.writeText(exportOutput);
  }

  async function startUpgrade() {
    setPlaybookMessage("");
    setUpgradeLoading(true);

    const response = await fetch("/api/stripe/checkout", {
      method: "POST",
    });

    setUpgradeLoading(false);

    if (response.status === 401) {
      const next = encodeURIComponent(window.location.pathname);
      window.location.href = `/login?next=${next}`;
      return;
    }

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      setPlaybookMessage(data?.error || "Unable to start checkout.");
      return;
    }

    const data = (await response.json()) as { url?: string };

    if (!data.url) {
      setPlaybookMessage("Checkout URL unavailable.");
      return;
    }

    window.location.href = data.url;
  }

  async function handleGenerate() {
    setPlaybookMessage("");

    const response = await fetch("/api/usage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug: template.slug }),
    });

    const data = (await response.json().catch(() => null)) as UsageResponse | null;

    if (data) {
      setIsPro(Boolean(data.isPro));
      setFreeLimit(Number(data.freeLimit ?? 5));
      setFreeUsesRemaining(Number(data.freeUsesRemaining ?? 0));
      setReachedFreeLimit(Boolean(data.reachedFreeLimit));
      setLockedByTemplate(Boolean(data.lockedByTemplate));
    }

    if (!response.ok || !data?.allowed) {
      setPlaybookMessage(data?.message || "Unable to generate right now.");
      return;
    }

    setGeneratedReply(draftReply);
  }

  async function savePlaybook() {
    setPlaybookMessage("");

    if (!authenticated) {
      const next = encodeURIComponent(window.location.pathname);
      window.location.href = `/login?next=${next}`;
      return;
    }

    if (!isPro) {
      setPlaybookMessage("Upgrade to Pro to save playbooks.");
      return;
    }

    const title = playbookTitle.trim() || `${template.title} playbook`;

    const response = await fetch("/api/playbooks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug: template.slug,
        title,
        tone,
        policy,
        input,
      }),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      setPlaybookMessage(data?.error || "Unable to save playbook.");
      return;
    }

    const data = (await response.json()) as {
      playbook?: {
        id: string;
        slug: string;
        title: string;
        tone: ToneMode;
        policy: PolicyMode;
        customerName: string;
        orderRef: string;
        issueDetails: string;
        requestedOutcome: string;
        updatedAt: string;
      };
    };

    if (!data.playbook) {
      return;
    }

    const nextPlaybook: SavedPlaybook = {
      id: data.playbook.id,
      slug: data.playbook.slug,
      title: data.playbook.title,
      tone: data.playbook.tone,
      policy: data.playbook.policy,
      input: {
        customerName: data.playbook.customerName,
        orderRef: data.playbook.orderRef,
        issueDetails: data.playbook.issueDetails,
        requestedOutcome: data.playbook.requestedOutcome,
      },
      updatedAt: data.playbook.updatedAt,
    };

    setSavedPlaybooks((prev) => [nextPlaybook, ...prev].slice(0, 50));
    setPlaybookTitle("");
    setPlaybookMessage("Playbook saved.");
  }

  function loadPlaybook(playbook: SavedPlaybook) {
    setTone(playbook.tone);
    setPolicy(playbook.policy);
    setInput(playbook.input);
    setGeneratedReply(generateReply(template, playbook.tone, playbook.policy, playbook.input));
  }

  if (authLoading || usageLoading) {
    return (
      <section className="mt-8 rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        <p className="text-sm text-black/60">Checking access...</p>
      </section>
    );
  }

  if (lockedByTemplate) {
    return (
      <section className="mt-8 rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">This generator is Pro-only</h2>
        <p className="mt-2 text-sm text-black/70">
          Free tier includes only 2 templates and up to 5 generations per month. Upgrade to unlock all
          generators.
        </p>
        <p className="mt-1 text-sm text-black/60">Get unlimited generations, all templates, and saved playbooks with Pro.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={startUpgrade}
            disabled={upgradeLoading}
            className="rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:bg-zinc-700"
          >
            {upgradeLoading ? "Opening checkout..." : "Start Pro plan"}
          </button>
          <Link
            href="/pricing"
            className="rounded-xl border border-black/20 bg-white px-4 py-2.5 text-sm font-medium transition hover:bg-zinc-100"
          >
            View pricing
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8 grid gap-6 rounded-3xl border border-black/10 bg-white p-4 shadow-sm sm:p-6 lg:grid-cols-2">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Generator</h2>
        <p className="text-sm text-black/70">{template.cta}</p>
        {!isPro && (
          <p className="text-xs text-black/60">
            Free uses remaining this month: {freeUsesRemaining} / {freeLimit}. Upgrade for unlimited usage.
          </p>
        )}

        <div className="grid gap-3">
          <label className="text-sm font-medium">Customer name</label>
          <input
            className="rounded-xl border border-black/15 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-black/30 focus:bg-white"
            value={input.customerName}
            onChange={(event) => updateField("customerName", event.target.value)}
            placeholder="Alex"
          />

          <label className="text-sm font-medium">Order or account reference</label>
          <input
            className="rounded-xl border border-black/15 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-black/30 focus:bg-white"
            value={input.orderRef}
            onChange={(event) => updateField("orderRef", event.target.value)}
            placeholder="ORD-10294"
          />

          <label className="text-sm font-medium">Issue details</label>
          <textarea
            className="min-h-24 rounded-xl border border-black/15 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-black/30 focus:bg-white"
            value={input.issueDetails}
            onChange={(event) => updateField("issueDetails", event.target.value)}
            placeholder="Customer reported..."
          />

          <label className="text-sm font-medium">Requested outcome</label>
          <textarea
            className="min-h-20 rounded-xl border border-black/15 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-black/30 focus:bg-white"
            value={input.requestedOutcome}
            onChange={(event) => updateField("requestedOutcome", event.target.value)}
            placeholder="Refund, replacement, cancellation confirmation..."
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Tone</label>
            <select
              className="w-full rounded-xl border border-black/15 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-black/30 focus:bg-white"
              value={tone}
              onChange={(event) => setTone(event.target.value as ToneMode)}
            >
              <option value="friendly">Friendly</option>
              <option value="firm">Firm</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Policy mode</label>
            <select
              className="w-full rounded-xl border border-black/15 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-black/30 focus:bg-white"
              value={policy}
              onChange={(event) => setPolicy(event.target.value as PolicyMode)}
            >
              <option value="within-policy">Within policy</option>
              <option value="out-of-policy">Out of policy</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={reachedFreeLimit && !isPro}
            className="rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-700"
          >
            Generate reply
          </button>
          {reachedFreeLimit && !isPro && (
            <button
              type="button"
              onClick={startUpgrade}
              className="rounded-xl border border-black/20 bg-white px-4 py-2.5 text-sm font-medium transition hover:bg-zinc-100"
            >
              Upgrade for unlimited replies
            </button>
          )}
        </div>

        <div className="rounded-2xl border border-black/10 bg-zinc-50/60 p-4">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-semibold">Saved playbooks (Pro)</h3>
            {isPro ? (
              <span className="rounded-lg border border-black/20 bg-white px-3 py-1.5 text-xs font-medium">Pro active</span>
            ) : authenticated ? (
              <button
                type="button"
                onClick={startUpgrade}
                disabled={upgradeLoading}
                className="rounded-lg border border-black/20 bg-white px-3 py-1.5 text-xs font-medium transition hover:bg-zinc-100 disabled:bg-black/5"
              >
                {upgradeLoading ? "Opening checkout..." : "Upgrade"}
              </button>
            ) : (
              <Link className="text-xs font-medium underline" href={`/login?next=${encodeURIComponent(`/reply/${template.slug}`)}`}>
                Log in to upgrade
              </Link>
            )}
          </div>

          <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
            <input
              className="flex-1 rounded-xl border border-black/15 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-black/30"
              value={playbookTitle}
              onChange={(event) => setPlaybookTitle(event.target.value)}
              placeholder="Playbook name"
            />
            <button
              type="button"
              onClick={savePlaybook}
              disabled={!isPro}
              className="rounded-xl bg-black px-3 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-black/40"
            >
              Save
            </button>
          </div>

          <div className="mt-3 space-y-2">
            {savedPlaybooks.length === 0 ? (
              <p className="text-xs text-black/60">
                {isPro ? "No saved playbooks for this page yet." : "Upgrade to Pro to unlock saved playbooks."}
              </p>
            ) : (
              savedPlaybooks.map((playbook) => (
                <button
                  key={playbook.id}
                  type="button"
                  onClick={() => loadPlaybook(playbook)}
                  className="block w-full rounded-xl border border-black/15 bg-white px-3 py-2.5 text-left text-sm transition hover:border-black/25 hover:bg-zinc-100"
                >
                  {playbook.title}
                </button>
              ))
            )}
          </div>
          {playbookMessage && <p className="mt-2 text-xs text-black/70">{playbookMessage}</p>}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Generated reply</h2>
        <textarea
          className="min-h-72 w-full rounded-xl border border-black/15 bg-zinc-50 px-3 py-2.5 text-sm"
          readOnly
          value={generatedReply}
        />

        <div className="grid gap-2 sm:grid-cols-[1fr_auto_auto]">
          <select
            className="rounded-xl border border-black/15 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-black/30"
            value={exportType}
            onChange={(event) => setExportType(event.target.value as "gmail" | "zendesk" | "intercom")}
          >
            <option value="gmail">Gmail export</option>
            <option value="zendesk">Zendesk macro format</option>
            <option value="intercom">Intercom snippet format</option>
          </select>

          <button
            type="button"
            onClick={copyExport}
            className="rounded-xl border border-black/20 bg-white px-3 py-2.5 text-sm font-medium transition hover:bg-zinc-100 sm:min-w-28"
          >
            Copy export
          </button>
        </div>

        <textarea
          className="min-h-48 w-full rounded-xl border border-black/15 bg-zinc-50 px-3 py-2.5 font-mono text-xs"
          readOnly
          value={exportOutput}
        />
      </div>
    </section>
  );
}
