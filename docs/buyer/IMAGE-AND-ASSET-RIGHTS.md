# Image and asset rights (buyer disclosure)

Read this before relying on any visual in the kit for commercial use. It describes what exists, where it came from and what is *not* known. It is not legal advice; ask a qualified IP lawyer before a sale closes if the images matter to the valuation.

## 1. Photographic images on the site and in pins: AI-generated

- The 14 images in `src/assets/` (see `docs/IMAGE-LICENSES.md` for the inventory) were **generated with Lovable's AI image tool in November 2026** for this project. They are not photographs of real people, places, products or events. Registered with alt text in `src/data/images.ts`.
- Eight are lifestyle scenes (pottery night, tennis, junk journal flat lay, solo café, picnic, watercolor evening, girls' night crafts, hiking). Six are styled still lifes used for the shop collections (labelled "illustrative" on the site and in pins). **No Amazon or other retailer product images are used.**
- The pins in `public/pins/` crop, tint and overlay these same images. No new third-party images were added for pins; where there is no suitable image, the pin is typographic.

### What this means

1. **Licence / terms of use: not verified in this repo.** The images came out of a tool whose terms govern commercial use, resale and transfer. This repository does not contain Lovable's terms, the underlying model provider's terms or any written assignment. **Owner action:** read Lovable's current terms (and the model provider's, if named) and confirm in writing that outputs may be used commercially and that the buyer may inherit them. Keep a dated copy of the terms with the sale documents.
2. **Copyright may be limited or unavailable.** In several jurisdictions, including the United States under current Copyright Office guidance, material created without sufficient human authorship may not be protected by copyright. Do not assume exclusive rights: someone else could use the same or a very similar image and you may not be able to stop them. Lightly edited or arranged versions (crops, layouts, text) may protect the human-authored layout only.
3. **No people releases.** The images show synthetic people. No model release exists because there is no real model, but AI faces can resemble real individuals by chance. Do not caption them as real customers, staff, authors or testimonials, and do not use them to imply endorsement.
4. **Possible artefacts.** AI images can contain garbled text, accidental logos or odd details (for example signage in the café image). Review each image at full size before reuse in print, ads or product listings. Replace any image you find problematic.
5. **Disclosure.** Be transparent that imagery is AI-generated: the site's About page and image notes should say so, and platforms increasingly label or require disclosure of AI-generated content (Pinterest included; check current rules). Never present these images as documentation of real events or products. The shop images are illustrative styling, not the actual items sold.
6. **Provenance records.** Keep: `docs/IMAGE-LICENSES.md`, the generation date, the tool name, and the prompts if the owner still has them in Lovable's history.

### Recommended path (RECOMMENDED, not done)

- Keep the current images for launch, labelled honestly.
- Replace hero and pin images over time with original photography or properly licensed stock (check each provider's licence for commercial use, modification and Pinterest use; keep receipts).
- For product-specific content, use the retailer's own affiliate image tools only as their terms allow, never screenshots.

## 2. Logos, wordmark, doodles and templates

- Logo SVGs, monogram, favicon, pin templates, board covers and social/article templates in `design/` are original compositions assembled for this project from the existing site identity (`Wordmark.tsx`, `Doodles.tsx`). They contain no third-party artwork. The doodle shapes (star, sparkle, bow, flower, arrow, squiggle, scalloped badge) are simple geometric paths drawn for the project.
- **Not registered as trademarks.** "Plans Past Five" and the logo have **not** been searched or registered by anyone involved in building the kit. Before investing in the name, run a trademark clearance search in your target countries and consider registering. Do not describe the logo as a registered mark.
- Rights in the logo and templates transfer with the repository as part of the sale; get a written assignment from whoever created them if your acquisition agreement requires one.

## 3. Fonts

| Font | Licence | Copy in repo |
|---|---|---|
| Fraunces | SIL Open Font License 1.1 (Copyright The Fraunces Project Authors) | `design/brand/fonts/` + `OFL-Fraunces.txt` |
| DM Sans | SIL OFL 1.1 (Copyright The DM Sans Project Authors) | same folder, `OFL-DMSans.txt` |
| Caveat | SIL OFL 1.1 (Copyright The Caveat Project Authors) | same folder, `OFL-Caveat.txt` |

The OFL allows commercial use, embedding in images and logo outlines, and redistribution with the licence file. The fonts cannot be sold on their own. The live site loads them from Google Fonts (a third-party request; mention it in the privacy policy or self-host).

## 4. Text, pins and descriptions

- Pin headlines and descriptions are original wording written for the project, using the brand's established phrases. They contain no quoted statistics, testimonials or ratings. Drafts are held until verified (`hold-until-published` in `docs/pinterest-pins.csv`).
- Article text is covered by the repo's content rules (`docs/TURNKEY-PLAN.md`). Nothing was copied from other sites. No Paws & Passage branding or tracking IDs are used.

## 5. Product mentions

- Product names, brand names and Amazon are trademarks of their owners. The site uses plain-text references and search links only. Do not add manufacturer logos or product photos without checking the owner's permission and licence.

## 6. Summary table

| Asset | Origin | Commercial use | Transferable | Exclusive? | Open risk |
|---|---|---|---|---|---|
| 14 site images | AI-generated (Lovable tool), Nov 2026 | Per tool terms: **owner must verify** | Per tool terms: verify | Unlikely to be protected as exclusive | Terms and copyright status unverified; AI disclosure |
| Pins (95) | Original layouts over the images above and type | Same as images where photos used | Yes (files in repo) | Layouts only | Inherits image risks |
| Logos, favicon, templates | Original, built from the existing identity | Yes | Yes (assignment if required) | Not trademarked | No trademark clearance |
| Fonts | OFL | Yes | Yes with licence files | No (open licence) | None known |
| Copy | Original | Yes | Yes | Yes (as authored text) | Fact-check before publishing |
