import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { formatMinutes, tonightIdeas, timeOptions, type TonightInput } from "@/lib/tonight";
import { seo } from "@/lib/seo";
import { Kicker } from "@/components/editorial/Section";
import { Star } from "@/components/brand/Doodles";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tools/tonight")({
  head: () =>
    seo({
      title: "What Should I Do Tonight?",
      description:
        "Tell us your time, energy, budget and company, and get three realistic ideas for tonight. Shuffle for more.",
      path: "/tools/tonight",
    }),
  component: Tonight,
});

type Group = {
  key: keyof TonightInput;
  label: string;
  options: { v: string | number; label: string }[];
};

const groups: Group[] = [
  { key: "minutes", label: "How much time?", options: timeOptions },
  {
    key: "energy",
    label: "Your energy",
    options: [
      { v: "low", label: "Running on fumes" },
      { v: "medium", label: "Okay" },
      { v: "high", label: "Bursting" },
    ],
  },
  {
    key: "budget",
    label: "Budget",
    options: [
      { v: "free", label: "Free" },
      { v: "under25", label: "Under $25" },
      { v: "under50", label: "Under $50" },
      { v: "flexible", label: "Flexible" },
    ],
  },
  {
    key: "company",
    label: "Company",
    options: [
      { v: "solo", label: "Just me" },
      { v: "social", label: "With someone" },
    ],
  },
  {
    key: "setting",
    label: "Where",
    options: [
      { v: "indoor", label: "Indoors" },
      { v: "outdoor", label: "Outdoors" },
      { v: "either", label: "Either" },
    ],
  },
];

function Tonight() {
  const [input, setInput] = useState<TonightInput>({
    minutes: 60,
    energy: "low",
    budget: "free",
    company: "solo",
    setting: "either",
  });
  const [seed, setSeed] = useState(0);
  const result = tonightIdeas(input, seed);

  const set = (k: keyof TonightInput, v: string | number) => {
    setInput((i) => ({ ...i, [k]: v }) as TonightInput);
    setSeed(0);
  };

  return (
    <>
      <section className="bg-matcha/70">
        <div className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-16">
          <Kicker>Tonight</Kicker>
          <h1 className="mt-3 text-5xl leading-[1] md:text-7xl">
            What should I do <em className="text-cherry">tonight?</em>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-ink">
            It's after five and the sofa is calling. Answer five quick questions for three ideas
            that fit. Nothing is saved or sent anywhere.
          </p>
          <div className="mt-10 grid gap-7">
            {groups.map((g) => (
              <fieldset key={g.key}>
                <legend className="kicker mb-3 text-ink">{g.label}</legend>
                <div className="flex flex-wrap gap-2">
                  {g.options.map((o) => (
                    <button
                      key={o.v}
                      type="button"
                      onClick={() => set(g.key, o.v)}
                      aria-pressed={input[g.key] === o.v}
                      className={cn(
                        "border-2 px-4 py-2 text-sm font-medium transition",
                        input[g.key] === o.v
                          ? "border-cherry bg-cherry text-cream"
                          : "border-ink/20 bg-cream text-ink hover:border-cherry",
                      )}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-14 md:px-8" aria-live="polite">
        {result.suggestions.length > 0 ? (
          <>
            <ol className="space-y-6">
              {result.suggestions.map((s, n) => (
                <li key={s.id} className="paper p-6 md:p-8">
                  <p className="hand text-3xl text-cherry">Idea {n + 1}</p>
                  <h2 className="mt-1 font-display text-2xl leading-snug text-ink md:text-3xl">
                    {s.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    About {formatMinutes(s.minutes)} · {s.costLabel} (estimate)
                  </p>
                  <p className="mt-3 text-ink">
                    <strong>First step:</strong> {s.firstStep}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-4 text-sm font-semibold">
                    {s.hobbySlug && (
                      <Link
                        to="/hobbies/$slug"
                        params={{ slug: s.hobbySlug }}
                        className="text-cherry underline underline-offset-4"
                      >
                        Hobby page
                      </Link>
                    )}
                    {s.guideSlug && (
                      <Link
                        to="/journal/$slug"
                        params={{ slug: s.guideSlug }}
                        className="text-ink underline underline-offset-4"
                      >
                        Read the guide
                      </Link>
                    )}
                    {!s.hobbySlug && (
                      <Link to="/make-plans" className="text-ink underline underline-offset-4">
                        Build a bigger plan
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ol>
            {result.loosen && (
              <p className="mt-6 text-sm text-espresso">
                Only {result.matched} idea{result.matched === 1 ? "" : "s"} fit.{" "}
                {result.loosen.message}
              </p>
            )}
            <div className="mt-8">
              <button
                type="button"
                onClick={() => setSeed((x) => x + 1)}
                disabled={result.matched <= 3}
                className="inline-flex items-center gap-2 border-2 border-cherry px-4 py-2 text-sm font-semibold text-cherry hover:bg-cherry hover:text-cream disabled:opacity-50"
              >
                <RefreshCw className="h-4 w-4" />
                Shuffle ideas
              </button>
            </div>
          </>
        ) : (
          <div className="border-2 border-dashed border-cherry bg-cream p-8 text-center">
            <Star className="mx-auto h-6 w-6 text-cherry" />
            <p className="mt-3 font-display text-2xl">Nothing fits all of that.</p>
            <p className="mt-2 text-espresso">
              {result.loosen?.message ?? "Try loosening one of the answers above."}
            </p>
          </div>
        )}
        <p className="mt-8 text-xs text-muted-foreground">
          Costs and times are approximate assumptions, not live prices or listings. Ideas are
          general and location-independent: check local hours, prices and safety before you go.
        </p>
      </section>
    </>
  );
}
