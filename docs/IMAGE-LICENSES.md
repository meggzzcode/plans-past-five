# Image inventory & licensing

All images were generated with Lovable's AI image tool (Nov 2026) for this project and stored locally in `src/assets/`. They depict no real, identifiable people or brands and may be transferred with the site. Alt text lives in `src/data/images.ts`.

| File | Subject | Used on |
|---|---|---|
| hero-pottery-night.jpg | three friends painting cherry mugs | home hero, pottery hobby, article 1 |
| tennis-golden-hour.jpg | woman on tennis court, red cardigan | home hero, A Little Movement, tennis |
| junk-journal-flatlay.jpg | open junk journal flat lay | Creative Corner, articles 3 & 6 |
| solo-cafe-date.jpg | woman reading at pink café | Table for One, book clubs |
| weekend-picnic.jpg | friends on gingham picnic blanket | hero, Weekend Edit, picnicking |
| watercolor-evening.jpg | woman painting at kitchen table at night | After Hours, article 2, watercolor |
| girls-night-crafts.jpg | friends making bracelets around mahjong | Better Together, craft nights, mahjong |
| hiking-wildflowers.jpg | woman hiking wildflower trail | hiking |
| shop-pottery-era.jpg … shop-girls-night-in.jpg (6) | styled collection still lifes | shop collections (labelled illustrative) |

Total: 14. Shop images are illustrative styling, not specific Amazon products; no Amazon images are used.

## Still needed (for Claude Code)
- Article heroes for the 8 drafts (solo date, tennis lesson, craft night hosting, watercolor tutorial, weekend plans) — avoid reusing current images.
- Hobby-specific photos for hobbies without an image (e.g. crochet, roller skating, birdwatching, thrifting, museum).
- 1200×630 social share image with the wordmark; Pinterest pin templates (1000×1500).
- Printable preview mockups (photo of printed sheet on a desk).

## Downloads and kits (PDFs, previews, covers)

Added with the downloadable resources. All of this is original to Plans Past Five and may be transferred with the site.

- **Artwork:** only the brand doodles from `src/components/brand/Doodles.tsx` (star, sparkle, bow, flower, arrow, squiggle, redrawn as inline SVG in `design/printables/_generator/lib.mjs`) and CSS-generated shapes (gingham, dotted grids, rules). No stock images, no AI images, no third-party clip art, no photographs.
- **Text:** all prompts, lists, checklists and instructions were written for this project. No copied or adapted third-party text. Hobby and activity names are generic everyday terms; no brands, prices, ratings or ASINs appear.
- **Fonts (embedded in the PDFs, files in `design/printables/fonts/`):** Fraunces, DM Sans and Caveat, all SIL Open Font License 1.1 (licence texts alongside). OFL permits embedding in PDFs and commercial use; the fonts themselves must not be sold on their own.
- **Preview PNGs and kit covers:** screenshots of our own pages, rendered by Chromium via `scripts/build-printables.mjs`. Kit cover mockups show tilted screenshots of those pages on a flat colour.
- **Free downloads:** `public/downloads/*.pdf` and `*-preview*.png`, six files, linked from `/printables`. **Premium kits:** `design/kits/<kit>/dist/` (not in `public/`); only marketing preview PNGs are copied to `public/downloads/kit-previews/`.
- **Customer usage terms for the kits** are a draft that still needs owner review (`design/kits/*/USAGE-TERMS.md`).
