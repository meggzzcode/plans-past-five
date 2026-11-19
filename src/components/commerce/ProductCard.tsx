import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ListChecks, ListPlus } from "lucide-react";
import { OUTBOUND_BUY_REL, resolveProductLink, shopDisclosureSentences } from "@/config/affiliate";
import { linkableFor, photoFor, type CatalogProduct } from "@/data/catalog";
import { useShopList } from "@/lib/shoplist";
import { track } from "@/lib/track";
import { cn } from "@/lib/utils";
import { linkLabel, roleLabel } from "./labels";
import { Doodle, lookFor } from "./ProductTile";

/**
 * Disclosure beside a block of named products. One wording (src/config/affiliate.ts) for the cards,
 * the shop pages, /methodology and /affiliate-disclosure. The Associates statement appears here only
 * when an Amazon entry is live, and this renders only where product links are. `kind="short"` is the
 * one-line version near the first ask.
 */
export function ShopDisclosure({
  className,
  kind = "product",
  lead,
}: {
  className?: string;
  kind?: "product" | "general" | "short";
  /** An extra sentence that belongs in the same line (e.g. the kit's "not a bundle" note). */
  lead?: string;
}) {
  return (
    <p className={cn("text-xs text-muted-foreground", className)}>
      {lead ? `${lead} ` : ""}
      {shopDisclosureSentences(kind).join(" ")}{" "}
      <Link to="/affiliate-disclosure" className="underline">
        Disclosure
      </Link>
    </p>
  );
}

const brandKnown = (b: string) => b.trim() !== "" && !/^not stated/i.test(b);

/** The brand line is hidden when the product name already starts with it (no brand three times). */
const showBrand = (p: CatalogProduct) => {
  if (!brandKnown(p.brand)) return false;
  const name = (p.shortName ?? p.name).toLowerCase();
  return !name.startsWith(p.brand.trim().toLowerCase());
};

/**
 * The card's picture. Shows a photo ONLY when the record documents the rights (see `photoFor`);
 * otherwise a typographic tile: category colour, a doodle, and what she gets as the headline. It is
 * designed to look like a label, not like a missing image. `compact` is the strip used on standard
 * cards; the one-pick uses the larger tile.
 */
export function ProductVisual({
  product: p,
  className,
  compact = false,
  badge,
}: {
  product: CatalogProduct;
  className?: string;
  compact?: boolean;
  /** A small tag on the corner ("Our one pick"). */
  badge?: string;
}) {
  // An Associates-provided embed: ONLY while Amazon links are live (the link is then sponsored), and
  // it always links to the product's Amazon page through the central builder. Never printed or exported.
  const embedLink = resolveProductLink(linkableFor(p));
  if (p.imageEmbed && embedLink.sponsored)
    return (
      <a
        href={embedLink.href}
        target="_blank"
        rel={OUTBOUND_BUY_REL}
        className={cn("no-print block", className)}
        data-product-embed
      >
        <img
          src={p.imageEmbed.src}
          alt={p.imageEmbed.alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="aspect-[4/3] w-full object-contain"
        />
      </a>
    );
  const photo = photoFor(p);
  if (photo)
    return (
      <figure className={cn("m-0", className)}>
        <img
          src={photo.src}
          alt={p.shortName ?? p.name}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover"
        />
        <figcaption className="mt-1 text-[11px] text-muted-foreground">{photo.credit}</figcaption>
      </figure>
    );
  const look = lookFor(p.category);
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative flex w-full overflow-hidden text-ink",
        compact
          ? "h-24 flex-row items-center gap-4 px-5 sm:h-28"
          : "min-h-52 flex-col items-center justify-center gap-2 px-4 py-8 text-center md:h-full",
        look.tint,
        className,
      )}
      data-product-tile
    >
      <span className="pointer-events-none absolute inset-2 border border-ink/25" />
      {badge && (
        <span className="absolute left-0 top-4 -rotate-2 bg-cherry px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-cream">
          {badge}
        </span>
      )}
      <Doodle kind={look.doodle} className={compact ? "h-12 w-12 sm:h-14 sm:w-14" : "h-20 w-20"} />
      <span className={compact ? "min-w-0 text-left" : ""}>
        <span className="kicker block text-ink/70">{p.category}</span>
        <span
          className={cn(
            "block font-display italic leading-tight",
            compact ? "text-xl" : "mt-1 text-2xl",
          )}
        >
          {look.headline}
        </span>
      </span>
    </div>
  );
}

/** Resolves the one destination and records the click. The href always comes from the registry. */
export function useProductLink(p: CatalogProduct, placement: string) {
  const link = resolveProductLink(linkableFor(p));
  const onClick = () => {
    const base = { product_id: p.id, placement, retailer: link.retailer, link_kind: link.kind };
    track("product_click", base);
    track(link.kind === "affiliate" ? "affiliate_outbound_click" : "retailer_outbound_click", base);
  };
  return { link, onClick };
}

/** The one clear primary action: cherry, full-width on phones, always at least 44px tall. */
export const primaryButtonCls =
  "inline-flex min-h-11 w-full items-center justify-center gap-1.5 bg-cherry px-5 py-2 text-sm font-semibold text-cream hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:w-fit";

/** Save to the shopping list. Icon-only on standard cards, with a visible label on the one-pick. */
function SaveButton({ product: p, labelled }: { product: CatalogProduct; labelled?: boolean }) {
  const { state, ready, setStatus } = useShopList();
  const saved = ready && state[p.id] === "need";
  const text = saved ? "On my list" : "Add to my list";
  return (
    <button
      type="button"
      onClick={() => setStatus(p, "need")}
      aria-pressed={saved}
      aria-label={`${saved ? "On my shopping list" : "Add to my shopping list"}: ${p.shortName ?? p.name}`}
      title={saved ? "On my shopping list" : "Add to my shopping list"}
      className={cn(
        "no-print flex h-11 shrink-0 items-center justify-center gap-1.5 text-cherry",
        labelled ? "-mr-1 px-2 text-sm font-semibold" : "-mr-2 -mt-2 w-11",
      )}
    >
      {saved ? <ListChecks className="h-5 w-5" /> : <ListPlus className="h-5 w-5" />}
      {labelled && <span>{text}</span>}
    </button>
  );
}

/** A compact "prefer something different?" line: another product for the same slot and how it differs. */
export function AlternativeRow({
  product: p,
  placement,
}: {
  product: CatalogProduct;
  placement: string;
}) {
  const { link, onClick } = useProductLink(p, placement);
  useEffect(() => {
    track("product_impression", { product_id: p.id, placement, role: p.role });
  }, [p.id, p.role, placement]);
  return (
    <li
      className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
      data-product-id={p.id}
    >
      <span className="min-w-0 text-sm">
        <strong className="font-semibold">{p.shortName ?? p.name}</strong>
        {showBrand(p) && <span className="text-muted-foreground"> by {p.brand}</span>}
        <span className="block text-muted-foreground">
          {p.compare ?? p.benefit ?? p.description}
        </span>
      </span>
      <a
        href={link.href}
        target="_blank"
        rel={OUTBOUND_BUY_REL}
        onClick={onClick}
        className="inline-flex min-h-11 items-center gap-1 border-b-2 border-cherry py-2 text-sm font-semibold text-cherry hover:border-transparent"
        aria-label={`${linkLabel(link)}: ${p.shortName ?? p.name}`}
      >
        {linkLabel(link)} <ArrowUpRight className="h-4 w-4" />
      </a>
    </li>
  );
}

/** The first sentence of a longer line, so the one-pick reason stays one line. */
const firstSentence = (t: string) => {
  const m = /^.*?[.!?](?=\s|$)/.exec(t.trim());
  return m ? m[0] : t.trim();
};

/**
 * Product card: a picture (photo only when rights are recorded, else a typographic tile), a role
 * label, the name, one practical benefit line and one "See it on Amazon" button. No prices, ratings
 * or per-card disclaimers; the shared disclosure sits under the block. Other options for the same
 * need are folded under the card. Safe to reuse anywhere: it only needs a verified product.
 */
export function ProductCard({
  product: p,
  placement,
  index,
  label,
  featured,
  alsoNeed,
  alternatives,
  className,
}: {
  product: CatalogProduct;
  /** Where it is shown ("article", "hobby", "kit"...). Sent to analytics as an id, never as text. */
  placement: string;
  index?: number;
  /** Overrides the role label (a kit slot can be essential while the product's own role is not). */
  label?: string;
  /** The "one pick" layout: a larger tile beside the text on wide screens, with the reason shown. */
  featured?: boolean;
  /** Other things the same list needs, named under the one pick ("You'll also need ... below"). */
  alsoNeed?: string[];
  /** Other products for the same slot: folded under "Prefer something different?". */
  alternatives?: CatalogProduct[] | undefined;
  className?: string | undefined;
}) {
  const { link, onClick } = useProductLink(p, placement);
  const { state, ready } = useShopList();
  const own = ready && state[p.id] === "own";

  useEffect(() => {
    track("product_impression", { product_id: p.id, placement, role: p.role });
  }, [p.id, p.role, placement]);

  const role = label ?? roleLabel(p);

  return (
    <article
      className={cn(
        "flex min-w-0 flex-col [overflow-wrap:anywhere]",
        featured && "md:flex-row md:gap-6",
        own && "opacity-70",
        className,
      )}
      data-product-id={p.id}
    >
      <ProductVisual
        product={p}
        compact={!featured}
        {...(featured ? { badge: "Our one pick" } : {})}
        className={cn(featured && "md:w-2/5 md:shrink-0")}
      />
      <div className="mt-3 flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <p className="kicker text-cherry">
            {index !== undefined && (
              <span className="mr-2 font-display text-2xl italic">
                {String(index + 1).padStart(2, "0")}
              </span>
            )}
            {role}
          </p>
          <SaveButton product={p} {...(featured ? { labelled: true } : {})} />
        </div>
        <h3 className={cn("mt-1 leading-tight", featured ? "text-2xl" : "text-xl")}>
          {p.shortName ?? p.name}
        </h3>
        {showBrand(p) && <p className="text-sm text-muted-foreground">{p.brand}</p>}
        <p className="mt-2 text-sm text-espresso">{p.benefit ?? p.description}</p>
        {featured && p.whySelected && (
          <p className="mt-2 text-sm text-espresso">
            <strong className="font-semibold">Why we picked it:</strong>{" "}
            {firstSentence(p.whySelected)}
          </p>
        )}
        {featured && alsoNeed && alsoNeed.length > 0 && (
          <p className="mt-2 text-sm text-espresso">
            You'll also need: {alsoNeed.join(", ")} (below).
          </p>
        )}
        {p.role === "complete-kit" && (
          <p className="mt-2 text-sm text-garden">Good for gifting: it's all in one box.</p>
        )}
        <a
          href={link.href}
          target="_blank"
          rel={OUTBOUND_BUY_REL}
          onClick={onClick}
          className={cn(primaryButtonCls, "mt-4")}
          aria-label={`${linkLabel(link)}: ${p.shortName ?? p.name}`}
        >
          {linkLabel(link)} <ArrowUpRight className="h-4 w-4" />
        </a>
        {alternatives && alternatives.length > 0 && (
          <details className="mt-3 border-t border-border">
            <summary className="flex min-h-11 cursor-pointer items-center text-sm font-semibold text-espresso">
              Prefer something different? ({alternatives.length})
            </summary>
            <ul className="mt-1 space-y-3 pb-1">
              {alternatives.map((a) => (
                <AlternativeRow key={a.id} product={a} placement={`${placement}-alt`} />
              ))}
            </ul>
          </details>
        )}
      </div>
    </article>
  );
}
