import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Bookmark, BookmarkCheck } from "lucide-react";
import {
  isMonetized,
  liveDisclosureSentences,
  productLinkLabel,
  resolveProductLink,
} from "@/config/affiliate";
import { linkableFor, type CatalogProduct } from "@/data/catalog";
import { useShopList } from "@/lib/shoplist";
import { track } from "@/lib/track";
import { cn } from "@/lib/utils";

/** Disclosure for shoppable blocks. Says "sponsored" only when an affiliate entry is actually live. */
export function ShopDisclosure({ className }: { className?: string }) {
  return (
    <p className={cn("text-xs text-muted-foreground", className)}>
      {isMonetized()
        ? `${liveDisclosureSentences().join(" ")} It never changes what we recommend. `
        : "Links go to ordinary Amazon product pages. We don't currently earn from them, and Amazon sets the price and availability. "}
      <Link to="/affiliate-disclosure" className="underline">
        Disclosure
      </Link>
    </p>
  );
}

/** Honest sold-by wording: never implies Amazon itself sells a third-party item. */
const availabilityLabel = (p: Pick<CatalogProduct, "availability">) =>
  p.availability === "check-listing"
    ? "Sold by a third-party seller on Amazon: check the listing"
    : "Available on Amazon";

/**
 * Photo-less, magazine-style product card. Safe to reuse anywhere: it only needs a verified product.
 * The link comes from `resolveProductLink`, so activating affiliate links later needs no change here.
 */
export function ProductCard({
  product: p,
  placement,
  index,
  alternative,
  className,
}: {
  product: CatalogProduct;
  /** Where it is shown ("article", "hobby", "kit"...). Sent to analytics as an id, never as text. */
  placement: string;
  index?: number;
  /** Another product already fills this kit slot as the primary pick. */
  alternative?: boolean;
  className?: string;
}) {
  const link = resolveProductLink(linkableFor(p));
  const { state, ready, setStatus } = useShopList();
  const status = ready ? state[p.id] : undefined;

  useEffect(() => {
    track("product_impression", { product_id: p.id, placement, role: p.role });
  }, [p.id, p.role, placement]);

  const onClick = () => {
    const base = { product_id: p.id, placement, retailer: link.retailer, link_kind: link.kind };
    track("product_click", base);
    track(link.kind === "affiliate" ? "affiliate_outbound_click" : "retailer_outbound_click", base);
  };

  const check =
    "flex min-h-11 cursor-pointer items-center gap-2.5 py-1 text-sm [&>input]:h-5 [&>input]:w-5 [&>input]:accent-[var(--cherry,#b3122b)]";

  return (
    <article
      className={cn(
        "flex min-w-0 flex-col border-t-2 border-ink pt-4 [overflow-wrap:anywhere]",
        status === "own" && "opacity-70",
        className,
      )}
      data-product-id={p.id}
    >
      <div className="flex items-baseline justify-between gap-3">
        <p className="kicker text-cherry">
          {index !== undefined && (
            <span className="mr-2 font-display text-2xl italic">
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
          {alternative ? "Another option for this slot" : p.isEssential ? "Essential" : "Optional"}
        </p>
        <p className="text-xs text-muted-foreground">{availabilityLabel(p)}</p>
      </div>
      <h3 className="mt-1 text-xl leading-tight">{p.name}</h3>
      <p className="text-sm text-muted-foreground">{p.brand}</p>
      <p className="mt-2 text-sm text-espresso">{p.whySelected}</p>
      <p className="mt-2 text-sm">
        <span className="hand text-lg text-cherry">best for → </span>
        <span className="text-muted-foreground">{p.audience}</span>
      </p>
      {p.limitations[0] && (
        <p className="mt-1 text-sm text-muted-foreground">
          <strong className="font-semibold text-ink">Worth knowing:</strong> {p.limitations[0]}
        </p>
      )}
      <a
        href={link.href}
        target="_blank"
        rel={link.sponsored ? "sponsored noopener" : "noopener"}
        onClick={onClick}
        className="mt-4 inline-flex min-h-11 w-fit items-center gap-1.5 border-b-2 border-cherry py-2 text-sm font-semibold text-cherry hover:border-transparent"
      >
        {productLinkLabel(link)} <ArrowUpRight className="h-4 w-4" />
      </a>
      <div className="no-print mt-3 flex flex-col gap-0.5 border-t border-border pt-2">
        <label className={check}>
          <input
            type="checkbox"
            checked={status === "need"}
            onChange={() => setStatus(p, "need")}
            aria-label={`I need this: ${p.name}`}
          />
          I need this
        </label>
        <label className={check}>
          <input
            type="checkbox"
            checked={status === "own"}
            onChange={() => setStatus(p, "own")}
            aria-label={`I already own this: ${p.name}`}
          />
          I already own this
        </label>
        <button
          type="button"
          onClick={() => setStatus(p, "later")}
          aria-pressed={status === "later"}
          className="flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-cherry"
        >
          {status === "later" ? (
            <BookmarkCheck className="h-4 w-4" />
          ) : (
            <Bookmark className="h-4 w-4" />
          )}
          {status === "later" ? "Saved for later" : "Save for later"}
        </button>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">Details checked {p.lastVerified}</p>
    </article>
  );
}
