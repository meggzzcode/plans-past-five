import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { categories } from "@/data/categories";
import { QUIZ_QUESTION_COUNT } from "@/data/quiz-meta";
import { QUIZ_ORDER } from "@/lib/quiz-flow";
import { mobileNavItems, sectionNav, toolNav } from "@/components/layout/nav";

describe("navigation list", () => {
  it("lists all six sections and Start Here, using display names from categories", () => {
    expect(categories).toHaveLength(6);
    const labels = mobileNavItems.map((n) => n.label);
    for (const c of categories) expect(labels).toContain(c.name);
    expect(toolNav[0]?.label).toBe("Start Here");
    expect(mobileNavItems.map((n) => n.to)).toEqual(
      expect.arrayContaining(["/start-here", "/hobby-finder", "/make-plans", "/saved"]),
    );
    expect(sectionNav.map((n) => n.to)).toEqual(categories.map((c) => `/${c.slug}`));
  });

  it("has no duplicate names or destinations", () => {
    const labels = mobileNavItems.map((n) => n.label);
    expect(new Set(labels).size).toBe(labels.length);
    const tos = mobileNavItems.map((n) => n.to);
    expect(new Set(tos).size).toBe(tos.length);
    const names = categories.map((c) => c.name);
    expect(new Set(names).size).toBe(names.length);
  });
});

describe("names are consistent", () => {
  it("uses one name per primary journey in the nav", () => {
    const byTo = Object.fromEntries(mobileNavItems.map((n) => [n.to, n.label]));
    expect(byTo["/hobby-finder"]).toBe("Find Your Thing");
    expect(byTo["/make-plans"]).toBe("Make Some Plans");
    expect(byTo["/shop"]).toBe("Shop Your Hobby");
    expect(byTo["/saved"]).toBe("My Plans");
    expect(byTo["/tools/tonight"]).toBe("What Should I Do Tonight?");
  });
});

describe("quiz question count", () => {
  it("matches the longest path through the quiz flow (it is adaptive, so most people see fewer)", () => {
    expect(QUIZ_ORDER.length).toBe(QUIZ_QUESTION_COUNT);
  });
});

describe("mobile menu fine print", () => {
  it("links About, Contact, Editorial Standards, Affiliate Disclosure and Corrections", async () => {
    const { finePrintNav } = await import("@/components/layout/nav");
    const { trustLinks } = await import("@/config/trust-links");
    expect(finePrintNav.map((n) => n.label)).toEqual([
      "About",
      "Contact",
      "Editorial Standards",
      "Affiliate Disclosure",
      "Corrections",
    ]);
    for (const t of trustLinks.filter((t) => t.label !== "How We Choose"))
      expect(finePrintNav.find((n) => n.label === t.label)?.to).toBe(t.to);
    const header = readFileSync("src/components/layout/Header.tsx", "utf8");
    expect(header).toContain("finePrintNav.map");
  });
});
