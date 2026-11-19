import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ListChecks, ListPlus } from "lucide-react";
import { productLinkLabel, resolveProductLink, shopDisclosureSentences } from "@/config/affiliate";
import { linkableFor, photoFor, type CatalogProduct } from "@/data/catalog";
import { useShopList } from "@/lib/shoplist";
import { track } from "@/lib/track";
import { cn } from "@/lib/utils";

/**
 * Disclosure under every block of named products. One wording (src/config/affiliate.ts) for the
 * cards, the shop pages, /methodology and /affiliate-disclosure. The Associates statement appears
 * here only when an Amazon entry is live, and this renders only where product links are.
 */
export function ShopDisclosure({
  className,
  kind = "product",
}: {
  className?: string;
  kind?: "product" | "general";
}) {
  return (
    <p className={cn("text-xs text-muted-foreground", className)}>
      {shopDisclosureSentences(kind).join(" ")}{" "}
      <Link to="/affiliate-disclosure" className="underline">
        Disclosure
      </Link>
    </p>
  );
}

const TINTS = [
  "bg-butter/60",
  "bg-strawberry/60",
  "bg-sunday/60",
  "bg-matcha/40",
  "bg-warm-white",
] as const;

/** Stable, readable hash so a category always gets the same tint. */
const tintFor = (key: string) => {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) % 9973;
  return TINTS[h % TINTS.length];
};

const brandKnown = (b: string) => b.trim() !== "" && !/^not stated/i.test(b);

/**
 * The card's picture. Shows a photo ONLY when the record documents the rights (see `photoFor`);
 * otherwise a brand-tinted typographic tile (category as the kicker, brand or product as the title)
 * that is designed to look like a label, not like a missing image.
 */
export function ProductVisual({
  product: p,
  className,
}: {
  product: CatalogProduct;
  className?: string;
}) {
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
  const title = brandKnown(p.brand) ? p.brand : (p.shortName ?? p.category);
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative flex aspect-[4/3] w-full flex-col items-center justify-center overflow-hidden px-4 text-center text-ink",
        tintFor(p.category),
        className,
      )}
      data-product-tile
    >
      <span className="pointer-events-none absolute inset-2 border border-ink/20" />
      <span className="kicker text-ink/70">{p.category}</span>
      <span className="mt-1 font-display text-2xl italic leading-tight">{title}</span>
    </div>
  );
}

/** Resolves the one destination and records the click. The href always comes from the registry. */
function useProductLink(p: CatalogProduct, placement: string) {
  const link = resolveProductLink(linkableFor(p));
  const onClick = () => {
    const base = { product_id: p.id, placement, retailer: link.retailer, link_kind: link.kind };
    track("product_click", base);
    track(link.kind === "affiliate" ? "affiliate_outbound_click" : "retailer_outbound_click", base);
  };
  return { link, onClick };
}

const buttonCls =
  "inline-flex min-h-11 w-fit items-center gap-1.5 bg-ink px-4 py-2 text-sm font-semibold text-warm-white hover:bg-cherry";

/** Save icon only. Saved items feed the copy / print list. */
function SaveButton({ product: p }: { product: CatalogProduct }) {
  const { state, ready, setStatus } = useShopList();
  const saved = ready && state[p.id] === "need";
  return (
    <button
      type="button"
      onClick={() => setStatus(p, "need")}
      aria-pressed={saved}
      aria-label={`${saved ? "On my shopping list" : "Add to my shopping list"}: ${p.shortName ?? p.name}`}
      title={saved ? "On my shopping list" : "Add to my shopping list"}
      className="no-print -mr-2 -mt-2 flex h-11 w-11 shrink-0 items-center justify-center text-cherry"
    >
      {saved ? <ListChecks className="h-5 w-5" /> : <ListPlus className="h-5 w-5" />}
    </button>
  );
}

/** A compact "also consider" line: another product for the same slot and how it differs. */
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
        {brandKnown(p.brand) && <span className="text-muted-foreground"> by {p.brand}</span>}
        <span className="block text-muted-foreground">
          {p.compare ?? p.benefit ?? p.description}
        </span>
      </span>
      <a
        href={link.href}
        target="_blank"
        rel={link.sponsored ? "sponsored noopener" : "noopener"}
        onClick={onClick}
        className="inline-flex min-h-11 items-center gap-1 border-b-2 border-cherry py-2 text-sm font-semibold text-cherry hover:border-transparent"
        aria-label={`${productLinkLabel(link)}: ${p.shortName ?? p.name}`}
      >
        {productLinkLabel(link)} <ArrowUpRight className="h-4 w-4" />
      </a>
    </li>
  );
}

/**
 * Product card: a picture (photo only when rights are recorded, else a typographic tile), a role
 * label, the name, one practical benefit line and one "View on Amazon" button. No prices, ratings or
 * per-card disclaimers; the shared disclosure sits under the block. Safe to reuse anywhere: it only
 * needs a verified product.
 */
export function ProductCard({
  product: p,
  placement,
  index,
  label,
  featured,
  alternatives,
  className,
}: {
  product: CatalogProduct;
  /** Where it is shown ("article", "hobby", "kit"...). Sent to analytics as an id, never as text. */
  placement: string;
  index?: number;
  /** Overrides the role label (a kit slot can be essential while the product's own role is not). */
  label?: string;
  /** The "If you only buy one thing" layout: picture beside the text on wide screens. */
  featured?: boolean;
  /** Other products for the same slot: shown as compact "also consider" lines. */
  alternatives?: CatalogProduct[] | undefined;
  className?: string | undefined;
}) {
  const { link, onClick } = useProductLink(p, placement);
  const { state, ready } = useShopList();
  const own = ready && state[p.id] === "own";

  useEffect(() => {
    track("product_impression", { product_id: p.id, placement, role: p.role });
  }, [p.id, p.role, placement]);

  const role = label ?? (p.isEssential ? "Essential" : "Optional extra");

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
      <ProductVisual product={p} className={cn(featured && "md:w-2/5 md:shrink-0")} />
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
          <SaveButton product={p} />
        </div>
        <h3 className={cn("mt-1 leading-tight", featured ? "text-2xl" : "text-xl")}>
          {p.shortName ?? p.name}
        </h3>
        {brandKnown(p.brand) && <p className="text-sm text-muted-foreground">{p.brand}</p>}
        <p className="mt-2 text-sm text-espresso">{p.benefit ?? p.description}</p>
        <a
          href={link.href}
          target="_blank"
          rel={link.sponsored ? "sponsored noopener" : "noopener"}
          onClick={onClick}
          className={cn(buttonCls, "mt-4")}
          aria-label={`${productLinkLabel(link)}: ${p.shortName ?? p.name}`}
        >
          {productLinkLabel(link)} <ArrowUpRight className="h-4 w-4" />
        </a>
        {alternatives && alternatives.length > 0 && (
          <div className="mt-4 border-t border-border pt-3">
            <p className="kicker text-muted-foreground">Also consider</p>
            <ul className="mt-2 space-y-3">
              {alternatives.map((a) => (
                <AlternativeRow key={a.id} product={a} placement={`${placement}-alt`} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}
