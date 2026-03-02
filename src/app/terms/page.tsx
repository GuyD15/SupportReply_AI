import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for SupportReply AI.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <section className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight">Terms of Service</h1>
        <p className="mt-3 text-sm text-black/70">Last updated: March 1, 2026</p>

        <div className="mt-8 space-y-4 text-sm leading-7 text-black/80">
          <p>
            <strong>Important:</strong> These terms are a strong template, not a substitute for legal
            advice. Have counsel review before production use.
          </p>
          <p>
            By using SupportReply AI, you agree to use the service only for lawful business purposes and in
            compliance with consumer protection, marketing, privacy, and industry-specific regulations that
            apply to you.
          </p>
          <p>
            The service provides AI-generated draft content. You are solely responsible for reviewing,
            editing, and approving all outputs before use. Generated outputs may be inaccurate,
            non-compliant, or unsuitable for your context.
          </p>
          <p>
            To the maximum extent permitted by law, the service is provided "as is" without warranties of
            any kind, and we disclaim implied warranties including merchantability, fitness for a particular
            purpose, and non-infringement.
          </p>
          <p>
            To the maximum extent permitted by law, we are not liable for indirect, incidental, special,
            consequential, exemplary, or punitive damages, or for lost profits, revenue, data, goodwill, or
            business interruption arising from your use of the service.
          </p>
          <p>
            To the maximum extent permitted by law, aggregate liability for any claim relating to the
            service is limited to the greater of: (a) amounts paid by you for the service in the 12 months
            before the claim, or (b) USD $100.
          </p>
          <p>
            Any claim must be brought within one year after the claim arises, or it is permanently barred to
            the fullest extent permitted by law.
          </p>
          <p>
            You agree to indemnify and hold harmless the service operator from claims, losses, liabilities,
            and costs arising from your content, your customer communications, or your legal non-compliance.
          </p>
          <p>
            <strong>Binding arbitration and class action waiver:</strong> Except where prohibited by law,
            disputes will be resolved by binding individual arbitration in Florida, United States, and not as
            a plaintiff or class member in any class, collective, or representative proceeding.
          </p>
          <p>
            <strong>Governing law and venue:</strong> These terms are governed by the laws of Florida, United
            States, without regard to conflicts principles. Court proceedings (if any) must be brought
            exclusively in Florida, United States.
          </p>
          <p>
            We may suspend or terminate access for suspected abuse, non-payment, legal risk, or policy
            violations. You remain responsible for obligations incurred before termination.
          </p>
          <p>
            You represent that you are not subject to sanctions or export restrictions that would prohibit
            use of the service and that you are authorized to bind your organization.
          </p>
          <p>
            Contact for legal notices: ReplyOps, guywdomino.dev@gmail.com, [MAILING ADDRESS REQUIRED BEFORE
            PRODUCTION].
          </p>
        </div>
      </section>
    </main>
  );
}
