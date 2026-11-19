import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Copy, RefreshCw, Share2 } from "lucide-react";
import {
  formatMinutes,
  parseTonightSearch,
  tonightEcho,
  tonightHref,
  tonightIdeas,
  tonightPlanSearch,
  tonightSaveItem,
  tonightText,
  timeOptions,
  type TonightInput,
} from "@/lib/tonight";
import { pinFor } from "@/lib/pins";
import { seo, absoluteUrl } from "@/lib/seo";
import { canonicalUrl } from "@/lib/share";
import { images } from "@/data/images";
import { SaveButton } from "@/components/editorial/SaveButton";
import { Kicker } from "@/components/editorial/Section";
import { Star } from "@/components/brand/Doodles";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tools/tonight")({
  head: () =>
    seo({
      title: "What Should I Do Tonight? 3 Ideas for After Work",
      description:
        "Tired, bored or somewhere in between? Answer five taps and get three ideas that fit your time, energy and budget tonight. No email, no account.",
      path: "/tools/tonight",
      image: absoluteUrl(images.soloCafe.src),
      pinImage: pinFor("/tools/tonight")!,
    }),
  validateSearch: (s: Record<string, unknown>) => {
    const o: Record<string, string> = {};
    for (const k of ["t", "e", "b", "c", "w", "s"]) {
      const v = s[k];
      if (typeof v === "string" || typeof v === "number") o[k] = String(v);
    }
    return o as { t?: string; e?: string; b?: string; c?: string; w?: string; s?: string };
  },
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
  const search = Route.useSearch();
  const [init] = useState(() => parseTonightSearch(search));
  const [input, setInput] = useState<TonightInput>(init.input);
  const [seed, setSeed] = useState(init.seed);
  const [copied, setCopied] = useState<"idle" | "yes" | "no">("idle");
  const result = tonightIdeas(input, seed);
  const canShare = typeof navigator !== "undefined" && typeof navigator.share === "function";

  // Keep the address bar on the exact answers so refresh and a copied link restore them.
  const href = tonightHref(input, seed);
  useEffect(() => {
    try {
      window.history.replaceState(window.history.state, "", href);
    } catch {
      // Some embedded browsers block history changes: the Copy button still carries the link.
    }
  }, [href]);

  const set = (k: keyof TonightInput, v: string | number) => {
    setInput((i) => ({ ...i, [k]: v }) as TonightInput);
    setSeed(0);
  };
  const apply = (patch: Partial<TonightInput>) => {
    setInput((i) => ({ ...i, ...patch }));
    setSeed(0);
  };
  const text = () => tonightText(input, result.suggestions, canonicalUrl(href));
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text());
      setCopied("yes");
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = text();
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand("copy");
        ta.remove();
        setCopied(ok ? "yes" : "no");
      } catch {
        setCopied("no");
      }
    }
  };
  const share = async () => {
    try {
      await navigator.share({ title: "Ideas for tonight", text: text() });
    } catch {
      // Cancelled or blocked: nothing to do.
    }
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
            It's after five and the sofa is calling. Five taps, three ideas that fit. Nothing is
            sent anywhere; anything you save stays on this device.
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
        <p className="mb-6 text-sm font-medium text-espresso">For: {tonightEcho(input)}</p>
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
                        hash="kit"
                        className="text-cherry underline underline-offset-4"
                      >
                        What you'll need
                      </Link>
                    )}
                    {s.guideSlug && (
                      <Link
                        to="/journal/$slug"
                        params={{ slug: s.guideSlug }}
                        className="text-ink underline underline-offset-4"
                      >
                        Read the how-to guide
                      </Link>
                    )}
                    <Link
                      to="/make-plans"
                      search={tonightPlanSearch(input, s)}
                      className="text-ink underline underline-offset-4"
                    >
                      Make it a whole plan
                    </Link>
                  </div>
                  <div className="mt-3">
                    <SaveButton item={tonightSaveItem(s, input, seed)} />
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
            {result.relax.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-espresso">Change one answer:</p>
                <RelaxButtons relax={result.relax} onApply={apply} />
              </div>
            )}
            <div className="mt-8 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSeed((x) => x + 1)}
                disabled={result.matched <= 3}
                className="inline-flex items-center gap-2 border-2 border-cherry px-4 py-2 text-sm font-semibold text-cherry hover:bg-cherry hover:text-cream disabled:opacity-50"
              >
                <RefreshCw className="h-4 w-4" />
                Shuffle ideas
              </button>
              <button
                type="button"
                onClick={copy}
                className="inline-flex min-h-11 items-center gap-2 border-2 border-ink/25 px-4 py-2 text-sm font-semibold text-ink hover:border-cherry"
              >
                {copied === "yes" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied === "yes" ? "Copied" : "Copy as text"}
              </button>
              {canShare && (
                <button
                  type="button"
                  onClick={share}
                  className="inline-flex min-h-11 items-center gap-2 border-2 border-ink/25 px-4 py-2 text-sm font-semibold text-ink hover:border-cherry"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
              )}
            </div>
            <p
              role="status"
              aria-live="polite"
              className="mt-3 min-h-5 text-sm font-medium text-garden"
            >
              {copied === "yes" && "Copied with a link to these ideas."}
              {copied === "no" && "Couldn't copy. Your browser blocked it."}
            </p>
          </>
        ) : (
          <div className="border-2 border-dashed border-cherry bg-cream p-8 text-center">
            <Star className="mx-auto h-6 w-6 text-cherry" />
            <p className="mt-3 font-display text-2xl">Nothing fits all of that.</p>
            <p className="mt-2 text-espresso">
              {result.relax.length > 0
                ? "Nothing fits those answers together. Change one and we'll show what opens up:"
                : "Nothing fits those answers together, even loosening one. Try changing two."}
            </p>
            <RelaxButtons relax={result.relax} onApply={apply} center />
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

function RelaxButtons({
  relax,
  onApply,
  center,
}: {
  relax: ReturnType<typeof tonightIdeas>["relax"];
  onApply: (patch: Partial<TonightInput>) => void;
  center?: boolean;
}) {
  if (relax.length === 0) return null;
  return (
    <ul className={cn("mt-3 flex flex-wrap gap-2", center && "justify-center")}>
      {relax.map((r) => (
        <li key={r.constraint}>
          <button
            type="button"
            onClick={() => onApply(r.patch)}
            className="min-h-11 border-2 border-cherry px-4 py-2 text-left text-sm font-semibold text-cherry hover:bg-cherry hover:text-cream"
          >
            {r.label} ({r.matched} {r.matched === 1 ? "idea" : "ideas"})
          </button>
        </li>
      ))}
    </ul>
  );
}
