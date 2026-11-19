import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRouter,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { site } from "@/config/site";
import { ShareButtons } from "@/components/editorial/ShareButtons";
import { ShareActions } from "@/components/share/ShareActions";
import { ShopMyHobby } from "@/components/commerce/ShopMyHobby";
import { PlanResult } from "@/components/planner/PlanResult";
import { ResultsView } from "@/components/quiz/ResultsView";
import { DEFAULT_INPUT, makePlan } from "@/lib/planner";
import { SHOPLIST_KEY } from "@/lib/shoplist";
import { verifiedCatalog } from "@/data/catalog";
import { tonightIdeas, tonightText, tonightHref, DEFAULT_TONIGHT } from "@/lib/tonight";
import type { FinderAnswers } from "@/lib/finder";

const Wrap = ({ children }: { children: ReactNode }) => {
  const root = createRootRoute({ component: () => <>{children}</> });
  const router = createRouter({
    routeTree: root,
    history: createMemoryHistory({ initialEntries: ["/"] }),
  });
  return <RouterProvider router={router} />;
};

let clipboard: string[] = [];
let shared: ShareData[] = [];
function env(withShare: boolean) {
  clipboard = [];
  shared = [];
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText: async (t: string) => void clipboard.push(t) },
  });
  Object.defineProperty(navigator, "share", {
    configurable: true,
    value: withShare ? async (d: ShareData) => void shared.push(d) : undefined,
  });
}
afterEach(() => {
  cleanup();
  window.localStorage.clear();
  Object.defineProperty(navigator, "share", { configurable: true, value: undefined });
});
const show = async (ui: ReactNode) => {
  render(<Wrap>{ui}</Wrap>);
  await act(async () => {});
};
const click = async (re: RegExp) => {
  await act(async () => {
    fireEvent.click(screen.getByRole("button", { name: re }));
  });
};

/** The contract every surface must meet, run once with navigator.share and once without. */
async function contract(ui: ReactNode, opts: { urlRe?: RegExp } = {}) {
  for (const withShare of [true, false]) {
    cleanup();
    env(withShare);
    await show(ui);
    await click(/Send to the group chat/);
    if (withShare) {
      expect(shared).toHaveLength(1);
      expect(shared[0]!.title).toBeTruthy();
      expect(shared[0]!.text).toBeTruthy();
      expect(`${shared[0]!.url ?? ""}\n${shared[0]!.text}`).toContain(site.url);
      expect(shared[0]!.url ?? shared[0]!.text).toMatch(opts.urlRe ?? /./);
      expect(clipboard).toHaveLength(0);
    } else {
      expect(shared).toHaveLength(0);
      expect(clipboard).toHaveLength(1);
      expect(clipboard[0]).toContain(site.url);
      // Visible "Copied" feedback, on the button and in the status line.
      expect(screen.getByRole("button", { name: /Copied/ })).toBeTruthy();
      expect(
        screen
          .getAllByRole("status")
          .map((e) => e.textContent)
          .join(" "),
      ).toMatch(/Copied/);
    }
    expect(clipboard.join("\n") + JSON.stringify(shared)).not.toMatch(/amazon\.|amzn\.|tag=/i);
    expect(document.body.textContent).not.toMatch(/calendar|\.ics/i);
  }
}

describe("every share surface uses the one helper", () => {
  it("article and hobby page (ShareButtons)", async () => {
    await contract(<ShareButtons title="A story" path="/journal/a-story" />, {
      urlRe: /journal\/a-story/,
    });
  });

  it("planner result", async () => {
    const plan = makePlan(DEFAULT_INPUT, 0);
    expect(plan.filled).toBeGreaterThan(0);
    await contract(
      <PlanResult
        plan={plan}
        saved={false}
        onShuffle={() => {}}
        onToggleSave={() => {}}
        onSwap={() => {}}
        onLighter={() => {}}
        onRelax={() => {}}
      />,
      { urlRe: /make-plans/ },
    );
    // The share text is the plan, with one link line (no repeat when copied).
    expect(clipboard[0]!.match(/make-plans/g)).toHaveLength(1);
  });

  it("Tonight ideas (same component and props the route renders)", async () => {
    const r = tonightIdeas(DEFAULT_TONIGHT, 0);
    const href = tonightHref(DEFAULT_TONIGHT, 0);
    await contract(
      <ShareActions
        title="Ideas for tonight"
        text={tonightText(DEFAULT_TONIGHT, r.suggestions, site.url + href)}
        url={site.url + href}
        textIncludesUrl
      />,
      { urlRe: /make-plans\?mode=tonight/ },
    );
  });

  it("shopping list (export-safe text, no Amazon URL)", async () => {
    const p = verifiedCatalog.find((x) => x.hobbies.length > 0)!;
    window.localStorage.setItem(SHOPLIST_KEY, JSON.stringify({ v: 1, items: { [p.id]: "need" } }));
    await contract(<ShopMyHobby hobby={p.hobbies[0]!} />);
    // Copy list copies the same safe text.
    env(false);
    cleanup();
    await show(<ShopMyHobby hobby={p.hobbies[0]!} />);
    await click(/Copy my list/);
    expect(clipboard[0]).not.toMatch(/amazon\.|amzn\.|tag=/i);
    expect(screen.getAllByRole("button", { name: /Copied/ }).length).toBeGreaterThan(0);
  });

  it("quiz result", async () => {
    const a: FinderAnswers = {
      craving: "creativity",
      where: "home",
      time: "any",
      budget: "flexible",
      company: "solo",
      energy: "low",
    };
    await contract(<ResultsView a={a} onBack={null} onRetake={() => {}} onEdit={() => {}} />);
  });

  it("saved plan row (ShareRow in /saved) is the same component", () => {
    const src = readFileSync(path.join(process.cwd(), "src/routes/saved.tsx"), "utf8");
    expect(src).toContain("ShareActions");
    expect(src).not.toMatch(/navigator\.(share|clipboard)/);
  });

  it("no surface calls navigator.share directly, and no calendar export exists", () => {
    const walk = (d: string): string[] =>
      readdirSync(d).flatMap((f) => {
        const p = path.join(d, f);
        return statSync(p).isDirectory() ? (f === "test" ? [] : walk(p)) : [p];
      });
    for (const f of walk(path.join(process.cwd(), "src")).filter((f) => /\.tsx?$/.test(f))) {
      const src = readFileSync(f, "utf8");
      if (!f.endsWith("lib/share.ts")) expect(src, f).not.toMatch(/navigator\.share\(/);
      expect(src, f).not.toMatch(/text\/calendar|BEGIN:VCALENDAR/);
    }
  });

  it("ShareActions: Copy link copies the canonical URL and says Copied", async () => {
    env(false);
    await show(<ShareActions title="T" text="hello" url="https://x.test/p" />);
    await click(/Copy link/);
    expect(clipboard).toEqual(["https://x.test/p"]);
    expect(screen.getByRole("button", { name: /Copied/ })).toBeTruthy();
  });
});

vi.mock("@/lib/track", () => ({ track: () => {} }));
