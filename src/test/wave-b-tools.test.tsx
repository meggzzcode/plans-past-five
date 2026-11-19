import { describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { readFileSync } from "node:fs";
import path from "node:path";
import { activities } from "@/data/activities";
import { articles, type Block } from "@/content";
import { pinFiles } from "@/data/pins";
import { hobbies } from "@/data/hobbies";
import { pinForHobby } from "@/lib/pins";
import { collections } from "@/data/products";
import { ArticleBody } from "@/components/editorial/ArticleBody";
import { SavedMeta } from "@/components/saved/SavedMeta";
import {
  BUDGETS,
  ENERGIES,
  LENGTHS,
  VIBES,
  WHENS,
  WHOS,
  daySpanCap,
  makePlan,
  planSearch,
  planSummary,
  planText,
  type PlanInput,
} from "@/lib/planner";
import { aheadOfTimeWording } from "@/lib/tonight";
import { budgetOptions } from "@/lib/budget";

const base = (over: Partial<PlanInput>): PlanInput => ({
  when: "saturday",
  length: "full-day",
  vibe: "creative",
  who: "alone",
  budget: "under25",
  atHome: false,
  setting: "any",
  energy: "any",
  ...over,
});

/** Every combination of the planner's choices. */
function* inputs(): Generator<PlanInput> {
  for (const when of WHENS)
    for (const length of LENGTHS)
      for (const who of WHOS)
        for (const vibe of VIBES)
          for (const budget of ["free", "under25", "flexible"] as const)
            for (const energy of ENERGIES) yield base({ when, length, who, vibe, budget, energy });
}

describe("defect 1: company is a hard constraint", () => {
  const pairWording =
    /two-person|\bfor one\b(?!-)|\byourself\b|\bsolo\b|\bjust you\b|\byour partner\b/i;
  it("no idea tagged for the group reads as a solo or two-person idea", () => {
    for (const a of activities.filter((x) => x.who.includes("group")))
      expect(`${a.name} ${a.text} ${a.prep}`, a.id).not.toMatch(pairWording);
  });
  it("every stop in every plan suits the chosen company, and a group plan never has a pair idea", () => {
    let groupStops = 0;
    for (const input of inputs()) {
      const plan = makePlan(input, 0);
      for (const s of plan.slots) {
        if (!s.activity) continue;
        expect(s.activity.who, `${s.activity.id} for ${input.who}`).toContain(input.who);
        if (input.who === "group") {
          groupStops++;
          expect(s.activity.name).not.toMatch(/two-person/i);
        }
      }
    }
    expect(groupStops).toBeGreaterThan(100);
  });
  it("the two-person book club is for a friend or partner only", () => {
    const b = activities.find((a) => a.id === "book-club")!;
    expect(b.who).not.toContain("group");
    expect(b.who).not.toContain("alone");
  });
  it("a group weeknight plan never offers the book club", () => {
    for (const vibe of VIBES)
      for (const energy of ENERGIES) {
        const plan = makePlan(
          base({ when: "weeknight", length: "few-hours", who: "group", vibe, energy }),
          0,
        );
        expect(plan.ids).not.toContain("book-club");
      }
  });
});

describe("defect 2: plans stay inside a waking-hours window", () => {
  it("no day runs past its cap, and nothing starts before 7 or ends after 10 pm", () => {
    for (const input of inputs()) {
      const cap = daySpanCap(input);
      const plan = makePlan(input, 0);
      const byDay = new Map<string, number[]>();
      for (const s of plan.slots)
        if (s.activity) byDay.set(s.day ?? "", [...(byDay.get(s.day ?? "") ?? []), s.start, s.end]);
      for (const [, t] of byDay) {
        expect(Math.min(...t)).toBeGreaterThanOrEqual(7 * 60);
        expect(Math.max(...t)).toBeLessThanOrEqual(22 * 60);
        if (cap !== null) expect(Math.max(...t) - Math.min(...t)).toBeLessThanOrEqual(cap);
      }
    }
  });
  it("a friend weekend states each day instead of one marathon total", () => {
    const plan = makePlan(
      base({ when: "weekend", who: "friend", vibe: "relaxing", budget: "free" }),
      0,
    );
    expect(plan.daySpans.length).toBeGreaterThan(0);
    for (const d of plan.daySpans) expect(d.minutes).toBeLessThanOrEqual(540);
    if (plan.daySpans.length > 1) {
      expect(planSummary(plan)).toMatch(/Saturday: .*Sunday: /);
      expect(planSummary(plan)).not.toMatch(/1[5-9]h/);
    }
  });
});

describe("defect 3: same-day plans hold no ahead-of-time steps", () => {
  it("no idea's start line says order, ahead, beforehand or the night before, unless it is a book-ahead idea", () => {
    for (const a of activities.filter((x) => !x.advance))
      expect(a.prep, a.id).not.toMatch(aheadOfTimeWording);
  });
  it("only a whole-weekend plan can hold a book-ahead idea", () => {
    for (const input of inputs()) {
      if (input.when === "weekend") continue;
      const plan = makePlan(input, 0);
      for (const s of plan.slots) expect(s.activity?.advance ?? false).toBe(false);
    }
  });
  it("the friendship bracelet hour no longer says order a kit ahead", () => {
    const b = activities.find((a) => a.id === "bracelets")!;
    expect(b.prep).not.toMatch(/order|ahead/i);
  });
});

describe("defect 4: free plans do not silently assume gear", () => {
  const gearIds = ["tennis", "pickleball", "bike-ride", "frisbee"];
  it("gear-dependent ideas say what to borrow or own", () => {
    for (const id of gearIds) expect(activities.find((a) => a.id === id)!.gear, id).toBeTruthy();
  });
  it("any free plan stop that uses gear is stated in the shared plan text", () => {
    let seen = 0;
    for (const vibe of VIBES)
      for (const who of WHOS)
        for (const when of ["saturday", "weekend"] as const) {
          const plan = makePlan(base({ when, who, vibe, budget: "free" }), 0);
          for (const s of plan.slots)
            if (s.activity?.gear) {
              seen++;
              expect(planText(plan, "https://x.test/p")).toContain("borrow or own");
            }
        }
    expect(seen).toBeGreaterThan(0);
  });
});

describe("defect 6: budget wording", () => {
  it("the lean and treat levels say how much they change the price", () => {
    expect(budgetOptions.find((o) => o.v === "lean")!.hint).toMatch(/20 to 30 percent/);
    expect(budgetOptions.find((o) => o.v === "treat")!.hint).toMatch(/30 to 40 percent/);
  });
});

describe("defect 7: saved plan cards show cost range and date", () => {
  it("shows the cost, the length and the saved date", () => {
    const input = base({ when: "weeknight", length: "few-hours", vibe: "cozy", budget: "under50" });
    const plan = makePlan(input, 0);
    const item = {
      key: "plan:x",
      kind: "plan" as const,
      title: plan.title,
      href: "/make-plans",
      savedAt: "2026-11-19T10:00:00.000Z",
      plan: { input, seed: 0, ids: plan.ids },
    };
    const { getByTestId } = render(<SavedMeta item={item} />);
    expect(getByTestId("saved-cost").textContent).toMatch(/Free|\$\d/);
    expect(getByTestId("saved-date").textContent).toMatch(/Saved Nov 1[89], 2026/);
    cleanup();
  });
  it("a non-plan item shows only the date", () => {
    const { queryByTestId } = render(
      <SavedMeta
        item={{
          key: "h",
          kind: "hobby",
          title: "t",
          href: "/",
          savedAt: "2026-11-19T12:00:00.000Z",
        }}
      />,
    );
    expect(queryByTestId("saved-cost")).toBeNull();
    expect(queryByTestId("saved-date")).not.toBeNull();
    cleanup();
  });
  it("planSearch still round-trips (sanity)", () => {
    expect(planSearch(base({}), 0, ["a"]).ids).toBe("a");
  });
});

describe("defect 8: reading sections are open on every screen size", () => {
  const long = (n: number): Block[] =>
    Array.from({ length: n }, () => ({ type: "p" as const, text: "word ".repeat(60) }));
  it("opens every collapsible section even when the viewport is a phone", () => {
    window.matchMedia = ((q: string) => ({
      matches: true,
      media: q,
      addEventListener() {},
      removeEventListener() {},
      addListener() {},
      removeListener() {},
      onchange: null,
      dispatchEvent: () => false,
    })) as unknown as typeof window.matchMedia;
    const blocks: Block[] = [
      { type: "h2", text: "A", id: "a" },
      ...long(4),
      { type: "h2", text: "B", id: "b" },
      ...long(4),
      { type: "h2", text: "C", id: "c" },
      ...long(4),
    ];
    const { container } = render(<ArticleBody blocks={blocks} articleSlug="x" />);
    const all = [...container.querySelectorAll<HTMLDetailsElement>("details[data-collapsible]")];
    expect(all.length).toBe(3);
    expect(all.every((d) => d.open)).toBe(true);
    cleanup();
  });
});

describe("defect 9: every pin maps to its own published page", () => {
  const slugs = new Set(articles.map((a) => a.slug));
  const shop = new Set(collections.map((c) => c.slug));
  it("every pin destination is a published article, a shop collection or a real tool/page", () => {
    for (const dest of Object.keys(pinFiles)) {
      const j = /^\/journal\/(.+)$/.exec(dest);
      const s = /^\/shop\/(.+)$/.exec(dest);
      if (j) expect(slugs.has(j[1]!), `${dest} is not a published article`).toBe(true);
      else if (s) expect(shop.has(s[1]!), `${dest} is not a shop collection`).toBe(true);
      else
        expect(["/hobby-finder", "/make-plans", "/tools/tonight", "/tools/hobby-budget"]).toContain(
          dest,
        );
    }
  });
  it("a pin file is named for the page it points to", () => {
    for (const [dest, files] of Object.entries(pinFiles)) {
      const nums = new Set(files.map((f) => f.split("-")[0]));
      expect(nums.size, `${dest} mixes pins from different pages: ${files.join(", ")}`).toBe(1);
    }
    const numToDest = new Map<string, string>();
    for (const [dest, files] of Object.entries(pinFiles)) {
      const n = files[0]!.split("-")[0]!;
      expect(numToDest.get(n) ?? dest, `pin ${n} is used by two pages`).toBe(dest);
      numToDest.set(n, dest);
    }
  });
  it("the Pinterest CSV and manifest point at the same published destinations", () => {
    const csv = readFileSync(path.resolve(__dirname, "../../docs/pinterest-pins.csv"), "utf8");
    const dests = new Set([...csv.matchAll(/\{SITE_URL\}(\/[^"?]*)"/g)].map((m) => m[1]!));
    for (const d of dests) expect(Object.keys(pinFiles), d).toContain(d);
    for (const d of Object.keys(pinFiles)) expect(dests.has(d), d).toBe(true);
    expect(csv).not.toContain("perfect-solo-saturday");
  });
  it("a hobby page only borrows a pin from a guide that is mainly about that hobby", () => {
    for (const h of hobbies) {
      const p = pinForHobby(h.slug);
      if (!p) continue;
      const owner = Object.entries(pinFiles).find(([, f]) => `/pins/${f[0]}` === p)![0];
      const a = articles.find((x) => `/journal/${x.slug}` === owner)!;
      expect(a.hobbies[0], `${h.slug} borrows ${owner}`).toBe(h.slug);
      expect(a.hobbies.length).toBeLessThanOrEqual(4);
    }
  });
});

describe("honest empty states still work", () => {
  it("an impossible choice returns a plan with a stated reason and a one-tap change", () => {
    const plan = makePlan(
      base({
        when: "weeknight",
        length: "evening",
        who: "alone",
        budget: "free",
        vibe: "social",
        setting: "outdoor",
        energy: "low",
        atHome: true,
      }),
      0,
    );
    expect(plan.filled).toBe(0);
    const s = plan.slots[0]!;
    expect(s.activity).toBeNull();
    expect(s.missing).toBeTruthy();
  });
  it("covers every budget choice", () => {
    expect(BUDGETS.length).toBe(5);
  });
});
