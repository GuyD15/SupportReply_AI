import type { GeneratorTemplate, PolicyMode, ToneMode } from "@/lib/templates";

export type GeneratorInput = {
  customerName: string;
  orderRef: string;
  issueDetails: string;
  requestedOutcome: string;
};

function toneFragments(tone: ToneMode) {
  if (tone === "firm") {
    return {
      opening: "Thank you for your message.",
      transition: "Here is the current status.",
      close: "Please reply if you need anything else.",
    };
  }

  return {
    opening: "Thanks so much for reaching out.",
    transition: "I completely understand the concern.",
    close: "I’m here if you’d like any help with next steps.",
  };
}

function actionLine(slug: GeneratorTemplate["slug"], policy: PolicyMode) {
  const policyNote =
    policy === "within-policy"
      ? "This request is within policy."
      : "This request is out of policy.";

  const lines: Record<GeneratorTemplate["slug"], string> = {
    "refund-approved": "Your refund has been approved and is now processing through your payment provider.",
    "refund-denied-out-of-policy": "We’re unable to approve a refund for this request due to policy limits.",
    "shipping-delay": "Your order is delayed in transit, and we are monitoring the shipment with our carrier.",
    "cancellation-request": "We reviewed your cancellation request and checked the order status in real time.",
    "chargeback-response": "We want to resolve this directly with you before the dispute process causes extra delays.",
    "angry-customer-apology-solution": "You’re right to expect better, and we’re taking ownership of this issue.",
    "wrong-item-received": "You received the wrong item, and we can fix this immediately.",
    "damaged-item": "We’re sorry your item arrived damaged, and we can resolve it quickly.",
    "subscription-retention-offer": "Before cancellation, we can offer an option that may fit your needs better.",
    "apologize-for-the-delay-follow-up": "Thank you for your patience, and I’m sorry for the delay in our follow-up.",
  };

  return `${lines[slug]} ${policyNote}`;
}

export function generateReply(
  template: GeneratorTemplate,
  tone: ToneMode,
  policy: PolicyMode,
  input: GeneratorInput,
) {
  const textTone = toneFragments(tone);
  const customer = input.customerName || "there";
  const orderRef = input.orderRef || "N/A";

  return `Hi ${customer},

${textTone.opening} ${textTone.transition}

${actionLine(template.slug, policy)}

Issue summary: ${input.issueDetails || "Customer requested an update."}
Requested outcome: ${input.requestedOutcome || "Fastest available resolution."}
Order reference: ${orderRef}

Next step: We’ll keep you updated until this is fully resolved.

${textTone.close}
Support Team`;
}

export function toGmailExport(subject: string, body: string) {
  return `Subject: ${subject}\n\n${body}`;
}

export function toZendeskMacro(title: string, body: string) {
  const escaped = body.replace(/\n/g, "\\n").replace(/"/g, '\\"');
  return `{
  "title": "${title}",
  "actions": [
    {
      "field": "comment_value_html",
      "value": "${escaped}"
    }
  ]
}`;
}

export function toIntercomSnippet(title: string, body: string) {
  return `Title: ${title}\n\nSnippet:\n${body}`;
}
