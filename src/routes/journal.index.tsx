import { createFileRoute, Link } from "@tanstack/react-router";
import { articles } from "@/content";
import { seo } from "@/lib/seo";
import { PageHero } from "@/components/editorial/Section";
import { ArticleCard } from "@/components/cards/Cards";
import { sectionNav } from "@/components/layout/nav";

export const Route = createFileRoute("/journal/")({
  head: () =>
    seo({
      title: "The Journal: Hobby Guides and Weekend Plans",
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
      <section className="mx-auto mt-10 max-w-7xl px-5 md:px-8" aria-labelledby="by-mood">
        <h2 id="by-mood" className="kicker text-cherry">
          Browse by mood
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {sectionNav.map((n) => (
            <li key={n.to}>
              <Link
                to={n.to}
                className="inline-flex min-h-11 items-center gap-2 border border-ink/25 bg-warm-white px-3.5 text-sm font-medium text-espresso hover:border-cherry hover:text-cherry"
              >
                <n.Icon className="h-4 w-4 text-cherry" />
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="mx-auto mt-12 max-w-7xl px-5 md:px-8">
        <h2 className="sr-only">All stories</h2>
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
