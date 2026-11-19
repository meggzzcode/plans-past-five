import { Link } from "@tanstack/react-router";
import type { Category } from "@/data/categories";
import { hobbies } from "@/data/hobbies";
import { articles, articlesForCategory } from "@/content";
import { collections } from "@/data/products";
import { images } from "@/data/images";
import { PageHero, SectionHead } from "@/components/editorial/Section";
import { ArticleCard, HobbyCard, CollectionCard } from "@/components/cards/Cards";
import { Divider } from "@/components/brand/Doodles";

const collectionFor: Record<string, string[]> = {
  "after-hours": ["creative-girl", "bookish-girl", "girls-night-in"],
  weekends: ["little-adventures", "sporty-girl", "pottery-era"],
  "solo-dates": ["bookish-girl", "little-adventures", "creative-girl"],
  "better-together": ["girls-night-in", "pottery-era", "sporty-girl"],
  "creative-corner": ["pottery-era", "creative-girl", "girls-night-in"],
  movement: ["sporty-girl", "little-adventures", "bookish-girl"],
};

export function CategoryPage({ c }: { c: Category }) {
  const hs = hobbies.filter((h) => c.hobbyTags.some((t) => h.tags.includes(t))).slice(0, 9);
  const own = articlesForCategory(c.slug);
  const related = own.length ? own : articles.filter((a) => a.hobbies.some((s) => hs.some((h) => h.slug === s))).slice(0, 3);
  const img = images[c.image];
  const cols = collections.filter((x) => collectionFor[c.slug]?.includes(x.slug));
  return (
    <>
      <PageHero kicker={c.kicker} title={c.name} dek={c.intro} tone={c.tone === "cream" ? "butter" : c.tone} />
      <section className="mx-auto -mt-2 max-w-7xl px-5 md:px-8">
        <div className="aspect-[21/9] overflow-hidden"><img src={img.src} alt={img.alt} width={img.w} height={img.h} className="h-full w-full object-cover" /></div>
      </section>
      {related.length > 0 && (
        <section className="mx-auto mt-20 max-w-7xl px-5 md:px-8">
          <SectionHead kicker="From The Journal" title="Read this first" italic="first" />
          <div className="mt-10 grid gap-10 md:grid-cols-3">{related.map((a) => <ArticleCard key={a.slug} a={a} />)}</div>
        </section>
      )}
      <section className="mx-auto mt-20 max-w-7xl px-5 md:px-8">
        <Divider label="Hobbies to try" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{hs.map((h) => <HobbyCard key={h.slug} h={h} />)}</div>
        <div className="mt-8 flex flex-wrap gap-5">
          <Link to="/hobbies" className="border-b-2 border-cherry pb-0.5 text-sm font-semibold text-cherry">See the full hobby directory</Link>
          <Link to="/make-plans" className="border-b-2 border-ink pb-0.5 text-sm font-semibold text-ink">Make a plan from these →</Link>
        </div>
      </section>
      <section className="mx-auto mt-20 max-w-7xl px-5 md:px-8">
        <SectionHead kicker="Off Duty Essentials" title="Supplies for this kind of fun" />
        <div className="mt-8 grid gap-6 sm:grid-cols-3">{cols.map((x) => <CollectionCard key={x.slug} c={x} />)}</div>
      </section>
    </>
  );
}
