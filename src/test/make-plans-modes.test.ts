import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { makePlansMode } from "@/routes/make-plans";
import { DEFAULT_TONIGHT, parseTonightSearch, tonightHref, tonightSearch } from "@/lib/tonight";

describe("Make Plans modes (Tonight is folded in)", () => {
  it("opens Tonight on a bare /make-plans and on ?mode=tonight", () => {
    expect(makePlansMode({})).toBe("tonight");
    expect(makePlansMode({ mode: "tonight" })).toBe("tonight");
    expect(makePlansMode({ t: "60", e: "low" })).toBe("tonight");
  });

  it("opens the planner on ?mode=plan and whenever a planner answer is in the address", () => {
    expect(makePlansMode({ mode: "plan" })).toBe("plan");
    expect(makePlansMode({ when: "saturday" })).toBe("plan");
    expect(makePlansMode({ ids: "a,b" })).toBe("plan");
    expect(makePlansMode({ from: "quiz", vibe: "creative" })).toBe("plan");
  });

  it("an explicit mode wins over stray parameters", () => {
    expect(makePlansMode({ mode: "tonight", when: "saturday" })).toBe("tonight");
    expect(makePlansMode({ mode: "plan", t: "60" })).toBe("plan");
  });

  it("Tonight links now point at Make Plans and round-trip their answers", () => {
    const href = tonightHref(DEFAULT_TONIGHT, 3);
    expect(href.startsWith("/make-plans?mode=tonight&")).toBe(true);
    const params = Object.fromEntries(new URL(href, "https://x.test").searchParams);
    expect(params["mode"]).toBe("tonight");
    expect(parseTonightSearch(params)).toMatchObject({ input: DEFAULT_TONIGHT, seed: 3 });
    expect(tonightSearch(DEFAULT_TONIGHT, 3)).toMatchObject({ s: "3" });
  });

  it("the Tonight engine is the original one (no second copy, no rewrite)", () => {
    const mode = readFileSync(join(__dirname, "../components/planner/TonightMode.tsx"), "utf8");
    expect(mode).toContain("tonightIdeas(input, seed)");
    expect(mode).toContain('from "@/lib/tonight"');
  });

  it("the postcode box and My Plans backup panel are hidden by flags, not deleted", async () => {
    const { SHOW_NEAR_BOX } = await import("@/components/share/Near");
    const { SHOW_TRANSFER } = await import("@/components/saved/Transfer");
    expect(SHOW_NEAR_BOX).toBe(false);
    expect(SHOW_TRANSFER).toBe(false);
  });
});
