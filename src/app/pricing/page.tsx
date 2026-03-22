import type { Metadata } from "next";
import { PricingActions } from "@/components/pricing/pricing-actions";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "SupportReply AI pricing plans. Start free with 2 generators and 5 generations per month. Upgrade to Pro for unlimited access, all 10 generators, and saved playbooks.",
  keywords: [
    "support reply AI pricing",
    "customer support software pricing",
    "AI reply generator plans",
    "support team software subscription",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I need a credit card to try SupportReply AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. You can start on the free tier without a credit card.",
      },
    },
    {
      "@type": "Question",
      name: "Can I cancel Pro anytime?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can manage or cancel your subscription from the billing portal at any time. After cancellation, your Pro access remains active through the end of the current billing period. You will not be charged for the next cycle.",
      },
    },
    {
      "@type": "Question",
      name: "What happens when my billing period ends after cancellation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Once your current billing period ends, your account automatically reverts to the free tier. You will retain access to the two free generators with the standard monthly usage cap.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if I request a refund?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If a refund is issued, Pro access is revoked immediately upon processing of the refund. To regain Pro access, you will need to start a new subscription.",
      },
    },
    {
      "@type": "Question",
      name: "What do I get with Pro?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pro unlocks all 10 generators, removes monthly usage limits, and enables saved playbooks for repeat customer scenarios.",
      },
    },
  ],
};

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
        <p className="inline-block rounded-full border border-black/15 bg-zinc-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
          Pricing
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Choose the plan that fits your support volume
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-black/70 sm:text-base">
          Start free for everyday replies, then upgrade when you need full template access,
          unlimited generations, and reusable playbooks for your team.
        </p>
        <p className="mt-2 text-sm text-black/60">
          Free tier: 2 generators + 5 generations/month. Pro unlocks all generators and unlimited usage.
        </p>
        <p className="mt-1 text-sm text-black/60">No credit card required to start free.</p>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
          <p className="inline-block rounded-full border border-black/15 bg-zinc-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide">
            Most popular
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Pro</h2>
          <p className="mt-2 text-black/70">
            For support teams that need faster, consistent replies across complex customer issues.
          </p>
          <p className="mt-5 text-4xl font-semibold tracking-tight">
            $79<span className="text-base font-medium text-black/60">/month</span>
          </p>

          <ul className="mt-5 space-y-2 text-sm text-black/80">
            <li>All 10 support generators and exports</li>
            <li>Unlimited generations (no monthly cap)</li>
            <li>Saved playbooks for repeat workflows</li>
            <li>Tone + policy controls for high-risk replies</li>
            <li>Billing portal for self-serve subscription management</li>
            <li>Cancel anytime — keep access through current billing period</li>
          </ul>

          <div className="mt-6">
            <PricingActions />
          </div>
        </article>

        <aside className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
          <h3 className="text-lg font-semibold">Why teams upgrade</h3>
          <ul className="mt-3 space-y-2 text-sm text-black/70">
            <li>Respond faster with consistent, policy-safe language</li>
            <li>Reduce escalations by using proven playbook responses</li>
            <li>Handle more tickets without growing headcount</li>
            <li>Keep billing flexible with self-serve subscription management</li>
          </ul>
        </aside>
      </section>

      <section className="mt-6 rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
        <h3 className="text-lg font-semibold">Free vs Pro</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-black/10 bg-zinc-50 p-4">
            <p className="text-sm font-semibold">Free</p>
            <ul className="mt-2 space-y-1.5 text-sm text-black/70">
              <li>2 generators</li>
              <li>5 generations per month</li>
              <li>No saved playbooks</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-black/10 bg-zinc-50 p-4">
            <p className="text-sm font-semibold">Pro</p>
            <ul className="mt-2 space-y-1.5 text-sm text-black/70">
              <li>All 10 generators</li>
              <li>Unlimited generations</li>
              <li>Saved playbooks for repeat cases</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
        <h3 className="text-lg font-semibold">Frequently asked questions</h3>
        <div className="mt-4 space-y-4 text-sm text-black/75">
          <div>
            <p className="font-medium text-black">
              Do I need a credit card to try SupportReply AI?
            </p>
            <p className="mt-1">No. You can start on the free tier without a credit card.</p>
          </div>
          <div>
            <p className="font-medium text-black">Can I cancel Pro anytime?</p>
            <p className="mt-1">
              Yes. You can manage or cancel your subscription from the billing portal at any time.
              After you cancel, your Pro access stays active through the end of the current billing
              period — you will not be charged for the next cycle.
            </p>
          </div>
          <div>
            <p className="font-medium text-black">
              What happens when my billing period ends after cancellation?
            </p>
            <p className="mt-1">
              Your account automatically reverts to the free tier. You will still have access to the
              two free generators with the standard monthly usage cap.
            </p>
          </div>
          <div>
            <p className="font-medium text-black">What happens if I request a refund?</p>
            <p className="mt-1">
              If a refund is processed on your account, Pro access is revoked immediately. To regain
              Pro access, start a new subscription.
            </p>
          </div>
          <div>
            <p className="font-medium text-black">What do I get with Pro?</p>
            <p className="mt-1">
              Pro unlocks all 10 generators, removes monthly usage limits, and enables saved
              playbooks for repeat customer scenarios.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
