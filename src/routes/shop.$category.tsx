import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getCollection, collections, collectionKitIds } from "@/data/products";
import { verifiedCatalog, selectProducts } from "@/data/catalog";
import { collectionGuide } from "@/lib/collection-guide";
import { images } from "@/data/images";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";
import { ProductCard, CollectionCard, ArticleCard } from "@/components/cards/Cards";
import { Kicker, toneBg } from "@/components/editorial/Section";
import { StarterKit } from "@/components/commerce/StarterKit";
import { ShopDisclosure } from "@/components/commerce/ProductCard";
import { getKit, fillKit } from "@/data/kits";
import { dedupeListGroups } from "@/lib/shoplist";
import { ShopMyHobby } from "@/components/commerce/ShopMyHobby";
import { cn } from "@/lib/utils";

/** Two specific lines per collection: who it is for, in her voice. */
const WHO_FOR: Record<string, string> = {
  "pottery-era":
    "For the girl who wants pottery-class energy on a Tuesday. You'll shape something lumpy, paint it, and keep it. Lumpy is the point.",
  "creative-girl":
    "For quiet evenings with something in your hands: a page to fill, a brush to try, a few stitches while a podcast plays. Starter supplies, small enough to put away after.",
  "sporty-girl":
    "For the girl who wants a standing Saturday rally, not a gym membership. Start with a borrowed racket if you can; buy once you know you're coming back.",
  "girls-night-in":
    "For the group chat that keeps saying 'we should hang out'. Pick a game or a canvas, send one message, and it's on the calendar.",
  "bookish-girl":
    "For one-more-chapter people who want reading to feel like an evening plan. Light, a notebook, a bookmark you love.",
  "little-adventures": "For the afternoon you almost said no to. Pack small, carry light, go.",
  "journaling-era": "For the girl who keeps every ticket stub. Glue, tape, layer: no wrong way.",
  "cozy-after-hours":
    "For the weeknight you actually have: tired, a little hungry, wanting something nice to do with your hands. Low effort, high candle.",
};

/** What the page is about, as the kicker above the name. */
const KICKER: Record<string, string> = {
  "pottery-era": "Your pottery evening",
  "creative-girl": "Your quiet creative evening",
  "sporty-girl": "Your golden-hour plan",
  "girls-night-in": "Your night in",
  "bookish-girl": "Your reading evening",
  "little-adventures": "Your afternoon out",
  "journaling-era": "Your journaling evening",
  "cozy-after-hours": "Your cozy weeknight",
};

export const Route = createFileRoute("/shop/$category")({
  loader: ({ params }) => {
    const c = getCollection(params.category);
    if (!c) throw notFound();
    return { slug: c.slug };
  },
  head: ({ loaderData }) => {
    const c = loaderData ? getCollection(loaderData.slug) : undefined;
    if (!c)
      return {
        meta: [
          { title: `Collection not found | ${site.name}` },
          { name: "robots", content: "noindex" },
        ],
      };
    return seo({
      title: `${c.name}: ${c.dek}`,
      description: c.intro,
      path: `/shop/${c.slug}`,
    });
  },
  component: CollectionPage,
});

function CollectionPage() {
  const { slug } = Route.useLoaderData();
  const c = getCollection(slug)!;
  const img = images[c.image];
  const g = collectionGuide(c.slug);
  const kitIds = collectionKitIds(c.slug);
  const hasKit = kitIds.some((id) => {
    const kit = getKit(id);
    return !!kit && fillKit(kit, verifiedCatalog).length > 0;
  });
  const ps = g.products;
  const [needNow = [], needLater = []] = dedupeListGroups([g.essentials, g.upgrades]).map((xs) =>
    xs.slice(0, 4),
  );
  const verified = selectProducts({ collection: c.slug }, verifiedCatalog).all.length > 0;
  return (
    <>
      <section className={cn(toneBg[c.tone])}>
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 md:grid-cols-2 md:px-8 md:py-16">
          <div>
            <nav className="text-xs text-ink" aria-label="Breadcrumb">
              <Link to="/shop" className="hover:text-cherry">
                Shop your hobby
              </Link>{" "}
              / {c.name}
            </nav>
            <Kicker className="mt-6">{KICKER[c.slug] ?? "Shop your hobby"}</Kicker>
            <h1 className="mt-3 text-5xl italic leading-[1] md:text-7xl">{c.name}</h1>
            <p className="mt-5 max-w-lg text-lg text-ink">{c.intro}</p>
            <ShopDisclosure kind="short" className="mt-6 text-ink" />
          </div>
          <div className="postcard -rotate-2">
            <div className="aspect-square overflow-hidden">
              <img
                src={img.src}
                alt={img.alt}
                width={img.w}
                height={img.h}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="hand absolute bottom-2 left-4 text-lg text-cherry">
              illustrative styling, not specific products
            </p>
          </div>
        </div>
      </section>
      {/* The picks come first: with a filled kit, the kit; otherwise the collection's named products. */}
      {(hasKit || verified) && (
        <section className="mx-auto max-w-7xl px-5 md:px-8" aria-label="The picks">
          {hasKit ? (
            kitIds.map((id) => <StarterKit key={id} kit={id} currentCollection={c.slug} />)
          ) : (
            <ShopMyHobby collection={c.slug} title={`Start here: ${c.name}`} />
          )}
        </section>
      )}
      {/* No named, verified product yet: say so, and point to the finished guides instead. */}
      {!hasKit && !verified && (
        <section
          className="mx-auto mt-12 max-w-7xl px-5 md:px-8"
          aria-label="Where to start: guides and what to look for"
          data-where-to-start
        >
          <div className="border-y-2 border-ink py-8">
            <p className="kicker text-cherry">Where to start</p>
            <h2 className="mt-2 text-3xl italic">Where to start: guides and what to look for</h2>
            <p className="mt-2 max-w-prose text-espresso">
              We have not named verified products for this collection yet, because we only name a
              product once we have read its Amazon page. Until then, start with the guides below,
              then use the lists on this page to know what to look for.
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {g.hobbies.slice(0, 4).map((h) => (
                <li key={h.slug}>
                  <Link
                    to="/hobbies/$slug"
                    params={{ slug: h.slug }}
                    className="font-semibold text-cherry underline underline-offset-4"
                  >
                    How your first {h.name.toLowerCase()} session goes
                  </Link>
                </li>
              ))}
              {g.articles.map((a) => (
                <li key={a.slug}>
                  <Link
                    to="/journal/$slug"
                    params={{ slug: a.slug }}
                    className="font-semibold text-cherry underline underline-offset-4"
                  >
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pt-12 md:grid-cols-2 md:px-8">
        <div className="prose-editorial">
          <h2 className="!mt-0">Who this is for</h2>
          <p>{WHO_FOR[c.slug] ?? g.whoFor}</p>
        </div>
        <div>
          <h2 className="font-display text-3xl italic">What these hobbies involve</h2>
          <ul className="mt-4 space-y-4">
            {g.hobbies.slice(0, 3).map((h) => (
              <li key={h.slug}>
                <Link
                  to="/hobbies/$slug"
                  params={{ slug: h.slug }}
                  className="font-semibold text-cherry underline underline-offset-4"
                >
                  {h.name}
                </Link>
                <p className="text-sm text-espresso">
                  {h.description} First session: {h.timeLabel}. To start: {h.costLabel}.
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      {!hasKit && (
        <section className="mx-auto max-w-7xl px-5 pt-14 md:px-8">
          <h2 className="text-3xl italic">What you actually need</h2>
          <div className="mt-6 grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="font-display text-xl">Start with</h3>
              <ul className="mt-3 space-y-1.5 text-ink">
                {needNow.map((x) => (
                  <li key={x}>
                    <span className="text-cherry">✶</span> {x}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-xl italic">Pretty extras for later</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-espresso">
                {needLater.map((x) => (
                  <li key={x}>○ {x}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-xl">Already have it? Skip it.</h3>
              {g.budget.length > 0 ? (
                <ul className="mt-3 space-y-2 text-sm text-espresso">
                  {g.budget.map((b) => (
                    <li key={b.name}>
                      <strong>{b.name}:</strong> {b.text}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-espresso">
                  Borrow, swap or use what is already at home before buying anything new.
                </p>
              )}
            </div>
          </div>
          {!verified && (
            <p className="mt-8 border-l-4 border-cherry bg-butter/40 px-4 py-3 text-sm text-ink">
              No named picks here yet: we only name a product once we've read its Amazon page. Until
              then, here is exactly what to look for. Each button opens an Amazon search so you can
              compare for yourself.
            </p>
          )}
        </section>
      )}
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-14 md:px-8">
        {/* With named picks on the page, the type-level search cards fold away so they do not compete. */}
        {verified || hasKit ? (
          <details className="group">
            <summary className="min-h-11 cursor-pointer text-base font-semibold text-espresso">
              More ideas, by product type
            </summary>
            <div className="mt-6 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {ps.map((p, i) => (
                <ProductCard key={p.id} p={p} index={i} />
              ))}
            </div>
            <ShopDisclosure kind="general" className="mt-6" />
          </details>
        ) : (
          <>
            <h2 className="mb-2 text-3xl italic">What to look for</h2>
            <p className="mb-8 max-w-prose text-sm text-espresso">
              These are types of product, not verified picks. Each button opens an Amazon search.
            </p>
            <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {ps.map((p, i) => (
                <ProductCard key={p.id} p={p} index={i} />
              ))}
            </div>
            <ShopDisclosure kind="general" className="mt-8" />
          </>
        )}
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <p className="kicker text-cherry">Hobby guides this collection supports</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {g.hobbies.map((h) => (
            <Link
              key={h.slug}
              to="/hobbies/$slug"
              params={{ slug: h.slug }}
              className="inline-flex min-h-11 items-center border border-ink/25 bg-warm-white px-4 py-2 text-sm font-medium hover:border-cherry hover:text-cherry"
            >
              {h.name}
            </Link>
          ))}
        </div>
        {g.articles.length > 0 && (
          <>
            <h2 className="mt-16 text-3xl italic">Read first, then shop</h2>
            <div className="mt-6 grid gap-10 md:grid-cols-3">
              {g.articles.map((a) => (
                <ArticleCard key={a.slug} a={a} />
              ))}
            </div>
          </>
        )}
        <h2 className="mt-20 text-3xl italic">More collections</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {collections
            .filter((x) => x.slug !== c.slug)
            .map((x) => (
              <CollectionCard key={x.slug} c={x} />
            ))}
        </div>
      </section>
    </>
  );
}
