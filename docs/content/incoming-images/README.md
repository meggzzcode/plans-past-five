# Incoming images

Drop downloaded image files here. `scripts/ingest-images.mjs` turns them into site images. Never hotlink; every image needs a recorded source URL, creator, licence name, licence URL and date. AI-generated images must be labelled (licenceName says "AI-generated"). See `docs/content/IMAGE-SOURCING-BRIEF.md` for what to look for.

## Workflow

1. **Download** the largest/original size (at least 1600 px wide) from Unsplash, Pexels, Pixabay, or generate with Canva or Lovable. Skip anything showing brands, logos, text, watermarks or identifiable minors.
2. **Drop the file** into this folder (`docs/content/incoming-images/`), any name, for example `crochet-hands.jpg`.
3. **Fill the CSV:** copy `docs/content/new-images.template.csv` to `docs/content/new-images.csv` and add one row per image (key, file, alt, source, creator, sourceUrl, licenseName, licenseUrl, dateSourced, heroFor, pinFor, notes). Read the site's licence page and record its URL and today's date; do not guess licences.
4. **Check, then ingest:**
   ```
   node scripts/ingest-images.mjs --check
   node scripts/ingest-images.mjs
   ```
   `--check` validates everything and writes nothing. The real run resizes to at most 1600 px wide JPEG (quality 82, metadata stripped) into `src/assets/`, updates `src/data/images.extra.ts`, sets `hero:` in the listed articles, and appends rows to `docs/IMAGE-LICENSES.md`. Re-running with the same CSV changes nothing.
5. **Run tests and review:** `bunx prettier --write src/data/images.extra.ts`, `bunx vitest run`, `bunx tsc --noEmit`, `bunx vite build`, then review `git diff`. If pins should use a new photo, run `node scripts/build-pins.mjs` after updating the pin data.

## Requirements

- Image tool (not a package.json dependency): the script uses `sharp` if you have it installed, otherwise Python 3 with Pillow (`pip install pillow`), otherwise ImageMagick.
- Rules checked by the script: width at least 1600 px, camelCase unused key, alt text 20 to 160 characters with no brand names, https source and licence URLs, a real date, an allowed source, and an AI label in licenseName for Canva AI and Lovable AI.
- Source files in this folder are kept out of the site; only the resized copy in `src/assets/` ships.
