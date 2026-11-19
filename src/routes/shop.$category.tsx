import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { getCollection, collectionKitIds } from "@/data/products";
import { isCollectionLive, liveCollections } from "@/data/collection-status";
import { redirectFor } from "@/config/redirects";
import { verifiedCatalog, selectProducts } from "@/data/catalog";
import { collectionGuide } from "@/lib/collection-guide";
import { images } from "@/data/images";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";
import { CollectionCard, ArticleCard } from "@/components/cards/Cards";
import { Kicker, toneBg } from "@/components/editorial/Section";
import { StarterKit } from "@/components/commerce/StarterKit";
import { getKit, fillKit } from "@/data/kits";
import { dedupeListGroups } from "@/lib/shoplist";
import { ShopMyHobby } from "@/components/commerce/ShopMyHobby";
import { cn } from "@/lib/utils";

/** Two specific lines per collection: who it is for, in her voice. */
const WHO_FOR: Record<string, string> = {
  paper:
    "For the girl who keeps every ticket stub. A page to fill, glue, tape, a pen you like: layer it up, there is no wrong way.",
  creative:
    "For quiet evenings with something in your hands: a brush to try, a lump of clay, a few stitches while a podcast plays. Starter supplies, small enough to put away after. Lumpy is the point.",
  cozy: "For the weeknight you actually have: tired, a little hungry, wanting something nice to do with your hands or your eyes. Low effort, high candle.",
  hosting:
    "For the group chat that keeps saying 'we should hang out'. Pick a game or a canvas, send one message, and it's on the calendar.",
  sporty:
    "For the girl who wants a standing Saturday rally, not a gym membership. Start with a borrowed racket if you can; buy once you know you're coming back.",
  "little-adventures": "For the afternoon you almost said no to. Pack small, carry light, go.",
};

/** What the page is about, as the kicker above the name. */
const KICKER: Record<string, string> = {
  paper: "Your journaling evening",
  creative: "Your quiet creative evening",
  cozy: "Your cozy weeknight",
  hosting: "Your night in",
  sporty: "Your golden-hour plan",
  "little-adventures": "Your afternoon out",
};

export const Route = createFileRoute("/shop/$category")({
  // A retired collection slug (the eight earlier names) is a permanent 301 to its new home. The
  // list lives in src/config/redirects.ts; public/_redirects mirrors it for the host.
  beforeLoad: ({ params }) => {
    const r = redirectFor(`/shop/${params.category}`);
    if (r)
      throw redirect({
        to: "/shop/$category",
        params: { category: r.to.split("/").pop()! },
        statusCode: 301,
      });
  },
  loader: ({ params }) => {
    const c = getCollection(params.category);
    if (!c) throw notFound();
    // Shown only with something real to show (src/data/collection-status.ts); otherwise a short note.
    return { slug: c.slug, live: isCollectionLive(c.slug) };
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
    // Not shown anywhere else either (shop index, sitemap, search), and never indexed.
    const live = isCollectionLive(c.slug);
    return seo({
      title: live ? `${c.name}: Shop Your Hobby` : `${c.name}: coming soon`,
      description: c.intro,
      path: `/shop/${c.slug}`,
      ...(live ? {} : { noindex: true }),
    });
  },
  component: CollectionPage,
});

/** A collection with no shown product and no complete kit: a short, noindex note, never a page of nothing. */
function ComingSoon({ slug }: { slug: string }) {
  const c = getCollection(slug)!;
  const g = collectionGuide(c.slug);
  const live = liveCollections();
  return (
    <section
      className={cn("px-5 py-14 md:px-8", toneBg[c.tone])}
      aria-label="Coming soon"
      data-coming-soon
    >
      <div className="mx-auto max-w-3xl">
        <nav className="text-xs text-ink" aria-label="Breadcrumb">
          <Link to="/shop" className="hover:text-cherry">
            Shop your hobby
          </Link>{" "}
          / {c.name}
        </nav>
        <Kicker className="mt-6">Coming soon</Kicker>
        <h1 className="mt-3 text-4xl italic leading-[1] md:text-6xl">{c.name}</h1>
        <p className="mt-2 font-semibold text-ink">{c.label}</p>
        <p className="mt-5 max-w-prose text-lg text-ink">
          Nothing to show here yet. We only name a product once we have read its Amazon page, and
          none for this collection has passed yet. It will appear by itself when one does.
        </p>
        <ul className="mt-6 space-y-2">
          {g.hobbies.slice(0, 3).map((h) => (
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
          {live.length > 0 && (
            <li>
              <Link to="/shop" className="font-semibold text-cherry underline underline-offset-4">
                See what is on the shop now
              </Link>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}

function CollectionPage() {
  const { slug, live } = Route.useLoaderData();
  if (!live) return <ComingSoon slug={slug} />;
  const c = getCollection(slug)!;
  const img = images[c.image];
  const g = collectionGuide(c.slug);
  const kitIds = collectionKitIds(c.slug);
  const hasKit = kitIds.some((id) => {
    const kit = getKit(id);
    return !!kit && fillKit(kit, verifiedCatalog).length > 0;
  });
  const [needNow = [], needLater = []] = dedupeListGroups([g.essentials, g.upgrades]).map((xs) =>
    xs.slice(0, 4),
  );
  const others = liveCollections().filter((x) => x.slug !== c.slug);
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
            <p className="mt-2 font-semibold text-ink">{c.label}</p>
            <p className="mt-4 max-w-lg text-lg text-ink">{c.intro}</p>
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
            kitIds.map((id) => (
              <StarterKit key={id} kit={id} currentCollection={c.slug} headingAs="h2" />
            ))
          ) : (
            <ShopMyHobby collection={c.slug} title={`Start here: ${c.name}`} headingAs="h2" />
          )}
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
              <p className="mt-3 text-sm text-espresso">
                Borrow, swap or use what is already at home before buying anything new.
              </p>
            </div>
          </div>
        </section>
      )}
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
        {others.length > 0 && (
          <>
            <h2 className="mt-20 text-3xl italic">More collections</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-3 lg:grid-cols-4">
              {others.map((x) => (
                <CollectionCard key={x.slug} c={x} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
