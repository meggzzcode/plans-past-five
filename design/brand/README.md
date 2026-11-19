# Plans Past Five: brand asset library

Everything here is built from the identity already live on the site (`src/components/brand/Wordmark.tsx`, `Doodles.tsx`, `src/styles.css`). Nothing is a new identity. Written guidance for the buyer is in `docs/buyer/BRAND-GUIDELINES.md`; this file is the file map.

## Contents

| Folder | What is in it |
|---|---|
| `logos/` | Outlined (font-free) SVGs. **Primary** = stacked wordmark "plans past / *five.*" (`logo-primary-*`, with tagline variant). **Wordmark** = horizontal nav lockup (`wordmark-horizontal-*`). **Secondary** = scalloped "5 + star" monogram badge (`logo-secondary-monogram-*`). Colourways: cherry, cream (for dark), espresso one-colour, plus on-cream and on-garden versions with background. |
| `favicon/` | `favicon-source.svg`: outlined version of `public/favicon.svg` (cherry rounded square, cream italic 5, butter star). |
| `exports/` | PNG renders: logos (transparent, 2000px wide), favicon 32/48/180/192/512, social, 12 Pinterest board covers, article template samples. |
| `palette/` | `palette.json` (hex, role, WCAG ratios, approved pairs) and `palette.css` (drop-in CSS variables incl. gingham). |
| `fonts/` | Local OFL font files and licences (see its README). |
| `social/` | Editable HTML templates (open in a browser, edit text or pass query strings): OG image 1200x630, profile avatar 1000, quote post 1080, story 1080x1920, board cover 1000. |
| `article-templates/` | Editable HTML templates: hero with photo, typographic hero, pull quote, inline divider. |
| `tools/build-logos.py` | Regenerates the SVG logos from the font files (needs `pip install fonttools`). |
| `build-brand.mjs` | Regenerates every PNG in `exports/` with Playwright + Chromium. |
| `TYPOGRAPHY.md`, `BRAND-VOICE.md` | Type spec and voice guide. |

Pin templates live in `design/pins/` and are rendered by `scripts/build-pins.mjs` into `public/pins/`.

## Logo usage

- **Primary stacked logo** is for large, square-ish spaces: footer, About, covers, printable headers, packaging. Add the tagline variant ("Making a life, not just a living") only where there is room; never below roughly 200px wide.
- **Horizontal wordmark** is the nav / header / email-signature version. Minimum width about 120px.
- **Monogram badge** is for avatars, stickers, watermarks and anywhere the wordmark would be too small. Minimum about 32px. The favicon is the rounded-square cousin of the monogram.
- **Clear space:** keep at least the height of the "p" in "plans" free on every side.
- **Colour:** cherry on cream (default), cream on garden green or cherry (reversed), espresso for one-colour print. Do not recolour in other brand colours, add outlines or shadows, stretch, rotate, rewrite the wordmark in another typeface, or add a clock (the brand deliberately has no clock icon).
- **Case:** "plans past five." is always lower case with the full stop on "five.".

## Honest notes

- The SVG logos are outlined from static Fraunces files (default SOFT/WONK axes). The live site renders the wordmark as text in Fraunces with SOFT 100 and WONK 1, so the live letterforms are marginally softer. If you need an exact match for print production, set the variable font axes in Illustrator/Figma and re-trace from `src/components/brand/Wordmark.tsx`.
- There is no trademark registration for the name or logo. See `docs/buyer/BRAND-GUIDELINES.md`.
