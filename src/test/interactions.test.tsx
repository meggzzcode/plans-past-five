import { describe, expect, it } from "vitest";
import {
  QUIZ_STORAGE_KEY,
  firstUnanswered,
  nextQuizQ,
  parseQuizStep,
  prevQuizQ,
  readQuizAnswers,
  resolveQuizStep,
  writeQuizAnswers,
} from "@/lib/quiz-steps";

const keys = ["craving", "where", "time", "budget", "company", "level", "energy"];
const answered = (n: number) => Object.fromEntries(keys.slice(0, n).map((k) => [k, "x"]));

describe("quiz step from the URL", () => {
  it("parses ?q= as a 1-based step and defaults to 1", () => {
    expect(parseQuizStep(undefined, 7)).toBe(1);
    expect(parseQuizStep("abc", 7)).toBe(1);
    expect(parseQuizStep(2.5, 7)).toBe(1);
    expect(parseQuizStep(0, 7)).toBe(1);
    expect(parseQuizStep(-4, 7)).toBe(1);
    expect(parseQuizStep("3", 7)).toBe(3);
    expect(parseQuizStep(8, 7)).toBe(8);
    expect(parseQuizStep(99, 7)).toBe(8);
  });

  it("never lets a link or stale history entry skip an unanswered question", () => {
    expect(resolveQuizStep(1, keys, {})).toBe(0);
    expect(resolveQuizStep(5, keys, {})).toBe(0);
    expect(resolveQuizStep(5, keys, answered(2))).toBe(2);
    expect(resolveQuizStep(3, keys, answered(5))).toBe(2);
  });

  it("shows results (step 7) only when every question is answered", () => {
    expect(resolveQuizStep(8, keys, answered(6))).toBe(6);
    expect(resolveQuizStep(8, keys, answered(7))).toBe(7);
    expect(firstUnanswered(keys, answered(7))).toBe(7);
  });
});

describe("Back and Forward through the quiz", () => {
  it("answering moves forward one step; Back moves to the previous question", () => {
    expect(nextQuizQ(0)).toBe(2);
    expect(nextQuizQ(6)).toBe(8); // results
    expect(prevQuizQ(1)).toBe(1);
    expect(prevQuizQ(7)).toBe(7); // results -> question 7
    expect(prevQuizQ(0)).toBe(1); // question 1 has no Back, but never goes below 1
  });

  it("walks a history stack forward and back keeping answers", () => {
    const stack = [1];
    let answers: Record<string, string> = {};
    const step = () => resolveQuizStep(stack.at(-1)!, keys, answers);
    for (let i = 0; i < 7; i++) {
      answers = { ...answers, [keys[step()]!]: "v" };
      stack.push(nextQuizQ(step()));
    }
    expect(step()).toBe(7);
    // browser Back x3
    stack.pop();
    stack.pop();
    stack.pop();
    expect(step()).toBe(4);
    expect(Object.keys(answers)).toHaveLength(7); // answers survive stepping back
    // Back button (a push to the previous q) from question 5 lands on question 4
    stack.push(nextQuizQ(step()));
    expect(step()).toBe(5);
    stack.push(prevQuizQ(step()));
    expect(step()).toBe(4);
  });
});

describe("answers survive a refresh via sessionStorage", () => {
  const memory = () => {
    const m = new Map<string, string>();
    return {
      getItem: (k: string) => m.get(k) ?? null,
      setItem: (k: string, v: string) => void m.set(k, v),
      removeItem: (k: string) => void m.delete(k),
    };
  };

  it("round-trips answers and drops unknown or malformed values", () => {
    const s = memory();
    writeQuizAnswers({ craving: "creativity", where: "home" }, s);
    expect(readQuizAnswers(keys, s)).toEqual({ craving: "creativity", where: "home" });
    s.setItem(QUIZ_STORAGE_KEY, JSON.stringify({ craving: 4, where: "home", bogus: "x" }));
    expect(readQuizAnswers(keys, s)).toEqual({ where: "home" });
    s.setItem(QUIZ_STORAGE_KEY, "not json");
    expect(readQuizAnswers(keys, s)).toEqual({});
    s.setItem(QUIZ_STORAGE_KEY, "null");
    expect(readQuizAnswers(keys, s)).toEqual({});
  });

  it("clears storage when restarted and tolerates blocked storage", () => {
    const s = memory();
    writeQuizAnswers({ craving: "creativity" }, s);
    writeQuizAnswers({}, s);
    expect(s.getItem(QUIZ_STORAGE_KEY)).toBeNull();
    const blocked = {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {
        throw new Error("blocked");
      },
      removeItem: () => {
        throw new Error("blocked");
      },
    };
    expect(() => writeQuizAnswers({ craving: "x" }, blocked)).not.toThrow();
    expect(readQuizAnswers(keys, blocked)).toEqual({});
    expect(readQuizAnswers(keys, undefined)).toEqual({});
  });
});
