import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, cleanup, fireEvent, act } from "@testing-library/react";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRouter,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { affiliateRegistry, resolveProductLink } from "@/config/affiliate";
import { site } from "@/config/site";
import {
  catalog,
  catalogReferenceProblems,
  filterVerified,
  linkableFor,
  selectProducts,
  validateCatalogProduct,
  verifiedCatalog,
  type CatalogProduct,
} from "@/data/catalog";
import { fillKit, kitSlotIndex, kits } from "@/data/kits";
import { collections } from "@/data/products";
import { hobbies } from "@/data/hobbies";
import {
  buildListText,
  nextState,
  readShopList,
  sanitizeShopList,
  SHOPLIST_KEY,
} from "@/lib/shoplist";
import { cleanParams, track } from "@/lib/track";
import { ProductCard, ShopDisclosure } from "@/components/commerce/ProductCard";
import { ShopTheArticle } from "@/components/commerce/ShopTheArticle";
import { ShopMyHobby } from "@/components/commerce/ShopMyHobby";
import { StarterKit } from "@/components/commerce/StarterKit";
import { ArticleBody } from "@/components/editorial/ArticleBody";

// TEST FIXTURES ONLY. Invented for tests; they must never appear in the shipped catalog.
const base: CatalogProduct = {
  id: "test-fixture-washi",
  name: "TEST FIXTURE washi tape set",
  brand: "Test Brand",
  category: "Washi tape",
  description: "A fixture used only in tests.",
  asin: "B0TESTFIX1",
  amazonUrl: "https://www.amazon.com/dp/B0TESTFIX1",
  specs: [{ label: "Width", value: "15 mm" }],
  hobbies: ["junk-journaling"],
  articles: ["test-article"],
  collections: ["creative-girl"],
  kitSlots: [{ kit: "junk-journaling", slot: "washi-tape" }],
  role: "affordable",
  isEssential: true,
  audience: "Beginners",
  whySelected: "Fixture reason.",
  limitations: ["Fixture limitation."],
  researchSources: ["https://example.com/source"],
  lastVerified: "2026-01-01",
  availability: "available",
  affiliateStatus: "not-activated",
  status: "verified",
};
const second: CatalogProduct = {
  ...base,
  id: "test-fixture-pens",
  name: "TEST FIXTURE pens",
  asin: "B0TESTFIX2",
  amazonUrl: "https://www.amazon.com/dp/B0TESTFIX2",
  kitSlots: [{ kit: "junk-journaling", slot: "pens" }],
  role: "nice-to-have",
  isEssential: false,
};
const candidate: CatalogProduct = {
  ...base,
  id: "test-fixture-candidate",
  asin: "B0TESTFIX3",
  amazonUrl: "https://www.amazon.com/dp/B0TESTFIX3",
  status: "candidate",
};
const fixtures = [base, second, candidate];

const Wrap = ({ children }: { children: ReactNode }) => {
  const root = createRootRoute({ component: () => <>{children}</> });
  const router = createRouter({
    routeTree: root,
    history: createMemoryHistory({ initialEntries: ["/"] }),
  });
  return <RouterProvider router={router} />;
};
const show = async (ui: ReactNode) => {
  const r = render(<Wrap>{ui}</Wrap>);
  await act(async () => {});
  return r;
};

beforeEach(() => window.localStorage.clear());
afterEach(cleanup);

describe("catalog validation", () => {
  it("accepts a well-formed record", () => expect(validateCatalogProduct(base)).toEqual([]));
  it("rejects a bad ASIN", () => {
    expect(validateCatalogProduct({ ...base, asin: "B0123" }).join()).toMatch(/ASIN/);
    expect(validateCatalogProduct({ ...base, asin: "b0testfix1" }).join()).toMatch(/ASIN/);
  });
  it("rejects placeholder ASINs", () => {
    for (const asin of ["EXAMPLE000", "EXAMPLE0000", "0000000000", "XXXXXXXXXX", "B000000000"])
      expect(
        validateCatalogProduct({
          ...base,
          asin,
          amazonUrl: `https://www.amazon.com/dp/${asin}`,
        }).join(),
      ).toMatch(/ASIN/);
  });
  it("rejects amazonUrl that does not match the ASIN", () =>
    expect(
      validateCatalogProduct({ ...base, amazonUrl: "https://www.amazon.com/dp/B0OTHER123" }).join(),
    ).toMatch(/must equal/));
  it("rejects tracking parameters", () => {
    for (const q of ["?tag=me-20", "?utm_source=x", "?ref=abc", "/ref=sr_1_1"]) {
      expect(
        validateCatalogProduct({ ...base, amazonUrl: `${base.amazonUrl}${q}` }).length,
      ).toBeGreaterThan(0);
    }
    expect(
      validateCatalogProduct({
        ...base,
        manufacturerUrl: "https://example.com/?utm_medium=x",
      }).join(),
    ).toMatch(/tracking/);
  });
  it("keeps affiliateUrl empty until activated", () =>
    expect(
      validateCatalogProduct({ ...base, affiliateUrl: "https://x.example/aff" }).join(),
    ).toMatch(/affiliateUrl/));
  it("requires sources and lastVerified", () => {
    expect(validateCatalogProduct({ ...base, researchSources: [] }).join()).toMatch(
      /researchSources/,
    );
    expect(validateCatalogProduct({ ...base, lastVerified: "" }).join()).toMatch(/lastVerified/);
    expect(validateCatalogProduct({ ...base, lastVerified: "2999-01-01" }).join()).toMatch(
      /future/,
    );
  });
  it("rejects price, rating and review fields and price-like text", () => {
    for (const k of ["price", "rating", "reviewCount", "discount"])
      expect(validateCatalogProduct({ ...base, [k]: 1 }).join()).toMatch(/not allowed/);
    expect(validateCatalogProduct({ ...base, whySelected: "Only $9 today" }).join()).toMatch(
      /price/,
    );
    expect(validateCatalogProduct({ ...base, description: "Limited time deal" }).join()).toMatch(
      /price/,
    );
  });
  it("rejects example ids and essential-but-later roles", () => {
    expect(validateCatalogProduct({ ...base, id: "example-do-not-import" }).join()).toMatch(
      /example-/,
    );
    expect(validateCatalogProduct({ ...base, role: "later-upgrade" }).join()).toMatch(
      /isEssential/,
    );
  });
  it("every shipped product passes validation and is verified with an ordinary Amazon link", () => {
    expect(verifiedCatalog.length).toBeGreaterThan(0);
    for (const p of catalog) expect(validateCatalogProduct(p), p.id).toEqual([]);
    for (const p of verifiedCatalog) {
      expect(p.status, p.id).toBe("verified");
      expect(p.amazonUrl, p.id).toBe(`https://www.amazon.com/dp/${p.asin}`);
      expect(p.amazonUrl, p.id).not.toMatch(/[?#]/);
      expect(p.researchSources.length, p.id).toBeGreaterThan(0);
      expect(p.lastVerified, p.id).toBeTruthy();
    }
    expect(verifiedCatalog.some((p) => p.status !== "verified")).toBe(false);
    expect(catalog.some((p) => /^(test-fixture|example-)/.test(p.id))).toBe(false);
  });
  it("cross-references hobbies, collections and kit slots", () => {
    const known = {
      hobbies: hobbies.map((h) => h.slug),
      collections: collections.map((c) => c.slug),
      kits: kitSlotIndex(),
    };
    expect(catalogReferenceProblems(fixtures, known)).toEqual([]);
    expect(
      catalogReferenceProblems(
        [{ ...base, hobbies: ["nope"], kitSlots: [{ kit: "junk-journaling", slot: "x" }] }],
        known,
      ).length,
    ).toBe(2);
    expect(catalogReferenceProblems([base, base], known).join()).toMatch(/duplicate/);
  });
});

describe("unverified products never render", () => {
  it("filters candidates, invalid and unavailable records", () => {
    const bad = { ...base, id: "test-fixture-bad", asin: "nope" };
    const gone = {
      ...base,
      id: "test-fixture-gone",
      asin: "B0TESTFIX4",
      amazonUrl: "https://www.amazon.com/dp/B0TESTFIX4",
      availability: "unavailable" as const,
    };
    expect(filterVerified([base, candidate, bad, gone]).map((p) => p.id)).toEqual([
      "test-fixture-washi",
    ]);
  });
  it("components render nothing for candidates only", async () => {
    const { container } = await show(
      <>
        <ShopTheArticle article="test-article" catalog={filterVerified([candidate])} />
        <ShopMyHobby hobby="junk-journaling" catalog={filterVerified([candidate])} />
      </>,
    );
    expect(container.textContent).toBe("");
  });
  it("shows verified, hides candidate in the same context", async () => {
    await show(<ShopTheArticle article="test-article" catalog={filterVerified(fixtures)} />);
    expect(screen.queryByText(/washi tape set/)).not.toBeNull();
    expect(document.body.textContent).not.toMatch(/test-fixture-candidate/);
    expect(document.querySelectorAll("[data-product-id]").length).toBe(2);
  });
});

describe("selection", () => {
  it("separates essentials from optional and never duplicates", () => {
    const dupAsin = { ...second, id: "test-fixture-dup", articles: ["test-article"] }; // same ASIN as `second`
    const sel = selectProducts(
      { article: "test-article", hobby: "junk-journaling", collection: "creative-girl" },
      [base, second, dupAsin, base],
    );
    expect(sel.essentials.map((p) => p.id)).toEqual(["test-fixture-washi"]);
    expect(sel.optional.map((p) => p.id)).toEqual(["test-fixture-pens"]);
    expect(sel.all).toHaveLength(2);
  });
  it("renders the single best buy, then essentials, then optional extras", async () => {
    await show(
      <ShopTheArticle
        article="test-article"
        catalog={fixtures.filter((p) => p.status === "verified")}
      />,
    );
    const heads = [...document.querySelectorAll("h4")].map((h) => h.textContent);
    expect(heads).toEqual(["If you only buy one thing", "Optional extras"]);
  });
});

describe("card content", () => {
  it("has a role label, one benefit line and one ordinary Amazon button, with no per-card disclaimers", async () => {
    await show(
      <ProductCard
        product={{
          ...base,
          benefit: "Pastel rolls in three widths.",
          availability: "check-listing",
          limitations: ["Sold by a third-party seller", "Confirm before buying"],
        }}
        placement="test"
      />,
    );
    const text = document.body.textContent ?? "";
    expect(text).toContain("Essential");
    expect(text).toContain("Pastel rolls in three widths.");
    expect(screen.getAllByText(/View on Amazon/)).toHaveLength(1);
    expect(text).not.toMatch(
      /Worth knowing|third-party|Sold by|Available on Amazon|confirm|Details checked/i,
    );
    expect(text).not.toMatch(/\$|price|rating|review/i);
  });
  it("labels extras as optional and offers a single list icon, no checkboxes", async () => {
    await show(<ProductCard product={second} placement="test" />);
    expect(document.body.textContent).toContain("Optional extra");
    expect(document.querySelectorAll("input[type=checkbox]")).toHaveLength(0);
    expect(document.body.textContent).not.toMatch(/I need this|I already own|Save for later/);
    expect(screen.getAllByRole("button", { name: /Add to my shopping list/ })).toHaveLength(1);
  });
  it("shows a photo only when rights and a credit are recorded", async () => {
    const photo = {
      imageUrl: "/images/products/test.jpg",
      imageCredit: "Photo: Test Brand press kit",
      imageSource: "https://example.com/press-terms",
    };
    const { unmount } = await show(
      <ProductCard product={{ ...base, ...photo, imageRights: "licensed" }} placement="test" />,
    );
    expect(document.querySelector("img")?.getAttribute("src")).toBe("/images/products/test.jpg");
    expect(document.body.textContent).toContain("Photo: Test Brand press kit");
    unmount();
    await show(
      <ProductCard product={{ ...base, ...photo, imageRights: "none" }} placement="test" />,
    );
    expect(document.querySelector("img")).toBeNull();
    expect(document.querySelector("[data-product-tile]")).not.toBeNull();
  });
  it("validates photo fields", () => {
    const v = (o: object) => validateCatalogProduct({ ...base, ...o }).join("\n");
    expect(v({ imageUrl: "/x.jpg" })).toMatch(/needs documented imageRights/);
    expect(
      v({ imageUrl: "/x.jpg", imageRights: "licensed", imageSource: "https://a.example/t" }),
    ).toMatch(/needs an imageCredit/);
    expect(
      v({
        imageUrl: "https://m.media-amazon.com/images/I/x.jpg",
        imageRights: "licensed",
        imageSource: "https://a.example/t",
        imageCredit: "x",
      }),
    ).toMatch(/must not point at Amazon/);
    expect(
      v({
        imageUrl: "/x.jpg",
        imageRights: "owned",
        imageSource: "own photo",
        imageCredit: "Photo: us",
      }),
    ).toBe("");
    expect(v({ benefit: "Only $9 today" })).toMatch(/price/);
    expect(v({ hold: "" })).toMatch(/hold needs a reason/);
  });
  it("keeps held products off the site", () => {
    expect(filterVerified([base, { ...second, hold: "Kid-marketed" }]).map((p) => p.id)).toEqual([
      "test-fixture-washi",
    ]);
  });
  it("every shipped, displayed product has a benefit line and a short name", () => {
    for (const p of verifiedCatalog) {
      expect(p.benefit, p.id).toBeTruthy();
      expect(p.shortName, p.id).toBeTruthy();
      expect(p.benefit!.length, p.id).toBeLessThanOrEqual(140);
    }
  });
});

describe("alternatives for one kit slot", () => {
  const mk = (id: string, n: number, over: Partial<CatalogProduct> = {}): CatalogProduct => ({
    ...base,
    id,
    name: `TEST FIXTURE ${id}`,
    asin: `B0ALT000${n}`,
    amazonUrl: `https://www.amazon.com/dp/B0ALT000${n}`,
    kitSlots: [{ kit: "mahjong-night", slot: "set" }],
    articles: ["alt-article"],
    ...over,
  });
  const a1 = mk("alt-one", 1, { role: "complete-kit" });
  const a2 = mk("alt-two", 2, { role: "researched-pick" });
  const a3 = mk("alt-three", 3, { role: "complete-kit" });
  const loose = mk("alt-loose", 4, { kitSlots: [], role: "essential" });
  const looseOptional = mk("alt-loose-opt", 5, {
    kitSlots: [],
    role: "nice-to-have",
    isEssential: false,
  });

  it("makes the researched pick the primary and the rest alternatives", () => {
    const sel = selectProducts({ article: "alt-article" }, [a1, a2, a3, loose, looseOptional]);
    expect(sel.essentials.map((p) => p.id).sort()).toEqual(["alt-loose", "alt-two"]);
    expect(sel.alternatives.map((p) => p.id).sort()).toEqual(["alt-one", "alt-three"]);
    expect(sel.optional.map((p) => p.id)).toEqual(["alt-loose-opt"]);
    expect(sel.all).toHaveLength(5);
  });
  it("falls back to the first in list order without a researched pick", () => {
    const sel = selectProducts({ article: "alt-article" }, [
      { ...a1, role: "complete-kit" },
      { ...a3, role: "complete-kit" },
    ]);
    expect(sel.essentials.map((p) => p.id)).toEqual(["alt-one"]);
    expect(sel.alternatives.map((p) => p.id)).toEqual(["alt-three"]);
  });
  it("products with no kit slot keep their own isEssential", () => {
    const sel = selectProducts({ article: "alt-article" }, [loose, looseOptional]);
    expect(sel.essentials).toHaveLength(1);
    expect(sel.optional).toHaveLength(1);
    expect(sel.alternatives).toHaveLength(0);
  });
  it("folds alternatives under the pick, with a comparison line, instead of separate cards", async () => {
    await show(
      <ShopTheArticle
        article="alt-article"
        catalog={[
          a1,
          { ...a2, compare: "Cheaper, fewer extras." },
          { ...a3, compare: "Bigger tiles." },
        ]}
      />,
    );
    const cards = [...document.querySelectorAll("article[data-product-id]")];
    expect(cards.map((c) => c.getAttribute("data-product-id"))).toEqual(["alt-two"]);
    const rows = [...document.querySelectorAll("li[data-product-id]")];
    expect(rows.map((c) => c.getAttribute("data-product-id")).sort()).toEqual([
      "alt-one",
      "alt-three",
    ]);
    expect(document.body.textContent).toContain("Also consider");
    expect(document.body.textContent).toContain("Bigger tiles.");
    expect(document.body.textContent).not.toMatch(/Another option for this slot/);
  });
  it("shows at most two alternatives per slot", () => {
    const extra = [4, 5, 6].map((n) => mk(`alt-x${n}`, n + 10, { role: "complete-kit" }));
    const sel = selectProducts({ article: "alt-article" }, [a1, a2, a3, ...extra]);
    expect(sel.alternatives).toHaveLength(2);
    expect(sel.all).toHaveLength(3);
    expect(sel.alternativesOf["alt-two"]).toHaveLength(2);
  });
  it("a lead product is the primary and beats a researched pick", () => {
    const sel = selectProducts({ article: "alt-article" }, [a2, { ...a1, lead: true }, a3]);
    expect(sel.essentials.map((p) => p.id)).toEqual(["alt-one"]);
  });
  it("the single best buy is the flagged product, else a complete kit, else the first essential", () => {
    const sel = selectProducts({ article: "alt-article" }, [
      a1,
      { ...a2, onlyOne: true },
      loose,
      { ...a3, onlyOne: true },
    ]);
    expect(sel.pick?.id).toBe("alt-two"); // a3 is an alternative, so it cannot be the pick
    expect(selectProducts({ article: "alt-article" }, [a1, loose]).pick?.id).toBe("alt-one");
    const sel2 = selectProducts({ article: "alt-article" }, [{ ...loose, onlyOne: true }, a2]);
    expect(sel2.pick?.id).toBe("alt-loose");
  });
  it("add-all-essentials saves only the primary per slot", async () => {
    await show(
      <ShopMyHobby
        hobby="junk-journaling"
        catalog={[a1, a2, a3].map((p) => ({ ...p, hobbies: ["junk-journaling"] }))}
      />,
    );
    await act(async () => {
      fireEvent.click(screen.getByText("Add all essentials"));
    });
    const stored = readShopList();
    expect(Object.keys(stored)).toEqual(["alt-two"]);
  });
});

describe("kits", () => {
  it("defines all 15 kits with unique slot ids", () => {
    expect(kits.map((k) => k.id)).toEqual([
      "junk-journaling",
      "watercolor",
      "air-dry-clay",
      "embroidery",
      "crochet",
      "reading-journal",
      "girls-craft-night",
      "mahjong-night",
      "book-club",
      "paint-night",
      "picnic-adventure",
      "flower-arranging",
      "pickleball",
      "tennis",
      "cozy-night-in",
    ]);
    for (const k of kits) {
      expect(new Set(k.slots.map((s) => s.id)).size).toBe(k.slots.length);
      if (k.hobby) expect(hobbies.some((h) => h.slug === k.hobby)).toBe(true);
    }
  });
  it("fills only slots with verified products", () => {
    const kit = kits.find((k) => k.id === "junk-journaling")!;
    expect(fillKit(kit, []).length).toBe(0);
    expect(fillKit(kit, filterVerified(fixtures)).map((f) => f.slot.id)).toEqual([
      "washi-tape",
      "pens",
    ]);
    expect(fillKit(kit, filterVerified([candidate]))).toEqual([]);
  });
  it("renders nothing for an empty kit and a disclaimer for a filled one", async () => {
    const { container, unmount } = await show(<StarterKit kit="junk-journaling" catalog={[]} />);
    expect(container.textContent).toBe("");
    unmount();
    await show(<StarterKit kit="junk-journaling" catalog={filterVerified(fixtures)} />);
    expect(document.body.textContent).toMatch(/not a bundle we sell/);
  });
});

describe("shopping list", () => {
  it("sanitizes corrupt storage", () => {
    expect(sanitizeShopList(null)).toEqual({});
    expect(sanitizeShopList({ items: { a: "need", b: "nope", c: 3 } })).toEqual({ a: "need" });
    window.localStorage.setItem(SHOPLIST_KEY, "{not json");
    expect(readShopList()).toEqual({});
  });
  it("toggles statuses", () => {
    let s = nextState({}, "a", "need");
    expect(s).toEqual({ a: "need" });
    s = nextState(s, "a", "own");
    expect(s).toEqual({ a: "own" });
    expect(nextState(s, "a", "own")).toEqual({});
  });
  it("round-trips through the UI and localStorage", async () => {
    const cat = filterVerified(fixtures);
    const { unmount } = await show(<ShopMyHobby hobby="junk-journaling" catalog={cat} />);
    fireEvent.click(screen.getAllByLabelText(/^Add to my shopping list: TEST FIXTURE washi/)[0]!);
    await act(async () => {});
    expect(JSON.parse(window.localStorage.getItem(SHOPLIST_KEY)!)).toEqual({
      v: 1,
      items: { "test-fixture-washi": "need" },
    });
    unmount();
    await show(<ShopMyHobby hobby="junk-journaling" catalog={cat} />);
    const saved = screen.getAllByLabelText(/^On my shopping list: TEST FIXTURE washi/)[0]!;
    expect(saved.getAttribute("aria-pressed")).toBe("true");
    fireEvent.click(saved);
    await act(async () => {});
    expect(readShopList()).toEqual({});
  });
  it("copy text has names and ordinary URLs only for ticked items", () => {
    const text = buildListText(
      [base, second],
      { [base.id]: "need", [second.id]: "own" },
      "2026-02-03",
      "Test list",
    );
    expect(text).toContain("Test list (Plans Past Five)");
    expect(text).toContain("[ ] TEST FIXTURE washi tape set (Test Brand)");
    expect(text).toContain("Amazon: https://www.amazon.com/dp/B0TESTFIX1");
    expect(text).not.toContain("B0TESTFIX2");
    expect(text).toContain("Already own: TEST FIXTURE pens");
    expect(text).not.toMatch(/tag=|utm_/);
    expect(text).not.toMatch(/sponsored|earn from/i);
  });
});

describe("print view and list extras", () => {
  it("lists saved-for-later items in the copied text", () => {
    const text = buildListText(
      [base, second],
      { [base.id]: "need", [second.id]: "later" },
      "2026-02-03",
    );
    expect(text).toContain("Saved for later: TEST FIXTURE pens");
  });
  it("portals the print list to <body> so printing leaves no blank pages", async () => {
    const cat = filterVerified(fixtures);
    window.localStorage.setItem(
      SHOPLIST_KEY,
      JSON.stringify({ v: 1, items: { "test-fixture-washi": "need" } }),
    );
    window.print = vi.fn();
    await show(<ShopMyHobby hobby="junk-journaling" catalog={cat} today="2026-02-03" />);
    const area = document.body.querySelector(":scope > .shop-print-area");
    expect(area).not.toBeNull();
    expect(area!.textContent).toContain("TEST FIXTURE washi tape set");
    expect(area!.textContent).toContain("https://www.amazon.com/dp/B0TESTFIX1");
    expect(area!.textContent).not.toMatch(/tag=/);
    fireEvent.click(screen.getByRole("button", { name: /Print list/ }));
    expect(document.body.getAttribute("data-print-shop")).toBe(area!.getAttribute("data-print-id"));
    expect(window.print).toHaveBeenCalled();
    window.dispatchEvent(new Event("afterprint"));
    expect(document.body.hasAttribute("data-print-shop")).toBe(false);
    window.localStorage.removeItem(SHOPLIST_KEY);
  });
  it("lets long product names wrap instead of overflowing the card", async () => {
    await show(
      <ProductCard
        product={{ ...base, name: "TEST FIXTURE " + "extraordinarily".repeat(6) }}
        placement="test"
      />,
    );
    expect(document.querySelector("article")!.className).toMatch(/min-w-0.*overflow-wrap:anywhere/);
  });
});

describe("empty-catalog parity", () => {
  // Build the empty list explicitly instead of relying on the shipped file: empty the live
  // verified list for these tests only, then restore it.
  let saved: typeof verifiedCatalog = [];
  beforeEach(() => {
    saved = verifiedCatalog.splice(0, verifiedCatalog.length);
  });
  afterEach(() => {
    verifiedCatalog.splice(0, verifiedCatalog.length, ...saved);
  });
  it("shop blocks render nothing and legacy blocks fall back to type cards", async () => {
    const { container } = await show(
      <ArticleBody
        blocks={[
          { type: "shopTheArticle", articleSlug: "x", hobbies: ["junk-journaling"] },
          { type: "shopMyHobby", hobby: "junk-journaling" },
          { type: "shopHobby", productIds: ["air-dry-clay"], title: "Legacy title" },
        ]}
      />,
    );
    expect(container.textContent).toContain("Legacy title");
    expect(container.textContent).toContain("Air-dry clay");
    expect(container.textContent).not.toMatch(/Shopping checklist|Shop this guide/);
    expect(container.querySelector("a[href*='amazon.com/s']")).not.toBeNull();
    expect(container.querySelectorAll("input[type=checkbox]").length).toBe(0);
  });
  it("inline product mentions stay plain text when unverified", async () => {
    const { container } = await show(
      <ArticleBody blocks={[{ type: "p", text: "Try {{product:nope|this tape}} today." }]} />,
    );
    expect(container.textContent).toBe("Try this tape today.");
    expect(container.querySelector("a")).toBeNull();
  });
});

describe("links and affiliate swap", () => {
  const amazon = affiliateRegistry["amazon"]!;
  const snap = { ...amazon };
  afterEach(() => Object.assign(amazon, snap));

  it("links are ordinary and not sponsored today", async () => {
    await show(
      <>
        <ProductCard product={base} placement="test" />
        <ShopDisclosure />
      </>,
    );
    const a = screen.getByText(/View on Amazon/).closest("a")!;
    expect(a.getAttribute("href")).toBe("https://www.amazon.com/dp/B0TESTFIX1");
    expect(a.getAttribute("rel")).toBe("noopener");
    expect(document.body.textContent).not.toMatch(/Sold by Amazon/);
    expect(document.body.textContent).toMatch(/don't currently earn/);
    expect(document.body.textContent).toMatch(/own Amazon page/);
    expect(document.body.textContent).not.toMatch(/As an Amazon Associate/);
  });
  it("activating the registry changes link, rel and disclosure with no component change", async () => {
    Object.assign(amazon, {
      websiteTrackingId: "demo-20",
      approvalStatus: "approved",
      active: true,
      lastVerified: "2026-01-01",
    });
    expect(resolveProductLink(linkableFor(base)).sponsored).toBe(true);
    await show(<ProductCard product={base} placement="test" />);
    const a = screen.getByText(/View on Amazon/).closest("a")!;
    expect(a.getAttribute("href")).toBe("https://www.amazon.com/dp/B0TESTFIX1?tag=demo-20");
    expect(a.getAttribute("rel")).toBe("sponsored noopener");
    expect(buildListText([base], { [base.id]: "need" }, "2026-02-03")).toMatch(/Associate/);
  });
});

describe("tracking", () => {
  const original = site.integrations.googleAnalyticsId;
  afterEach(() => {
    (site.integrations as { googleAnalyticsId: string }).googleAnalyticsId = original;
    delete (window as unknown as { gtag?: unknown }).gtag;
  });
  it("is a no-op by default", () => {
    const g = vi.fn();
    (window as unknown as { gtag: unknown }).gtag = g;
    track("product_click", { product_id: "x" });
    expect(g).not.toHaveBeenCalled();
  });
  it("fires only with an id, and strips non-allow-listed or personal data", () => {
    const g = vi.fn();
    (window as unknown as { gtag: unknown }).gtag = g;
    (site.integrations as { googleAnalyticsId: string }).googleAnalyticsId = "G-TEST";
    track("product_click", { product_id: "x", email: "a@b.com", placement: "a@b.com" } as never);
    expect(g).toHaveBeenCalledWith("event", "product_click", { product_id: "x" });
    expect(cleanParams({ query: "my name", count: 2 })).toEqual({ count: 2 });
  });
});

describe("legacy blocks use the catalog strictly", () => {
  const legacy = (hobby: string): CatalogProduct[] => [
    {
      ...base,
      id: "leg-a",
      asin: "B0LEG0001A",
      amazonUrl: "https://www.amazon.com/dp/B0LEG0001A",
      hobbies: [hobby],
      articles: ["elsewhere"],
      kitSlots: [],
    },
  ];
  it("does not pull a many-product hobby into an untagged article", async () => {
    // junk-journaling has far more than 4 verified products and none are tagged to this slug
    const { container } = await show(
      <ArticleBody
        articleSlug="some-other-article"
        blocks={[{ type: "shopHobby", productIds: ["washi-tape"], title: "Legacy title" }]}
      />,
    );
    expect(container.textContent).toContain("Legacy title");
    expect(container.querySelectorAll("[data-product-id]").length).toBe(0);
    expect(container.querySelector("a[href*='amazon.com/s']")).not.toBeNull();
    expect(legacy("x")).toHaveLength(1);
  });
  it("uses catalog products tagged to this article slug", async () => {
    const { container } = await show(
      <ArticleBody
        articleSlug="how-to-host-a-mahjong-night"
        blocks={[{ type: "shopHobby", productIds: ["air-dry-clay"] }]}
      />,
    );
    expect(container.querySelectorAll("[data-product-id]").length).toBeGreaterThan(0);
  });
  it("never repeats a product across blocks on one page", async () => {
    const { container } = await show(
      <ArticleBody
        articleSlug="how-to-host-a-mahjong-night"
        blocks={[
          { type: "shopTheArticle", articleSlug: "how-to-host-a-mahjong-night" },
          { type: "shopHobby", productIds: ["air-dry-clay"] },
        ]}
      />,
    );
    const ids = [...container.querySelectorAll("[data-product-id]")].map((e) =>
      e.getAttribute("data-product-id"),
    );
    expect(new Set(ids).size).toBe(ids.length);
    expect(container.querySelectorAll("aside").length).toBe(2);
  });
});
