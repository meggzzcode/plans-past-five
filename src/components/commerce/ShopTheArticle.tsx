import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { getCollection } from "@/data/products";
import {
  selectProducts,
  verifiedCatalog,
  type CatalogProduct,
  type ProductContext,
} from "@/data/catalog";
import { track } from "@/lib/track";
import { ProductCard, ShopDisclosure } from "./ProductCard";

/**
 * "Shop the article": essentials first, optional upgrades separately, no duplicates.
 * Renders nothing when there are no verified products for the context.
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
  return (
    <aside className="not-prose my-12 border-y-2 border-ink py-8" aria-labelledby={`shop-${key}`}>
      <p className="kicker text-cherry">Off Duty Essentials</p>
      <h3 id={`shop-${key}`} className="mt-2 font-display text-3xl italic">
        {title}
      </h3>
      <p className="mt-2 text-muted-foreground">
        {dek ??
          "Specific picks we researched, with the reason for each. Tick what you need, skip what you own."}
      </p>
      {sel.essentials.length > 0 && (
        <section className="mt-6" aria-label="Essentials">
          <h4 className="font-display text-xl">Start with these</h4>
          <div className="mt-4 grid gap-8 sm:grid-cols-2">
            {sel.essentials.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} placement="article-essential" />
            ))}
          </div>
        </section>
      )}
      {sel.optional.length > 0 && (
        <section className="mt-8" aria-label="Optional upgrades">
          <h4 className="font-display text-xl italic">Optional upgrades</h4>
          <div className="mt-4 grid gap-8 sm:grid-cols-2">
            {sel.optional.map((p) => (
              <ProductCard key={p.id} product={p} placement="article-optional" />
            ))}
          </div>
        </section>
      )}
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
