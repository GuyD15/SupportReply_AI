export type TemplateSlug =
  | "refund-approved"
  | "refund-denied-out-of-policy"
  | "shipping-delay"
  | "cancellation-request"
  | "chargeback-response"
  | "angry-customer-apology-solution"
  | "wrong-item-received"
  | "damaged-item"
  | "subscription-retention-offer"
  | "apologize-for-the-delay-follow-up";

export type PolicyMode = "within-policy" | "out-of-policy";
export type ToneMode = "friendly" | "firm";

export type GeneratorTemplate = {
  slug: TemplateSlug;
  title: string;
  h1: string;
  description: string;
  pain: string;
  policyBoundary: string;
  keywords: string[];
  cta: string;
};

export const FREE_TEMPLATE_SLUGS: TemplateSlug[] = ["refund-approved", "shipping-delay"];

export function isFreeTemplateSlug(slug: TemplateSlug | string) {
  return FREE_TEMPLATE_SLUGS.includes(slug as TemplateSlug);
}

export const templates: GeneratorTemplate[] = [
  {
    slug: "refund-approved",
    title: "Refund Approved Reply Generator",
    h1: "Refund approved support reply generator",
    description:
      "Generate a clear, reassuring refund approved response with one click and export it to Gmail, Zendesk, or Intercom.",
    pain: "Customers want immediate confirmation that money is on the way.",
    policyBoundary: "Use when a refund is approved under normal policy.",
    keywords: ["refund approved email", "customer support refund response", "refund confirmation template"],
    cta: "Generate refund approved reply",
  },
  {
    slug: "refund-denied-out-of-policy",
    title: "Refund Denied (Out of Policy) Reply Generator",
    h1: "Refund denied out-of-policy reply generator",
    description:
      "Create a firm but empathetic no-refund message that explains policy limits and next best options.",
    pain: "Saying no without escalation or churn is hard.",
    policyBoundary: "Use when request is outside documented policy.",
    keywords: ["refund denied template", "out of policy refund response", "no refund customer support"],
    cta: "Generate refund denied reply",
  },
  {
    slug: "shipping-delay",
    title: "Shipping Delay Reply Generator",
    h1: "Shipping delay support reply generator",
    description:
      "Generate proactive shipping delay responses with apology, timeline, and confidence-restoring next steps.",
    pain: "Delivery uncertainty drives ticket volume and cancellations.",
    policyBoundary: "Use for delayed shipments and ETA updates.",
    keywords: ["shipping delay email", "late delivery response", "where is my order response"],
    cta: "Generate shipping delay reply",
  },
  {
    slug: "cancellation-request",
    title: "Cancellation Request Reply Generator",
    h1: "Cancellation request support reply generator",
    description:
      "Respond to cancellation requests quickly with clear status, policy context, and retention-safe language.",
    pain: "Slow cancellation responses increase anger and chargeback risk.",
    policyBoundary: "Use for pre-ship and post-ship cancellation scenarios.",
    keywords: ["cancel order response", "subscription cancellation template", "support cancellation reply"],
    cta: "Generate cancellation reply",
  },
  {
    slug: "chargeback-response",
    title: "Chargeback Response Generator",
    h1: "Chargeback response support generator",
    description:
      "Generate calm, evidence-oriented chargeback responses that de-escalate conflict and guide resolution.",
    pain: "Chargebacks are costly and often caused by poor communication.",
    policyBoundary: "Use when customer threatens or files a chargeback.",
    keywords: ["chargeback response template", "payment dispute support email", "chargeback prevention message"],
    cta: "Generate chargeback response",
  },
  {
    slug: "angry-customer-apology-solution",
    title: "Angry Customer Apology + Solution Generator",
    h1: "Angry customer apology and solution generator",
    description:
      "Turn escalations into trust with structured apology-plus-solution support responses.",
    pain: "Emotional tickets need empathy plus concrete action.",
    policyBoundary: "Use when customer sentiment is highly negative.",
    keywords: ["angry customer response", "customer apology template", "escalation response email"],
    cta: "Generate apology + solution reply",
  },
  {
    slug: "wrong-item-received",
    title: "Wrong Item Received Reply Generator",
    h1: "Wrong item received support reply generator",
    description:
      "Generate quick correction messages for wrong-item issues with replacement and return guidance.",
    pain: "Wrong-item tickets can go viral if not resolved fast.",
    policyBoundary: "Use when fulfillment mismatch is confirmed.",
    keywords: ["wrong item received response", "replacement support template", "order mistake apology"],
    cta: "Generate wrong item reply",
  },
  {
    slug: "damaged-item",
    title: "Damaged Item Reply Generator",
    h1: "Damaged item support reply generator",
    description:
      "Create damage-claim responses with empathy, proof request wording, and fast resolution options.",
    pain: "Customers fear they will be blamed or ignored.",
    policyBoundary: "Use for damaged-on-arrival or in-transit issues.",
    keywords: ["damaged item response", "product arrived broken email", "damage claim support reply"],
    cta: "Generate damaged item reply",
  },
  {
    slug: "subscription-retention-offer",
    title: "Subscription Retention Offer Reply Generator",
    h1: "Subscription retention offer support generator",
    description:
      "Generate retention-focused save offers for cancellation-risk subscribers without sounding pushy.",
    pain: "Retention depends on timing and tone in the first reply.",
    policyBoundary: "Use when subscriber shows churn intent.",
    keywords: ["subscription save offer", "retention email template", "prevent cancellation support"],
    cta: "Generate retention offer reply",
  },
  {
    slug: "apologize-for-the-delay-follow-up",
    title: "Apologize for the Delay Follow-up Generator",
    h1: "Apologize for the delay follow-up generator",
    description:
      "Create clean follow-up apologies for delayed responses that reset trust and move tickets forward.",
    pain: "Delayed follow-up often reignites frustration.",
    policyBoundary: "Use when your team missed a promised response window.",
    keywords: ["apologize for delay email", "late response follow up", "customer support follow-up template"],
    cta: "Generate delay follow-up reply",
  },
];

export function getTemplateBySlug(slug: string) {
  return templates.find((template) => template.slug === slug);
}
