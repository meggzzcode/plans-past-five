# Pinterest asset verification (2026-11-19)

Checked locally against the repo; nothing posted or scheduled.

## Files and CSV
- 88 pins listed in `docs/pinterest-pins.csv`; all 88 files exist in `public/pins/`. PASS
- All 88 are 1000 x 1500 pixels (2:3). PASS. Total 17 MB, largest about 267 KB. PASS
- 25 are JPG (photo composites), 63 PNG (typographic). Matches the image ledger.
- Titles unique, all under 100 characters; descriptions all under 500 characters; every pin has alt text. PASS
- 11 boards. Counts: Creative Hobbies for Beginners 14, Girls' Night Ideas 11, Cozy Hobbies 10, Active Hobbies 10, Weekend Activities 9, Solo Date Ideas 9, Affordable Adventures 7, Junk Journaling 6, Hobby Starter Kits 5, After Work Activities 4, Plans Past Five 3. Board names are text only: boards must still be created by the owner.
- Seven layout templates in use (headline 23, checklist 16, cover 13, editorial 12, steps 12, quote 8, quiz 4): reasonable variety.
- I did not view each of the 88 images; layout and text overflow rely on the generator's own checks (design/pins/README.md).

## Destinations
- Every destination is a published page. 75 article pins point to published articles, none to drafts (the two drafts, make-friends-as-an-adult-through-hobbies and cute-weekend-plans-that-arent-brunch, have no pins). PASS
- 7 tool pins and 6 shop pins point to routes that exist in `src/routes` (hobby-finder, make-plans, tools/hobby-budget, tools/tonight, shop collections pottery-era, creative-girl, sporty-girl, girls-night-in, bookish-girl, little-adventures). I confirmed the route files and the collection slugs exist; I did not load the live pages (site not public).
- All tracked URLs carry utm_source=pinterest. They use `{SITE_URL}` as a placeholder. **After go-live every destination must be replaced with https://planspastfive.com** (the domain is registered but not connected to hosting).
- Publish status: every row says published-article. Suggested dates run 2027-01-04 to 2027-03-31, at most 3 pins a day.

## Gaps
- **Two published articles have no pin of their own:** how-to-host-a-paint-night-at-home and how-to-start-a-reading-journal.
- 6 shop pins (rows 35 to 40) are flagged "pin copy is generic; re-check after products are verified."
- 82 pins flagged "Confirm pin copy still matches the live page." Re-run before posting.

## Rights
- 25 pins composite one of 14 Lovable-generated images; 63 are typographic with no photo (docs/content/IMAGE-LICENCE-LEDGER.md). None of the 88 carries an AI-disclosure marker in its metadata, per the ledger.
- Pinterest policy (read 2026-11-19, https://help.pinterest.com/en/article/gen-ai-labels and https://help.pinterest.com/en-gb/node/4112): Pinterest adds an "AI modified" label to an image Pin when its system detects AI generation or modification from metadata or classifiers, or when the content owner says so; owners can appeal a label. So the 25 composite pins may be labelled. Pinterest also lets users see fewer AI Pins. I did not find a rule requiring self-labelling in what I read; I did not read the community guidelines in full.
- Image-rights status of the underlying Lovable images is in the asset rights work (workstream D), not settled here.

## Verdict
Files and destinations pass. Not postable until the domain is live, the SITE_URL placeholder is replaced, boards exist, and the owner decides about AI labelling on the 25 photo pins.
