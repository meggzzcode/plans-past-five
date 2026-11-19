import { describe, expect, it } from "vitest";
import { hobbies, getHobby } from "@/data/hobbies";
import {
  bucketForHigh,
  costBucketLabels,
  costBucketMax,
  equipmentByHobby,
  startupRange,
} from "@/data/equipment";
import { assumptions, calculateBudget, itemsFor } from "@/lib/budget";

/** The three ranges the budget tool can show for a brand-new beginner. */
function toolRanges(slug: string) {
  const base = { hobby: slug, level: "brand-new" as const, optionalIds: [], ownedIds: [] };
  const lean = calculateBudget({ ...base, budget: "lean" })!;
  const typical = calculateBudget({ ...base, budget: "balanced" })!;
  const full = calculateBudget({
    ...base,
    budget: "balanced",
    optionalIds: itemsFor(slug).map((i) => i.id),
  })!;
  return { lean, typical, full };
}

describe("one source of truth for hobby start-up cost", () => {
  it.each(hobbies.map((h) => [h.slug, h] as const))(
    "%s: card label, profile range and tool ranges agree",
    (slug, h) => {
      const { lean, typical, full } = toolRanges(slug);
      const profile = h.startupBudget!;

      // tool ordering
      expect(lean.displayLow).toBeLessThanOrEqual(typical.displayLow);
      expect(lean.displayHigh).toBeLessThanOrEqual(typical.displayHigh);
      expect(typical.displayLow).toBeLessThanOrEqual(full.displayLow);
      expect(typical.displayHigh).toBeLessThanOrEqual(full.displayHigh);

      // profile range is the tool's default (typical) range, same rounding
      expect(profile.low).toBe(typical.displayLow);
      expect(profile.high).toBe(typical.displayHigh);
      expect(startupRange(slug)).toEqual({ low: profile.low, high: profile.high });

      // "keep it lean" never exceeds the profile's top of range
      expect(lean.displayHigh).toBeLessThanOrEqual(profile.high);

      // card bucket comes from the same numbers and contains lean (and typical)
      expect(h.cost).toBe(bucketForHigh(profile.high));
      expect(h.costLabel).toBe(costBucketLabels[h.cost]);
      expect(lean.displayHigh).toBeLessThanOrEqual(costBucketMax[h.cost]);
      expect(typical.displayHigh).toBeLessThanOrEqual(costBucketMax[h.cost]);
      if (h.cost === "free") expect(typical.free).toBe(true);
      else expect(profile.high).toBeGreaterThan(0);
    },
  );

  it("every hobby has an equipment list and the low-cost tag follows the bucket", () => {
    for (const h of hobbies) {
      expect(equipmentByHobby[h.slug], h.slug).toBeDefined();
      expect(h.tags.includes("low-cost"), h.slug).toBe(h.cost === "free" || h.cost === "under25");
    }
  });

  it("watercolor and tennis no longer contradict each other across pages", () => {
    const w = getHobby("watercolor-painting")!;
    const wt = toolRanges(w.slug);
    expect(w.startupBudget!.high).toBe(wt.typical.displayHigh);
    expect(wt.lean.displayHigh).toBeLessThanOrEqual(w.startupBudget!.high);

    const t = getHobby("tennis")!;
    const tt = toolRanges(t.slug);
    expect(t.cost).toBe("under50");
    expect(t.costLabel).toBe("Under $50 to start");
    expect(tt.lean.displayHigh).toBeLessThanOrEqual(50);
    expect(tt.typical.displayHigh).toBeLessThanOrEqual(50);
  });

  it("keep-it-lean is actually lean for every hobby and level", () => {
    for (const h of hobbies) {
      for (const level of ["brand-new", "dabbled", "returning"] as const) {
        const lean = calculateBudget({
          hobby: h.slug,
          level,
          budget: "lean",
          optionalIds: [],
          ownedIds: [],
        })!;
        const bal = calculateBudget({
          hobby: h.slug,
          level,
          budget: "balanced",
          optionalIds: [],
          ownedIds: [],
        })!;
        expect(lean.high, `${h.slug}/${level}`).toBeLessThanOrEqual(bal.high);
      }
    }
  });

  it("keeps every number labelled as an estimate", () => {
    expect(assumptions.disclaimer).toMatch(/approximate/i);
    expect(assumptions.disclaimer).toMatch(/not live prices/i);
    for (const h of hobbies) expect(h.startupBudget!.assumptions.length).toBeGreaterThan(20);
    for (const label of Object.values(costBucketLabels))
      expect(label).not.toMatch(/exactly|costs \$/i);
  });
});

describe("solo and social filters are meaningful", () => {
  const solo = hobbies.filter((h) => h.tags.includes("solo"));
  const social = hobbies.filter((h) => h.tags.includes("social"));
  const soloOnly = hobbies.filter((h) => h.company.length === 1 && h.company[0] === "solo");
  const socialOnly = hobbies.filter((h) => h.company.length === 1 && h.company[0] === "social");
  const both = hobbies.filter((h) => h.company.length === 2);

  it("neither filter returns almost everything", () => {
    expect(solo.length).toBeLessThan(hobbies.length * 0.75);
    expect(social.length).toBeLessThan(hobbies.length * 0.75);
  });
  it("solo-only, social-only and both are each a real group", () => {
    expect(soloOnly.length).toBeGreaterThanOrEqual(14);
    expect(soloOnly.length).toBeLessThanOrEqual(18);
    expect(socialOnly.length).toBeGreaterThanOrEqual(10);
    expect(both.length).toBeGreaterThanOrEqual(6);
    // Upper bound widened from 10 to 14 when Running, Climbing and Cooking Classes (solo or social) were added.
    expect(both.length).toBeLessThanOrEqual(14);
    expect(soloOnly.length + socialOnly.length + both.length).toBe(hobbies.length);
  });
  it("Active has more than four hobbies and includes yoga", () => {
    const active = hobbies.filter((h) => h.tags.includes("active"));
    expect(active.length).toBeGreaterThanOrEqual(6);
    expect(active.map((h) => h.slug)).toContain("yoga-for-beginners");
  });
});
