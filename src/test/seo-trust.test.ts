import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { site } from "@/config/site";
import { articles } from "@/content";
import { corrections } from "@/content/corrections";
import { hobbies } from "@/data/hobbies";
import { collections } from "@/data/products";
import { sitemapPaths } from "@/lib/sitemap";
import { articleJsonLd, breadcrumbJsonLd, organizationJsonLd, seo } from "@/lib/seo";

type HeadResult = {
  meta?: { title?: string; name?: string; content?: string }[];
  links?: { rel: string; href: string }[];
};
type RouteModule = {
  Route?: { options?: { head?: (ctx: { loaderData?: unknown }) => HeadResult } };
};

const modules = import.meta.glob<RouteModule>("../routes/*.tsx", { eager: true });
const routesDir = join(__dirname, "..", "routes");
const publicDir = join(__dirname, "..", "..", "public");

const title = (h: HeadResult) => h.meta?.find((m) => "title" in m)?.title;
const desc = (h: HeadResult) => h.meta?.find((m) => m.name === "description")?.content;
const canonical = (h: HeadResult) => h.links?.find((l) => l.rel === "canonical")?.href;
const robots = (h: HeadResult) => h.meta?.find((m) => m.name === "robots")?.content ?? "";

/** Every route file's head(), with loaderData samples for dynamic routes. */
function collectHeads() {
  const out: { file: string; head: HeadResult }[] = [];
  const samples: Record<string, unknown[]> = {
    "journal.$slug": articles.map((a) => ({ slug: a.slug })),
    "hobbies.$slug": hobbies.map((h) => ({ slug: h.slug })),
    "shop.$category": collections.map((c) => ({ slug: c.slug })),
  };
  for (const [file, mod] of Object.entries(modules)) {
    const name = file.replace("../routes/", "").replace(".tsx", "");
    if (name === "__root" || name.startsWith("sitemap")) continue;
    const head = mod.Route?.options?.head;
    if (!head) continue;
    if (samples[name]) {
      for (const s of samples[name]!) {
        out.push({ file: `${name}:${JSON.stringify(s)}`, head: head({ loaderData: s }) });
      }
    } else {
      out.push({ file: name, head: head({}) });
    }
  }
  return out;
}

describe("route metadata", () => {
  const heads = collectHeads();

  it("covers a healthy number of routes", () => {
    expect(heads.length).toBeGreaterThan(20);
  });

  it("every route has a title, description and canonical on this site", () => {
    for (const { file, head } of heads) {
      expect(title(head), `${file} title`).toBeTruthy();
      expect(desc(head), `${file} description`).toBeTruthy();
      expect(canonical(head), `${file} canonical`).toMatch(new RegExp(`^${site.url}/?`));
    }
  });

  it("titles, descriptions and canonicals are unique", () => {
    for (const pick of [title, desc, canonical]) {
      const seen = new Map<string, string>();
      for (const { file, head } of heads) {
        const v = pick(head)!;
        expect(seen.has(v), `duplicate "${v}" in ${file} and ${seen.get(v)}`).toBe(false);
        seen.set(v, file);
      }
    }
  });

  it("every indexable route has an absolute og:image (a default is applied when none is set)", () => {
    for (const { file, head } of heads) {
      if (robots(head).includes("noindex")) continue;
      const og = (head.meta as { property?: string; content?: string }[]).find(
        (m) => m.property === "og:image",
      );
      expect(og?.content?.startsWith(`${site.url}/`), `${file} og:image`).toBe(true);
    }
  });

  it("noindex pages (saved, search, thin hobby profiles) are not in the sitemap", () => {
    const paths = new Set(sitemapPaths());
    for (const { head } of heads) {
      const c = canonical(head)!.replace(site.url, "") || "/";
      if (robots(head).includes("noindex")) expect(paths.has(c), c).toBe(false);
    }
  });
});

describe("sitemap", () => {
  const paths = sitemapPaths();

  it("has no duplicates and excludes /saved and /search", () => {
    expect(new Set(paths).size).toBe(paths.length);
    expect(paths).not.toContain("/saved");
    expect(paths).not.toContain("/search");
  });

  it("includes the trust pages and tools", () => {
    for (const p of ["/methodology", "/corrections", "/editorial-policy", "/make-plans"]) {
      expect(paths).toContain(p);
    }
    // Retired, redirected and hidden-utility paths are never listed.
    for (const p of ["/start-here", "/tools/tonight", "/tools/hobby-budget"])
      expect(paths).not.toContain(p);
  });

  it("lists only hobby profiles that have a published guide", () => {
    const covered = new Set(articles.flatMap((a) => a.hobbies));
    for (const p of paths.filter((x) => x.startsWith("/hobbies/"))) {
      expect(covered.has(p.replace("/hobbies/", ""))).toBe(true);
    }
  });

  it("every sitemap path has a route file", () => {
    const has = (name: string) =>
      existsSync(join(routesDir, `${name}.tsx`)) ||
      existsSync(join(routesDir, `${name}.index.tsx`));
    for (const p of paths) {
      const parts = p.split("/").filter(Boolean);
      if (parts.length === 0) continue;
      const exact = has(parts.join("."));
      const dynamic = parts.length > 1 && has(`${parts[0]}.$slug`);
      const dynamicCategory = parts.length > 1 && has(`${parts[0]}.$category`);
      expect(exact || dynamic || dynamicCategory, p).toBe(true);
    }
  });
});

describe("structured data", () => {
  it("Organization lists sameAs only for socials that are set", () => {
    const org = organizationJsonLd() as { sameAs?: string[] };
    const set = Object.values(site.social).filter(Boolean);
    if (set.length === 0) expect(org.sameAs).toBeUndefined();
    else expect(org.sameAs).toEqual(set);
  });

  it("BreadcrumbList positions are sequential with absolute URLs", () => {
    const b = breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Journal", path: "/journal" },
    ]) as { itemListElement: { position: number; item: string }[] };
    expect(b.itemListElement.map((i) => i.position)).toEqual([1, 2]);
    expect(b.itemListElement[1]!.item).toBe(`${site.url}/journal`);
  });

  it("Article JSON-LD has image, dates and publisher", () => {
    const a = articles[0]!;
    const j = articleJsonLd({
      title: a.title,
      description: a.dek,
      path: `/journal/${a.slug}`,
      image: "/assets/x.jpg",
      publishedAt: a.publishedAt,
    }) as {
      image: string[];
      datePublished: string;
      dateModified: string;
      publisher: { name: string };
    };
    expect(j.image[0]).toBe(`${site.url}/assets/x.jpg`);
    expect(j.datePublished).toBe(a.publishedAt);
    expect(j.dateModified).toBe(a.publishedAt);
    expect(j.publisher.name).toBe(site.name);
  });

  it("seo() adds JSON-LD scripts only when asked", () => {
    expect(seo({ title: "A", description: "b", path: "/a" })).not.toHaveProperty("scripts");
    expect(seo({ title: "A", description: "b", path: "/a", jsonLd: [{ a: 1 }] })).toHaveProperty(
      "scripts",
    );
  });
});

describe("trust and security files", () => {
  it("corrections log entries are dated", () => {
    for (const c of corrections) expect(c.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("_headers sets safe headers and does not enforce a CSP or HSTS", () => {
    const h = readFileSync(join(publicDir, "_headers"), "utf8");
    const text = h
      .split("\n")
      .filter((l) => !l.trim().startsWith("#"))
      .join("\n");
    expect(text).toMatch(/Referrer-Policy:/);
    expect(text).toMatch(/Permissions-Policy:/);
    expect(text).toMatch(/X-Content-Type-Options: nosniff/);
    expect(text).not.toMatch(/Content-Security-Policy:/i);
    expect(text).not.toMatch(/Strict-Transport-Security:/i);
  });

  it("robots.txt disallows personal pages and names the sitemap", () => {
    const r = readFileSync(join(publicDir, "robots.txt"), "utf8");
    expect(r).toMatch(/Disallow: \/saved/);
    expect(r).toMatch(/Disallow: \/search/);
    expect(r).toMatch(/Sitemap: .*\/sitemap\.xml/);
  });
});
