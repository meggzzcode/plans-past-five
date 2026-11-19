import { useEffect } from "react";
import { KIT_DISCLAIMER, fillKit, getKit, type Kit } from "@/data/kits";
import { verifiedCatalog, type CatalogProduct } from "@/data/catalog";
import { track } from "@/lib/track";
import { ProductCard, ShopDisclosure } from "./ProductCard";

const GROUPS = [
  { need: "essential", heading: "Essentials" },
  { need: "optional", heading: "Optional" },
  { need: "probably-own", heading: "You may already own these" },
] as const;

/**
 * A starter kit built from slots. A slot appears only when a verified product fills it, and a kit
 * with nothing filled renders nothing at all.
 */
export function StarterKit({
  kit: kitOrId,
  title,
  catalog = verifiedCatalog,
}: {
  kit: Kit | string;
  title?: string;
  catalog?: CatalogProduct[];
}) {
  const kit = typeof kitOrId === "string" ? getKit(kitOrId) : kitOrId;
  const filled = kit ? fillKit(kit, catalog) : [];
  const kitId = kit?.id;
  const n = filled.length;
  useEffect(() => {
    if (kitId && n > 0) track("kit_interaction", { kit: kitId, action: "view", count: n });
  }, [kitId, n]);
  if (!kit || n === 0) return null;

  return (
    <aside className="not-prose my-12 border-y-2 border-ink py-8" aria-label={kit.name}>
      <p className="kicker text-cherry">Starter kit</p>
      <h3 className="mt-2 font-display text-3xl italic">{title ?? kit.name}</h3>
      <p className="mt-2 text-muted-foreground">{kit.dek}</p>
      <p className="mt-1 text-sm text-muted-foreground">{KIT_DISCLAIMER}</p>
      {GROUPS.map(({ need, heading }) => {
        const rows = filled.filter((f) => f.slot.need === need);
        if (rows.length === 0) return null;
        return (
          <section key={need} className="mt-6" aria-label={heading}>
            <h4 className="font-display text-xl">{heading}</h4>
            <div className="mt-4 grid gap-8 sm:grid-cols-2">
              {rows.map(({ slot, product }) => (
                <div key={slot.id} className="min-w-0">
                  <p className="hand mb-1 text-lg text-cherry">{slot.label}</p>
                  <ProductCard product={product} placement={`kit-${kit.id}`} />
                </div>
              ))}
            </div>
          </section>
        );
      })}
      <ShopDisclosure className="mt-6" />
    </aside>
  );
}
