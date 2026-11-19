import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Clock, Wallet, Zap, Share2, Download } from "lucide-react";
import { findHobbies, plannerSearch, type Constraint, type FinderAnswers } from "@/lib/finder";
import { QUIZ_ORDER, type QuizKey } from "@/lib/quiz-flow";
import type { Hobby } from "@/data/hobbies";
import { images, type ImageKey } from "@/data/images";
import type { PersonaKey } from "@/lib/finder";
import { selectProducts } from "@/data/catalog";
import { toneBg } from "@/components/editorial/Section";
import { Bow, Flower, Sparkle, Star } from "@/components/brand/Doodles";
import { SaveButton } from "@/components/editorial/SaveButton";
import { ShopMyHobby } from "@/components/commerce/ShopMyHobby";
import { cn } from "@/lib/utils";
import { canonicalUrl } from "@/lib/share";
import { track } from "@/lib/track";
import { answerLabel } from "./questions";
import { backBtn } from "./QuizStep";
import { copyLink, downloadBlob, fileNameFor, renderCardPng, shareResult } from "./share";

const personaImage: Record<PersonaKey, ImageKey> = {
  creative: "junkJournal",
  cozy: "shopGirlsNight",
  sporty: "tennis",
  bookish: "shopBookish",
  "little-adventurer": "hiking",
  "social-butterfly": "girlsNight",
  "slow-living": "picnic",
  "curious-beginner": "potteryNight",
};

const tiles: Record<Hobby["category"], { tone: keyof typeof toneBg; Icon: typeof Star }> = {
  creative: { tone: "butter", Icon: Flower },
  cozy: { tone: "strawberry", Icon: Bow },
  social: { tone: "strawberry", Icon: Sparkle },
  active: { tone: "matcha", Icon: Star },
  outdoors: { tone: "matcha", Icon: Flower },
  bookish: { tone: "sunday", Icon: Sparkle },
};

const breakLabel: Record<Constraint, string> = {
  craving: "Fits the rest, not your craving",
  where: "Different setting",
  time: "Takes longer",
  budget: "Costs more",
  company: "Different company",
  energy: "Needs more energy",
  level: "Harder to start",
};

const chip =
  "inline-flex items-center gap-1 bg-cream px-2 py-1 text-xs font-medium text-espresso ring-1 ring-ink/10";

function ResultCard({ h, badge, note }: { h: Hobby; badge?: string | undefined; note?: string }) {
  const img = h.image ? images[h.image] : undefined;
  const tile = tiles[h.category];
  return (
    <li className="paper relative flex flex-col overflow-hidden">
      <Link
        to="/hobbies/$slug"
        params={{ slug: h.slug }}
        className="not-prose group relative block no-underline"
      >
        {img ? (
          <img
            src={img.src}
            alt={img.alt}
            width={img.w}
            height={img.h}
            loading="lazy"
            className="aspect-[5/3] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            data-fallback-tile
            className={cn(
              "relative grid aspect-[5/3] place-items-center overflow-hidden px-5 text-center",
              toneBg[tile.tone],
            )}
          >
            <tile.Icon className="pointer-events-none absolute -bottom-4 -right-3 h-24 w-24 rotate-12 text-cherry/15" />
            <tile.Icon className="pointer-events-none absolute left-4 top-4 h-6 w-6 text-cherry/40" />
            <span className="font-display text-3xl italic leading-tight text-ink">{h.name}</span>
          </div>
        )}
        {badge && (
          <span className="absolute left-3 top-3 bg-cherry px-2.5 py-1 text-xs font-semibold text-cream">
            {badge}
          </span>
        )}
      </Link>
      <div className="absolute right-3 top-3">
        <SaveButton
          compact
          item={{
            key: `hobby:${h.slug}`,
            kind: "hobby",
            title: h.name,
            href: `/hobbies/${h.slug}`,
          }}
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        {img && <h3 className="text-2xl leading-tight">{h.name}</h3>}
        <ul className="flex flex-wrap gap-1.5">
          <li className={chip}>
            <Clock className="h-3.5 w-3.5 text-cherry" aria-hidden />
            {h.timeLabel}
          </li>
          <li className={chip}>
            <Wallet className="h-3.5 w-3.5 text-cherry" aria-hidden />
            {h.costLabel}
          </li>
          <li className={chip}>
            <Zap className="h-3.5 w-3.5 text-cherry" aria-hidden />
            {h.energy} energy
          </li>
        </ul>
        {note && <p className="text-xs font-semibold text-cherry">{note}</p>}
        <p className="bg-butter px-3 py-2 text-sm text-ink">
          <span className="font-semibold text-cherry">Tonight, try: </span>
          {h.firstActivity}
        </p>
        <Link
          to="/hobbies/$slug"
          params={{ slug: h.slug }}
          hash="kit"
          className="mt-auto inline-flex min-h-11 items-center text-sm font-semibold text-cherry underline underline-offset-4 hover:text-ink"
        >
          What you'll need <span className="sr-only">for {h.name}</span>
        </Link>
      </div>
    </li>
  );
}

const secondaryBtn =
  "inline-flex min-h-12 items-center justify-center gap-2 border-2 border-cherry px-6 py-3 text-sm font-semibold text-cherry hover:bg-cherry hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cherry";

export function ResultsView({
  a,
  onBack,
  onRetake,
  onEdit,
}: {
  a: FinderAnswers;
  onBack: (() => void) | null;
  onRetake: () => void;
  /** Jump to one question (keeps every answer before it). */
  onEdit: (key: QuizKey) => void;
}) {
  const { results, persona, strength, nearest, loosen, beginnerPick } = findHobbies(a);
  const strong = strength === "strong";
  const picks = results.slice(0, 3).map((r) => r.hobby);
  const hasList = strong && !!picks[0] && selectProducts({ hobby: picks[0].slug }).all.length > 0;
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => titleRef.current?.focus(), []);
  useEffect(() => {
    track("quiz_complete", { persona: persona.key });
  }, [persona.key]);

  const loosenKey =
    loosen && (QUIZ_ORDER as readonly string[]).includes(loosen.constraint)
      ? (loosen.constraint as QuizKey)
      : null;
  const img = images[personaImage[persona.key]];
  const url = () => canonicalUrl(`${window.location.pathname}${window.location.search}`);
  const share = async () => {
    setBusy(true);
    setNote(await shareResult(persona, picks, url()));
    setBusy(false);
  };
  const savePng = async () => {
    setBusy(true);
    try {
      downloadBlob(await renderCardPng(persona, picks), fileNameFor(persona));
      setNote("Image saved.");
    } catch {
      setNote("Couldn't make the image on this browser. Try Share instead.");
    }
    setBusy(false);
  };

  return (
    <div>
      {onBack && (
        <button type="button" onClick={onBack} className={backBtn}>
          <span aria-hidden>←</span> Back
        </button>
      )}

      {strong ? (
        <header className="mt-6 grid items-center gap-5 text-center md:grid-cols-[260px_1fr] md:text-left">
          <img
            src={img.src}
            alt={img.alt}
            width={img.w}
            height={img.h}
            className="mx-auto aspect-square w-48 border-4 border-cream object-cover shadow-[var(--shadow-paper)] md:w-full"
          />
          <div>
            <p className="hand text-3xl text-cherry">you're giving…</p>
            <h1 ref={titleRef} tabIndex={-1} className="text-5xl italic outline-none md:text-6xl">
              {persona.name}
            </h1>
            <p className="mt-2 text-lg text-ink">{persona.line}</p>
          </div>
        </header>
      ) : (
        <header className="mx-auto mt-6 max-w-2xl border-2 border-dashed border-cherry bg-cream p-5 text-center">
          <h1 ref={titleRef} tabIndex={-1} className="text-4xl italic outline-none md:text-5xl">
            {results.length
              ? `${results.length === 1 ? "One hobby fits" : `${results.length} hobbies fit`} every answer`
              : "Nothing fits every answer"}
          </h1>
          <p className="mt-2 text-espresso">
            {loosen
              ? `More come close. Loosening your ${loosen.label} opens up even more.`
              : "Here are the nearest matches."}
          </p>
          {loosenKey && (
            <button
              type="button"
              onClick={() => onEdit(loosenKey)}
              className="mt-3 inline-flex min-h-11 items-center bg-cherry px-5 py-2.5 text-sm font-semibold text-cream hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              Change my {loosen!.label}
            </button>
          )}
        </header>
      )}

      <ul
        className="mt-8 flex flex-wrap justify-center gap-2 text-xs"
        aria-label="Your answers (tap to change one)"
      >
        {QUIZ_ORDER.map((k) => (
          <li key={k}>
            <button
              type="button"
              onClick={() => onEdit(k)}
              className="min-h-8 bg-cream px-2.5 py-1 font-medium text-espresso ring-1 ring-ink/15 hover:ring-cherry focus-visible:outline focus-visible:outline-2 focus-visible:outline-cherry"
            >
              {answerLabel(k, a[k as keyof FinderAnswers] as string)}
            </button>
          </li>
        ))}
      </ul>

      <ol className="mt-6 grid gap-5 md:grid-cols-3">
        {strong
          ? picks.map((h, i) => (
              <ResultCard
                key={h.slug}
                h={h}
                badge={
                  i === 0
                    ? h.slug === beginnerPick?.slug
                      ? "Easiest start"
                      : "Best match"
                    : undefined
                }
              />
            ))
          : [
              ...results.map((r) => (
                <ResultCard key={r.hobby.slug} h={r.hobby} badge="Fits everything" />
              )),
              ...nearest.map((n) => (
                <ResultCard
                  key={n.hobby.slug}
                  h={n.hobby}
                  badge="Nearly"
                  note={n.breaks
                    .map((c) => breakLabel[c])
                    .slice(0, 1)
                    .join("")}
                />
              )),
            ]}
      </ol>

      <div className="mt-10 flex flex-col items-center gap-3">
        {hasList && (
          <a
            href="#starter-list"
            className="inline-flex min-h-12 w-full max-w-sm items-center justify-center bg-cherry px-6 py-3 text-center text-base font-semibold text-cream hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Get my starter list
          </a>
        )}
        <Link
          to="/make-plans"
          search={plannerSearch(a, persona)}
          className={
            hasList
              ? secondaryBtn + " w-full max-w-sm"
              : "inline-flex min-h-12 w-full max-w-sm items-center justify-center bg-cherry px-6 py-3 text-center text-base font-semibold text-cream hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          }
        >
          Plan my weekend with this
        </Link>
        {strong && (
          <div className="no-print flex w-full max-w-sm flex-col gap-2">
            <button type="button" onClick={share} disabled={busy} className={secondaryBtn}>
              <Share2 className="h-4 w-4" aria-hidden /> Send this to the group chat
            </button>
            <div className="flex justify-center gap-5 text-sm font-semibold">
              <button
                type="button"
                onClick={savePng}
                className="inline-flex items-center gap-1.5 text-ink underline underline-offset-4"
              >
                <Download className="h-4 w-4" aria-hidden /> Save as image
              </button>
              <button
                type="button"
                onClick={async () => setNote(await copyLink(url()))}
                className="text-ink underline underline-offset-4"
              >
                Copy link
              </button>
            </div>
          </div>
        )}
        <p role="status" className="min-h-5 text-xs text-ink">
          {note}
        </p>
        <button
          type="button"
          onClick={onRetake}
          className="text-sm font-semibold text-muted-foreground underline underline-offset-4"
        >
          Take it again
        </button>
        <p className="text-xs text-muted-foreground">
          Made on your device, no email asked. The link holds only your answers, so you can send it
          to a friend.
        </p>
      </div>

      {strong && picks[0] && hasList && (
        <div id="starter-list" className="scroll-mt-24">
          <ShopMyHobby
            hobby={picks[0].slug}
            title={`Your starter list for ${picks[0].name}`}
            dek="Everything you need for the first session, nothing you don't. Tap the list icon on anything you want, then copy or print it."
          />
        </div>
      )}
    </div>
  );
}
