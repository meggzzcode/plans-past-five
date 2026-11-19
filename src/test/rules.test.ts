import { describe, expect, it } from "vitest";
import { findHobbies } from "@/lib/finder";
import { makePlan } from "@/lib/planner";
import { articles, getArticle } from "@/content";
import { allArticlesIncludingDrafts } from "@/content/draft-registry";
import { search } from "@/lib/search";
import { hobbies } from "@/data/hobbies";
import { collections } from "@/data/products";
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
  // Hobby count is not fixed (the directory may grow or shrink). Eight collections today.
  it("has 8 collections, each supporting hobbies that exist", () => {
    expect(new Set(hobbies.map((h) => h.slug)).size).toBe(hobbies.length);
    expect(collections).toHaveLength(8);
    for (const c of collections) {
      expect(c.hobbies.length, c.slug).toBeGreaterThan(0);
      for (const s of c.hobbies)
        expect(
          hobbies.some((x) => x.slug === s),
          `${c.slug} -> ${s}`,
        ).toBe(true);
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

// scripts/content-lib.mjs fails the build when a shopHobby/starterKit block names a hobby that does not exist.
describe("article shop block hobbies resolve", () => {
  it("every shopHobby and starterKit names real hobbies", async () => {
    const { readdirSync, readFileSync } = await import("node:fs");
    const path = await import("node:path");
    const dir = path.resolve(__dirname, "../../content/articles");
    const bad: string[] = [];
    for (const f of readdirSync(dir).filter((n) => n.endsWith(".json"))) {
      const a = JSON.parse(readFileSync(path.join(dir, f), "utf8"));
      for (const b of flat(a))
        if (b.type === "shopHobby" || b.type === "starterKit")
          for (const id of b.hobbies ?? [])
            if (!hobbies.some((x) => x.slug === id)) bad.push(`${f}: ${id}`);
    }
    expect(bad).toEqual([]);
  });
});
function flat(node: unknown): Array<{ type?: string; hobbies?: string[] }> {
  if (Array.isArray(node)) return node.flatMap(flat);
  if (node && typeof node === "object")
    return [node as never, ...Object.values(node).flatMap(flat)];
  return [];
}
