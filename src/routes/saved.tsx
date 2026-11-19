import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Copy, Send, X } from "lucide-react";
import { useSaved, type SavedItem, type SavedKind } from "@/lib/saved";
import { buildListText, copyText, productsWithStatus, useShopList } from "@/lib/shoplist";
import { verifiedCatalog } from "@/data/catalog";
import { outcomeMessage, sendToGroupChat } from "@/lib/share";
import { planHref, sanitizePlanData } from "@/lib/planner";
import { seo } from "@/lib/seo";
import { NAMES } from "@/components/layout/nav";
import { PageHero } from "@/components/editorial/Section";
import { Transfer } from "@/components/saved/Transfer";
import { Star, Bow } from "@/components/brand/Doodles";

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

/** Saved plans restore their exact itinerary from the stored input, seed and activity ids. */
function hrefFor(i: SavedItem) {
  if (i.kind === "plan" && i.plan) {
    const p = sanitizePlanData(i.plan);
    if (p) return planHref(p.input, p.seed, p.ids);
  }
  return i.href;
}

const ACTION =
  "inline-flex min-h-11 items-center gap-1.5 px-1 text-sm font-semibold text-espresso hover:text-cherry focus-visible:outline focus-visible:outline-2 focus-visible:outline-cherry";

/** Copy-as-text and Send to the group chat for one block of text. */
function ShareRow({ title, text, url }: { title: string; text: string; url?: string }) {
  const [msg, setMsg] = useState("");
  const flash = (m: string) => {
    setMsg(m);
    setTimeout(() => setMsg(""), 2500);
  };
  return (
    <div className="relative z-10 flex flex-wrap items-center gap-x-4">
      <button
        type="button"
        className={ACTION}
        onClick={async () =>
          flash(
            (await copyText(url ? `${text}\n${url}` : text))
              ? "Copied as text."
              : outcomeMessage.failed,
          )
        }
      >
        <Copy className="h-4 w-4" aria-hidden /> Copy as text
      </button>
      <button
        type="button"
        className={ACTION}
        onClick={async () =>
          flash(outcomeMessage[await sendToGroupChat({ title, text, ...(url ? { url } : {}) })])
        }
      >
        <Send className="h-4 w-4" aria-hidden /> Send to the group chat
      </button>
      <span role="status" aria-live="polite" className="text-xs text-muted-foreground empty:hidden">
        {msg}
      </span>
    </div>
  );
}

function ShoppingList() {
  const { state, ready } = useShopList();
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
          {list.map((p) => (
            <li key={p.id} className="py-3">
              <span className="font-display text-lg">{p.name}</span>
              {p.brand && <span className="text-sm text-muted-foreground"> ({p.brand})</span>}
            </li>
          ))}
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
        <ShareRow title="My shopping list (Plans Past Five)" text={text} />
        <Link to="/shop" className={ACTION}>
          Back to {NAMES.shop}
        </Link>
      </div>
    </div>
  );
}

function Saved() {
  const { items, ready, remove, clear } = useSaved();
  const shop = useShopList();
  const hasShop = shop.ready && Object.keys(shop.state).length > 0;
  const kinds = (Object.keys(labels) as SavedKind[]).filter((k) => items.some((i) => i.kind === k));
  const origin = typeof window !== "undefined" ? window.location.origin : undefined;
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
                            text={i.note ? `${i.title}\n${i.note}` : i.title}
                            url={(origin ?? "") + hrefFor(i)}
                          />
                        )}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
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
