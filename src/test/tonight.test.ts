import { describe, expect, it } from "vitest";
import {
  needsOthersWording,
  notTonightWording,
  tonightIdeas,
  type TonightInput,
} from "@/lib/tonight";
import { hobbies } from "@/data/hobbies";

const times = [30, 60, 120, 180];
const energies = ["low", "medium", "high"] as const;
const budgets = ["free", "under25", "under50", "flexible"] as const;
const settings = ["indoor", "outdoor", "either"] as const;

function* inputs(company: "solo" | "social"): Generator<TonightInput> {
  for (const minutes of times)
    for (const energy of energies)
      for (const budget of budgets)
        for (const setting of settings) yield { minutes, energy, budget, company, setting };
}

describe("tonight: no contradictions", () => {
  it("'Just me' never suggests something that needs a friend", () => {
    for (const i of inputs("solo"))
      for (const seed of [0, 1, 2, 3]) {
        for (const s of tonightIdeas(i, seed).suggestions) {
          expect(`${s.title} ${s.firstStep}`, JSON.stringify(i)).not.toMatch(needsOthersWording);
          // hobby suggestions must be ones that work alone
          if (s.id.startsWith("hobby:"))
            expect(hobbies.find((h) => h.slug === s.hobbySlug)!.company).toContain("solo");
        }
      }
  });

  it("tonight never mentions another day or part of the day", () => {
    for (const company of ["solo", "social"] as const)
      for (const i of inputs(company))
        for (const seed of [0, 1, 2]) {
          for (const s of tonightIdeas(i, seed).suggestions)
            expect(`${s.title} ${s.firstStep}`, `${s.id}`).not.toMatch(notTonightWording);
        }
  });

  it("does not suggest daylight-only hobbies like hiking or picnicking tonight", () => {
    const seen = new Set<string>();
    for (const i of inputs("social"))
      for (const s of tonightIdeas(i, 0).suggestions) if (s.hobbySlug) seen.add(s.hobbySlug);
    for (const i of inputs("solo"))
      for (const s of tonightIdeas(i, 0).suggestions) if (s.hobbySlug) seen.add(s.hobbySlug);
    for (const bad of ["hiking", "picnicking", "birdwatching", "thrifting"])
      expect(seen.has(bad), bad).toBe(false);
  });

  it("ideas only come from the evening part of the day", () => {
    const evening = tonightIdeas(
      { minutes: 180, energy: "high", budget: "flexible", company: "social", setting: "either" },
      0,
    );
    for (const s of evening.suggestions) expect(s.id).not.toBe("idea:market");
  });

  it("the hobby first steps no longer name weekdays", () => {
    for (const h of hobbies) expect(h.firstActivity, h.slug).not.toMatch(notTonightWording);
  });
});

describe("tonight: guide links match the idea", () => {
  it("only links a guide whose primary hobby is the suggestion's hobby", async () => {
    const { getArticle } = await import("@/content");
    for (const company of ["solo", "social"] as const)
      for (const i of inputs(company))
        for (const s of tonightIdeas(i, 0).suggestions)
          if (s.guideSlug) {
            expect(getArticle(s.guideSlug)!.hobbies[0], s.id).toBe(s.hobbySlug);
          }
  });
});
