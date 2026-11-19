import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  KIT_DISCLAIMER,
  awaitingEssentials,
  fillKit,
  getKit,
  householdItems,
  isFullKit,
  type FilledSlot,
  type Kit,
} from "@/data/kits";
import { onlyOnePick, verifiedCatalog, type CatalogProduct } from "@/data/catalog";
import { kitHomeCollection } from "@/data/products";
import { getHobby } from "@/data/hobbies";
import { track } from "@/lib/track";
import { ShopDisclosure } from "./ProductCard";
import { Doodle, lookFor } from "./ProductTile";
import { roleLabel } from "./labels";
import { ShopSections, type ShopGroup, type ShopItem } from "./ShopSections";

const GROUPS = [
  { need: "essential", heading: "Then add", quiet: false },
  { need: "optional", heading: "Pretty extras for later", quiet: true },
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
  const isKit = isFullKit(filled, kit);
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
  // The "More in ..." link goes to the kit's own collection, never to one that merely sells a product.
  const home = kitHomeCollection(kit.id);
  const coll = home && home.slug !== currentCollection ? home : undefined;
  const awaiting = isKit ? [] : awaitingEssentials(kit, filled);
  const household = householdItems(kit);
  const startTitle = title ?? kit.name;
  const heading = isKit
    ? (title ?? kit.headline ?? kit.name)
    : /^where to start/i.test(startTitle)
      ? startTitle
      : `Where to start: ${startTitle}`;

  return (
    <aside className="not-prose my-12 border-y-2 border-ink py-8" aria-label={kit.name}>
      <p className="kicker text-cherry">{isKit ? "Starter kit" : "Where to start"}</p>
      <h3 className="mt-2 font-display text-3xl italic">{heading}</h3>
      <p className="mt-2 text-muted-foreground">{kit.dek}</p>
      {!isKit && (
        <p className="mt-2 text-sm font-semibold text-espresso" data-kit-incomplete>
          {awaiting.length > 0
            ? "A starting point, not a complete kit: we have not verified every essential yet."
            : "A starting point: we have named the essentials, and a full kit needs a few more verified picks."}
        </p>
      )}
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
      {awaiting.length > 0 && (
        <p className="mt-6 max-w-prose text-sm text-espresso" data-kit-awaiting>
          <strong className="font-semibold">Still to choose (no verified listing yet):</strong>{" "}
          {awaiting.map((a) => a.label.toLowerCase()).join(", ")}.
        </p>
      )}
      {household.length > 0 && (
        <p className="mt-3 max-w-prose text-sm text-espresso" data-kit-household>
          <strong className="font-semibold">You probably have:</strong>{" "}
          {household.map((h) => h.label.toLowerCase()).join(", ")}.
        </p>
      )}
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
