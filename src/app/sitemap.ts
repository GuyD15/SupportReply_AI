import type { MetadataRoute } from "next";
import { templates } from "@/lib/templates";

const baseUrl = "https://supportreply.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const templatePages = templates.map((template) => ({
    url: `${baseUrl}/reply/${template.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const legalPages = ["/pricing", "/terms", "/privacy", "/disclaimer"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...legalPages,
    ...templatePages,
  ];
}
