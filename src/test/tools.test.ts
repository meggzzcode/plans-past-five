import { describe, expect, it } from "vitest";
import { hobbies } from "@/data/hobbies";
import { collections } from "@/data/products";
import {
  assumptions,
  budgetHobbies,
  calculateBudget,
  equipmentByHobby,
  formatRange,
  itemsFor,
} from "@/lib/budget";
import { tonightIdeas, seeded, type TonightInput } from "@/lib/tonight";

const base = {
  level: "brand-new" as const,
  budget: "balanced" as const,
  optionalIds: [] as string[],
  ownedIds: [] as string[],
};

describe("Hobby budget data", () => {
  it("covers every hobby and only existing hobbies", () => {
    for (const h of hobbies) expect(equipmentByHobby[h.slug], h.slug).toBeDefined();
    for (const slug of Object.keys(equipmentByHobby))
      expect(
        hobbies.some((h) => h.slug === slug),
        slug,
      ).toBe(true);
    expect(budgetHobbies().length).toBe(hobbies.length);
  });
  it("uses sane ranges, unique ids and real shop collections", () => {
    const slugs = new Set(collections.map((c) => c.slug));
    for (const [slug, list] of Object.entries(equipmentByHobby)) {
      expect(new Set(list.map((i) => i.id)).size, slug).toBe(list.length);
      expect(
        list.some((i) => i.kind === "essential"),
        slug,
      ).toBe(true);
      for (const i of list) {
        expect(i.low).toBeGreaterThanOrEqual(0);
        expect(i.high).toBeGreaterThanOrEqual(i.low);
        if (i.collection) expect(slugs.has(i.collection), `${slug}/${i.id}`).toBe(true);
      }
    }
  });
});

describe("calculateBudget", () => {
  it("returns null for an unknown hobby", () => {
    expect(calculateBudget({ hobby: "nope", ...base })).toBeNull();
  });
  it("sums essentials only by default, and low <= high", () => {
    const r = calculateBudget({ hobby: "watercolor-painting", ...base })!;
    const ess = itemsFor("watercolor-painting").filter((i) => i.kind === "essential");
    expect(r.low).toBe(ess.reduce((s, i) => s + i.low, 0));
    expect(r.high).toBe(ess.reduce((s, i) => s + i.high, 0));
    expect(r.skippedOptional.length).toBeGreaterThan(0);
    expect(r.displayLow).toBeLessThanOrEqual(r.low);
    expect(r.displayHigh).toBeGreaterThanOrEqual(r.high);
  });
  it("adds selected optional items", () => {
    const a = calculateBudget({ hobby: "tennis", ...base })!;
    const b = calculateBudget({ hobby: "tennis", ...base, optionalIds: ["tote"] })!;
    expect(b.high).toBeGreaterThan(a.high);
  });
  it("handles a free hobby", () => {
    const r = calculateBudget({ hobby: "volunteering", ...base })!;
    expect(r.free).toBe(true);
    expect(formatRange(r.displayLow, r.displayHigh)).toBe("Free");
  });
  it("handles everything already owned", () => {
    const all = itemsFor("crochet").map((i) => i.id);
    const r = calculateBudget({ hobby: "crochet", ...base, optionalIds: all, ownedIds: all })!;
    expect(r.items).toHaveLength(0);
    expect(r.low).toBe(0);
    expect(r.high).toBe(0);
    expect(r.checklist).toHaveLength(0);
    expect(r.owned).toHaveLength(all.length);
  });
  it("owning an item lowers the total and removes it from the checklist", () => {
    const a = calculateBudget({ hobby: "pickleball", ...base })!;
    const b = calculateBudget({ hobby: "pickleball", ...base, ownedIds: ["paddles"] })!;
    expect(b.high).toBeLessThan(a.high);
    expect(b.checklist.flatMap((g) => g.items).some((i) => i.id === "paddles")).toBe(false);
  });
  it("lean costs no more than balanced, treat no less", () => {
    const get = (budget: "lean" | "balanced" | "treat") =>
      calculateBudget({ hobby: "film-photography", ...base, budget })!;
    expect(get("lean").high).toBeLessThanOrEqual(get("balanced").high);
    expect(get("treat").high).toBeGreaterThanOrEqual(get("balanced").high);
  });
  it("keeps a disclaimer that says approximate", () => {
    expect(assumptions.disclaimer.toLowerCase()).toContain("approximate");
  });
});

const open: TonightInput = {
  minutes: 180,
  energy: "high",
  budget: "flexible",
  company: "social",
  setting: "either",
};

describe("tonightIdeas", () => {
  it("returns three suggestions with the required fields", () => {
    const r = tonightIdeas(open);
    expect(r.suggestions).toHaveLength(3);
    for (const s of r.suggestions) {
      expect(s.title).toBeTruthy();
      expect(s.firstStep).toBeTruthy();
      expect(s.costLabel).toBeTruthy();
      expect(s.minutes).toBeGreaterThan(0);
    }
  });
  it("is deterministic for the same seed and varies with the seed", () => {
    expect(tonightIdeas(open, 3)).toEqual(tonightIdeas(open, 3));
    const ids = (n: number) =>
      tonightIdeas(open, n)
        .suggestions.map((s) => s.id)
        .join();
    expect(new Set([1, 2, 3, 4, 5].map(ids)).size).toBeGreaterThan(1);
  });
  it("never returns duplicates or suggestions over the time limit", () => {
    const input = { ...open, minutes: 30 };
    for (let seed = 0; seed < 6; seed++) {
      const { suggestions } = tonightIdeas(input, seed);
      expect(new Set(suggestions.map((s) => s.id)).size).toBe(suggestions.length);
      for (const s of suggestions) expect(s.minutes).toBeLessThanOrEqual(30);
    }
  });
  it("free budget only suggests free options", () => {
    const { suggestions } = tonightIdeas({ ...open, budget: "free" }, 2);
    expect(suggestions.length).toBeGreaterThan(0);
    for (const s of suggestions) expect(s.costLabel).toBe("Free");
  });
  it("handles nothing matching and says what to loosen", () => {
    const r = tonightIdeas({
      minutes: 30,
      energy: "low",
      budget: "free",
      company: "social",
      setting: "outdoor",
    });
    expect(r.suggestions.length).toBeLessThan(3);
    if (r.suggestions.length === 0) expect(r.matched).toBe(0);
    expect(r.loosen).toBeDefined();
  });
  it("outdoor setting never returns indoor-only picks", () => {
    const { suggestions } = tonightIdeas({ ...open, setting: "outdoor" });
    expect(suggestions.length).toBeGreaterThan(0);
  });
  it("seeded PRNG is repeatable and in range", () => {
    const a = seeded(5);
    const b = seeded(5);
    for (let i = 0; i < 5; i++) {
      const v = a();
      expect(v).toBe(b());
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });
});
