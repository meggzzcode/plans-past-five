import { describe, expect, it } from "vitest";
import { allArticlesIncludingDrafts } from "@/content/draft-registry";
import { hobbies } from "@/data/hobbies";
import { collections } from "@/data/products";

const bySlug = new Map(allArticlesIncludingDrafts.map((a) => [a.slug, a]));
const hobbySlugs = new Set(hobbies.map((h) => h.slug));
const collectionSlugs = new Set<string>(collections.map((c) => c.slug));

/** A published article may only link to published articles; drafts may link to any registered one. */
const articleOk = (from: { status: string }, slug: string) => {
  const target = bySlug.get(slug);
  if (!target) return false;
  return from.status === "draft" || target.status === "published";
};

const inlineLinks = (a: (typeof allArticlesIncludingDrafts)[number]) =>
  [...JSON.stringify(a.body).matchAll(/\]\((\/[^)\s"\\#?]*)/g)].map((m) => m[1]!);

describe("internal links", () => {
  it("every article slug is unique", () => {
    expect(bySlug.size).toBe(allArticlesIncludingDrafts.length);
  });

  it("every `related` slug resolves to a permitted article", () => {
    const bad = allArticlesIncludingDrafts.flatMap((a) =>
      (a.related ?? [])
        .filter((s) => s === a.slug || !articleOk(a, s))
        .map((s) => `${a.slug} -> ${s}`),
    );
    expect(bad).toEqual([]);
  });

  it("every inline link to /journal, /hobbies, or /shop resolves", () => {
    const bad: string[] = [];
    for (const a of allArticlesIncludingDrafts) {
      for (const href of inlineLinks(a)) {
        const [, section, slug] = href.split("/");
        if (!slug) continue;
        const ok =
          section === "journal"
            ? articleOk(a, slug)
            : section === "hobbies"
              ? hobbySlugs.has(slug)
              : section === "shop"
                ? collectionSlugs.has(slug)
                : true;
        if (!ok) bad.push(`${a.slug}: ${href}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it("every hobby tag on an article exists", () => {
    const bad = allArticlesIncludingDrafts.flatMap((a) => [
      ...a.hobbies.filter((h) => !hobbySlugs.has(h)).map((h) => `${a.slug}: hobby ${h}`),
    ]);
    expect(bad).toEqual([]);
  });

  it("reports orphan articles (informational, never fails)", () => {
    const inbound = new Map<string, number>();
    for (const a of allArticlesIncludingDrafts) {
      const targets = [
        ...(a.related ?? []),
        ...inlineLinks(a)
          .filter((h) => h.startsWith("/journal/"))
          .map((h) => h.split("/")[2]!),
      ];
      for (const t of new Set(targets)) if (t !== a.slug) inbound.set(t, (inbound.get(t) ?? 0) + 1);
    }
    const orphans = allArticlesIncludingDrafts
      .filter((a) => !inbound.has(a.slug))
      .map((a) => a.slug);
    // Orphans are surfaced for the editor; related reading is also computed from shared hobbies.
    console.info(
      `Orphan articles (no inbound related/inline link): ${orphans.join(", ") || "none"}`,
    );
    expect(Array.isArray(orphans)).toBe(true);
  });
});
