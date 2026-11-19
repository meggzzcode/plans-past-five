import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { getCollection } from "@/data/products";
import {
  selectProducts,
  verifiedCatalog,
  type CatalogProduct,
  type ProductContext,
  type Selection,
} from "@/data/catalog";
import { track } from "@/lib/track";
import { ShopDisclosure } from "./ProductCard";
import { ShopSections, type ShopGroup, type ShopItem } from "./ShopSections";

/** Selection -> the shared layout: pick on top, then the remaining essentials and optional extras. */
export function groupsFor(sel: Selection): { pick: ShopItem | undefined; groups: ShopGroup[] } {
  const withAlts = (p: CatalogProduct): ShopItem => ({
    product: p,
    alternatives: sel.alternativesOf[p.id],
  });
  const pick = sel.pick ? withAlts(sel.pick) : undefined;
  const rest = (xs: CatalogProduct[]) => xs.filter((p) => p.id !== sel.pick?.id).map(withAlts);
  return {
    pick,
    groups: [
      { heading: "Start with these", items: rest(sel.essentials) },
      { heading: "Optional extras", quiet: true, items: rest(sel.optional) },
    ],
  };
}

/**
 * "Shop the article": the one best buy first, essentials, optional extras, and at most two
 * alternatives per product. Renders nothing when there are no verified products for the context.
 */
export function ShopTheArticle({
  title = "Shop this guide",
  dek,
  catalog = verifiedCatalog,
  collection,
  ...ctx
}: ProductContext & {
  title?: string;
  dek?: string;
  collection?: string;
  catalog?: CatalogProduct[];
}) {
  const sel = selectProducts({ ...ctx, ...(collection ? { collection } : {}) }, catalog);
  const key = `${ctx.article ?? ""}|${ctx.hobby ?? ""}|${collection ?? ""}`;
  const empty = sel.all.length === 0;
  useEffect(() => {
    if (!empty)
      track("shop_article_interaction", {
        action: "view",
        count: sel.all.length,
        ...(ctx.article ? { article: ctx.article } : {}),
        ...(ctx.hobby ? { hobby: ctx.hobby } : {}),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, empty]);
  if (empty) return null;

  const coll = getCollection(collection ?? sel.all.flatMap((p) => p.collections)[0] ?? "");
  const { pick, groups } = groupsFor(sel);
  return (
    <aside className="not-prose my-12 border-y-2 border-ink py-8" aria-labelledby={`shop-${key}`}>
      <p className="kicker text-cherry">Shop Your Hobby</p>
      <h3 id={`shop-${key}`} className="mt-2 font-display text-3xl italic">
        {title}
      </h3>
      <p className="mt-2 text-muted-foreground">
        {dek ?? "A few named products, picked with the reason for each. Skip anything you own."}
      </p>
      <ShopSections pick={pick} groups={groups} placement="article" />
      {coll && (
        <p className="mt-6 text-sm">
          More in{" "}
          <Link to="/shop/$category" params={{ category: coll.slug }} className="font-semibold">
            {coll.name}
          </Link>
        </p>
      )}
      <ShopDisclosure className="mt-4" />
    </aside>
  );
}
