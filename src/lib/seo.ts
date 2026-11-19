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

/**
 * Shorter search-result titles for the articles whose on-page headline is long. Only the `<title>`
 * and social title change: the H1, the slug and the dek stay as written. Keep each under about 48
 * characters so title plus brand fits in roughly 65.
 */
export const ARTICLE_META_TITLES: Record<string, string> = {
  "how-to-find-a-hobby-as-an-adult": "How to Find a Hobby as an Adult",
  "how-to-start-air-dry-clay": "Air-Dry Clay for Beginners: A Starter Guide",
  "flower-arranging-as-a-hobby": "Arrange Grocery-Store Flowers Like a Florist",
  "junk-journaling-supplies-for-beginners": "Junk Journaling Supplies: A Small Starter List",
  "watercolor-painting-for-beginners": "Watercolor for Beginners: 3 Little Paintings",
  "at-home-creative-weekend": "At-Home Creative Weekend: Clay, Paint, Journal",
  "creative-hobby-starter-kits-worth-considering": "Are Craft Starter Kits Worth It?",
  "hobbies-to-try-when-life-feels-like-work-sleep-repeat":
    "35 Hobbies When Life Is Work, Sleep, Repeat",
  "how-to-get-into-recreational-cycling-as-an-adult": "How to Start Cycling Again as an Adult",
  "how-to-start-a-book-club": "How to Start a Book Club People Show Up To",
  "how-to-plan-a-solo-saturday": "How to Plan a Solo Saturday You'll Enjoy",
  "solo-date-ideas": "30 Solo Date Ideas You'll Actually Enjoy",
  "things-to-do-on-the-weekend": "20 Weekend Plans for Every Mood",
  "how-to-start-playing-tennis-as-an-adult": "How to Start Playing Tennis as an Adult",
  "how-to-host-a-craft-night": "How to Host a Craft Night: 5 Easy Projects",
  "creative-hobbies-you-can-start-at-home": "21 Creative Hobbies to Start at Home",
  "how-to-host-a-paint-night-at-home": "How to Host a Paint Night at Home",
  "affordable-hobbies-under-25": "15 Affordable Hobbies on a Small Budget",
  "how-to-start-a-reading-journal": "How to Start a Reading Journal You'll Keep",
  "low-energy-hobbies": "12 Low-Energy Hobbies for Tired Evenings",
  "how-to-start-embroidery": "Your First Embroidery Hoop in One Evening",
  "active-hobbies-for-women-who-dont-love-the-gym": "15 Active Hobbies If You Don't Love the Gym",
};

/** The `<title>` for an article: the short override when one exists, else its headline. */
export const articleMetaTitle = (slug: string, headline: string) =>
  ARTICLE_META_TITLES[slug] ?? headline;
