import Link from "next/link";
import { isFreeTemplateSlug, templates } from "@/lib/templates";

export default function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition sm:p-10">
        <header className="max-w-3xl space-y-4">
          <p className="inline-block rounded-full border border-black/15 bg-zinc-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            Tool-first SEO support templates
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">Resolve customer tickets faster with SupportReply AI</h1>
          <p className="text-base text-black/75 sm:text-lg">
            High-intent support reply generators with instant exports for Gmail, Zendesk macros, and
            Intercom snippets.
          </p>
          <p className="text-sm text-black/65">Start free in seconds. No credit card required.</p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Link
              href="/pricing"
              className="rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              See plans
            </Link>
            <Link
              href="/signup"
              className="rounded-xl border border-black/20 bg-white px-4 py-2.5 text-sm font-medium transition hover:bg-zinc-100"
            >
              Start free now
            </Link>
          </div>
        </header>
      </section>

      <section className="mt-6 rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition sm:mt-8 sm:p-8">
        <h2 className="text-2xl font-semibold">10 high-impact support generators</h2>
        <p className="mt-2 text-sm text-black/70">
          Every page includes the full generator, tone + policy controls, and Pro playbook saving.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <article
              key={template.slug}
              className="group rounded-2xl border border-black/10 bg-zinc-50 p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-black/20 hover:bg-white hover:shadow"
            >
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-black/55">
                {isFreeTemplateSlug(template.slug) ? "Free" : "Pro"}
              </p>
              <h3 className="text-base font-semibold tracking-tight">{template.title}</h3>
              <p className="mt-1 text-sm text-black/70">{template.pain}</p>
              <Link
                href={`/reply/${template.slug}`}
                className="mt-4 inline-flex rounded-xl bg-black px-3 py-2.5 text-sm font-medium text-white transition duration-200 group-hover:bg-zinc-800"
              >
                {isFreeTemplateSlug(template.slug) ? "Try free generator" : "Open generator"}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
