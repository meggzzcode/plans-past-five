import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getCollection, collections } from "@/data/products";
import { verifiedCatalog, selectProducts } from "@/data/catalog";
import { collectionGuide } from "@/lib/collection-guide";
import { images } from "@/data/images";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";
import { ProductCard, CollectionCard, ArticleCard } from "@/components/cards/Cards";
import { AffiliateNote } from "@/components/editorial/AffiliateNote";
import { Kicker, toneBg } from "@/components/editorial/Section";
import { StarterKit } from "@/components/commerce/StarterKit";
import { getKit, fillKit } from "@/data/kits";
import { ShopMyHobby } from "@/components/commerce/ShopMyHobby";
import { cn } from "@/lib/utils";

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
    return seo({ title: `${c.name}: ${c.dek}`, description: c.intro, path: `/shop/${c.slug}` });
  },
  component: CollectionPage,
});

function CollectionPage() {
  const { slug } = Route.useLoaderData();
  const c = getCollection(slug)!;
  const img = images[c.image];
  const g = collectionGuide(c.slug);
  const hasKit = g.kitIds.some((id) => {
    const kit = getKit(id);
    return !!kit && fillKit(kit, verifiedCatalog).length > 0;
  });
  const ps = g.products;
  const verified = selectProducts({ collection: c.slug }, verifiedCatalog).all.length > 0;
  return (
    <>
      <section className={cn(toneBg[c.tone])}>
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 md:grid-cols-2 md:px-8 md:py-16">
          <div>
            <nav className="text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link to="/shop" className="hover:text-cherry">
                Off Duty Essentials
              </Link>{" "}
              / {c.name}
            </nav>
            <Kicker className="mt-6">Off Duty Essentials</Kicker>
            <h1 className="mt-3 text-5xl italic leading-[1] md:text-7xl">{c.name}</h1>
            <p className="mt-5 max-w-lg text-lg text-ink">{c.intro}</p>
            <AffiliateNote className="mt-6" />
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
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pt-16 md:grid-cols-2 md:px-8">
        <div className="prose-editorial">
          <h2 className="!mt-0">Who this collection is for</h2>
          <p>{g.whoFor}</p>
          <p>{c.dek}.</p>
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
      <section className="mx-auto max-w-7xl px-5 pt-14 md:px-8">
        <h2 className="text-3xl italic">Essentials, upgrades and budget-friendly options</h2>
        <div className="mt-6 grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-display text-xl">Essentials</h3>
            <ul className="mt-3 space-y-1.5 text-ink">
              {g.essentials.map((x) => (
                <li key={x}>
                  <span className="text-cherry">✶</span> {x}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-xl italic">Optional upgrades</h3>
            <ul className="mt-3 space-y-1.5 text-sm text-espresso">
              {g.upgrades.map((x) => (
                <li key={x}>○ {x}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-xl">If you would rather not spend</h3>
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
            These are product types, not specific listings. We describe what to look for, and the
            buttons open an ordinary Amazon search so you can compare options yourself.
          </p>
        )}
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <h2 className="mb-8 text-3xl italic">What to look for</h2>
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {ps.map((p, i) => (
            <ProductCard key={p.id} p={p} index={i} />
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Show starter kits when verified products fill them; otherwise the collection list. Never both, so no product appears twice. */}
        {hasKit ? (
          g.kitIds.map((id) => <StarterKit key={id} kit={id} />)
        ) : (
          <ShopMyHobby collection={c.slug} title={`Shop ${c.name}`} />
        )}
        <p className="kicker text-cherry">Hobby guides this collection supports</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {g.hobbies.map((h) => (
            <Link
              key={h.slug}
              to="/hobbies/$slug"
              params={{ slug: h.slug }}
              className="border border-ink/25 bg-warm-white px-4 py-2 text-sm font-medium hover:border-cherry hover:text-cherry"
            >
              {h.name}
            </Link>
          ))}
        </div>
        {g.articles.length > 0 && (
          <>
            <h2 className="mt-16 text-3xl italic">Read before you buy</h2>
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
