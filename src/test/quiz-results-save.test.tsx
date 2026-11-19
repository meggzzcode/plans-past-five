import { afterEach, describe, expect, it } from "vitest";
import { act, cleanup, render } from "@testing-library/react";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRouter,
} from "@tanstack/react-router";
import { ResultsView } from "@/components/quiz/ResultsView";
import { findHobbies, type FinderAnswers } from "@/lib/finder";

afterEach(cleanup);

const answers: FinderAnswers = {
  craving: "creativity",
  where: "home",
  time: "any",
  budget: "flexible",
  company: "solo",
  energy: "low",
};

describe("quiz results", () => {
  it("has a Save button for each recommended hobby", async () => {
    const Wrap = () => {
      const root = createRootRoute({
        component: () => (
          <ResultsView a={answers} onBack={null} onRetake={() => {}} onEdit={() => {}} />
        ),
      });
      const router = createRouter({
        routeTree: root,
        history: createMemoryHistory({ initialEntries: ["/"] }),
      });
      return <RouterProvider router={router} />;
    };
    const { container } = render(<Wrap />);
    await act(async () => {});
    const r = findHobbies(answers);
    const shown = Math.min(r.results.length + r.nearest.length, 3) || 1;
    const saves = container.querySelectorAll('button[aria-label^="Save "]');
    expect(saves.length).toBeGreaterThanOrEqual(Math.min(shown, 3));
  });
});
