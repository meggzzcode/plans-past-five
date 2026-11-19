import { afterEach, describe, expect, it } from "vitest";
import { act, cleanup, render } from "@testing-library/react";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRouter,
} from "@tanstack/react-router";
import { ResultsView } from "@/components/quiz/ResultsView";
import { selectProducts } from "@/data/catalog";
import { findHobbies, type FinderAnswers } from "@/lib/finder";
import {
  QUIZ_ORDER,
  QUIZ_VALUES,
  optionsFor,
  resolveFlow,
  toFinderAnswers,
  type QuizRaw,
} from "@/lib/quiz-flow";
import { AMAZON_ASSOCIATE_STATEMENT } from "@/config/affiliate";
import { setAffiliateState, withAffiliateRestore } from "./affiliate-state";

/**
 * Stage 3b: the quiz result carries ONE primary product (the hobby's "if you only buy one thing"
 * pick from the central product source) when a verified, shown product exists for a matched hobby,
 * with the short disclosure beside it. With none, nothing is shown. The free first step stays.
 */
afterEach(cleanup);
withAffiliateRestore();

function* quizPaths(raw: QuizRaw = {}): Generator<FinderAnswers> {
  const flow = resolveFlow(raw);
  if (!flow.next) {
    yield toFinderAnswers(flow);
    return;
  }
  for (const v of optionsFor(flow.next, flow.answers))
    yield* quizPaths({ ...flow.answers, [flow.next]: v });
}
const paths = [...quizPaths()];

/** The product the result should show: the first of the three matches with a primary pick. */
const expectedPick = (a: FinderAnswers) => {
  const r = findHobbies(a);
  if (r.strength !== "strong") return undefined;
  for (const { hobby } of r.results.slice(0, 3)) {
    const pick = selectProducts({ hobby: hobby.slug }).pick;
    if (pick) return { hobby, pick };
  }
  return undefined;
};

const show = async (a: FinderAnswers) => {
  const root = createRootRoute({
    component: () => <ResultsView a={a} onBack={null} onRetake={() => {}} onEdit={() => {}} />,
  });
  const router = createRouter({
    routeTree: root,
    history: createMemoryHistory({ initialEntries: ["/"] }),
  });
  const { container } = render(<RouterProvider router={router} />);
  await act(async () => {});
  return container;
};

describe("quiz result: one primary product", () => {
  it("both outcomes exist in today's data (some matches have a verified product, some do not)", () => {
    const withPick = paths.filter((a) => expectedPick(a));
    expect(withPick.length).toBeGreaterThan(0);
    expect(withPick.length).toBeLessThan(paths.length);
  });

  it("shows exactly one product, the central source's pick, when one qualifies", async () => {
    setAffiliateState("inactive");
    const a = paths.find((p) => expectedPick(p))!;
    const want = expectedPick(a)!;
    const c = await show(a);
    const block = c.querySelector("[data-quiz-pick]")!;
    expect(block).not.toBeNull();
    const cards = block.querySelectorAll("[data-product-id]");
    expect(cards).toHaveLength(1);
    expect(cards[0]!.getAttribute("data-product-id")).toBe(want.pick.id);
    // One buy button, to the product's own Amazon page, and no other product anywhere on the page.
    expect(c.querySelectorAll("[data-product-id]")).toHaveLength(1);
    const buy = block.querySelector<HTMLAnchorElement>('a[href*="amazon."]')!;
    expect(buy.href).toContain(want.pick.asin);
    expect(buy.textContent).toMatch(/Amazon/);
    // The block names the hobby it is for, and the free first step is still offered.
    expect(block.textContent).toContain(want.hobby.name.toLowerCase());
    expect(block.textContent).toContain("Rather start free?");
    expect(block.textContent).toContain(want.hobby.firstActivity);
  });

  it("puts the short disclosure beside the product, once", async () => {
    setAffiliateState("inactive");
    const a = paths.find((p) => expectedPick(p))!;
    const block = (await show(a)).querySelector("[data-quiz-pick]")!;
    expect(block.textContent!.split("We show no prices").length - 1).toBe(1);
    expect(block.querySelectorAll('a[href="/affiliate-disclosure"]')).toHaveLength(1);
    setAffiliateState("active");
    cleanup();
    const live = (await show(a)).querySelector("[data-quiz-pick]")!;
    expect(live.textContent!.split(AMAZON_ASSOCIATE_STATEMENT).length - 1).toBe(1);
  });

  it("shows no product, no buy link and no empty frame when nothing qualifies", async () => {
    const a = paths.find((p) => !expectedPick(p))!;
    const c = await show(a);
    expect(c.querySelector("[data-quiz-pick]")).toBeNull();
    expect(c.querySelectorAll("[data-product-id]")).toHaveLength(0);
    expect(c.querySelectorAll('a[href*="amazon."]')).toHaveLength(0);
    // The result itself is intact.
    expect(c.querySelector("h1")).not.toBeNull();
  });

  it("never shows a product on a weak (nearest-match) result", async () => {
    const weak: FinderAnswers = {
      craving: "movement",
      company: "social",
      energy: "high",
      where: "home",
      time: "short",
      budget: "free",
    };
    expect(findHobbies(weak).strength).toBe("weak");
    expect((await show(weak)).querySelector("[data-quiz-pick]")).toBeNull();
  });

  it("every possible quiz result agrees with the product source (no path shows a product the source lacks)", async () => {
    for (const a of paths.slice(0, 60)) {
      const c = await show(a);
      const want = expectedPick(a);
      expect(c.querySelectorAll("[data-quiz-pick]").length, JSON.stringify(a)).toBe(want ? 1 : 0);
      cleanup();
    }
  });

  it("the quiz asks four questions", () => {
    expect(QUIZ_ORDER).toHaveLength(4);
    expect(Object.keys(QUIZ_VALUES)).toEqual([...QUIZ_ORDER]);
  });
});
