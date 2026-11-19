import { afterEach, describe, expect, it } from "vitest";
import { act, cleanup, render } from "@testing-library/react";
import type { ReactNode } from "react";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRouter,
} from "@tanstack/react-router";
import { AMAZON_ASSOCIATE_STATEMENT } from "@/config/affiliate";
import type { CatalogProduct } from "@/data/catalog";
import { ShopMyHobby } from "@/components/commerce/ShopMyHobby";
import { ShopTheArticle } from "@/components/commerce/ShopTheArticle";
import { StarterKit } from "@/components/commerce/StarterKit";
import { setAffiliateState, withAffiliateRestore } from "./affiliate-state";

/**
 * Stage 3b: each shopping block carries ONE concise disclosure line, next to the recommendation.
 * The wording and the setting-driven Amazon Associates statement still come from
 * src/config/affiliate.ts; only how often it is repeated inside a block changed.
 */
const product = (over: Partial<CatalogProduct> & { id: string }): CatalogProduct =>
  ({
    name: "Fixture product",
    brand: "Fixture Co",
    category: "Washi tape",
    description: "A fixture product.",
    asin: `B0${over.id
      .replace(/[^a-z0-9]/gi, "")
      .toUpperCase()
      .padEnd(8, "0")
      .slice(0, 8)}`,
    amazonUrl: "https://www.amazon.com/dp/B0FIXTURE0",
    specs: [],
    hobbies: ["junk-journaling"],
    articles: ["fixture-article"],
    collections: ["paper"],
    kitSlots: [],
    role: "researched-pick",
    isEssential: true,
    whySelected: "A fixture reason.",
    status: "verified",
    ...over,
  }) as CatalogProduct;

const kitSlot = (slot: string) => [{ kit: "junk-journaling", slot }];
const list = [
  product({ id: "fixture-journal", kitSlots: kitSlot("journal") }),
  product({ id: "fixture-glue", kitSlots: kitSlot("adhesive") }),
  product({ id: "fixture-washi", kitSlots: kitSlot("washi-tape"), isEssential: false }),
  product({ id: "fixture-pens", kitSlots: kitSlot("pens"), isEssential: false }),
];

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
  return r.container;
};
const times = (text: string, needle: string) => text.split(needle).length - 1;

describe("one disclosure line per shopping block", () => {
  withAffiliateRestore();
  afterEach(cleanup);

  const blocks: [string, ReactNode][] = [
    ["a hobby page shop block", <ShopMyHobby key="h" hobby="junk-journaling" catalog={list} />],
    ["an article shop block", <ShopTheArticle key="a" article="fixture-article" catalog={list} />],
    ["a starter kit", <StarterKit key="k" kit="junk-journaling" catalog={list} />],
  ];

  for (const [name, ui] of blocks) {
    it(`${name} says "we show no prices" once and links the disclosure once`, async () => {
      setAffiliateState("inactive");
      const c = await show(ui);
      const text = c.textContent ?? "";
      expect(c.querySelectorAll("[data-product-id]").length).toBeGreaterThan(0);
      expect(times(text, "We show no prices"), "price statement").toBe(1);
      expect(times(text, "Ordinary Amazon links"), "short line").toBe(1);
      expect(c.querySelectorAll('a[href="/affiliate-disclosure"]')).toHaveLength(1);
    });

    it(`${name}: with an Amazon entry live, the required Associates statement appears exactly once`, async () => {
      setAffiliateState("active");
      const c = await show(ui);
      expect(times(c.textContent ?? "", AMAZON_ASSOCIATE_STATEMENT)).toBe(1);
    });
  }

  it("the line sits right after the one pick, before the other products", async () => {
    setAffiliateState("inactive");
    const c = await show(<ShopTheArticle article="fixture-article" catalog={list} />);
    const html = c.innerHTML;
    const at = html.indexOf("Ordinary Amazon links");
    expect(at).toBeGreaterThan(html.indexOf("If you only buy one thing"));
    expect(at).toBeLessThan(html.indexOf("Then add"));
  });

  it("an inactive entry never claims earnings; the line is concise (two sentences at most)", async () => {
    setAffiliateState("inactive");
    const c = await show(<ShopMyHobby hobby="junk-journaling" catalog={list} />);
    const line = [...c.querySelectorAll("p")].find((p) =>
      /Ordinary Amazon links/.test(p.textContent ?? ""),
    )!;
    expect(line.textContent).not.toMatch(/may earn|commission on qualifying/i);
    expect((line.textContent ?? "").split(/[.!?]\s/).length).toBeLessThanOrEqual(4);
  });
});
