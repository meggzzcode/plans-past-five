import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, X } from "lucide-react";
import { useSaved, type SavedItem, type SavedKind } from "@/lib/saved";
import { buildListText, productsWithStatus, useShopList } from "@/lib/shoplist";
import { linkableFor, verifiedCatalog } from "@/data/catalog";
import { OUTBOUND_BUY_REL, resolveProductLink } from "@/config/affiliate";
import { linkLabel } from "@/components/commerce/labels";
import { ShopDisclosure } from "@/components/commerce/ProductCard";
import { track } from "@/lib/track";
import { canonicalUrl } from "@/lib/share";
import { hrefFor, savedShareText } from "@/lib/saved-share";
import { seo } from "@/lib/seo";
import { NAMES } from "@/components/layout/nav";
import { PageHero } from "@/components/editorial/Section";
import { Transfer } from "@/components/saved/Transfer";
import { SavedMeta } from "@/components/saved/SavedMeta";
import { ShareActions } from "@/components/share/ShareActions";
import { SavedExtras } from "@/components/share/SavedExtras";
import { NearBox } from "@/components/share/Near";
import { Star, Bow } from "@/components/brand/Doodles";
import { site } from "@/config/site";

export const Route = createFileRoute("/saved")({
  head: () =>
    seo({
      title: NAMES.saved,
      description:
        "Your saved hobbies, stories, plans and shop picks, stored privately on this device.",
      path: "/saved",
      noindex: true,
    }),
  component: Saved,
});

const labels: Record<SavedKind, string> = {
  plan: "Saved itineraries",
  hobby: "Hobby wishlist",
  article: "Stories",
  "solo-date": "Solo dates",
  product: "Shop picks",
};

const ACTION =
  "inline-flex min-h-11 items-center gap-1.5 px-1 text-sm font-semibold text-espresso hover:text-cherry focus-visible:outline focus-visible:outline-2 focus-visible:outline-cherry";

/** Send to the group chat and Copy link/list for one block of text (the shared ShareActions). */
function ShareRow({
  title,
  text,
  url,
  textIncludesUrl,
  copyLabel,
}: {
  title: string;
  text: string;
  url?: string;
  textIncludesUrl?: boolean;
  copyLabel?: string;
}) {
  return (
    <ShareActions
      variant="link"
      className="relative z-10"
      title={title}
      text={text}
      {...(url ? { url } : {})}
      {...(textIncludesUrl ? { textIncludesUrl } : {})}
      {...(copyLabel ? { copyLabel } : {})}
    />
  );
}

function ShoppingList() {
  const { state, ready, setStatus } = useShopList();
  if (!ready) return null;
  const need = productsWithStatus(verifiedCatalog, state, "need");
  const later = productsWithStatus(verifiedCatalog, state, "later");
  const own = productsWithStatus(verifiedCatalog, state, "own");
  if (need.length + later.length + own.length === 0) return null;
  const text = buildListText(
    verifiedCatalog,
    state,
    new Date().toISOString().slice(0, 10),
    "My shopping list",
  );
  const group = (title: string, list: typeof need) =>
    list.length > 0 && (
      <div className="mt-4">
        <h3 className="text-xl italic">{title}</h3>
        <ul className="mt-1 divide-y divide-border border-y border-border">
          {list.map((p) => {
            const link = resolveProductLink(linkableFor(p));
            const toggle =
              "inline-flex min-h-11 items-center px-2 text-sm font-semibold text-espresso hover:text-cherry focus-visible:outline focus-visible:outline-2 focus-visible:outline-cherry";
            return (
              <li key={p.id} className="py-3">
                <span className="font-display text-lg">{p.shortName ?? p.name}</span>
                {p.brand && !(p.shortName ?? p.name).startsWith(p.brand) && (
                  <span className="text-sm text-muted-foreground"> ({p.brand})</span>
                )}
                {p.benefit && <p className="mt-1 text-sm text-espresso">{p.benefit}</p>}
                <div className="mt-2 flex flex-wrap items-center gap-x-2">
                  <a
                    href={link.href}
                    target="_blank"
                    rel={OUTBOUND_BUY_REL}
                    onClick={() => {
                      const base = {
                        product_id: p.id,
                        placement: "saved",
                        retailer: link.retailer,
                        link_kind: link.kind,
                      };
                      track("product_click", base);
                      track(
                        link.kind === "affiliate"
                          ? "affiliate_outbound_click"
                          : "retailer_outbound_click",
                        base,
                      );
                    }}
                    className="inline-flex min-h-11 items-center justify-center gap-1.5 bg-cherry px-4 py-2 text-sm font-semibold text-cream hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                    aria-label={`${linkLabel(link)}: ${p.shortName ?? p.name}`}
                  >
                    {linkLabel(link)} <ArrowUpRight className="h-4 w-4" />
                  </a>
                  {state[p.id] !== "own" && (
                    <button type="button" className={toggle} onClick={() => setStatus(p, "own")}>
                      Got it
                    </button>
                  )}
                  {state[p.id] !== "later" && (
                    <button type="button" className={toggle} onClick={() => setStatus(p, "later")}>
                      Later
                    </button>
                  )}
                  {state[p.id] !== "need" && (
                    <button type="button" className={toggle} onClick={() => setStatus(p, "need")}>
                      Back to my list
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  return (
    <div className="mb-12" data-testid="saved-shoplist">
      <h2 className="flex items-center gap-2 text-3xl italic">
        <Star className="h-4 w-4 text-cherry" />
        Your shopping list
      </h2>
      {group("To buy", need)}
      {group("Saved for later", later)}
      {group("Already own", own)}
      <div className="mt-3 flex flex-wrap items-center gap-x-6">
        <ShareRow title={`My shopping list (${site.name})`} text={text} />
        <Link to="/shop" className={ACTION}>
          Back to {NAMES.shop}
        </Link>
      </div>
      <ShopDisclosure className="mt-2" />
    </div>
  );
}

function Saved() {
  const { items, ready, remove, clear } = useSaved();
  const shop = useShopList();
  const hasShop = shop.ready && Object.keys(shop.state).length > 0;
  const kinds = (Object.keys(labels) as SavedKind[]).filter((k) => items.some((i) => i.kind === k));
  return (
    <>
      <PageHero
        kicker={NAMES.saved}
        title="Penciled in."
        italic="Penciled"
        dek="Your saved hobbies, itineraries, stories and shopping list, in one place."
        tone="butter"
      >
        <p
          className="mt-5 inline-flex max-w-full flex-wrap items-center gap-2 border-2 border-cherry bg-cream px-3 py-2 text-sm font-semibold text-cherry"
          data-testid="device-only"
        >
          Saved on this device only
          <span className="font-normal text-espresso">
            Not synced. Clearing browser data removes it. Export to move devices.
          </span>
        </p>
      </PageHero>
      <section className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-14">
        {!ready ? null : items.length === 0 && !hasShop ? (
          <div className="paper relative mx-auto max-w-xl p-6 text-center md:p-10">
            <Bow className="absolute -top-5 left-1/2 h-10 w-14 -translate-x-1/2 text-cherry" />
            <p className="font-display text-3xl italic">
              Nothing on the calendar yet? Let's fix that.
            </p>
            <p className="mt-3 text-muted-foreground">
              Tap the heart on a hobby, or the bookmark on a story, plan or shop pick, to keep it
              here.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                to="/hobby-finder"
                className="inline-flex min-h-11 items-center bg-cherry px-5 text-sm font-semibold text-cream hover:bg-ink"
              >
                {NAMES.quiz}
              </Link>
              <Link
                to="/shop"
                className="inline-flex min-h-11 items-center border-2 border-cherry px-5 text-sm font-semibold text-cherry hover:bg-cherry hover:text-cream"
              >
                Pick a starter kit
              </Link>
              <Link
                to="/make-plans"
                className="inline-flex min-h-11 items-center border-2 border-cherry px-5 text-sm font-semibold text-cherry hover:bg-cherry hover:text-cream"
              >
                {NAMES.plans}
              </Link>
              <Link
                to="/tools/tonight"
                className="inline-flex min-h-11 items-center border-2 border-cherry px-5 text-sm font-semibold text-cherry hover:bg-cherry hover:text-cream"
              >
                What should I do tonight?
              </Link>
            </div>
          </div>
        ) : (
          <>
            <ShoppingList />
            {kinds.map((k) => (
              <div key={k} className="mb-12">
                <h2 className="flex items-center gap-2 text-3xl italic">
                  <Star className="h-4 w-4 text-cherry" />
                  {labels[k]}
                </h2>
                <ul className="mt-4 divide-y divide-border border-y border-border">
                  {items
                    .filter((i) => i.kind === k)
                    .map((i) => (
                      <li key={i.key} className="relative py-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <a
                              href={hrefFor(i)}
                              className="inline-flex min-h-11 items-center break-words font-display text-xl text-ink after:absolute after:inset-0 after:content-[''] hover:text-cherry focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cherry"
                            >
                              {i.title}
                            </a>
                            <SavedMeta item={i} />
                            {i.kind === "plan" && i.plan && (
                              <p className="text-xs text-muted-foreground">
                                Opens this exact itinerary again.
                              </p>
                            )}
                            {i.note && (
                              <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">
                                {i.note}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => remove(i.key)}
                            className="relative z-10 grid h-11 w-11 shrink-0 place-items-center text-muted-foreground hover:text-cherry focus-visible:outline focus-visible:outline-2 focus-visible:outline-cherry"
                            aria-label={`Remove ${i.title}`}
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                        {(i.kind === "plan" || i.kind === "hobby") && (
                          <ShareRow
                            title={i.title}
                            text={savedShareText(i).text}
                            url={canonicalUrl(hrefFor(i))}
                            textIncludesUrl={i.kind === "plan" && !!i.plan}
                          />
                        )}
                        <div className="relative z-10">
                          <SavedExtras item={i} />
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
            {items.length > 0 && <NearBox className="mb-8 max-w-xl" />}
            {items.length > 0 && (
              <button
                onClick={() => {
                  if (confirm("Remove everything from My Plans on this device?")) clear();
                }}
                className="min-h-11 text-sm font-semibold text-cherry underline"
              >
                Clear all saved items
              </button>
            )}
          </>
        )}
        {ready && <Transfer />}
      </section>
    </>
  );
}
