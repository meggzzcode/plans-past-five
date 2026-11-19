import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { makePlan, type PlanInput } from "@/lib/planner";
import { getHobby } from "@/data/hobbies";
import { articlesForHobby } from "@/content";
import { seo } from "@/lib/seo";
import { useSaved } from "@/lib/saved";
import { Kicker } from "@/components/editorial/Section";
import { Flower, Star } from "@/components/brand/Doodles";
import { Printer, RefreshCw, Bookmark, BookmarkCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/make-plans")({
  head: () => seo({ title: "Make Some Plans: After-Work & Weekend Plan Generator", description: "An empty calendar? We can work with that. Build a realistic after-work, Saturday or Sunday plan around your time, budget, energy and company.", path: "/make-plans" }),
  component: Planner,
});

const groups: { key: keyof PlanInput; label: string; options: { v: string; label: string }[] }[] = [
  { key: "when", label: "When?", options: [{ v: "after-work", label: "After work" }, { v: "saturday", label: "Saturday" }, { v: "sunday", label: "Sunday" }] },
  { key: "length", label: "How long?", options: [{ v: "evening", label: "An hour or so" }, { v: "few-hours", label: "A few hours" }, { v: "half-day", label: "Half a day" }, { v: "full-day", label: "A full day" }] },
  { key: "vibe", label: "The vibe", options: [{ v: "cozy", label: "Cozy" }, { v: "creative", label: "Creative" }, { v: "outdoorsy", label: "Outdoorsy" }, { v: "social", label: "Social" }, { v: "adventurous", label: "Adventurous" }] },
  { key: "who", label: "Who's coming?", options: [{ v: "alone", label: "Just me" }, { v: "friend", label: "A friend" }, { v: "partner", label: "A partner" }, { v: "group", label: "The group" }] },
  { key: "budget", label: "Budget", options: [{ v: "free", label: "Free" }, { v: "under25", label: "Under $25" }, { v: "under50", label: "Under $50" }, { v: "flexible", label: "Flexible" }] },
];

const fmt = (m: number) => (m < 60 ? `${m} min` : `${Math.floor(m / 60)}h${m % 60 ? ` ${m % 60}m` : ""}`);

function Planner() {
  const [input, setInput] = useState<PlanInput>({ when: "saturday", length: "full-day", vibe: "creative", who: "alone", budget: "under25", atHome: false });
  const [seed, setSeed] = useState(0);
  const [shown, setShown] = useState(false);
  const plan = shown ? makePlan(input, seed) : null;
  const { isSaved, toggle, ready } = useSaved();
  const set = (k: keyof PlanInput, v: string) => { setInput((i) => ({ ...i, [k]: v })); setSeed(0); };
  const planKey = plan ? `plan:${input.when}-${input.length}-${input.vibe}-${input.who}-${input.budget}-${input.atHome ? "home" : "out"}-${plan.slots.map((s) => s.activity.id).join(".")}` : "";
  const saved = ready && plan && isSaved(planKey);

  return (
    <>
      <section className="no-print bg-matcha/70">
        <div className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-16">
          <Kicker>Make Some Plans</Kicker>
          <h1 className="mt-3 text-5xl leading-[1] md:text-7xl">An empty calendar? <em className="text-cherry">We can work with that.</em></h1>
          <p className="mt-4 max-w-xl text-lg text-ink">Pick a few things and we'll build a realistic plan from our curated ideas. No invented events, no fake opening hours: just good ideas that work wherever you live.</p>
          <div className="mt-10 grid gap-7">
            {groups.map((g) => (
              <fieldset key={g.key}>
                <legend className="kicker mb-3 text-ink">{g.label}</legend>
                <div className="flex flex-wrap gap-2">
                  {g.options.map((o) => (
                    <button key={o.v} onClick={() => set(g.key, o.v)} aria-pressed={input[g.key] === o.v}
                      className={cn("border-2 px-4 py-2 text-sm font-medium transition", input[g.key] === o.v ? "border-cherry bg-cherry text-cream" : "border-ink/20 bg-cream text-ink hover:border-cherry")}>{o.label}</button>
                  ))}
                </div>
              </fieldset>
            ))}
            <label className="flex items-center gap-3 text-sm font-medium text-ink">
              <input type="checkbox" checked={input.atHome} onChange={(e) => setInput((i) => ({ ...i, atHome: e.target.checked }))} className="h-5 w-5 accent-[var(--cherry)]" />
              Keep it at home
            </label>
          </div>
          <button onClick={() => { setShown(true); setSeed(0); }} className="mt-10 bg-cherry px-8 py-4 font-semibold text-cream shadow-[4px_4px_0_var(--ink)] transition hover:-translate-y-0.5">Make my plan</button>
        </div>
      </section>

      {shown && (
        <section className="mx-auto max-w-3xl px-5 py-14 md:px-8" aria-live="polite">
          {plan ? (
            <div className="paper relative p-8 md:p-12">
              <Flower className="absolute -top-4 right-8 h-10 w-10 text-cherry" />
              <p className="kicker text-cherry">Your plan</p>
              <h2 className="mt-2 text-4xl uppercase italic tracking-tight md:text-5xl">{plan.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">About {fmt(plan.totalMinutes)} of plans · {input.budget === "free" ? "free" : input.budget === "flexible" ? "flexible budget" : input.budget.replace("under", "under $")}</p>
              <ol className="mt-8 space-y-7">
                {plan.slots.map((s) => {
                  const h = s.activity.hobby ? getHobby(s.activity.hobby) : undefined;
                  const read = h ? articlesForHobby(h.slug)[0] : undefined;
                  return (
                    <li key={s.activity.id} className="grid gap-2 border-t border-border pt-5 md:grid-cols-[120px_1fr]">
                      <p className="hand text-3xl text-cherry">{s.label}</p>
                      <div>
                        <p className="font-display text-2xl leading-snug text-ink">{s.activity.text}</p>
                        <p className="mt-1 text-sm text-muted-foreground">About {fmt(s.activity.minutes)}</p>
                        {s.activity.lowCost && <p className="mt-2 text-sm text-garden"><strong>Lower-cost swap:</strong> {s.activity.lowCost}</p>}
                        <div className="no-print mt-2 flex flex-wrap gap-4 text-sm font-semibold">
                          {h && <Link to="/hobbies/$slug" params={{ slug: h.slug }} className="text-cherry underline underline-offset-4">{h.name} guide & supplies</Link>}
                          {read && <Link to="/journal/$slug" params={{ slug: read.slug }} className="text-ink underline underline-offset-4">Related read</Link>}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
              <div className="no-print mt-10 flex flex-wrap gap-3 border-t border-border pt-6">
                <button onClick={() => setSeed((x) => x + 1)} className="inline-flex items-center gap-2 border-2 border-cherry px-4 py-2 text-sm font-semibold text-cherry hover:bg-cherry hover:text-cream"><RefreshCw className="h-4 w-4" />Shuffle ideas</button>
                <button onClick={() => toggle({ key: planKey, kind: "plan", title: plan.title, href: "/make-plans", note: plan.slots.map((s) => `${s.label}: ${s.activity.text}`).join("\n") })} className="inline-flex items-center gap-2 bg-cherry px-4 py-2 text-sm font-semibold text-cream hover:bg-ink">
                  {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}{saved ? "Saved to My Plans" : "Save to My Plans"}
                </button>
                <button onClick={() => window.print()} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-ink underline"><Printer className="h-4 w-4" />Print</button>
              </div>
              <p className="mt-6 text-xs text-muted-foreground">Ideas are general and location-independent. Check local hours, prices and safety before you go.</p>
            </div>
          ) : (
            <div className="border-2 border-dashed border-cherry bg-cream p-8 text-center">
              <Star className="mx-auto h-6 w-6 text-cherry" />
              <p className="mt-3 font-display text-2xl">We couldn't build a plan that fits all of that.</p>
              <p className="mt-2 text-espresso">Try a different vibe, a bigger budget, or untick "keep it at home". Some combinations (like outdoorsy at home) just don't overlap.</p>
            </div>
          )}
        </section>
      )}
    </>
  );
}
