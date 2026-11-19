import { createFileRoute } from "@tanstack/react-router";
import { articles } from "@/content";
import { seo } from "@/lib/seo";
import { PageHero } from "@/components/editorial/Section";
import { ArticleCard } from "@/components/cards/Cards";

export const Route = createFileRoute("/journal/")({
  head: () =>
    seo({
      title: "The Journal: Hobby Guides, Ideas & Weekend Plans",
      description:
        "Original, practical stories about hobbies, after-work plans, solo dates and friendships for women building a life outside work.",
      path: "/journal",
    }),
  component: Journal,
});

function Journal() {
  const [first, ...rest] = articles;
  return (
    <>
      <PageHero
        kicker="The Journal"
        title="Stories for the hours after five."
        italic="after five."
        dek="Hobby guides, honest beginner advice and plans worth putting on the calendar. New stories are added regularly."
        tone="strawberry"
      />
      <section className="mx-auto mt-16 max-w-7xl px-5 md:px-8">
        {first && <ArticleCard a={first} size="lg" className="mx-auto max-w-4xl" />}
        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {rest.map((a) => (
            <ArticleCard key={a.slug} a={a} />
          ))}
        </div>
      </section>
    </>
  );
}
