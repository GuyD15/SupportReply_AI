import Link from "next/link";

export default function BillingCancelledPage() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-12">
      <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight">Checkout cancelled</h1>
        <p className="mt-3 text-black/70">
          No worries—your account stays on free access. You can upgrade any time from a generator page.
        </p>
        <Link href="/" className="mt-6 inline-flex rounded-xl border border-black/20 bg-white px-4 py-2.5 text-sm font-medium transition hover:bg-zinc-100">
          Return home
        </Link>
      </div>
    </main>
  );
}
