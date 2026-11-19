# Plans Past Five — Brand Guide

**Tagline:** Making a life, not just a living.
**Slogan:** For the plot, not the paycheck.
**Signature phrase:** Professionally off duty.
**Homepage headline:** Because the best part of your day is still ahead.
**Mission:** Helping women fall in love with the life they live outside of work.
**Philosophy:** Your career can be a big part of your life without being your whole life.

Usage: tagline beneath the stacked wordmark (footer, about); slogan on select editorial/marketing moments (hero annotation, footer); signature phrase as a recurring detail (announcement strip, hero kicker). Phrase bank lives in `src/config/site.ts` — use selectively, never on every page.

## Section names
After Hours · The Weekend Edit · Creative Corner · Table for One · Better Together · A Little Movement · Off Duty Essentials · Find Your Thing · Make Some Plans · My Plans · The Out-of-Office Collection · The Out-of-Office Note · The Journal

## Color (tokens in `src/styles.css`)
| Name | Hex | Token | Role |
|---|---|---|---|
| Cherry Girl | #B83F43 | `cherry` / `primary` | brand, selected headings, CTAs |
| Vanilla Cream | #FFF8EF | `cream` / `background` | dominant background |
| Butter Yellow | #F8E5A3 | `butter` | editorial moments |
| Strawberry Milk | #F4D4D7 | `strawberry` | editorial moments |
| Garden Green | #394D3C | `garden` | footer, readable accents |
| Espresso | #48362E | `espresso` / `foreground` | body text |
| Matcha | #B5C19C | `matcha` | secondary sections |
| Sunday Blue | #C9DDEC | `sunday` | secondary sections |
| Warm White | #FFFCF8 | `warm-white` | cards, paper |
| Soft Border | #E4D9CD | `border` | rules |
| Dark Ink | #292722 | `ink` | headlines |

## Type
- **Fraunces** (headings, expressive italics, SOFT/WONK axes) — SIL Open Font License
- **DM Sans** (body/UI) — SIL Open Font License
- **Caveat** (handwritten annotations, sparingly) — SIL Open Font License
Loaded from Google Fonts in `src/routes/__root.tsx`. All are free for commercial use.

## Logo system (`src/components/brand/Wordmark.tsx`)
- `WordmarkStacked` — primary: "plans past / *five.*" with oversized italic "five."; optional tagline.
- `WordmarkInline` — horizontal nav wordmark (also the compact mobile mark).
- `Monogram` — italic "5" + star in a scalloped badge; `inverted` prop for dark variant.
- `public/favicon.svg` — cherry square, cream italic 5, butter star.
- Light/dark: cherry on cream (default); cream on garden green (footer).
All are live text/SVG, fully editable. No clock icon by design.

## Decorative kit (`Doodles.tsx`, `styles.css` utilities)
Star, Sparkle, Bow, Flower, Arrow, Squiggle, Divider; utilities `gingham`, `gingham-strip`, `postcard`, `tape`, `paper`, `kicker`, `hand`, `scallop-bottom`. Use with restraint.

## Voice
Creative, witty best friend. Contractions, specific everyday moments, gentle cheek. No hustle culture, no medical/mental-health claims, no fake stats or testimonials.
