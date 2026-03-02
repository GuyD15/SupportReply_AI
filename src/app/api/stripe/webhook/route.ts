import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

function toDate(unixSeconds?: number | null) {
  if (!unixSeconds) {
    return null;
  }

  return new Date(unixSeconds * 1000);
}

async function resolveUserByStripeContext(input: {
  customerId?: string | null;
  email?: string | null;
}) {
  if (input.customerId) {
    const byCustomer = await db.user.findUnique({
      where: { stripeCustomerId: input.customerId },
    });

    if (byCustomer) {
      return byCustomer;
    }
  }

  if (input.email) {
    const byEmail = await db.user.findUnique({
      where: { email: input.email.toLowerCase() },
    });

    if (byEmail && input.customerId && byEmail.stripeCustomerId !== input.customerId) {
      return db.user.update({
        where: { id: byEmail.id },
        data: { stripeCustomerId: input.customerId },
      });
    }

    return byEmail;
  }

  return null;
}

async function setEntitlementFromSubscription(subscription: Stripe.Subscription) {
  const customerId = typeof subscription.customer === "string" ? subscription.customer : null;
  const periodEnd = (subscription as unknown as { current_period_end?: number }).current_period_end;
  const user = await resolveUserByStripeContext({ customerId });

  if (!user) {
    return;
  }

  const activeStatuses = new Set(["active", "trialing", "past_due"]);
  const firstItem = subscription.items.data[0];

  await db.entitlement.upsert({
    where: { userId: user.id },
    create: {
      userId: user.id,
      tier: "pro",
      status: activeStatuses.has(subscription.status) ? "active" : "inactive",
      stripeSubscriptionId: subscription.id,
      stripePriceId: firstItem?.price.id,
      currentPeriodEnd: toDate(periodEnd),
    },
    update: {
      tier: "pro",
      status: activeStatuses.has(subscription.status) ? "active" : "inactive",
      stripeSubscriptionId: subscription.id,
      stripePriceId: firstItem?.price.id,
      currentPeriodEnd: toDate(periodEnd),
    },
  });
}

export async function POST(request: Request) {
  const stripe = getStripe();
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !endpointSecret) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe signature" }, { status: 400 });
  }

  const payload = await request.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);
  } catch {
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const customerId = typeof session.customer === "string" ? session.customer : null;
      const subscriptionId = typeof session.subscription === "string" ? session.subscription : null;
      const user = await resolveUserByStripeContext({
        customerId,
        email: session.customer_details?.email,
      });

      if (user) {
        await db.entitlement.upsert({
          where: { userId: user.id },
          create: {
            userId: user.id,
            tier: "pro",
            status: "active",
            stripeSubscriptionId: subscriptionId,
          },
          update: {
            tier: "pro",
            status: "active",
            stripeSubscriptionId: subscriptionId,
          },
        });
      }
      break;
    }
    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      await setEntitlementFromSubscription(subscription);
      break;
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = typeof subscription.customer === "string" ? subscription.customer : null;
      const user = await resolveUserByStripeContext({ customerId });

      if (user) {
        await db.entitlement.upsert({
          where: { userId: user.id },
          create: {
            userId: user.id,
            tier: "pro",
            status: "inactive",
            stripeSubscriptionId: subscription.id,
          },
          update: {
            status: "inactive",
            stripeSubscriptionId: subscription.id,
          },
        });
      }
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
