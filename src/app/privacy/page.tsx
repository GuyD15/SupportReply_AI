import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for SupportReply AI.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <section className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-3 text-sm text-black/70">Last updated: March 1, 2026</p>

        <div className="mt-8 space-y-4 text-sm leading-7 text-black/80">
          <p>
            <strong>Important:</strong> This is a policy template. Update entity/contact details and
            confirm compliance with counsel for your jurisdictions.
          </p>
          <p>
            SupportReply AI collects account information, billing-related identifiers, and content you
            submit to generate replies and save playbooks. We use this information to operate the service,
            prevent abuse, and provide support.
          </p>
          <p>
            We do not sell personal data. Payment processing is handled by Stripe, and authentication/
            session data is processed through our service providers as needed to run the product.
          </p>
          <p>
            For customer data you submit, you are the data controller (or business), and we act as your
            processor (or service provider) for providing the service. You are responsible for lawful
            notice, consent, and processing instructions.
          </p>
          <p>
            Legal bases may include contract performance, legitimate interests, legal obligations, and
            consent where required. If your use requires a Data Processing Addendum, execute one before
            production.
          </p>
          <p>
            You are responsible for ensuring that any customer data entered into the product is lawfully
            collected and processed under your applicable privacy laws and contracts.
          </p>
          <p>
            We implement reasonable security controls, but no system is guaranteed to be 100% secure. You
            should avoid entering highly sensitive data unless required and legally permitted.
          </p>
          <p>
            We retain data for as long as needed to provide the service, satisfy legal obligations, resolve
            disputes, and enforce agreements. Retention periods should be configured to match your
            compliance requirements.
          </p>
          <p>
            Depending on jurisdiction, data subjects may have rights to access, correction, deletion,
            portability, objection, restriction, and appeal of privacy decisions. You must handle customer
            requests related to your data, and we will provide reasonable assistance where required.
          </p>
          <p>
            If data is transferred across borders, you are responsible for ensuring a valid transfer
            mechanism (for example, SCCs or equivalent safeguards) where legally required.
          </p>
          <p>
            To request account deletion or data access, contact your legal/admin channel for this
            deployment.
          </p>
          <p>
            Privacy contact: guywdomino.dev@gmail.com. Data controller identity: ReplyOps, [MAILING ADDRESS
            REQUIRED BEFORE PRODUCTION].
          </p>
        </div>
      </section>
    </main>
  );
}
