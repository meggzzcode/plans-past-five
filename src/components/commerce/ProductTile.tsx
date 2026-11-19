import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The typographic tile: no photo, so it works like the label on a jar. Category colour, a small
 * hand-drawn doodle, and a result headline ("Decorate every page") instead of a seller name.
 * Everything here is illustration; it never pictures a specific product.
 */
export type DoodleKind =
  | "tape"
  | "journal"
  | "glue"
  | "pen"
  | "paper"
  | "paint"
  | "brush"
  | "canvas"
  | "clay"
  | "tile"
  | "card"
  | "mat"
  | "hoop"
  | "yarn"
  | "scissors"
  | "star";

type Look = { doodle: DoodleKind; tint: string; headline: string };

const TINT = {
  butter: "bg-butter",
  strawberry: "bg-strawberry",
  sunday: "bg-sunday",
  matcha: "bg-matcha/60",
} as const;

/** Category (as written in the catalog) to doodle, colour and result headline. First match wins. */
const LOOKS: [RegExp, Look][] = [
  [/washi|tape/i, { doodle: "tape", tint: TINT.butter, headline: "Decorate every page" }],
  [/journal|notebook/i, { doodle: "journal", tint: TINT.strawberry, headline: "A page to fill" }],
  [/adhesive|glue/i, { doodle: "glue", tint: TINT.sunday, headline: "Stick it down" }],
  [/ephemera|paper/i, { doodle: "paper", tint: TINT.strawberry, headline: "Layers to play with" }],
  [/pens?$/i, { doodle: "pen", tint: TINT.sunday, headline: "Write it all down" }],
  [
    /mahjong.*card|card.*mahjong/i,
    { doodle: "card", tint: TINT.sunday, headline: "Play from the card" },
  ],
  [/mahjong.*(mat|accessor)/i, { doodle: "mat", tint: TINT.matcha, headline: "Quieter tiles" }],
  [/mahjong/i, { doodle: "tile", tint: TINT.strawberry, headline: "Game night, ready" }],
  [/table cover/i, { doodle: "mat", tint: TINT.matcha, headline: "Protect the table" }],
  [/clay/i, { doodle: "clay", tint: TINT.butter, headline: "Shape it tonight" }],
  [/sealer/i, { doodle: "paint", tint: TINT.sunday, headline: "Finish it off" }],
  [/acrylic/i, { doodle: "paint", tint: TINT.matcha, headline: "Colour for your pieces" }],
  [/watercolou?r paper/i, { doodle: "paper", tint: TINT.sunday, headline: "A page to paint on" }],
  [/watercolou?r/i, { doodle: "paint", tint: TINT.sunday, headline: "Paint right away" }],
  [/brush/i, { doodle: "brush", tint: TINT.matcha, headline: "Brush in hand" }],
  [/canvas/i, { doodle: "canvas", tint: TINT.strawberry, headline: "A canvas each" }],
  [/embroidery kit/i, { doodle: "hoop", tint: TINT.butter, headline: "Stitch your first hoop" }],
  [/scissor/i, { doodle: "scissors", tint: TINT.butter, headline: "Snip clean" }],
  [/yarn/i, { doodle: "yarn", tint: TINT.strawberry, headline: "Soft start" }],
];

export function lookFor(category: string): Look {
  for (const [re, look] of LOOKS) if (re.test(category)) return look;
  return { doodle: "star", tint: TINT.butter, headline: category };
}

const ink = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function paths(kind: DoodleKind): ReactNode {
  switch (kind) {
    case "tape":
      return (
        <>
          <circle cx="24" cy="26" r="14" />
          <circle cx="24" cy="26" r="5" />
          <path d="M38 30 L50 36 L46 42 L36 36" />
        </>
      );
    case "journal":
      return (
        <>
          <rect x="12" y="8" width="30" height="40" rx="2" />
          <path d="M18 8 V48 M26 18 H36 M26 25 H36 M26 32 H32" />
        </>
      );
    case "glue":
      return (
        <>
          <rect x="18" y="24" width="20" height="26" rx="3" />
          <rect x="21" y="10" width="14" height="14" rx="2" />
          <path d="M24 36 H32" />
        </>
      );
    case "pen":
      return <path d="M12 46 L16 36 L38 12 L46 20 L22 42 Z M34 16 L42 24" />;
    case "paper":
      return (
        <>
          <path d="M10 14 L34 10 L38 34 L14 38 Z" />
          <path d="M24 22 L46 20 L48 46 L26 48 Z" />
        </>
      );
    case "paint":
      return (
        <>
          <path d="M28 10 C14 10 8 22 10 32 C12 44 26 48 34 44 C40 40 34 34 38 30 C44 26 48 22 44 18 C40 12 34 10 28 10 Z" />
          <circle cx="20" cy="24" r="2.5" />
          <circle cx="30" cy="20" r="2.5" />
          <circle cx="38" cy="26" r="2.5" />
        </>
      );
    case "brush":
      return (
        <>
          <path d="M44 8 L26 28" />
          <path d="M26 28 C18 28 14 34 14 40 C14 44 12 46 10 48 C20 50 30 48 32 38 C32 34 30 30 26 28 Z" />
        </>
      );
    case "canvas":
      return (
        <>
          <rect x="10" y="10" width="36" height="30" rx="1" />
          <path d="M16 34 L24 24 L30 30 L36 20 L42 34" />
          <path d="M18 40 L14 50 M38 40 L42 50" />
        </>
      );
    case "clay":
      return (
        <>
          <path d="M10 28 C10 20 18 16 28 16 C38 16 46 20 46 28 L42 42 C40 46 34 48 28 48 C22 48 16 46 14 42 Z" />
          <path d="M16 28 C20 32 36 32 40 28" />
        </>
      );
    case "tile":
      return (
        <>
          <rect x="12" y="8" width="26" height="36" rx="4" />
          <rect x="18" y="14" width="26" height="36" rx="4" />
          <circle cx="31" cy="32" r="5" />
        </>
      );
    case "card":
      return (
        <>
          <rect x="8" y="12" width="40" height="32" rx="2" />
          <path d="M14 22 H42 M14 30 H42 M14 38 H30" />
        </>
      );
    case "mat":
      return (
        <>
          <rect x="8" y="14" width="34" height="30" rx="2" />
          <path d="M42 20 C50 20 50 40 42 40" />
          <path d="M16 24 H34 M16 32 H28" />
        </>
      );
    case "hoop":
      return (
        <>
          <circle cx="26" cy="28" r="18" />
          <circle cx="26" cy="28" r="13" />
          <path d="M20 28 C22 22 26 34 30 28 C32 24 34 30 34 30" />
        </>
      );
    case "yarn":
      return (
        <>
          <circle cx="26" cy="28" r="17" />
          <path d="M12 20 C22 28 32 28 40 20 M10 30 C22 38 34 38 42 30 M16 42 C24 36 32 36 38 42" />
          <path d="M40 40 C48 46 50 50 44 52" />
        </>
      );
    case "scissors":
      return (
        <>
          <circle cx="16" cy="40" r="6" />
          <circle cx="34" cy="40" r="6" />
          <path d="M19 35 L40 10 M31 35 L10 10" />
        </>
      );
    default:
      return <path d="M28 8 L33 22 L48 22 L36 31 L41 46 L28 37 L15 46 L20 31 L8 22 L23 22 Z" />;
  }
}

export function Doodle({ kind, className }: { kind: DoodleKind; className?: string }) {
  return (
    <svg
      viewBox="0 0 56 56"
      aria-hidden="true"
      focusable="false"
      className={cn("shrink-0", className)}
      {...ink}
    >
      {paths(kind)}
    </svg>
  );
}
