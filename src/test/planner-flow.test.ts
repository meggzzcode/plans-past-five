import { describe, expect, it } from "vitest";
import { activities } from "@/data/activities";
import {
  BREAK_MINUTES,
  LENGTH_TOLERANCE,
  LENGTHS,
  VIBES,
  WHENS,
  WHOS,
  budgetCap,
  fmtClock,
  inviteLine,
  makePlan,
  parsePlanSearch,
  planFromIds,
  planHref,
  planText,
  whoPhrase,
  type Length,
  type PlanInput,
} from "@/lib/planner";

const base: PlanInput = {
  when: "saturday",
  length: "full-day",
  vibe: "creative",
  who: "alone",
  budget: "under25",
  atHome: false,
  setting: "any",
  energy: "any",
};
const isDay = (w: string) => w === "saturday" || w === "sunday" || w === "weekend";
const lengthsFor = (w: string): Length[] =>
  isDay(w) ? ["few-hours", "half-day", "full-day"] : ["evening", "few-hours"];

function* inputs(budgets: PlanInput["budget"][] = ["flexible", "under25"]): Generator<PlanInput> {
  for (const when of WHENS)
    for (const length of lengthsFor(when))
      for (const vibe of VIBES)
        for (const who of WHOS)
          for (const budget of budgets) yield { ...base, when, length, vibe, who, budget };
}

const m = (h: number, min = 0) => h * 60 + min;

describe("Time windows", () => {
  it("places every activity inside its own start window, in order, with a break between stops", () => {
    let stops = 0;
    for (const input of inputs()) {
      const p = makePlan(input, 1);
      let prev: { day?: string; end: number } | null = null;
      for (const s of p.slots) {
        const a = s.activity;
        if (!a) continue;
        stops++;
        expect(
          a.at.some(([from, to]) => s.start >= from && s.start <= to),
          `${a.id} at ${fmtClock(s.start)} for ${JSON.stringify(input)}`,
        ).toBe(true);
        expect(s.end - s.start).toBe(a.minutes);
        if (prev && prev.day === s.day)
          expect(s.start).toBeGreaterThanOrEqual(prev.end + BREAK_MINUTES);
        prev = { ...(s.day ? { day: s.day } : {}), end: s.end };
      }
    }
    expect(stops).toBeGreaterThan(2000);
  });

  it("keeps time-of-day words honest: golden hour and sunset in the evening, breakfast in the morning", () => {
    const rules: [RegExp, number, number][] = [
      [/golden|sunset/i, m(16), m(20)],
      [/stargaz/i, m(18), m(21, 30)],
      [/breakfast/i, m(7), m(11)],
      [/dinner|cook a new recipe/i, m(17), m(20, 30)],
      [/morning/i, m(6), m(12)],
    ];
    for (const a of activities)
      for (const [re, from, to] of rules)
        if (re.test(`${a.name} ${a.text}`))
          for (const [w0, w1] of a.at) {
            expect(w0, a.id).toBeGreaterThanOrEqual(from);
            expect(w1, a.id).toBeLessThanOrEqual(to);
          }
  });

  it("never schedules the golden-hour walk at 1:30 PM, whatever is chosen", () => {
    for (const input of inputs(["flexible"]))
      for (const seed of [0, 1, 2, 3]) {
        const walk = makePlan(input, seed).slots.find((s) => s.activity?.id === "park-walk");
        if (walk) expect(walk.start).toBeGreaterThanOrEqual(m(16));
      }
  });

  it("swap suggestions also fit the time", () => {
    for (const input of inputs()) {
      const p = makePlan(input, 2);
      for (const s of p.slots) {
        if (!s.alternative || !s.activity) continue;
        const ids = p.ids.map((i) => (i === s.activity!.id ? s.alternative!.id : i));
        expect(
          planFromIds(input, 2, ids),
          `${s.activity.id} -> ${s.alternative.id}`,
        ).not.toBeNull();
      }
    }
  });
});

describe("Chosen length", () => {
  it("covers most of the chosen length, or says clearly what was not possible", () => {
    let withNote = 0;
    let honoured = 0;
    for (const input of inputs()) {
      const p = makePlan(input, 0);
      if (p.targetMinutes === null || p.filled === 0) continue;
      if (p.spanMinutes >= p.targetMinutes * LENGTH_TOLERANCE) {
        expect(p.lengthNote, JSON.stringify(input)).toBeNull();
        honoured++;
      } else {
        expect(p.lengthNote, JSON.stringify(input)).toMatch(/You asked for .* We could fit about /);
        withNote++;
      }
    }
    expect(honoured).toBeGreaterThan(withNote * 3);
  });

  it("a half day that can be filled is filled (Sunday, outdoorsy, a friend)", () => {
    const p = makePlan({
      ...base,
      when: "sunday",
      length: "half-day",
      vibe: "outdoorsy",
      who: "friend",
      budget: "flexible",
      energy: "high",
    });
    expect(p.spanMinutes).toBeGreaterThanOrEqual(200);
    expect(p.lengthNote).toBeNull();
  });

  it("a half day is longer than a few hours", () => {
    for (const vibe of VIBES) {
      const half = makePlan({ ...base, vibe, length: "half-day", budget: "flexible" });
      const few = makePlan({ ...base, vibe, length: "few-hours", budget: "flexible" });
      expect(half.spanMinutes, vibe).toBeGreaterThan(few.spanMinutes);
    }
  });
});

describe("Who is coming", () => {
  it("shows in the title for every choice, and each choice reads differently", () => {
    const titles = WHOS.map((who) => makePlan({ ...base, who, budget: "flexible" }).title);
    WHOS.forEach((who, i) => expect(titles[i]).toContain(whoPhrase[who]));
    expect(new Set(titles).size).toBe(4);
    expect(makePlan({ ...base, who: "friend" }).title).toMatch(/with a friend$/);
    expect(makePlan({ ...base, who: "partner" }).title).toMatch(/with your partner$/);
  });
  it("only suggests ideas that suit the company", () => {
    for (const input of inputs())
      for (const s of makePlan(input).slots)
        if (s.activity) expect(s.activity.who).toContain(input.who);
  });
  it("words the invite for who is coming", () => {
    const lines = WHOS.map((who) => inviteLine({ ...base, who, when: "sunday" }));
    expect(new Set(lines).size).toBe(4);
    expect(lines[1]).toMatch(/join me/);
    expect(lines[2]).toMatch(/Date plan/);
    expect(lines[3]).toMatch(/Who's in/);
  });
});

describe("Share links and text", () => {
  const cases: [PlanInput, number][] = [
    [base, 0],
    [{ ...base, when: "weekend", who: "friend", vibe: "social", budget: "under50" }, 2],
    [{ ...base, when: "sunday", length: "half-day", vibe: "outdoorsy", budget: "flexible" }, 1],
    [
      { ...base, when: "weeknight", length: "evening", vibe: "cozy", budget: "free", atHome: true },
      0,
    ],
    [{ ...base, atHome: true, setting: "outdoor", vibe: "outdoorsy", budget: "free" }, 0], // empty plan
  ];
  it("restores the same plan from the URL query alone", () => {
    for (const [input, seed] of cases) {
      const p = makePlan(input, seed);
      const qs = Object.fromEntries(
        new URLSearchParams(planHref(input, seed, p.ids).split("?")[1]),
      );
      const parsed = parsePlanSearch(qs);
      expect(parsed.ids).not.toBeNull();
      const back = planFromIds(parsed.input, parsed.seed, parsed.ids!);
      expect(back).toEqual(p);
    }
  });
  it("puts only plan choices in the URL, no personal data", () => {
    const p = makePlan(base, 0);
    const keys = [...new URLSearchParams(planHref(base, 0, p.ids).split("?")[1]).keys()].sort();
    expect(keys).toEqual([
      "budget",
      "energy",
      "home",
      "ids",
      "length",
      "seed",
      "setting",
      "vibe",
      "when",
      "who",
    ]);
  });
  it("copies plain text with times, costs and the link", () => {
    const p = makePlan(
      { ...base, when: "weekend", who: "friend", vibe: "social", budget: "under50" },
      2,
    );
    const url = "https://example.test/make-plans?x=1";
    const text = planText(p, url);
    const lines = text.split("\n");
    expect(lines[0]).toBe(p.title);
    expect(lines[1]).toBe(inviteLine(p.input));
    expect(lines).toContain("Saturday");
    expect(lines).toContain("Sunday");
    for (const s of p.slots) expect(text).toContain(`${fmtClock(s.start)}  ${s.activity!.name} (`);
    expect(text).toMatch(/Total: .*(Free|about \$)/);
    expect(lines.at(-1)).toBe(`Open the same plan: ${url}`);
    expect(text).not.toMatch(/<|&nbsp;/);
    const cap = budgetCap(p.input.budget)!;
    expect(p.totalCost.max).toBeLessThanOrEqual(cap);
  });
  it("makes an empty plan restorable too", () => {
    const input: PlanInput = {
      ...base,
      atHome: true,
      setting: "outdoor",
      vibe: "outdoorsy",
      budget: "free",
    };
    const p = makePlan(input, 0);
    expect(p.filled).toBe(0);
    expect(planFromIds(input, 0, p.ids)?.filled).toBe(0);
  });
});

describe("Result content for the timeline cards", () => {
  it("gives every activity a short title and a short how-to-start line", () => {
    for (const a of activities) {
      expect(a.name.split(/\s+/).length, a.id).toBeLessThanOrEqual(6);
      expect(a.prep.length, a.id).toBeLessThanOrEqual(110);
    }
  });
  it("lengths list stays in sync with the planner", () => {
    expect(LENGTHS).toEqual(["evening", "few-hours", "half-day", "full-day"]);
  });
});
