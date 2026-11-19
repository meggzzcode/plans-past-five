import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { search } from "@/lib/search";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>) => ({ q: typeof s["q"] === "string" ? s["q"] : "" }),
  head: () =>
    seo({
      title: "Search",
      description: "Search hobbies, stories and shop collections.",
      path: "/search",
      noindex: true,
    }),
  component: SearchPage,
});

const suggestions = ["pottery", "solo", "tennis", "free", "journal", "friends"];

function SearchPage() {
  const { q } = Route.useSearch();
  const nav = useNavigate({ from: "/search" });
  const [value, setValue] = useState(q);
  // Keep the box in step with the URL (browser Back/Forward, suggestion chips).
  useEffect(() => setValue(q), [q]);
  const hits = search(q);
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
      {q && (
        <div className="mt-10" aria-live="polite">
          <p className="text-sm text-muted-foreground">
            {hits.length} result{hits.length === 1 ? "" : "s"} for "{q}"
          </p>
          {hits.length === 0 && (
            <p className="mt-6 font-display text-2xl">
              Nothing yet. Try a simpler word, or{" "}
              <Link to="/hobby-finder" className="text-cherry underline">
                let the quiz pick for you
              </Link>
              .
            </p>
          )}
          <ul className="mt-4 divide-y divide-border">
            {hits.map((h, i) => (
              <li key={i} className="relative py-5">
                <p className="kicker text-cherry">{h.kind}</p>
                <Link
                  to={h.to}
                  className="mt-1 block font-display text-2xl text-ink hover:text-cherry after:absolute after:inset-0 after:content-['']"
                >
                  {h.title}
                </Link>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{h.text}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
