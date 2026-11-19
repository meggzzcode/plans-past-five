# Image and asset rights (buyer disclosure)

Read this before relying on any visual for commercial use. It says what exists, where it came from and what is NOT known. It is not legal advice; ask a qualified IP lawyer before a sale closes if the images matter to the valuation. The same position is stated in `docs/IMAGE-LICENSES.md` and `docs/marketplace/final-inspection/RIGHTS-AND-TRANSFERABILITY.md`; if the three ever disagree, treat the more cautious one as right and report the difference.

## The one position

1. **The site and pin photographs are AI-generated.** They came from the Lovable AI image tool (the original batch) and Canva AI (later batches). Counts and the origin split: `docs/buyer/INVENTORY.md`. Per-image record: `docs/content/IMAGE-LICENCE-LEDGER.md`. They are not photographs of real people, places, products or events.
2. **Commercial-use and transfer terms are UNVERIFIED until the live terms are read.** No page read so far says an AI output may be assigned to a buyer of a website. The Canva pages returned 403 on 2026-11-19 and were not read live; the Lovable terms were read through a summarising fetch and need a quote-check against the live page. Reading the live terms is an open task listed in `docs/cowork` (an assistant working in a browser can do it). Until that is done and dated, do not state that the images may be resold, transferred or used in any particular commercial way.
3. **No exclusivity and no registrable copyright is promised.** Anyone can get similar results from similar prompts, and under current US Copyright Office guidance material made without sufficient human authorship may not be protected. Lightly edited or arranged versions may protect only the human-authored layout.
4. **The Lovable service agreement is not assignable.** Lovable's terms say users "may not assign, delegate, or transfer these Terms". The Lovable project, account, credits and any Canva account or designs stay with the seller and are not part of a sale.
5. **Fonts are under the SIL Open Font License 1.1** (Fraunces, DM Sans, Caveat). Keep the three OFL files with the font files; the fonts may not be sold on their own.
6. **No Amazon, manufacturer or retailer images or logos**, and no stock photography, are in the repo. Do not add any without the owner's permission and licence.

## What this means in practice

- Keep the current images only if you accept the unverified status, or replace them over time with your own photography or properly licensed stock (check each provider's licence for commercial use, modification and Pinterest use; keep receipts).
- Label the imagery honestly: the About page and image notes should say it is AI-generated, and platforms (Pinterest included) increasingly label or require disclosure; check current rules.
- The people shown are synthetic. Do not caption them as real customers, staff, authors or testimonials, and do not use them to imply endorsement. AI faces can resemble real individuals by chance.
- AI images can contain garbled text, accidental logos or odd details. Review each image at full size before reuse in print, ads or listings, and replace any that is problematic.
- The shop images are illustrative styling, not the items sold.
- Keep dated copies of the live terms you rely on with the sale documents.

## Pins

The pins in `public/pins/` combine site images with original layouts and type. Photo pins inherit the image position above. Typographic pins carry only original text and the OFL fonts. No AI provenance metadata was found embedded in the pins (the site images carry it); that is an open item.

## Logos, wordmark, doodles and templates

Logo SVGs, monogram, favicon, pin templates, board covers and social templates in `design/` are in-repo compositions made for this project from the existing site identity (`Wordmark.tsx`, `Doodles.tsx`) and OFL fonts. They contain no third-party artwork. **They are not registered trademarks**, "Plans Past Five" and the logo have not been cleared by a trademark search (`docs/NAME-CHECK-planspastfive.md` is background only, not clearance), and no written assignment from a human creator exists in the repo. Do not describe the logo as a registered mark.

## Fonts

| Font | Licence | Copy in repo |
| --- | --- | --- |
| Fraunces | SIL OFL 1.1 (Copyright The Fraunces Project Authors) | `design/brand/fonts/` + `OFL-Fraunces.txt` |
| DM Sans | SIL OFL 1.1 (Copyright The DM Sans Project Authors) | same folder, `OFL-DMSans.txt` |
| Caveat | SIL OFL 1.1 (Copyright The Caveat Project Authors) | same folder, `OFL-Caveat.txt` |

The OFL allows commercial use, embedding and redistribution with the licence file. The live site loads the fonts from Google Fonts (a third-party request; disclose it in the privacy policy or self-host).

## Text and product mentions

- Article text and pin copy are original wording prepared for the project under the repo's content rules (`docs/content/ARTICLE-QUALITY-CHECKLIST.md`); nothing was copied from other sites. No tracking IDs or branding from any other business are used.
- Product, brand and retailer names are trademarks of their owners and appear as plain text only. Do not add manufacturer logos or product photos without checking permission and licence.

## Summary

| Asset | Origin | Commercial use | Transferable | Exclusive? |
| --- | --- | --- | --- | --- |
| Site images | AI-generated (Lovable image tool and Canva AI) | UNVERIFIED until live terms are read | UNVERIFIED; Lovable agreement not assignable | No |
| Pins | In-repo layouts over the site images, and type | As the images where a photo is used | As the images; layouts are in the repo | Layouts only |
| Logos, favicon, templates | In-repo originals | Yes | With the repo; no written assignment exists; not trademarked | Not trademarked |
| Fonts | OFL | Yes | Yes, with licence files | No (open licence) |
| Copy | Original | Yes | Yes | As authored text |
| Product images | None exist | n/a | n/a | n/a |
| npm packages | Own licences | `THIRD-PARTY-NOTICES.md` | Installed by the buyer, not redistributed | n/a |
