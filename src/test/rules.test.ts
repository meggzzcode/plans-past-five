import { describe, expect, it } from "vitest";
import { findHobbies } from "@/lib/finder";
import { makePlan } from "@/lib/planner";
import { articles, getArticle } from "@/content";
import { allArticlesIncludingDrafts } from "@/content/draft-registry";
import { search } from "@/lib/search";
import { hobbies } from "@/data/hobbies";
import { products, collections, collectionProducts } from "@/data/products";
import { amazonSearchUrl } from "@/config/affiliate";
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
  // Hobby count updated deliberately from 36 to 38: "Yoga for Beginners" and "Dance Classes"
  // were added so the Active filter is not just four hobbies (cost-and-search review).
  it("has 38 hobbies and 8 collections, each with at least 4 product types", () => {
    expect(hobbies).toHaveLength(38);
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
  it("Amazon links carry no affiliate tag by default", () => {
    expect(amazonSearchUrl("air dry clay")).not.toContain("tag=");
  });
});

describe("Saved items", () => {
  it("drops malformed entries and non-arrays", () => {
    const good = { key: "a", kind: "hobby", title: "T", href: "/h", savedAt: "2026-01-01" };
    expect(sanitizeSaved([good, null, { key: 1 }, { ...good, kind: "bogus" }])).toEqual([good]);
    expect(sanitizeSaved({ nope: true })).toEqual([]);
  });
});
