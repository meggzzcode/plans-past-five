import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  makePlan,
  parsePlanSearch,
  planFromIds,
  planHref,
  type PlanInput,
  type PlanSearch,
} from "@/lib/planner";
import { seo, absoluteUrl } from "@/lib/seo";
import { images } from "@/data/images";
import { useSaved } from "@/lib/saved";
import { Kicker } from "@/components/editorial/Section";
import { PlanResult } from "@/components/planner/PlanResult";
import { cn } from "@/lib/utils";
import { track } from "@/lib/track";
import { getHobby } from "@/data/hobbies";
import { ShopMyHobby } from "@/components/commerce/ShopMyHobby";

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
  "with",
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
      title: "Plan Your Evening or Weekend in 30 Seconds",
      description:
        "An empty calendar? We can work with that. Pick your time, budget and mood and get a realistic after-work or weekend plan, with the supplies to make it happen.",
      path: "/make-plans",
      image: absoluteUrl(images.picnic.src),
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
      { v: "under100", label: "Under $100" },
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

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cherry";

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
  const [pin, setPin] = useState<string | null>(init.pin);
  const plan = shown ? (restoredPlan ?? makePlan(input, seed, pin)) : null;
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
    setPin(null);
  };
  const set = (k: keyof PlanInput, v: string) => change({ [k]: v } as Partial<PlanInput>);

  const planUrl = plan ? planHref(plan.input, plan.seed, plan.ids) : "";
  // Keep the address bar on the exact plan so copying the URL shares it (choices, seed and ideas only).
  useEffect(() => {
    if (!planUrl) return;
    try {
      window.history.replaceState(window.history.state, "", planUrl);
    } catch {
      // Some embedded browsers block history changes: sharing still works from the Copy button.
    }
  }, [planUrl]);
  const saved = ready && plan && isSaved(`plan:${planUrl}`);
  const planLabel = isDayWhen(input.when) ? "Plan my weekend" : "Plan my evening";
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
            Pick a few things and get a plan you can start tonight. Every idea works wherever you
            live, so there's nothing to book and nothing to cancel.
          </p>
          {fromQuiz && (
            <p
              role="status"
              className="mt-5 max-w-xl border-2 border-dashed border-cherry bg-cream p-4 text-sm text-ink"
            >
              <strong>Carried over from your quiz.</strong> We filled in what we could. Change
              anything, then press "{planLabel}".
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
              window.setTimeout(() => {
                const el = document.getElementById("your-plan");
                if (el && typeof el.scrollIntoView === "function") {
                  el.scrollIntoView({
                    behavior: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
                      ? "auto"
                      : "smooth",
                    block: "start",
                  });
                }
              }, 50);
              track("planner_use", { when: input.when, length: input.length });
            }}
            className={cn(
              "mt-10 bg-cherry px-8 py-4 font-semibold text-cream shadow-[4px_4px_0_var(--ink)] transition hover:-translate-y-0.5",
              focusRing,
            )}
          >
            {planLabel}
          </button>
        </div>
      </section>

      {shown && plan && (
        <section
          id="your-plan"
          className="mx-auto max-w-3xl scroll-mt-4 px-4 py-10 md:px-8 md:py-14"
          aria-live="polite"
          aria-label="Your plan"
        >
          <PlanResult
            plan={plan}
            saved={!!saved}
            onShuffle={() => {
              setSeed((x) => x + 1);
              setRestored(null);
            }}
            onSwap={(index) => {
              const alt = plan.slots[index]?.alternative;
              const mine = plan.slots[index]?.activity;
              if (alt && mine) setRestored(plan.ids.map((id) => (id === mine.id ? alt.id : id)));
            }}
            onRelax={(patch) => change(patch)}
            onToggleSave={() =>
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
          />
          {[...new Set(plan.slots.map((s) => s.activity?.hobby).filter((x): x is string => !!x))]
            .slice(0, 2)
            .map((slug) => (
              <ShopMyHobby
                key={slug}
                hobby={slug}
                title={`Grab what you need for ${getHobby(slug)?.name ?? "this plan"}`}
              />
            ))}
          <p className="mt-6 text-sm text-espresso">
            Need supplies for something on your plan?{" "}
            <Link to="/shop" className="font-semibold text-cherry underline underline-offset-4">
              Shop Your Hobby
            </Link>{" "}
            has starter lists for first sessions.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            Ideas are general, and costs are rough ranges, not quotes. Check local hours, prices and
            safety before you go.
          </p>
        </section>
      )}
    </>
  );
}
