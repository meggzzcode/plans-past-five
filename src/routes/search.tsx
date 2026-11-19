import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { searchDetailed, emptySearchSuggestions } from "@/lib/search";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>) => ({ q: typeof s["q"] === "string" ? s["q"] : "" }),
  head: () =>
    seo({
      title: "Search Hobbies, Plans and Starter Picks",
      description:
        "Looking for something to do? Search hobby ideas, weekend plans and starter picks by mood, budget or time.",
      path: "/search",
      noindex: true,
    }),
  component: SearchPage,
});

const suggestions = ["cheap date", "after work", "with friends", "tired", "yoga", "free"];

function SearchPage() {
  const { q } = Route.useSearch();
  const nav = useNavigate({ from: "/search" });
  const [value, setValue] = useState(q);
  // Keep the box in step with the URL (browser Back/Forward, suggestion chips).
  useEffect(() => setValue(q), [q]);
  const { hits, understood, empty } = searchDetailed(q);
  const hobbyHits = hits.filter((h) => h.kind === "Hobby");
  const otherHits = hits.filter((h) => h.kind !== "Hobby");
  const fallback = !q ? emptySearchSuggestions("") : null;
  return (
    <section className="mx-auto max-w-3xl px-5 py-14 md:px-8">
      <h1 className="text-5xl italic">
        What are you <span className="text-cherry">in the mood for?</span>
      </h1>
      <form
        className="mt-8 flex border-b-2 border-ink"
        onSubmit={(e) => {
          e.preventDefault();
          nav({ search: { q: value } });
        }}
        role="search"
      >
        <label htmlFor="q" className="sr-only">
          Search
        </label>
        <input
          id="q"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Try 'clay', 'weekend' or 'low energy'"
          className="min-w-0 flex-1 bg-transparent py-3 font-display text-2xl outline-none placeholder:text-muted-foreground/60"
        />
        <button className="p-3 text-cherry" aria-label="Search">
          <SearchIcon className="h-6 w-6" />
        </button>
      </form>
      <div className="mt-4 flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <Link
            key={s}
            to="/search"
            search={{ q: s }}
            onClick={() => setValue(s)}
            className="inline-flex min-h-11 items-center border border-ink/20 px-3 py-1 text-sm hover:border-cherry hover:text-cherry"
          >
            {s}
          </Link>
        ))}
      </div>
      {!q && fallback && (
        <p className="mt-8 text-espresso">
          Type what you feel like, in your own words: "cheap date", "after work", "with friends" or
          "tired".
        </p>
      )}
      {q && (
        <div className="mt-10" aria-live="polite">
          <p className="text-sm text-muted-foreground">
            {hits.length} result{hits.length === 1 ? "" : "s"} for "{q}"
            {understood.length > 0 && <> · looking for: {understood.join(", ")}</>}
          </p>
          {hits.length === 0 && empty && (
            <div className="mt-6">
              <p className="font-display text-2xl">{empty.message}</p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Try one of these searches">
                {empty.suggestedQueries.map((s) => (
                  <li key={s.query}>
                    <Link
                      to="/search"
                      search={{ q: s.query }}
                      onClick={() => setValue(s.query)}
                      className="inline-flex min-h-11 items-center border-2 border-cherry px-4 py-2 text-sm font-semibold text-cherry hover:bg-cherry hover:text-cream"
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                {empty.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-ink underline underline-offset-4">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {hobbyHits.length > 0 && (
            <>
              <h2 className="mt-6 font-display text-3xl italic">
                Hobbies{" "}
                <span className="text-base not-italic text-muted-foreground">
                  ({hobbyHits.length})
                </span>
              </h2>
              <ResultList hits={hobbyHits} />
            </>
          )}
          {otherHits.length > 0 && (
            <>
              <h2 className="mt-10 font-display text-3xl italic">Guides, sections and shop</h2>
              <ResultList hits={otherHits} />
            </>
          )}
        </div>
      )}
    </section>
  );
}

function ResultList({
  hits,
}: {
  hits: { kind: string; title: string; text: string; to: string }[];
}) {
  return (
    <ul className="mt-2 divide-y divide-border">
      {hits.map((h, i) => (
        <li key={i} className="relative py-5">
          <p className="kicker text-cherry">{h.kind}</p>
          <Link
            to={h.to}
            className="mt-1 block break-words font-display text-2xl text-ink hover:text-cherry after:absolute after:inset-0 after:content-['']"
          >
            {h.title}
          </Link>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{h.text}</p>
        </li>
      ))}
    </ul>
  );
}
