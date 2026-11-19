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
/**
 * One stop in an itinerary. An activity placed here starts at the later of `from` and the end of the
 * previous stop plus a short break, must start by `latestStart` and be over by `to`. All times are
 * minutes after midnight.
 */
export type SlotDef = {
  day?: Day;
  /** Fixed label; otherwise it is derived from the start time (Morning, Afternoon, Evening). */
  label?: string;
  from: number;
  latestStart: number;
  to: number;
  maxMinutes: number;
};

const h = (hours: number, mins = 0) => hours * 60 + mins;

const normWhen = (w: When): (typeof WHENS)[number] => (w === "after-work" ? "weeknight" : w);

/** Short break between stops (travel, a drink, a breather). */
export const BREAK_MINUTES = 30;
/** The longest wait we accept before a stop (lunch, a slow start). */
const MAX_WAIT = 90;
/** Ideas shorter than this are fillers, not stops. */
const MIN_STOP_MINUTES = 30;
/** A plan counts as honouring the chosen length when it covers at least this share of it. */
export const LENGTH_TOLERANCE = 0.75;

const slot = (
  from: number,
  latestStart: number,
  to: number,
  maxMinutes: number,
  extra: Partial<SlotDef> = {},
): SlotDef => ({ from, latestStart, to, maxMinutes, ...extra });

function dayDefs(length: Length, day?: Day): SlotDef[] {
  const d = day ? { day } : {};
  if (length === "full-day")
    return [
      slot(h(9, 30), h(10, 30), h(12, 30), 180, d),
      slot(h(12, 30), h(15), h(17, 30), 180, d),
      slot(h(17, 30), h(19, 30), h(21, 30), 150, d),
    ];
  if (length === "half-day")
    return [
      slot(h(9, 30), h(10, 30), h(12, 30), 150, d),
      slot(h(11), h(13, 30), h(15), 150, d),
      slot(h(13, 30), h(15, 30), h(17), 120, d),
    ];
  if (length === "few-hours")
    return [slot(h(13), h(14), h(15, 30), 120, d), slot(h(14, 30), h(16, 30), h(18, 30), 120, d)];
  return [slot(h(14), h(15), h(18), 150, d)]; // a single stop on a weekend day
}

/** Minutes of plan we aim for per day (first start to last end), or null for a single stop. */
function dayTarget(length: Length): number | null {
  return length === "full-day"
    ? 480
    : length === "half-day"
      ? 270
      : length === "few-hours"
        ? 180
        : null;
}

/** The ordered stops for an input. Every stop is always returned, even if nothing fits it. */
export function slotsFor(input: PlanInput): SlotDef[] {
  const when = normWhen(input.when);
  const two = input.length !== "evening";
  switch (when) {
    case "weeknight":
      return two
        ? [
            slot(h(18), h(19), h(20, 30), 75, { label: "First" }),
            slot(h(19), h(20), h(22), 90, { label: "Then" }),
          ]
        : [slot(h(18), h(19, 30), h(21, 30), 120, { label: "Tonight" })];
    case "evening":
      return two
        ? [
            slot(h(17, 30), h(18, 30), h(19, 45), 75, { label: "First" }),
            slot(h(18, 45), h(20), h(22), 90, { label: "Then" }),
          ]
        : [slot(h(18), h(19, 30), h(22), 150, { label: "Evening" })];
    case "morning":
      return two
        ? [
            slot(h(9), h(10), h(11), 90, { label: "First" }),
            slot(h(10), h(11, 30), h(13), 120, { label: "Then" }),
          ]
        : [slot(h(9), h(10), h(13), 180, { label: "Morning" })];
    case "afternoon":
      return two
        ? [
            slot(h(13), h(14), h(15, 30), 90, { label: "First" }),
            slot(h(14, 30), h(16), h(18), 120, { label: "Then" }),
          ]
        : [slot(h(13), h(14, 30), h(18), 180, { label: "Afternoon" })];
    case "saturday":
    case "sunday":
      return dayDefs(input.length);
    case "weekend": {
      const len = input.length === "evening" ? "few-hours" : input.length;
      return [...dayDefs(len, "Saturday"), ...dayDefs(len, "Sunday")];
    }
  }
}

/** Total minutes the chosen length asks for (all days together), or null for a single stop. */
export function targetMinutes(input: PlanInput): number | null {
  const when = normWhen(input.when);
  if (when === "weeknight" || when === "evening" || when === "morning" || when === "afternoon")
    return input.length === "evening" ? null : 150;
  const len = when === "weekend" && input.length === "evening" ? "few-hours" : input.length;
  const t = dayTarget(len);
  return t === null ? null : t * (when === "weekend" ? 2 : 1);
}

const rank: Record<ActivityEnergy, number> = { low: 0, medium: 1, high: 2 };

type Relax = Partial<Record<"budget" | "setting" | "energy" | "who" | "vibe" | "home", true>>;

const vibeSet = (v: Vibe): Vibe[] =>
  v === "cozy" || v === "relaxing" ? ["cozy", "relaxing"] : [v];

/** Everything except timing: who, budget, setting, energy, vibe. */
function fits(a: Activity, input: PlanInput, relax: Relax = {}) {
  if (a.minutes < MIN_STOP_MINUTES) return false;
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

/** The first moment at or after `earliest` that the activity is allowed to start, or null. */
export function startIn(a: Activity, earliest: number): number | null {
  for (const [from, to] of a.at) if (earliest <= to) return Math.max(earliest, from);
  return null;
}

/**
 * Where an activity would go in a stop, given when the previous stop ended (null for the first stop
 * of a day). Null when its time window, the stop's window or the wait rules do not allow it.
 */
export function place(a: Activity, def: SlotDef, prevEnd: number | null) {
  if (a.minutes > def.maxMinutes) return null;
  const earliest = Math.max(def.from, prevEnd === null ? 0 : prevEnd + BREAK_MINUTES);
  const start = startIn(a, earliest);
  if (start === null || start > def.latestStart || start - earliest > MAX_WAIT) return null;
  const end = start + a.minutes;
  return end <= def.to ? { start, end } : null;
}

function score(a: Activity, input: PlanInput) {
  const set = vibeSet(input.vibe);
  let s = 0;
  if (a.vibes.some((v) => set.includes(v))) s += 3;
  if (set.includes(a.vibes[0]!)) s += 1;
  if (input.energy && input.energy !== "any" && a.energy === input.energy) s += 1;
  return s;
}

/** All ideas that could happen in a stop (first of its day), best first. Ignores what other stops use. */
export function candidates(input: PlanInput, def: SlotDef, relax: Relax = {}) {
  return activities
    .filter((a) => fits(a, input, relax) && place(a, def, null))
    .map((a) => ({ a, score: score(a, input) }))
    .sort((x, y) => y.score - x.score || x.a.id.localeCompare(y.a.id));
}

/** Seed rotates within the top 4; the rest follow in score order so budget fitting can still reach them. */
function ordered(
  input: PlanInput,
  def: SlotDef,
  seed: number,
  slotIndex: number,
  relax: Relax,
): Activity[] {
  const c = candidates(input, def, relax).map((x) => x.a);
  const top = c.slice(0, Math.min(4, c.length));
  const k = top.length ? (seed + slotIndex) % top.length : 0;
  return [...top.slice(k), ...top.slice(0, k), ...c.slice(top.length)];
}

export type Stop = { slot: number; a: Activity; start: number; end: number };

const NODE_LIMIT = 60_000;

/** Time covered by the stops (first start to last end per day), each day capped at its share of the target. */
const covered = (stops: Stop[], defs: SlotDef[], input: PlanInput) => {
  const aim = targetMinutes(input);
  const dayCount = new Set(defs.map((d) => d.day ?? "")).size;
  const per = aim === null ? Infinity : aim / dayCount;
  const spans = new Map<string, [number, number]>();
  for (const s of stops) {
    const k = defs[s.slot]!.day ?? "";
    const cur = spans.get(k);
    spans.set(k, [cur ? cur[0] : s.start, s.end]);
  }
  let total = 0;
  for (const [from, to] of spans.values()) total += Math.min(to - from, per);
  return total;
};

/**
 * Picks ideas for the stops so the whole itinerary fits the budget, every idea sits in a compatible
 * time window, and the plan covers as much of the chosen length as it can. Stops may be skipped, but
 * only canonically (an idea goes in the earliest stop that could hold it) so that a plan can be
 * rebuilt exactly from its activity ids.
 */
function assemble(input: PlanInput, defs: SlotDef[], seed: number, relax: Relax = {}): Stop[] {
  const cap = budgetCap(input.budget);
  const lists = defs.map((d, i) => ordered(input, d, seed, i, relax));
  const n = defs.length;
  const aim = targetMinutes(input);
  let best: Stop[] = [];
  let bestValue = -1;
  let nodes = 0;
  const cur: Stop[] = [];
  const used = new Set<string>();
  const good = (stops: Stop[]) =>
    aim === null ? stops.length === n : covered(stops, defs, input) >= aim * 0.9;

  const dfs = (i: number, prevEnd: number | null, spent: number, skipped: SlotDef[]) => {
    if (nodes++ > NODE_LIMIT) return;
    if (i === n) {
      const value = covered(cur, defs, input) * 100 + cur.length;
      if (value > bestValue) {
        bestValue = value;
        best = [...cur];
      }
      return;
    }
    const def = defs[i]!;
    const newDay = i > 0 && defs[i - 1]!.day !== def.day;
    const pe = newDay ? null : prevEnd;
    const sk = newDay ? [] : skipped;
    for (const a of lists[i]!) {
      if (used.has(a.id)) continue;
      if (cap !== null && spent + a.costMax > cap) continue;
      const at = place(a, def, pe);
      if (!at) continue;
      if (sk.some((d) => place(a, d, pe))) continue; // it belongs in an earlier stop
      cur.push({ slot: i, a, ...at });
      used.add(a.id);
      dfs(i + 1, at.end, spent + a.costMax, []);
      used.delete(a.id);
      cur.pop();
      if (bestValue >= 0 && good(best)) return;
    }
    dfs(i + 1, pe, spent, [...sk, def]); // leave this stop empty
  };
  dfs(0, null, 0, []);
  return best;
}

/**
 * Places a given list of activity ids (a day's stops in order, days separated by ""). Null when any
 * id is unknown, repeated, or cannot go where it sits.
 */
function replay(input: PlanInput, defs: SlotDef[], ids: string[]): Stop[] | null {
  const days = [...new Set(defs.map((d) => d.day ?? ""))];
  const groups: string[][] = [[]];
  for (const id of ids) {
    if (id === "") groups.push([]);
    else groups[groups.length - 1]!.push(id);
  }
  while (groups.length > days.length && groups[groups.length - 1]!.length === 0) groups.pop();
  if (groups.length > days.length) return null;
  const seen = new Set<string>();
  const out: Stop[] = [];
  for (let g = 0; g < groups.length; g++) {
    const first = defs.findIndex((d) => (d.day ?? "") === days[g]);
    let ptr = first;
    let prevEnd: number | null = null;
    for (const id of groups[g]!) {
      const a = getActivity(id);
      if (!a || seen.has(id)) return null;
      seen.add(id);
      let found = false;
      while (ptr < defs.length && (defs[ptr]!.day ?? "") === days[g]) {
        const at = place(a, defs[ptr]!, prevEnd);
        if (at) {
          out.push({ slot: ptr, a, ...at });
          prevEnd = at.end;
          ptr++;
          found = true;
          break;
        }
        ptr++;
      }
      if (!found) return null;
    }
  }
  return out;
}

const idsOf = (stops: Stop[], defs: SlotDef[]): string[] => {
  const out: string[] = [];
  const days = [...new Set(defs.map((d) => d.day ?? ""))];
  days.forEach((day, k) => {
    if (k > 0) out.push("");
    for (const s of stops) if ((defs[s.slot]!.day ?? "") === day) out.push(s.a.id);
  });
  return out;
};

export type PlanSlot = {
  /** 1-based position in the itinerary. */
  step: number;
  day?: Day;
  label: string;
  start: number;
  end: number;
  activity: Activity | null;
  /** A swap that still fits the time, budget and choices. */
  alternative: Activity | null;
  /** Visible explanation when nothing fits this day. */
  missing?: string;
};

export type Plan = {
  title: string;
  slots: PlanSlot[];
  filled: number;
  missingCount: number;
  /** Minutes of activities. */
  totalMinutes: number;
  /** Minutes from the first start to the last end, days added together. */
  spanMinutes: number;
  /** Minutes the chosen length asks for, null for a single stop. */
  targetMinutes: number | null;
  /** Set when the plan covers clearly less than the chosen length, and says why in plain words. */
  lengthNote: string | null;
  totalCost: { min: number; max: number };
  /** Spending cap for the whole itinerary, null when the budget is flexible. */
  budgetCap: number | null;
  withinBudget: boolean;
  input: PlanInput;
  seed: number;
  /** Activity ids in order, days separated by "". This plus input and seed restores the plan. */
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

/** How the chosen company reads in a title: "for one", "with a friend", "for two", "with the group". */
export const whoPhrase: Record<Who, string> = {
  alone: "for one",
  friend: "with a friend",
  partner: "with your partner",
  group: "with the group",
};

const lengthWord: Record<Length, string> = {
  evening: "one stop",
  "few-hours": "a few hours",
  "half-day": "half a day",
  "full-day": "a full day",
};

const RELAX_TRIES: [keyof Relax, string][] = [
  ["budget", "a bigger budget"],
  ["setting", "dropping the indoor/outdoor choice"],
  ["home", "unticking keep it at home"],
  ["energy", "a higher energy level"],
  ["who", "a different company choice"],
  ["vibe", "a different vibe"],
];

function emptyDayReason(input: PlanInput, defs: SlotDef[], cap: number | null): string {
  const none = (relax: Relax) => defs.every((d) => candidates(input, d, relax).length === 0);
  if (!none({}))
    return `We found ideas, but not within your ${cap === 0 ? "free" : fmtMoney(cap ?? 0)} total budget after the other stops. Raise the budget or pick a cheaper vibe.`;
  for (const [k, label] of RELAX_TRIES)
    if (!none({ [k]: true })) return `No ${vibeWord[input.vibe]} idea fits yet. Try ${label}.`;
  return "No idea in our collection fits yet. Try changing more than one choice.";
}

/** Why the plan is shorter than asked, naming the one change most likely to help. */
function shortNote(input: PlanInput, defs: SlotDef[], seed: number, span: number, aim: number) {
  const base = `You asked for ${lengthWord[input.length]}. We could fit about ${fmtDuration(span)} that works with your choices.`;
  for (const [k, label] of RELAX_TRIES) {
    const stops = assemble(input, defs, seed, { [k]: true });
    if (spanOf(stops, defs) >= Math.min(aim * LENGTH_TOLERANCE, span + 60))
      return `${base} Try ${label} for more.`;
  }
  return base;
}

const spanOf = (stops: Stop[], defs: SlotDef[]) => {
  const first = new Map<string, number>();
  const last = new Map<string, number>();
  for (const s of stops) {
    const k = defs[s.slot]!.day ?? "";
    if (!first.has(k)) first.set(k, s.start);
    last.set(k, s.end);
  }
  let t = 0;
  for (const [k, f] of first) t += last.get(k)! - f;
  return t;
};

const labelFor = (def: SlotDef, start: number) =>
  def.label ?? (start < h(12) ? "Morning" : start < h(17) ? "Afternoon" : "Evening");

function swapFor(
  input: PlanInput,
  defs: SlotDef[],
  stops: Stop[],
  index: number,
  total: number,
): Activity | null {
  const cap = budgetCap(input.budget);
  const used = new Set(stops.map((s) => s.a.id));
  const rest = total - stops[index]!.a.costMax;
  const ids = idsOf(stops, defs);
  const mine = stops[index]!.a.id;
  const list = activities
    .filter((a) => !used.has(a.id) && fits(a, input) && (cap === null || rest + a.costMax <= cap))
    .sort((x, y) => score(y, input) - score(x, input) || x.id.localeCompare(y.id));
  return (
    list.find((a) => {
      const swapped = replay(
        input,
        defs,
        ids.map((i) => (i === mine ? a.id : i)),
      );
      return swapped !== null && swapped.length === stops.length;
    }) ?? null
  );
}

function buildPlan(input: PlanInput, seed: number, stops: Stop[]): Plan {
  const defs = slotsFor(input);
  const cap = budgetCap(input.budget);
  const total = stops.reduce((t, s) => t + s.a.costMax, 0);
  const slots: PlanSlot[] = [];
  const days = [...new Set(defs.map((d) => d.day ?? ""))];
  let missingCount = 0;
  for (const day of days) {
    const mine = stops.filter((s) => (defs[s.slot]!.day ?? "") === day);
    const dayDefsOnly = defs.filter((d) => (d.day ?? "") === day);
    const dayName = day ? { day: day as Day } : {};
    if (mine.length === 0) {
      missingCount++;
      slots.push({
        step: slots.length + 1,
        ...dayName,
        label: dayDefsOnly[0]!.label ?? "Anytime",
        start: dayDefsOnly[0]!.from,
        end: dayDefsOnly[0]!.from,
        activity: null,
        alternative: null,
        missing: emptyDayReason(input, dayDefsOnly, cap),
      });
      continue;
    }
    for (const s of mine) {
      slots.push({
        step: slots.length + 1,
        ...dayName,
        label: labelFor(defs[s.slot]!, s.start),
        start: s.start,
        end: s.end,
        activity: s.a,
        alternative: swapFor(input, defs, stops, stops.indexOf(s), total),
      });
    }
  }
  const aim = targetMinutes(input);
  const span = spanOf(stops, defs);
  const filled = stops.length;
  const lengthNote =
    aim !== null && filled > 0 && span < aim * LENGTH_TOLERANCE
      ? shortNote(input, defs, seed, span, aim)
      : null;
  const min = stops.reduce((t, s) => t + s.a.costMin, 0);
  return {
    title: `Your little ${vibeWord[input.vibe]} ${dayWord[normWhen(input.when)]} ${whoPhrase[input.who]}`,
    slots,
    filled,
    missingCount,
    totalMinutes: stops.reduce((t, s) => t + s.a.minutes, 0),
    spanMinutes: span,
    targetMinutes: aim,
    lengthNote,
    totalCost: { min, max: total },
    budgetCap: cap,
    withinBudget: cap === null || total <= cap,
    input,
    seed,
    ids: idsOf(stops, defs),
  };
}

export function makePlan(input: PlanInput, seed = 0): Plan {
  return buildPlan(input, seed, assemble(input, slotsFor(input), seed));
}

/** Rebuilds a saved or shared plan exactly from its activity ids. Null if they do not fit the input. */
export function planFromIds(input: PlanInput, seed: number, ids: string[]): Plan | null {
  // Retired activity ids are skipped so an old link still opens with what is left.
  const known = ids.filter((id) => id === "" || getActivity(id));
  const stops = replay(input, slotsFor(input), known);
  return stops ? buildPlan(input, seed, stops) : null;
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
  const ids = !rawIds
    ? null
    : rawIds === "-"
      ? []
      : rawIds
          .split(",")
          .slice(0, 24)
          .map((x) => (x === "-" ? "" : x));
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
    ids: ids.length ? ids.map((i) => i || "-").join(",") : "-",
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

/* ---------- Sharing ---------- */

const onWord: Record<(typeof WHENS)[number], string> = {
  weeknight: "after work",
  morning: "in the morning",
  afternoon: "this afternoon",
  evening: "this evening",
  saturday: "on Saturday",
  sunday: "on Sunday",
  weekend: "this weekend",
};

/** The one line that opens a shared plan, worded for who is coming. */
export function inviteLine(input: PlanInput): string {
  const on = onWord[normWhen(input.when)];
  switch (input.who) {
    case "friend":
      return `Free ${on}? I planned it, want to join me?`;
    case "partner":
      return `Date plan ${on}. Want in?`;
    case "group":
      return `Plan for the group ${on}. Who's in?`;
    default:
      return `My plan ${on}.`;
  }
}

/** Short "how long and how much" line used at the top of a plan and in shared text. */
export function planSummary(plan: Plan): string {
  const time = plan.spanMinutes > 0 ? fmtDuration(plan.spanMinutes) : "";
  const cost = fmtRange(plan.totalCost.min, plan.totalCost.max);
  return [time, cost].filter(Boolean).join(" · ");
}

/** Plain-text version of a plan with times and a link. No personal data: only the choices made. */
export function planText(plan: Plan, url: string): string {
  const lines = [plan.title, inviteLine(plan.input), ""];
  let day: string | undefined;
  for (const s of plan.slots) {
    if (s.day && s.day !== day) {
      if (day) lines.push("");
      lines.push(s.day);
      day = s.day;
    }
    const a = s.activity;
    if (!a) continue;
    lines.push(
      `${fmtClock(s.start)}  ${a.name} (${fmtDuration(a.minutes)}, ${fmtRange(a.costMin, a.costMax)})`,
    );
  }
  lines.push("", `Total: ${planSummary(plan)} (rough estimate)`, `Open the same plan: ${url}`);
  return lines.join("\n");
}
