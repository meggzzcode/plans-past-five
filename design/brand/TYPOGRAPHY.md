# Typography specification

Read from `src/styles.css` (`--font-display`, `--font-sans`, `--font-hand`) and `src/routes/__root.tsx` (Google Fonts links). All three families are SIL Open Font License, free for commercial use.

| Role | Family | Weights | Where |
|---|---|---|---|
| Display / headlines | **Fraunces** (variable: opsz, wght, SOFT, WONK) fallback Georgia, serif | 500 medium, 600 semibold, italics 600 | Wordmark ("plans past" 500, "five." 600 italic), h1 to h4, pull quotes, numerals |
| Body / UI | **DM Sans** fallback system-ui, sans-serif | 400, 500, 700 | Paragraphs, nav, buttons, labels, kickers |
| Handwritten accent | **Caveat** fallback "Segoe Print", cursive | 500, 700 (site utility `hand` uses 600) | Margin notes, arrows, sticker captions. Sparingly: one or two short phrases per layout |

## Site settings (from `src/styles.css`)

- Headings: Fraunces, letter-spacing -0.015em, colour `ink` (#292722). Display sizes use tighter tracking (-0.03em).
- Wordmark: `font-variation-settings: "SOFT" 100, "WONK" 1`. "plans past" at 0.42em (stacked) or 1em (inline); "five." at 1em (stacked, 600 italic, tracking -0.04em) or 1.45em (inline).
- Body: DM Sans on `espresso` (#48362E). Article prose 1.075rem / 1.78 line height; article h2 1.9rem, h3 1.35rem.
- Kicker: DM Sans 600, 0.72rem, tracking 0.18em, uppercase (`kicker` utility).
- Emphasis: one italic accent word per headline in cherry (or butter on dark). Never more than a couple of words.
- Handwriting: Caveat, colour cherry or butter, slightly rotated (-2 to -4 degrees), never for body copy.

## Print and pin settings (used in `design/pins/pin.css`)

| Element | Spec |
|---|---|
| Pin headline | Fraunces 600, line-height 0.98 to 1.04, tracking -0.03em, auto-fits between 52px and 150px on a 1000px canvas |
| Pin emphasised words | Fraunces 600 italic in the theme accent colour |
| Kicker pill | DM Sans 700, 27px, tracking 0.2em, uppercase, cherry pill with cream text (butter pill with ink text on cherry/garden) |
| Supporting line | DM Sans 500, 34 to 40px |
| Handwritten note | Caveat 700, 52 to 60px, rotated -4 degrees, accent colour |
| Brand footer | "plans past *five.*" Fraunces 500 + 600 italic, 38 to 42px |

## Rules

1. Maximum two typefaces per layout plus an optional Caveat note.
2. Body text 16px minimum on screen; 11pt minimum on printables.
3. Respect the contrast pairs in `palette/palette.json`. Cherry on butter, strawberry or sunday is for large headline words only.
4. Italic is for emphasis, not for paragraphs.
5. If Google Fonts cannot load, the fallbacks (Georgia / system-ui) keep the layout intact but lose personality; self-host with `@fontsource` (see `fonts/README.md` for licences) for offline reliability.
