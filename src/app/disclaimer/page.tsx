import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Disclaimer",
  description: "Legal disclaimer for SupportReply AI.",
};

export default function DisclaimerPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <section className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight">Legal Disclaimer</h1>
        <p className="mt-3 text-sm text-black/70">Last updated: March 1, 2026</p>

        <div className="mt-8 space-y-4 text-sm leading-7 text-black/80">
          <p>
            SupportReply AI and all generated content are informational tools only and do not constitute
            legal, financial, tax, or regulatory advice.
          </p>
          <p>
            No attorney-client, fiduciary, or professional advisory relationship is created by using this
            service. You should consult qualified counsel for requirements in your jurisdiction and industry.
          </p>
          <p>
            AI outputs may contain errors and must be independently reviewed before being sent to customers
            or used for compliance-sensitive scenarios, including refunds, disputes, chargebacks, and
            retention offers.
          </p>
          <p>
            You must not rely on outputs as the sole basis for decisions with legal, financial, tax,
            employment, insurance, healthcare, or other high-risk impacts without qualified professional
            review.
          </p>
          <p>
            You are solely responsible for final communications sent to customers, policy promises made, and
            compliance with refund, cancellation, advertising, and dispute-resolution laws applicable to your
            business.
          </p>
          <p>If you do not agree with these limitations, do not use the service.</p>
        </div>
      </section>
    </main>
  );
}
