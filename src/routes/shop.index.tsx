import { createFileRoute, Link } from "@tanstack/react-router";
import { collections, collectionKitIds } from "@/data/products";
import { verifiedCatalog, type CatalogProduct } from "@/data/catalog";
import { fillKit, getKit, isFullKit } from "@/data/kits";
import { seo } from "@/lib/seo";
import { PageHero, SectionHead } from "@/components/editorial/Section";
import { CollectionCard } from "@/components/cards/Cards";
import { ProductCard, ShopDisclosure } from "@/components/commerce/ProductCard";
import { NAMES } from "@/components/layout/nav";

export const Route = createFileRoute("/shop/")({
  head: () =>
    seo({
      title: "Shop Your Hobby: Starter Picks for Your Next Evening Plan",
      description:
        "Starter picks for pottery, journaling, painting, tennis, mahjong and more. One good thing to buy first, why it made the list, and an honest note when you can skip it. Ordinary Amazon links, no prices shown.",
      path: "/shop",
    }),
  component: Shop,
});

/** Honest, data-driven label for a collection tile: how many starter kits actually have picks. */
function tagFor(slug: string) {
  const ids = collectionKitIds(slug);
  const kitCount = ids.filter((id) => {
    const kit = getKit(id);
    return !!kit && isFullKit(fillKit(kit, verifiedCatalog), kit);
  }).length;
  if (kitCount > 0) return kitCount === 1 ? "Starter kit inside" : `${kitCount} starter kits`;
  const named =
    ids.some((id) => {
      const kit = getKit(id);
      return !!kit && fillKit(kit, verifiedCatalog).length > 0;
    }) || verifiedCatalog.some((p) => p.collections.includes(slug));
  return named
    ? "Where to start: a few named picks"
    : "Where to start: guides and what to look for";
}

/** The "start here" picks: the one-pick of three different kits, in catalog order. */
function startHere(): CatalogProduct[] {
  const seen = new Set<string>();
  const out: CatalogProduct[] = [];
  for (const p of verifiedCatalog) {
    const kit = p.kitSlots[0]?.kit;
    if (!p.onlyOne || !kit || seen.has(kit)) continue;
    seen.add(kit);
    out.push(p);
  }
  return out.slice(0, 3);
}

/** Boxed sets with everything in one box: the honest basis for a "first evening" gift row. */
function giftSets(exclude: CatalogProduct[]): CatalogProduct[] {
  const skip = new Set(exclude.map((p) => p.id));
  const seen = new Set<string>();
  const out: CatalogProduct[] = [];
  for (const p of verifiedCatalog) {
    if (p.role !== "complete-kit" || skip.has(p.id)) continue;
    const kit = p.kitSlots[0]?.kit ?? p.id;
    if (seen.has(kit)) continue;
    seen.add(kit);
    out.push(p);
  }
  return out.slice(0, 3);
}

function Shop() {
  const picks = startHere();
  const gifts = giftSets(picks);
  return (
    <>
      <PageHero
        kicker="Supplies for your first evening"
        title="Start the hobby. Buy one thing."
        italic="one thing"
        dek="Pick the evening you want. We'll tell you the one thing to buy first, why it made the list, and what you can skip or borrow. Ordinary Amazon links, no prices, no pressure."
        tone="strawberry"
      >
        <p className="mt-4 text-sm text-ink">
          We read each Amazon page ourselves before a product goes on a list.{" "}
          <Link to="/methodology" className="underline">
            How we choose
          </Link>
        </p>
      </PageHero>
      <section className="mx-auto mt-16 max-w-7xl px-5 md:px-8">
        <SectionHead kicker="Pick your evening" title="Which era are you in?" italic="era" />
        <p className="mt-3 text-espresso">
          Not sure?{" "}
          <Link to="/hobby-finder" className="font-semibold text-cherry underline">
            Take the {NAMES.quiz} quiz
          </Link>{" "}
          and we'll point you to one.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-10">
          {collections.map((c) => (
            <CollectionCard key={c.slug} c={c} tag={tagFor(c.slug)} />
          ))}
        </div>
      </section>
      {picks.length > 0 && (
        <section className="mx-auto mt-20 max-w-7xl px-5 md:px-8" aria-label="Start here">
          <SectionHead kicker="Start here" title="Three good first buys" italic="first buys" />
          <p className="mt-3 max-w-prose text-espresso">
            One pick each from our starter kits, with the reason it made the list.
          </p>
          <ShopDisclosure kind="short" className="mt-3" />
          <div className="mt-8 grid gap-10 md:grid-cols-3">
            {picks.map((p) => (
              <ProductCard key={p.id} product={p} placement="shop-start" label="Our one pick" />
            ))}
          </div>
        </section>
      )}
      {gifts.length > 0 && (
        <section className="mx-auto mt-20 max-w-7xl px-5 md:px-8" aria-label="Give a first evening">
          <SectionHead
            kicker="Gifting"
            title="Give someone a first evening"
            italic="first evening"
          />
          <p className="mt-3 max-w-prose text-espresso">
            Boxed sets she can open and start tonight, with everything in the one box.
          </p>
          <div className="mt-8 grid gap-10 md:grid-cols-3">
            {gifts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                placement="shop-gift"
                label="Everything in one box"
              />
            ))}
          </div>
        </section>
      )}
      <section className="mx-auto mb-20 mt-12 max-w-7xl px-5 md:px-8">
        <p className="text-sm text-muted-foreground">
          Buttons that say "See it on Amazon" open that product's own page. Where we only describe
          what to look for, the button opens an Amazon search. We never show prices, ratings or
          review counts: Amazon sets those.{" "}
          <Link to="/methodology" className="underline">
            How we choose
          </Link>{" "}
          /{" "}
          <Link to="/affiliate-disclosure" className="underline">
            How links work
          </Link>
          .
        </p>
      </section>
    </>
  );
}
