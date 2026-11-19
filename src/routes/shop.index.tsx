import { createFileRoute } from "@tanstack/react-router";
import { collections, products } from "@/data/products";
import { seo } from "@/lib/seo";
import { PageHero, SectionHead } from "@/components/editorial/Section";
import { CollectionCard } from "@/components/cards/Cards";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/shop/")({
  head: () =>
    seo({
      title: "Shop Your Hobby: Beginner Starter Picks",
      description: `${collections.length} collections of starter picks for pottery, journaling, painting, tennis, reading, cozy nights in and little adventures: a few named products where we have checked the listing, plain guidance everywhere else.`,
      path: "/shop",
    }),
  component: Shop,
});

function Shop() {
  return (
    <>
      <PageHero
        kicker="Off Duty Essentials"
        title="Shop your hobby"
        italic="hobby"
        dek={`Starter picks for ${collections.length} kinds of after-work evening. Where we name a product, we checked its Amazon page and say why it made the list; everywhere else we tell you what to look for. And we'll always say when you don't need to buy anything.`}
        tone="strawberry"
      />
      <section className="mx-auto mt-16 max-w-7xl px-5 md:px-8">
        <SectionHead kicker="The collections" title="Shop by your era" italic="era" />
        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((c) => (
            <CollectionCard key={c.slug} c={c} />
          ))}
        </div>
        <p className="mt-10 text-sm text-muted-foreground">
          Named products link to their own Amazon page; "what to look for" guidance across{" "}
          {products.length} product types opens an Amazon search instead. We never show prices,
          ratings or review counts. How we choose is on the{" "}
          <Link to="/methodology" className="underline">
            methodology page
          </Link>
          , and how links work is in the{" "}
          <Link to="/affiliate-disclosure" className="underline">
            affiliate disclosure
          </Link>
          .
        </p>
      </section>
    </>
  );
}
