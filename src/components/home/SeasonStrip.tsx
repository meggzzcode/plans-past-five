import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { MONTHS, SEASON_COPY, seasonOf, seasonalHobbies } from "@/lib/season";
import { SaveButton } from "@/components/editorial/SaveButton";

/**
 * "This season": hobbies picked from the current month with the existing hobby tags. Rendered after
 * mount (the month is a browser fact), with its space reserved so nothing jumps.
 */
export function SeasonStrip({ now }: { now?: Date }) {
  const [date, setDate] = useState<Date | null>(now ?? null);
  useEffect(() => {
    if (!now) setDate(new Date());
  }, [now]);
  const picks = date ? seasonalHobbies(date, undefined, 4) : [];
  const copy = date ? SEASON_COPY[seasonOf(date)] : null;
  return (
    <section
      className="mx-auto mt-12 max-w-7xl px-5 md:mt-16 md:px-8"
      aria-labelledby="this-season"
      data-testid="season-strip"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1">
        <div>
          <p className="kicker text-cherry">
            {date ? `${MONTHS[date.getMonth()]} · this season` : "This season"}
          </p>
          <h2 id="this-season" className="mt-1 text-2xl leading-tight md:text-4xl">
            {copy ? (
              <>
                Good for <em className="text-cherry">{copy.label}</em>
              </>
            ) : (
              "Good for right now"
            )}
          </h2>
        </div>
        <Link
          to="/hobbies"
          className="inline-flex min-h-11 items-center border-b-2 border-cherry text-sm font-semibold text-cherry"
        >
          All hobbies <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      <p className="mt-1 min-h-6 text-espresso">{copy?.line}</p>
      <ul className="mt-4 grid min-h-[7rem] grid-cols-1 gap-3 min-[480px]:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {picks.map((h) => (
          <li key={h.slug} className="relative bg-cream shadow-[var(--shadow-paper)]">
            <Link
              to="/hobbies/$slug"
              params={{ slug: h.slug }}
              className="group block min-h-24 p-4 pr-14"
            >
              <p className="kicker text-cherry">{h.category}</p>
              <h3 className="mt-1 font-display text-xl italic leading-tight group-hover:text-cherry">
                {h.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {h.timeLabel} · {h.costLabel}
              </p>
              <p className="mt-2 text-sm font-semibold text-cherry underline decoration-2 underline-offset-4">
                See what you need
              </p>
            </Link>
            <div className="absolute right-1 top-1">
              <SaveButton
                compact
                className="!bg-transparent !shadow-none"
                item={{
                  key: `hobby:${h.slug}`,
                  kind: "hobby",
                  title: h.name,
                  href: `/hobbies/${h.slug}`,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
