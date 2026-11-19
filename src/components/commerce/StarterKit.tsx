import { useEffect } from "react";
import { KIT_DISCLAIMER, fillKit, getKit, type FilledSlot, type Kit } from "@/data/kits";
import { onlyOnePick, verifiedCatalog, type CatalogProduct } from "@/data/catalog";
import { track } from "@/lib/track";
import { ShopDisclosure } from "./ProductCard";
import { ShopSections, type ShopGroup, type ShopItem } from "./ShopSections";

const GROUPS = [
  { need: "essential", heading: "Start with these", quiet: false, label: "Essential" },
  { need: "optional", heading: "Optional extras", quiet: true, label: "Optional extra" },
  { need: "probably-own", heading: "You may already own these", quiet: true, label: "You may own it" },
] as const;

const itemOf = (f: FilledSlot, label?: string): ShopItem => ({
  product: f.product,
  alternatives: f.alternatives,
  caption: f.slot.label,
  ...(label ? { label } : {}),
});

/** The kit's one best buy: a flagged essential, else a complete kit, else the first essential. */
export function kitPick(filled: FilledSlot[]): FilledSlot | undefined {
  const essentials = filled.filter((f) => f.slot.need === "essential");
  const best = onlyOnePick(essentials.map((f) => f.product) as CatalogProduct[]);
  return essentials.find((f) => f.product.id === best?.id);
}

/**
 * A starter kit built from slots. A slot appears only when a verified product fills it, and a kit
 * with nothing filled renders nothing at all. The kit's best single buy is shown first.
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

  const pick = kitPick(filled);
  const groups: ShopGroup[] = GROUPS.map(({ need, heading, quiet, label }) => ({
    heading,
    quiet,
    items: filled
      .filter((f) => f.slot.need === need && f !== pick)
      .map((f) => itemOf(f, label)),
  }));

  return (
    <aside className="not-prose my-12 border-y-2 border-ink py-8" aria-label={kit.name}>
      <p className="kicker text-cherry">Starter kit</p>
      <h3 className="mt-2 font-display text-3xl italic">{title ?? kit.name}</h3>
      <p className="mt-2 text-muted-foreground">{kit.dek}</p>
      <ShopSections
        pick={pick ? itemOf(pick, "Essential") : undefined}
        groups={groups}
        placement={`kit-${kit.id}`}
        note={kit.note}
      />
      <p className="mt-6 text-xs text-muted-foreground">{KIT_DISCLAIMER}</p>
      <ShopDisclosure className="mt-1" />
    </aside>
  );
}
