import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  fmtClock,
  fmtDuration,
  fmtRange,
  guidesFor,
  makePlan,
  parsePlanSearch,
  planFromIds,
  planHref,
  type GuideLink,
  type PlanInput,
  type PlanSearch,
} from "@/lib/planner";
import { seo } from "@/lib/seo";
import { useSaved } from "@/lib/saved";
import { Kicker } from "@/components/editorial/Section";
import { Flower, Star } from "@/components/brand/Doodles";
import { Printer, RefreshCw, Bookmark, BookmarkCheck, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const SEARCH_KEYS = [
  "when",
  "length",
  "vibe",
  "who",
  "budget",
  "home",
  "setting",
  "energy",
  "seed",
  "ids",
  "from",
] as const;

export const Route = createFileRoute("/make-plans")({
  validateSearch: (s: Record<string, unknown>): PlanSearch => {
    const out: PlanSearch = {};
    for (const k of SEARCH_KEYS) {
      const v = s[k];
      if (typeof v === "string" || typeof v === "number") out[k] = String(v);
    }
    return out;
  },
  head: () =>
    seo({
      title: "Make Some Plans: After-Work & Weekend Plan Generator",
      description:
        "An empty calendar? We can work with that. Build a realistic after-work, Saturday, Sunday or full-weekend itinerary around your time, budget, energy and company.",
      path: "/make-plans",
    }),
  component: Planner,
});

type Group = {
  key: keyof PlanInput;
  label: string;
  hint?: string;
  options: { v: string; label: string }[];
};

const dayLengths = [
  { v: "few-hours", label: "A few hours" },
  { v: "half-day", label: "Half a day" },
  { v: "full-day", label: "A full day" },
];
const stopLengths = [
  { v: "evening", label: "One stop" },
  { v: "few-hours", label: "Two stops" },
];
const isDayWhen = (w: string) => w === "saturday" || w === "sunday" || w === "weekend";

const groups: Group[] = [
  {
    key: "when",
    label: "When?",
    options: [
      { v: "weeknight", label: "Weeknight" },
      { v: "morning", label: "Morning" },
      { v: "afternoon", label: "Afternoon" },
      { v: "evening", label: "Evening" },
      { v: "saturday", label: "Full Saturday" },
      { v: "sunday", label: "Full Sunday" },
      { v: "weekend", label: "Full weekend" },
    ],
  },
  { key: "length", label: "How long?", options: [] }, // options depend on "when"
  {
    key: "vibe",
    label: "The vibe",
    options: [
      { v: "creative", label: "Creative" },
      { v: "relaxing", label: "Relaxing" },
      { v: "cozy", label: "Cozy" },
      { v: "active", label: "Active" },
      { v: "outdoorsy", label: "Outdoorsy" },
      { v: "social", label: "Social" },
      { v: "adventurous", label: "Adventurous" },
    ],
  },
  {
    key: "who",
    label: "Who's coming?",
    options: [
      { v: "alone", label: "Just me" },
      { v: "friend", label: "A friend" },
      { v: "partner", label: "A partner" },
      { v: "group", label: "The group" },
    ],
  },
  {
    key: "budget",
    label: "Total budget for the whole plan",
    hint: "Everything on the plan together will fit inside this.",
    options: [
      { v: "free", label: "Free" },
      { v: "under25", label: "Under $25" },
      { v: "under50", label: "Under $50" },
      { v: "flexible", label: "Flexible" },
    ],
  },
  {
    key: "setting",
    label: "Indoors or outdoors?",
    options: [
      { v: "any", label: "Either" },
      { v: "indoor", label: "Indoors" },
      { v: "outdoor", label: "Outdoors" },
    ],
  },
  {
    key: "energy",
    label: "Energy level",
    hint: "We keep ideas at or below the energy you pick.",
    options: [
      { v: "any", label: "No preference" },
      { v: "low", label: "Low-key" },
      { v: "medium", label: "Medium" },
      { v: "high", label: "High energy" },
    ],
  },
];

const budgetLabel = (b: PlanInput["budget"]) =>
  b === "free" ? "free" : b === "flexible" ? "flexible budget" : b.replace("under", "under $");

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cherry";

function GuideLinks({ guides }: { guides: GuideLink[] }) {
  const cls = "text-cherry underline underline-offset-4";
  return (
    <div className="no-print mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
      {guides.map((g) => {
        const k = `${g.kind}:${"slug" in g ? g.slug : g.to}`;
        if (g.kind === "hobby")
          return (
            <Link key={k} to="/hobbies/$slug" params={{ slug: g.slug }} className={cls}>
              {g.label}
            </Link>
          );
        if (g.kind === "article")
          return (
            <Link key={k} to="/journal/$slug" params={{ slug: g.slug }} className={cls}>
              {g.label}
            </Link>
          );
        if (g.kind === "shop")
          return (
            <Link key={k} to="/shop/$category" params={{ category: g.slug }} className={cls}>
              {g.label}
            </Link>
          );
        return (
          <Link key={k} to={g.to} className={cls}>
            {g.label}
          </Link>
        );
      })}
    </div>
  );
}

function Planner() {
  const search = Route.useSearch();
  const [init] = useState(() => parsePlanSearch(search));
  const [input, setInput] = useState<PlanInput>(init.input);
  const [seed, setSeed] = useState(init.seed);
  // Exact activity ids from a saved plan: used until the person changes something.
  const [restored, setRestored] = useState<string[] | null>(init.ids);
  const [shown, setShown] = useState(init.ids !== null);
  const fromQuiz = init.from !== null && init.prefilled && init.ids === null;

  const restoredPlan = restored ? planFromIds(input, seed, restored) : null;
  const plan = shown ? (restoredPlan ?? makePlan(input, seed)) : null;
  const { isSaved, toggle, ready } = useSaved();

  const change = (patch: Partial<PlanInput>) => {
    setInput((i) => {
      const next = { ...i, ...patch };
      // Keep "how long" valid for the chosen "when".
      if (isDayWhen(next.when)) {
        if (next.length === "evening") next.length = "full-day";
      } else if (next.length !== "evening" && next.length !== "few-hours") {
        next.length = "evening";
      }
      return next;
    });
    setSeed(0);
    setRestored(null);
  };
  const set = (k: keyof PlanInput, v: string) => change({ [k]: v } as Partial<PlanInput>);

  const planUrl = plan ? planHref(plan.input, plan.seed, plan.ids) : "";
  const saved = ready && plan && isSaved(`plan:${planUrl}`);
  const lengthOptions = isDayWhen(input.when) ? dayLengths : stopLengths;
  const cur = (k: keyof PlanInput): string => {
    const v = input[k];
    if (k === "when") return v === "after-work" ? "weeknight" : String(v);
    return String(v ?? (k === "setting" || k === "energy" ? "any" : ""));
  };

  return (
    <>
      <section className="no-print bg-matcha/70">
        <div className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-16">
          <Kicker>Make Some Plans</Kicker>
          <h1 className="mt-3 text-5xl leading-[1] md:text-7xl">
            An empty calendar? <em className="text-cherry">We can work with that.</em>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-ink">
            Pick a few things and we'll build a realistic itinerary from our curated ideas. No
            invented events, no fake opening hours: just good ideas that work wherever you live.
          </p>
          {fromQuiz && (
            <p
              role="status"
              className="mt-5 max-w-xl border-2 border-dashed border-cherry bg-cream p-4 text-sm text-ink"
            >
              <strong>Carried over from your quiz.</strong> We filled in what we could. Change
              anything, then press "Make my plan".
            </p>
          )}
          <div className="mt-10 grid gap-7">
            {groups.map((g) => {
              const options = g.key === "length" ? lengthOptions : g.options;
              const hintId = g.hint ? `hint-${g.key}` : undefined;
              return (
                <fieldset key={g.key} aria-describedby={hintId}>
                  <legend className="kicker mb-3 text-ink">{g.label}</legend>
                  {g.hint && (
                    <p id={hintId} className="-mt-1 mb-3 text-sm text-espresso">
                      {g.hint}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {options.map((o) => (
                      <button
                        key={o.v}
                        type="button"
                        onClick={() => set(g.key, o.v)}
                        aria-pressed={cur(g.key) === o.v}
                        className={cn(
                          "min-h-11 border-2 px-4 py-2 text-sm font-medium transition",
                          focusRing,
                          cur(g.key) === o.v
                            ? "border-cherry bg-cherry text-cream"
                            : "border-ink/20 bg-cream text-ink hover:border-cherry",
                        )}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </fieldset>
              );
            })}
            <label className="flex min-h-11 items-center gap-3 text-sm font-medium text-ink">
              <input
                type="checkbox"
                checked={input.atHome}
                onChange={(e) => change({ atHome: e.target.checked })}
                className={cn("h-5 w-5 accent-[var(--cherry)]", focusRing)}
              />
              Keep it at home
            </label>
          </div>
          <button
            type="button"
            onClick={() => {
              setShown(true);
              setSeed(0);
              setRestored(null);
            }}
            className={cn(
              "mt-10 bg-cherry px-8 py-4 font-semibold text-cream shadow-[4px_4px_0_var(--ink)] transition hover:-translate-y-0.5",
              focusRing,
            )}
          >
            Make my plan
          </button>
        </div>
      </section>

      {shown && plan && (
        <section
          className="mx-auto max-w-3xl px-5 py-14 md:px-8"
          aria-live="polite"
          aria-label="Your plan"
        >
          <div className="paper relative p-6 md:p-12">
            <Flower className="absolute -top-4 right-8 h-10 w-10 text-cherry" />
            <p className="kicker text-cherry">Your plan</p>
            <h2 className="mt-2 text-4xl uppercase italic tracking-tight md:text-5xl">
              {plan.title}
            </h2>
            {plan.filled > 0 && (
              <p className="mt-2 text-sm text-muted-foreground">
                About {fmtDuration(plan.totalMinutes)} of plans · Estimated total{" "}
                <strong className="text-ink">
                  {fmtRange(plan.totalCost.min, plan.totalCost.max)}
                </strong>{" "}
                (approximate) · fits {budgetLabel(input.budget)}
                {plan.budgetCap !== null && plan.budgetCap > 0 ? ` ($${plan.budgetCap})` : ""}
              </p>
            )}
            {plan.missingCount > 0 && (
              <div
                role="status"
                className="mt-5 flex gap-3 border-2 border-dashed border-cherry bg-cream p-4 text-sm text-ink"
              >
                <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-cherry" aria-hidden />
                <p>
                  <strong>
                    {plan.filled === 0
                      ? "We couldn't build a plan that fits all of that."
                      : `${plan.missingCount} of ${plan.slots.length} time slots couldn't be filled.`}
                  </strong>{" "}
                  We'd rather show the gap than pad it with something that ignores your choices.
                  Details are on each empty slot below.
                </p>
              </div>
            )}
            <ol className="mt-8 space-y-7">
              {plan.slots.map((s, i) => {
                const a = s.activity;
                const newDay = s.day && plan.slots[i - 1]?.day !== s.day;
                return (
                  <li key={s.step} className="border-t border-border pt-5">
                    {newDay && (
                      <h3 className="mb-4 font-display text-3xl italic text-ink">{s.day}</h3>
                    )}
                    <div className="grid gap-2 md:grid-cols-[130px_1fr]">
                      <div>
                        <p className="hand text-3xl text-cherry">{s.label}</p>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Step {s.step}
                        </p>
                        {a && (
                          <p className="mt-1 text-sm text-ink">
                            {fmtClock(s.start)} to {fmtClock(s.end)}
                          </p>
                        )}
                      </div>
                      {a ? (
                        <div>
                          <h4 className="font-display text-2xl leading-snug text-ink">{a.name}</h4>
                          <p className="mt-1 text-ink">{a.text}</p>
                          <p className="mt-2 text-sm text-muted-foreground">
                            About {fmtDuration(a.minutes)} · {fmtRange(a.costMin, a.costMax)}{" "}
                            (approximate)
                          </p>
                          <p className="mt-2 text-sm">
                            <strong>Prep:</strong> {a.prep}
                          </p>
                          <p className="mt-1 text-sm">
                            <strong>Useful supplies:</strong> {a.supplies.join(", ")}
                          </p>
                          {a.lowCost && (
                            <p className="mt-2 text-sm text-garden">
                              <strong>Lower-cost swap:</strong> {a.lowCost}
                            </p>
                          )}
                          <GuideLinks guides={guidesFor(a)} />
                          {s.alternative && (
                            <p className="mt-3 border-l-4 border-butter bg-butter/40 px-3 py-2 text-sm text-ink">
                              <strong>Not feeling it? Swap in:</strong> {s.alternative.name} (about{" "}
                              {fmtDuration(s.alternative.minutes)},{" "}
                              {fmtRange(s.alternative.costMin, s.alternative.costMax)}). Still fits
                              your budget.
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-cherry bg-cream p-4">
                          <p className="flex items-center gap-2 font-semibold text-ink">
                            <Star className="h-4 w-4 text-cherry" aria-hidden />
                            Nothing found for this slot
                          </p>
                          <p className="mt-1 text-sm text-espresso">{s.missing}</p>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
            <div className="no-print mt-10 flex flex-wrap gap-3 border-t border-border pt-6">
              <button
                type="button"
                onClick={() => {
                  setSeed((x) => x + 1);
                  setRestored(null);
                }}
                className={cn(
                  "inline-flex min-h-11 items-center gap-2 border-2 border-cherry px-4 py-2 text-sm font-semibold text-cherry hover:bg-cherry hover:text-cream",
                  focusRing,
                )}
              >
                <RefreshCw className="h-4 w-4" aria-hidden />
                Shuffle ideas
              </button>
              <button
                type="button"
                disabled={plan.filled === 0}
                onClick={() =>
                  toggle({
                    key: `plan:${planUrl}`,
                    kind: "plan",
                    title: plan.title,
                    href: planUrl,
                    note: plan.slots
                      .filter((s) => s.activity)
                      .map((s) => `${s.day ? `${s.day} ` : ""}${s.label}: ${s.activity!.name}`)
                      .join("\n"),
                    plan: { input: plan.input, seed: plan.seed, ids: plan.ids },
                  })
                }
                aria-pressed={!!saved}
                className={cn(
                  "inline-flex min-h-11 items-center gap-2 bg-cherry px-4 py-2 text-sm font-semibold text-cream hover:bg-ink disabled:opacity-50",
                  focusRing,
                )}
              >
                {saved ? (
                  <BookmarkCheck className="h-4 w-4" aria-hidden />
                ) : (
                  <Bookmark className="h-4 w-4" aria-hidden />
                )}
                {saved ? "Saved to My Plans" : "Save to My Plans"}
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className={cn(
                  "inline-flex min-h-11 items-center gap-2 px-4 py-2 text-sm font-semibold text-ink underline",
                  focusRing,
                )}
              >
                <Printer className="h-4 w-4" aria-hidden />
                Print
              </button>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              Ideas are general and location-independent. Costs are rough ranges for planning, not
              quotes. Check local hours, prices and safety before you go.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
