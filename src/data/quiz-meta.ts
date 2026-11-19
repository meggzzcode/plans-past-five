/**
 * The most questions anyone is ever asked in the hobby quiz. The quiz is adaptive: questions
 * already implied by earlier answers are skipped, so a person sees this many at most (a friendship
 * craving skips one more). Promo copy elsewhere reads this so it never drifts from the quiz.
 * `QUIZ_ORDER.length` in src/lib/quiz-flow.ts must equal this (src/test/quiz-flow.test.ts checks).
 */
export const QUIZ_QUESTION_COUNT = 4;

const words = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
];
export const quizCountWord = (n: number = QUIZ_QUESTION_COUNT) => words[n] ?? String(n);

/** "Up to six" for the quiz's own copy, since the flow skips what earlier answers imply. */
export const quizUpToWord = (n: number = QUIZ_QUESTION_COUNT) =>
  `up to ${quizCountWord(n).toLowerCase()}`;
