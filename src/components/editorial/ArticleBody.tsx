import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { articles, type Block } from "@/content";
import { heavyCallouts } from "./article-summary";
import { getHobby } from "@/data/hobbies";
import { productsFor } from "@/data/products";
import { selectProducts, verifiedCatalog } from "@/data/catalog";
import { fillKit, kits } from "@/data/kits";
import { ShopTheArticle } from "@/components/commerce/ShopTheArticle";
import { ShopMyHobby } from "@/components/commerce/ShopMyHobby";
import { StarterKit } from "@/components/commerce/StarterKit";
import { images } from "@/data/images";
import { Inline } from "./Inline";
import { ProductCard, HobbyCard } from "@/components/cards/Cards";
import { Star, Arrow } from "@/components/brand/Doodles";
import {
  CalendarHeart,
  Clock,
  Gem,
  Heart,
  Leaf,
  ListChecks,
  PiggyBank,
  Sun,
  Timer,
  Users,
  Wallet,
  ChevronDown,
  ShoppingBag,
} from "lucide-react";
import { SaveButton } from "./SaveButton";
import { AffiliateNote } from "./AffiliateNote";

export function ArticleBody({ blocks, articleSlug }: { blocks: Block[]; articleSlug?: string }) {
  // Which article this is: passed in, or found by identity of its body.
  const slug = articleSlug ?? articles.find((a) => a.body === blocks)?.slug;
  const used: Used = new Set();
  // Explicit commerce blocks claim their products first so a legacy block never repeats them.
  for (const b of blocks) {
    if (b.type === "shopTheArticle")
      selectProducts({
        ...(b.articleSlug ? { article: b.articleSlug } : {}),
        ...(b.hobbies ? { hobbies: b.hobbies } : {}),
        ...(b.collection ? { collection: b.collection } : {}),
      }).all.forEach((p) => used.add(p.id));
    else if (b.type === "shopMyHobby")
      selectProducts({ hobby: b.hobby }).all.forEach((p) => used.add(p.id));
  }
  // Resolved once, in order, so the overlap check never depends on re-render order.
  const legacy = blocks.map((b) =>
    b.type === "starterKit" || b.type === "shopHobby" ? verifiedFor(b, slug, used) : null,
  );
  const heavy = heavyCallouts(blocks);
  return (
    <div className="prose-editorial article-flow">
      {blocks.map((b, i) => (
        <BlockView key={i} b={b} verified={legacy[i] ?? null} heavy={heavy.has(i)} />
      ))}
    </div>
  );
}

/**
 * One style family for every callout: a small icon + label, a left rule, generous space.
 * `heavy` adds a soft tint (at most MAX_HEAVY_CALLOUTS per article); the rest are a plain bordered line.
 */
function Callout({
  id,
  label,
  icon,
  heavy,
  children,
}: {
  id?: string;
  label: string;
  icon: React.ReactNode;
  heavy: boolean;
  children: React.ReactNode;
}) {
  return (
    <aside
      id={id}
      data-callout={heavy ? "heavy" : "light"}
      className={
        heavy
          ? "not-prose callout callout-heavy my-9 scroll-mt-24 border-l-4 border-cherry bg-butter/50 px-5 py-5 md:px-7"
          : "not-prose callout callout-light my-7 scroll-mt-24 border-l-2 border-cherry/50 py-1 pl-4"
      }
    >
      <p className="kicker mb-2 flex items-center gap-2 text-cherry">
        <span
          aria-hidden
          className="grid h-5 w-5 place-items-center text-cherry [&>svg]:h-4 [&>svg]:w-4"
        >
          {icon}
        </span>
        {label}
      </p>
      <div className="text-[1rem] leading-relaxed text-ink">{children}</div>
    </aside>
  );
}

const wc = (t: string) => t.split(/\s+/).filter(Boolean).length;

/**
 * Layout wrapper around the commerce blocks. Collapsed by default: three essentials and a
 * "See all (N)" toggle; "Another option" cards sit behind one more toggle. It only hides cards the
 * commerce components already rendered (no markup of theirs is changed), and shows everything
 * until the page hydrates or when scripts are off.
 */
function ShopFold({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [showAlt, setShowAlt] = useState(false);
  const [n, setN] = useState({ main: 0, alt: 0 });
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const cards = [...root.querySelectorAll<HTMLElement>("[data-product-id], [data-fold-card]")];
    let idx = 0;
    let main = 0;
    let alt = 0;
    const meta = cards.map((el) => {
      const isAlt = /another option/i.test(el.textContent ?? "");
      if (isAlt) alt++;
      else main++;
      return { el, isAlt, idx: isAlt ? -1 : idx++ };
    });
    setN((p) => (p.main === main && p.alt === alt ? p : { main, alt }));
    const hide = new Set<HTMLElement>();
    for (const m of meta) if (m.isAlt ? !(open && showAlt) : !(open || m.idx < 3)) hide.add(m.el);
    for (const m of meta) m.el.toggleAttribute("data-fold-hide", hide.has(m.el));
    root.querySelectorAll<HTMLElement>("section").forEach((sec) => {
      const inside = cards.filter((c) => sec.contains(c));
      if (inside.length > 0)
        sec.toggleAttribute(
          "data-fold-hide",
          inside.every((c) => hide.has(c)),
        );
    });
  }, [open, showAlt, children]);
  const foldable = n.main > 3 || n.alt > 0;
  const btn =
    "inline-flex min-h-11 items-center gap-1.5 border-2 border-ink px-4 text-sm font-semibold hover:bg-butter";
  return (
    <div ref={ref} className="shop-fold">
      {children}
      {foldable && (
        <div className="not-prose -mt-6 mb-10 flex flex-wrap items-center gap-3 border-b border-border pb-5">
          <p className="mr-auto flex items-center gap-2 text-sm font-semibold text-ink">
            <ShoppingBag aria-hidden className="h-4 w-4 text-cherry" />
            Shop the pieces
          </p>
          {n.main > 3 && (
            <button
              type="button"
              className={btn}
              aria-expanded={open}
              onClick={() => {
                setOpen((v) => !v);
                if (open) setShowAlt(false);
              }}
            >
              {open ? "Show fewer" : `See all (${n.main})`}
              <ChevronDown
                aria-hidden
                className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`}
              />
            </button>
          )}
          {open && n.alt > 0 && (
            <button
              type="button"
              className={btn}
              aria-expanded={showAlt}
              onClick={() => setShowAlt((v) => !v)}
            >
              {showAlt ? "Hide other options" : `Show more options (${n.alt})`}
            </button>
          )}
          {!open && n.main <= 3 && n.alt > 0 && (
            <button
              type="button"
              className={btn}
              aria-expanded={showAlt}
              onClick={() => {
                setOpen(true);
                setShowAlt(true);
              }}
            >
              Show more options ({n.alt})
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/** Most products a legacy block may show when it is matched only by hobby (not tagged to the article). */
const LEGACY_HOBBY_MAX = 4;

type Used = Set<string>;

/**
 * Legacy `starterKit` / `shopHobby` blocks list product TYPES by id. The catalog replaces them only when
 * (a) products are tagged to THIS article slug, or (b) the block's product types map to catalog hobbies
 * AND at most LEGACY_HOBBY_MAX products result. Otherwise return null so the original product-type cards
 * render. Products already shown by an earlier catalog block on the page are never repeated: a block
 * that would overlap falls back to the original cards.
 */
function verifiedFor(
  b: Extract<Block, { type: "starterKit" | "shopHobby" }>,
  slug: string | undefined,
  used: Used,
): React.ReactNode {
  if (verifiedCatalog.length === 0) return null;
  const common = {
    ...(b.title ? { title: b.title } : {}),
    ...(b.type === "shopHobby" && b.dek ? { dek: b.dek } : {}),
  };
  const claim = (ids: string[]) => {
    if (ids.length === 0 || ids.some((id) => used.has(id))) return false;
    ids.forEach((id) => used.add(id));
    return true;
  };

  if (slug) {
    const tagged = selectProducts({ article: slug }).all;
    if (tagged.length > 0)
      return claim(tagged.map((p) => p.id)) ? <ShopTheArticle article={slug} {...common} /> : null;
  }

  const hobbies = [
    ...new Set(
      productsFor(b.productIds)
        .map((p) => p.hobbySlugs[0])
        .filter((x): x is string => !!x),
    ),
  ];
  if (hobbies.length === 0) return null;
  if (b.type === "starterKit") {
    const kit = kits.find((k) => hobbies.some((h) => k.id === h || k.hobby === h));
    if (kit) {
      const filled = fillKit(kit, verifiedCatalog);
      if (
        filled.length > 0 &&
        filled.length <= LEGACY_HOBBY_MAX &&
        claim(filled.map((f) => f.product.id))
      )
        return <StarterKit kit={kit} {...(b.title ? { title: b.title } : {})} />;
    }
  }
  const sel = selectProducts({ hobbies }).all;
  if (sel.length === 0 || sel.length > LEGACY_HOBBY_MAX || !claim(sel.map((p) => p.id)))
    return null;
  return hobbies.length === 1 ? (
    <ShopMyHobby hobby={hobbies[0]!} {...common} />
  ) : (
    <ShopTheArticle hobbies={hobbies} {...common} />
  );
}

function Chip({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="mb-0 inline-flex items-center gap-1 rounded-full !pl-2.5 before:!hidden bg-butter/60 px-2.5 py-0.5 text-xs font-medium text-espresso [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:text-cherry">
      {icon}
      {children}
    </li>
  );
}

function BlockView({
  b,
  verified,
  heavy,
}: {
  b: Block;
  verified: React.ReactNode;
  heavy: boolean;
}) {
  switch (b.type) {
    case "p": {
      const long = wc(b.text) > 70;
      const lead = b.text.startsWith("**");
      return (
        <p
          className={
            [long ? "para-long" : "", lead ? "lead-in" : ""].filter(Boolean).join(" ") || undefined
          }
        >
          <Inline text={b.text} />
        </p>
      );
    }
    case "h2":
      return (
        <h2 id={b.id} className="scroll-mt-28">
          <Inline text={b.text} />
        </h2>
      );
    case "h3":
      return (
        <h3>
          <Inline text={b.text} />
        </h3>
      );
    case "list":
      return (
        <ul>
          {b.items.map((t, i) => (
            <li key={i} className={t.startsWith("**") ? "lead-in" : undefined}>
              <Inline text={t} />
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="not-prose my-10 text-center font-display text-2xl italic leading-snug text-cherry md:text-3xl">
          <Star aria-hidden className="mx-auto mb-2 h-4 w-4" />“<Inline text={b.text} />”
        </blockquote>
      );
    case "image": {
      const img = images[b.image];
      return (
        <figure className="my-9 -mx-5 md:mx-0">
          <img
            src={img.src}
            alt={img.alt}
            width={img.w}
            height={img.h}
            loading="lazy"
            className="w-full"
          />
          {b.caption && (
            <figcaption className="hand mt-2 px-5 text-xl text-cherry md:px-0">
              <Inline text={b.caption} />
            </figcaption>
          )}
        </figure>
      );
    }
    case "item": {
      const h = b.hobby ? getHobby(b.hobby) : undefined;
      const time = b.time ?? h?.timeLabel;
      const cost = b.cost ?? h?.costLabel;
      const company =
        b.company ??
        (h
          ? h.company.length > 1
            ? "Solo or social"
            : h.company[0] === "solo"
              ? "Solo"
              : "Social"
          : undefined);
      const first = b.first ?? h?.firstActivity;
      const hasMore = !!(h || first);
      return (
        <section className="item-card not-prose my-0 flex gap-3 border-t border-border py-4">
          {b.n !== undefined && (
            <span
              aria-hidden
              className="w-8 shrink-0 font-display text-2xl italic leading-tight text-cherry"
            >
              {b.n}
            </span>
          )}
          <div className="min-w-0 flex-1">
            <h3 className="!mt-0 !mb-1 font-display text-xl leading-tight text-ink">
              <Inline text={b.title} />
            </h3>
            <p className="!mb-2 text-[0.97rem] leading-snug text-espresso">
              <Inline text={b.note} />
            </p>
            {(time || cost || company) && (
              <ul className="!mb-0 flex flex-wrap gap-1.5">
                {time && <Chip icon={<Clock aria-hidden />}>{time}</Chip>}
                {cost && <Chip icon={<Wallet aria-hidden />}>{cost}</Chip>}
                {company && <Chip icon={<Users aria-hidden />}>{company}</Chip>}
              </ul>
            )}
            {hasMore && (
              <details className="item-more mt-2 text-[0.95rem]">
                <summary className="inline-flex min-h-8 cursor-pointer items-center gap-1 text-sm font-semibold text-cherry">
                  More
                </summary>
                <div className="mt-2 space-y-2 border-l-2 border-cherry/30 pl-3">
                  {h && (
                    <p>
                      <strong>You'll need:</strong> {h.supplies.join(", ")}.
                    </p>
                  )}
                  {first && (
                    <p>
                      <span className="hand text-xl text-cherry">first try → </span>
                      <Inline text={first} />
                    </p>
                  )}
                  {h && (
                    <div className="flex flex-wrap items-center gap-5 text-sm">
                      <Link
                        to="/hobbies/$slug"
                        params={{ slug: h.slug }}
                        className="font-semibold text-cherry underline underline-offset-4"
                      >
                        Read the {h.name.toLowerCase()} guide
                      </Link>
                      <SaveButton
                        item={{
                          key: `hobby:${h.slug}`,
                          kind: "hobby",
                          title: h.name,
                          href: `/hobbies/${h.slug}`,
                        }}
                      />
                    </div>
                  )}
                </div>
              </details>
            )}
          </div>
        </section>
      );
    }
    case "whatYoullNeed":
      return (
        <Callout id="what-youll-need" heavy={heavy} label="What you'll need" icon={<ListChecks />}>
          <ul className="space-y-1">
            {b.essentials.map((e) => (
              <li key={e} className="flex gap-2 !pl-0 before:!hidden">
                <span aria-hidden className="text-cherry">
                  ✶
                </span>
                <span>
                  <Inline text={e} />
                </span>
              </li>
            ))}
          </ul>
          {b.optional && b.optional.length > 0 && (
            <details className="mt-3">
              <summary className="cursor-pointer text-sm font-semibold text-cherry">
                Nice to have ({b.optional.length})
              </summary>
              <ul className="mt-2 space-y-1">
                {b.optional.map((e) => (
                  <li key={e} className="flex gap-2 !pl-0 before:!hidden">
                    <span aria-hidden className="text-cherry">
                      ○
                    </span>
                    <span>
                      <Inline text={e} />
                    </span>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </Callout>
      );
    case "starterKit":
    case "shopHobby": {
      if (verified) return <ShopFold>{verified}</ShopFold>;
      const ps = productsFor(b.productIds);
      return (
        <ShopFold>
          <aside className="not-prose my-12 border-y-2 border-ink py-8">
            <p className="kicker text-cherry">Off Duty Essentials</p>
            <h3 className="mt-2 font-display text-3xl italic">
              {b.title ?? (b.type === "starterKit" ? "The Starter Kit" : "Shop the hobby")}
            </h3>
            {"dek" in b && b.dek && (
              <p className="mt-2 text-muted-foreground">
                <Inline text={b.dek} />
              </p>
            )}
            <div className="mt-6 grid gap-8 sm:grid-cols-2">
              {ps.map((p) => (
                <div key={p.id} data-fold-card>
                  <ProductCard p={p} />
                </div>
              ))}
            </div>
            <AffiliateNote className="mt-6" />
          </aside>
        </ShopFold>
      );
    }
    case "shopTheArticle":
      return (
        <ShopFold>
          <ShopTheArticle
            {...(b.articleSlug ? { article: b.articleSlug } : {})}
            {...(b.hobbies ? { hobbies: b.hobbies } : {})}
            {...(b.collection ? { collection: b.collection } : {})}
            {...(b.title ? { title: b.title } : {})}
            {...(b.dek ? { dek: b.dek } : {})}
          />
        </ShopFold>
      );
    case "shopMyHobby":
      return (
        <ShopFold>
          <ShopMyHobby
            hobby={b.hobby}
            {...(b.title ? { title: b.title } : {})}
            {...(b.dek ? { dek: b.dek } : {})}
          />
        </ShopFold>
      );
    case "saveSplurge":
      return (
        <Callout heavy={heavy} label="Save or splurge" icon={<PiggyBank />}>
          <p className="!mb-2">
            <strong className="text-garden">Save:</strong> <Inline text={b.save} />
          </p>
          <p className="!mb-0">
            <span className="inline-flex items-center gap-1 font-bold text-cherry">
              <Gem aria-hidden className="h-3.5 w-3.5" />
              Splurge:
            </span>{" "}
            <Inline text={b.splurge} />
          </p>
        </Callout>
      );
    case "tryThisWeekend":
      return (
        <Callout heavy={heavy} label="Try it this weekend" icon={<Sun />}>
          <p className="!mb-0">
            <Inline text={b.text} />
          </p>
        </Callout>
      );
    case "girlsNight":
      return (
        <Callout heavy={heavy} label="Make it a girls' night" icon={<Heart />}>
          <p className="!mb-0">
            <Inline text={b.text} />
          </p>
        </Callout>
      );
    case "noSpend":
      return (
        <Callout id="no-spend" heavy={heavy} label="No-spend alternative" icon={<Leaf />}>
          <p className="!mb-0">
            <Inline text={b.text} />
          </p>
        </Callout>
      );
    case "first30":
      return (
        <Callout id="first-30" heavy={heavy} label="Your first 30 minutes" icon={<Timer />}>
          <ol className="space-y-2">
            {b.steps.map((st, i) => (
              <li key={i} className="flex gap-3">
                <span
                  aria-hidden
                  className="w-5 shrink-0 font-display text-xl italic leading-tight text-cherry"
                >
                  {i + 1}
                </span>
                <span>
                  <Inline text={st} />
                </span>
              </li>
            ))}
          </ol>
        </Callout>
      );
    case "makePlan":
      return (
        <Callout heavy={heavy} label="Make it a plan" icon={<CalendarHeart />}>
          <p className="!mb-3 font-display text-xl leading-snug">
            <Inline text={b.text} />
          </p>
          <p className="!mb-0 flex flex-wrap gap-x-5 gap-y-1 text-sm font-semibold">
            <Link to="/hobby-finder" className="text-cherry underline underline-offset-4">
              Find Your Thing
            </Link>
            <Link to="/make-plans" className="text-cherry underline underline-offset-4">
              Let's Make Plans
            </Link>
          </p>
        </Callout>
      );
    case "ifYouLoved": {
      const hs = b.hobbies.map(getHobby).filter((x): x is NonNullable<typeof x> => !!x);
      return (
        <aside className="not-prose my-12" data-if-you-loved>
          <p className="hand flex items-center gap-2 text-2xl text-cherry">
            If you loved this, try… <Arrow className="h-5 w-10" />
          </p>
          <div className="photo-cards mt-4 grid grid-cols-3 gap-3 sm:gap-5">
            {hs.map((h) => (
              <HobbyCard key={h.slug} h={h} />
            ))}
          </div>
        </aside>
      );
    }
  }
}
