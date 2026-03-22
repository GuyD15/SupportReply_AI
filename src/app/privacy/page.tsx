import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for SupportReply AI. Learn how we collect, use, and protect your personal data.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <section className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-3 text-sm text-black/70">Last updated: March 1, 2026</p>

        <div className="mt-8 space-y-4 text-sm leading-7 text-black/80">
          <p>
            SupportReply AI collects account information, billing-related identifiers, and content you
            submit to generate replies and save playbooks. We use this information to operate the service,
            prevent abuse, and provide support.
          </p>
          <p>
            We do not sell personal data. Payment processing is handled by Stripe, and authentication and
            session data is processed through our service providers as needed to run the product.
          </p>
          <p>
            For customer data you submit, you are the data controller (or business), and we act as your
            processor (or service provider) for providing the service. You are responsible for lawful
            notice, consent, and processing instructions.
          </p>
          <p>
            Legal bases may include contract performance, legitimate interests, legal obligations, and
            consent where required.
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
            disputes, and enforce agreements.
          </p>
          <p>
            Depending on your jurisdiction, you may have rights to access, correction, deletion,
            portability, objection, and restriction of your personal data. To exercise these rights, contact
            us at the address below.
          </p>
          <p>
            If data is transferred across borders, we ensure a valid legal transfer mechanism is in place
            where required (for example, Standard Contractual Clauses or equivalent safeguards).
          </p>
          <p>
            To request account deletion or data access, email us at{" "}
            <a
              href="mailto:guywdomino.dev@gmail.com"
              className="underline transition hover:text-black"
            >
              guywdomino.dev@gmail.com
            </a>
            .
          </p>
          <p>
            <strong>Privacy contact:</strong> ReplyOps — guywdomino.dev@gmail.com
          </p>
        </div>
      </section>
    </main>
  );
}
