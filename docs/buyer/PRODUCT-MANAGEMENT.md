# Product management

**You can manage every product from your browser. No terminal, no spreadsheet import, no code.**

All products live in ONE place: Pages CMS, section **Products** (one small file per product in `content/products/`). Every article, hobby page, shop collection, starter kit, planner suggestion and quiz result reads from it. Change a product once and it changes everywhere. The ordinary Amazon web address is built from the product's Amazon number (ASIN), and your Amazon tracking ID (Settings in Pages CMS) is added to every Amazon link automatically. **Never type a tracking ID, an affiliate link or a price into a product or an article.**

Publishing works exactly like articles: save in Pages CMS, then press Publish in Netlify (`docs/buyer/NETLIFY-CREDITS-AND-RELEASES.md`). Before the site rebuilds, a checker reads every product and every article. If anything would break (for example an article mentions a product you just hid) the build stops, the live site stays as it was, and the message says in plain English which file and which product to fix.

## The words you will see

| Status | Meaning |
|---|---|
| Candidate | Researched, not approved. Never shown anywhere. |
| Verified | Approved and shown on the site. |
| Held | Approved but hidden for now. You write a one-sentence reason (private; it is never published). |
| Discontinued | No longer sold or no longer recommended. You write the reason and, ideally, name the product that replaces it. |

A product's **id** (for example `junk-journal-glue`) never changes. Articles refer to it by that id. The listing details (name, ASIN) are the part you change.

## Replace a discontinued product (step by step)

Pick whichever fits.

**A. The same kind of product, new listing (simplest).** The id stays; only the listing changes.
1. Pages CMS > Products > open the product.
2. Replace the **exact name**, **brand**, **Amazon number (ASIN)** (10 letters and numbers from the new Amazon page), the facts, **why we picked it**, **honest downsides**, **pages the facts were checked against** and set **Date you last checked** to today.
3. Save. Every article, hobby page, collection, kit and planner suggestion now shows the new product.
4. Re-read the article sentences that mention it by name; if they describe the old product's facts, edit those sentences.

**B. A genuinely different product, keep the old one on record.**
1. Pages CMS > Products > **Add** a new product (give it a new id, fill in every field, Status: Verified, same collections, hobbies and kit slots as the old one).
2. Open the old product: Status **Discontinued**, write the reason, and put the new product's id in **Replaced by**. Save.
3. Every mention of the old id now shows the new product (readers' saved lists too).

**If you do nothing about a product an article mentions.** Hiding (Held or Discontinued) a product that an article mentions, without a **Replaced by**, stops the build with a message like: `content/articles/some-article.json, block #7 (p), field "text": the product mention {{product:old-id|a glue stick}} cannot be shown: "old-id" is held and has no replacement`. Either set **Replaced by**, or edit that sentence in the article.

## Add a new product

1. Pages CMS > Products > Add. The **id** must be new, lowercase words joined by hyphens, and cannot change later. It must match the file name.
2. Fill in the **ASIN** from the product's live Amazon page address (`amazon.com/dp/ASIN`). **Every product shown on this site is an Amazon product with a verified ASIN**: there are no links to other shops and no generic "search Amazon" stand-ins. A product that is not verified is simply not shown.
3. Fill in the other required fields. Choose the **collections**, **hobbies** and **kit slots** it belongs to (names must exist: the checker tells you if one is misspelled).
4. Status **Candidate** until you have checked the live listing; then **Verified**.

## Rules you must keep

- No prices, ratings, review counts, discounts or stock claims anywhere (the checker rejects them).
- Only enter an ASIN you copied from the live Amazon page. Never guess one.
- Never save, copy, crop or link to an Amazon listing picture. See "Product pictures" below.
- Do not add a cart button. Buttons say what the destination is.
- Product notes (**why held**, research notes) stay private: they are never sent to visitors' browsers. Only shown products are published.

## Product pictures

Each product can have ONE picture record (Products > the product > **Product picture**). It shows on the product's cards whenever **Rights status = Cleared**, whether Amazon tracking is on or off. Fill in: the photo (uploaded to this site), what it shows (for people who cannot see it), where it came from, the commercial permission that allows this site to use it, the credit line shown with it, and a private note on how to replace it if the permission ends. Use pictures from a maker's media kit with written commercial permission, a photographer you have a licence from, or your own photos. **Never** an Amazon listing image. Leave the record empty, or set the status to Pending or Rejected, and the card shows the editorial label tile instead. The build refuses a Cleared picture whose file is not in the uploads folder or whose fields are incomplete, and a picture that is not Cleared is never published. Pictures are attached to the product, never to articles, and are never included in saved-list exports, copy lists or print views.

## What the checker verifies on every build

Missing product ids in articles; held, discontinued or candidate products that articles mention (unless a replacement chain reaches a shown product); circular or dead-end replacements; duplicate ids; duplicate ASINs; kit slots, collections, hobbies or articles that do not exist; shop blocks naming an unknown hobby; a Cleared picture with no file or no licence record; a stored tracking tag or affiliate link (never allowed); a malformed `{{product:...}}` mention. Tests (`bunx vitest run`) repeat these checks and prove that replacing a product updates every page.

## For developers (optional, not part of the owner workflow)

- Data model and rules: `src/data/catalog-rules.ts`; build and gates: `scripts/content-lib.mjs`, `scripts/build-content.mjs`; generated for the site: `src/data/catalog.generated.ts` (shown products only). Never edit generated files by hand.
- Bulk loading: `bun run import:products file.csv --check` then without `--check` writes NEW product files into `content/products/` from a CSV in the research template format (`docs/commerce/PRODUCT-RESEARCH-TEMPLATE.csv`). It never overwrites an existing product unless `--update` is given, and never deletes. `docs/commerce/product-research.csv` is the frozen snapshot the 66 products were migrated from; it is not maintained.
- Kits (slots) and collections are still defined in code: `src/data/kits.ts`, `src/data/products.ts`.
- Affiliate building: `src/config/affiliate.ts` builds every Amazon link from the ASIN plus the one tracking ID in `content/settings.json` (tracking ON/OFF is also there). Product files never hold a tag.
