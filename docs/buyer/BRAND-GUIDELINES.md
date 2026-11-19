# Brand guidelines (buyer edition)

Plans Past Five is a small, warm, editorial brand for women who want a life outside work: hobbies, weekend plans, solo dates, friend nights and gentle movement. This guide tells a new owner how to keep it consistent or, if you prefer, how to re-skin it. The full asset library is in `design/brand/` (start with `design/brand/README.md`).

## At a glance

- **Tagline:** Making a life, not just a living.
- **Slogan:** For the plot, not the paycheck.
- **Signature phrase:** Professionally off duty.
- **Personality:** playful, feminine, warm, clever, never childish. A witty best friend with a plan.
- **Look:** cherry red, butter yellow, strawberry pink and garden green on vanilla cream; an expressive serif (Fraunces) with one italic accent word; handwritten Caveat notes; gingham, stars, sparkles, bows and flowers used with restraint.

## Palette

| Name | Hex | Role |
|---|---|---|
| Cherry Girl | `#B83F43` | Brand, CTAs, emphasised words, logo |
| Vanilla Cream | `#FFF8EF` | Dominant background |
| Butter Yellow | `#F8E5A3` | Editorial moments, stars, accents on dark |
| Strawberry Milk | `#F4D4D7` | Soft pink sections |
| Garden Green | `#394D3C` | Footer, dark sections |
| Espresso | `#48362E` | Body text |
| Matcha | `#B5C19C` | Movement, outdoors |
| Sunday Blue | `#C9DDEC` | Calm, planning |
| Warm White | `#FFFCF8` | Cards and paper |
| Soft Border | `#E4D9CD` | Rules |
| Dark Ink | `#292722` | Headlines |

Machine-readable: `design/brand/palette/palette.json` and `.css`. Cherry on butter, strawberry or sunday is for large headline words only (about 4:1); use ink for small text. Contrast ratios are in the JSON.

## Typography

Fraunces for headlines and the wordmark, DM Sans for body and UI, Caveat for handwritten notes. Specs in `design/brand/TYPOGRAPHY.md`. All three are SIL OFL, free for commercial use; the licence files are in `design/brand/fonts/`.

## Logo

Primary stacked wordmark, horizontal wordmark and monogram badge, all as outlined SVG plus PNG exports (`design/brand/logos/`, `exports/logos/`). Keep clear space equal to the "p" height, never below about 120px wide (horizontal) or 32px (monogram), never recolour outside cherry/cream/espresso, never add a clock. "plans past five." is always lower case with the full stop.

## Voice

See `design/brand/BRAND-VOICE.md`. One signature phrase per page. Concrete first, clever second. No hustle culture, no medical claims, no fake stats, testimonials or expertise.

## How the brand applies

| Surface | How it shows up | Where to edit |
|---|---|---|
| **Website** | Cream background, cherry CTAs, serif headlines with one italic cherry word, kicker labels, gingham dividers, scalloped monogram, garden-green footer | `src/styles.css` tokens, `src/components/brand/*`, copy in `src/config/site.ts` |
| **Articles** | Kicker, headline with italic accent, honest time/cost/who blocks, pull quotes in the brand phrases, "what you'll need" lists | `src/content/*`, templates in `design/brand/article-templates/` for hero images |
| **Printables** | Warm-white paper, cherry gingham header strip, one signature phrase, playful headers, boxes and lines with generous space | `src/routes/printables.*`; styles in `src/styles.css` (`paper`, `gingham-strip`) |
| **Shop (Off Duty Essentials)** | Six collections with tone colours (butter, strawberry, matcha, sunday), still-life images labelled "illustrative", honest disclosure, search links described as search links | `src/data/products.ts`, `src/config/affiliate.ts` |
| **Tools (quiz, planner, tonight, budget)** | Cards on warm white, cherry selected states, friendly question wording, results with a playful theme name | `src/lib/finder.ts`, `src/lib/planner.ts`, route files |
| **Pinterest pins** | 8 template styles on the palette: headline, cover, editorial photo, checklist, steps, quote, printable preview, quiz promo. Fraunces headline with italic accent, Caveat note, brand wordmark footer, gingham strip | `design/pins/`, `scripts/build-pins.mjs`, copy in `design/pins/pins.mjs` |
| **Social / email** | OG image, quote post, story, avatar, board covers | `design/brand/social/` |

## Do and do not

Do: keep copy in `src/config/site.ts` and Amazon links in `src/config/affiliate.ts`; use the established phrases naturally; label AI imagery; keep pins one-idea-each.

Do not: put prices, ratings, brands or ASINs in product records unless verified; use hustle language; claim an audience or results; present AI images as real people or real products; crowd a layout with every doodle at once.

## Re-skinning (if you want your own brand)

1. Change the name, taglines and phrases in `src/config/site.ts`.
2. Change colours and fonts in `src/styles.css` (tokens and `--font-*`) and the Google Fonts link in `src/routes/__root.tsx`.
3. Redraw `src/components/brand/Wordmark.tsx` and regenerate `public/favicon.svg`.
4. Replace `design/brand/palette/*`, rerun `python3 design/brand/tools/build-logos.py`, `node design/brand/build-brand.mjs`, and `node scripts/build-pins.mjs` (edit the colours in `design/pins/pin.css` and the themes at the top of that file).
5. Replace the AI images (see `IMAGE-AND-ASSET-RIGHTS.md`) and rewrite the pin copy in `design/pins/pins.mjs`.

## Trademark note

The brand name and logo are not trademark-searched or registered. Clear and register before investing heavily.
