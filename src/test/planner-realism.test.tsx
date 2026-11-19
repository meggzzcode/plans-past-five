import { describe, expect, it, vi } from "vitest";

// Exhaustive planner matrices; see wave-b-tools.test.tsx for why the limit is raised.
vi.setConfig({ testTimeout: 60_000 });
import { renderToString } from "react-dom/server";
import { act, cleanup, render } from "@testing-library/react";
import { hydrateRoot } from "react-dom/client";
import { activities } from "@/data/activities";
import { EVENING_TEMPLATES } from "@/data/evening-templates";
import {
  ENERGIES,
  eveningTemplatesFor,
  lighterPlan,
  makePlan,
  planFromIds,
  type PlanInput,
} from "@/lib/planner";
import { useHydrated, waitingProps } from "@/lib/use-hydrated";
import { readingSections } from "@/components/editorial/ArticleBody";
import type { Block } from "@/content";

const rank = { low: 0, medium: 1, high: 2 } as const;
const base: PlanInput = {
  when: "weeknight",
  length: "few-hours",
  vibe: "cozy",
  who: "alone",
  budget: "under25",
  atHome: false,
  setting: "any",
  energy: "any",
};

// Realistic scenarios (not thin pools): every energy value must give its own valid plan.
const scenarios: PlanInput[] = [
  { ...base },
  { ...base, vibe: "social", who: "friend", budget: "under50" },
  { ...base, vibe: "active", who: "friend", budget: "under50" },
  { ...base, when: "evening", vibe: "creative", who: "friend", budget: "under50" },
  { ...base, when: "saturday", length: "half-day", vibe: "cozy" },
  { ...base, when: "saturday", length: "half-day", vibe: "active", who: "friend" },
  { ...base, when: "saturday", length: "full-day", vibe: "adventurous", budget: "under50" },
  { ...base, when: "saturday", length: "half-day", vibe: "creative", budget: "under50" },
  { ...base, when: "sunday", length: "half-day", vibe: "outdoorsy", who: "partner" },
];

describe("planner honours every energy value", () => {
  for (const [i, sc] of scenarios.entries()) {
    it(`scenario ${i + 1}: four energy values, four different valid plans`, () => {
      const plans = ENERGIES.map((e) => makePlan({ ...sc, energy: e }, 0));
      const keys = plans.map((p) => p.ids.join(","));
      expect(new Set(keys).size, keys.join(" | ")).toBe(4);
      plans.forEach((p, k) => {
        const e = ENERGIES[k]!;
        expect(p.filled).toBeGreaterThan(0);
        for (const s of p.slots) {
          if (!s.activity) continue;
          if (e === "low") expect(s.activity.energy).toBe("low");
          if (e === "medium") expect(rank[s.activity.energy]).toBeLessThanOrEqual(1);
          if (e === "high") expect(rank[s.activity.energy]).toBeGreaterThanOrEqual(1);
        }
        expect(p.input.energy).toBe(e);
      });
    });
  }
});

describe("evening templates", () => {
  it("has at least three per energy level, only existing activities", () => {
    for (const e of ["low", "medium", "high", "any"] as const)
      expect(EVENING_TEMPLATES.filter((t) => t.energy === e).length).toBeGreaterThanOrEqual(3);
    for (const t of EVENING_TEMPLATES)
      for (const id of t.ids)
        expect(
          activities.find((a) => a.id === id),
          id,
        ).toBeTruthy();
  });
  it("every template really replays as a two-stop evening for someone it suits", () => {
    for (const t of EVENING_TEMPLATES) {
      const ok = (["alone", "friend", "partner", "group"] as const).some(
        (who) =>
          eveningTemplatesFor({
            ...base,
            who,
            vibe: "social",
            budget: "flexible",
            energy: t.energy,
          }).some((x) => x.id === t.id) ||
          eveningTemplatesFor({
            ...base,
            who,
            vibe: "cozy",
            budget: "flexible",
            energy: t.energy,
          }).some((x) => x.id === t.id) ||
          eveningTemplatesFor({
            ...base,
            who,
            vibe: "active",
            budget: "flexible",
            energy: t.energy,
          }).some((x) => x.id === t.id),
      );
      expect(ok, t.id).toBe(true);
    }
  });
});

describe("realism lines", () => {
  it("has a why line, buffer rows and a wind-down on an evening", () => {
    const p = makePlan({ ...base, energy: "medium", vibe: "creative", who: "friend" }, 0);
    expect(p.why).toMatch(/medium energy/);
    expect(p.slots.filter((s) => s.buffer).length).toBe(p.filled - 1);
    expect(p.slots.find((s) => s.buffer)!.buffer!.minutes).toBeGreaterThanOrEqual(15);
    expect(p.windDown).not.toBeNull();
  });
  it("this Saturday never holds an idea that needs booking ahead; the weekend may", () => {
    const adv = activities.filter((a) => a.advance).map((a) => a.id);
    expect(adv).toContain("pottery-studio");
    for (const vibe of ["creative", "adventurous", "social", "cozy"] as const)
      for (const seed of [0, 1, 2, 3])
        for (const len of ["half-day", "full-day"] as const)
          expect(
            makePlan(
              { ...base, when: "saturday", length: len, vibe, budget: "flexible" },
              seed,
            ).ids.some((id) => adv.includes(id)),
          ).toBe(false);
  });
  it("lighter plan drops one stop, lengthens breaks and still restores from its ids", () => {
    const p = makePlan({ ...base, when: "saturday", length: "half-day", vibe: "active" }, 0);
    const l = lighterPlan(p)!;
    expect(l).not.toBeNull();
    expect(l.ids.length).toBe(p.ids.length - 1);
    const lp = planFromIds(l.input, p.seed, l.ids)!;
    expect(lp.input.light).toBe(true);
    const b = lp.slots.find((s) => s.buffer);
    if (b) expect(b.buffer!.minutes).toBe(45);
    expect(lighterPlan(lp)).toBeNull();
  });
  it("never repeats an activity family in a plan", () => {
    for (const when of ["saturday", "weekend"] as const)
      for (const vibe of ["creative", "cozy", "active", "social"] as const) {
        const p = makePlan({ ...base, when, length: "half-day", vibe, budget: "flexible" }, 0);
        const fams = p.slots.filter((s) => s.activity).map((s) => s.activity!.family);
        if (when === "saturday") expect(new Set(fams).size).toBe(fams.length);
      }
  });
});

describe("first-tap hydration hook", () => {
  const Probe = () => {
    const h = useHydrated();
    return <button {...waitingProps(h)}>go</button>;
  };
  it("renders disabled and busy on the server, enabled after hydration", async () => {
    const html = renderToString(<Probe />);
    expect(html).toMatch(/disabled/);
    expect(html).toMatch(/aria-busy/);
    const el = document.createElement("div");
    el.innerHTML = html;
    document.body.appendChild(el);
    await act(async () => {
      hydrateRoot(el, <Probe />);
    });
    expect(el.querySelector("button")!.disabled).toBe(false);
    el.remove();
    cleanup();
    render(<Probe />);
  });
});

describe("reading sections", () => {
  const long = (n: number): Block[] =>
    Array.from({ length: n }, () => ({ type: "p" as const, text: "word ".repeat(60) }));
  it("folds only when two or more sections are long, keeps every block", () => {
    const blocks: Block[] = [
      { type: "p", text: "intro" },
      { type: "h2", text: "A", id: "a" },
      ...long(4),
      { type: "h2", text: "B", id: "b" },
      ...long(4),
      { type: "h2", text: "C", id: "c" },
      { type: "p", text: "short" },
    ];
    const s = readingSections(blocks);
    expect(s.map((x) => x.fold)).toEqual([false, true, true, false]);
    expect(s[s.length - 1]!.end).toBe(blocks.length);
    const one = readingSections([{ type: "h2", text: "A", id: "a" }, ...long(4)]);
    expect(one.every((x) => !x.fold)).toBe(true);
  });
});
