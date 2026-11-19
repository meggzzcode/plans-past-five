import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { KIT_DISCLAIMER, fillKit, getKit, isFullKit, type FilledSlot, type Kit } from "@/data/kits";
import { onlyOnePick, verifiedCatalog, type CatalogProduct } from "@/data/catalog";
import { getCollection } from "@/data/products";
import { getHobby } from "@/data/hobbies";
import { track } from "@/lib/track";
import { ShopDisclosure } from "./ProductCard";
import { Doodle, lookFor } from "./ProductTile";
import { roleLabel } from "./labels";
import { ShopSections, type ShopGroup, type ShopItem } from "./ShopSections";

const GROUPS = [
  { need: "essential", heading: "Then add", quiet: false },
  { need: "optional", heading: "Pretty extras for later", quiet: true },
  { need: "probably-own", heading: "Check the drawer first", quiet: true },
] as const;

const itemOf = (f: FilledSlot): ShopItem => ({
  product: f.product,
  alternatives: f.alternatives,
  caption: f.slot.label,
  label: roleLabel(f.product, f.slot.need),
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
  currentCollection,
}: {
  kit: Kit | string;
  title?: string;
  catalog?: CatalogProduct[];
  /** Collection slug of the page showing the kit, so the "more in" link never points at itself. */
  currentCollection?: string;
}) {
  const kit = typeof kitOrId === "string" ? getKit(kitOrId) : kitOrId;
  const filled = kit ? fillKit(kit, catalog) : [];
  const kitId = kit?.id;
  const n = filled.length;
  useEffect(() => {
    if (kitId && n > 0) track("kit_interaction", { kit: kitId, action: "view", count: n });
  }, [kitId, n]);
  if (!kit || n === 0) return null;

  // A kit needs at least 4 named verified picks. Fewer: one "Where to start" card, no filler.
  const isKit = isFullKit(filled);
  const pick = kitPick(filled) ?? (isKit ? undefined : filled[0]);
  const groups: ShopGroup[] = (isKit ? GROUPS : []).map(({ need, heading, quiet }) => ({
    heading,
    quiet,
    items: filled.filter((f) => f.slot.need === need && f !== pick).map(itemOf),
  }));
  const alsoNeed =
    pick && isKit
      ? filled
          .filter((f) => f.slot.need === "essential" && f !== pick)
          .map((f) => f.slot.label.toLowerCase())
      : [];

  const starters = filled.filter((f) => f.slot.need === "essential").length;
  const later = n - starters;
  const boxed = filled.some((f) => f.product.role === "complete-kit");
  const hobby = kit.hobby ? getHobby(kit.hobby) : undefined;
  const collSlug = filled.flatMap((f) => f.product.collections)[0];
  const coll = collSlug && collSlug !== currentCollection ? getCollection(collSlug) : undefined;
  const heading = title ?? (isKit ? (kit.headline ?? kit.name) : `Where to start: ${kit.name}`);

  return (
    <aside className="not-prose my-12 border-y-2 border-ink py-8" aria-label={kit.name}>
      <p className="kicker text-cherry">{isKit ? "Starter kit" : "Where to start"}</p>
      <h3 className="mt-2 font-display text-3xl italic">{heading}</h3>
      <p className="mt-2 text-muted-foreground">{kit.dek}</p>
      {isKit && (
        <p className="mt-2 text-sm font-semibold text-espresso">
          {`${n} things: ${starters} to start with${later > 0 ? `, ${later} for later or maybe already at home` : ""}.${boxed ? " One is a boxed set with everything in it." : ""}`}
        </p>
      )}
      {isKit && (
        <ul
          className="mt-4 flex flex-wrap gap-2 text-xs text-ink"
          aria-label="What's in the kit"
          data-kit-contents
        >
          {filled.map((f) => (
            <li
              key={f.slot.id}
              className={`inline-flex items-center gap-1.5 px-2 py-1 ${lookFor(f.product.category).tint}`}
            >
              <Doodle kind={lookFor(f.product.category).doodle} className="h-4 w-4" />
              {f.slot.label}
            </li>
          ))}
        </ul>
      )}
      <ShopSections
        pick={pick ? itemOf(pick) : undefined}
        groups={groups}
        placement={`kit-${kit.id}`}
        note={isKit ? kit.note : undefined}
        alsoNeed={alsoNeed}
        afterPick={<ShopDisclosure kind="short" lead={KIT_DISCLAIMER} className="mt-3" />}
      />
      {(hobby || coll) && (
        <p className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-sm">
          {hobby && (
            <Link to="/hobbies/$slug" params={{ slug: hobby.slug }} className="font-semibold">
              How your first {hobby.name.toLowerCase()} session goes
            </Link>
          )}
          {coll && (
            <Link to="/shop/$category" params={{ category: coll.slug }} className="font-semibold">
              More in {coll.name}
            </Link>
          )}
        </p>
      )}
    </aside>
  );
}
