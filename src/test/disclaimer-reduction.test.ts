import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const read = (f: string) => readFileSync(join(__dirname, "../..", f), "utf8");
const count = (s: string, re: RegExp) => (s.match(re) ?? []).length;

describe("one concise shopping-links line per shopping page (Stage 3a)", () => {
  it("/shop shows the shared disclosure once and does not restate Amazon or prices in its own copy", () => {
    const s = read("src/routes/shop.index.tsx");
    expect(count(s, /<ShopDisclosure/g)).toBe(1);
    // The only mention left is the meta description; the page body says it once, in the disclosure.
    expect(s.replace(/description:[\s\S]*?",/, "")).not.toMatch(
      /Ordinary Amazon links|no prices|never show prices/i,
    );
  });

  it("a shop collection page has no hero-level disclosure of its own: the kit and hobby shopping components carry it", () => {
    const s = read("src/routes/shop.$category.tsx");
    expect(s).not.toMatch(/<ShopDisclosure/);
    // Disclosure stays next to the recommendations, inside the components that render them.
    expect(read("src/components/commerce/StarterKit.tsx")).toMatch(/<ShopDisclosure/);
    expect(read("src/components/commerce/ShopMyHobby.tsx")).toMatch(/<ShopDisclosure/);
  });

  it("each shopping block component renders its disclosure line exactly once (Stage 3b)", () => {
    for (const f of ["ShopMyHobby", "ShopTheArticle", "StarterKit"])
      expect(count(read(`src/components/commerce/${f}.tsx`), /<ShopDisclosure/g), f).toBe(1);
    // The line is the short one, placed next to the pick: no second long paragraph after the groups.
    for (const f of ["ShopMyHobby", "ShopTheArticle"])
      expect(read(`src/components/commerce/${f}.tsx`), f).not.toMatch(
        /<ShopDisclosure className="mt-[45]" \/>/,
      );
  });

  it("the kit's own note is one short sentence, so the line stays concise", () => {
    expect(read("src/data/kits.ts")).toMatch(
      /KIT_DISCLAIMER = "A list we put together, not a bundle we sell\.";/,
    );
  });

  it("the home page carries no commercial explanation (it has no product blocks)", () => {
    const s = read("src/routes/index.tsx");
    expect(s).not.toMatch(/Amazon|ShopDisclosure|AffiliateNote|no prices/i);
  });

  it("Tonight no longer repeats 'this device' or per-idea '(estimate)'", () => {
    const s = read("src/components/planner/TonightMode.tsx");
    expect(s).not.toMatch(/this device|\(estimate\)/);
  });

  it("the Affiliate Disclosure page and the setting-driven statement logic are untouched", () => {
    const page = read("src/routes/affiliate-disclosure.tsx");
    expect(page).toMatch(/no prices/i);
    expect(read("src/config/affiliate.ts")).toMatch(/export const \w*ASSOCIATE_STATEMENT/);
  });
});
