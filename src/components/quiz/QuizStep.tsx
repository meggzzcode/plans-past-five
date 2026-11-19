import { forwardRef } from "react";
import { Bow, Sparkle } from "@/components/brand/Doodles";
import { images } from "@/data/images";
import { cn } from "@/lib/utils";
import type { QuizQuestion } from "./questions";

/** Progress dots: one per question this reader will be asked (the count shrinks as answers skip). */
export function ProgressDots({ current, total }: { current: number; total: number }) {
  return (
    <div
      role="img"
      aria-label={`Question ${current} of ${total}`}
      className="flex items-center justify-center gap-2"
    >
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          aria-hidden
          className={cn(
            "h-2.5 rounded-full transition-all",
            i + 1 === current
              ? "w-6 bg-cherry"
              : i + 1 < current
                ? "w-2.5 bg-cherry/60"
                : "w-2.5 bg-ink/15",
          )}
        />
      ))}
    </div>
  );
}

export const backBtn =
  "inline-flex min-h-11 items-center gap-1.5 border-2 border-cherry px-4 py-2 text-sm font-semibold text-cherry hover:bg-cherry hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cherry";

type Props = {
  question: QuizQuestion;
  /** Option values offered (already filtered so none contradicts an earlier answer). */
  offered: string[];
  selected: string | undefined;
  position: number;
  total: number;
  onPick: (v: string) => void;
  onBack: (() => void) | null;
};

/** One question: big one-tap option cards, progress dots and a clear Back. */
export const QuizStep = forwardRef<HTMLHeadingElement, Props>(function QuizStep(
  { question, offered, selected, position, total, onPick, onBack },
  ref,
) {
  const opts = question.options.filter((o) => offered.includes(o.v));
  return (
    <div className="paper relative mx-auto mt-8 max-w-3xl p-5 md:p-9">
      <Bow className="absolute -top-5 right-6 h-10 w-14 rotate-6 text-cherry" />
      <ProgressDots current={position} total={total} />
      <h2
        ref={ref}
        tabIndex={-1}
        className="mt-5 text-center text-3xl leading-tight outline-none md:text-4xl"
      >
        {question.q}
      </h2>
      <div
        className={cn(
          "mt-6 grid grid-cols-2 gap-3",
          opts.length === 3 || opts.length === 6 ? "md:grid-cols-3" : "md:grid-cols-4",
          opts.length % 2 === 1 && "[&>*:last-child]:col-span-2 md:[&>*:last-child]:col-span-1",
        )}
      >
        {opts.map((o) => {
          const img = o.image ? images[o.image] : undefined;
          const on = selected === o.v;
          return (
            <button
              key={o.v}
              type="button"
              onClick={() => onPick(o.v)}
              aria-pressed={on}
              className={cn(
                "group flex min-h-16 flex-col overflow-hidden border-2 bg-cream text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cherry",
                on ? "border-cherry" : "border-ink/15 hover:border-cherry",
              )}
            >
              {img ? (
                <>
                  <img
                    src={img.src}
                    alt=""
                    width={img.w}
                    height={img.h}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <span
                    className={cn(
                      "px-3 py-2.5 text-base font-semibold leading-snug",
                      on ? "bg-cherry text-cream" : "text-ink",
                    )}
                  >
                    {o.label}
                  </span>
                </>
              ) : (
                // No photo: a compact, icon-led row (a small round chip beside the label) rather than
                // a tall flat block, so it stays calm at 390px.
                <span
                  className={cn(
                    "flex min-h-16 flex-1 items-center gap-3 px-3 py-3 transition",
                    on ? "bg-cherry text-cream" : "text-ink",
                  )}
                  data-testid="quiz-icon-tile"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "grid h-10 w-10 shrink-0 place-items-center rounded-full transition",
                      on
                        ? "bg-cream text-cherry"
                        : "bg-butter text-cherry group-hover:bg-cherry/10",
                    )}
                  >
                    {o.Icon ? <o.Icon className="h-5 w-5" /> : <Sparkle className="h-4 w-4" />}
                  </span>
                  <span className="text-base font-semibold leading-snug">{o.label}</span>
                </span>
              )}
            </button>
          );
        })}
      </div>
      {onBack && (
        <button type="button" onClick={onBack} className={cn(backBtn, "mt-6")}>
          <span aria-hidden>←</span> Back
        </button>
      )}
    </div>
  );
});
