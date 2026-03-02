"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type MeResponse = {
  authenticated?: boolean;
  isPro?: boolean;
};

export function PricingActions() {
  const [loadingMe, setLoadingMe] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadMe() {
      try {
        const response = await fetch("/api/me", { cache: "no-store" });
        const data = (await response.json()) as MeResponse;
        setAuthenticated(Boolean(data.authenticated));
        setIsPro(Boolean(data.isPro));
      } finally {
        setLoadingMe(false);
      }
    }

    void loadMe();
  }, []);

  async function openCheckout() {
    setMessage("");
    setPending(true);
    const response = await fetch("/api/stripe/checkout", { method: "POST" });
    setPending(false);

    if (response.status === 401) {
      window.location.href = "/login?next=/pricing";
      return;
    }

    const data = (await response.json().catch(() => null)) as { url?: string; error?: string } | null;

    if (!response.ok || !data?.url) {
      setMessage(data?.error || "Unable to open checkout.");
      return;
    }

    window.location.href = data.url;
  }

  async function openBillingPortal() {
    setMessage("");
    setPending(true);
    const response = await fetch("/api/stripe/portal", { method: "POST" });
    setPending(false);

    if (response.status === 401) {
      window.location.href = "/login?next=/pricing";
      return;
    }

    const data = (await response.json().catch(() => null)) as { url?: string; error?: string } | null;

    if (!response.ok || !data?.url) {
      setMessage(data?.error || "Unable to open billing portal.");
      return;
    }

    window.location.href = data.url;
  }

  if (loadingMe) {
    return <p className="text-sm text-black/60">Checking account...</p>;
  }

  if (!authenticated) {
    return (
      <div className="flex flex-wrap gap-2">
        <Link href="/signup" className="rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800">
          Create free account
        </Link>
        <Link href="/login?next=/pricing" className="rounded-xl border border-black/20 bg-white px-4 py-2.5 text-sm font-medium transition hover:bg-zinc-100">
          Log in
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {isPro ? (
          <button
            type="button"
            onClick={openBillingPortal}
            disabled={pending}
            className="rounded-xl border border-black/20 bg-white px-4 py-2.5 text-sm font-medium transition hover:bg-zinc-100 disabled:bg-zinc-100"
          >
            {pending ? "Opening..." : "Manage billing"}
          </button>
        ) : (
          <button
            type="button"
            onClick={openCheckout}
            disabled={pending}
            className="rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:bg-zinc-700"
          >
            {pending ? "Opening..." : "Start Pro plan"}
          </button>
        )}
      </div>
      {message && <p className="text-sm text-black/60">{message}</p>}
    </div>
  );
}
