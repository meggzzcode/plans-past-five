import { describe, expect, it } from "vitest";
import {
  AMAZON_ASSOCIATE_STATEMENT,
  affiliate,
  affiliateRegistry,
  amazonSearchUrl,
  isMonetized,
  liveDisclosureSentences,
  productHref,
  resolveProductLink,
  validateRegistry,
} from "@/config/affiliate";
import { affiliatePrograms, validatePrograms, UNVERIFIED } from "@/data/affiliate-programs";
import { products, validateProduct } from "@/data/products";

import { setAffiliateState, useAffiliateRestore, useAffiliateState } from "./affiliate-state";

const amazon = affiliateRegistry["amazon"]!;
// Every test starts from the state it asks for and the entry is restored afterwards, so the
// results never depend on whether the repo ships inactive or the buyer has activated it.
useAffiliateRestore();

const activate = (tag = "demo-20") => setAffiliateState("active", tag);

describe("inactive registry (shipped default state)", () => {
  useAffiliateState("inactive");
  it("an inactive registry yields no tag and no sponsored links", () => {
    expect(affiliate.associatesTag).toBe("");
    expect(isMonetized()).toBe(false);
    expect(liveDisclosureSentences()).toEqual([]);
    const l = resolveProductLink({ amazonQuery: "air dry clay" });
    expect(l).toMatchObject({ kind: "search", sponsored: false, exact: false });
    expect(l.href).toBe("https://www.amazon.com/s?k=air+dry+clay");
    expect(validateRegistry()).toEqual([]);
  });
  it("every product link is a plain link while inactive", () => {
    for (const p of products) expect(productHref(p)).not.toContain("tag=");
  });
});

describe("active registry (buyer state, fake id)", () => {
  useAffiliateState("active", "testsite-20");
  it("is valid, monetized, and tags every product link with the one id", () => {
    expect(validateRegistry()).toEqual([]);
    expect(isMonetized()).toBe(true);
    expect(liveDisclosureSentences()).toContain(AMAZON_ASSOCIATE_STATEMENT);
    for (const p of products) {
      const l = resolveProductLink(p);
      expect(new URL(l.href).searchParams.getAll("tag")).toEqual(["testsite-20"]);
      expect(l.sponsored).toBe(true);
    }
  });
});

describe("disclosure wording", () => {
  it("matches the Amazon Operating Agreement sentence (first person singular)", () => {
    expect(AMAZON_ASSOCIATE_STATEMENT).toBe(
      "As an Amazon Associate I earn from qualifying purchases.",
    );
  });
});

describe("swap procedure", () => {
  it("changing one tracking id changes every link", () => {
    activate("first-20");
    const all = () => products.map((p) => productHref(p));
    expect(all().every((h) => h.includes("tag=first-20"))).toBe(true);
    amazon.websiteTrackingId = "second-20";
    expect(all().every((h) => h.includes("tag=second-20") && !h.includes("first-20"))).toBe(true);
    expect(resolveProductLink(products[0]!).sponsored).toBe(true);
    expect(liveDisclosureSentences()).toContain(AMAZON_ASSOCIATE_STATEMENT);
  });
  it("legacy associatesTag setter writes the registry entry", () => {
    setAffiliateState("inactive");
    affiliate.associatesTag = "x-20";
    expect(amazon.websiteTrackingId).toBe("x-20");
  });
});

describe("fallbacks", () => {
  it.each([
    ["inactive", { active: false }],
    ["not applied", { approvalStatus: "not-applied" as const }],
    ["applied only", { approvalStatus: "applied" as const }],
    ["declined", { approvalStatus: "declined" as const }],
    ["blank id", { websiteTrackingId: "  " }],
  ])("%s entry falls back to plain links", (_n, patch) => {
    activate();
    Object.assign(amazon, patch);
    expect(isMonetized()).toBe(false);
    const l = resolveProductLink({ amazonQuery: "tennis balls" });
    expect(l.href).not.toContain("tag=");
    expect(l.sponsored).toBe(false);
    expect(amazonSearchUrl("a")).not.toContain("tag=");
  });
  it("uses an ordinary retailer URL when no affiliate matches", () => {
    activate();
    const l = resolveProductLink({
      amazonQuery: "x",
      retailerUrl: "https://www.example-shop.test/item?id=1",
    });
    expect(l).toMatchObject({ kind: "retailer", sponsored: false, exact: true });
    expect(l.href).toBe("https://www.example-shop.test/item?id=1");
  });
});

describe("exactUrl handling", () => {
  it("keeps an existing query string and adds the tag when live", () => {
    activate("t-20");
    const l = resolveProductLink({
      amazonQuery: "x",
      exactUrl: "https://www.amazon.com/dp/EXAMPLE?th=1&psc=1",
    });
    const u = new URL(l.href);
    expect(u.searchParams.get("th")).toBe("1");
    expect(u.searchParams.get("psc")).toBe("1");
    expect(u.searchParams.get("tag")).toBe("t-20");
    expect(l.exact).toBe(true);
  });
  it("leaves exactUrl untouched when not live and replaces a stale tag when live", () => {
    setAffiliateState("inactive");
    const url = "https://www.amazon.com/dp/EXAMPLE?th=1";
    expect(productHref({ amazonQuery: "x", exactUrl: url })).toBe(url);
    activate("new-20");
    const u = new URL(productHref({ amazonQuery: "x", exactUrl: url + "&tag=old-20" }));
    expect(u.searchParams.getAll("tag")).toEqual(["new-20"]);
  });
  it("bad URLs fall back to the search link", () => {
    expect(productHref({ amazonQuery: "x", exactUrl: "not a url" })).toContain("/s?k=x");
  });
});

describe("no fake URLs", () => {
  it("non-Amazon entries without a template never produce affiliate links", () => {
    affiliateRegistry["testnet"] = {
      ...amazon,
      id: "testnet",
      network: "TestNet",
      retailer: "Shop",
      retailerHosts: ["example-shop.test"],
      websiteTrackingId: "abc",
      approvalStatus: "approved",
      active: true,
      affiliateUrlTemplate: null,
    };
    try {
      const l = resolveProductLink({
        amazonQuery: "x",
        retailerUrl: "https://example-shop.test/a",
      });
      expect(l.kind).toBe("retailer");
      affiliateRegistry["testnet"].affiliateUrlTemplate =
        "https://track.test/c?id={tag}&u={urlEncoded}";
      const a = resolveProductLink({
        amazonQuery: "x",
        retailerUrl: "https://example-shop.test/a",
      });
      expect(a.kind).toBe("affiliate");
      expect(a.href).toBe("https://track.test/c?id=abc&u=https%3A%2F%2Fexample-shop.test%2Fa");
    } finally {
      delete affiliateRegistry["testnet"];
    }
  });
  it("inactive registry has no tracking ids or templates; any state has no invented template", () => {
    setAffiliateState("inactive");
    for (const e of Object.values(affiliateRegistry)) {
      expect(e.websiteTrackingId).toBe("");
      expect(e.affiliateUrlTemplate).toBeNull();
      expect(e.active).toBe(false);
    }
    setAffiliateState("active");
    // Amazon uses the tag parameter, never an invented deep-link template.
    expect(affiliateRegistry["amazon"]!.affiliateUrlTemplate).toBeNull();
  });
});

describe("product records", () => {
  it("all shipped products validate", () => {
    expect(products.flatMap(validateProduct)).toEqual([]);
  });
  it("displayed brand/spec/retailer claims need sourceUrl and lastVerified", () => {
    const base = products[0]!;
    expect(validateProduct({ ...base, brand: "X" }).length).toBe(2);
    expect(validateProduct({ ...base, specs: [{ label: "a", value: "b" }] }).length).toBe(2);
    expect(
      validateProduct({
        ...base,
        brand: "X",
        sourceUrl: "https://example.test/p",
        lastVerified: "2026-11-19",
      }),
    ).toEqual([]);
    expect(validateProduct({ ...base, lastVerified: "19/11/2026" })).not.toEqual([]);
  });
});

describe("affiliate program register", () => {
  it("lists candidates only, with unverified facts", () => {
    // Amazon Associates only (owner decision 2026-11-19).
    expect(affiliatePrograms.map((p) => p.id)).toEqual(["amazon-associates"]);
    for (const p of affiliatePrograms) {
      expect(p.status).toBe("candidate");
      // Commission rate card was not read; it must stay null and unpublished.
      expect(p.commission).toBeNull();
      expect(p.applicationRequirements).not.toBe(UNVERIFIED);
      expect(p.verifiedAt).toBe("2026-11-18");
    }
  });
  it("no entry claims commission/cookie without source and verifiedAt", () => {
    expect(validatePrograms()).toEqual([]);
    const bare = { ...affiliatePrograms[0]!, source: null, verifiedAt: null };
    expect(validatePrograms([{ ...bare, commission: "5%" }])).not.toEqual([]);
    expect(validatePrograms([{ ...bare, cookieDays: 1 }])).not.toEqual([]);
  });
});
