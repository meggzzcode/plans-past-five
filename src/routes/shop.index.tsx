import { createFileRoute } from "@tanstack/react-router";
import { collections, products } from "@/data/products";
import { seo } from "@/lib/seo";
import { PageHero, SectionHead } from "@/components/editorial/Section";
import { CollectionCard } from "@/components/cards/Cards";
import { AffiliateNote } from "@/components/editorial/AffiliateNote";

export const Route = createFileRoute("/shop/")({
  head: () =>
    seo({
      title: "Off Duty Essentials: Beginner Hobby Supplies",
      description: `${collections.length} curated collections of beginner hobby supply types for pottery, journaling, painting, tennis, reading, cozy nights in and little adventures.`,
      path: "/shop",
    }),
  component: Shop,
});

function Shop() {
  return (
    <>
      <PageHero
        kicker="The Shop"
        title="Off Duty Essentials"
        italic="Essentials"
        dek={`${products.length} product types that make starting a new hobby a little easier, across ${collections.length} collections. We describe what to look for rather than pushing one brand, and we'll always tell you when you don't need to buy anything at all.`}
        tone="strawberry"
      >
        <AffiliateNote className="mt-6 max-w-xl" />
      </PageHero>
      <section className="mx-auto mt-16 max-w-7xl px-5 md:px-8">
        <SectionHead kicker="The collections" title="Shop by your era" italic="era" />
        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((c) => (
            <CollectionCard key={c.slug} c={c} />
          ))}
        </div>
        <p className="mt-10 text-sm text-muted-foreground">
          {products.length} product types, not specific listings. There are no prices, ratings or
          brand claims, because those change and we haven't tested them.
        </p>
      </section>
    </>
  );
}
