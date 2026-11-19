import { site } from "@/config/site";
import { images } from "@/data/images";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  /** Optional JSON-LD objects rendered as application/ld+json scripts. */
  jsonLd?: Record<string, unknown>[];
};

/**
 * Preview image used when a page sets none, so every shared link has a card. It is the bundled
 * asset URL, which Vite hashes into /assets/... in a built site (never /src/assets/...).
 */
const defaultImage = () => absoluteUrl(images.potteryNight.src);

/** Builds head() meta + canonical for a route. Titles get the brand suffix. */
export function seo({
  title,
  description,
  path,
  image,
  type = "website",
  noindex,
  jsonLd,
}: SeoInput) {
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
  const preview = image ?? (noindex ? undefined : defaultImage());
  if (preview) {
    meta.push(
      { property: "og:image", content: preview },
      { name: "twitter:image", content: preview },
    );
  }
  if (noindex) meta.push({ name: "robots", content: "noindex, follow" });
  return {
    meta,
    links: [{ rel: "canonical", href: url }],
    ...(jsonLd && jsonLd.length > 0 ? { scripts: jsonLd.map(jsonLdScript) } : {}),
  };
}

/** Absolute URL for a site path or an already-absolute URL. */
export const absoluteUrl = (pathOrUrl: string) =>
  /^https?:\/\//.test(pathOrUrl) ? pathOrUrl : `${site.url}${pathOrUrl}`;

export const jsonLdScript = (data: Record<string, unknown>) => ({
  type: "application/ld+json",
  children: JSON.stringify(data),
});

/** BreadcrumbList. Pass crumbs in order; paths are site-relative. */
export function breadcrumbJsonLd(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

/** Organization. sameAs lists only social profiles the owner has set in site.ts. */
export function organizationJsonLd() {
  const sameAs = Object.values(site.social).filter((u) => typeof u === "string" && u.length > 0);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: site.description,
    logo: `${site.url}/favicon.svg`,
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

/** Article with image, dates and publisher. Image should be a site path or absolute URL. */
export function articleJsonLd(a: {
  title: string;
  description: string;
  path: string;
  image: string;
  publishedAt: string;
  updatedAt?: string | undefined;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    image: [absoluteUrl(a.image)],
    datePublished: a.publishedAt,
    dateModified: a.updatedAt ?? a.publishedAt,
    author: { "@type": "Organization", name: site.editorialByline, url: site.url },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      logo: { "@type": "ImageObject", url: `${site.url}/favicon.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(a.path) },
  };
}

/** Latest of updatedAt / verifiedAt that is strictly later than publishedAt; undefined otherwise. Never invented. */
export function modifiedAfterPublish(a: {
  publishedAt: string;
  updatedAt?: string | undefined;
  verifiedAt?: string | undefined;
}) {
  const later = [a.updatedAt, a.verifiedAt].filter((d): d is string => !!d && d > a.publishedAt);
  return later.sort().at(-1);
}
