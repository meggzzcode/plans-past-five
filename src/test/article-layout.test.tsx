import { afterEach, describe, expect, it } from "vitest";
import { act, cleanup, render, waitFor } from "@testing-library/react";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRouter,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { articles, type Block } from "@/content";
import { ArticleBody } from "@/components/editorial/ArticleBody";
import {
  MAX_HEAVY_CALLOUTS,
  heavyCallouts,
  shortVersion,
} from "@/components/editorial/article-summary";

const Wrap = ({ children }: { children: ReactNode }) => {
  const root = createRootRoute({ component: () => <>{children}</> });
  const router = createRouter({
    routeTree: root,
    history: createMemoryHistory({ initialEntries: ["/"] }),
  });
  return <RouterProvider router={router} />;
};

afterEach(cleanup);

const callouts: Block[] = [
  { type: "girlsNight", text: "a" },
  { type: "makePlan", text: "b" },
  { type: "saveSplurge", save: "s", splurge: "t" },
  { type: "noSpend", text: "c" },
  { type: "tryThisWeekend", text: "d" },
  { type: "first30", steps: ["one", "two"] },
  { type: "whatYoullNeed", essentials: ["x"], optional: ["y"] },
];

describe("short version", () => {
  it("is empty when the article has no data to summarise", () => {
    expect(shortVersion({ dek: "d", body: [] })).toEqual([]);
    expect(shortVersion({ dek: "d", body: [{ type: "p", text: "hello" }] }).length).toBe(1);
  });
  it("uses only existing block data, at most three items", () => {
    const sv = shortVersion({ dek: "d", body: callouts });
    expect(sv.length).toBe(3);
    expect(sv.map((x) => x.value).join(" ")).toContain("2-step first 30 minutes");
    expect(sv.map((x) => x.value).join(" ")).toContain("1 essentials");
  });
  it("counts idea items", () => {
    const body: Block[] = Array.from({ length: 5 }, (_, i) => ({
      type: "item" as const,
      n: i + 1,
      title: "t",
      note: "n",
    }));
    expect(shortVersion({ dek: "d", body }).some((x) => x.value === "5 ideas")).toBe(true);
  });
});

describe("callouts", () => {
  it("renders at most three heavy callouts and the rest as light lines", async () => {
    expect(heavyCallouts(callouts).size).toBe(MAX_HEAVY_CALLOUTS);
    const { container } = render(
      <Wrap>
        <ArticleBody blocks={callouts} articleSlug="x" />
      </Wrap>,
    );
    await act(async () => {});
    await waitFor(() => expect(container.querySelectorAll("[data-callout]").length).toBe(7));
    expect(container.querySelectorAll('[data-callout="heavy"]').length).toBe(3);
    expect(container.querySelectorAll('[data-callout="light"]').length).toBe(4);
  });
  it("never has more than three heavy callouts in any real article", () => {
    for (const a of articles) expect(heavyCallouts(a.body).size).toBeLessThanOrEqual(3);
  });
});

describe("idea items and disclosures", () => {
  it("keeps extras behind an accessible More disclosure", async () => {
    const body: Block[] = [
      { type: "item", n: 1, title: "T", note: "N", time: "10 min", first: "Do this" },
    ];
    const { container, getByText } = render(
      <Wrap>
        <ArticleBody blocks={body} articleSlug="x" />
      </Wrap>,
    );
    await act(async () => {});
    const d = container.querySelector("details.item-more")!;
    expect(d.hasAttribute("open")).toBe(false);
    expect(d.querySelector("summary")?.textContent).toBe("More");
    expect(getByText("10 min")).toBeTruthy();
  });
});

describe("related and if-you-loved", () => {
  it("articles that have an ifYouLoved block render exactly one in the body", () => {
    for (const a of articles) {
      expect(a.body.filter((b) => b.type === "ifYouLoved").length).toBeLessThanOrEqual(1);
    }
  });
});
