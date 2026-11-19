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
      title: `${hobbies.length} Hobbies to Try After Work and on Weekends`,
      description: `Watercolor, mahjong, pickleball, crochet and ${hobbies.length - 4} more. Pick one for your evening, your budget and your mood, then see exactly what to buy and what to do first.`,
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
        kicker="Pick your next thing"
        title={`${hobbies.length} ways to be a beginner again.`}
        italic="beginner again."
        dek="Tap what sounds like you tonight. Every hobby comes with a realistic first session and a short list of what to buy."
        tone="butter"
      >
        <Link
          to="/hobby-finder"
          className="mt-8 inline-block bg-cherry px-6 py-3 text-sm font-semibold text-cream hover:bg-ink"
        >
          Not sure? Let the quiz pick for you →
        </Link>
      </PageHero>
      <section className="mx-auto mt-10 max-w-7xl px-5 md:px-8">
        <div className="py-4">
          <p className="mb-3 font-display text-xl italic">What does your week have room for?</p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter hobbies">
            {hobbyFilters.map((f) => (
              <button
                key={f.tag}
                onClick={() => toggle(f.tag)}
                aria-pressed={active.includes(f.tag)}
                className={cn(
                  "inline-flex min-h-11 shrink-0 items-center border px-3.5 py-1.5 text-sm font-medium transition",
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
                className="inline-flex min-h-11 shrink-0 items-center px-2 text-sm font-semibold text-cherry underline"
              >
                Clear
              </button>
            )}
          </div>
          <p className="mt-2 text-sm text-muted-foreground" aria-live="polite">
            Showing {list.length} {list.length === 1 ? "hobby" : "hobbies"} you could start this
            week
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
              Try dropping one filter. "Outdoors" and "at home" together is a tough ask.
            </p>
            <button
              onClick={() => setActive([])}
              className="mt-5 inline-flex min-h-11 items-center bg-cherry px-6 py-2 text-sm font-semibold text-cream hover:bg-ink"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}
