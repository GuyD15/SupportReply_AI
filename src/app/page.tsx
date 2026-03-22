import type { Metadata } from "next";
import Link from "next/link";
import { isFreeTemplateSlug, templates } from "@/lib/templates";

export const metadata: Metadata = {
  title: "SupportReply AI — AI-Powered Customer Support Reply Generator",
  description:
    "Generate policy-safe customer support replies in seconds. 10 high-impact templates for refunds, shipping delays, chargebacks, and angry customers. Export instantly to Gmail, Zendesk, and Intercom.",
  keywords: [
    "customer support reply generator",
    "AI support email template",
    "support ticket reply generator",
    "Zendesk macro template",
    "Intercom snippet generator",
    "refund reply template",
    "shipping delay email",
    "chargeback response template",
    "angry customer reply",
    "customer service AI tool",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SupportReply AI — AI-Powered Customer Support Reply Generator",
    description:
      "Generate policy-safe support replies in seconds. 10 high-impact templates. Export to Gmail, Zendesk, and Intercom.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SupportReply AI",
    description:
      "Generate support replies in seconds with AI. 10 high-impact templates. Export to Gmail, Zendesk, and Intercom.",
  },
};

const appSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SupportReply AI",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "AI-powered customer support reply generator with 10 high-impact templates. Export to Gmail, Zendesk, and Intercom.",
  url: "https://supportreply.ai",
  offers: [
    {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      name: "Free",
      description: "2 generators, 5 generations per month",
    },
    {
      "@type": "Offer",
      price: "79",
      priceCurrency: "USD",
      name: "Pro",
      description: "All 10 generators, unlimited generations, saved playbooks",
    },
  ],
};

export default function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />

      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition sm:p-10">
        <header className="max-w-3xl space-y-4">
          <p className="inline-block rounded-full border border-black/15 bg-zinc-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            Tool-first SEO support templates
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Resolve customer tickets faster with SupportReply AI
          </h1>
          <p className="text-base text-black/75 sm:text-lg">
            High-intent support reply generators with instant exports for Gmail, Zendesk macros, and
            Intercom snippets.
          </p>
          <p className="text-sm text-black/65">Start free in seconds. No credit card required.</p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Link
              href="/pricing"
              className="rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              See plans
            </Link>
            <Link
              href="/signup"
              className="rounded-xl border border-black/20 bg-white px-4 py-2.5 text-sm font-medium transition hover:bg-zinc-100"
            >
              Start free now
            </Link>
          </div>
        </header>
      </section>

      <section className="mt-6 rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition sm:mt-8 sm:p-8">
        <h2 className="text-2xl font-semibold">How SupportReply AI works</h2>
        <p className="mt-2 text-sm text-black/70">
          Three steps from ticket to ready-to-send reply.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-black/10 bg-zinc-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-black/50">Step 1</p>
            <h3 className="mt-1 text-base font-semibold">Choose a template</h3>
            <p className="mt-1 text-sm text-black/70">
              Pick from 10 high-impact scenarios — refunds, delays, chargebacks, angry customers,
              and more.
            </p>
          </div>
          <div className="rounded-2xl border border-black/10 bg-zinc-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-black/50">Step 2</p>
            <h3 className="mt-1 text-base font-semibold">Set tone and policy</h3>
            <p className="mt-1 text-sm text-black/70">
              Choose friendly or firm tone, within-policy or out-of-policy context, and fill in the
              customer details.
            </p>
          </div>
          <div className="rounded-2xl border border-black/10 bg-zinc-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-black/50">Step 3</p>
            <h3 className="mt-1 text-base font-semibold">Export and send</h3>
            <p className="mt-1 text-sm text-black/70">
              Copy the reply directly or export it as a Gmail draft, Zendesk macro, or Intercom
              snippet in one click.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition sm:mt-8 sm:p-8">
        <h2 className="text-2xl font-semibold">10 high-impact support generators</h2>
        <p className="mt-2 text-sm text-black/70">
          Every page includes the full generator, tone + policy controls, and Pro playbook saving.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <article
              key={template.slug}
              className="group rounded-2xl border border-black/10 bg-zinc-50 p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-black/20 hover:bg-white hover:shadow"
            >
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-black/55">
                {isFreeTemplateSlug(template.slug) ? "Free" : "Pro"}
              </p>
              <h3 className="text-base font-semibold tracking-tight">{template.title}</h3>
              <p className="mt-1 text-sm text-black/70">{template.pain}</p>
              <Link
                href={`/reply/${template.slug}`}
                className="mt-4 inline-flex rounded-xl bg-black px-3 py-2.5 text-sm font-medium text-white transition duration-200 group-hover:bg-zinc-800"
              >
                {isFreeTemplateSlug(template.slug) ? "Try free generator" : "Open generator"}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
