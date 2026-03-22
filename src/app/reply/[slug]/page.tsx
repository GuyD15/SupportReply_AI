import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReplyGenerator } from "@/components/reply-generator";
import { getTemplateBySlug, templates, type TemplateSlug } from "@/lib/templates";

type Params = {
  slug: string;
};

type PageProps = {
  params: Promise<Params>;
};

export function generateStaticParams() {
  return templates.map((template) => ({ slug: template.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);

  if (!template) {
    return {
      title: "Reply template not found",
    };
  }

  return {
    title: template.title,
    description: template.description,
    keywords: template.keywords,
    alternates: {
      canonical: `/reply/${template.slug}`,
    },
    openGraph: {
      title: template.title,
      description: template.description,
      url: `/reply/${template.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: template.title,
      description: template.description,
    },
  };
}

export default async function ReplyTemplatePage({ params }: PageProps) {
  const { slug } = await params;
  const template = getTemplateBySlug(slug as TemplateSlug);

  if (!template) {
    notFound();
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "SupportReply AI",
        item: "https://supportreply.ai",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: template.title,
        item: `https://supportreply.ai/reply/${template.slug}`,
      },
    ],
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <nav className="mb-6 text-sm text-black/70">
        <Link className="transition hover:text-black hover:underline" href="/">
          SupportReply AI
        </Link>
        <span> / </span>
        <span>{template.title}</span>
      </nav>

      <section className="rounded-3xl border border-black/10 bg-white p-7 shadow-sm transition">
        <header className="max-w-3xl space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{template.h1}</h1>
          <p className="text-black/70">{template.description}</p>
        </header>
      </section>

      <section className="mt-6 grid gap-4 rounded-3xl border border-black/10 bg-white p-5 shadow-sm transition sm:grid-cols-2">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-black/70">Pain</h2>
          <p className="mt-1 text-sm text-black/80">{template.pain}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-black/70">Policy boundary</h2>
          <p className="mt-1 text-sm text-black/80">{template.policyBoundary}</p>
        </div>
      </section>

      <section className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
        <p className="text-sm text-black/70">
          Need unlimited replies and saved playbooks for repeat cases? Start Pro.
        </p>
        <Link
          href="/pricing"
          className="rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
        >
          Start Pro plan
        </Link>
      </section>

      <ReplyGenerator template={template} />
    </main>
  );
}
