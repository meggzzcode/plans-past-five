/**
 * Adaptive flow, URL codec and viability rules for the Find Your Thing quiz. Pure functions only,
 * so every rule is unit tested (src/test/quiz-flow.test.ts).
 *
 * Questions are asked in QUIZ_ORDER. A question is skipped when the answer is already implied:
 *  - friendship craving implies "with friends" (company skipped);
 *  - an option is only offered when at least MIN_VIABLE hobbies still fit the earlier answers,
 *    so a later question never offers a choice that contradicts an earlier one; when just one
 *    option survives it is chosen for the reader and the question is skipped.
 * Answers live in the URL (`?q=3&a=cr.lo.so`): positional two-letter codes, no personal data.
 */
import type { Craving, Cost, Energy } from "@/data/hobbies";
import { exactMatches, type FinderAnswers } from "@/lib/finder";

/**
 * Four questions (Stage 3b; it was six). "Where" and "How long" were dropped because the other
 * four already carry them: the craving says whether the evening is out (adventure, movement) or in,
 * and energy says how big the first try can be. The finder still understands where/time, so a
 * result is computed with them left open ("anywhere", "any"); see `toFinderAnswers`. Old shared
 * links with six answers still open (`decodeAnswers` maps them).
 */
export const QUIZ_ORDER = ["craving", "energy", "company", "budget"] as const;
export type QuizKey = (typeof QUIZ_ORDER)[number];
export type QuizRaw = Partial<Record<QuizKey, string>>;

/** Values per question, in display order. The permissive choice ("anywhere", "any"...) is last. */
export const QUIZ_VALUES: Record<QuizKey, readonly string[]> = {
  craving: ["creativity", "relaxation", "adventure", "friendship", "movement", "different"],
  energy: ["low", "medium", "high"],
  company: ["solo", "social", "either"],
  budget: ["free", "under25", "under50", "flexible"],
};

/** The finder's own "where" and "how long" values. The quiz no longer asks them; other tools may. */
export const FINDER_WHERE = ["home", "outdoors", "out", "anywhere"] as const;
export const FINDER_TIME = ["short", "couple", "halfday", "any"] as const;

/** Offered even when few hobbies match, so a question never turns into a dead end. */
const ALWAYS: Record<QuizKey, string> = {
  craving: "different",
  energy: "high",
  company: "either",
  budget: "flexible",
};

export const MIN_VIABLE = 3;

const CODES: Record<QuizKey, Record<string, string>> = {
  craving: {
    creativity: "cr",
    relaxation: "re",
    adventure: "ad",
    friendship: "fr",
    movement: "mo",
    different: "di",
  },
  energy: { low: "lo", medium: "me", high: "hi" },
  company: { solo: "so", social: "sc", either: "ei" },
  budget: { free: "fr", under25: "u2", under50: "u5", flexible: "fl" },
};

/** `cr.lo.so` for the first answers, positional; unanswered slots left empty. */
export function encodeAnswers(raw: QuizRaw): string {
  const parts = QUIZ_ORDER.map((k) => (raw[k] ? (CODES[k][raw[k]!] ?? "") : ""));
  while (parts.length && parts[parts.length - 1] === "") parts.pop();
  return parts.join(".");
}

/** The two-letter codes the six-question quiz used for "where" (4th slot), so old links still open. */
const LEGACY_WHERE_CODES = ["ho", "ou", "ne", "an"];

/**
 * Tolerant decode: unknown tokens are dropped, never thrown on. A link made by the old six-question
 * quiz (`cr.lo.so.ho.sh.fr`: the 4th token is a "where" code) keeps its craving, energy, company and
 * budget (the 6th token); where and time are ignored.
 */
export function decodeAnswers(s: unknown): QuizRaw {
  if (typeof s !== "string") return {};
  const toks = s.split(".");
  const legacy = LEGACY_WHERE_CODES.includes(toks[3] ?? "");
  const slots = legacy ? [toks[0], toks[1], toks[2], toks[5]] : toks.slice(0, QUIZ_ORDER.length);
  const out: QuizRaw = {};
  slots.forEach((tok, i) => {
    const k = QUIZ_ORDER[i]!;
    const hit = Object.entries(CODES[k]).find(([, c]) => c === tok);
    if (hit) out[k] = hit[0];
  });
  return out;
}

/** How many hobbies that fit the craving still pass the answers so far (others left open). */
function viableCount(a: QuizRaw, key: QuizKey, value: string): number {
  const merged: QuizRaw = { ...a, [key]: value };
  const f: FinderAnswers = {
    craving: (merged.craving ?? "different") as Craving,
    energy: (merged.energy ?? "high") as Energy,
    company: (merged.company ?? "either") as FinderAnswers["company"],
    where: "anywhere",
    time: "any",
    budget: (merged.budget ?? "flexible") as Cost,
  };
  return exactMatches(f).length;
}

/** The options a question may offer given the answers before it. Never empty. */
export function optionsFor(key: QuizKey, before: QuizRaw): string[] {
  if (key === "craving") return [...QUIZ_VALUES.craving];
  const ok = QUIZ_VALUES[key].filter(
    (v) => v === ALWAYS[key] || viableCount(before, key, v) >= MIN_VIABLE,
  );
  return ok.length ? ok : [...QUIZ_VALUES[key]];
}

export type Flow = {
  /** Every answer so far, including the ones implied by earlier answers. */
  answers: QuizRaw;
  /** Questions the reader answered (in order). */
  asked: QuizKey[];
  /** Questions skipped because earlier answers implied them. */
  skipped: QuizKey[];
  /** The next unanswered question, or null when the quiz is complete. */
  next: QuizKey | null;
  /** Questions the reader has seen or will see, for the progress dots. */
  total: number;
};

/** Walk QUIZ_ORDER, filling implied answers and keeping only answers that are still offered. */
export function resolveFlow(raw: QuizRaw): Flow {
  const answers: QuizRaw = {};
  const asked: QuizKey[] = [];
  const skipped: QuizKey[] = [];
  let next: QuizKey | null = null;
  let remaining = 0;
  for (const key of QUIZ_ORDER) {
    if (next) {
      // Unreached questions: assume asked, except the one friendship already answers.
      if (!(key === "company" && answers.craving === "friendship")) remaining++;
      continue;
    }
    const opts = optionsFor(key, answers);
    const implied =
      key === "company" && answers.craving === "friendship"
        ? "social"
        : opts.length === 1
          ? opts[0]
          : undefined;
    if (implied) {
      answers[key] = implied;
      skipped.push(key);
    } else if (raw[key] && opts.includes(raw[key]!)) {
      answers[key] = raw[key];
      asked.push(key);
    } else next = key;
  }
  return { answers, asked, skipped, next, total: asked.length + (next ? 1 + remaining : 0) };
}

export function isComplete(flow: Flow): boolean {
  return flow.next === null;
}

/** Complete answers as the finder wants them (call only when the flow is complete). */
export function toFinderAnswers(flow: Flow): FinderAnswers {
  const a = flow.answers;
  return {
    craving: a.craving as Craving,
    energy: a.energy as Energy,
    company: a.company as FinderAnswers["company"],
    // Not asked any more: left open, so only craving, energy, company and budget narrow the list.
    where: "anywhere",
    time: "any",
    budget: a.budget as Cost,
  };
}

/** Keep only the answers before `key` plus the new one, so later questions are re-asked. */
export function answerAt(current: QuizRaw, key: QuizKey, value: string): QuizRaw {
  const out: QuizRaw = {};
  for (const k of QUIZ_ORDER) {
    if (k === key) break;
    if (current[k]) out[k] = current[k];
  }
  out[key] = value;
  return out;
}

export type QuizView =
  { kind: "question"; key: QuizKey; q: number; flow: Flow } | { kind: "results"; flow: Flow };

/**
 * Which screen the URL asks for: never a skipped or not-yet-reachable question, never results
 * without every answer. `q` is the 1-based position in QUIZ_ORDER; ORDER.length + 1 is results.
 */
export function viewFor(q: number | undefined, raw: QuizRaw): QuizView {
  const flow = resolveFlow(raw);
  const results = q === undefined ? Object.keys(raw).length > 0 : q > QUIZ_ORDER.length;
  if (isComplete(flow) && results) return { kind: "results", flow };
  const nextIdx = flow.next ? QUIZ_ORDER.indexOf(flow.next) : QUIZ_ORDER.length - 1;
  let idx = q === undefined ? nextIdx : Math.min(q - 1, nextIdx);
  // A skipped question steps back to the last one actually asked.
  while (idx > 0 && flow.skipped.includes(QUIZ_ORDER[idx]!)) idx--;
  if (flow.skipped.includes(QUIZ_ORDER[idx]!)) idx = flow.next ? nextIdx : 0;
  const key = QUIZ_ORDER[Math.max(0, idx)]!;
  return { kind: "question", key, q: QUIZ_ORDER.indexOf(key) + 1, flow };
}

/** `?q=` for the question before `key` that was actually asked, or null at the start. */
export function previousQ(flow: Flow, key: QuizKey | "results"): number | null {
  const idx = key === "results" ? QUIZ_ORDER.length : QUIZ_ORDER.indexOf(key);
  for (let i = idx - 1; i >= 0; i--) if (flow.asked.includes(QUIZ_ORDER[i]!)) return i + 1;
  return null;
}

/** Position of `key` among the questions the reader sees (1-based) for "Question 2 of 5". */
export function visiblePosition(flow: Flow, key: QuizKey): number {
  return flow.asked.filter((k) => QUIZ_ORDER.indexOf(k) < QUIZ_ORDER.indexOf(key)).length + 1;
}

/** `?q=` and `a=` for the question after answering `key`. */
export function afterAnswer(raw: QuizRaw): { q: number; a: string } {
  const flow = resolveFlow(raw);
  return {
    q: flow.next ? QUIZ_ORDER.indexOf(flow.next) + 1 : QUIZ_ORDER.length + 1,
    a: encodeAnswers(flow.answers),
  };
}
