import { site } from "@/config/site";

type SeoInput = { title: string; description: string; path: string; image?: string; type?: "website" | "article"; noindex?: boolean };

/** Builds head() meta + canonical for a route. Titles get the brand suffix. */
export function seo({ title, description, path, image, type = "website", noindex }: SeoInput) {
  const full = title.includes(site.name) ? title : `${title} | ${site.name}`;
  const url = `${site.url}${path}`;
  const meta: Record<string, string>[] = [
    { title: full },
    { name: "description", content: description },
    { property: "og:title", content: full },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:site_name", content: site.name },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: full },
    { name: "twitter:description", content: description },
  ];
  if (image) meta.push({ property: "og:image", content: image }, { name: "twitter:image", content: image });
  if (noindex) meta.push({ name: "robots", content: "noindex, follow" });
  return { meta, links: [{ rel: "canonical", href: url }] };
}
