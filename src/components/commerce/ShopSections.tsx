import type { ReactNode } from "react";
import type { CatalogProduct } from "@/data/catalog";
import { ProductCard } from "./ProductCard";

export type ShopItem = {
  product: CatalogProduct;
  /** Other products for the same need, at most two. */
  alternatives?: CatalogProduct[] | undefined;
  /** Overrides the role label on the card (kit slots). */
  label?: string;
  /** Small handwritten line above the card (the kit slot's name). */
  caption?: string;
};

export type ShopGroup = {
  heading: string;
  /** Visually quieter heading for extras. */
  quiet?: boolean;
  items: ShopItem[];
};

/**
 * The shared layout of every shopping block: the single best buy first, essentials, then extras
 * for later, each product with at most two alternatives folded under it. One short honest note (never
 * a per-card disclaimer) sits under the intro.
 */
export function ShopSections({
  pick,
  groups,
  placement,
  note,
  afterPick,
  alsoNeed,
  cardClassName,
}: {
  pick?: ShopItem | undefined;
  groups: ShopGroup[];
  placement: string;
  note?: ReactNode;
  /** Shown right under the one pick, next to the first button (the short disclosure). */
  afterPick?: ReactNode;
  /** Other essentials the list needs, named under the one pick. */
  alsoNeed?: string[];
  cardClassName?: string;
}) {
  return (
    <>
      {note && <p className="mt-3 max-w-prose text-sm text-espresso">{note}</p>}
      {pick && (
        <section className="mt-6" aria-label="If you only buy one thing">
          <h4 className="font-display text-xl italic text-cherry">
            {alsoNeed && alsoNeed.length > 0
              ? "Your one pick to start"
              : "If you only buy one thing, buy this"}
          </h4>
          <div className="mt-3">
            <ProductCard
              featured
              product={pick.product}
              placement={`${placement}-pick`}
              alternatives={pick.alternatives}
              {...(alsoNeed ? { alsoNeed } : {})}
              {...(pick.label ? { label: pick.label } : {})}
              className={cardClassName}
            />
          </div>
        </section>
      )}
      {afterPick}
      {groups
        .filter((g) => g.items.length > 0)
        .map((g) => (
          <section key={g.heading} className="mt-8" aria-label={g.heading}>
            <h4 className={g.quiet ? "font-display text-xl italic" : "font-display text-xl"}>
              {g.heading}
            </h4>
            <div className="mt-4 grid gap-8 sm:grid-cols-2">
              {g.items.map((it) => (
                <div key={it.product.id} className="min-w-0">
                  {it.caption && <p className="hand mb-1 text-lg text-cherry">{it.caption}</p>}
                  <ProductCard
                    product={it.product}
                    placement={placement}
                    alternatives={it.alternatives}
                    {...(it.label ? { label: it.label } : {})}
                    className={cardClassName}
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
    </>
  );
}
