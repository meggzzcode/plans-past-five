/**
 * Step logic for the Find Your Thing quiz. The step lives in the URL (`?q=3`, 1-based) so the
 * browser's Back and Forward buttons, refresh and shared links all behave; answers live in
 * sessionStorage. Everything here is pure so it can be unit tested.
 */

export const QUIZ_STORAGE_KEY = "ppf:quiz:v1";

/** `?q=` as a 1-based step. Missing, non-numeric or out-of-range values fall back to 1. */
export function parseQuizStep(raw: unknown, total: number): number {
  const n = typeof raw === "string" ? Number(raw) : raw;
  if (typeof n !== "number" || !Number.isInteger(n)) return 1;
  return Math.min(Math.max(n, 1), total + 1);
}

/** Index of the first unanswered question, or `keys.length` when every question has an answer. */
export function firstUnanswered(keys: readonly string[], answers: Record<string, unknown>): number {
  const i = keys.findIndex((k) => typeof answers[k] !== "string" || answers[k] === "");
  return i === -1 ? keys.length : i;
}

/**
 * The 0-based step to show for a requested 1-based `?q=`: the quiz never lets a link or a stale
 * history entry skip an unanswered question (and never shows results without every answer).
 */
export function resolveQuizStep(
  requestedQ: number,
  keys: readonly string[],
  answers: Record<string, unknown>,
): number {
  return Math.min(requestedQ - 1, firstUnanswered(keys, answers));
}

/** The `?q=` to navigate to after answering the question at 0-based `step`. */
export const nextQuizQ = (step: number) => step + 2;

/** The `?q=` to navigate to for the Back button on 0-based `step` (step 0 has no Back). */
export const prevQuizQ = (step: number) => Math.max(step, 1);

export function readQuizAnswers(
  keys: readonly string[],
  storage: Pick<Storage, "getItem"> | undefined,
): Record<string, string> {
  try {
    const raw = storage?.getItem(QUIZ_STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : {};
    if (!parsed || typeof parsed !== "object") return {};
    const out: Record<string, string> = {};
    for (const k of keys) {
      const v = (parsed as Record<string, unknown>)[k];
      if (typeof v === "string" && v) out[k] = v;
    }
    return out;
  } catch {
    return {};
  }
}

export function writeQuizAnswers(
  answers: Record<string, string>,
  storage: Pick<Storage, "setItem" | "removeItem"> | undefined,
) {
  try {
    if (Object.keys(answers).length === 0) storage?.removeItem(QUIZ_STORAGE_KEY);
    else storage?.setItem(QUIZ_STORAGE_KEY, JSON.stringify(answers));
  } catch {
    /* private mode or blocked storage: answers just stay in memory */
  }
}
