/**
 * With a LIVE affiliate entry (fake id), unknown, malformed, unverified or held products must not
 * yield a misleading or tagged-wrong URL, and no tag may reach exported or copied text.
 */
import { describe, expect, it } from "vitest";
import { resolveProductLink } from "@/config/affiliate";
import {
  amazonProductUrl,
  filterVerified,
  isValidAsin,
  linkableFor,
  validateCatalogProduct,
  verifiedCatalog,
  type CatalogProduct,
} from "@/data/catalog";
import { exportLinkFor } from "@/lib/export-links";
import { buildListText } from "@/lib/shoplist";
import { FAKE_TAG, useAffiliateState } from "./affiliate-state";

const good: CatalogProduct = {
  id: "safety-good",
  name: "SAFETY FIXTURE tape",
  brand: "Test Brand",
  category: "Washi tape",
  description: "Fixture.",
  asin: "B0SAFETY01",
  amazonUrl: "https://www.amazon.com/dp/B0SAFETY01",
  specs: [{ label: "Width", value: "15 mm" }],
  hobbies: ["junk-journaling"],
  articles: [],
  collections: [],
  kitSlots: [],
  role: "affordable",
  isEssential: true,
  audience: "Beginners",
  whySelected: "Fixture.",
  limitations: ["Fixture."],
  researchSources: ["https://example.com/s"],
  lastVerified: "2026-01-01",
  availability: "available",
  affiliateStatus: "not-activated",
  status: "verified",
};

describe("live affiliate entry: misleading URLs are impossible", () => {
  useAffiliateState("active");

  it("a valid verified product gets exactly one tag on its own ASIN page", () => {
    expect(validateCatalogProduct(good)).toEqual([]);
    const l = resolveProductLink(linkableFor(good));
    const u = new URL(l.href);
    expect(u.origin + u.pathname).toBe(amazonProductUrl("B0SAFETY01"));
    expect(u.searchParams.getAll("tag")).toEqual([FAKE_TAG]);
    expect(l.sponsored).toBe(true);
  });

  it("malformed or placeholder ASINs never pass the verified filter", () => {
    for (const asin of ["B0123", "b0safety01", "B0SAFETY01X", "EXAMPLE000", "0000000000", ""]) {
      expect(isValidAsin(asin), asin).toBe(false);
      const bad = { ...good, asin, amazonUrl: `https://www.amazon.com/dp/${asin}` };
      expect(filterVerified([bad]), asin).toEqual([]);
    }
  });

  it("an amazonUrl that does not match the ASIN is rejected", () => {
    const bad = { ...good, amazonUrl: "https://www.amazon.com/dp/B0OTHER123" };
    expect(filterVerified([bad])).toEqual([]);
  });

  it("candidate, held and unavailable products stay invisible", () => {
    expect(filterVerified([{ ...good, status: "candidate" }])).toEqual([]);
    expect(filterVerified([{ ...good, hold: "audience fit" }])).toEqual([]);
    expect(filterVerified([{ ...good, availability: "unavailable" }])).toEqual([]);
    expect(filterVerified([good])).toHaveLength(1);
  });

  it("a record that already carries a tracking parameter is rejected, not re-tagged", () => {
    const bad = { ...good, amazonUrl: `${good.amazonUrl}?tag=someone-else-20` };
    expect(filterVerified([bad])).toEqual([]);
  });

  it("an unknown destination host is never tagged, and a bad URL falls back to a tagged search only", () => {
    const other = resolveProductLink({ amazonQuery: "x", exactUrl: "https://example.test/p" });
    expect(other.href).toBe("https://example.test/p");
    expect(other.sponsored).toBe(false);
    const bad = resolveProductLink({ amazonQuery: "x", exactUrl: "not a url" });
    expect(bad.exact).toBe(false);
    expect(new URL(bad.href).pathname).toBe("/s");
  });

  it("every shipped verified product links to its own ASIN page with the one tag", () => {
    for (const p of verifiedCatalog) {
      const u = new URL(resolveProductLink(linkableFor(p)).href);
      expect(u.pathname).toBe(`/dp/${p.asin}`);
      expect(u.searchParams.getAll("tag")).toEqual([FAKE_TAG]);
    }
  });

  it("exports and copied lists stay free of the tag while live", () => {
    expect(exportLinkFor(good).href).toBe(amazonProductUrl("B0SAFETY01"));
    const text = buildListText([good], { [good.id]: "need" }, "2026-02-03");
    expect(text).not.toMatch(new RegExp(`tag=|${FAKE_TAG}|Associate`, "i"));
  });
});
