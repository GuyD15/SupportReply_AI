import Link from "next/link";

export default function BillingSuccessPage() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-12">
      <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight">Upgrade complete</h1>
        <p className="mt-3 text-black/70">
          Your Pro access is being activated. If your playbooks do not unlock immediately, refresh in a
          few seconds.
        </p>
        <Link href="/" className="mt-6 inline-flex rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800">
          Back to generators
        </Link>
      </div>
    </main>
  );
}
