import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "@tanstack/react-router";
import { Copy, Printer } from "lucide-react";
import { isMonetized, liveDisclosureSentences, resolveProductLink } from "@/config/affiliate";
import { getHobby } from "@/data/hobbies";
import { articlesForHobby } from "@/content";
import { selectProducts, verifiedCatalog, linkableFor, type CatalogProduct } from "@/data/catalog";
import { buildListText, copyText, neededProducts, useShopList } from "@/lib/shoplist";
import { track } from "@/lib/track";
import { ShopDisclosure } from "./ProductCard";
import { ShopSections } from "./ShopSections";
import { groupsFor } from "./ShopTheArticle";

/**
 * Print view. The list is portalled to <body> and every other body child is removed from the
 * layout while printing, so the printout is one clean page (visibility:hidden would leave the
 * whole page's height behind as blank sheets).
 */
const printCss = (id: string) => `
.shop-print-area{display:none}
@media print{
  body[data-print-shop] > *:not(.shop-print-area){display:none !important}
  body[data-print-shop="${id}"] > .shop-print-area[data-print-id="${id}"]{display:block;padding:24px;color:#000;background:#fff;font-family:Georgia,serif}
}`;

/**
 * "Shop your hobby": the reusable shopping list (the component keeps its historical name). Drop `<ShopMyHobby hobby="watercolor-painting" />` into any
 * hobby page, article, collection, quiz result or planner result. Renders nothing without verified products.
 */
export function ShopMyHobby({
  hobby,
  collection,
  article,
  title,
  dek,
  catalog = verifiedCatalog,
  today = new Date().toISOString().slice(0, 10),
}: {
  hobby?: string;
  collection?: string;
  article?: string;
  title?: string;
  dek?: string;
  catalog?: CatalogProduct[];
  /** Overridable for deterministic output in tests. */
  today?: string;
}) {
  const sel = selectProducts(
    {
      ...(hobby ? { hobby } : {}),
      ...(article ? { article } : {}),
      ...(collection ? { collection } : {}),
    },
    catalog,
  );
  const { state, ready, setMany, clear } = useShopList();
  const [msg, setMsg] = useState("");
  const [mounted, setMounted] = useState(false);
  const printId = useId();
  const h = hobby ? getHobby(hobby) : undefined;
  const heading = title ?? (h ? `Shop your ${h.name.toLowerCase()} kit` : "Shop your hobby");

  useEffect(() => {
    const done = () => document.body.removeAttribute("data-print-shop");
    window.addEventListener("afterprint", done);
    setMounted(true);
    return () => window.removeEventListener("afterprint", done);
  }, []);

  if (sel.all.length === 0) return null;

  const needed = ready ? neededProducts(sel.all, state) : [];
  const listTitle = h ? `${h.name} shopping list` : "My shopping list";
  const text = buildListText(sel.all, ready ? state : {}, today, listTitle);
  const grouped = groupsFor(sel);
  const related = hobby ? articlesForHobby(hobby).slice(0, 3) : [];

  const later = ready ? sel.all.filter((p) => state[p.id] === "later") : [];
  const printArea = (
    <div className="shop-print-area" data-print-id={printId} aria-hidden="true">
      <h2>{listTitle}</h2>
      <p>Made {today}. Amazon or the seller sets price, shipping and returns.</p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {needed.map((p) => (
          <li key={p.id} style={{ margin: "10px 0", overflowWrap: "anywhere" }}>
            {"☐"} <strong>{p.shortName ?? p.name}</strong> ({p.brand})
            <br />
            <span style={{ fontSize: "0.85em" }}>{resolveProductLink(linkableFor(p)).href}</span>
          </li>
        ))}
      </ul>
      {later.length > 0 && <p>Saved for later: {later.map((p) => p.name).join(", ")}</p>}
      {isMonetized() && <p style={{ fontSize: "0.85em" }}>{liveDisclosureSentences().join(" ")}</p>}
    </div>
  );

  const copy = async () => {
    const ok = await copyText(text);
    setMsg(
      ok
        ? "Copied. Paste it into Notes or a message."
        : "Couldn't copy. Try the print view instead.",
    );
    track("shop_article_interaction", {
      action: "copy-list",
      count: needed.length,
      ...(hobby ? { hobby } : {}),
    });
  };
  const print = () => {
    document.body.setAttribute("data-print-shop", printId);
    track("shop_article_interaction", {
      action: "print-list",
      count: needed.length,
      ...(hobby ? { hobby } : {}),
    });
    window.print();
  };
  const btn =
    "inline-flex min-h-11 items-center gap-2 border-2 border-ink px-4 text-sm font-semibold hover:bg-butter disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <section className="not-prose my-12 bg-butter/40 px-5 py-8 md:px-8" aria-label={heading}>
      <style>{printCss(printId)}</style>
      <p className="kicker text-cherry">Shop your hobby</p>
      <h3 className="mt-2 font-display text-3xl italic">{heading}</h3>
      <p className="mt-2 text-muted-foreground">
        {dek ??
          "Tap the list icon on anything you want, then copy or print the list. It stays in this browser."}
      </p>

      <div className="no-print mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          className={btn}
          onClick={() =>
            setMany(
              sel.essentials.map((p) => p.id),
              "need",
            )
          }
          disabled={sel.essentials.length === 0}
        >
          Add all essentials
        </button>
        <button type="button" className={btn} onClick={copy} disabled={needed.length === 0}>
          <Copy className="h-4 w-4" /> Copy list
        </button>
        <button type="button" className={btn} onClick={print} disabled={needed.length === 0}>
          <Printer className="h-4 w-4" /> Print list
        </button>
        <button
          type="button"
          className="min-h-11 text-sm font-semibold text-cherry underline"
          onClick={clear}
        >
          Clear
        </button>
        <p className="text-sm" role="status" aria-live="polite">
          {ready ? `${needed.length} on your list` : ""} {msg}
        </p>
      </div>

      <ShopSections
        pick={grouped.pick}
        groups={grouped.groups}
        placement="hobby"
        cardClassName="bg-cream/60 p-3"
      />

      {related.length > 0 && (
        <p className="mt-6 text-sm">
          Read next:{" "}
          {related.map((a, i) => (
            <span key={a.slug}>
              {i > 0 && ", "}
              <Link to="/journal/$slug" params={{ slug: a.slug }} className="font-semibold">
                {a.title}
              </Link>
            </span>
          ))}
        </p>
      )}
      <ShopDisclosure className="mt-5" />

      {mounted && createPortal(printArea, document.body)}
    </section>
  );
}
