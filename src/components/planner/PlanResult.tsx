import { useState } from "react";
import {
  Bookmark,
  BookmarkCheck,
  Check,
  Copy,
  Printer,
  RefreshCw,
  Repeat,
  Share2,
  TriangleAlert,
} from "lucide-react";
import { Bow, Flower, Sparkle, Star } from "@/components/brand/Doodles";
import type { Activity } from "@/data/activities";
import {
  fmtClock,
  fmtDuration,
  planHref,
  planSummary,
  planText,
  type Plan,
  type PlanInput,
  type PlanSlot,
} from "@/lib/planner";
import { cn } from "@/lib/utils";
import { imageSrc, pickImages, tintFor } from "./planImage";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cherry";

const costChip = (a: Activity) =>
  a.costMax === 0
    ? "Free"
    : a.costMin === a.costMax
      ? `$${a.costMax}`
      : `$${a.costMin} to $${a.costMax}`;

const Doodle = ({ a, className }: { a: Activity; className: string }) => {
  const v = a.vibes[0];
  if (v === "social") return <Sparkle className={className} />;
  if (v === "creative") return <Flower className={className} />;
  if (v === "cozy" || v === "relaxing") return <Bow className={className} />;
  return <Star className={className} />;
};

const Chip = ({ children, tone = "bg-cream" }: { children: React.ReactNode; tone?: string }) => (
  <span
    className={cn(
      "inline-flex items-center border border-ink/15 px-2 py-0.5 text-xs font-semibold text-ink",
      tone,
    )}
  >
    {children}
  </span>
);

function Card({
  s,
  img,
  onSwap,
}: {
  s: PlanSlot;
  img: ReturnType<typeof pickImages>[number];
  onSwap: () => void;
}) {
  const a = s.activity!;
  const tint = tintFor(a);
  return (
    <div className="flex gap-3 border-2 border-ink/15 bg-warm-white p-2.5 sm:gap-4 sm:p-3">
      <div
        className={cn(
          "relative h-20 w-20 min-[360px]:h-24 min-[360px]:w-24 shrink-0 overflow-hidden sm:h-28 sm:w-28",
          !img && tint.bg,
        )}
      >
        {img ? (
          <img src={imageSrc(img)} alt="" loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <div className="grid h-full w-full place-items-center">
            <Doodle a={a} className={cn("h-12 w-12", tint.fg)} />
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="whitespace-nowrap text-sm font-bold uppercase tracking-wide text-cherry">
            {fmtClock(s.start)}
          </p>
          {s.alternative && (
            <button
              type="button"
              onClick={onSwap}
              aria-label={`Swap ${a.name} for ${s.alternative.name}`}
              title={`Swap for: ${s.alternative.name}`}
              className={cn(
                "no-print -mr-1 -mt-1 inline-flex min-h-11 items-center gap-1 px-2 text-xs font-semibold text-ink underline underline-offset-4 hover:text-cherry",
                focusRing,
              )}
            >
              <Repeat className="h-3.5 w-3.5" aria-hidden />
              Swap
            </button>
          )}
        </div>
        <h3 className="font-display text-xl leading-tight text-ink sm:text-2xl">{a.name}</h3>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          <Chip tone="bg-butter/60">{costChip(a)}</Chip>
          <Chip>{fmtDuration(a.minutes)}</Chip>
        </div>
        <p className="mt-2 text-sm leading-snug text-espresso">
          <span className="font-semibold text-ink">Start: </span>
          {a.prep}
        </p>
      </div>
    </div>
  );
}

type Props = {
  plan: Plan;
  saved: boolean;
  onShuffle: () => void;
  onToggleSave: () => void;
  onSwap: (index: number) => void;
  /** Apply a one-tap change to the choices (used by the "nothing found" buttons). */
  onRelax: (patch: Partial<PlanInput>) => void;
};

/** The generated plan as a visual timeline: one card per stop, a one-line summary, and the actions. */
export function PlanResult({ plan, saved, onShuffle, onToggleSave, onSwap, onRelax }: Props) {
  const [copied, setCopied] = useState<"idle" | "yes" | "no">("idle");
  const imgs = pickImages(plan.slots.map((s) => s.activity));
  const canShare = typeof navigator !== "undefined" && typeof navigator.share === "function";

  const link = () => `${window.location.origin}${planHref(plan.input, plan.seed, plan.ids)}`;

  const copy = async () => {
    const text = planText(plan, link());
    try {
      await navigator.clipboard.writeText(text);
      setCopied("yes");
    } catch {
      try {
        const t = document.createElement("textarea");
        t.value = text;
        t.setAttribute("readonly", "");
        t.style.position = "fixed";
        t.style.opacity = "0";
        document.body.appendChild(t);
        t.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(t);
        setCopied(ok ? "yes" : "no");
      } catch {
        setCopied("no");
      }
    }
    window.setTimeout(() => setCopied("idle"), 2500);
  };

  const share = async () => {
    try {
      await navigator.share({ title: plan.title, text: planText(plan, link()) });
    } catch {
      // Cancelled by the person, or not allowed here: nothing to do.
    }
  };

  const btn = "inline-flex min-h-11 items-center gap-2 px-4 py-2 text-sm font-semibold";
  return (
    <div className="paper relative p-5 md:p-10">
      <Flower className="absolute -top-4 right-6 h-10 w-10 text-cherry" />
      <p className="kicker text-cherry">Your plan</p>
      <h2 className="mt-2 text-3xl uppercase italic leading-[1.05] tracking-tight md:text-5xl">
        {plan.title}
      </h2>
      {plan.filled > 0 && (
        <p className="mt-3 inline-flex flex-wrap items-center gap-x-2 text-base font-semibold text-ink">
          <span>{planSummary(plan)}</span>
          <span className="text-xs font-medium text-muted-foreground">(rough estimate)</span>
        </p>
      )}
      {plan.lengthNote && (
        <p
          role="status"
          className="mt-3 flex gap-2 border-2 border-dashed border-cherry bg-cream p-3 text-sm text-ink"
        >
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-cherry" aria-hidden />
          {plan.lengthNote}
        </p>
      )}

      <ol className="mt-6 space-y-2">
        {plan.slots.map((s, i) => {
          const prev = plan.slots[i - 1];
          const newDay = s.day && prev?.day !== s.day;
          const free =
            prev && prev.day === s.day && prev.activity && s.activity ? s.start - prev.end : 0;
          return (
            <li key={s.step}>
              {newDay && (
                <h3 className={cn("font-display text-2xl italic text-ink", i > 0 && "mt-6")}>
                  {s.day}
                </h3>
              )}
              {free >= 45 && (
                <p
                  className="py-1.5 pl-3 text-xs font-medium text-muted-foreground"
                  aria-label={`${fmtDuration(free)} free`}
                >
                  <span aria-hidden>· · ·</span> {fmtDuration(free)} free
                </p>
              )}
              {s.activity ? (
                <Card s={s} img={imgs[i] ?? null} onSwap={() => onSwap(s.step - 1)} />
              ) : (
                <div className="border-2 border-dashed border-cherry bg-cream p-4">
                  <p className="flex items-center gap-2 font-semibold text-ink">
                    <Star className="h-4 w-4 text-cherry" aria-hidden />
                    Nothing found{s.day ? ` for ${s.day}` : ""}
                  </p>
                  <p className="mt-1 text-sm text-espresso">{s.missing}</p>
                  {s.relax && s.relax.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-2" aria-label="Change one thing">
                      {s.relax.map((r) => (
                        <li key={r.key}>
                          <button
                            type="button"
                            onClick={() => onRelax(r.patch)}
                            className={cn(
                              "min-h-11 border-2 border-cherry px-4 py-2 text-left text-sm font-semibold text-cherry hover:bg-cherry hover:text-cream",
                              focusRing,
                            )}
                          >
                            {r.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <div className="no-print mt-8 border-t border-border pt-5">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onShuffle}
            className={cn(
              btn,
              "border-2 border-cherry text-cherry hover:bg-cherry hover:text-cream",
              focusRing,
            )}
          >
            <RefreshCw className="h-4 w-4" aria-hidden />
            Shuffle
          </button>
          <button
            type="button"
            disabled={plan.filled === 0}
            onClick={onToggleSave}
            aria-pressed={saved}
            className={cn(btn, "bg-cherry text-cream hover:bg-ink disabled:opacity-50", focusRing)}
          >
            {saved ? (
              <BookmarkCheck className="h-4 w-4" aria-hidden />
            ) : (
              <Bookmark className="h-4 w-4" aria-hidden />
            )}
            {saved ? "Saved" : "Save"}
          </button>
          <button
            type="button"
            disabled={plan.filled === 0}
            onClick={copy}
            className={cn(
              btn,
              "border-2 border-ink/25 text-ink hover:border-cherry disabled:opacity-50",
              focusRing,
            )}
          >
            {copied === "yes" ? (
              <Check className="h-4 w-4" aria-hidden />
            ) : (
              <Copy className="h-4 w-4" aria-hidden />
            )}
            {copied === "yes" ? "Copied" : "Copy plan"}
          </button>
          {canShare && (
            <button
              type="button"
              disabled={plan.filled === 0}
              onClick={share}
              className={cn(
                btn,
                "border-2 border-ink/25 text-ink hover:border-cherry disabled:opacity-50",
                focusRing,
              )}
            >
              <Share2 className="h-4 w-4" aria-hidden />
              Share
            </button>
          )}
          <button
            type="button"
            onClick={() => window.print()}
            className={cn(btn, "text-ink underline", focusRing)}
          >
            <Printer className="h-4 w-4" aria-hidden />
            Print
          </button>
        </div>
        <p
          role="status"
          aria-live="polite"
          className="mt-3 min-h-5 text-sm font-medium text-garden"
        >
          {saved && "Saved on this device. No account."}
          {copied === "yes" && !saved && "Copied with a link to this plan."}
          {copied === "no" && "Couldn't copy. Your browser blocked it."}
        </p>
      </div>
    </div>
  );
}
