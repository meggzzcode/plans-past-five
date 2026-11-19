/**
 * Product links: the ASIN and the ordinary Amazon address are stored; the tracking ID never is.
 * Every Amazon link is built centrally, so changing the one site-wide tag changes all of them.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { OUTBOUND_BUY_REL, resolveProductLink } from "@/config/affiliate";
import { validateCatalogProduct, type CatalogProduct } from "@/data/catalog-rules";
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

describe("product files hold no tracking ID and every product is an Amazon product", () => {
  it("no content file stores a tracking tag, a short link or an affiliate URL", () => {
    const bad = /[?&]tag=|\blinkCode=|amzn\.to|\bassociatesTag\b|"affiliateUrl"/;
    for (const dir of ["content/products", "content/articles"])
      for (const { f, text } of filesIn(dir)) expect(text, `${dir}/${f}`).not.toMatch(bad);
  });
  it("every product stores only a verified-format ASIN; the address is derived, never typed", () => {
    for (const { f, text } of filesIn("content/products")) {
      const p = JSON.parse(text);
      expect(p, f).not.toHaveProperty("amazonUrl");
      expect(p, f).not.toHaveProperty("linkType");
      expect(p.asin, f).toMatch(/^[A-Z0-9]{10}$/);
    }
  });
  it("every shipped product link is an ordinary amazon.com product page built from its ASIN", () => {
    setAffiliateState("inactive");
    for (const p of verifiedCatalog) {
      const u = new URL(amazonHref(p));
      expect(u.hostname, p.id).toBe("www.amazon.com");
      expect(u.pathname, p.id).toBe(`/dp/${p.asin}`);
    }
    setAffiliateState("active", "hosts-20");
    for (const p of verifiedCatalog) {
      const u = new URL(amazonHref(p));
      expect(u.hostname, p.id).toBe("www.amazon.com");
      expect(u.pathname, p.id).toBe(`/dp/${p.asin}`);
      expect(u.searchParams.get("tag")).toBe("hosts-20");
    }
  });
  it("a record with no valid ASIN, or one that points at another shop, is refused", () => {
    const base = verifiedCatalog[0]!;
    expect(validateCatalogProduct({ ...base, asin: "" }).join()).toMatch(
      /invalid or placeholder ASIN/,
    );
    expect(
      validateCatalogProduct({ ...base, amazonUrl: "https://shop.example.com/p" }).join(),
    ).toMatch(/amazonUrl must equal/);
    expect(
      validateCatalogProduct({
        ...base,
        affiliateUrl: "https://www.amazon.com/dp/B012345678?tag=a-20",
      }).join(),
    ).toMatch(/affiliateUrl is not allowed/);
  });
  it("outbound Amazon links in articles are ordinary, untagged addresses", () => {
    for (const { f, text } of filesIn("content/articles")) {
      for (const m of text.matchAll(/https?:\/\/[^"\s)]*amazon\.com[^"\s)]*/g))
        expect(m[0], f).not.toMatch(/[?&]tag=/);
    }
  });
});

describe("product pictures are independent of affiliate state and need cleared rights", () => {
  const base = verifiedCatalog[0]!;
  const withImage = (rights: "cleared" | "pending" | "rejected") =>
    ({
      ...base,
      image: {
        file: "/uploads/products/example.jpg",
        alt: "Example product on a table",
        source: "Brand media kit",
        license: "Written permission for commercial use on this site",
        attribution: "Photo: Brand media kit",
        rights,
      },
    }) as CatalogProduct;

  it("cleared: shown with tracking OFF and with tracking ON", () => {
    for (const state of ["inactive", "active"] as const) {
      setAffiliateState(state, "pics-20");
      const r = render(<ProductVisual product={withImage("cleared")} />);
      expect(r.container.querySelector("img")?.getAttribute("src"), state).toBe(
        "/uploads/products/example.jpg",
      );
      expect(r.container.querySelector("[data-product-tile]")).toBeNull();
      cleanup();
    }
  });
  it("pending or rejected: the label tile, with tracking OFF and ON", () => {
    for (const state of ["inactive", "active"] as const)
      for (const rights of ["pending", "rejected"] as const) {
        setAffiliateState(state, "pics-20");
        const r = render(<ProductVisual product={withImage(rights)} />);
        expect(r.container.querySelector("img")).toBeNull();
        expect(r.container.querySelector("[data-product-tile]")).not.toBeNull();
        cleanup();
      }
  });
  it("no shipped product carries a picture unless cleared, and every cleared file exists", () => {
    for (const p of verifiedCatalog) {
      if (!p.image) continue;
      expect(p.image.rights, p.id).toBe("cleared");
      expect(p.image, p.id).not.toHaveProperty("note");
      expect(existsSync(path.join(repo, "public", p.image.file)), p.id).toBe(true);
      expect(p.image.file, p.id).not.toMatch(/^https?:/);
    }
  });
  it("pictures never reach export, copy or print code, and never appear in article files", () => {
    for (const f of ["export-links.ts", "shoplist.ts", "saved-share.ts", "saved-transfer.ts"])
      expect(readFileSync(path.join(repo, "src/lib", f), "utf8"), f).not.toMatch(
        /\.image\b|photoFor/,
      );
    for (const { f, text } of filesIn("content/articles"))
      expect(text, f).not.toMatch(/amazon\.com\/images|media-amazon|ssl-images-amazon/);
  });
});
