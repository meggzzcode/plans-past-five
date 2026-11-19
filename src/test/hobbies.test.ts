import { describe, expect, it } from "vitest";
import { hobbies, getHobby, isHobbyIndexable } from "@/data/hobbies";
import { articles } from "@/content";
import { getSearchTerm } from "@/data/search-terms";

const publishedSlugs = new Set(articles.map((a) => a.slug));
const currency = /[$€£]\s?\d|\d\s?(usd|dollars?|eur|gbp)\b/i;

describe("hobby directory", () => {
  // No hard-coded count: adding or removing a hobby must not break the suite. Integrity only.
  it("keeps every hobby slug and name unique", () => {
    expect(hobbies.length).toBeGreaterThan(0);
    expect(new Set(hobbies.map((h) => h.slug)).size).toBe(hobbies.length);
    expect(new Set(hobbies.map((h) => h.name)).size).toBe(hobbies.length);
  });

  it.each(hobbies.map((h) => [h.slug, h] as const))("%s has all enrichment fields", (_s, h) => {
    expect(h.difficulty).toBeTruthy();
    expect(h.startupBudget).toBeTruthy();
    expect(h.timeCommitment).toBeTruthy();
    expect(h.indoorOutdoor).toBeTruthy();
    expect(h.startSteps!.length).toBeGreaterThanOrEqual(3);
    expect(h.startSteps!.length).toBeLessThanOrEqual(5);
    expect(h.firstProject).toBeTruthy();
    expect(h.relatedHobbies!.length).toBeGreaterThan(0);
    expect(h.learningResources!.length).toBeGreaterThan(0);
    expect(h.relatedGuides!.length).toBeGreaterThan(0);
  });

  it("related hobbies resolve and never point at themselves", () => {
    for (const h of hobbies)
      for (const s of h.relatedHobbies ?? []) {
        expect(getHobby(s), `${h.slug} -> ${s}`).toBeTruthy();
        expect(s).not.toBe(h.slug);
      }
  });

  it("related guides resolve to published articles only", () => {
    for (const h of hobbies)
      for (const g of h.relatedGuides ?? [])
        expect(publishedSlugs.has(g), `${h.slug} -> ${g}`).toBe(true);
  });

  it("search term ids resolve", () => {
    for (const h of hobbies)
      for (const id of h.productIds) expect(getSearchTerm(id), `${h.slug} -> ${id}`).toBeTruthy();
  });

  it("startup budgets are well-formed with an assumptions note", () => {
    for (const h of hobbies) {
      const b = h.startupBudget!;
      expect(b.currency).toBe("USD");
      expect(Number.isFinite(b.low) && Number.isFinite(b.high)).toBe(true);
      expect(b.low).toBeGreaterThanOrEqual(0);
      expect(b.low).toBeLessThanOrEqual(b.high);
      expect(b.assumptions.length).toBeGreaterThan(20);
    }
  });

  it("no enrichment text states a currency price outside the budget range", () => {
    for (const h of hobbies) {
      const text = [
        h.difficulty,
        h.timeCommitment,
        h.firstProject,
        h.startupBudget!.assumptions,
        ...h.startSteps!,
        ...h.learningResources!,
      ].join("\n");
      expect(currency.test(text), h.slug).toBe(false);
    }
  });

  it("indexability rule: indexable only when a published article covers the hobby", () => {
    for (const h of hobbies)
      expect(isHobbyIndexable(h.slug)).toBe(articles.some((a) => a.hobbies.includes(h.slug)));
  });
});
