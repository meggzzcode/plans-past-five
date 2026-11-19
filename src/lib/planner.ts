import {
  activities,
  getActivity,
  type Activity,
  type ActivityEnergy,
  type Part,
  type Vibe,
  type Who,
} from "@/data/activities";
import type { Cost } from "@/data/hobbies";
import { getHobby } from "@/data/hobbies";
import { productsFor } from "@/data/products";
import { articlesForHobby } from "@/content";

/**
 * Deterministic itinerary builder. No randomness, no network: the same PlanInput and seed always give the
 * same plan, and a saved (input, seed, activity ids) triple restores the exact itinerary.
 */

export const WHENS = [
  "weeknight",
  "morning",
  "afternoon",
  "evening",
  "saturday",
  "sunday",
  "weekend",
] as const;
export type When = (typeof WHENS)[number] | "after-work"; // "after-work" is the legacy name for weeknight
export type Length = "evening" | "few-hours" | "half-day" | "full-day";
export type SettingPref = "any" | "indoor" | "outdoor";
export type EnergyPref = "any" | ActivityEnergy;

export type PlanInput = {
  when: When;
  length: Length;
  vibe: Vibe;
  who: Who;
  budget: Cost;
  atHome: boolean;
  setting?: SettingPref;
  energy?: EnergyPref;
};

export const LENGTHS: Length[] = ["evening", "few-hours", "half-day", "full-day"];
export const VIBES: Vibe[] = [
  "creative",
  "relaxing",
  "cozy",
  "active",
  "outdoorsy",
  "social",
  "adventurous",
];
export const WHOS: Who[] = ["alone", "friend", "partner", "group"];
export const BUDGETS: Cost[] = ["free", "under25", "under50", "flexible"];
export const SETTINGS: SettingPref[] = ["any", "indoor", "outdoor"];
export const ENERGIES: EnergyPref[] = ["any", "low", "medium", "high"];

/** Total-itinerary spending cap in whole dollars, or null for "flexible" (no cap). */
export const budgetCap = (b: Cost): number | null =>
  b === "free" ? 0 : b === "under25" ? 25 : b === "under50" ? 50 : null;

export type Day = "Saturday" | "Sunday";
export type SlotDef = {
  day?: Day;
  label: string;
  part: Part;
  /** Start time in minutes after midnight. */
  start: number;
  maxMinutes: number;
};

const h = (hours: number, mins = 0) => hours * 60 + mins;

const normWhen = (w: When): (typeof WHENS)[number] => (w === "after-work" ? "weeknight" : w);

function dayDefs(length: Length, day?: Day): SlotDef[] {
  const d = day ? { day } : {};
  if (length === "full-day")
    return [
      { ...d, label: "Morning", part: "morning", start: h(9, 30), maxMinutes: 180 },
      { ...d, label: "Afternoon", part: "afternoon", start: h(13, 30), maxMinutes: 180 },
      { ...d, label: "Evening", part: "evening", start: h(18, 30), maxMinutes: 150 },
    ];
  if (length === "half-day")
    return [
      { ...d, label: "Morning", part: "morning", start: h(9, 30), maxMinutes: 180 },
      { ...d, label: "Afternoon", part: "afternoon", start: h(13, 30), maxMinutes: 150 },
    ];
  // "few-hours" (and the single-stop "evening" length on a weekend day) is an afternoon outing.
  if (length === "few-hours")
    return [
      { ...d, label: "First", part: "afternoon", start: h(13), maxMinutes: 120 },
      { ...d, label: "Then", part: "afternoon", start: h(15, 15), maxMinutes: 90 },
    ];
  return [{ ...d, label: "Afternoon", part: "afternoon", start: h(14), maxMinutes: 150 }];
}

/** The ordered time windows for an input. Every window is always returned, even if nothing fits it. */
export function slotsFor(input: PlanInput): SlotDef[] {
  const when = normWhen(input.when);
  const two = input.length !== "evening";
  switch (when) {
    case "weeknight":
      return two
        ? [
            { label: "First", part: "evening", start: h(18), maxMinutes: 75 },
            { label: "Then", part: "evening", start: h(19, 30), maxMinutes: 90 },
          ]
        : [{ label: "Tonight", part: "evening", start: h(18, 30), maxMinutes: 120 }];
    case "evening":
      return two
        ? [
            { label: "First", part: "evening", start: h(17, 30), maxMinutes: 75 },
            { label: "Then", part: "evening", start: h(19), maxMinutes: 90 },
          ]
        : [{ label: "Evening", part: "evening", start: h(18), maxMinutes: 150 }];
    case "morning":
      return two
        ? [
            { label: "First", part: "morning", start: h(9), maxMinutes: 90 },
            { label: "Then", part: "morning", start: h(10, 45), maxMinutes: 120 },
          ]
        : [{ label: "Morning", part: "morning", start: h(9), maxMinutes: 180 }];
    case "afternoon":
      return two
        ? [
            { label: "First", part: "afternoon", start: h(13), maxMinutes: 90 },
            { label: "Then", part: "afternoon", start: h(14, 45), maxMinutes: 120 },
          ]
        : [{ label: "Afternoon", part: "afternoon", start: h(13, 30), maxMinutes: 180 }];
    case "saturday":
    case "sunday":
      return dayDefs(input.length);
    case "weekend": {
      const len = input.length === "evening" ? "few-hours" : input.length;
      return [...dayDefs(len, "Saturday"), ...dayDefs(len, "Sunday")];
    }
  }
}

const rank: Record<ActivityEnergy, number> = { low: 0, medium: 1, high: 2 };

type Relax = Partial<Record<"budget" | "setting" | "energy" | "who" | "vibe" | "home", true>>;

const vibeSet = (v: Vibe): Vibe[] =>
  v === "cozy" || v === "relaxing" ? ["cozy", "relaxing"] : [v];

function fits(a: Activity, input: PlanInput, def: SlotDef, relax: Relax = {}) {
  if (!a.parts.includes(def.part)) return false;
  if (a.minutes > def.maxMinutes) return false;
  if (!relax.who && !a.who.includes(input.who)) return false;
  const cap = budgetCap(input.budget);
  if (!relax.budget && cap !== null && a.costMax > cap) return false;
  if (!relax.home && input.atHome && !a.home) return false;
  const s = input.setting ?? "any";
  if (!relax.setting && s !== "any" && a.setting !== "either" && a.setting !== s) return false;
  const e = input.energy ?? "any";
  if (!relax.energy && e !== "any" && rank[a.energy] > rank[e]) return false;
  if (!relax.vibe && !a.vibes.some((v) => vibeSet(input.vibe).includes(v))) return false;
  return true;
}

function score(a: Activity, input: PlanInput) {
  const set = vibeSet(input.vibe);
  let s = 0;
  if (a.vibes.some((v) => set.includes(v))) s += 3;
  if (set.includes(a.vibes[0]!)) s += 1;
  if (input.energy && input.energy !== "any" && a.energy === input.energy) s += 1;
  return s;
}

/** All ideas that fit a time window, best first. Does not consider what other slots use. */
export function candidates(input: PlanInput, def: SlotDef, relax: Relax = {}) {
  return activities
    .filter((a) => fits(a, input, def, relax))
    .map((a) => ({ a, score: score(a, input) }))
    .sort((x, y) => y.score - x.score || x.a.id.localeCompare(y.a.id));
}

/** Seed rotates within the top 4; the rest follow in score order so budget fitting can still reach them. */
function ordered(input: PlanInput, def: SlotDef, seed: number, slotIndex: number): Activity[] {
  const c = candidates(input, def).map((x) => x.a);
  const top = c.slice(0, Math.min(4, c.length));
  const k = top.length ? (seed + slotIndex) % top.length : 0;
  return [...top.slice(k), ...top.slice(0, k), ...c.slice(top.length)];
}

const NODE_LIMIT = 400_000;

/** Picks one idea per slot so the whole itinerary fits the budget. Fills as many slots as possible. */
function assemble(input: PlanInput, defs: SlotDef[], seed: number): (Activity | null)[] {
  const cap = budgetCap(input.budget);
  const lists = defs.map((d, i) => ordered(input, d, seed, i));
  const n = defs.length;
  let best: (Activity | null)[] = defs.map(() => null);
  let bestFilled = -1;
  let nodes = 0;
  const cur: (Activity | null)[] = defs.map(() => null);
  const used = new Set<string>();

  const dfs = (i: number, spent: number, filled: number) => {
    if (nodes++ > NODE_LIMIT || bestFilled === n) return;
    if (filled + (n - i) <= bestFilled) return;
    if (i === n) {
      if (filled > bestFilled) {
        bestFilled = filled;
        best = [...cur];
      }
      return;
    }
    for (const a of lists[i]!) {
      if (used.has(a.id)) continue;
      if (cap !== null && spent + a.costMax > cap) continue;
      cur[i] = a;
      used.add(a.id);
      dfs(i + 1, spent + a.costMax, filled + 1);
      used.delete(a.id);
      cur[i] = null;
      if (bestFilled === n) return;
    }
    dfs(i + 1, spent, filled); // leave this slot empty
  };
  dfs(0, 0, 0);
  return best;
}

export type PlanSlot = {
  /** 1-based position in the itinerary (also used for missing slots). */
  step: number;
  day?: Day;
  label: string;
  start: number;
  end: number;
  activity: Activity | null;
  alternative: Activity | null;
  /** Visible explanation when no idea fits this window. */
  missing?: string;
};

export type Plan = {
  title: string;
  slots: PlanSlot[];
  filled: number;
  missingCount: number;
  totalMinutes: number;
  totalCost: { min: number; max: number };
  /** Spending cap for the whole itinerary, null when the budget is flexible. */
  budgetCap: number | null;
  withinBudget: boolean;
  input: PlanInput;
  seed: number;
  /** Activity id per slot ("" when the slot is empty). This plus input and seed restores the plan. */
  ids: string[];
};

const dayWord: Record<(typeof WHENS)[number], string> = {
  weeknight: "weeknight",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  saturday: "Saturday",
  sunday: "Sunday",
  weekend: "weekend",
};
const vibeWord: Record<Vibe, string> = {
  cozy: "cozy",
  relaxing: "relaxing",
  creative: "creative",
  active: "active",
  outdoorsy: "outdoorsy",
  social: "social",
  adventurous: "adventurous",
};
const fmtMoney = (n: number) => `$${n}`;

function missingReason(input: PlanInput, def: SlotDef, cap: number | null): string {
  const when = `${def.day ? `${def.day} ` : ""}${def.label.toLowerCase()}`;
  if (candidates(input, def).length) {
    return `We found ideas for this ${when} slot, but not within your ${cap === 0 ? "free" : `${fmtMoney(cap ?? 0)}`} total budget after the other stops. Raise the budget or pick a cheaper vibe to fill it.`;
  }
  const tries: [keyof Relax, string][] = [
    ["budget", "a bigger budget"],
    ["setting", "dropping the indoor/outdoor choice"],
    ["home", "unticking keep it at home"],
    ["energy", "a higher energy level"],
    ["who", "a different company choice"],
    ["vibe", "a different vibe"],
  ];
  for (const [k, label] of tries)
    if (candidates(input, def, { [k]: true }).length)
      return `No ${vibeWord[input.vibe]} idea fits this ${when} slot yet. Try ${label}.`;
  return `No idea in our collection fits this ${when} slot. Try changing more than one choice.`;
}

function alternativeFor(
  input: PlanInput,
  def: SlotDef,
  chosen: (Activity | null)[],
  index: number,
  total: number,
): Activity | null {
  const cap = budgetCap(input.budget);
  const others = new Set(chosen.filter((a): a is Activity => !!a).map((a) => a.id));
  const rest = total - (chosen[index]?.costMax ?? 0);
  return (
    candidates(input, def).find(
      ({ a }) => !others.has(a.id) && (cap === null || rest + a.costMax <= cap),
    )?.a ?? null
  );
}

function buildPlan(input: PlanInput, seed: number, chosen: (Activity | null)[]): Plan {
  const defs = slotsFor(input);
  const cap = budgetCap(input.budget);
  const total = chosen.reduce((t, a) => t + (a?.costMax ?? 0), 0);
  const slots: PlanSlot[] = defs.map((d, i) => {
    const a = chosen[i] ?? null;
    return {
      step: i + 1,
      ...(d.day ? { day: d.day } : {}),
      label: d.label,
      start: d.start,
      end: d.start + (a?.minutes ?? 0),
      activity: a,
      alternative: a ? alternativeFor(input, d, chosen, i, total) : null,
      ...(a ? {} : { missing: missingReason(input, d, cap) }),
    };
  });
  const filled = slots.filter((s) => s.activity).length;
  const min = chosen.reduce((t, a) => t + (a?.costMin ?? 0), 0);
  const who = input.who === "alone" ? " for one" : input.who === "group" ? " with the group" : "";
  return {
    title: `Your little ${vibeWord[input.vibe]} ${dayWord[normWhen(input.when)]}${who}`,
    slots,
    filled,
    missingCount: slots.length - filled,
    totalMinutes: chosen.reduce((t, a) => t + (a?.minutes ?? 0), 0),
    totalCost: { min, max: total },
    budgetCap: cap,
    withinBudget: cap === null || total <= cap,
    input,
    seed,
    ids: chosen.map((a) => a?.id ?? ""),
  };
}

export function makePlan(input: PlanInput, seed = 0): Plan {
  return buildPlan(input, seed, assemble(input, slotsFor(input), seed));
}

/** Rebuilds a saved plan exactly from its activity ids. Returns null if the ids do not match the input's slots. */
export function planFromIds(input: PlanInput, seed: number, ids: string[]): Plan | null {
  const defs = slotsFor(input);
  if (ids.length !== defs.length) return null;
  return buildPlan(
    input,
    seed,
    ids.map((id) => (id ? (getActivity(id) ?? null) : null)),
  );
}

/* ---------- Search params: quiz hand-off and saved-plan links ---------- */

export type PlanSearch = Partial<{
  when: string;
  length: string;
  vibe: string;
  who: string;
  budget: string;
  home: string;
  setting: string;
  energy: string;
  seed: string;
  ids: string;
  from: string;
}>;

const pick = <T extends string>(v: unknown, allowed: readonly T[]): T | undefined =>
  typeof v === "string" && (allowed as readonly string[]).includes(v) ? (v as T) : undefined;

export const DEFAULT_INPUT: PlanInput = {
  when: "saturday",
  length: "full-day",
  vibe: "creative",
  who: "alone",
  budget: "under25",
  atHome: false,
  setting: "any",
  energy: "any",
};

export type ParsedSearch = {
  input: PlanInput;
  /** True when at least one preference came from the URL (e.g. from the quiz). */
  prefilled: boolean;
  seed: number;
  ids: string[] | null;
  from: string | null;
};

/** Safely reads search params. Unknown or malformed values are ignored. */
export function parsePlanSearch(s: Record<string, unknown>): ParsedSearch {
  const when = pick<When>(s["when"], [...WHENS, "after-work"]);
  const length = pick(s["length"], LENGTHS);
  const vibe = pick(s["vibe"], VIBES);
  const who = pick(s["who"], WHOS);
  const budget = pick(s["budget"], BUDGETS);
  const setting = pick(s["setting"], SETTINGS);
  const energy = pick(s["energy"], ENERGIES);
  const home = s["home"] === "1" || s["home"] === 1 || s["home"] === true;
  const input: PlanInput = {
    when: when ?? DEFAULT_INPUT.when,
    length: length ?? DEFAULT_INPUT.length,
    vibe: vibe ?? DEFAULT_INPUT.vibe,
    who: who ?? DEFAULT_INPUT.who,
    budget: budget ?? DEFAULT_INPUT.budget,
    atHome: home,
    setting: setting ?? "any",
    energy: energy ?? "any",
  };
  const seedNum = Number(s["seed"]);
  const seed = Number.isInteger(seedNum) && seedNum >= 0 && seedNum < 1000 ? seedNum : 0;
  const rawIds = typeof s["ids"] === "string" ? s["ids"] : null;
  const ids = rawIds ? rawIds.split(",").map((x) => (x === "-" ? "" : x)) : null;
  const from = typeof s["from"] === "string" && /^[a-z-]{1,30}$/.test(s["from"]) ? s["from"] : null;
  const prefilled = !!(when || length || vibe || who || budget || setting || energy || home);
  return { input, prefilled, seed, ids, from };
}

/** Search params for a plan, including the exact activities. */
export function planSearch(input: PlanInput, seed: number, ids: string[]): Record<string, string> {
  return {
    when: normWhen(input.when),
    length: input.length,
    vibe: input.vibe,
    who: input.who,
    budget: input.budget,
    home: input.atHome ? "1" : "0",
    setting: input.setting ?? "any",
    energy: input.energy ?? "any",
    seed: String(seed),
    ids: ids.map((i) => i || "-").join(","),
  };
}

/** A relative URL that restores a saved plan. */
export const planHref = (input: PlanInput, seed: number, ids: string[]) =>
  `/make-plans?${new URLSearchParams(planSearch(input, seed, ids)).toString()}`;

export type SavedPlanData = { input: PlanInput; seed: number; ids: string[] };

/** Validates untrusted stored plan data (localStorage can hold anything). */
export function sanitizePlanData(raw: unknown): SavedPlanData | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const i = r["input"];
  if (!i || typeof i !== "object" || !Array.isArray(r["ids"])) return null;
  const rec = i as Record<string, unknown>;
  const parsed = parsePlanSearch({
    when: rec["when"],
    length: rec["length"],
    vibe: rec["vibe"],
    who: rec["who"],
    budget: rec["budget"],
    home: rec["atHome"] ? "1" : "0",
    setting: rec["setting"],
    energy: rec["energy"],
    seed: String(r["seed"] ?? 0),
  });
  const ids = r["ids"] as unknown[];
  if (!ids.every((x) => typeof x === "string")) return null;
  return { input: parsed.input, seed: parsed.seed, ids: ids as string[] };
}

/* ---------- Formatting and guide links ---------- */

export function fmtClock(minutes: number) {
  const h24 = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  const ap = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${ap}`;
}

export const fmtDuration = (m: number) =>
  m < 60 ? `${m} min` : `${Math.floor(m / 60)}h${m % 60 ? ` ${m % 60}m` : ""}`;

export const fmtRange = (min: number, max: number) =>
  max === 0 ? "Free" : min === max ? `about $${max}` : `about $${min} to $${max}`;

export type SectionPath =
  | "/after-hours"
  | "/weekends"
  | "/solo-dates"
  | "/better-together"
  | "/creative-corner"
  | "/movement";

export type GuideLink =
  | { kind: "hobby"; slug: string; label: string }
  | { kind: "article"; slug: string; label: string }
  | { kind: "shop"; slug: string; label: string }
  | { kind: "section"; to: SectionPath; label: string };

/** Links only to routes and articles that exist. */
export function guidesFor(a: Activity): GuideLink[] {
  const out: GuideLink[] = [];
  const hobby = a.hobby ? getHobby(a.hobby) : undefined;
  if (hobby) {
    out.push({ kind: "hobby", slug: hobby.slug, label: `${hobby.name} guide` });
    const art = articlesForHobby(hobby.slug)[0];
    if (art) out.push({ kind: "article", slug: art.slug, label: `Read: ${art.title}` });
    const shop = productsFor(hobby.productIds)[0];
    if (shop) out.push({ kind: "shop", slug: shop.collection, label: "Supplies to browse" });
  } else {
    const section: { to: SectionPath; label: string } = a.vibes.includes("active")
      ? { to: "/movement", label: "More movement ideas" }
      : a.who.length === 1 && a.who[0] === "alone"
        ? { to: "/solo-dates", label: "More solo date ideas" }
        : a.who.length > 0 && !a.who.includes("alone")
          ? { to: "/better-together", label: "More ideas to do together" }
          : a.vibes.includes("creative")
            ? { to: "/creative-corner", label: "More creative ideas" }
            : a.parts.includes("morning")
              ? { to: "/weekends", label: "More weekend ideas" }
              : { to: "/after-hours", label: "More after-hours ideas" };
    out.push({ kind: "section", ...section });
  }
  return out;
}
