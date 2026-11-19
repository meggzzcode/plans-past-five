import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  findHobbies,
  personaCardSvg,
  plannerSearch,
  shareText,
  type FinderAnswers,
  type Persona,
} from "@/lib/finder";
import { getHobby, type Hobby } from "@/data/hobbies";
import { getCollection } from "@/data/products";
import { getArticle } from "@/content";
import { articlesForHobby } from "@/content";
import { productsFor } from "@/data/products";
import { productHref } from "@/config/affiliate";
import { seo } from "@/lib/seo";
import { Kicker } from "@/components/editorial/Section";
import { SaveButton } from "@/components/editorial/SaveButton";
import { AffiliateNote } from "@/components/editorial/AffiliateNote";
import { HobbyMeta } from "@/components/cards/Cards";
import { Star, Bow, Sparkle } from "@/components/brand/Doodles";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/hobby-finder")({
  head: () =>
    seo({
      title: "Find Your Thing: The Hobby Quiz",
      description:
        "Seven quick questions about your time, budget, energy, company and how much learning you want. Get three to five hobbies that genuinely fit your life outside work.",
      path: "/hobby-finder",
    }),
  component: Finder,
});

type Q = { key: keyof FinderAnswers; q: string; options: { v: string; label: string }[] };
const questions: Q[] = [
  {
    key: "craving",
    q: "What are you craving more of?",
    options: [
      { v: "creativity", label: "Creativity" },
      { v: "relaxation", label: "A little relaxation" },
      { v: "adventure", label: "Adventure" },
      { v: "friendship", label: "New friendships" },
      { v: "movement", label: "Movement" },
      { v: "different", label: "Something different" },
    ],
  },
  {
    key: "where",
    q: "Where do you want to spend your time?",
    options: [
      { v: "home", label: "At home" },
      { v: "indoors", label: "Indoors, home or out" },
      { v: "outdoors", label: "Outdoors" },
      { v: "out", label: "Somewhere new" },
      { v: "anywhere", label: "Anywhere" },
    ],
  },
  {
    key: "time",
    q: "How much time can you give a first try?",
    options: [
      { v: "short", label: "Under 45 minutes" },
      { v: "couple", label: "An hour or two" },
      { v: "halfday", label: "Half a day" },
      { v: "any", label: "Whatever it takes" },
    ],
  },
  {
    key: "budget",
    q: "What's your starting budget?",
    options: [
      { v: "free", label: "Free, please" },
      { v: "under25", label: "Under $25" },
      { v: "under50", label: "Under $50" },
      { v: "flexible", label: "Flexible" },
    ],
  },
  {
    key: "company",
    q: "Who's coming with you?",
    options: [
      { v: "solo", label: "Just me" },
      { v: "social", label: "Friends or new people" },
      { v: "either", label: "Either is good" },
    ],
  },
  {
    key: "level",
    q: "How much of a learning curve is okay?",
    options: [
      { v: "easy", label: "None: I want to start tonight" },
      { v: "some", label: "A little is fine" },
      { v: "any", label: "Bring on a challenge" },
    ],
  },
  {
    key: "energy",
    q: "Be honest: how much energy do you have after work?",
    options: [
      { v: "low", label: "Running on fumes" },
      { v: "medium", label: "Some left in the tank" },
      { v: "high", label: "Let's go" },
    ],
  },
];

function Finder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<FinderAnswers>>({});
  const done = step >= questions.length;
  const pick = (k: keyof FinderAnswers, v: string) => {
    setAnswers((a) => ({ ...a, [k]: v }));
    setStep((s) => s + 1);
  };
  const restart = () => {
    setAnswers({});
    setStep(0);
  };
  const cur = questions[Math.min(step, questions.length - 1)]!;
  const headingRef = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  return (
    <section className="min-h-[80vh] bg-strawberry">
      <div className="mx-auto max-w-4xl px-5 py-12 md:px-8 md:py-16">
        {!done ? (
          <>
            <div className="text-center">
              <Kicker className="justify-center">Find Your Thing</Kicker>
              <h1 className="mt-3 text-4xl md:text-6xl">
                Let's find your <em className="text-cherry">hobby era.</em>
              </h1>
              <p className="mt-3 text-espresso">
                Seven questions. No email. A playful guide, not a personality test.
              </p>
            </div>
            <div className="paper relative mx-auto mt-10 max-w-2xl p-7 md:p-10">
              <Bow className="absolute -top-5 right-6 h-10 w-14 rotate-6 text-cherry" />
              <div className="flex items-center gap-1.5" aria-hidden>
                {questions.map((_, i) => (
                  <span
                    key={i}
                    className={cn("h-1.5 flex-1", i <= step ? "bg-cherry" : "bg-border")}
                  />
                ))}
              </div>
              <p className="kicker mt-6 text-muted-foreground">
                Question {step + 1} of {questions.length}
              </p>
              <h2 ref={headingRef} tabIndex={-1} className="mt-2 text-3xl outline-none md:text-4xl">
                {cur.q}
              </h2>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {cur.options.map((o) => (
                  <button
                    key={o.v}
                    type="button"
                    onClick={() => pick(cur.key, o.v)}
                    aria-pressed={answers[cur.key] === o.v}
                    className={cn(
                      "min-h-12 border-2 px-4 py-3.5 text-left font-medium transition hover:border-cherry hover:bg-cherry hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cherry",
                      answers[cur.key] === o.v
                        ? "border-cherry bg-cherry text-cream"
                        : "border-ink/15 bg-cream text-ink",
                    )}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="mt-6 min-h-11 text-sm font-semibold text-cherry underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-cherry"
                >
                  ← Back
                </button>
              )}
            </div>
          </>
        ) : (
          <Results a={answers as FinderAnswers} restart={restart} />
        )}
      </div>
    </section>
  );
}

function Results({ a, restart }: { a: FinderAnswers; restart: () => void }) {
  const { results, theme, tooFew, suggestions, beginnerPick } = findHobbies(a);
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => titleRef.current?.focus(), []);
  return (
    <div>
      <div className="text-center">
        <p className="hand text-3xl text-cherry">you're giving…</p>
        <h1 ref={titleRef} tabIndex={-1} className="mt-1 text-5xl italic outline-none md:text-7xl">
          {theme.name}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-ink">{theme.line}</p>
        <p className="mt-2 text-xs text-muted-foreground">
          A playful editorial theme, not a scientific assessment.
        </p>
      </div>
      <PersonaPanel a={a} persona={theme} pick={beginnerPick} />
      {tooFew && (
        <div className="mx-auto mt-10 max-w-2xl border-2 border-dashed border-cherry bg-cream p-6">
          <p className="font-display text-2xl">
            {results.length
              ? `Only ${results.length} hobb${results.length === 1 ? "y" : "ies"} fit every answer.`
              : "Nothing fits every answer exactly."}
          </p>
          <p className="mt-2 text-espresso">
            We'd rather be honest than pad the list with hobbies that ignore your budget or time.
            {suggestions.length > 0 && (
              <>
                {" "}
                Loosening your <strong>{suggestions[0]!.constraint}</strong> would open up more
                options.
              </>
            )}
          </p>
          <button
            type="button"
            onClick={restart}
            className="mt-4 min-h-11 bg-cherry px-5 py-2.5 text-sm font-semibold text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Change my answers
          </button>
        </div>
      )}
      <ol className="mt-12 space-y-6">
        {results.map(({ hobby: h, why }, i) => {
          const reads = articlesForHobby(h.slug).slice(0, 1);
          const ps = productsFor(h.productIds).slice(0, 2);
          return (
            <li key={h.slug} className="paper grid gap-6 p-6 md:grid-cols-[auto_1fr] md:p-8">
              <span className="font-display text-6xl italic leading-none text-cherry">{i + 1}</span>
              <div>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h2 className="text-3xl md:text-4xl">{h.name}</h2>
                  <SaveButton
                    item={{
                      key: `hobby:${h.slug}`,
                      kind: "hobby",
                      title: h.name,
                      href: `/hobbies/${h.slug}`,
                    }}
                  />
                </div>
                <p className="mt-2 text-espresso">{h.description}</p>
                <p className="mt-3 text-sm">
                  <Sparkle className="mr-1 inline h-3 w-3 text-cherry" />
                  <strong>Why it fits:</strong> it {why.join(", ")}.
                </p>
                <HobbyMeta h={h} className="mt-3" />
                <p className="mt-4 bg-butter px-4 py-3 text-sm text-ink">
                  <span className="hand text-xl text-cherry">one easy way to begin → </span>
                  {h.firstActivity}
                </p>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                  <Link
                    to="/hobbies/$slug"
                    params={{ slug: h.slug }}
                    className="text-cherry underline underline-offset-4"
                  >
                    The {h.name.toLowerCase()} guide
                  </Link>
                  {reads.map((r) => (
                    <Link
                      key={r.slug}
                      to="/journal/$slug"
                      params={{ slug: r.slug }}
                      className="text-ink underline underline-offset-4"
                    >
                      Read: {r.title}
                    </Link>
                  ))}
                  {ps.map((p) => (
                    <a
                      key={p.id}
                      href={productHref(p)}
                      target="_blank"
                      rel="noopener"
                      className="font-medium text-muted-foreground underline underline-offset-4"
                    >
                      Optional: {p.name.toLowerCase()} (Amazon search)
                    </a>
                  ))}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
      <AffiliateNote className="mt-6 text-center" />
      <div className="mt-12 flex flex-wrap justify-center gap-4">
        <button
          type="button"
          onClick={restart}
          className="min-h-11 border-2 border-cherry px-6 py-3 text-sm font-semibold text-cherry hover:bg-cherry hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cherry"
        >
          Take it again
        </button>
        <Link
          to="/make-plans"
          search={plannerSearch(a, theme)}
          className="bg-cherry px-6 py-3 text-sm font-semibold text-cream hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          Turn this into a plan
        </Link>
        <Link to="/saved" className="px-6 py-3 text-sm font-semibold text-ink underline">
          Open My Plans
        </Link>
      </div>
      <Star className="mx-auto mt-10 h-6 w-6 text-cherry" />
    </div>
  );
}

const btn =
  "inline-flex min-h-11 items-center border-2 border-cherry px-4 py-2 text-sm font-semibold text-cherry hover:bg-cherry hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cherry";

function PersonaPanel({
  a,
  persona,
  pick,
}: {
  a: FinderAnswers;
  persona: Persona;
  pick: Hobby | undefined;
}) {
  const [note, setNote] = useState("");
  const suited = persona.hobbies.map((s) => getHobby(s)).filter((h): h is Hobby => !!h);
  const guides = persona.guides.map((s) => getArticle(s)).filter((g) => !!g);
  const shop = getCollection(persona.collection);
  const svg = personaCardSvg(persona, pick?.name);
  const text = shareText(persona, pick?.name);
  const cardSrc = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setNote("Copied. Paste it anywhere you like.");
    } catch {
      setNote("Couldn't copy automatically. Select the text above and copy it.");
    }
  };
  const download = () => {
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
    const el = document.createElement("a");
    el.href = url;
    el.download = `my-hobby-era-${persona.key}.svg`;
    el.click();
    URL.revokeObjectURL(url);
    setNote("Card downloaded.");
  };

  return (
    <section aria-labelledby="persona-heading" className="mx-auto mt-10 max-w-3xl">
      <h2 id="persona-heading" className="sr-only">
        About {persona.name}
      </h2>
      <div className="paper grid gap-6 p-6 md:grid-cols-[1fr_220px] md:p-8">
        <div className="space-y-5">
          <div>
            <p className="kicker text-cherry">Hobbies that suit you</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {suited.map((h) => (
                <li key={h.slug}>
                  <Link
                    to="/hobbies/$slug"
                    params={{ slug: h.slug }}
                    className="inline-flex min-h-11 items-center border-2 border-ink/20 bg-cream px-3 py-1.5 text-sm font-medium text-ink hover:border-cherry focus-visible:outline focus-visible:outline-2 focus-visible:outline-cherry"
                  >
                    {h.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {pick && (
            <div className="bg-butter px-4 py-3 text-sm text-ink">
              <p>
                <strong>Your beginner pick:</strong>{" "}
                <Link
                  to="/hobbies/$slug"
                  params={{ slug: pick.slug }}
                  className="font-semibold text-cherry underline underline-offset-4"
                >
                  {pick.name}
                </Link>
              </p>
              <p className="mt-1">
                <strong>First activity:</strong> {pick.firstActivity}
              </p>
            </div>
          )}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
            {guides.map((g) => (
              <Link
                key={g.slug}
                to="/journal/$slug"
                params={{ slug: g.slug }}
                className="text-ink underline underline-offset-4"
              >
                Read: {g.title}
              </Link>
            ))}
            {shop && (
              <Link
                to="/shop/$category"
                params={{ category: shop.slug }}
                className="text-cherry underline underline-offset-4"
              >
                Supplies: {shop.name}
              </Link>
            )}
          </div>
          <div>
            <p className="kicker text-cherry">Next step</p>
            <p className="mt-1 text-sm text-espresso">
              Turn this into a real plan. We'll carry over your budget, energy and setting.
            </p>
            <Link
              to="/make-plans"
              search={plannerSearch(a, persona)}
              className="mt-2 inline-flex min-h-11 items-center bg-cherry px-5 py-2.5 text-sm font-semibold text-cream hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              Plan a {persona.name.replace(/^The /, "").replace(/ Girl$/, "")} outing
            </Link>
          </div>
        </div>
        <div className="no-print">
          <img
            src={cardSrc}
            alt={`Shareable card: My hobby era is ${persona.name}. ${persona.line}`}
            width={600}
            height={750}
            className="mx-auto h-auto w-full max-w-[220px] border border-border"
          />
          <p className="mt-3 whitespace-pre-line text-xs text-muted-foreground">{text}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={copy} className={btn}>
              Copy text
            </button>
            <button type="button" onClick={download} className={btn}>
              Save card
            </button>
            <button type="button" onClick={() => window.print()} className={btn}>
              Print
            </button>
          </div>
          <p role="status" className="mt-2 text-xs text-ink">
            {note}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Made on your device. Nothing about you is collected or sent.
          </p>
        </div>
      </div>
    </section>
  );
}
