import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { hobbies, hobbyFilters } from "@/data/hobbies";
import { seo } from "@/lib/seo";
import { PageHero } from "@/components/editorial/Section";
import { HobbyCard } from "@/components/cards/Cards";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/hobbies/")({
  head: () =>
    seo({
      title: "Find a Hobby: 36 Hobbies to Try Outside Work",
      description:
        "A filterable directory of 36 beginner-friendly hobbies, sorted by time, cost, energy and whether you'd rather go solo or social.",
      path: "/hobbies",
    }),
  component: Directory,
});

function Directory() {
  const [active, setActive] = useState<string[]>([]);
  const list = useMemo(
    () => hobbies.filter((h) => active.every((t) => h.tags.includes(t))),
    [active],
  );
  const toggle = (t: string) =>
    setActive((a) => (a.includes(t) ? a.filter((x) => x !== t) : [...a, t]));
  return (
    <>
      <PageHero
        kicker="The hobby directory"
        title="Thirty-six ways to be a beginner again."
        italic="beginner again."
        dek="Filter by where, when, who with and how much energy you've got. Every hobby has a realistic first session, so you can start tonight."
        tone="butter"
      >
        <Link
          to="/hobby-finder"
          className="mt-8 inline-block bg-cherry px-6 py-3 text-sm font-semibold text-cream hover:bg-ink"
        >
          Or let the quiz choose →
        </Link>
      </PageHero>
      <section className="mx-auto mt-10 max-w-7xl px-5 md:px-8">
        <div className="sticky top-[104px] z-20 -mx-5 border-b border-border bg-background/95 px-5 py-4 backdrop-blur md:static md:mx-0 md:border-0 md:bg-transparent md:px-0">
          <div
            className="flex gap-2 overflow-x-auto pb-1 md:flex-wrap"
            role="group"
            aria-label="Filter hobbies"
          >
            {hobbyFilters.map((f) => (
              <button
                key={f.tag}
                onClick={() => toggle(f.tag)}
                aria-pressed={active.includes(f.tag)}
                className={cn(
                  "shrink-0 border px-3.5 py-1.5 text-sm font-medium transition",
                  active.includes(f.tag)
                    ? "border-cherry bg-cherry text-cream"
                    : "border-ink/25 bg-warm-white text-espresso hover:border-cherry",
                )}
              >
                {f.label}
              </button>
            ))}
            {active.length > 0 && (
              <button
                onClick={() => setActive([])}
                className="shrink-0 px-2 text-sm font-semibold text-cherry underline"
              >
                Clear
              </button>
            )}
          </div>
          <p className="mt-2 text-sm text-muted-foreground" aria-live="polite">
            {list.length} {list.length === 1 ? "hobby" : "hobbies"}
          </p>
        </div>
        <h2 className="sr-only">Hobbies</h2>
        {list.length ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((h) => (
              <HobbyCard key={h.slug} h={h} />
            ))}
          </div>
        ) : (
          <div className="mt-12 bg-strawberry p-10 text-center">
            <p className="font-display text-3xl italic">Nothing matches all of those at once.</p>
            <p className="mt-2 text-espresso">
              Try removing a filter or two. "Outdoors" and "at home" together is a tough ask.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
