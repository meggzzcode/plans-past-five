import { Link } from "@tanstack/react-router";
import type { Category } from "@/data/categories";
import { hobbies } from "@/data/hobbies";
import { articles, articlesForCategory } from "@/content";
import { collections } from "@/data/products";
import { images } from "@/data/images";
import { Kicker, toneBg } from "@/components/editorial/Section";
import { cn } from "@/lib/utils";
import { ArticleCard, HobbyCard, CollectionCard } from "@/components/cards/Cards";

const collectionFor: Record<string, string[]> = {
  "after-hours": ["creative-girl", "bookish-girl", "girls-night-in"],
  weekends: ["little-adventures", "sporty-girl", "pottery-era"],
  "solo-dates": ["bookish-girl", "little-adventures", "creative-girl"],
  "better-together": ["girls-night-in", "pottery-era", "sporty-girl"],
  "creative-corner": ["pottery-era", "creative-girl", "girls-night-in"],
  movement: ["sporty-girl", "little-adventures", "bookish-girl"],
};

export function CategoryPage({ c }: { c: Category }) {
  const picked = c.featured
    .map((slug) => hobbies.find((h) => h.slug === slug))
    .filter((h): h is NonNullable<typeof h> => Boolean(h));
  const hs = picked.length
    ? picked.slice(0, 6)
    : hobbies.filter((h) => c.hobbyTags.some((t) => h.tags.includes(t))).slice(0, 6);
  const own = articlesForCategory(c.slug);
  const related = own.length
    ? own
    : articles.filter((a) => a.hobbies.some((s) => hs.some((h) => h.slug === s))).slice(0, 3);
  const img = images[c.image];
  const cols = collections.filter((x) => collectionFor[c.slug]?.includes(x.slug));
  return (
    <>
      <section className={cn("relative", toneBg[c.tone])}>
        <div className="mx-auto grid max-w-7xl md:grid-cols-[1.1fr_1fr] md:items-center">
          <div className="order-2 px-5 py-6 md:order-1 md:px-8 md:py-12">
            <Kicker>{c.kicker}</Kicker>
            <h1 className="mt-2 text-4xl leading-[1] md:text-6xl">{c.name}</h1>
            <p className="mt-3 max-w-md text-base text-espresso md:text-lg">{c.intro}</p>
          </div>
          <div className="relative order-1 aspect-[16/9] overflow-hidden bg-strawberry/50 md:order-2 md:aspect-[4/3]">
            <img
              src={img.src}
              alt={img.alt}
              width={img.w}
              height={img.h}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="gingham-strip opacity-70" />
      </section>
      {related.length > 0 && (
        <section className="mx-auto mt-10 max-w-7xl px-5 md:mt-14 md:px-8">
          <h2 className="text-3xl md:text-4xl">
            Start with a <em className="text-cherry">read</em>
          </h2>
          <div className="mt-5 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {related.slice(0, 3).map((a) => (
              <ArticleCard key={a.slug} a={a} />
            ))}
          </div>
        </section>
      )}
      <section className="mx-auto mt-12 max-w-7xl px-5 md:mt-16 md:px-8">
        <h2 className="text-3xl md:text-4xl">
          Pick one to <em className="text-cherry">try</em>
        </h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {hs.map((h) => (
            <HobbyCard key={h.slug} h={h} />
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link
            to="/make-plans"
            className="inline-flex min-h-11 items-center bg-cherry px-6 py-3 text-sm font-semibold text-cream hover:bg-ink"
          >
            Build my plan →
          </Link>
          <Link
            to="/hobbies"
            className="inline-flex min-h-11 items-center border-b-2 border-ink text-sm font-semibold text-ink"
          >
            See all {hobbies.length} hobbies
          </Link>
        </div>
      </section>
      <section className="mx-auto mt-12 max-w-7xl px-5 md:mt-16 md:px-8">
        <h2 className="text-3xl md:text-4xl">
          Shop the <em className="text-cherry">look</em>
        </h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          {cols.map((x) => (
            <CollectionCard key={x.slug} c={x} />
          ))}
        </div>
      </section>
    </>
  );
}
