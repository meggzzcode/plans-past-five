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
import { liveCollections } from "@/data/collection-status";
import { articlesForHobby } from "@/content";
import { EVENING_TEMPLATES, type EveningTemplate } from "@/data/evening-templates";

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
  budget: PlanBudget;
  atHome: boolean;
  setting?: SettingPref;
  energy?: EnergyPref;
  /** A lighter version: longer breaks between stops (and, from the "Make it lighter" button, one stop fewer). */
  light?: boolean;
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
/** The planner offers one more step than the shared Cost buckets: "under100". */
export type PlanBudget = Cost | "under100";
export const BUDGETS: PlanBudget[] = ["free", "under25", "under50", "under100", "flexible"];
export const SETTINGS: SettingPref[] = ["any", "indoor", "outdoor"];
export const ENERGIES: EnergyPref[] = ["any", "low", "medium", "high"];

/** Total-itinerary spending cap in whole dollars, or null for "flexible" (no cap). */
export const budgetCap = (b: PlanBudget): number | null =>
  b === "free" ? 0 : b === "under25" ? 25 : b === "under50" ? 50 : b === "under100" ? 100 : null;

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
/** Extra minutes added to every break in a lighter plan. */
export const LIGHT_EXTRA_BREAK = 15;
const breakFor = (input: PlanInput) => BREAK_MINUTES + (input.light ? LIGHT_EXTRA_BREAK : 0);
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

/**
 * The longest a single day's plan may run, first start to last end, for the chosen day length. This
 * keeps a plan inside a sensible waking-hours window: stops are dropped rather than stretched past it.
 * Null for plans that are already one short window (weeknight, morning, afternoon, evening).
 */
export function daySpanCap(input: PlanInput): number | null {
  const when = normWhen(input.when);
  if (when !== "saturday" && when !== "sunday" && when !== "weekend") return null;
  const len = when === "weekend" && input.length === "evening" ? "few-hours" : input.length;
  return len === "full-day" ? 540 : len === "half-day" ? 330 : len === "few-hours" ? 210 : null;
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

type Relax = Partial<
  Record<"budget" | "setting" | "energy" | "who" | "vibe" | "home" | "crossDay", true>
>;

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
  // Low and Medium are ceilings ("nothing more tiring than this"); High is a floor, so an Active/High
  // request never comes back with a yoga-on-a-mat idea.
  if (!relax.energy && e !== "any") {
    if (rank[a.energy] > rank[e]) return false;
    if (e === "high" && rank[a.energy] < rank.medium) return false;
  }
  // Ideas that need signing up, or may need booking, ahead are not something you can do on the fly.
  // They only appear in a whole-weekend plan, where there is time to book.
  if (a.advance && normWhen(input.when) !== "weekend") return false;
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
export function place(
  a: Activity,
  def: SlotDef,
  prevEnd: number | null,
  breakMinutes: number = BREAK_MINUTES,
) {
  if (a.minutes > def.maxMinutes) return null;
  const earliest = Math.max(def.from, prevEnd === null ? 0 : prevEnd + breakMinutes);
  const start = startIn(a, earliest);
  if (start === null || start > def.latestStart || start - earliest > MAX_WAIT) return null;
  const end = start + a.minutes;
  return end <= def.to ? { start, end } : null;
}

/** Where a stop sits in its day: used to give "no energy preference" plans a shape (livelier first, gentler last). */
type Arc = "first" | "middle" | "last" | "only";

function score(a: Activity, input: PlanInput, arc: Arc = "only") {
  const set = vibeSet(input.vibe);
  let s = 0;
  if (a.vibes.some((v) => set.includes(v))) s += 3;
  if (set.includes(a.vibes[0]!)) s += 1;
  if (input.energy && input.energy !== "any" && a.energy === input.energy) s += 2;
  if (!input.energy || input.energy === "any") {
    if (arc === "last" && a.energy === "low") s += 5;
    if (arc === "first" && a.energy === "high") s += 2;
    if ((arc === "first" || arc === "middle") && a.energy !== "low") s += 1;
  }
  // A catch-all idea ("Drop-in class") ranks below a specific one that fits equally well.
  if (a.generic) s -= 2;
  return s;
}

/** All ideas that could happen in a stop (first of its day), best first. Ignores what other stops use. */
export function candidates(input: PlanInput, def: SlotDef, relax: Relax = {}, arc: Arc = "only") {
  return activities
    .filter((a) => fits(a, input, relax) && place(a, def, null))
    .map((a) => ({ a, score: score(a, input, arc) }))
    .sort((x, y) => y.score - x.score || x.a.id.localeCompare(y.a.id));
}

/** Seed rotates within the top 4; the rest follow in score order so budget fitting can still reach them. */
function ordered(
  input: PlanInput,
  def: SlotDef,
  seed: number,
  slotIndex: number,
  relax: Relax,
  arc: Arc = "only",
): Activity[] {
  const c = candidates(input, def, relax, arc).map((x) => x.a);
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
/** First, middle or last stop of its day (or the only one). */
function arcOf(defs: SlotDef[], i: number): Arc {
  const day = defs[i]!.day ?? "";
  const same = defs.filter((d) => (d.day ?? "") === day);
  if (same.length === 1) return "only";
  const k = same.indexOf(defs[i]!);
  return k === 0 ? "first" : k === same.length - 1 ? "last" : "middle";
}

function assemble(
  input: PlanInput,
  defs: SlotDef[],
  seed: number,
  relax: Relax = {},
  must?: Activity,
): Stop[] {
  const cap = budgetCap(input.budget);
  const brk = breakFor(input);
  const lists = defs.map((d, i) => {
    const l = ordered(input, d, seed, i, relax, arcOf(defs, i));
    // A pinned idea (carried over from the Tonight tool) is tried first in every stop.
    return must ? [must, ...l.filter((a) => a.id !== must.id)] : l;
  });
  const n = defs.length;
  const aim = targetMinutes(input);
  const dayCap = daySpanCap(input);
  let best: Stop[] = [];
  let bestValue = -1;
  let nodes = 0;
  const cur: Stop[] = [];
  const used = new Set<string>();
  // A plan stretched far past the chosen length is never "good enough", whatever it covers.
  const tooLong = (stops: Stop[]) => aim !== null && spanOf(stops, defs) > aim * 1.5;
  const good = (stops: Stop[]) =>
    aim === null ? stops.length === n : covered(stops, defs, input) >= aim * 0.9 && !tooLong(stops);

  const dfs = (i: number, prevEnd: number | null, spent: number, skipped: SlotDef[]) => {
    if (nodes++ > NODE_LIMIT) return;
    if (i === n) {
      if (must && !used.has(must.id)) return;
      const value = covered(cur, defs, input) * 100 + cur.length - (tooLong(cur) ? 100_000 : 0);
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
      // Never the same kind of thing twice in one plan (no baking then cooking). Only when that would
      // leave a whole day empty is the same kind allowed on a different day (see assembleBest).
      if (
        cur.some(
          (c) =>
            c.a.family === a.family &&
            (relax.crossDay ? (defs[c.slot]!.day ?? "") === (def.day ?? "") : true),
        )
      )
        continue;
      if (cap !== null && spent + a.costMax > cap) continue;
      const at = place(a, def, pe, brk);
      if (!at) continue;
      if (dayCap !== null) {
        const day = def.day ?? "";
        const first = cur.find((c) => (defs[c.slot]!.day ?? "") === day);
        if (at.end - (first ? first.start : at.start) > dayCap) continue; // would overflow the day
      }
      if (sk.some((d) => place(a, d, pe, brk))) continue; // it belongs in an earlier stop
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

/** Assembles with no repeated kinds anywhere in the plan, unless that leaves a day with nothing. */
function assembleBest(
  input: PlanInput,
  defs: SlotDef[],
  seed: number,
  relax: Relax = {},
  must?: Activity,
): Stop[] {
  const strict = assemble(input, defs, seed, relax, must);
  const days = new Set(defs.map((d) => d.day ?? ""));
  if (days.size < 2) return strict;
  const filled = (st: Stop[]) => new Set(st.map((x) => defs[x.slot]!.day ?? "")).size;
  if (filled(strict) === days.size) return strict;
  const loose = assemble(input, defs, seed, { ...relax, crossDay: true }, must);
  return filled(loose) > filled(strict) ? loose : strict;
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
  const brk = breakFor(input);
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
        const at = place(a, defs[ptr]!, prevEnd, brk);
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

/** A row of time between two stops: getting there, settling in, or a breather. */
export type PlanBuffer = {
  kind: "travel" | "home" | "reset";
  label: string;
  /** Minutes set aside (the planner's break, plus 15 in a lighter plan). */
  minutes: number;
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
  /** Time set aside between the previous stop (same day) and this one. */
  buffer?: PlanBuffer;
  /** Minutes of open time after the buffer and before this stop (not counted as plan time). */
  freeBefore?: number;
  /** Visible explanation when nothing fits this day. */
  missing?: string;
  /** One-tap changes that would give this day something. Each patch is applied to the choices. */
  relax?: PlanRelax[];
};

export type PlanRelax = { key: keyof Relax; label: string; patch: Partial<PlanInput> };

export type Plan = {
  title: string;
  slots: PlanSlot[];
  filled: number;
  missingCount: number;
  /** Minutes of activities. */
  totalMinutes: number;
  /** Minutes from the first start to the last end, days added together. */
  spanMinutes: number;
  /** Minutes from first start to last end for each day with stops (a weekend lists both days). */
  daySpans: { day: Day | null; minutes: number }[];
  /** Minutes the chosen length asks for, null for a single stop. */
  targetMinutes: number | null;
  /** Set when the plan covers clearly less than the chosen length, and says why in plain words. */
  lengthNote: string | null;
  /**
   * Whole-plan cost. `typical` is the sum of each stop's midpoint (what most people spend); `max` is
   * the sum of the stop maximums, which is what the budget cap is checked against.
   */
  totalCost: { min: number; max: number; typical: number };
  /** Spending cap for the whole itinerary, null when the budget is flexible. */
  budgetCap: number | null;
  withinBudget: boolean;
  input: PlanInput;
  seed: number;
  /** Activity ids in order, days separated by "". This plus input and seed restores the plan. */
  ids: string[];
  /** One line saying which of the person's choices shaped this plan. */
  why: string;
  /** A closing row for evening plans: nothing booked after the last stop. */
  windDown: { minutes: number; label: string } | null;
  /** Name of the curated evening this plan came from, when it came from one. */
  template?: string;
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

/**
 * The single-answer changes that would give an empty day at least one stop, each as a ready patch.
 * Checked against the real assembler so a button never leads to another dead end.
 */
function relaxOptions(input: PlanInput, day: string): PlanRelax[] {
  const works = (patch: Partial<PlanInput>) => {
    const next = { ...input, ...patch };
    const d = slotsFor(next);
    const stops = assembleBest(next, d, 0);
    return stops.some((st) => (d[st.slot]!.day ?? "") === day);
  };
  const out: PlanRelax[] = [];
  const add = (key: keyof Relax, label: string, patches: Partial<PlanInput>[]) => {
    const hit = patches.find(works);
    if (hit) out.push({ key, label, patch: hit });
  };
  const cap = budgetCap(input.budget);
  if (cap !== null) {
    const higher = BUDGETS.slice(BUDGETS.indexOf(input.budget) + 1);
    add(
      "budget",
      "Raise the budget",
      higher.map((budget) => ({ budget })),
    );
    const b = out.find((r) => r.key === "budget");
    if (b && b.patch.budget)
      b.label =
        b.patch.budget === "flexible"
          ? "Make the budget flexible"
          : `Allow ${fmtMoney(budgetCap(b.patch.budget) ?? 0)}`;
  }
  if ((input.setting ?? "any") !== "any")
    add("setting", "Allow indoors or outdoors", [{ setting: "any" }]);
  if (input.atHome) add("home", "Allow going out", [{ atHome: false }]);
  if (input.energy && input.energy !== "any")
    add("energy", "Allow any energy level", [{ energy: "any" }]);
  const whos = WHOS.filter((w) => w !== input.who);
  add(
    "who",
    "Change who's coming",
    whos.map((who) => ({ who })),
  );
  const w = out.find((r) => r.key === "who");
  if (w && w.patch.who) w.label = `Plan it ${whoPhrase[w.patch.who]} instead`;
  const vibes = VIBES.filter((v) => v !== input.vibe);
  add(
    "vibe",
    "Try another vibe",
    vibes.map((vibe) => ({ vibe })),
  );
  const v = out.find((r) => r.key === "vibe");
  if (v && v.patch.vibe) v.label = `Try a ${vibeWord[v.patch.vibe]} vibe`;
  return out;
}

/** Why the plan is shorter than asked, naming the one change most likely to help. */
function shortNote(input: PlanInput, defs: SlotDef[], seed: number, span: number, aim: number) {
  const base = `You asked for ${lengthWord[input.length]}. We could fit about ${fmtDuration(span)} that works with your choices.`;
  for (const [k, label] of RELAX_TRIES) {
    const stops = assembleBest(input, defs, seed, { [k]: true });
    if (spanOf(stops, defs) >= Math.min(aim * LENGTH_TOLERANCE, span + 60))
      return `${base} Try ${label} for more.`;
  }
  return base;
}

/** Minutes from the first start to the last end of each day that has stops, in day order. */
const daySpansOf = (stops: Stop[], defs: SlotDef[]): { day: Day | null; minutes: number }[] => {
  const spans = new Map<string, [number, number]>();
  for (const s of stops) {
    const k = defs[s.slot]!.day ?? "";
    const cur = spans.get(k);
    spans.set(k, [
      cur ? Math.min(cur[0], s.start) : s.start,
      cur ? Math.max(cur[1], s.end) : s.end,
    ]);
  }
  return [...spans].map(([k, [from, to]]) => ({
    day: (k || null) as Day | null,
    minutes: to - from,
  }));
};

const withinDayCap = (stops: Stop[], defs: SlotDef[], input: PlanInput) => {
  const cap = daySpanCap(input);
  return cap === null || daySpansOf(stops, defs).every((d) => d.minutes <= cap);
};

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
  const others = new Set(stops.filter((_, i) => i !== index).map((s) => s.a.family));
  const list = activities
    .filter(
      (a) =>
        !used.has(a.id) &&
        !others.has(a.family) &&
        fits(a, input) &&
        (cap === null || rest + a.costMax <= cap),
    )
    .sort((x, y) => score(y, input) - score(x, input) || x.id.localeCompare(y.id));
  return (
    list.find((a) => {
      const swapped = replay(
        input,
        defs,
        ids.map((i) => (i === mine ? a.id : i)),
      );
      return (
        swapped !== null && swapped.length === stops.length && withinDayCap(swapped, defs, input)
      );
    }) ?? null
  );
}

/** The travel / settle / breather row between two stops, and the open time left over after it. */
function bufferBetween(
  from: Activity,
  to: Activity,
  gap: number,
  input: PlanInput,
): { buffer: PlanBuffer; free: number } {
  const minutes = Math.min(gap, breakFor(input));
  const kind: PlanBuffer["kind"] = !to.home ? "travel" : !from.home ? "home" : "reset";
  const label =
    kind === "travel"
      ? "Get there and settle in"
      : kind === "home"
        ? "Head home and settle in"
        : "A breather and a reset";
  return { buffer: { kind, label, minutes }, free: Math.max(0, gap - minutes) };
}

const energyWhy: Record<EnergyPref, string> = {
  any: "no energy limit (livelier first and gentler to finish, where it can)",
  low: "low-key energy (nothing more than gentle effort)",
  medium: "medium energy (nothing more tiring than moderate)",
  high: "high energy (every stop takes real effort)",
};

/** "Why this plan": one line naming the choices that shaped it. Only states what is checked in code. */
function whyLine(input: PlanInput, stops: Stop[], cap: number | null, template?: EveningTemplate) {
  const parts: string[] = [];
  parts.push(energyWhy[input.energy ?? "any"]);
  if (input.setting && input.setting !== "any")
    parts.push(input.setting === "indoor" ? "kept indoors" : "kept outdoors");
  if (input.atHome) parts.push("kept at home");
  const n = stops.length;
  parts.push(
    n === 0
      ? "no stops fit yet"
      : `${n} ${n === 1 ? "stop" : "stops"}${n > 1 ? ` with at least ${breakFor(input)} minutes between them to get there and settle` : ""}`,
  );
  parts.push(
    cap === null ? "a flexible budget" : cap === 0 ? "free" : `${fmtMoney(cap)} or less in total`,
  );
  if (stops.some((x) => x.a.advance))
    parts.push("one idea that needs booking or signing up ahead is marked");
  else parts.push("nothing that needs booking ahead");
  const who = whoPhrase[input.who];
  const lead = `Chosen for a ${vibeWord[input.vibe]} ${dayWord[normWhen(input.when)]} ${who}`;
  const tail = template ? ` It is one of our ready-made evenings: ${template.title}.` : "";
  const light = input.light ? " This is the lighter version: longer breaks between stops." : "";
  return `${lead}: ${parts.join(", ")}.${tail}${light}`;
}

function buildPlan(
  input: PlanInput,
  seed: number,
  stops: Stop[],
  template?: EveningTemplate,
): Plan {
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
        relax: relaxOptions(input, day),
      });
      continue;
    }
    let prev: Stop | undefined;
    for (const s of mine) {
      const gap = prev ? s.start - prev.end : 0;
      const buf = prev ? bufferBetween(prev.a, s.a, gap, input) : null;
      slots.push({
        step: slots.length + 1,
        ...dayName,
        label: labelFor(defs[s.slot]!, s.start),
        start: s.start,
        end: s.end,
        activity: s.a,
        alternative: swapFor(input, defs, stops, stops.indexOf(s), total),
        ...(buf ? { buffer: buf.buffer, freeBefore: buf.free } : {}),
      });
      prev = s;
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
  const typical = stops.reduce((t, s) => t + Math.round((s.a.costMin + s.a.costMax) / 2), 0);
  return {
    title: `Your little ${vibeWord[input.vibe]} ${dayWord[normWhen(input.when)]} ${whoPhrase[input.who]}`,
    slots,
    filled,
    missingCount,
    totalMinutes: stops.reduce((t, s) => t + s.a.minutes, 0),
    spanMinutes: span,
    daySpans: daySpansOf(stops, defs),
    targetMinutes: aim,
    lengthNote,
    totalCost: { min, max: total, typical },
    budgetCap: cap,
    withinBudget: cap === null || total <= cap,
    input,
    seed,
    ids: idsOf(stops, defs),
    why: whyLine(input, stops, cap, template),
    windDown: windDownFor(input, stops),
    ...(template ? { template: template.title } : {}),
  };
}

/** Evening plans end with a quiet row: nothing planned after the last stop. */
function windDownFor(input: PlanInput, stops: Stop[]): Plan["windDown"] {
  const when = normWhen(input.when);
  if ((when !== "weeknight" && when !== "evening") || stops.length === 0) return null;
  const last = Math.max(...stops.map((s) => s.end));
  if (last < h(19)) return null;
  return { minutes: 15, label: "Wind down: tea, screens off, nothing else planned" };
}

/**
 * The curated evenings that suit these choices, best vibe match first. Only for a two-stop weeknight
 * or evening. Every idea must fit (company, budget, setting, energy, at home, no booking ahead), at
 * least one must match the vibe, the pair must fit the evening's time windows and the total budget.
 */
export function eveningTemplatesFor(input: PlanInput): EveningTemplate[] {
  const when = normWhen(input.when);
  if ((when !== "weeknight" && when !== "evening") || input.length === "evening") return [];
  const defs = slotsFor(input);
  const e = input.energy ?? "any";
  const cap = budgetCap(input.budget);
  const set = vibeSet(input.vibe);
  const out: { t: EveningTemplate; hits: number }[] = [];
  for (const t of EVENING_TEMPLATES) {
    if (t.energy !== e) continue;
    const acts = t.ids.map((id) => getActivity(id));
    if (acts.some((a) => !a)) continue;
    const list = acts as Activity[];
    if (!list.every((a) => fits(a, input, { vibe: true }))) continue;
    const hits = list.filter((a) => a.vibes.some((v) => set.includes(v))).length;
    if (hits === 0) continue;
    if (cap !== null && list.reduce((t2, a) => t2 + a.costMax, 0) > cap) continue;
    if (new Set(list.map((a) => a.family)).size !== list.length) continue;
    if (!replay(input, defs, t.ids)) continue;
    out.push({ t, hits });
  }
  return out.sort((x, y) => y.hits - x.hits).map((x) => x.t);
}

/**
 * Strict first: every idea matches the chosen vibe. When that leaves the plan clearly shorter than the
 * chosen length, vibe becomes a preference instead of a rule (matching ideas still rank first), so a
 * half day is not one 30-minute stop. Who, budget, setting and energy always stay hard.
 */
function bestStops(
  input: PlanInput,
  defs: SlotDef[],
  seed: number,
  must?: Activity,
): { stops: Stop[]; widened: boolean } {
  const strict = assembleBest(input, defs, seed, {}, must);
  const aim = targetMinutes(input);
  if (aim === null || spanOf(strict, defs) >= aim * LENGTH_TOLERANCE)
    return { stops: strict, widened: false };
  const wide = assembleBest(input, defs, seed, { vibe: true }, must);
  return spanOf(wide, defs) > spanOf(strict, defs)
    ? { stops: wide, widened: true }
    : { stops: strict, widened: false };
}

/**
 * `pin` is an activity id the plan should be built around (the idea chosen in the Tonight tool).
 * If it cannot be placed within the budget and the stop windows, the plan is built without it.
 */
export function makePlan(input: PlanInput, seed = 0, pin?: string | null): Plan {
  const target = input.energy ?? "any";
  // Every energy setting gives its own plan. Low-key, Medium, High energy and No preference are
  // settled in that order: each one takes the first variation (up to four seeds along) whose ideas
  // are not the same list as an earlier setting's plan. Small idea pools can still leave two settings
  // with the same plan when nothing else fits, but a bigger pool never does.
  const taken = new Set<string>();
  for (const e of ENERGY_ORDER) {
    const at = (k: number) => buildFor({ ...input, energy: e }, seed + k, pin);
    let plan = at(0);
    if (plan.filled > 0 && taken.has(plan.ids.join(","))) {
      for (let k = 1; k <= 4; k++) {
        const next = at(k);
        const sane = next.targetMinutes === null || next.spanMinutes <= next.targetMinutes * 1.6;
        if (next.filled > 0 && sane && !taken.has(next.ids.join(","))) {
          plan = next;
          break;
        }
      }
    }
    if (e === target) return { ...plan, seed };
    if (plan.filled > 0) taken.add(plan.ids.join(","));
  }
  return buildFor(input, seed, pin);
}

const ENERGY_ORDER: readonly EnergyPref[] = ["low", "medium", "high", "any"];

function buildFor(input: PlanInput, seed: number, pin?: string | null): Plan {
  const defs = slotsFor(input);
  const pinned = pin ? getActivity(pin) : undefined;
  if (!pinned) {
    const ready = eveningTemplatesFor(input);
    const t = ready.length ? ready[seed % ready.length] : undefined;
    const stops = t ? replay(input, defs, t.ids) : null;
    if (t && stops) return buildPlan(input, seed, stops, t);
  }
  let result = bestStops(input, defs, seed, pinned);
  if (pinned && !result.stops.some((s) => s.a.id === pinned.id))
    result = bestStops(input, defs, seed);
  const { stops } = result;
  return buildPlan(input, seed, stops);
}

/** Rebuilds a saved or shared plan exactly from its activity ids. Null if they do not fit the input. */
export function planFromIds(input: PlanInput, seed: number, ids: string[]): Plan | null {
  // Retired activity ids are skipped so an old link still opens with what is left.
  const known = ids.filter((id) => id === "" || getActivity(id));
  const stops = replay(input, slotsFor(input), known);
  if (!stops) return null;
  const t = EVENING_TEMPLATES.find(
    (x) => x.ids.length === known.length && x.ids.every((id, i) => id === known[i]),
  );
  return buildPlan(input, seed, stops, t);
}

/**
 * A lighter version of a plan: one stop dropped (the most tiring, then the longest) and longer breaks
 * between the rest. Null when the plan is already light, or has no day with two or more stops.
 * Returns the new choices and the exact activity ids, so the lighter plan can be saved and shared.
 */
export function lighterPlan(plan: Plan): { input: PlanInput; ids: string[] } | null {
  if (plan.input.light) return null;
  const stops = plan.slots.filter((s) => s.activity);
  const perDay = new Map<string, number>();
  for (const s of stops) perDay.set(s.day ?? "", (perDay.get(s.day ?? "") ?? 0) + 1);
  const droppable = stops
    .filter((s) => (perDay.get(s.day ?? "") ?? 0) >= 2)
    .sort(
      (x, y) =>
        rank[y.activity!.energy] - rank[x.activity!.energy] ||
        y.activity!.minutes - x.activity!.minutes ||
        y.step - x.step,
    );
  const input: PlanInput = { ...plan.input, light: true };
  for (const s of droppable) {
    const ids = plan.ids.filter((id) => id !== s.activity!.id);
    if (planFromIds(input, plan.seed, ids)) return { input, ids };
  }
  return null;
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
  /** "yes" when the form was submitted as a plain page load (before scripts ran): show the plan. */
  go: string;
  /** "1" for a lighter plan (longer breaks between stops). */
  light: string;
  from: string;
  /** Activity id to build the plan around (from the Tonight tool). */
  with: string;
  /** Comma-separated choices the person never picked (the form's starting values), for "Based on:". */
  def: string;
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
  /** Valid activity id to pin into the plan, or null. */
  pin: string | null;
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
  const home = s["home"] === "1" || s["home"] === "yes" || s["home"] === 1 || s["home"] === true;
  const input: PlanInput = {
    when: when ?? DEFAULT_INPUT.when,
    length: length ?? DEFAULT_INPUT.length,
    vibe: vibe ?? DEFAULT_INPUT.vibe,
    who: who ?? DEFAULT_INPUT.who,
    budget: budget ?? DEFAULT_INPUT.budget,
    atHome: home,
    setting: setting ?? "any",
    energy: energy ?? "any",
    ...(s["light"] === "1" || s["light"] === 1 ? { light: true } : {}),
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
  const pin = typeof s["with"] === "string" && getActivity(s["with"]) ? s["with"] : null;
  return { input, prefilled, seed, ids, from, pin };
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
    ...(input.light ? { light: "1" } : {}),
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
    light: rec["light"] === true ? "1" : undefined,
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
    const shop = liveCollections().find((c) => c.hobbies.includes(hobby.slug));
    if (shop) out.push({ kind: "shop", slug: shop.slug, label: "Supplies to browse" });
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

/** "Free", "about $12", or "about $12 (range $0 to $25)": one typical figure, then the honest range. */
export const fmtTotal = (c: { min: number; max: number; typical: number }) =>
  c.max === 0
    ? "Free"
    : c.min === c.max
      ? `about $${c.max}`
      : `about $${c.typical} (range $${c.min} to $${c.max})`;

/** Short "how long and how much" line used at the top of a plan and in shared text. */
export function planSummary(plan: Plan): string {
  // A two-day plan states each day, never one big total that reads like a single marathon.
  const time =
    plan.daySpans.length > 1
      ? plan.daySpans.map((d) => `${d.day}: ${fmtDuration(d.minutes)}`).join(", ")
      : plan.spanMinutes > 0
        ? fmtDuration(plan.spanMinutes)
        : "";
  const cost = fmtTotal(plan.totalCost);
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
      `${fmtClock(s.start)}  ${a.name} (${fmtDuration(a.minutes)}, ${fmtRange(a.costMin, a.costMax)})${a.gear ? ` - borrow or own: ${a.gear}` : ""}`,
    );
  }
  lines.push("", `Total: ${planSummary(plan)} (rough estimate)`, `Open the same plan: ${url}`);
  return lines.join("\n");
}
