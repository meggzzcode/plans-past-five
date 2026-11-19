# Repeat visits and sharing

Everything here uses localStorage and URLs only. No backend, accounts or newsletter.

## What is saved, and where

- Bookmarks (hobbies, stories, itineraries, shop picks): `ppf:my-plans:v1` via `src/lib/saved.ts`.
- Hobby cards, hobby profiles and the This-season strip use a heart (`SaveButton`, kind `hobby`); other kinds keep the bookmark.
  Hobbies saved this way are the "Hobby wishlist" on /saved.
- Shopping list (need / own / later): `ppf:shop-list:v1` via `src/lib/shoplist.ts` (unchanged format, plus `replaceShopList`,
  `productsWithStatus`). Shown on /saved with copy-as-text and send actions.
- /saved ("My Plans") shows "Saved on this device only" in the hero.

## Move devices (`src/lib/saved-transfer.ts`, `src/components/saved/Transfer.tsx`)

- Export: a `.json` file download or a copyable code (`PPF1.` + base64url of the same JSON).
- Import: pick a file or paste a code, see a count preview, then "Add to this device". Import only merges: newer copy of the
  same key wins, local shopping-list choices win, nothing is deleted.
- Validation (all in `parseImport`, never throws, never evals): max 400,000 chars; `app` and `v` must match; max 300 saved
  items, 500 shopping entries; every object is rebuilt from an allow-list of fields; kind must be known and the key must start
  with it; titles 1-200 chars, notes up to 1,500; control characters and `<` `>` removed; links must be same-site paths
  (single leading `/`, printable ASCII, no quotes, backslashes or angle brackets); dates must parse; plan payloads go through
  `sanitizePlanData` plus id/seed limits (a bad payload drops the payload but keeps the bookmark); shopping ids must match
  `[A-Za-z0-9][A-Za-z0-9._-]{0,79}` with status need/own/later. Invalid entries are skipped and counted.
- Tests: `src/test/saved-transfer.test.ts`.

## Sharing (`src/lib/share.ts`, `ShareButtons`)

- Pinterest: standard `https://www.pinterest.com/pin/create/button/` URL with our canonical page URL, our own image
  (hobbies without a photo let Pinterest pick from the page) and the title. No SDK, opened by the visitor.
  On articles and hobby profiles ("Pin it", aria-label "Save to Pinterest").
- Send to the group chat: `navigator.share`, falling back to copying text plus link; closing the share sheet is not an error.
  On articles, hobby profiles, saved itineraries/hobbies and the shopping list.
- Copy as text: saved itineraries, hobbies and the shopping list (`buildListText`). The planner's own Copy/Share stays in PlanResult.
- Tests: `src/test/share.test.ts`.

## This season (`src/lib/season.ts`, `src/components/home/SeasonStrip.tsx`)

- Month -> season (northern hemisphere: Dec-Feb winter, Mar-May spring, Jun-Aug summer, Sep-Nov autumn).
- Each hobby is scored from existing tags and category (e.g. winter favours `at-home`, `low-energy`, cozy/bookish; summer favours
  `outdoors`, `social`, `active`), plus a small monthly hash so the picks rotate. Max two per category, four shown.
- Rendered after mount so the browser's month is used and nothing mismatches on hydration. Tests: `src/test/season.test.ts`.

## Known limits

- Data lives per browser; clearing site data removes it (hence export). Southern-hemisphere visitors see northern seasons.
- Shopping list display on /saved only lists products in the verified catalog.
