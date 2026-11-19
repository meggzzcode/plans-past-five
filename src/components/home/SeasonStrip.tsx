import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { MONTHS, SEASON_COPY, seasonOf, weekOfMonth, weekendHobbies } from "@/lib/season";
import { SaveButton } from "@/components/editorial/SaveButton";

/**
 * "This weekend": hobbies picked with the existing hobby tags for the current season, rotating by
 * month and week of the month (so it changes through the month, never at random). Rendered after
 * mount (the date is a browser fact), with its space reserved so nothing jumps.
 */
export function SeasonStrip({ now }: { now?: Date }) {
  const [date, setDate] = useState<Date | null>(now ?? null);
  useEffect(() => {
    if (!now) setDate(new Date());
  }, [now]);
  const picks = date ? weekendHobbies(date, undefined, 4) : [];
  const copy = date ? SEASON_COPY[seasonOf(date)] : null;
  return (
    <section
      className="mx-auto mt-12 max-w-7xl px-5 md:mt-16 md:px-8"
      aria-labelledby="this-weekend"
      data-testid="season-strip"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1">
        <div>
          <p className="kicker text-cherry">
            {date
              ? `${MONTHS[date.getMonth()]} · week ${weekOfMonth(date)} · this weekend`
              : "This weekend"}
          </p>
          <h2 id="this-weekend" className="mt-1 text-2xl leading-tight md:text-4xl">
            {copy ? (
              <>
                This weekend, try one for <em className="text-cherry">{copy.label}</em>
              </>
            ) : (
              "This weekend, try one of these"
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
      <p className="mt-1 min-h-6 text-espresso">
        {copy?.line}
        {copy && (
          <>
            {" "}
            <Link
              to="/make-plans"
              search={{ when: "weekend" }}
              className="font-semibold text-cherry underline underline-offset-4"
            >
              Plan the whole weekend
            </Link>
          </>
        )}
      </p>
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
