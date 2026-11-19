# Buyer presentation kit

Contents of this folder (generated 2026-11-19 from the local dev server):

| File | What |
|---|---|
| `PRESENTATION.html` | 19-slide buyer deck (US Letter landscape), brand-styled, uses `screenshots/` and the repo's pin, printable and kit preview images by relative path |
| `PRESENTATION.pdf` | PDF render of the deck (19 pages, about 30 MB) |
| `screenshots/` | 50 JPEG screenshots (25 pages x desktop 1440x900 and mobile 390x844, deviceScaleFactor 2) plus `capture-report.json` |
| `WALKTHROUGH-SCRIPT.md`, `SHOT-LIST.md` | Video script and shot list. **No video was recorded.** |
| `render-pdf.mjs` | Renders the PDF and checks for slide overflow |

## Regenerate

```
cd /home/user/plans-past-five
bunx vite dev --host 127.0.0.1 --port 5299 &        # --host 127.0.0.1 is needed where IPv6 is unavailable
node scripts/capture-screenshots.mjs http://127.0.0.1:5299
node docs/marketplace/presentation/render-pdf.mjs
kill %1                                              # stop the dev server
```

Requires Playwright with Chromium installed (no extra install step is run by the scripts). Capture takes about 4 minutes. Delete old files in `screenshots/` first if you rename shots.

## What was captured (all 25 pages, desktop and mobile; 0 failures)

Home; the six category pages (After Hours, Weekend Edit, Table for One, Better Together, Creative Corner, A Little Movement); journal index; article `how-to-start-junk-journaling`; hobby directory; hobby profile (`pottery-painting`); quiz in progress (3 answers) and quiz result; Make Some Plans with a generated itinerary (via URL parameters); `/tools/hobby-budget` and `/tools/tonight` with a result showing; shop index and the `pottery-era` collection; `/printables` and `/printables/hobby-era-tracker`; My Plans with a saved item (Pottery Painting, saved through the UI); editorial policy, methodology, corrections, affiliate disclosure. The result of each run is in `screenshots/capture-report.json`; any failure is listed under `notCaptured` and the script exits non-zero.

## Not captured

- No video (no recording tool). See `WALKTHROUGH-SCRIPT.md` and `SHOT-LIST.md`; Cowork task C9.
- No production screenshots: the site is not deployed.
- Mobile shots show page layout only; no real-device testing was done.

## Limitations

- Screenshots come from the **local dev server**, not production. Fonts, images and layout can differ from a deployed build; dev-server overlays (if any) were not observed.
- Each screenshot is the full page capped at 3600 CSS px (desktop) or 4800 CSS px (mobile) to keep file sizes down, so the bottoms of very long pages (home, article, hobby directory) are cut off. JPEG quality 86.
- Slides crop screenshots to the top of each page.
- Content counts in the deck were read from the repo on 2026-11-19 (4 published articles; 28 draft article files; 2 outline-only stubs; 36 hobbies; 8 collections; 36 product-type records; 6 printables; 2 premium kits; 95 pin images). Re-check them if the repo has changed; the 28 drafts are wired into `src/content/index.ts` and stay hidden while status is draft.
- The deck contains no earnings, traffic or ranking figures. Costs are listed as UNCONFIRMED, as in `docs/buyer/OPERATING-COSTS.md`.
- The Fraunces, DM Sans and Caveat fonts are loaded from `design/printables/fonts/`, so the HTML must stay in this folder (or keep the relative paths) to render correctly.
