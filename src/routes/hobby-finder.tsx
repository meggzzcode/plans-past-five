import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { findHobbies, type FinderAnswers } from "@/lib/finder";
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
  head: () => seo({ title: "Find Your Thing: The Hobby Quiz", description: "Six quick questions about your time, budget, energy and company. Get three to five hobbies that genuinely fit your life outside work.", path: "/hobby-finder" }),
  component: Finder,
});

type Q = { key: keyof FinderAnswers; q: string; options: { v: string; label: string }[] };
const questions: Q[] = [
  { key: "craving", q: "What are you craving more of?", options: [
    { v: "creativity", label: "Creativity" }, { v: "relaxation", label: "A little relaxation" }, { v: "adventure", label: "Adventure" },
    { v: "friendship", label: "New friendships" }, { v: "movement", label: "Movement" }, { v: "different", label: "Something different" }] },
  { key: "where", q: "Where do you want to spend your time?", options: [
    { v: "home", label: "At home" }, { v: "outdoors", label: "Outdoors" }, { v: "out", label: "Somewhere new" }, { v: "anywhere", label: "Anywhere" }] },
  { key: "time", q: "How much time can you give a first try?", options: [
    { v: "short", label: "Under 45 minutes" }, { v: "couple", label: "An hour or two" }, { v: "halfday", label: "Half a day" }, { v: "any", label: "Whatever it takes" }] },
  { key: "budget", q: "What's your starting budget?", options: [
    { v: "free", label: "Free, please" }, { v: "under25", label: "Under $25" }, { v: "under50", label: "Under $50" }, { v: "flexible", label: "Flexible" }] },
  { key: "company", q: "Who's coming with you?", options: [
    { v: "solo", label: "Just me" }, { v: "social", label: "Friends or new people" }, { v: "either", label: "Either is good" }] },
  { key: "energy", q: "Be honest: how much energy do you have after work?", options: [
    { v: "low", label: "Running on fumes" }, { v: "medium", label: "Some left in the tank" }, { v: "high", label: "Let's go" }] },
];

function Finder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<FinderAnswers>>({});
  const done = step >= questions.length;
  const pick = (k: keyof FinderAnswers, v: string) => { setAnswers((a) => ({ ...a, [k]: v })); setStep((s) => s + 1); };
  const restart = () => { setAnswers({}); setStep(0); };
  const cur = questions[Math.min(step, questions.length - 1)]!;

  return (
    <section className="min-h-[80vh] bg-strawberry">
      <div className="mx-auto max-w-4xl px-5 py-12 md:px-8 md:py-16">
        {!done ? (
          <>
            <div className="text-center">
              <Kicker className="justify-center">Find Your Thing</Kicker>
              <h1 className="mt-3 text-4xl md:text-6xl">Let's find your <em className="text-cherry">hobby era.</em></h1>
              <p className="mt-3 text-espresso">Six questions. No email. A playful guide, not a personality test.</p>
            </div>
            <div className="paper relative mx-auto mt-10 max-w-2xl p-7 md:p-10">
              <Bow className="absolute -top-5 right-6 h-10 w-14 rotate-6 text-cherry" />
              <div className="flex items-center gap-1.5" aria-hidden>{questions.map((_, i) => <span key={i} className={cn("h-1.5 flex-1", i <= step ? "bg-cherry" : "bg-border")} />)}</div>
              <p className="kicker mt-6 text-muted-foreground">Question {step + 1} of {questions.length}</p>
              <h2 className="mt-2 text-3xl md:text-4xl">{cur.q}</h2>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {cur.options.map((o) => (
                  <button key={o.v} onClick={() => pick(cur.key, o.v)}
                    className={cn("border-2 px-4 py-3.5 text-left font-medium transition hover:border-cherry hover:bg-cherry hover:text-cream", answers[cur.key] === o.v ? "border-cherry bg-cherry text-cream" : "border-ink/15 bg-cream text-ink")}>
                    {o.label}
                  </button>
                ))}
              </div>
              {step > 0 && <button onClick={() => setStep((s) => s - 1)} className="mt-6 text-sm font-semibold text-cherry underline">← Back</button>}
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
  const { results, theme, tooFew, suggestions } = findHobbies(a);
  return (
    <div>
      <div className="text-center">
        <p className="hand text-3xl text-cherry">you're giving…</p>
        <h1 className="mt-1 text-5xl italic md:text-7xl">{theme.name}</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-ink">{theme.line}</p>
        <p className="mt-2 text-xs text-muted-foreground">A playful editorial theme, not a scientific assessment.</p>
      </div>
      {tooFew && (
        <div className="mx-auto mt-10 max-w-2xl border-2 border-dashed border-cherry bg-cream p-6">
          <p className="font-display text-2xl">{results.length ? `Only ${results.length} hobb${results.length === 1 ? "y" : "ies"} fit every answer.` : "Nothing fits every answer exactly."}</p>
          <p className="mt-2 text-espresso">We'd rather be honest than pad the list with hobbies that ignore your budget or time.{suggestions.length > 0 && <> Loosening your <strong>{suggestions[0]!.constraint}</strong> would open up more options.</>}</p>
          <button onClick={restart} className="mt-4 bg-cherry px-5 py-2.5 text-sm font-semibold text-cream">Change my answers</button>
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
                  <SaveButton item={{ key: `hobby:${h.slug}`, kind: "hobby", title: h.name, href: `/hobbies/${h.slug}` }} />
                </div>
                <p className="mt-2 text-espresso">{h.description}</p>
                <p className="mt-3 text-sm"><Sparkle className="mr-1 inline h-3 w-3 text-cherry" /><strong>Why it fits:</strong> it {why.join(", ")}.</p>
                <HobbyMeta h={h} className="mt-3" />
                <p className="mt-4 bg-butter px-4 py-3 text-sm text-ink"><span className="hand text-xl text-cherry">one easy way to begin → </span>{h.firstActivity}</p>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                  <Link to="/hobbies/$slug" params={{ slug: h.slug }} className="text-cherry underline underline-offset-4">The {h.name.toLowerCase()} guide</Link>
                  {reads.map((r) => <Link key={r.slug} to="/journal/$slug" params={{ slug: r.slug }} className="text-ink underline underline-offset-4">Read: {r.title}</Link>)}
                  {ps.map((p) => <a key={p.id} href={productHref(p)} target="_blank" rel="noopener" className="font-medium text-muted-foreground underline underline-offset-4">Optional: {p.name.toLowerCase()} (Amazon search)</a>)}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
      <AffiliateNote className="mt-6 text-center" />
      <div className="mt-12 flex flex-wrap justify-center gap-4">
        <button onClick={restart} className="border-2 border-cherry px-6 py-3 text-sm font-semibold text-cherry hover:bg-cherry hover:text-cream">Take it again</button>
        <Link to="/make-plans" className="bg-cherry px-6 py-3 text-sm font-semibold text-cream hover:bg-ink">Turn this into a plan</Link>
        <Link to="/saved" className="px-6 py-3 text-sm font-semibold text-ink underline">Open My Plans</Link>
      </div>
      <Star className="mx-auto mt-10 h-6 w-6 text-cherry" />
    </div>
  );
}
