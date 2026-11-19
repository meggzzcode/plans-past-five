import { describe, expect, it } from "vitest";
import {
  QUIZ_ORDER,
  QUIZ_VALUES,
  afterAnswer,
  answerAt,
  decodeAnswers,
  encodeAnswers,
  isComplete,
  optionsFor,
  previousQ,
  resolveFlow,
  toFinderAnswers,
  viewFor,
  type QuizRaw,
} from "@/lib/quiz-flow";
import { findHobbies, personas } from "@/lib/finder";
import { QUIZ_QUESTION_COUNT, quizCountWord } from "@/data/quiz-meta";
import { questions } from "@/components/quiz/questions";

/** Every path through the quiz: walk each offered option at each asked question. */
function* paths(raw: QuizRaw = {}): Generator<QuizRaw> {
  const flow = resolveFlow(raw);
  if (!flow.next) {
    yield flow.answers;
    return;
  }
  for (const v of optionsFor(flow.next, flow.answers))
    yield* paths({ ...flow.answers, [flow.next]: v });
}
const all = [...paths()];

describe("Quiz flow", () => {
  it("count constant matches the flow and the question bank", () => {
    expect(QUIZ_ORDER.length).toBe(QUIZ_QUESTION_COUNT);
    expect(Object.keys(questions).sort()).toEqual([...QUIZ_ORDER].sort());
    expect(quizCountWord()).toBe("Six");
    for (const k of QUIZ_ORDER)
      expect(questions[k].options.map((o) => o.v)).toEqual([...QUIZ_VALUES[k]]);
  });
  it("nobody is asked more than the stated maximum, and most are asked fewer", () => {
    let max = 0;
    for (const p of all) max = Math.max(max, resolveFlow(p).asked.length);
    expect(max).toBeLessThanOrEqual(QUIZ_QUESTION_COUNT);
    expect(all.some((p) => resolveFlow(p).asked.length < QUIZ_QUESTION_COUNT)).toBe(true);
  });
  it("friendship implies company: the question is skipped", () => {
    const f = resolveFlow({ craving: "friendship", energy: "medium" });
    expect(f.skipped).toContain("company");
    expect(f.answers.company).toBe("social");
    expect(f.next).toBe("where");
    expect(f.total).toBeLessThanOrEqual(QUIZ_QUESTION_COUNT - 1);
  });
  it("options that would contradict earlier answers are not offered", () => {
    const hidden = (k: (typeof QUIZ_ORDER)[number], before: QuizRaw) =>
      QUIZ_VALUES[k].filter((v) => !optionsFor(k, before).includes(v));
    expect(
      all.some((p) =>
        QUIZ_ORDER.some((k, i) => {
          const before: QuizRaw = {};
          for (const j of QUIZ_ORDER.slice(0, i)) before[j] = p[j]!;
          return i > 0 && hidden(k, before).length > 0;
        }),
      ),
    ).toBe(true);
  });
  it("later questions never offer an option that contradicts earlier answers", () => {
    for (const p of all) {
      const f = toFinderAnswers(resolveFlow(p));
      const r = findHobbies(f);
      // Every full path gives at least three honest matches: no contradiction reaches results.
      expect(r.results.length, JSON.stringify(p)).toBeGreaterThanOrEqual(3);
      expect(r.strength).toBe("strong");
    }
  });
  it("low energy never leads to a high-energy hobby", () => {
    for (const p of all.filter((x) => x.energy === "low"))
      for (const { hobby } of findHobbies(toFinderAnswers(resolveFlow(p))).results)
        expect(hobby.energy).not.toBe("high");
  });
  it("home never returns an outdoors-only hobby; free never returns a paid one", () => {
    for (const p of all) {
      const r = findHobbies(toFinderAnswers(resolveFlow(p))).results;
      if (p.where === "home") for (const x of r) expect(x.hobby.settings).toContain("home");
      if (p.budget === "free") for (const x of r) expect(x.hobby.cost).toBe("free");
    }
  });
  it("changing an earlier answer re-asks the later ones", () => {
    const before = { craving: "creativity", energy: "low", company: "solo" };
    const after = answerAt(before, "energy", "high");
    expect(after).toEqual({ craving: "creativity", energy: "high" });
    expect(resolveFlow(after).next).toBe("company");
  });
});

describe("Quiz personas", () => {
  it("relaxation with friends is a social or cozy persona, not the creative one", () => {
    for (const energy of ["low", "medium", "high"] as const) {
      const key = findHobbies({
        craving: "relaxation",
        company: "social",
        energy,
        where: "anywhere",
        time: "any",
        budget: "flexible",
      }).persona.key;
      expect(["social-butterfly", "cozy"]).toContain(key);
    }
  });
  it("movement is sporty or the little adventurer", () => {
    for (const p of all.filter((x) => x.craving === "movement"))
      expect(["sporty", "little-adventurer"]).toContain(
        findHobbies(toFinderAnswers(resolveFlow(p))).persona.key,
      );
  });
  it("persona depends on company and energy, not just the craving", () => {
    const base = {
      craving: "relaxation",
      where: "anywhere",
      time: "any",
      budget: "flexible",
    } as const;
    const a = findHobbies({ ...base, company: "social", energy: "medium" }).persona.key;
    const b = findHobbies({ ...base, company: "solo", energy: "low" }).persona.key;
    expect(a).not.toBe(b);
  });
  it("every persona is reachable through the real quiz flow", () => {
    const seen = new Set(all.map((p) => findHobbies(toFinderAnswers(resolveFlow(p))).persona.key));
    expect([...seen].sort()).toEqual(Object.keys(personas).sort());
  });
});

describe("Weak matches are honest", () => {
  const tight = {
    craving: "movement",
    company: "social",
    energy: "high",
    where: "home",
    time: "short",
    budget: "free",
  } as const;
  it("says weak, shows nearest matches and the one answer to loosen", () => {
    const r = findHobbies(tight);
    expect(r.strength).toBe("weak");
    expect(r.results.length + r.nearest.length).toBeGreaterThanOrEqual(3);
    expect(r.loosen).not.toBeNull();
    const exact = new Set(r.results.map((x) => x.hobby.slug));
    for (const n of r.nearest) {
      expect(exact.has(n.hobby.slug)).toBe(false);
      expect(n.breaks.length).toBeGreaterThan(0);
    }
  });
  it("a strong result has no nearest list and no loosen hint", () => {
    const r = findHobbies({ ...tight, where: "anywhere", time: "any", budget: "flexible" });
    expect(r.strength).toBe("strong");
    expect(r.nearest).toEqual([]);
    expect(r.loosen).toBeNull();
  });
});

describe("Quiz URL", () => {
  it("round-trips every complete path", () => {
    for (const p of all) {
      const back = decodeAnswers(encodeAnswers(p));
      expect(resolveFlow(back).answers).toEqual(resolveFlow(p).answers);
    }
  });
  it("opens the same result from the URL", () => {
    const p = all[7]!;
    const a = encodeAnswers(p);
    const v = viewFor(QUIZ_ORDER.length + 1, decodeAnswers(a));
    expect(v.kind).toBe("results");
    expect(viewFor(undefined, decodeAnswers(a)).kind).toBe("results");
  });
  it("holds no personal data: only short choice codes", () => {
    expect(encodeAnswers(all[0]!)).toMatch(/^[a-z0-9.]+$/);
    expect(encodeAnswers(all[0]!).length).toBeLessThan(30);
  });
  it("junk in the URL degrades to the first question, never throws", () => {
    for (const junk of [undefined, "", "zz.zz", "<script>", "cr.lo.so.ho.sh.fr.extra", 42]) {
      const v = viewFor(undefined, decodeAnswers(junk));
      expect(["question", "results"]).toContain(v.kind);
    }
    expect(viewFor(undefined, {}).kind).toBe("question");
    expect(viewFor(5, {})).toMatchObject({ kind: "question", key: "craving" });
  });
  it("never shows results, or a later question, without the answers before it", () => {
    expect(viewFor(7, { craving: "creativity" })).toMatchObject({
      kind: "question",
      key: "energy",
    });
    expect(viewFor(4, { craving: "creativity", energy: "low" })).toMatchObject({ key: "company" });
  });
  it("steps back over skipped questions and forward after an answer", () => {
    const raw = { craving: "friendship", energy: "medium", where: "anywhere" } as QuizRaw;
    const f = resolveFlow(raw);
    expect(f.skipped).toContain("company");
    expect(previousQ(f, "where")).toBe(2);
    expect(viewFor(3, raw)).toMatchObject({ key: "energy" });
    expect(afterAnswer({ craving: "friendship" }).q).toBe(2);
    expect(afterAnswer({ craving: "friendship", energy: "low" }).q).toBe(4);
  });
  it("a finished quiz is complete", () => {
    expect(isComplete(resolveFlow(all[0]!))).toBe(true);
  });
});
