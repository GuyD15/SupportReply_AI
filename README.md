## SupportReply AI

Tool-first SEO support reply generator with 10 high-intent pages and on-page generators.

## Legal posture

This project includes baseline legal pages (`/terms`, `/privacy`, `/disclaimer`) and liability-limiting language, but it does not guarantee full legal protection in every jurisdiction or use case. Have a licensed attorney review your live policies, billing terms, data handling, and customer communication workflows before launch.

## Completion status

Product is functionally near launch-ready. Remaining work is mostly configuration + legal review:

- Replace placeholders in legal pages (`[LEGAL ENTITY NAME]`, jurisdiction/venue, legal contacts).
- Confirm Stripe production keys, price id, and webhook endpoint in production.
- Add your business support contact for privacy/legal requests.
- Have counsel review terms/privacy/disclaimer for your target markets.
- Run end-to-end test in production mode (`signup -> upgrade -> webhook -> Pro save`).

## Pricing recommendation

Recommended launch price: **$79/month Pro**.

- Target math: about **64 active customers** to reach $5,000 MRR.
- Why this point: more attainable conversion than $99 while maintaining healthy ARPU versus low-ticket pricing.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment variables

Create a `.env.local` file:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require"
AUTH_SECRET="replace-with-a-long-random-secret"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PRICE_ID="price_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

- `AUTH_SECRET`: required by NextAuth.
- `STRIPE_PRICE_ID`: recurring Pro plan price id.
- `STRIPE_WEBHOOK_SECRET`: used to validate Stripe webhook signatures.

Billing routes implemented:

- Checkout: `/api/stripe/checkout`
- Billing portal: `/api/stripe/portal`

If Stripe env vars are not set, app still runs and billing endpoints return configuration errors.

## Database setup

```bash
npm run db:push
npm run db:generate
```

This syncs your Prisma schema to Postgres and generates Prisma client.

## Stripe webhook (local)

Use Stripe CLI to forward webhooks:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the generated webhook secret into `STRIPE_WEBHOOK_SECRET`.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Build

```bash
npm run build
```
