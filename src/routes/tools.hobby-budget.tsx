import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  assumptions,
  budgetHobbies,
  budgetOptions,
  calculateBudget,
  formatRange,
  itemsFor,
  levelOptions,
  type BudgetPref,
  type Level,
} from "@/lib/budget";
import { getCollection } from "@/data/products";
import { isCollectionLive } from "@/data/collection-status";
import { seo, absoluteUrl } from "@/lib/seo";
import { images } from "@/data/images";
import { Kicker } from "@/components/editorial/Section";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tools/hobby-budget")({
  head: () =>
    seo({
      title: "How Much Does a New Hobby Cost? Budget Tool",
      description:
        "How much does it really cost to start? Pick a hobby, tick what you already own, and see a realistic starting range plus a checklist. Estimates, not live prices.",
      path: "/tools/hobby-budget",
      noindex: true,
      image: absoluteUrl(images.junkJournal.src),
    }),
  component: HobbyBudget,
});

const hobbyList = budgetHobbies();

function Chips<T extends string>({
  legend,
  value,
  options,
  onChange,
  explain,
}: {
  explain?: string;
  legend: string;
  value: T;
  options: { v: T; label: string; hint: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <fieldset>
      <legend className="kicker mb-3 text-ink">{legend}</legend>
      {explain && <p className="-mt-1 mb-3 max-w-xl text-sm text-espresso">{explain}</p>}
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.v}
            type="button"
            onClick={() => onChange(o.v)}
            aria-pressed={value === o.v}
            title={o.hint}
            className={cn(
              "border-2 px-4 py-2 text-sm font-medium transition",
              value === o.v
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
}

function toggleIn(list: string[], id: string) {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
}

function HobbyBudget() {
  const [hobby, setHobby] = useState("watercolor-painting");
  const [level, setLevel] = useState<Level>("brand-new");
  const [pref, setPref] = useState<BudgetPref>("balanced");
  const [optionalIds, setOptionalIds] = useState<string[]>([]);
  const [ownedIds, setOwnedIds] = useState<string[]>([]);

  const items = itemsFor(hobby);
  const essentials = items.filter((i) => i.kind === "essential");
  const optionals = items.filter((i) => i.kind === "optional");
  const result = useMemo(
    () => calculateBudget({ hobby, level, budget: pref, optionalIds, ownedIds }),
    [hobby, level, pref, optionalIds, ownedIds],
  );

  const changeHobby = (slug: string) => {
    setHobby(slug);
    setOptionalIds([]);
    setOwnedIds([]);
  };

  const owns = (id: string) => (
    <label className="flex items-center gap-2 text-xs text-muted-foreground">
      <input
        type="checkbox"
        checked={ownedIds.includes(id)}
        onChange={() => setOwnedIds((o) => toggleIn(o, id))}
        className="h-4 w-4 accent-[var(--cherry)]"
      />
      I already have this
    </label>
  );

  return (
    <>
      <section className="bg-butter/70">
        <div className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-16">
          <Kicker>Hobby Starter Budget</Kicker>
          <h1 className="mt-3 text-5xl leading-[1] md:text-7xl">
            What will it <em className="text-cherry">actually cost?</em>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-ink">
            Choose a hobby, tick what you already own, and get a rough starting range and a
            checklist. Nothing is saved or sent anywhere.
          </p>

          <div className="mt-10 grid gap-7">
            <div>
              <label htmlFor="hobby" className="kicker mb-3 block text-ink">
                Hobby
              </label>
              <select
                id="hobby"
                value={hobby}
                onChange={(e) => changeHobby(e.target.value)}
                className="w-full max-w-md border-2 border-ink/20 bg-cream px-4 py-3 text-base text-ink focus:border-cherry"
              >
                {hobbyList.map((h) => (
                  <option key={h.slug} value={h.slug}>
                    {h.name}
                  </option>
                ))}
              </select>
            </div>
            <Chips
              legend="Experience level"
              value={level}
              options={levelOptions}
              onChange={setLevel}
            />
            <Chips
              legend="Budget preference"
              explain="Keep it lean prices each item about 20 to 30 percent below the typical range, Balanced uses the typical range, and Treat myself prices nicer versions about 30 to 40 percent above it."
              value={pref}
              options={budgetOptions}
              onChange={setPref}
            />

            <fieldset>
              <legend className="kicker mb-3 text-ink">Essentials</legend>
              <ul className="grid gap-3 sm:grid-cols-2">
                {essentials.map((i) => (
                  <li key={i.id} className="border border-ink/15 bg-cream p-3">
                    <p className="text-sm font-medium text-ink">{i.label}</p>
                    <p className="mb-1 text-xs text-muted-foreground">
                      {formatRange(i.low, i.high)} (estimate)
                    </p>
                    {owns(i.id)}
                  </li>
                ))}
              </ul>
            </fieldset>

            {optionals.length > 0 && (
              <fieldset>
                <legend className="kicker mb-1 text-ink">Optional extras</legend>
                <p className="mb-3 max-w-xl text-sm text-espresso">
                  Not needed for a first session. Tick any you want and they are added to your
                  total; unticked extras are left out.
                </p>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {optionals.map((i) => (
                    <li key={i.id} className="border border-ink/15 bg-cream p-3">
                      <label className="flex items-start gap-2 text-sm font-medium text-ink">
                        <input
                          type="checkbox"
                          checked={optionalIds.includes(i.id)}
                          onChange={() => setOptionalIds((o) => toggleIn(o, i.id))}
                          className="mt-0.5 h-4 w-4 accent-[var(--cherry)]"
                        />
                        <span>
                          {i.label}
                          <span className="block text-xs font-normal text-muted-foreground">
                            {formatRange(i.low, i.high)} (estimate)
                          </span>
                        </span>
                      </label>
                      <div className="mt-1 pl-6">{owns(i.id)}</div>
                    </li>
                  ))}
                </ul>
              </fieldset>
            )}
          </div>
        </div>
      </section>

      {result && (
        <section className="mx-auto max-w-3xl px-5 py-14 md:px-8" aria-live="polite">
          <div className="paper p-6 md:p-12">
            <p className="kicker text-cherry">Your estimate for {result.hobbyName}</p>
            <h2 className="mt-2 text-4xl uppercase italic tracking-tight md:text-5xl">
              {result.free ? "Free to start" : formatRange(result.displayLow, result.displayHigh)}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {result.items.length} item{result.items.length === 1 ? "" : "s"} counted
              {result.owned.length > 0 && `, ${result.owned.length} you already own`}
              {result.skippedOptional.length > 0 &&
                `, ${result.skippedOptional.length} optional ${result.skippedOptional.length === 1 ? "extra" : "extras"} not added`}
              .
            </p>
            {result.items.length === 0 && (
              <p className="mt-6 border-2 border-dashed border-cherry p-5 text-espresso">
                You already own everything on this list. Go and start. A first session costs nothing
                extra.
              </p>
            )}

            <div className="mt-8 grid gap-7">
              {result.checklist.map((g) => (
                <div key={g.category}>
                  <h3 className="kicker mb-2 text-ink">{g.label}</h3>
                  <ul className="divide-y divide-border border-y border-border">
                    {g.items.map((i) => {
                      const col =
                        i.collection && isCollectionLive(i.collection)
                          ? getCollection(i.collection)
                          : undefined;
                      return (
                        <li
                          key={i.id}
                          className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3"
                        >
                          <span className="text-ink">
                            <span aria-hidden="true">☐ </span>
                            {i.label}
                            {i.kind === "optional" && (
                              <span className="ml-2 text-xs text-muted-foreground">optional</span>
                            )}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {formatRange(i.estLow, i.estHigh)}
                            {col && (
                              <>
                                {" · "}
                                <Link
                                  to="/shop/$category"
                                  params={{ category: col.slug }}
                                  className="font-semibold text-cherry underline underline-offset-4"
                                >
                                  See options<span className="sr-only"> ({col.name})</span>
                                </Link>
                              </>
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold">
              <Link
                to="/hobbies/$slug"
                params={{ slug: result.hobbySlug }}
                hash="kit"
                className="inline-flex min-h-12 items-center bg-cherry px-6 py-3 text-base text-cream hover:bg-ink"
              >
                See the starter kit for {result.hobbyName}
              </Link>
              <Link to="/shop" className="text-ink underline underline-offset-4">
                Browse Shop Your Hobby
              </Link>
              <Link to="/make-plans" className="text-ink underline underline-offset-4">
                Plan a first session
              </Link>
            </div>

            <p className="mt-8 border-t border-border pt-4 text-xs text-muted-foreground">
              {assumptions.disclaimer} Libraries, swaps and things you already own can bring this
              down. Some shop links may be affiliate links; see our{" "}
              <Link to="/affiliate-disclosure" className="underline">
                affiliate disclosure
              </Link>
              .
            </p>
          </div>
        </section>
      )}
    </>
  );
}
