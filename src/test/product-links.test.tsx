/**
 * Product links: the ASIN and the ordinary Amazon address are stored; the tracking ID never is.
 * Every Amazon link is built centrally, so changing the one site-wide tag changes all of them.
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { OUTBOUND_BUY_REL, resolveProductLink } from "@/config/affiliate";
import { LINK_TYPES, validateCatalogProduct, type CatalogProduct } from "@/data/catalog-rules";
import { linkableFor, verifiedCatalog } from "@/data/catalog";
import { Inline } from "@/components/editorial/Inline";
import { ProductVisual } from "@/components/commerce/ProductCard";
import { exportLinkFor } from "@/lib/export-links";
import { setAffiliateState, withAffiliateRestore } from "./affiliate-state";

const repo = path.resolve(__dirname, "../..");
const filesIn = (dir: string) =>
  readdirSync(path.join(repo, dir))
    .filter((f) => f.endsWith(".json"))
    .map((f) => ({ f, text: readFileSync(path.join(repo, dir, f), "utf8") }));

withAffiliateRestore();
afterEach(cleanup);

const amazonHref = (p: CatalogProduct) => resolveProductLink(linkableFor(p)).href;

describe("one site-wide tracking ID builds every Amazon link", () => {
  it("changing the tag in one place changes every product link, and none keeps the old one", () => {
    setAffiliateState("active", "firstsite-20");
    const first = verifiedCatalog.map(amazonHref);
    for (const h of first) {
      expect(h).toMatch(/^https:\/\/www\.amazon\.com\/dp\/[A-Z0-9]{10}\?tag=firstsite-20$/);
    }
    setAffiliateState("active", "secondsite-21");
    const second = verifiedCatalog.map(amazonHref);
    expect(second).toHaveLength(first.length);
    second.forEach((h, i) => {
      expect(h).toContain("tag=secondsite-21");
      expect(h).not.toContain("firstsite-20");
      // same product, same ASIN: only the tag moved
      expect(h.replace("secondsite-21", "firstsite-20")).toBe(first[i]);
    });
  });
  it("inactive (the shipped default): ordinary links, no tag anywhere", () => {
    setAffiliateState("inactive");
    for (const p of verifiedCatalog) {
      const l = resolveProductLink(linkableFor(p));
      expect(l.href).toBe(p.amazonUrl);
      expect(l.href).not.toMatch(/[?&]tag=/);
      expect(l.kind).toBe("retailer");
      expect(l.sponsored).toBe(false);
    }
  });
  it("inline product mentions in articles follow the tag and keep rel=sponsored noopener noreferrer", () => {
    const id = verifiedCatalog[0]!.id;
    setAffiliateState("active", "mentions-20");
    const r = render(<Inline text={`See {{product:${id}|this one}}.`} />);
    const a = r.container.querySelector("a")!;
    expect(a.getAttribute("href")).toContain("tag=mentions-20");
    expect(a.getAttribute("rel")).toBe("sponsored noopener noreferrer");
    expect(a.getAttribute("rel")).toBe(OUTBOUND_BUY_REL);
    cleanup();
    setAffiliateState("inactive");
    const r2 = render(<Inline text={`See {{product:${id}|this one}}.`} />);
    const b = r2.container.querySelector("a")!;
    expect(b.getAttribute("href")).not.toContain("tag=");
    expect(b.getAttribute("rel")).toBe("sponsored noopener noreferrer");
  });
  it("export and copy lists stay free of affiliate links even when the site is active", () => {
    setAffiliateState("active", "export-20");
    for (const p of verifiedCatalog) {
      const e = exportLinkFor(p);
      expect(e.href).toBe(p.amazonUrl);
      expect(e.href).not.toMatch(/tag=|export-20/);
    }
  });
});

describe("product and article files hold no tracking ID and only declared link types", () => {
  it("no content file stores a tracking tag, a short link or an affiliate URL", () => {
    const bad = /[?&]tag=|\blinkCode=|amzn\.to|\bassociatesTag\b|"affiliateUrl"/;
    for (const dir of ["content/products", "content/articles"])
      for (const { f, text } of filesIn(dir)) expect(text, `${dir}/${f}`).not.toMatch(bad);
  });
  it("every product declares a known link type and only allowed hosts", () => {
    for (const { f, text } of filesIn("content/products")) {
      const p = JSON.parse(text);
      expect(LINK_TYPES, f).toContain(p.linkType);
      if (p.linkType === "amazon-affiliate-ready") {
        // only the ASIN is stored; the ordinary address is derived from it (never typed, never tagged)
        expect(p, f).not.toHaveProperty("amazonUrl");
        expect(p.asin, f).toMatch(/^[A-Z0-9]{10}$/);
      } else {
        const dest = new URL(p.altRetailerUrl ?? p.manufacturerUrl);
        expect(dest.protocol, f).toBe("https:");
        expect(dest.hostname, f).not.toMatch(/amazon|amzn/);
      }
    }
  });
  it("outbound Amazon links in articles are ordinary, untagged addresses", () => {
    for (const { f, text } of filesIn("content/articles")) {
      for (const m of text.matchAll(/https?:\/\/[^"\s)]*amazon\.com[^"\s)]*/g))
        expect(m[0], f).not.toMatch(/[?&]tag=/);
    }
  });
});

describe("editorial picks link to the maker or retailer, unmonetised", () => {
  const base = JSON.parse(
    readFileSync(path.join(repo, "content/products/mr-pen-washi-tape-21-rolls.json"), "utf8"),
  );
  const {
    status: _s,
    order: _o,
    asin: _a,
    amazonUrl: _u,
    ...rest
  } = base as Record<string, unknown>;
  void [_s, _o, _a, _u];
  const pick = {
    ...rest,
    id: "maker-pick",
    status: "verified",
    asin: "",
    amazonUrl: "",
    linkType: "editorial-pick",
    manufacturerUrl: "https://maker.example.com/product",
  } as unknown as CatalogProduct;
  it("is valid with a maker page and no ASIN, and links there even when Amazon is active", () => {
    expect(validateCatalogProduct(pick)).toEqual([]);
    setAffiliateState("active", "pick-20");
    const l = resolveProductLink(linkableFor(pick));
    expect(l.href).toBe("https://maker.example.com/product");
    expect(l.href).not.toContain("tag=");
    expect(l.sponsored).toBe(false);
  });
  it("needs a destination, and may not point at Amazon or carry tracking", () => {
    const { manufacturerUrl: _m, ...none } = pick as unknown as Record<string, unknown>;
    void _m;
    expect(validateCatalogProduct(none as unknown as CatalogProduct).join()).toMatch(
      /needs a maker or retailer web address/,
    );
    expect(
      validateCatalogProduct({
        ...pick,
        manufacturerUrl: "https://www.amazon.com/dp/B012345678",
      }).join(),
    ).toMatch(/non-Amazon/);
    expect(
      validateCatalogProduct({
        ...pick,
        manufacturerUrl: "https://maker.example.com/p?tag=x-20",
      }).join(),
    ).toMatch(/tracking parameters/);
  });
  it("an unknown link type or a stored affiliate link is refused", () => {
    expect(validateCatalogProduct({ ...pick, linkType: "sponsored" } as never).join()).toMatch(
      /linkType must be one of/,
    );
    expect(
      validateCatalogProduct({
        ...pick,
        affiliateUrl: "https://www.amazon.com/dp/B012345678?tag=a-20",
      }).join(),
    ).toMatch(/affiliateUrl is not allowed/);
  });
});

describe("optional Associates image embed", () => {
  const base = verifiedCatalog[0]!;
  const withEmbed = {
    ...base,
    imageEmbed: {
      src: "https://example.test/provided-by-associates-tool.jpg",
      alt: "The product as shown by the Associates tool",
      approvedOn: "2026-11-19",
    },
  } as CatalogProduct;

  it("no shipped product has an embed yet (null by default)", () => {
    for (const p of verifiedCatalog) expect(p.imageEmbed ?? null).toBeNull();
  });
  it("inactive: the card keeps the editorial label tile, no image at all", () => {
    setAffiliateState("inactive");
    const r = render(<ProductVisual product={withEmbed} />);
    expect(r.container.querySelector("[data-product-embed]")).toBeNull();
    expect(r.container.querySelector("img")).toBeNull();
    expect(r.container.querySelector("[data-product-tile]")).not.toBeNull();
  });
  it("active: the embed shows, links to the product's Amazon page with the central tag, and never prints", () => {
    setAffiliateState("active", "embed-20");
    const r = render(<ProductVisual product={withEmbed} />);
    const a = r.container.querySelector("a[data-product-embed]")!;
    expect(a.getAttribute("href")).toBe(`${base.amazonUrl}?tag=embed-20`);
    expect(a.getAttribute("rel")).toBe("sponsored noopener noreferrer");
    expect(a.className).toContain("no-print");
    expect(r.container.querySelector("img")!.getAttribute("src")).toBe(withEmbed.imageEmbed!.src);
    expect(r.container.querySelector("[data-product-tile]")).toBeNull();
    cleanup();
    // a product without an embed still shows the tile while active
    const r2 = render(<ProductVisual product={base} />);
    expect(r2.container.querySelector("[data-product-tile]")).not.toBeNull();
  });
  it("is validated: needs https, alt and a date, never a tag, only on Amazon products", () => {
    expect(validateCatalogProduct(withEmbed)).toEqual([]);
    const bad = (e: unknown) =>
      validateCatalogProduct({ ...base, imageEmbed: e } as unknown as CatalogProduct).join();
    expect(bad({ ...withEmbed.imageEmbed, src: "http://x.test/a.jpg" })).toMatch(/https address/);
    expect(bad({ ...withEmbed.imageEmbed, src: "https://x.test/a.jpg?tag=me-20" })).toMatch(
      /tracking tag/,
    );
    expect(bad({ ...withEmbed.imageEmbed, alt: "" })).toMatch(/alt is required/);
    expect(bad({ ...withEmbed.imageEmbed, approvedOn: "yesterday" })).toMatch(/approvedOn/);
  });
  it("embeds never reach export, copy or print code", () => {
    for (const f of ["export-links.ts", "shoplist.ts", "saved-share.ts", "saved-transfer.ts"]) {
      expect(readFileSync(path.join(repo, "src/lib", f), "utf8"), f).not.toMatch(/imageEmbed/);
    }
    setAffiliateState("active", "embed-20");
    expect(JSON.stringify(exportLinkFor(withEmbed))).not.toMatch(/example\.test|tag=/);
  });
});
