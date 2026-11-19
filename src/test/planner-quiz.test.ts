import { describe, expect, it } from "vitest";
import {
  BUDGETS,
  ENERGIES,
  SETTINGS,
  VIBES,
  WHENS,
  WHOS,
  budgetCap,
  candidates,
  guidesFor,
  makePlan,
  parsePlanSearch,
  planFromIds,
  planHref,
  sanitizePlanData,
  slotsFor,
  type Length,
  type PlanInput,
} from "@/lib/planner";
import { personas, personaCardSvg, findHobbies, plannerSearch, shareText } from "@/lib/finder";
import type { FinderAnswers } from "@/lib/finder";
import { activities, getActivity } from "@/data/activities";
import { getHobby } from "@/data/hobbies";
import { getCollection } from "@/data/products";
import { articles, getArticle } from "@/content";
import { sanitizeSaved } from "@/lib/saved";

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
const lengthsFor = (when: string): Length[] =>
  when === "saturday" || when === "sunday" || when === "weekend"
    ? ["few-hours", "half-day", "full-day"]
    : ["evening", "few-hours"];

function* allInputs(): Generator<PlanInput> {
  for (const when of WHENS)
    for (const length of lengthsFor(when))
      for (const vibe of VIBES)
        for (const who of WHOS)
          for (const budget of BUDGETS)
            yield { ...base, when, length, vibe, who, budget, atHome: false };
}

describe("Activity data", () => {
  it("has details on every activity and consistent cost tiers", () => {
    const ids = new Set<string>();
    for (const a of activities) {
      expect(ids.has(a.id)).toBe(false);
      ids.add(a.id);
      expect(a.name.length).toBeGreaterThan(2);
      expect(a.prep.length).toBeGreaterThan(5);
      expect(a.supplies.length).toBeGreaterThan(0);
      expect(a.costMin).toBeLessThanOrEqual(a.costMax);
      if (a.cost === "free") expect(a.costMax).toBe(0);
      if (a.cost === "under25") expect(a.costMax).toBeLessThanOrEqual(25);
      if (a.cost === "under50") expect(a.costMax).toBeLessThanOrEqual(50);
      if (a.hobby) expect(getHobby(a.hobby)).toBeDefined();
    }
  });
  it("never names real places or prices in text", () => {
    for (const a of activities) {
      expect(`${a.text} ${a.name} ${a.prep}`).not.toMatch(/\$\d|http|www\./i);
    }
  });
  it("guide links only point at hobbies, published articles and collections that exist", () => {
    for (const a of activities)
      for (const g of guidesFor(a)) {
        if (g.kind === "hobby") expect(getHobby(g.slug)).toBeDefined();
        if (g.kind === "article") expect(getArticle(g.slug)).toBeDefined();
        if (g.kind === "shop") expect(getCollection(g.slug)).toBeDefined();
      }
    expect(activities.every((a) => guidesFor(a).length > 0)).toBe(true);
  });
});

describe("Planner itineraries", () => {
  it("keeps the TOTAL itinerary inside the budget for every input combination", () => {
    let checked = 0;
    for (const input of allInputs()) {
      const p = makePlan(input, 0);
      const cap = budgetCap(input.budget);
      if (cap !== null) expect(p.totalCost.max, JSON.stringify(input)).toBeLessThanOrEqual(cap);
      expect(p.withinBudget).toBe(true);
      expect(p.totalCost.min).toBeLessThanOrEqual(p.totalCost.max);
      checked++;
    }
    expect(checked).toBeGreaterThan(1000);
  });
  it("holds with shuffled seeds too, and never repeats an activity", () => {
    for (const seed of [1, 2, 3, 7]) {
      for (const budget of ["free", "under25", "under50"] as const) {
        const p = makePlan({ ...base, when: "weekend", vibe: "cozy", who: "friend", budget }, seed);
        const ids = p.ids.filter(Boolean);
        expect(new Set(ids).size).toBe(ids.length);
        expect(p.totalCost.max).toBeLessThanOrEqual(budgetCap(budget)!);
      }
    }
  });
  it("does not just drop per-activity: an under-$25 full day sums to <= $25", () => {
    const p = makePlan({ ...base, budget: "under25", vibe: "creative" });
    expect(p.totalCost.max).toBeLessThanOrEqual(25);
    expect(p.filled).toBeGreaterThan(0);
  });
  it("free budget gives a $0 itinerary", () => {
    const p = makePlan({ ...base, budget: "free", vibe: "cozy", who: "friend" });
    expect(p.totalCost.max).toBe(0);
    expect(p.slots.every((s) => !s.activity || s.activity.cost === "free")).toBe(true);
  });
  it("covers every requested window: weeknight, morning, afternoon, evening, Sat, Sun, weekend", () => {
    const counts: Record<string, number> = {
      weeknight: 1,
      morning: 1,
      afternoon: 1,
      evening: 1,
      saturday: 3,
      sunday: 3,
      weekend: 6,
    };
    for (const w of WHENS) {
      const input: PlanInput = {
        ...base,
        when: w,
        length: lengthsFor(w).at(-1)!,
        budget: "flexible",
        vibe: "cozy",
      };
      const one = w === "weeknight" || w === "morning" || w === "afternoon" || w === "evening";
      const slots = slotsFor(one ? { ...input, length: "evening" } : input);
      expect(slots).toHaveLength(counts[w]!);
    }
    const weekend = makePlan({ ...base, when: "weekend", budget: "flexible", vibe: "cozy" });
    expect(weekend.slots.map((s) => s.day)).toEqual([
      "Saturday",
      "Saturday",
      "Saturday",
      "Sunday",
      "Sunday",
      "Sunday",
    ]);
  });
  it("legacy after-work behaves like weeknight", () => {
    const a = makePlan({
      ...base,
      when: "after-work",
      length: "evening",
      budget: "flexible",
      vibe: "cozy",
    });
    const b = makePlan({
      ...base,
      when: "weeknight",
      length: "evening",
      budget: "flexible",
      vibe: "cozy",
    });
    expect(a.ids).toEqual(b.ids);
  });
  it("gives sensible, non-overlapping time slots", () => {
    for (const input of allInputs()) {
      const p = makePlan(input);
      let prevEnd = -1;
      let prevDay: string | undefined = "";
      for (const s of p.slots) {
        if (s.day !== prevDay) prevEnd = -1;
        prevDay = s.day;
        expect(s.start).toBeGreaterThan(5 * 60);
        expect(s.start).toBeLessThan(21 * 60 + 1);
        if (s.activity) {
          expect(s.end).toBe(s.start + s.activity.minutes);
          expect(s.end).toBeLessThanOrEqual(22 * 60);
          expect(s.start).toBeGreaterThanOrEqual(prevEnd);
          prevEnd = s.end;
        }
      }
    }
  });
  it("includes every required field for each activity", () => {
    const p = makePlan({ ...base, budget: "flexible", vibe: "outdoorsy", who: "friend" });
    expect(p.filled).toBeGreaterThan(0);
    for (const s of p.slots) {
      if (!s.activity) continue;
      const a = s.activity;
      expect(s.step).toBeGreaterThan(0);
      expect(a.name && a.minutes && a.prep && a.supplies.length).toBeTruthy();
      expect(a.costMax).toBeGreaterThanOrEqual(a.costMin);
      expect(guidesFor(a).length).toBeGreaterThan(0);
    }
    expect(p.totalMinutes).toBeGreaterThan(0);
    expect(p.totalCost.max).toBeGreaterThanOrEqual(p.totalCost.min);
  });
  it("offers an alternative that differs and still fits the budget", () => {
    let seen = 0;
    for (const budget of ["under25", "under50"] as const) {
      const p = makePlan({ ...base, budget, vibe: "cozy", who: "alone" });
      for (const s of p.slots) {
        if (!s.activity || !s.alternative) continue;
        seen++;
        expect(s.alternative.id).not.toBe(s.activity.id);
        expect(p.ids).not.toContain(s.alternative.id);
        expect(p.totalCost.max - s.activity.costMax + s.alternative.costMax).toBeLessThanOrEqual(
          budgetCap(budget)!,
        );
      }
    }
    expect(seen).toBeGreaterThan(0);
  });
  it("is deterministic and the seed changes the pick", () => {
    const i: PlanInput = {
      ...base,
      when: "saturday",
      length: "half-day",
      vibe: "outdoorsy",
      who: "group",
      budget: "flexible",
    };
    expect(makePlan(i, 2).ids).toEqual(makePlan(i, 2).ids);
    const variants = new Set([0, 1, 2, 3].map((s) => makePlan(i, s).ids.join()));
    expect(variants.size).toBeGreaterThan(1);
  });
});

describe("Planner preferences", () => {
  it("respects the energy level", () => {
    for (const vibe of VIBES) {
      const p = makePlan({ ...base, vibe, energy: "low", budget: "flexible", who: "friend" });
      for (const s of p.slots) if (s.activity) expect(s.activity.energy).toBe("low");
    }
  });
  it("respects indoor and outdoor", () => {
    const indoor = makePlan({ ...base, setting: "indoor", budget: "flexible", vibe: "cozy" });
    expect(indoor.slots.every((s) => !s.activity || s.activity.setting !== "outdoor")).toBe(true);
    const outdoor = makePlan({
      ...base,
      setting: "outdoor",
      budget: "flexible",
      vibe: "outdoorsy",
    });
    expect(outdoor.slots.every((s) => !s.activity || s.activity.setting !== "indoor")).toBe(true);
  });
  it("keep-it-at-home only picks home activities", () => {
    const p = makePlan({
      ...base,
      atHome: true,
      budget: "flexible",
      vibe: "creative",
      who: "friend",
    });
    expect(p.filled).toBeGreaterThan(0);
    expect(p.slots.every((s) => !s.activity || s.activity.home)).toBe(true);
  });
  it("honours solo versus friends", () => {
    for (const who of ["alone", "friend"] as const) {
      const p = makePlan({ ...base, who, budget: "flexible", vibe: "social" });
      expect(p.slots.every((s) => !s.activity || s.activity.who.includes(who))).toBe(true);
    }
  });
  it("every vibe and energy and setting has at least one plan somewhere", () => {
    for (const vibe of VIBES) {
      expect(
        makePlan({ ...base, vibe, budget: "flexible", who: "friend", when: "saturday" }).filled,
      ).toBeGreaterThan(0);
    }
    for (const energy of ENERGIES)
      for (const setting of SETTINGS)
        expect(
          makePlan({
            ...base,
            energy,
            setting,
            budget: "flexible",
            vibe: "cozy",
            who: "friend",
            when: "saturday",
          }).filled,
        ).toBeGreaterThan(0);
  });
});

describe("Planner: too restrictive and missing slots", () => {
  it("says so visibly instead of silently dropping a slot", () => {
    const p = makePlan({
      ...base,
      atHome: true,
      setting: "outdoor",
      vibe: "outdoorsy",
      budget: "free",
      when: "weekend",
    });
    // An empty day shows one placeholder with a reason; a partly filled day just shows what fits.
    expect(p.filled + p.missingCount).toBe(p.slots.length);
    expect(p.missingCount).toBeGreaterThan(0);
    for (const s of p.slots)
      if (!s.activity) expect(s.missing && s.missing.length > 20).toBeTruthy();
  });
  it("an impossible request gives an empty plan with a reason for the day", () => {
    const p = makePlan({
      ...base,
      atHome: true,
      setting: "outdoor",
      vibe: "outdoorsy",
      budget: "free",
    });
    expect(p.filled).toBe(0);
    expect(p.slots).toHaveLength(1);
    expect(p.slots.every((s) => s.missing)).toBe(true);
    expect(p.totalCost.max).toBe(0);
  });
  it("explains when the total budget (not any single idea) is the blocker", () => {
    // A $0 budget is easy; a tiny total across a weekend of social paid ideas forces gaps.
    for (const input of allInputs()) {
      const p = makePlan(input);
      for (const s of p.slots) if (!s.activity) expect(s.missing).toBeTruthy();
      expect(p.filled + p.missingCount).toBe(p.slots.length);
    }
  });
  it("reports a budget message when ideas exist but the total cannot stretch", () => {
    const p = makePlan({
      ...base,
      when: "weekend",
      budget: "under25",
      vibe: "social",
      who: "group",
    });
    const gaps = p.slots.filter((s) => !s.activity);
    if (gaps.length) expect(gaps.some((g) => /budget|Try/.test(g.missing!))).toBe(true);
  });
});

describe("Saved plan round trip", () => {
  const inputs: PlanInput[] = [
    base,
    {
      ...base,
      when: "weekend",
      budget: "under50",
      vibe: "relaxing",
      who: "friend",
      energy: "low",
      setting: "indoor",
    },
    { ...base, when: "weeknight", length: "few-hours", atHome: true, vibe: "cozy", budget: "free" },
    { ...base, atHome: true, setting: "outdoor", vibe: "outdoorsy", budget: "free" }, // has missing slots
  ];
  it("restores the exact itinerary from input + seed + ids", () => {
    for (const input of inputs)
      for (const seed of [0, 1, 5]) {
        const p = makePlan(input, seed);
        const back = planFromIds(input, seed, p.ids);
        expect(back).toEqual(p);
      }
  });
  it("survives a trip through the URL", () => {
    for (const input of inputs) {
      const p = makePlan(input, 3);
      const qs = Object.fromEntries(new URLSearchParams(planHref(input, 3, p.ids).split("?")[1]));
      const parsed = parsePlanSearch(qs);
      expect(parsed.ids).toEqual(p.ids);
      expect(parsed.seed).toBe(3);
      expect(planFromIds(parsed.input, parsed.seed, parsed.ids!)?.ids).toEqual(p.ids);
    }
  });
  it("survives a trip through localStorage JSON and sanitizing", () => {
    const input = inputs[1]!;
    const p = makePlan(input, 2);
    const item = {
      key: "plan:x",
      kind: "plan",
      title: p.title,
      href: "/make-plans",
      savedAt: "2026-01-01",
      plan: { input, seed: 2, ids: p.ids },
    };
    const stored = JSON.parse(JSON.stringify([item]));
    const [out] = sanitizeSaved(stored);
    expect(out?.plan).toEqual(item.plan);
    const data = sanitizePlanData(out!.plan)!;
    expect(planFromIds(data.input, data.seed, data.ids)?.ids).toEqual(p.ids);
  });
  it("drops malformed plan payloads but keeps the bookmark", () => {
    const good = { key: "a", kind: "plan", title: "T", href: "/h", savedAt: "2026" };
    const out = sanitizeSaved([{ ...good, plan: { input: 1, seed: "x", ids: [1] } }]);
    expect(out).toHaveLength(1);
    expect(out[0]!.plan).toBeUndefined();
    expect(sanitizePlanData({ input: {}, ids: [1] })).toBeNull();
    expect(sanitizePlanData(null)).toBeNull();
  });
  it("rejects ids that cannot go where they sit and tolerates retired ids", () => {
    // Dinner cannot be the first thing on a Saturday, and a breakfast cannot follow it.
    expect(planFromIds(base, 0, ["dinner-for-one", "slow-breakfast"])).toBeNull();
    expect(
      planFromIds({ ...base, when: "weeknight", length: "evening" }, 0, ["market"]),
    ).toBeNull();
    const p = planFromIds(base, 0, ["gone", "market"])!;
    expect(p.slots[0]!.activity?.id).toBe("market");
    expect(getActivity("gone")).toBeUndefined();
  });
  it("ignores junk search params", () => {
    const p = parsePlanSearch({
      when: "nonsense",
      vibe: 5,
      budget: "lots",
      seed: "-4",
      ids: 3,
      from: "<script>",
    });
    expect(p.input.when).toBe("saturday");
    expect(p.prefilled).toBe(false);
    expect(p.seed).toBe(0);
    expect(p.from).toBeNull();
  });
});

describe("Quiz: personas", () => {
  const cravings = [
    "creativity",
    "relaxation",
    "adventure",
    "friendship",
    "movement",
    "different",
  ] as const;
  const wheres = ["home", "indoors", "outdoors", "out", "anywhere"] as const;
  const times = ["short", "couple", "halfday", "any"] as const;
  const budgets = ["free", "under25", "under50", "flexible"] as const;
  const companies = ["solo", "social", "either"] as const;
  const energies = ["low", "medium", "high"] as const;
  const levels = ["easy", "some", "any"] as const;

  function* answers(): Generator<FinderAnswers> {
    for (const craving of cravings)
      for (const where of wheres)
        for (const time of times)
          for (const budget of budgets)
            for (const company of companies)
              for (const energy of energies)
                for (const level of levels)
                  yield { craving, where, time, budget, company, energy, level };
  }

  it("has all eight personas with valid, existing links", () => {
    expect(Object.keys(personas).sort()).toEqual([
      "bookish",
      "cozy",
      "creative",
      "curious-beginner",
      "little-adventurer",
      "slow-living",
      "social-butterfly",
      "sporty",
    ]);
    for (const p of Object.values(personas)) {
      expect(p.line.length).toBeGreaterThan(30);
      expect(p.hobbies.length).toBeGreaterThanOrEqual(3);
      for (const h of p.hobbies) expect(getHobby(h), `${p.key}:${h}`).toBeDefined();
      expect(getHobby(p.beginnerPick)?.beginner).toBe(1);
      expect(getCollection(p.collection)).toBeDefined();
      for (const g of p.guides)
        expect(
          articles.some((a) => a.slug === g),
          g,
        ).toBe(true);
    }
  });
  it("every persona is reachable from some set of answers", () => {
    const seen = new Set<string>();
    for (const a of answers()) seen.add(findHobbies(a).persona.key);
    expect([...seen].sort()).toEqual(Object.keys(personas).sort());
  });
  it("always returns a persona and a beginner pick, and flags too few matches honestly", () => {
    for (const a of answers()) {
      const r = findHobbies(a);
      expect(r.persona).toBeDefined();
      expect(r.beginnerPick).toBeDefined();
      expect(r.tooFew).toBe(r.results.length < 3);
      expect(r.results.length).toBeLessThanOrEqual(5);
    }
  });
  it("too-restrictive answers return few results and suggest a constraint to loosen", () => {
    const r = findHobbies({
      craving: "movement",
      where: "home",
      time: "short",
      budget: "free",
      company: "social",
      energy: "high",
      level: "easy",
    });
    expect(r.tooFew).toBe(true);
    expect(r.persona.key).toBeDefined();
  });
  it("level 'easy' only returns start-tonight hobbies; 'some' excludes the hardest", () => {
    for (const a of answers()) {
      if (a.level === "any") continue;
      for (const { hobby } of findHobbies(a).results) {
        expect(hobby.beginner).toBeLessThanOrEqual(a.level === "easy" ? 1 : 2);
      }
    }
  });
  it("'indoors' never returns an outdoors-only hobby; 'outdoors' only outdoors hobbies", () => {
    for (const a of answers()) {
      if (a.where === "indoors")
        for (const { hobby } of findHobbies(a).results)
          expect(hobby.settings.some((s) => s !== "outdoors")).toBe(true);
      if (a.where === "outdoors")
        for (const { hobby } of findHobbies(a).results)
          expect(hobby.settings).toContain("outdoors");
    }
  });
  it("free budget never returns a paid hobby", () => {
    for (const craving of cravings) {
      const r = findHobbies({
        craving,
        where: "anywhere",
        time: "any",
        budget: "free",
        company: "either",
        energy: "high",
        level: "any",
      });
      expect(r.results.every((x) => x.hobby.cost === "free")).toBe(true);
    }
  });
  it("old answers without a level still work", () => {
    const r = findHobbies({
      craving: "creativity",
      where: "anywhere",
      time: "any",
      budget: "flexible",
      company: "either",
      energy: "medium",
    });
    expect(r.results.length).toBeGreaterThanOrEqual(3);
  });
});

describe("Quiz to planner hand-off", () => {
  it("carries preferences as valid planner search params", () => {
    for (const a of [
      {
        craving: "movement",
        where: "outdoors",
        time: "halfday",
        budget: "free",
        company: "social",
        energy: "high",
        level: "any",
      },
      {
        craving: "relaxation",
        where: "home",
        time: "short",
        budget: "under25",
        company: "solo",
        energy: "low",
        level: "easy",
      },
      {
        craving: "different",
        where: "indoors",
        time: "any",
        budget: "flexible",
        company: "either",
        energy: "medium",
        level: "some",
      },
    ] as FinderAnswers[]) {
      const persona = findHobbies(a).persona;
      const s = plannerSearch(a, persona);
      const parsed = parsePlanSearch(s);
      expect(parsed.prefilled).toBe(true);
      expect(parsed.from).toBe(persona.key);
      expect(parsed.input.budget).toBe(a.budget);
      expect(parsed.input.energy).toBe(a.energy);
      expect(parsed.input.vibe).toBe(persona.plannerVibe);
      if (a.company === "solo") expect(parsed.input.who).toBe("alone");
      if (a.company === "social") expect(parsed.input.who).toBe("friend");
      if (a.where === "home") expect(parsed.input.atHome).toBe(true);
      if (a.where === "outdoors") expect(parsed.input.setting).toBe("outdoor");
      if (a.where === "indoors") expect(parsed.input.setting).toBe("indoor");
      // and it produces a real plan for the planner
      expect(makePlan(parsed.input).slots.length).toBeGreaterThan(0);
    }
  });
  it("contains no personal data keys", () => {
    const a: FinderAnswers = {
      craving: "creativity",
      where: "home",
      time: "couple",
      budget: "free",
      company: "solo",
      energy: "low",
      level: "easy",
    };
    const keys = Object.keys(plannerSearch(a, personas.creative));
    expect(
      keys.every((k) =>
        ["when", "length", "vibe", "who", "budget", "home", "setting", "energy", "from"].includes(
          k,
        ),
      ),
    ).toBe(true);
  });
});

describe("Shareable result card", () => {
  it("builds a self-contained, escaped SVG and plain share text", () => {
    for (const p of Object.values(personas)) {
      const svg = personaCardSvg(p, "A <Hobby> & Co");
      expect(svg.startsWith("<svg")).toBe(true);
      expect(svg).toContain("&lt;Hobby&gt; &amp; Co");
      expect(svg).not.toContain("<Hobby>");
      expect(svg).not.toMatch(/<script|href=|<image/i);
      expect(svg).toContain(p.name.split(" ").slice(-1)[0]!);
      expect(shareText(p, "Reading")).toContain(p.name);
    }
  });
});

describe("planner budget step and generic ideas", () => {
  it("offers Under $100 and keeps the plan inside it", () => {
    expect(BUDGETS).toContain("under100");
    expect(budgetCap("under100")).toBe(100);
    const plan = makePlan({ ...base, budget: "under100" }, 0);
    expect(plan.withinBudget).toBe(true);
    expect(plan.totalCost.max).toBeLessThanOrEqual(100);
    expect(parsePlanSearch({ budget: "under100" }).input.budget).toBe("under100");
  });

  it("ranks a catch-all idea below specific ones that fit as well", () => {
    const generic = activities.filter((a) => a.generic);
    expect(generic.map((a) => a.id)).toContain("drop-in");
    for (const vibe of VIBES) {
      const input = { ...base, vibe, budget: "flexible" as const, who: "friend" as const };
      for (const def of slotsFor(input)) {
        const list = candidates(input, def);
        const g = list.findIndex((c) => c.a.generic);
        if (g < 0) continue;
        const firstEqualOrWorse = list.findIndex(
          (c, i) => i > g && !c.a.generic && c.score >= list[g]!.score,
        );
        expect(firstEqualOrWorse, `${vibe}`).toBe(-1);
      }
    }
  });
});
