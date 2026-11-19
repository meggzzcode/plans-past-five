import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getCollection, collections, products } from "@/data/products";
import { getHobby } from "@/data/hobbies";
import { images } from "@/data/images";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";
import { ProductCard, CollectionCard } from "@/components/cards/Cards";
import { AffiliateNote } from "@/components/editorial/AffiliateNote";
import { Kicker, toneBg } from "@/components/editorial/Section";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/shop/$category")({
  loader: ({ params }) => {
    const c = getCollection(params.category);
    if (!c) throw notFound();
    return { slug: c.slug };
  },
  head: ({ loaderData }) => {
    const c = loaderData ? getCollection(loaderData.slug) : undefined;
    if (!c) return { meta: [{ title: `Collection not found | ${site.name}` }, { name: "robots", content: "noindex" }] };
    return seo({ title: `${c.name}: ${c.dek}`, description: c.intro, path: `/shop/${c.slug}` });
  },
  component: CollectionPage,
});

function CollectionPage() {
  const { slug } = Route.useLoaderData();
  const c = getCollection(slug)!;
  const img = images[c.image];
  const ps = products.filter((p) => p.collection === c.slug);
  const hobbySlugs = [...new Set(ps.flatMap((p) => p.hobbySlugs))].slice(0, 6);
  return (
    <>
      <section className={cn(toneBg[c.tone])}>
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 md:grid-cols-2 md:px-8 md:py-16">
          <div>
            <nav className="text-xs text-muted-foreground" aria-label="Breadcrumb"><Link to="/shop" className="hover:text-cherry">Off Duty Essentials</Link> / {c.name}</nav>
            <Kicker className="mt-6">Off Duty Essentials</Kicker>
            <h1 className="mt-3 text-5xl italic leading-[1] md:text-7xl">{c.name}</h1>
            <p className="mt-5 max-w-lg text-lg text-ink">{c.intro}</p>
            <AffiliateNote className="mt-6" />
          </div>
          <div className="postcard -rotate-2"><div className="aspect-square overflow-hidden"><img src={img.src} alt={img.alt} width={img.w} height={img.h} className="h-full w-full object-cover" /></div><p className="hand absolute bottom-2 left-4 text-lg text-cherry">illustrative styling, not specific products</p></div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{ps.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}</div>
      </section>
      <section className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="kicker text-cherry">Hobbies this collection supports</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {hobbySlugs.map((s) => { const h = getHobby(s); return h ? <Link key={s} to="/hobbies/$slug" params={{ slug: s }} className="border border-ink/25 bg-warm-white px-4 py-2 text-sm font-medium hover:border-cherry hover:text-cherry">{h.name}</Link> : null; })}
        </div>
        <h2 className="mt-20 text-3xl italic">More collections</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3 lg:grid-cols-5">{collections.filter((x) => x.slug !== c.slug).map((x) => <CollectionCard key={x.slug} c={x} />)}</div>
      </section>
    </>
  );
}
