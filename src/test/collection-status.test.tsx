import { afterEach, describe, expect, it } from "vitest";
import { act, cleanup, render } from "@testing-library/react";
import type { ReactNode } from "react";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRouter,
  isNotFound,
} from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen";
import { Route as CollectionRoute } from "@/routes/shop.$category";
import type { CatalogProduct } from "@/data/catalog";
import {
  MIN_SHOWN_PRODUCTS,
  collectionProducts,
  collectionStatus,
  isCollectionLive,
  liveCollections,
} from "@/data/collection-status";
import { collections } from "@/data/products";
import { verifiedCatalog } from "@/data/catalog";
import { sitemapPaths } from "@/lib/sitemap";
import { search } from "@/lib/search";
import { guidesFor } from "@/lib/planner";
import { StarterKit } from "@/components/commerce/StarterKit";
import { ShopTheArticle } from "@/components/commerce/ShopTheArticle";
import { setAffiliateState, withAffiliateRestore } from "./affiliate-state";

/** A shown product, as the build would ship it. Only the fields the rule reads matter. */
const product = (over: Partial<CatalogProduct> & { id: string }): CatalogProduct =>
  ({
    name: "Fixture product",
    brand: "Fixture Co",
    category: "Fixture",
    description: "A fixture.",
    asin: `B0${over.id
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .padEnd(8, "0")
      .slice(0, 8)}`,
    amazonUrl: "https://www.amazon.com/dp/B0FIXTURE0",
    specs: [],
    hobbies: [],
    articles: [],
    collections: [],
    kitSlots: [],
    role: "researched-pick",
    isEssential: true,
    ...over,
  }) as CatalogProduct;

describe("a collection is shown only when it has something to show", () => {
  it("is not live with no products, and goes live by itself when one shown product is tagged", () => {
    expect(isCollectionLive("sporty", [])).toBe(false);
    expect(collectionStatus("sporty", []).products).toBe(0);
    const one = product({ id: "fixture-racquet", collections: ["sporty"], hobbies: ["tennis"] });
    expect(MIN_SHOWN_PRODUCTS).toBe(1);
    expect(isCollectionLive("sporty", [one])).toBe(true);
    expect(collectionProducts("sporty", [one])).toHaveLength(1);
  });

  it("a product tagged for another collection does not make this one live", () => {
    const other = product({ id: "fixture-other", collections: ["paper"] });
    expect(isCollectionLive("sporty", [other])).toBe(false);
    expect(isCollectionLive("paper", [other])).toBe(true);
  });

  it("a complete kit alone makes a collection live (even without tagged products)", () => {
    // junk-journaling kit: journal and adhesive essentials plus enough extras to reach MIN_KIT_PICKS.
    const slot = (slot: string) => [{ kit: "junk-journaling", slot }];
    const kitProducts = [
      product({ id: "fixture-journal", kitSlots: slot("journal") }),
      product({ id: "fixture-glue", kitSlots: slot("adhesive") }),
      product({ id: "fixture-washi", kitSlots: slot("washi-tape"), isEssential: false }),
      product({ id: "fixture-pens", kitSlots: slot("pens"), isEssential: false }),
    ];
    expect(collectionProducts("paper", kitProducts)).toHaveLength(0);
    expect(collectionStatus("paper", kitProducts).completeKit).toBe(true);
    expect(isCollectionLive("paper", kitProducts)).toBe(true);
    // An incomplete kit (missing the adhesive essential) is not enough on its own.
    expect(
      isCollectionLive(
        "paper",
        kitProducts.filter((p) => p.id !== "fixture-glue"),
      ),
    ).toBe(false);
  });

  it("an unknown collection is never live", () => {
    expect(
      isCollectionLive("pottery-era", [product({ id: "x", collections: ["pottery-era"] })]),
    ).toBe(false);
  });

  it("liveCollections lists exactly the live ones, in the usual order", () => {
    const list = [
      product({ id: "fixture-a", collections: ["hosting"] }),
      product({ id: "fixture-b", collections: ["paper"] }),
    ];
    expect(liveCollections(list).map((c) => c.slug)).toEqual(["paper", "hosting"]);
    expect(liveCollections([])).toEqual([]);
  });
});

describe("today's data (nothing to toggle)", () => {
  const live = liveCollections().map((c) => c.slug);
  it("shows the collections that have verified products and hides the rest", () => {
    // Paper, Creative and Hosting have shown products today; Cozy, Sporty and Little Adventures have none.
    expect(live).toEqual(["paper", "creative", "hosting"]);
    for (const slug of ["cozy", "sporty", "little-adventures"])
      expect(collectionProducts(slug), slug).toHaveLength(0);
  });

  it("every collection is live or hidden for a reason the data shows", () => {
    for (const c of collections) {
      const s = collectionStatus(c.slug);
      expect(s.live, c.slug).toBe(s.products >= MIN_SHOWN_PRODUCTS || s.completeKit);
    }
  });

  it("hidden collections are absent from the sitemap and from search; live ones are listed", () => {
    const paths = sitemapPaths();
    const hits = search("edit").map((h) => h.to);
    for (const c of collections) {
      const isLive = live.includes(c.slug);
      expect(paths.includes(`/shop/${c.slug}`), `sitemap ${c.slug}`).toBe(isLive);
      if (!isLive) expect(hits, `search ${c.slug}`).not.toContain(`/shop/${c.slug}`);
    }
    expect(paths).toContain("/shop");
  });

  it("the planner offers 'Supplies to browse' only when the collection is live", () => {
    const supplies = (hobby: string) =>
      guidesFor({ hobby, vibes: [], who: [], parts: [] } as never).some((g) => g.kind === "shop");
    expect(supplies("junk-journaling")).toBe(true); // Paper is live
    expect(supplies("pickleball")).toBe(false); // Sporty is hidden
    expect(supplies("reading")).toBe(false); // Cozy is hidden
  });

  it("every shown product belongs to a collection that exists", () => {
    for (const p of verifiedCatalog)
      for (const c of p.collections)
        expect(
          collections.some((x) => x.slug === c),
          `${p.id} -> ${c}`,
        ).toBe(true);
  });
});

describe("collection pages", () => {
  const load = async (path: string) => {
    const router = createRouter({
      routeTree,
      history: createMemoryHistory({ initialEntries: [path] }),
    });
    await router.load();
    return router;
  };

  it("a live collection indexes normally", async () => {
    const router = await load("/shop/paper");
    const head = router.state.matches.at(-1)!.meta ?? [];
    expect(JSON.stringify(head)).not.toMatch(/noindex/);
    expect(router.state.matches.at(-1)!.loaderData).toMatchObject({ slug: "paper", live: true });
  });

  it("a collection with nothing to show loads as 'coming soon' and is noindex", async () => {
    const router = await load("/shop/sporty");
    const m = router.state.matches.at(-1)!;
    expect(m.loaderData).toMatchObject({ slug: "sporty", live: false });
    expect(JSON.stringify(m.meta)).toMatch(/noindex/);
    expect(JSON.stringify(m.meta)).toMatch(/coming soon/i);
  });

  it("an unknown collection is a 404, not a page", () => {
    const loader = (
      CollectionRoute.options as unknown as {
        loader: (a: { params: { category: string } }) => unknown;
      }
    ).loader;
    let thrown: unknown;
    try {
      loader({ params: { category: "not-a-collection" } });
    } catch (e) {
      thrown = e;
    }
    expect(isNotFound(thrown)).toBe(true);
  });
});

describe("links to a hidden collection are never shown", () => {
  withAffiliateRestore();
  afterEach(cleanup);
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

  it("'More in ...' under a kit or article block appears only for a live collection", async () => {
    setAffiliateState("inactive");
    const slot = [{ kit: "picnic", slot: "blanket" }];
    const picnic = [product({ id: "fixture-blanket", kitSlots: slot, collections: ["hosting"] })];
    // The picnic kit lives in Little Adventures, which has no product here: no link to it.
    const kit = await show(<StarterKit kit="picnic" catalog={picnic} />);
    expect(kit.innerHTML).not.toContain("/shop/little-adventures");
    cleanup();
    // An article block pointing at a collection that is live in the given list does link to it.
    const art = await show(<ShopTheArticle collection="hosting" catalog={picnic} />);
    expect(art.innerHTML).toContain("/shop/hosting");
    cleanup();
    // And one pointing at a collection that is not live names no link to it.
    const other = [product({ id: "fixture-pen", collections: ["paper"], articles: ["a"] })];
    const hidden = await show(<ShopTheArticle article="a" collection="sporty" catalog={other} />);
    expect(hidden.innerHTML).not.toContain("/shop/sporty");
  });
});
