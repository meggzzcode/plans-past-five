import { describe, expect, it } from "vitest";
import { findHobbies } from "@/lib/finder";
import { makePlan } from "@/lib/planner";
import { articles, getArticle } from "@/content";
import { allArticlesIncludingDrafts } from "@/content/draft-registry";
import { search } from "@/lib/search";
import { hobbies } from "@/data/hobbies";
import {
  products,
  articleProducts,
  allProductTypes,
  productTypeIds,
  getProduct,
  collections,
  collectionProducts,
} from "@/data/products";
import { amazonSearchUrl } from "@/config/affiliate";
import { restoreAffiliate, setAffiliateState, snapshotAffiliate } from "./affiliate-state";
import { sanitizeSaved } from "@/lib/saved";

describe("Find Your Thing", () => {
  it("never returns a hobby above a free budget", () => {
    const { results } = findHobbies({
      craving: "creativity",
      where: "anywhere",
      time: "any",
      budget: "free",
      company: "either",
      energy: "medium",
    });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((r) => r.hobby.cost === "free")).toBe(true);
  });
  it("respects at-home and under-45-minute limits", () => {
    const { results } = findHobbies({
      craving: "relaxation",
      where: "home",
      time: "short",
      budget: "flexible",
      company: "either",
      energy: "low",
    });
    expect(results.every((r) => r.hobby.settings.includes("home") && r.hobby.minutes <= 45)).toBe(
      true,
    );
  });
  it("flags too few matches instead of ignoring constraints", () => {
    const r = findHobbies({
      craving: "movement",
      where: "home",
      time: "short",
      budget: "free",
      company: "social",
      energy: "high",
    });
    expect(r.tooFew).toBe(true);
  });
  it("returns between 3 and 5 hobbies for an open quiz", () => {
    const r = findHobbies({
      craving: "creativity",
      where: "anywhere",
      time: "any",
      budget: "flexible",
      company: "either",
      energy: "medium",
    });
    expect(r.results.length).toBeGreaterThanOrEqual(3);
    expect(r.results.length).toBeLessThanOrEqual(5);
  });
});

describe("Make Some Plans", () => {
  it("full-day Saturday gives morning, afternoon and evening", () => {
    const p = makePlan({
      when: "saturday",
      length: "full-day",
      vibe: "creative",
      who: "alone",
      budget: "under25",
      atHome: false,
    });
    expect(p?.slots.map((s) => s.label)).toEqual(["Morning", "Afternoon", "Evening"]);
  });
  it("free budget only picks free activities", () => {
    const p = makePlan({
      when: "sunday",
      length: "full-day",
      vibe: "cozy",
      who: "friend",
      budget: "free",
      atHome: false,
    });
    expect(p?.slots.every((s) => (s.activity?.cost ?? "free") === "free")).toBe(true);
  });
  it("is deterministic for the same seed", () => {
    const i = {
      when: "saturday",
      length: "half-day",
      vibe: "outdoorsy",
      who: "group",
      budget: "flexible",
      atHome: false,
    } as const;
    expect(makePlan(i, 2)?.slots.map((s) => s.activity?.id)).toEqual(
      makePlan(i, 2)?.slots.map((s) => s.activity?.id),
    );
  });
});

describe("Content rules", () => {
  it("never exposes draft articles through public helpers or search", () => {
    const drafts = allArticlesIncludingDrafts.filter((a) => a.status === "draft");
    expect(drafts.length).toBeGreaterThan(0);
    expect(articles.every((a) => a.status === "published")).toBe(true);
    for (const d of drafts) {
      expect(getArticle(d.slug)).toBeUndefined();
      expect(search(d.title).some((h) => h.to === `/journal/${d.slug}`)).toBe(false);
    }
  });
  // Updated deliberately: the owner asked for eight collections. The original six own six product
  // types each; "journaling-era" and "cozy-after-hours" own none and cross-reference at least four
  // existing product types via extraProductIds (no new products were invented).
  // Hobby count updated deliberately from 36 to 43: "Yoga for Beginners", "Dance Classes", "Running", "Climbing", "Board Games", "Cooking Classes", "Language Learning"
  // were added so the Active filter is not just four hobbies (cost-and-search review).
  it("has 43 hobbies and 8 collections, each with at least 4 product types", () => {
    expect(hobbies).toHaveLength(43);
    expect(collections).toHaveLength(8);
    expect(products).toHaveLength(36);
    for (const c of collections)
      expect(collectionProducts(c.slug).length).toBeGreaterThanOrEqual(4);
    for (const slug of [
      "pottery-era",
      "creative-girl",
      "sporty-girl",
      "girls-night-in",
      "bookish-girl",
      "little-adventures",
    ])
      expect(products.filter((p) => p.collection === slug)).toHaveLength(6);
    for (const c of collections)
      for (const id of c.extraProductIds ?? [])
        expect(products.some((p) => p.id === id)).toBe(true);
  });
  // Article-only product types (docs/commerce/PRODUCT-TYPES.md): not in `products`, so the collection
  // counts above stay as they were; resolvable by id for articles and hobby pages.
  it("has 30 article-only product types that stay out of collections and search", () => {
    expect(articleProducts.map((x) => x.id)).toEqual([
      "walking-shoes",
      "trekking-socks",
      "phone-armband",
      "sketch-pads",
      "crochet-hooks",
      "yarn",
      "knitting-needles",
      "flower-snips",
      "vases",
      "flower-frogs",
      "jigsaw-puzzles",
      "paint-by-number-kits",
      "cozy-night-in",
      "bike-helmets",
      "bike-lights",
      "bike-repair-kits",
      "bike-bells",
      "skate-protective-gear",
      "thermos-flasks",
      "cooler-bags",
      "portable-speakers",
      "glue-guns",
      "tea-sets",
      "brush-pens",
      "photo-albums",
      "letter-writing-sets",
      "indoor-plant-basics",
      "tennis-shoes",
      "pickleball-shoes",
      "yoga-mats",
    ]);
    expect(new Set(productTypeIds).size).toBe(allProductTypes.length);
    expect(allProductTypes).toHaveLength(66);
    for (const a of articleProducts) {
      expect(getProduct(a.id)).toBe(a);
      expect(products.some((x) => x.id === a.id)).toBe(false);
      expect(collections.some((c) => collectionProducts(c.slug).some((x) => x.id === a.id))).toBe(
        false,
      );
      expect(collections.some((c) => c.slug === a.collection)).toBe(true);
      expect(a.amazonQuery).toMatch(/^[a-z0-9 ]+$/);
      expect(a.blurb.length).toBeGreaterThan(10);
      expect(a.lookFor.length).toBeGreaterThan(10);
      expect(a.brand ?? a.exactUrl ?? a.sourceUrl).toBeUndefined();
    }
  });
  it("Amazon links carry no affiliate tag unless an entry is live", () => {
    const snap = snapshotAffiliate();
    try {
      setAffiliateState("inactive");
      expect(amazonSearchUrl("air dry clay")).not.toContain("tag=");
      setAffiliateState("active");
      expect(amazonSearchUrl("air dry clay")).toContain("tag=testsite-20");
    } finally {
      restoreAffiliate(snap);
    }
  });
});

describe("Saved items", () => {
  it("drops malformed entries and non-arrays", () => {
    const good = { key: "a", kind: "hobby", title: "T", href: "/h", savedAt: "2026-01-01" };
    expect(sanitizeSaved([good, null, { key: 1 }, { ...good, kind: "bogus" }])).toEqual([good]);
    expect(sanitizeSaved({ nope: true })).toEqual([]);
  });
});

// The content validator (scripts/content-lib.mjs) only checks that productIds is a string list, so
// this is the guard that a shopHobby/starterKit block never silently renders nothing.
describe("article productIds resolve", () => {
  it("every shopHobby and starterKit product id is a known product type or kit-slot id", async () => {
    const { readdirSync, readFileSync } = await import("node:fs");
    const path = await import("node:path");
    const dir = path.resolve(__dirname, "../../content/articles");
    const bad: string[] = [];
    for (const f of readdirSync(dir).filter((n) => n.endsWith(".json"))) {
      const a = JSON.parse(readFileSync(path.join(dir, f), "utf8"));
      for (const b of JSON.stringify(a).match(/"type":"shopHobby"/) ? flat(a) : [])
        if (b.type === "shopHobby")
          for (const id of b.productIds ?? [])
            if (!productTypeIds.includes(id)) bad.push(`${f}: ${id}`);
    }
    expect(bad).toEqual([]);
  });
});
function flat(node: unknown): Array<{ type?: string; productIds?: string[] }> {
  if (Array.isArray(node)) return node.flatMap(flat);
  if (node && typeof node === "object")
    return [node as never, ...Object.values(node).flatMap(flat)];
  return [];
}
