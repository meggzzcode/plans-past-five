# Pin system

- `pins.mjs`: the catalogue. Every pin = template + copy + Pinterest metadata (title, description, board, keywords, concept). Edit copy here.
- `templates.mjs`: the 8 HTML templates (headline, cover, editorial, checklist, steps, quote, printable, quiz) with variants.
- `pin.css`: themes (cherry, butter, straw, garden, cream, sunday, matcha) and layout. Fonts are local files from `design/brand/fonts`.
- `html/`: generated HTML for each pin (open in a browser to tweak).
- `manifest.json`: generated list with schedule day, board, template, minimum auto-fit font size.

Build: `node scripts/build-pins.mjs [--only=<id-part>] [--no-render] [--start=YYYY-MM-DD]` renders `public/pins/*` (1000x1500, JPG for photo pins, PNG otherwise) and rewrites `docs/pinterest-pins.csv`. Headlines auto-shrink to fit; the script reports any text that still overflows.
