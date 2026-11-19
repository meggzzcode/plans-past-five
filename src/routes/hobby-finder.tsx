import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import {
  QUIZ_ORDER,
  afterAnswer,
  answerAt,
  decodeAnswers,
  encodeAnswers,
  optionsFor,
  previousQ,
  toFinderAnswers,
  viewFor,
  visiblePosition,
  type QuizKey,
} from "@/lib/quiz-flow";
import { parseQuizStep } from "@/lib/quiz-steps";
import { seo, absoluteUrl } from "@/lib/seo";
import { images } from "@/data/images";
import { quizUpToWord } from "@/data/quiz-meta";
import { Kicker } from "@/components/editorial/Section";
import { Star } from "@/components/brand/Doodles";
import { QuizStep } from "@/components/quiz/QuizStep";
import { ResultsView } from "@/components/quiz/ResultsView";
import { questions } from "@/components/quiz/questions";

const upToCap = () => `${quizUpToWord()[0]!.toUpperCase()}${quizUpToWord().slice(1)}`;

type Search = { q?: number; a?: string };

export const Route = createFileRoute("/hobby-finder")({
  // The step (`?q=3`, 1-based) and the answers (`&a=cr.lo.so`, short choice codes, no personal
  // data) live in the URL, so refresh, the browser's Back/Forward and shared links all work.
  validateSearch: (s: Record<string, unknown>): Search => {
    const out: Search = {};
    if (s["q"] !== undefined) out.q = parseQuizStep(s["q"], QUIZ_ORDER.length);
    if (typeof s["a"] === "string" && s["a"]) out.a = s["a"].slice(0, 40);
    return out;
  },
  head: () =>
    seo({
      title: "Hobby Quiz: Find a Hobby You'll Actually Do",
      description: `${upToCap()} quick taps, no email. Tell us your energy, company, time and budget and get hobbies that fit your after-work life, plus an easy first step for each.`,
      path: "/hobby-finder",
      image: absoluteUrl(images.potteryNight.src),
    }),
  component: Finder,
});

function Finder() {
  const navigate = Route.useNavigate();
  const { q, a } = Route.useSearch();
  const raw = decodeAnswers(a);
  const view = viewFor(q, raw);
  const { flow } = view;

  // A URL that asks for a skipped or unreachable step is corrected in place (no extra history).
  const wantQ = view.kind === "results" ? QUIZ_ORDER.length + 1 : view.q;
  const wantA = encodeAnswers(flow.answers);
  useEffect(() => {
    const atStart = view.kind === "question" && view.q === 1 && !a && q === undefined;
    if (atStart) return;
    if (q !== wantQ || (a ?? "") !== wantA) {
      void navigate({ search: { q: wantQ, ...(wantA ? { a: wantA } : {}) }, replace: true });
    }
  }, [q, a, wantQ, wantA, navigate, view]);

  const go = (nextQ: number, answers: string) =>
    void navigate({ search: { q: nextQ, ...(answers ? { a: answers } : {}) } });

  const pick = (key: QuizKey, v: string) => {
    const next = afterAnswer(answerAt(flow.answers, key, v));
    go(next.q, next.a);
  };
  const backQ = previousQ(flow, view.kind === "results" ? "results" : view.key);
  const goBack = backQ ? () => go(backQ, wantA) : null;
  const edit = (key: QuizKey) => {
    // Jump to a question, keeping only the answers before it.
    const before: Partial<Record<QuizKey, string>> = {};
    for (const k of QUIZ_ORDER) {
      if (k === key) break;
      if (flow.answers[k]) before[k] = flow.answers[k];
    }
    const target = flow.skipped.includes(key) ? previousQ(flow, key) : QUIZ_ORDER.indexOf(key) + 1;
    go(target ?? 1, encodeAnswers(before));
  };
  const retake = () => void navigate({ search: {} });

  const headingRef = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);
  const stepKey = view.kind === "question" ? view.key : "results";
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [stepKey]);

  return (
    <section className="min-h-[80vh] bg-strawberry">
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-8 md:py-14">
        {view.kind === "question" ? (
          <>
            <div className="text-center">
              <Kicker className="justify-center">Find Your Thing</Kicker>
              <h1 className="mt-3 text-4xl md:text-6xl">
                Let's find your <em className="text-cherry">hobby era.</em>
              </h1>
              <p className="mt-3 text-espresso">
                {upToCap()} taps for hobbies that fit your evenings. No email, no account.
              </p>
            </div>
            <QuizStep
              ref={headingRef}
              question={questions[view.key]}
              offered={optionsFor(
                view.key,
                Object.fromEntries(
                  QUIZ_ORDER.slice(0, QUIZ_ORDER.indexOf(view.key)).map((k) => [
                    k,
                    flow.answers[k],
                  ]),
                ),
              )}
              selected={flow.answers[view.key]}
              position={visiblePosition(flow, view.key)}
              total={flow.total}
              onPick={(v) => pick(view.key, v)}
              onBack={goBack}
            />
          </>
        ) : (
          <>
            <ResultsView
              a={toFinderAnswers(flow)}
              onBack={goBack}
              onRetake={retake}
              onEdit={edit}
            />
            <Star className="mx-auto mt-10 h-6 w-6 text-cherry" />
          </>
        )}
      </div>
    </section>
  );
}
