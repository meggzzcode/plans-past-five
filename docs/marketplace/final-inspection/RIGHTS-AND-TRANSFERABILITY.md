# Rights and transferability

Verified 2026-11-19 against the repo at `/home/user/plans-past-five`. This is an evidence record, not legal advice. "Read" means the page text was retrieved by tool on 2026-11-19; where a page was blocked it says so and nothing is guessed.

## 1. Terms read (URL, date, result)

| Source | URL | Date | Result |
|---|---|---|---|
| Lovable Terms of Service | https://lovable.dev/terms | 2026-11-19 | READ. Effective Date August 15, 2026; Last Updated August 28, 2026. "As between us, you own your Customer Data" and "you also own any AI Output generated for you through the Services". Licence is for "personal or internal business purposes" and lets end users access projects. Users "may not assign, delegate, or transfer these Terms". The terms do not mention images specifically; AI features may use third-party model providers, which are "subject to that provider's own terms". Read via a summarising fetch, so quote-check against the live page before relying on wording |
| Canva AI Product Terms | https://www.canva.com/policies/ai-product-terms/ | 2026-11-19 | **403 Forbidden, NOT READ live today.** Earlier snippet-level record in `docs/content/CANVA-LICENCE-TERMS.md` (read 2026-11-19 in the earlier session) |
| Canva Help, products for sale | https://www.canva.com/help/using-canva-to-create-products-for-sale/ | 2026-11-19 | **403, NOT READ live** (earlier snippet record in CANVA-LICENCE-TERMS.md) |
| Canva Help, copyright and ownership | https://www.canva.com/help/copyright-design-ownership/ | 2026-11-19 | **403, NOT READ live** |
| Canva AI page | https://www.canva.com/canva-ai/ | 2026-11-19 | **403, NOT READ live** |
| SIL Open Font License 1.1 official text | https://openfontlicense.org/open-font-license-official-text/ | 2026-11-19 | READ. Permission to use, study, copy, merge, embed, modify, redistribute and sell modified and unmodified copies; conditions: copyright notice and licence with each copy, the font may not be sold by itself, Reserved Font Names rules for modified versions, derivatives stay under the OFL; the licence does not apply to documents created using the font |
| Fraunces OFL.txt | https://github.com/googlefonts/fraunces/blob/master/OFL.txt | 2026-11-19 | READ. "Copyright 2018 The Fraunces Project Authors"; no Reserved Font Name named |
| Caveat OFL.txt | https://github.com/googlefonts/caveat/blob/main/OFL.txt | 2026-11-19 | READ. "Copyright 2014 The Caveat Project Authors"; SIL OFL 1.1 |
| DM Sans OFL.txt (GitHub) | https://github.com/googlefonts/dm-fonts/blob/main/OFL.txt | 2026-11-19 | **404, NOT FOUND at that path.** The repo copy `design/brand/fonts/OFL-DMSans.txt` states "Copyright 2014 The DM Sans Project Authors" and SIL OFL 1.1 |
| Google Fonts developer docs / FAQ | https://developers.google.com/fonts/getting_started ; https://fonts.google.com/faq | 2026-11-19 | Fetched but the pages returned no licensing text (docs page has none; FAQ page content did not load). **Google Fonts licensing statement NOT CONFIRMED from Google today**; the OFL texts above are the evidence |
| Unsplash, Pexels, Pixabay | n/a | 2026-11-19 | Not used. No stock photo is in the repo (ledger "What we do not claim"; `ingest-images` supports them but no row uses them) |
| npm dependency licences | local: `bunx license-checker --production --summary` and without `--production` | 2026-11-19 | RUN, results in section 5 |

## 2. Image and asset evidence table

| Asset | Count | Evidence in repo | Tool of origin | Commercial use | Transferable to a buyer | Verdict |
|---|---|---|---|---|---|---|
| `src/assets/*.jpg`, 14 original images (8 lifestyle, 6 shop still lifes) | 14 | Ledger row per file (`docs/content/IMAGE-LICENCE-LEDGER.md`, test `image-ledger.test.ts` passes); `docs/IMAGE-LICENSES.md`; C2PA/IPTC `trainedAlgorithmicMedia` present in all 14 (`strings`, 23 to 26 matches each); record names software agent "gpt-image" | Lovable AI image tool (per project record; underlying model provider named in the file metadata, not confirmed with a vendor) | Lovable terms: you own AI Output; use "for personal or internal business purposes" and to serve end users. Commercial publishing on a site is consistent with this, but the wording is not an explicit grant to resell outputs | Terms bar assigning the **Terms** (account contract); they do not address assigning individual outputs. Whether ownership of outputs can be passed to a buyer is **not stated**. Copyright in AI images may not exist | **Needs buyer's own confirmation**; include as "as-is, AI-generated, no exclusivity" |
| `src/assets/*.jpg`, 4 Canva images (crochet-hands, flower-arranging, cycling-lane, cozy-corner) | 4 | Ledger rows; XMP DigitalSourceType added (1 match each); Canva share links recorded | Canva AI | Earlier record: Canva says AI images "are not covered by Canva's Content License Agreement" and "can be used for any lawful purpose" subject to AI Product Terms. Today's pages returned 403 so **not re-confirmed** | Not stated by Canva in anything read | **Needs buyer's own confirmation**; same statement as above |
| `public/lcp/hero-pottery-night-960.jpg` | 1 | Derivative of an original Lovable image. **Ledger row was missing; added today** (derivative section of the ledger) | Lovable AI + in-repo resize | as source | as source | Same as source |
| `public/pins/*` | 88 (25 with a photo, 63 typographic) | Manifest `design/pins/manifest.json`: 14 distinct Lovable images composited; no Canva image used on a pin; **no AI provenance metadata on any pin** (`strings` finds none). Ledger rows added today | Lovable images + in-repo layouts, fonts under OFL | as source image; typographic pins carry only original text and OFL fonts | as source image | Photo pins inherit image terms; typographic pins are clean |
| Shop collection images (6) | 6 | Ledger; labelled illustrative; no product shown | Lovable | as above | as above | As the 14 originals. Not Amazon or brand imagery |
| `docs/content/incoming-images/` (7) and `sliced-tiles/` (24) | 31 | Canva sheets and tiles, 4 recorded in ledger; rest added in the derivative section | Canva AI | as Canva | as Canva | Archive only, not on the site; exclude from the listing's "included" visuals, or include with the same caveat |
| Logos (12 SVG, 12 PNG), monogram, wordmark | 24 | `design/brand/logos`, `build-logos.py`; per `docs/buyer/IMAGE-AND-ASSET-RIGHTS.md` section 2 composed in-repo from `Wordmark.tsx`, `Doodles.tsx` and OFL fonts. Not verified here by anyone other than reading that document and the generator script | In-repo | Yes | Yes with the repo; no written assignment from a creator exists in the repo | **Can transfer.** Not a registered trademark; no clearance (`docs/NAME-CHECK-planspastfive.md` exists, read it before stating availability) |
| Doodles (`src/components/brand/Doodles.tsx`: Star, Sparkle, Bow, Flower, Arrow, Squiggle, Divider) | 7 | SVG paths in source (92 lines) | In-repo | Yes | Yes | **Can transfer** |
| Favicons and icons | 1 SVG, 1 ICO, 3 PNG + 5 PNG exports | `public/favicon.svg` is a rect plus the Fraunces italic "5" and a butter-yellow sparkle path | In-repo | Yes | Yes | **Can transfer** (text rendered in an OFL font) |
| Templates and board covers, social exports | 10 HTML + 13 PNG + 11 board covers | `design/brand/*` | In-repo (board covers and social may embed site photos: then as the photo) | Yes (photo caveat) | Yes (photo caveat) | **Can transfer** |
| Fonts: Fraunces, DM Sans, Caveat | 11 TTF + 3 OFL texts | OFL text copied beside the files; copyright lines read above | Google Fonts / upstream projects | OFL permits commercial use and embedding | OFL permits redistribution with the licence and copyright notice; fonts may not be sold alone | **Can transfer** with OFL files intact. Site loads them from Google Fonts at runtime (`src/routes/__root.tsx`): a third-party request to disclose, or self-host |
| npm dependencies | production 278 packages; all 458+ with dev | licence-checker, section 5 | npm | MIT, ISC, BSD, Apache-2.0, MPL-2.0 (lightningcss), CC-BY-4.0 (caniuse-lite, data only), Python-2.0 (argparse), Unlicense, 0BSD | Buyer receives them by installing; not redistributed in the repo | Fine. **Gap: no LICENSE file and no `license` field in package.json** |
| Lovable devDependency `@lovable.dev/vite-tanstack-config`, `.lovable/`, `src/lib/lovable-error-reporting.ts` | 3 | package.json | Lovable | Per Lovable terms | Seller's Lovable project is excluded | Buyer can keep or remove the tooling; do not imply a Lovable account transfers |
| Amazon or manufacturer product photos and logos | **0** | `grep -rIlE "m\.media-amazon|images-na\.ssl-images-amazon|ssl-images-amazon|images-amazon\.com" --exclude-dir=node_modules --exclude-dir=dist --exclude-dir=.output --exclude-dir=.netlify .` hits only: `src/data/catalog.ts` (validator that **rejects** Amazon image URLs), `src/test/shop.test.tsx` (negative test fixture) and build output. Catalog: 62 records, `imageRights: "none"` on all 62, no `imageUrl` field on any; CSV `imageUrl`/`imageSource` columns empty on all 64 rows. No stock photo hosts used | n/a | n/a | n/a | **Pass: none in repo** |
| Third-party trademarks in text | many | Product and brand names appear as plain text (e.g. "Mr. Pen", "Scotch", "Amazon") in the catalog and articles, with disclosure pages | n/a | Plain-text nominative references only; no logos | n/a | Include as text; do not claim endorsement |

## 3. Classification

**CAN transfer with the repository**
- All source code, tests, scripts, CI files (own work; dependency licences permissive).
- All 27 published and 7 draft articles and all documentation, as authored text (no promise of exclusivity beyond ordinary authorship; nothing was copied from other sites per `IMAGE-AND-ASSET-RIGHTS.md` section 4, not independently re-checked here).
- Logos, wordmark, doodles, favicons, templates, board covers, palette, pin generator and the 63 typographic pins.
- Fonts with the three OFL files.
- Data records: hobby directory, 36 product types, 8 collections, 8 kits, 62 catalog records (facts and links, no images).
- Pins CSV, schedule, SOPs, buyer docs, research documents.

**NEEDS a licence/confirmation the buyer must obtain independently**
- The 18 site images and the 25 photo pins and the 6 shop tiles (AI-generated: Lovable 14, Canva 4). The buyer should read the Lovable and Canva terms in force on their own date and decide whether they are satisfied. Nothing read says outputs may be assigned to a buyer, and copyright may not subsist in them.
- Any amazon.com affiliate programme, domain, hosting, analytics, Pinterest account, mailbox: the buyer creates their own. Seller's personal/portfolio affiliate accounts are excluded.

**MUST NOT be included or implied**
- Seller's personal and portfolio affiliate accounts, tracking IDs, credentials, Lovable account/project/credits, Canva account and designs, mailbox, and `.output/`, `.netlify/`, `.wrangler/` build output (carry seller project labels).
- Any Amazon, manufacturer or retailer product photo or logo: none exist; do not add any.
- Printables and digital products: removed by decision (SD-16), not part of the asset.
- Any statement that images are exclusive, registrable, or "owned outright", or that the name or logo is trademarked.

## 4. Rights statement safe for the listing (exact wording)

> Included: the website source code, written articles and documentation, brand files (logos, colours, templates) and pin designs, all original work prepared for this project, transferred as-is. Fonts (Fraunces, DM Sans, Caveat) are used under the SIL Open Font License 1.1; the licence files are included. Site and pin photographs were generated with AI tools (Lovable and Canva AI). They are included as-is with no promise of exclusivity, uniqueness or copyright registrability, and no warranty that either tool's terms allow transfer to a new owner; the buyer should review the current terms of those tools before relying on the images. No Amazon, manufacturer or retailer product photos or logos are included. The seller's personal and portfolio affiliate accounts, any tracking IDs, and the seller's tool accounts are not part of the sale. No trademark has been searched or registered for the name or logo. Printable and digital products are not part of this asset.

## 5. Dependency licence evidence

Command: `bunx license-checker --production --summary` (2026-11-19). Production: MIT 235, ISC 19, MPL-2.0 6, BSD-3-Clause 5, Apache-2.0 4, then one each of Python-2.0, CC-BY-4.0, Unlicense, 0BSD, BSD-2-Clause, "MIT AND ISC" (total 278). Including dev: MIT 440, ISC 27, Apache-2.0 22, BSD-2 10, BSD-3 9, MPL-2.0 6, Python-2.0 1, CC-BY-4.0 1, Unlicense 1, BlueOak-1.0.0 1, 0BSD 1, "MIT AND ISC" 1 (total 520). No GPL/AGPL/unknown licences reported. MPL-2.0 packages are `lightningcss` build tooling (file-level copyleft; not modified).

## 6. Fixes made and open items

- FIXED: added a ledger section for derivative and archive images (`public/lcp`, 88 pins, 31 Canva archive files, screenshots) in `docs/content/IMAGE-LICENCE-LEDGER.md`; `image-ledger.test.ts` still passes (2 tests).
- Not fixed (needs owner or decision): add a `LICENSE`/transfer notice and `license` field; embed AI provenance metadata in the 25 photo pins (needs a build step, not done); re-read Canva terms by a method that is not blocked (all four Canva pages returned 403 today); confirm Google Fonts statement; the 4 older docs that state different counts (see the inventory doc, section 3).
- Incident: the generated catalog file was accidentally overwritten and then restored byte-for-byte from git; see inventory doc section 4.
