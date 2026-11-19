import { describe, expect, it } from "vitest";
import { hobbies, type Cost, type Energy } from "@/data/hobbies";
import { activities } from "@/data/activities";
import { findHobbies, type FinderAnswers } from "@/lib/finder";
import { QUIZ_VALUES } from "@/lib/quiz-flow";
import {
  BUDGETS,
  ENERGIES,
  LENGTHS,
  VIBES,
  WHOS,
  WHENS,
  budgetCap,
  makePlan,
  slotsFor,
  planFromIds,
  type PlanInput,
  type When,
} from "@/lib/planner";
import {
  needsOthersWording,
  notTonightWording,
  tonightIdeas,
  type TonightInput,
} from "@/lib/tonight";
import { search, searchDetailed } from "@/lib/search";
import { equipmentByHobby } from "@/data/equipment";
import { startupRange } from "@/data/equipment";

/**
 * Scenario matrix: enumerates realistic combinations of answers (not only ideal ones) and asserts
 * invariants that must hold for every one of them. The counts are exported to the console so
 * docs/marketplace/TOOLS-SCENARIO-REPORT.md can quote them.
 */

const counts: Record<string, number> = {};
/** Groups problems by their first word so a failure shows every kind of violation, not just 15 lines. */
const summarize = (problems: string[]) => {
  const g = new Map<string, string[]>();
  for (const p of problems) {
    const k = p.split(" ")[0]!;
    g.set(k, [...(g.get(k) ?? []), p]);
  }
  return [...g].map(([k, v]) => `${k} x${v.length}: ${v[0]!.slice(0, 220)}`);
};
const bump = (k: string, n = 1) => (counts[k] = (counts[k] ?? 0) + n);

/* ------------------------------------------------------------------ quiz */

const WHERE = [...QUIZ_VALUES.where, "indoors"] as FinderAnswers["where"][];
const LEVELS = [undefined, "easy", "some", "any"] as const;

function* quizAnswers(): Generator<FinderAnswers> {
  for (const craving of QUIZ_VALUES.craving)
    for (const where of WHERE)
      for (const time of QUIZ_VALUES.time)
        for (const budget of QUIZ_VALUES.budget)
          for (const company of QUIZ_VALUES.company)
            for (const energy of QUIZ_VALUES.energy)
              yield {
                craving,
                where,
                time,
                budget,
                company,
                energy,
              } as FinderAnswers;
}

const maxMin = { short: 45, couple: 120, halfday: 240, any: Infinity } as const;
const rankE: Record<Energy, number> = { low: 0, medium: 1, high: 2 };
const rankC: Record<Cost, number> = { free: 0, under25: 1, under50: 2, flexible: 3 };

describe("quiz scenario matrix", () => {
  it("every combination returns honest, non-contradictory results", () => {
    let n = 0;
    let weak = 0;
    const problems: string[] = [];
    for (const a of quizAnswers()) {
      n++;
      const r = findHobbies(a);
      const tag = JSON.stringify(a);
      if (r.tooFew) weak++;
      // never silent: either 3+ exact matches, or the nearest list + a named blocker
      if (r.results.length === 0 && r.nearest.length === 0) problems.push(`empty ${tag}`);
      if (r.tooFew && r.results.length < 3 && !r.loosen && r.nearest.length)
        problems.push(`no blocker named ${tag}`);
      if (r.strength !== (r.tooFew ? "weak" : "strong")) problems.push(`strength ${tag}`);
      for (const { hobby: h } of r.results) {
        if (a.company === "solo" && !h.company.includes("solo"))
          problems.push(`solo ${h.slug} ${tag}`);
        if (a.company === "social" && !h.company.includes("social"))
          problems.push(`social ${h.slug} ${tag}`);
        if (a.budget === "free" && h.cost !== "free") problems.push(`free ${h.slug} ${tag}`);
        if (rankC[h.cost === "flexible" ? "under50" : h.cost] > rankC[a.budget])
          problems.push(`budget ${h.slug} ${tag}`);
        if (a.where === "outdoors" && !h.settings.includes("outdoors"))
          problems.push(`outdoors ${h.slug} ${tag}`);
        if (a.where === "home" && !h.settings.includes("home"))
          problems.push(`home ${h.slug} ${tag}`);
        if (a.where === "out" && !h.settings.includes("out")) problems.push(`out ${h.slug} ${tag}`);
        if (a.where === "indoors" && h.settings.every((s) => s === "outdoors"))
          problems.push(`indoors ${h.slug} ${tag}`);
        if (h.minutes > maxMin[a.time]) problems.push(`time ${h.slug} ${tag}`);
        if (rankE[h.energy] > rankE[a.energy] + 1) problems.push(`energy ${h.slug} ${tag}`);
        // a "fumes" answer never gets a high-energy hobby; a "challenge" answer never a pure low one
        if (a.energy === "low" && h.energy === "high") problems.push(`fumes-high ${h.slug} ${tag}`);
        // the reasons shown must not claim something false
        const why = findHobbies(a)
          .results.find((x) => x.hobby === h)!
          .why.join(" | ");
        if (/gets you outside/.test(why) && !h.settings.includes("outdoors"))
          problems.push(`why-outside ${h.slug} ${tag}`);
        if (/works at home/.test(why) && !h.settings.includes("home"))
          problems.push(`why-home ${h.slug} ${tag}`);
      }
      // the card must never show hobbies that were listed as "nearest" twice
      const shown = new Set(r.results.map((x) => x.hobby.slug));
      for (const nn of r.nearest) if (shown.has(nn.hobby.slug)) problems.push(`dup ${tag}`);
      // the loosen constraint must really be something a nearest hobby breaks
      if (r.loosen && !r.nearest.some((x) => x.breaks.includes(r.loosen!.constraint)))
        problems.push(`loosen ${tag}`);
    }
    bump("quiz combinations", n);
    bump("quiz combinations needing the honest 'nothing fits' state", weak);
    expect(summarize(problems)).toEqual([]);
  });

  it("level filter is honoured", () => {
    for (const level of LEVELS) {
      let n = 0;
      for (const craving of QUIZ_VALUES.craving)
        for (const company of QUIZ_VALUES.company) {
          n++;
          const r = findHobbies({
            craving,
            where: "anywhere",
            time: "any",
            budget: "flexible",
            company,
            energy: "high",
            ...(level ? { level } : {}),
          } as FinderAnswers);
          for (const { hobby: h } of r.results) {
            if (level === "easy") expect(h.beginner).toBe(1);
            if (level === "some") expect(h.beginner).toBeLessThanOrEqual(2);
          }
        }
      bump("quiz level scenarios", n);
    }
  });
});

describe("hobby data consistency (tags, settings, costs)", () => {
  it("tags agree with settings, energy, cost and category", () => {
    for (const h of hobbies) {
      expect(h.tags.includes("outdoors"), `${h.slug} outdoors tag`).toBe(
        h.settings.includes("outdoors"),
      );
      expect(h.tags.includes("at-home"), `${h.slug} at-home tag`).toBe(h.settings.includes("home"));
      expect(h.tags.includes("low-energy"), `${h.slug} low-energy`).toBe(h.energy === "low");
      expect(h.tags.includes("solo"), `${h.slug} solo`).toBe(h.company.includes("solo"));
      expect(h.tags.includes("social"), `${h.slug} social`).toBe(h.company.includes("social"));
      expect(h.tags.includes("low-cost"), `${h.slug} low-cost`).toBe(
        h.cost === "free" || h.cost === "under25",
      );
    }
  });

  it("Reading, Crossword and Book Clubs are not outdoor hobbies", () => {
    for (const s of ["reading", "crossword-puzzles", "book-clubs", "jigsaw-puzzles", "mahjong"]) {
      const h = hobbies.find((x) => x.slug === s)!;
      expect(h.settings, s).not.toContain("outdoors");
    }
  });

  it("card bucket, profile range and budget tool use one source (equipment.ts)", () => {
    for (const h of hobbies) {
      const range = startupRange(h.slug);
      expect(range, `${h.slug} has equipment`).toBeTruthy();
      expect(equipmentByHobby[h.slug]).toBeTruthy();
      if (range) {
        if (h.cost === "free") expect(range.high, h.slug).toBe(0);
        if (h.cost === "under25") expect(range.high, h.slug).toBeLessThanOrEqual(25);
        if (h.cost === "under50") expect(range.high, h.slug).toBeLessThanOrEqual(50);
        if (h.startupBudget) {
          expect(h.startupBudget.low, h.slug).toBe(range.low);
          expect(h.startupBudget.high, h.slug).toBe(range.high);
        }
      }
    }
  });

  it("the pool is wide enough: every category has options and Active has more than 4", () => {
    const by = (c: string) => hobbies.filter((h) => h.category === c).length;
    expect(by("active")).toBeGreaterThan(4);
    for (const c of ["creative", "cozy", "social", "outdoors", "bookish", "active"])
      expect(by(c), c).toBeGreaterThanOrEqual(2);
    bump("hobbies in pool", hobbies.length);
  });
});

/* --------------------------------------------------------------- planner */

const lengthsFor = (w: When) =>
  w === "saturday" || w === "sunday" || w === "weekend"
    ? LENGTHS.filter((l) => l !== "evening")
    : LENGTHS.filter((l) => l === "evening" || l === "few-hours");

const OTHER_DAY =
  /\b(mon|tues|wednes|thurs|fri|satur|sun)day\b|\bweekends?\b|\btomorrow\b|\bnext week\b/i;
const clock = (m: number) => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`;

const DAYPART_RULES: { re: RegExp; ok: (start: number) => boolean; why: string }[] = [
  { re: /golden[- ]hour|sunset/i, ok: (s) => s >= 16 * 60, why: "golden hour/sunset before 4pm" },
  { re: /sunrise/i, ok: (s) => s <= 9 * 60 + 30, why: "sunrise after 9:30" },
  { re: /\bbreakfast\b/i, ok: (s) => s <= 11 * 60 + 30, why: "breakfast after 11:30" },
  { re: /\bbrunch\b/i, ok: (s) => s >= 9 * 60 && s <= 13 * 60, why: "brunch outside 9-13" },
  { re: /\bdinner\b/i, ok: (s) => s >= 17 * 60, why: "dinner before 5pm" },
  {
    re: /stargaz|\bstars\b|after dark|moonlit|late[- ]night/i,
    ok: (s) => s >= 17 * 60 + 30,
    why: "night idea before 5:30",
  },
  { re: /\bmorning\b/i, ok: (s) => s < 12 * 60, why: "'morning' idea after noon" },
  {
    re: /\bafternoon\b/i,
    ok: (s) => s >= 12 * 60 && s < 18 * 60,
    why: "'afternoon' idea outside noon-6",
  },
  {
    re: /\b(tonight|evening|nightcap|after dinner)\b/i,
    ok: (s) => s >= 16 * 60 + 30,
    why: "'evening' idea before 4:30",
  },
];

function* planInputs(): Generator<PlanInput> {
  for (const when of WHENS)
    for (const length of lengthsFor(when))
      for (const who of WHOS)
        for (const budget of BUDGETS)
          for (const energy of ENERGIES)
            for (const vibe of VIBES)
              yield { when, length, vibe, who, budget, atHome: false, setting: "any", energy };
}

function* planSettingInputs(): Generator<PlanInput> {
  for (const when of ["weeknight", "saturday", "weekend"] as const)
    for (const setting of ["indoor", "outdoor"] as const)
      for (const atHome of [false, true])
        for (const who of WHOS)
          for (const budget of BUDGETS)
            for (const vibe of VIBES)
              yield {
                when,
                length: when === "weeknight" ? "few-hours" : "half-day",
                vibe,
                who,
                budget,
                atHome,
                setting,
                energy: "any",
              };
}

function checkPlan(input: PlanInput, problems: string[]) {
  const plan = makePlan(input, 0);
  const tag = JSON.stringify(input);
  const defs = slotsFor(input);
  const cap = budgetCap(input.budget);
  const acts = plan.slots.flatMap((s) => (s.activity ? [{ s, a: s.activity }] : []));
  // no empty / contradictory result
  if (plan.filled === 0 && !plan.slots.every((s) => s.missing))
    problems.push(`silent-empty ${tag}`);
  for (const sl of plan.slots) if (!sl.activity && !sl.missing) problems.push(`no-reason ${tag}`);
  if (plan.filled !== acts.length) problems.push(`filled-count ${tag}`);
  // company
  for (const { a } of acts) {
    if (!a.who.includes(input.who)) problems.push(`who ${a.id} ${tag}`);
    if (input.who === "alone" && !a.who.includes("alone")) problems.push(`solo-group ${a.id}`);
  }
  // budget
  const sumMax = acts.reduce((t, x) => t + x.a.costMax, 0);
  const sumMin = acts.reduce((t, x) => t + x.a.costMin, 0);
  if (plan.totalCost.max !== sumMax || plan.totalCost.min !== sumMin) problems.push(`total ${tag}`);
  if (plan.totalCost.typical < plan.totalCost.min || plan.totalCost.typical > plan.totalCost.max)
    problems.push(`typical-out-of-range ${tag}`);
  if (cap !== null && plan.totalCost.typical > cap) problems.push(`typical>cap ${tag}`);
  if (cap !== null && plan.totalCost.max > cap)
    problems.push(`cap ${plan.totalCost.max}>${cap} ${tag}`);
  if (plan.withinBudget !== (cap === null || sumMax <= cap)) problems.push(`withinBudget ${tag}`);
  if (input.budget === "free")
    for (const { a } of acts)
      if (a.costMax > 0 || a.cost !== "free") problems.push(`paid-in-free ${a.id}`);
  for (const { a } of acts) {
    if (a.costMin > a.costMax) problems.push(`cost-range ${a.id}`);
    if (a.cost === "free" && a.costMax > 0) problems.push(`cost-bucket ${a.id}`);
  }
  // setting / home / energy
  for (const { a } of acts) {
    if (input.setting === "indoor" && a.setting === "outdoor") problems.push(`indoor ${a.id}`);
    if (input.setting === "outdoor" && a.setting === "indoor") problems.push(`outdoor ${a.id}`);
    if (input.atHome && !a.home) problems.push(`home ${a.id}`);
    if (input.energy && input.energy !== "any" && rankE[a.energy] > rankE[input.energy])
      problems.push(`energy ${a.id} ${tag}`);
  }
  // time windows
  let prevEnd = -1;
  let prevDay: string | undefined = "x";
  for (const { s, a } of acts) {
    const day = s.day ?? "";
    if (day !== prevDay) prevEnd = -1;
    prevDay = day;
    if (s.end - s.start !== a.minutes) problems.push(`duration ${a.id}`);
    if (s.start < prevEnd) problems.push(`overlap ${a.id} ${tag}`);
    prevEnd = s.end;
    const inWindow = a.at.some(([f, t]) => s.start >= f && s.start <= t);
    if (!inWindow) problems.push(`start-window ${a.id}@${clock(s.start)} ${tag}`);
    const lo = Math.min(...defs.map((d) => d.from));
    const hi = Math.max(...defs.map((d) => d.to));
    if (s.start < lo || s.end > hi) problems.push(`outside-slot ${a.id}@${clock(s.start)} ${tag}`);
    const words = `${a.name} ${a.text}`;
    for (const r of DAYPART_RULES)
      if (r.re.test(words) && !r.ok(s.start))
        problems.push(`${r.why}: ${a.id}@${clock(s.start)} ${tag}`);
    const w = input.when === "after-work" ? "weeknight" : input.when;
    if ((w === "weeknight" || w === "evening") && OTHER_DAY.test(a.name))
      problems.push(`other-day-wording ${a.id} ${tag}`);
    if (w === "weeknight" || w === "evening") {
      if (s.start < 17 * 60) problems.push(`weeknight-too-early ${a.id}@${clock(s.start)}`);
      if (/\b(satur|sun)day\b|\bweekend\b/i.test(words)) problems.push(`weekend-wording ${a.id}`);
    }
    if (w === "saturday" && /\bsunday\b/i.test(words)) problems.push(`wrong-day ${a.id}`);
    if (w === "sunday" && /\bsaturday\b/i.test(words)) problems.push(`wrong-day ${a.id}`);
  }
  // length matches the window: covers >=75% of the chosen length, or says why it does not
  if (plan.targetMinutes !== null && plan.filled > 0) {
    const ok = plan.spanMinutes >= plan.targetMinutes * 0.75;
    if (!ok && !plan.lengthNote)
      problems.push(`length-silent ${plan.spanMinutes}/${plan.targetMinutes} ${tag}`);
    if (ok && plan.lengthNote) problems.push(`length-note-needless ${tag}`);
    // never longer than the chosen window
    if (plan.spanMinutes > plan.targetMinutes * 1.6)
      problems.push(`too-long ${plan.spanMinutes} ${tag}`);
  }
  if (input.length === "evening" && plan.slots.filter((s) => s.activity).length > 1)
    problems.push(`one-stop-has-many ${tag}`);
  // the plan restores from its ids
  if (plan.filled > 0) {
    const again = planFromIds(input, 0, plan.ids);
    if (!again || again.ids.join() !== plan.ids.join()) problems.push(`restore ${tag}`);
  }
  // titles
  if (!plan.title.includes(input.who === "alone" ? "for one" : "with"))
    problems.push(`title-who ${tag}`);
  return plan;
}

describe("planner scenario matrix", () => {
  it("day/time x company x budget x energy x vibe: every invariant holds", () => {
    const problems: string[] = [];
    let n = 0;
    let empty = 0;
    let short = 0;
    for (const input of planInputs()) {
      n++;
      const plan = checkPlan(input, problems);
      if (plan.filled === 0) empty++;
      if (plan.lengthNote) short++;
    }
    bump("planner combinations (when x length x vibe x who x budget x energy)", n);
    bump("planner combinations with an honest 'nothing found' day", empty);
    bump("planner combinations that note a shorter plan than asked", short);
    expect(summarize(problems)).toEqual([]);
  }, 600_000);

  it("setting x home x company x budget x vibe: indoor/outdoor and at-home are honoured", () => {
    const problems: string[] = [];
    let n = 0;
    for (const input of planSettingInputs()) {
      n++;
      checkPlan(input, problems);
    }
    bump("planner combinations (setting x at-home x who x budget x vibe)", n);
    expect(summarize(problems)).toEqual([]);
  }, 600_000);

  it("every empty day explains what blocks it with a named relax option", () => {
    let n = 0;
    for (const input of planInputs()) {
      const plan = makePlan(input, 0);
      for (const s of plan.slots)
        if (!s.activity) {
          n++;
          expect(s.missing, JSON.stringify(input)).toBeTruthy();
          expect(s.relax && s.relax.length, JSON.stringify(input)).toBeGreaterThan(0);
          for (const r of s.relax!) {
            // applying the offered relax choice must produce something
            const after = makePlan({ ...input, ...r.patch }, 0);
            expect(after.filled, `${r.label} ${JSON.stringify(input)}`).toBeGreaterThan(0);
          }
        }
    }
    bump("empty planner days checked for relax buttons", n);
  }, 600_000);

  it("activities are internally consistent", () => {
    for (const a of activities) {
      expect(a.at.length, a.id).toBeGreaterThan(0);
      if (a.home) expect(a.setting, `${a.id} home but outdoor`).not.toBe("outdoor");
      if (a.cost === "free") expect(a.costMax, a.id).toBe(0);
      if (a.cost === "under25") expect(a.costMax, a.id).toBeLessThanOrEqual(25);
      if (a.cost === "under50") expect(a.costMax, a.id).toBeLessThanOrEqual(50);
      if (a.vibes.includes("outdoorsy"))
        expect(a.setting, `${a.id} outdoorsy but indoor`).not.toBe("indoor");
    }
    bump("activities in planner pool", activities.length);
  });
});

/* --------------------------------------------------------------- tonight */

const TIMES = [30, 60, 120, 180];

describe("tonight scenario matrix", () => {
  it("energy x company x time x budget x setting: invariants hold across seeds", () => {
    let n = 0;
    let thin = 0;
    const problems: string[] = [];
    for (const minutes of TIMES)
      for (const energy of ["low", "medium", "high"] as const)
        for (const company of ["solo", "social"] as const)
          for (const budget of BUDGETS)
            for (const setting of ["indoor", "outdoor", "either"] as const) {
              const input: TonightInput = { minutes, energy, budget, company, setting };
              const tag = JSON.stringify(input);
              n++;
              const base = tonightIdeas(input, 0);
              if (base.suggestions.length < 3) thin++;
              if (base.suggestions.length === 0 && !base.loosen && base.matched === 0)
                problems.push(`empty-no-hint ${tag}`);
              if (base.matched < 3 && base.relax.length === 0 && base.matched === 0)
                problems.push(`dead-end ${tag}`);
              for (const r of base.relax) {
                // every offered button must really open up more ideas, and say so truthfully
                const after = tonightIdeas({ ...input, ...r.patch }, 0);
                if (after.matched !== r.matched || after.matched <= base.matched)
                  problems.push(`relax-useless ${r.label} ${tag}`);
              }
              for (const seed of [0, 1, 2]) {
                const r = tonightIdeas(input, seed);
                const ids = r.suggestions.map((s) => s.id);
                if (new Set(ids).size !== ids.length) problems.push(`dup ${tag}`);
                for (const s of r.suggestions) {
                  const text = `${s.title} ${s.firstStep}`;
                  if (notTonightWording.test(text)) problems.push(`not-tonight ${s.id} ${tag}`);
                  if (
                    /\bgolden[- ]hour\b|\bsunrise\b|\bbreakfast\b|\bbrunch\b|\bfarmers market\b/i.test(
                      text,
                    )
                  )
                    problems.push(`daytime ${s.id} ${tag}`);
                  if (s.minutes > minutes) problems.push(`time ${s.id} ${tag}`);
                  if (company === "solo" && needsOthersWording.test(text))
                    problems.push(`solo-needs-others ${s.id} ${tag}`);
                  if (budget === "free" && !/^Free/.test(s.costLabel))
                    problems.push(`free ${s.id} ${tag}`);
                  const h = s.hobbySlug ? hobbies.find((x) => x.slug === s.hobbySlug) : undefined;
                  if (s.id.startsWith("hobby:") && h) {
                    if (company === "solo" && !h.company.includes("solo"))
                      problems.push(`solo ${s.id}`);
                    if (company === "social" && !h.company.includes("social"))
                      problems.push(`social ${s.id}`);
                    if (setting === "outdoor" && !h.settings.includes("outdoors"))
                      problems.push(`out ${s.id} ${tag}`);
                    if (setting === "indoor" && h.settings.every((x) => x === "outdoors"))
                      problems.push(`in ${s.id} ${tag}`);
                    if (rankE[h.energy] > rankE[energy]) problems.push(`energy ${s.id} ${tag}`);
                    if (
                      setting === "indoor" &&
                      h.settings.includes("outdoors") &&
                      !h.settings.includes("home") &&
                      !h.settings.includes("out")
                    )
                      problems.push(`in2 ${s.id}`);
                  }
                  // a "whole evening" hobby must not be a 3h daylight trek
                  if (minutes >= 120 && /\b(trail|hike|summit)\b/i.test(text))
                    problems.push(`trek ${s.id} ${tag}`);
                }
              }
            }
    bump("tonight combinations (time x energy x company x budget x setting)", n);
    bump("tonight combinations with fewer than 3 ideas (honest hint shown)", thin);
    expect(summarize(problems)).toEqual([]);
  });
});

/* ---------------------------------------------------------------- search */

describe("search scenario matrix", () => {
  const phrases: [string, string[]][] = [
    ["cheap date", ["low-cost", "social"]],
    ["something to do after work", ["after-work"]],
    ["with friends", ["social"]],
    ["tired", ["low-energy"]],
    ["free and outdoors", ["cost:free", "outdoors"]],
    ["rainy day alone", ["at-home", "solo"]],
    ["weekend with friends", ["weekend", "social"]],
    ["cheap and tired", ["low-cost", "low-energy"]],
  ];
  it("human phrases map to tags, and every hobby hit really has them", () => {
    for (const [q, feats] of phrases) {
      const out = searchDetailed(q);
      expect(out.hits.length, q).toBeGreaterThan(0);
      expect(out.understood.length, q).toBeGreaterThan(0);
      for (const hit of out.hits.filter((h) => h.kind === "Hobby")) {
        const h = hobbies.find((x) => hit.to === `/hobbies/${x.slug}`)!;
        const f = new Set([...h.tags, `cost:${h.cost}`]);
        for (const x of feats) expect(f.has(x), `${q} -> ${h.slug} lacks ${x}`).toBe(true);
      }
      bump("search phrase scenarios", 1);
    }
  });

  it("hobbies appear above articles", () => {
    for (const q of ["solo", "free", "journal", "yoga", "cheap date", "with friends"]) {
      const kinds = search(q).map((h) => h.kind);
      const firstOther = kinds.findIndex((k) => k !== "Hobby");
      const lastHobby = kinds.lastIndexOf("Hobby");
      if (firstOther !== -1 && lastHobby !== -1) expect(lastHobby, q).toBeLessThan(firstOther);
      bump("search ordering scenarios", 1);
    }
  });

  it("named hobbies are findable, including the ones people actually type", () => {
    for (const q of [
      "yoga",
      "dance",
      "running",
      "cooking class",
      "board games",
      "language learning",
      "climbing",
    ]) {
      const hits = search(q).filter((h) => h.kind === "Hobby");
      expect(hits.length, q).toBeGreaterThan(0);
      bump("search findability scenarios", 1);
    }
  });

  it("empty results always carry tappable suggestions that return results", () => {
    for (const q of ["zzzxq", "underwater basket weaving", "kids"]) {
      const out = searchDetailed(q);
      expect(out.hits.length).toBe(0);
      expect(out.empty!.suggestedQueries.length).toBeGreaterThan(2);
      for (const s of out.empty!.suggestedQueries)
        expect(search(s.query).length, s.query).toBeGreaterThan(0);
    }
  });
});

describe("scenario counts", () => {
  it("prints the totals for the report", () => {
    // eslint-disable-next-line no-console
    console.log("SCENARIO COUNTS", JSON.stringify(counts, null, 2));
    expect(Object.keys(counts).length).toBeGreaterThan(0);
  });
});
