# Rights and transferability

Evidence record and classification, verified 2026-11-19 against the repo. **Not legal advice; for the owner's review.** "Read" means the page text was retrieved by a tool on 2026-11-19; where a page was blocked it says so and nothing is guessed. Counts: `docs/buyer/INVENTORY.md`. The buyer-facing wording is `docs/buyer/IMAGE-AND-ASSET-RIGHTS.md`; the image inventory is `docs/IMAGE-LICENSES.md`; code licensing is `docs/buyer/LICENCE-STATUS.md` and `THIRD-PARTY-NOTICES.md`.

## 0. The one position (identical in all three rights documents)

1. Site and pin photographs are **AI-generated** (Lovable image tool and Canva AI).
2. **Commercial-use and transfer terms are UNVERIFIED** until the live terms are read and dated (open Cowork task).
3. **No exclusivity and no registrable copyright is promised.**
4. The **Lovable service agreement is not assignable**; the Lovable project, account and credits are excluded.
5. **Fonts are SIL OFL 1.1**; licence files stay with the fonts.
6. **No Amazon, manufacturer or retailer images** are in the repo.

## 1. Terms read (URL, date, result)

| Source | URL | Date | Result |
| --- | --- | --- | --- |
| Lovable Terms of Service | https://lovable.dev/terms | 2026-11-19 | READ via a summarising fetch (quote-check before relying on wording). Effective Date August 15, 2026; Last Updated August 28, 2026. "As between us, you own your Customer Data" and "you also own any AI Output generated for you through the Services". Licence is for "personal or internal business purposes" and lets end users access projects. Users "may not assign, delegate, or transfer these Terms". Images are not mentioned specifically; third-party model providers are "subject to that provider's own terms" |
| Canva AI Product Terms | https://www.canva.com/policies/ai-product-terms/ | 2026-11-19 | **403, NOT READ live.** Earlier snippet-level record: `docs/content/CANVA-LICENCE-TERMS.md` |
| Canva Help (products for sale, copyright and ownership), Canva AI page | canva.com/help/..., canva.com/canva-ai/ | 2026-11-19 | **403, NOT READ live** (snippet record only) |
| Canva Content License Agreement | https://www.canva.com/policies/content-license-agreement/ | 2026-11-19 | Fetched. Does not mention AI output; section 9 bars sub-licensing, assigning or transferring the Content (with a single-client design exception in 4A). Not shown to cover AI output |
| SIL OFL 1.1 official text | https://openfontlicense.org/open-font-license-official-text/ | 2026-11-19 | READ. Use, embed, modify and redistribute; keep the notice and licence with each copy; the font may not be sold by itself |
| Fraunces, Caveat OFL.txt (GitHub) | googlefonts repos | 2026-11-19 | READ. Copyright The Fraunces / Caveat Project Authors |
| DM Sans OFL.txt (GitHub) | googlefonts/dm-fonts | 2026-11-19 | **404 at that path.** The repo copy `design/brand/fonts/OFL-DMSans.txt` states Copyright 2014 The DM Sans Project Authors, OFL 1.1 |
| Google Fonts licensing statement | fonts.google.com FAQ | 2026-11-19 | Fetched but returned no licensing text: **NOT CONFIRMED from Google**; the OFL texts are the evidence |
| Stock photo sites | n/a | n/a | Not used |
| npm licences | `bunx license-checker --production` | 2026-11-19 | RUN: no GPL/AGPL/unknown in the production set; see `THIRD-PARTY-NOTICES.md` |

## 2. Asset table

| Asset | Evidence in repo | Commercial use | Transferable to a buyer | Verdict |
| --- | --- | --- | --- | --- |
| `src/assets` images (Lovable AI original batch and Canva AI batches; split in `docs/buyer/INVENTORY.md`) | Ledger rows (`docs/content/IMAGE-LICENCE-LEDGER.md`, test `image-ledger.test.ts`); AI provenance metadata embedded in the images | UNVERIFIED (Lovable: "you own AI Output" for "personal or internal business purposes"; Canva: AI images "can be used for any lawful purpose" per an earlier snippet, not re-read) | UNVERIFIED. Nothing read allows assignment to a buyer; the Lovable agreement itself is not assignable | **Included as-is, no warranty. Buyer must read the live terms** |
| `public/lcp/hero-pottery-night-960.jpg` | Derivative of a Lovable image; ledger row exists | as source | as source | As source |
| `public/pins/*` | `design/pins/manifest.json`: photo pins composite site images; typographic pins are original text and OFL fonts; no AI provenance metadata on any pin | as source image | as source image | Photo pins inherit the image position; typographic pins are clean |
| Shop collection images | Ledger; labelled illustrative; no product shown | as above | as above | Not Amazon or brand imagery |
| `docs/content/incoming-images/` and `sliced-tiles/` | Canva sheets and tiles, archive only; not on the site | as Canva | as Canva | Exclude from the buyer package (`BUYER-PACKAGE-CONTENTS.md`) |
| Logos, wordmark, monogram, doodles, favicons, templates, board covers | `design/brand`, `Wordmark.tsx`, `Doodles.tsx`; composed in-repo from OFL fonts | Yes | With the repo; no written assignment from a human creator; not a registered trademark | Can transfer; no trademark clearance |
| Fonts (Fraunces, DM Sans, Caveat) | OFL text beside the files | Yes | Yes with the OFL files; may not be sold alone | Can transfer. The site loads them from Google Fonts at runtime (disclose or self-host) |
| npm dependencies | `THIRD-PARTY-NOTICES.md` | Permissive licences (MIT, ISC, BSD, Apache-2.0, MPL-2.0 tooling, CC-BY-4.0 data) | Installed by the buyer, not redistributed in the repo | Fine; no `LICENSE` file is added (`docs/buyer/LICENCE-STATUS.md`) |
| `@lovable.dev/vite-tanstack-config`, `.lovable/`, `src/lib/lovable-error-reporting.ts` | package.json | Per Lovable terms | The seller's Lovable project is excluded | Buyer may keep or remove the tooling; do not imply a Lovable account transfers |
| Amazon or manufacturer product photos and logos | A repo-wide search found none; the catalog validator rejects Amazon image URLs; `imageRights: "none"` on every record | n/a | n/a | **Pass: none included; do not add any** |
| Third-party trademarks in text | Plain-text product and brand names with disclosure pages | Nominative references only | n/a | Include as text; do not claim endorsement |

## 3. Classification

**CAN transfer with the repository:** source code, tests, scripts and CI files (own work; dependency licences permissive); articles and documentation as authored text (no exclusivity promised; nothing copied from other sites, not independently re-checked); logos, wordmark, doodles, favicons, templates, board covers and the typographic pins; the three fonts with their OFL files; data records (hobbies, product types, collections, kits, catalog records: facts and links, no images); the pins CSV, schedule, SOPs, buyer docs and research documents.

**NEEDS confirmation the buyer must obtain independently:** the AI-generated site images and the photo pins (read the live Lovable and Canva terms; nothing read says outputs may be assigned to a buyer and copyright may not subsist in them); every account (domain, hosting, analytics, Pinterest, mailbox, Amazon Associates).

**MUST NOT be included or implied:** the seller's personal and portfolio affiliate accounts, tracking IDs and credentials; the Lovable account, project and credits; the Canva account and designs; the mailbox; `.output/`, `.netlify/`, `.wrangler/` build output (it carries seller project labels); any Amazon, manufacturer or retailer photo or logo; any statement that images are exclusive, registrable or "owned outright", or that the name or logo is trademarked; any digital product (none exist).

## 4. Rights statement safe for the listing (exact wording)

> Included: the website source code, written articles and documentation, brand files (logos, colours, templates) and pin designs, all original work prepared for this project, transferred as-is. Fonts (Fraunces, DM Sans, Caveat) are used under the SIL Open Font License 1.1; the licence files are included. Site and pin photographs were generated with AI tools (Lovable and Canva AI). Their commercial-use and transfer terms have not been verified; they are included as-is with no promise of exclusivity, uniqueness or copyright registrability, and no warranty that either tool's terms allow transfer to a new owner. The Lovable service agreement is not assignable and the seller's Lovable project is not included. The buyer should review the current terms of those tools before relying on the images. No Amazon, manufacturer or retailer product photos or logos are included. The seller's personal and portfolio affiliate accounts, any tracking IDs and the seller's tool accounts are not part of the sale. No trademark has been searched or registered for the name or logo.

## 5. Dependency licences

Run `node scripts/third-party-notices.mjs` to regenerate `THIRD-PARTY-NOTICES.md`. At generation time the production set had no GPL, AGPL or unknown licence; the notable ones are MPL-2.0 (`lightningcss`, unmodified build tooling), Apache-2.0, CC-BY-4.0 (`caniuse-lite` data) and Python-2.0 (`argparse`).

## 6. Open items

- Read the live Lovable and Canva terms by a method that is not blocked (Canva returned 403), record them with dates, and update all three rights documents together.
- Embed AI provenance metadata in the photo pins (needs a build step; not done).
- Confirm the Google Fonts statement; or self-host the fonts.
- Owner decision: whether to add a licence or transfer notice for the code (`docs/buyer/LICENCE-STATUS.md`); no open-source licence has been added.
