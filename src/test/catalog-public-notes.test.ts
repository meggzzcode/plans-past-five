import { describe, expect, it } from "vitest";
import { generatedCatalog } from "@/data/catalog.generated";

// Internal research and verification notes live in docs/commerce/product-research.csv only.
describe("public catalog carries no internal process notes", () => {
  it("has none of the internal phrases in limitations", () => {
    const bad =
      /\b(?:manufacturer|maker) page (?:not yet checked|not found|was not|could not)|\bread (?:in browser|20\d\d)|\bcowork\b|\bTODO\b|\bto confirm\b/i;
    for (const p of generatedCatalog) {
      for (const l of p.limitations) expect(l, `${p.id}: ${l}`).not.toMatch(bad);
      expect(p.limitations.length).toBeGreaterThan(0);
    }
  });
  it("does not ship hold reasons", () => {
    for (const p of generatedCatalog) if (p.hold) expect(p.hold).toBe("held");
  });
});
