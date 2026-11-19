import { Link } from "@tanstack/react-router";
import { Fragment } from "react";
import { OUTBOUND_BUY_REL, resolveProductLink } from "@/config/affiliate";
import { getCatalogProduct, linkableFor } from "@/data/catalog";
import { track } from "@/lib/track";

/**
 * Renders **bold**, [label](/internal-path) and {{product:catalog-id|label}} inside editorial strings.
 * A product mention links to its Amazon page only when that catalog product is verified; otherwise it
 * shows the plain label, so unverified products never become links.
 */
/** Inline links carry their own affordance so they read as links inside callouts (.not-prose) too. */
export const inlineLinkClass = "text-cherry underline underline-offset-[3px]";

export function Inline({ text }: { text: string }) {
  const parts = text.split(
    /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|\{\{product:[a-z0-9-]+\|[^}]+\}\})/g,
  );
  return (
    <>
      {parts.map((p, i) => {
        const b = p.match(/^\*\*(.+)\*\*$/);
        if (b) return <strong key={i}>{b[1]}</strong>;
        const pm = p.match(/^\{\{product:([a-z0-9-]+)\|([^}]+)\}\}$/);
        if (pm) {
          const product = getCatalogProduct(pm[1] ?? "");
          if (!product) return <Fragment key={i}>{pm[2]}</Fragment>;
          const link = resolveProductLink(linkableFor(product));
          return (
            <a
              key={i}
              href={link.href}
              className={inlineLinkClass}
              target="_blank"
              rel={OUTBOUND_BUY_REL}
              onClick={() =>
                track(
                  link.kind === "affiliate"
                    ? "affiliate_outbound_click"
                    : "retailer_outbound_click",
                  {
                    product_id: product.id,
                    placement: "inline",
                    retailer: link.retailer,
                    link_kind: link.kind,
                  },
                )
              }
            >
              {pm[2]}
            </a>
          );
        }
        const l = p.match(/^\[(.+)\]\((.+)\)$/);
        if (l) {
          const href = l[2] ?? "/";
          return href.startsWith("/") ? (
            <Link key={i} to={href} className={inlineLinkClass}>
              {l[1]}
            </Link>
          ) : (
            <a
              key={i}
              href={href}
              rel={/(^|\.)amazon\.com(\/|$)/i.test(href.replace(/^https?:\/\//, "")) ? OUTBOUND_BUY_REL : "noopener noreferrer"}
              className={inlineLinkClass}
            >
              {l[1]}
            </a>
          );
        }
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}
