import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
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
import { ChoicePill } from "@/components/planner/ChoicePill";
import { cn } from "@/lib/utils";
import { track } from "@/lib/track";
import { getHobby } from "@/data/hobbies";
import { ShopMyHobby } from "@/components/commerce/ShopMyHobby";
import { TonightMode } from "@/components/planner/TonightMode";

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
  "light",
  "go",
  "from",
  "with",
  "def",
] as const;

/** The Tonight mode's answers (see parseTonightSearch) and the mode switch itself. */
const TONIGHT_KEYS = ["t", "e", "b", "c", "w", "s"] as const;
type MakePlansSearch = PlanSearch & {
  mode?: string;
} & Partial<Record<(typeof TONIGHT_KEYS)[number], string | number>>;

/**
 * Which half of Make Plans to show. `?mode=plan` and `?mode=tonight` are explicit. With no mode, any
 * planner answer in the address (a quiz hand-off, a saved plan, a shared link) means the planner; a
 * bare /make-plans opens Tonight, which shows ideas straight away.
 */
export function makePlansMode(s: MakePlansSearch): "tonight" | "plan" {
  if (s.mode === "plan") return "plan";
  if (s.mode === "tonight") return "tonight";
  return SEARCH_KEYS.some((k) => s[k] !== undefined) ? "plan" : "tonight";
}

export const Route = createFileRoute("/make-plans")({
  validateSearch: (s: Record<string, unknown>): MakePlansSearch => {
    const out: MakePlansSearch = {};
    // Tonight's answers keep their type: a number stays a number, so a link like ?t=60&s=2 is already
    // in its canonical form and is not redirected a second time. (parseTonightSearch compares as text.)
    for (const k of TONIGHT_KEYS) {
      const v = s[k];
      if (typeof v === "string" || typeof v === "number") out[k] = v;
    }
    for (const k of [...SEARCH_KEYS, "mode"] as const) {
      const v = s[k];
      if (typeof v === "string" || typeof v === "number") out[k] = String(v);
    }
    return out;
  },
  head: () =>
    seo({
      title: "Make Plans: Tonight, This Evening or the Weekend",
      description:
        "An empty calendar? We can work with that. Get three ideas for tonight, or pick your time, budget and mood for a realistic after-work or weekend plan, with the supplies to make it happen.",
      path: "/make-plans",
      image: absoluteUrl(images.picnic.src),
    }),
  component: MakePlans,
});

function MakePlans() {
  const search = Route.useSearch();
  const mode = makePlansMode(search);
  return (
    <>
      <ModeSwitch mode={mode} />
      {mode === "tonight" ? <TonightMode search={search} /> : <Planner />}
    </>
  );
}

/** Tonight and Plan ahead: two links (they work without scripts), the current one marked. */
function ModeSwitch({ mode }: { mode: "tonight" | "plan" }) {
  const tab = (active: boolean) =>
    cn(
      "inline-flex min-h-11 items-center border-2 border-cherry px-5 text-sm font-semibold",
      active ? "bg-cherry text-cream" : "text-cherry hover:bg-cherry hover:text-cream",
      focusRing,
    );
  return (
    <div className="no-print bg-matcha/70">
      <nav
        aria-label="Make Plans mode"
        className="mx-auto flex max-w-5xl flex-wrap gap-2 px-5 pt-6 md:px-8"
      >
        <Link
          to="/make-plans"
          search={{ mode: "tonight" }}
          className={tab(mode === "tonight")}
          aria-current={mode === "tonight" ? "page" : undefined}
        >
          Tonight
        </Link>
        <Link
          to="/make-plans"
          search={{ mode: "plan" }}
          className={tab(mode === "plan")}
          aria-current={mode === "plan" ? "page" : undefined}
        >
          Plan ahead
        </Link>
      </nav>
    </div>
  );
}

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
    hint: "Low-key and Medium keep ideas at or below that effort. High energy skips the very gentle ones.",
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

/** Keeps "how long" valid for the chosen "when". */
function withValidLength(next: PlanInput): PlanInput {
  if (isDayWhen(next.when)) {
    if (next.length === "evening") return { ...next, length: "full-day" };
  } else if (next.length !== "evening" && next.length !== "few-hours") {
    return { ...next, length: "evening" };
  }
  return next;
}

const FORM_KEYS = ["when", "length", "vibe", "who", "budget", "setting", "energy"] as const;

function Planner() {
  const search = Route.useSearch() as PlanSearch;
  const [init] = useState(() => {
    const p = parsePlanSearch(search);
    return { ...p, input: withValidLength(p.input) };
  });
  const [input, setInput] = useState<PlanInput>(init.input);
  const [seed, setSeed] = useState(init.seed);
  // Exact activity ids from a saved plan: used until the person changes something.
  const [restored, setRestored] = useState<string[] | null>(init.ids);
  // `go=1` is the plain page load from the form (the answers are in the address), so the plan is
  // already on the page before any script runs.
  const [shown, setShown] = useState(init.ids !== null || init.pin !== null || search.go === "yes");
  const formRef = useRef<HTMLFormElement>(null);
  // Bumped when the choices change from outside the form (the "nothing found" buttons): the form's
  // radios are uncontrolled, so they are rebuilt from the new choices.
  const [formKey, setFormKey] = useState(0);
  // Which choices the person actually made (or arrived with in the address). The rest are defaults,
  // and the plan says so in its "Based on:" chips.
  const [touched, setTouched] = useState<Set<string>>(
    () =>
      new Set(
        (["when", "length", "vibe", "who", "budget", "setting", "energy", "home"] as const).filter(
          (k) => search[k] !== undefined && !(search.def ?? "").split(",").includes(k),
        ),
      ),
  );

  const fromQuiz =
    init.from !== null && init.from !== "tonight" && init.prefilled && init.ids === null;

  const restoredPlan = restored ? planFromIds(input, seed, restored) : null;
  const [pin, setPin] = useState<string | null>(init.pin);
  const plan = useMemo(
    () => (shown ? (restoredPlan ?? makePlan(input, seed, pin)) : null),
    // restoredPlan is rebuilt each render; its inputs are what matter.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [shown, input, seed, pin, restored],
  );
  const { isSaved, toggle, ready } = useSaved();

  const change = (patch: Partial<PlanInput>) => {
    setTouched((t) => {
      const n = new Set(t);
      for (const k of Object.keys(patch)) n.add(k === "atHome" ? "home" : k);
      return n;
    });
    setInput((i) => {
      const next = withValidLength({ ...i, ...patch });
      // A lighter plan is tied to the plan it came from: any new choice starts a fresh one.
      if (!("light" in patch)) delete next.light;
      return next;
    });
    setSeed(0);
    setRestored(null);
    setPin(null);
  };
  const set = (k: keyof PlanInput, v: string) => change({ [k]: v } as Partial<PlanInput>);
  /** The answers currently ticked in the form (which may be choices made before scripts loaded). */
  const readForm = (): Partial<PlanInput> | null => {
    const f = formRef.current;
    if (!f) return null;
    const fd = new FormData(f);
    const out: Record<string, unknown> = { atHome: fd.get("home") === "yes" };
    for (const k of FORM_KEYS) {
      const v = fd.get(k);
      if (typeof v === "string") out[k] = v;
    }
    return out as Partial<PlanInput>;
  };
  // Choices ticked before the page finished loading are kept: read them once on arrival.
  useEffect(() => {
    const picked = readForm();
    if (!picked) return;
    const differs = (Object.keys(picked) as (keyof PlanInput)[]).some(
      (k) => picked[k] !== undefined && picked[k] !== (k === "atHome" ? input.atHome : cur(k)),
    );
    if (differs) change(picked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /** Change from outside the form: rebuild the form's radios from the new choices. */
  const changeFromOutside = (patch: Partial<PlanInput>) => {
    change(patch);
    setFormKey((k) => k + 1);
  };
  const run = () => {
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
  };

  const planUrl = plan ? planHref(plan.input, plan.seed, plan.ids) : "";
  // Keep the address bar on the exact plan so copying the URL shares it (choices, seed and ideas only).
  useEffect(() => {
    if (!planUrl) return;
    try {
      const untouched = (["when", "length", "vibe", "who", "budget"] as const).filter(
        (k) => !touched.has(k),
      );
      window.history.replaceState(
        window.history.state,
        "",
        untouched.length ? `${planUrl}&def=${untouched.join(",")}` : planUrl,
      );
    } catch {
      // Some embedded browsers block history changes: sharing still works from the Copy button.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planUrl]);
  const saved = ready && plan && isSaved(`plan:${planUrl}`);
  const planLabel = isDayWhen(input.when) ? "Plan my weekend" : "Plan my evening";
  const lengthOptions = isDayWhen(input.when) ? dayLengths : stopLengths;
  const labelOf = (k: keyof PlanInput, v: string) =>
    (k === "length" ? lengthOptions : (groups.find((g) => g.key === k)?.options ?? [])).find(
      (o) => o.v === v,
    )?.label ?? v;
  const basedOn = (() => {
    if (!plan) return [];
    const i = plan.input;
    const keys: (keyof PlanInput)[] = ["when", "length", "vibe", "who", "budget"];
    const out = keys.map((k) => ({
      label: labelOf(
        k,
        k === "when" ? (i.when === "after-work" ? "weeknight" : i.when) : String(i[k]),
      ),
      isDefault: !touched.has(k),
    }));
    if (i.setting && i.setting !== "any")
      out.push({ label: labelOf("setting", i.setting), isDefault: !touched.has("setting") });
    if (i.energy && i.energy !== "any")
      out.push({ label: labelOf("energy", i.energy), isDefault: !touched.has("energy") });
    if (i.atHome) out.push({ label: "Kept at home", isDefault: false });
    return out;
  })();
  const cur = (k: keyof PlanInput): string => {
    const v = input[k];
    if (k === "when") return v === "after-work" ? "weeknight" : String(v);
    return String(v ?? (k === "setting" || k === "energy" ? "any" : ""));
  };

  return (
    <>
      <section className="no-print bg-matcha/70">
        <div className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-16">
          <Kicker>Make Plans</Kicker>
          <h1 className="mt-3 text-5xl leading-[1] md:text-7xl">
            An empty calendar? <em className="text-cherry">We can work with that.</em>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-ink">
            Pick a few things and get a plan to follow. Every idea works wherever you live, and only
            a full-weekend plan may include one "book ahead" idea.
          </p>
          {pin && plan && plan.ids.includes(pin) && (
            <p
              role="status"
              className="mt-5 max-w-xl border-2 border-dashed border-cherry bg-cream p-4 text-sm text-ink"
            >
              <strong>Built around your tonight idea.</strong> It's in the plan. Change anything and
              we'll plan from scratch.
            </p>
          )}
          {fromQuiz && (
            <p
              role="status"
              className="mt-5 max-w-xl border-2 border-dashed border-cherry bg-cream p-4 text-sm text-ink"
            >
              <strong>Carried over from your quiz.</strong> We filled in what we could. Change
              anything, then press "{planLabel}".
            </p>
          )}
          <form
            ref={formRef}
            method="get"
            action="/make-plans"
            aria-label="Plan choices"
            onChange={(e) => {
              const t = e.target as unknown as HTMLInputElement;
              if (t.name === "home") change({ atHome: t.checked });
              else if ((FORM_KEYS as readonly string[]).includes(t.name))
                set(t.name as keyof PlanInput, t.value);
            }}
            onSubmit={(e) => {
              // With scripts: no page load. Without them the same form loads /make-plans?...&go=1.
              e.preventDefault();
              run();
            }}
          >
            <input type="hidden" name="mode" value="plan" />
            <input type="hidden" name="go" value="yes" />
            <input
              type="hidden"
              name="def"
              value={(["when", "length", "vibe", "who", "budget"] as const)
                .filter((k) => !touched.has(k))
                .join(",")}
            />
            {init.pin && <input type="hidden" name="with" value={init.pin} />}
            {init.from && <input type="hidden" name="from" value={init.from} />}
            <div key={formKey} className="mt-10 grid gap-7">
              {groups.map((g) => {
                const options = g.key === "length" ? lengthOptions : g.options;
                const hintId = g.hint ? `hint-${g.key}` : undefined;
                return (
                  <fieldset
                    key={g.key === "length" ? `length-${isDayWhen(input.when)}` : g.key}
                    aria-describedby={hintId}
                  >
                    <legend className="kicker mb-3 text-ink">{g.label}</legend>
                    {/* Said once, on the first of the three preselected groups, not under each. */}
                    {g.key === "vibe" &&
                      (["vibe", "who", "budget"] as const).some((k) => !touched.has(k)) && (
                        <p className="-mt-1 mb-3 text-sm text-espresso" data-testid="preselected">
                          Vibe, who and budget start preselected. Change any that don't fit.
                        </p>
                      )}
                    {g.hint && (
                      <p id={hintId} className="-mt-1 mb-3 text-sm text-espresso">
                        {g.hint}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {options.map((o) => (
                        <ChoicePill
                          key={o.v}
                          name={g.key}
                          value={o.v}
                          label={o.label}
                          defaultChecked={cur(g.key) === o.v}
                        />
                      ))}
                    </div>
                  </fieldset>
                );
              })}
              <label className="flex min-h-11 items-center gap-3 text-sm font-medium text-ink">
                <input
                  type="checkbox"
                  name="home"
                  value="yes"
                  defaultChecked={input.atHome}
                  className={cn("h-5 w-5 accent-[var(--cherry)]", focusRing)}
                />
                Keep it at home
              </label>
            </div>
            <button
              type="submit"
              className={cn(
                "mt-10 bg-cherry px-8 py-4 font-semibold text-cream shadow-[4px_4px_0_var(--ink)] transition hover:-translate-y-0.5",
                focusRing,
              )}
            >
              {planLabel}
            </button>
          </form>
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
            basedOn={basedOn}
            saved={!!saved}
            onShuffle={() => {
              setInput((i) => {
                const next = { ...i };
                delete next.light;
                return next;
              });
              setSeed((x) => x + 1);
              setRestored(null);
            }}
            onLighter={(next) => {
              setInput(next.input);
              setRestored(next.ids);
            }}
            onSwap={(index) => {
              const alt = plan.slots[index]?.alternative;
              const mine = plan.slots[index]?.activity;
              if (alt && mine) setRestored(plan.ids.map((id) => (id === mine.id ? alt.id : id)));
            }}
            onRelax={(patch) => changeFromOutside(patch)}
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
              The Shop
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
