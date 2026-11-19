# E2. Can the current article renderer support a premium editorial experience?

Read-only review, 2026-11-19. Baseline: HEAD 9e958ed. Inspected: `src/routes/journal.$slug.tsx`, `src/components/editorial/*`, `src/components/commerce/*`, `src/content/types.ts`, `scripts/content-lib.mjs` (block schemas), `.pages.yml`, `src/lib/reading.ts`, `src/data/catalog.ts`, `src/lib/pins.ts`, all 34 article JSON files (32 published, 2 drafts). Rendered 6 articles at 1280 and 390 from a /tmp build (port 5972); screenshots in `/tmp/e2-shots/` (not committed). Nothing in the repo was changed.

## 1. Verdict

**Not as it stands.** The renderer is a competent, accessible, single-template article page. It can carry good writing, but it cannot produce magazine-style variety or visual-led commerce, because:

1. There is one page template. The `Article` type has no layout field; every article gets the same centered header, the same inset hero, the same 220px contents rail plus 680px column, and the same end matter. Variety can only come from block order.
2. The block vocabulary is text-first. Of 18 block types, only `image` is visual, and it is used in 2 of 34 articles. There is no gallery, no steps-with-photos, no table, no timeline, no product-with-reason block that points at product ids.
3. Commerce blocks are implicit and stacked. `shopTheArticle` picks products by article slug/hobby/collection tags in the catalog, not by an editor-chosen list; legacy `shopHobby`/`starterKit` list product TYPE ids and are silently swapped for catalog products by `verifiedFor()` heuristics. An owner cannot see or control which products appear.

The gap is closeable with a small, additive change set (section 6): 1 layout field, 5 new blocks, 3 extended blocks, 3 article fields. All defaults leave the 32 existing pages unchanged.

## 2. What the renderer already supports

| Need | Status today | Where / evidence |
|---|---|---|
| Hero photography | Partial. One inset hero, `max-w-6xl`, 16:10 desktop capped at 640px tall, 4:5 crop on phones, `fetchPriority="high"`, width/height set. Not full-bleed. No caption/credit, no focal point. | `journal.$slug.tsx` L157-166 |
| Pull quote | Partial. `quote` block: centered cherry italic with star, no attribution, one style. Used in 2 articles. | `ArticleBody` L438 |
| Inline image | Partial. `image` block, full-bleed on mobile (`-mx-5`), caption in handwriting font, lazy. One size, one ratio, no credit. 2 uses in 34 articles. | L444 |
| Curated shopping | Yes, text/tile-led. One-pick featured card, "Then add", "Pretty extras for later", up to 2 folded alternatives, "Add to my list", one-line disclosure after the pick plus full line at block end, "Skip to shopping" link. | `ShopTheArticle`, `ShopSections`, `ProductCard` |
| Product card without image | Yes, and thoughtfully: a typographic tile (category colour + doodle + headline) designed to look like a label. | `ProductVisual` |
| Product card with image | Already coded: shows a 4:3 photo with credit only when `imageUrl`+`imageCredit`+`imageRights` (owned/licensed/retailer-permission) exist. No product has one today (0 of 66 records). | `photoFor`, `ProductVisual` |
| Product facts kept out of articles | Yes: no prices/ratings; links via one affiliate registry. | AGENTS.md, `catalog.ts` |
| Step by step | Text only. `first30` (numbered text steps), `item` (numbered idea cards with time/cost/company chips and a "More" disclosure), `list`. No step images. | L464, L671 |
| Comparison table | No. Zero tables in any article; `ui/table.tsx` exists but is unused by editorial. Comparisons are written as bullet lists. | grep |
| Itinerary / timeline | No. The picnic article's "A timeline that fits real life" is a 5-line bullet list with bold lead-ins ("**Three days out:**"). | picnic JSON |
| Checklist | Partial: `whatYoullNeed` (essentials + collapsible "Nice to have"). Not checkable, no print view beyond `no-print` classes on buttons. | L546 |
| Save / share | Yes, good: Save to My Plans (header and footer), Send to group chat, Copy link, Pin it; per-product "Add to my list". | `SaveButton`, `ShareButtons`, `ProductCard` |
| Pinterest vertical images | Partial. 88 pre-made 2:3 pin files in `public/pins` mapped by page path in `src/data/pins.ts`; Pin button uses it, falls back to hero. Not editable in the CMS; the Stage 1 plan removes pins from the deployed site, so this path needs a new home. | `pins.ts`, PLAN.md Stage 1 |
| Related content | Yes: declared `related` first, then computed by shared hobbies/category (3 cards); hobby cards unless the article has `ifYouLoved`. | `relatedArticles`, route L258 |
| Reading comfort | Good: 680px measure, 1.0625rem/1.72 line height, long-paragraph spacing, lead-in bolds, sticky phone mini-TOC, desktop rail TOC, sections open by default and optionally collapsible. | `styles.css` L235+, `MiniToc` |
| Disclosure placement | Present beside the first product ask and under each block; wording from one registry. Repeats (3 per article, 5 on the 35-hobbies page). | `ShopDisclosure`; measured 2-5 per page |
| Accessibility | Mostly good: semantic aside/nav/figure, labelled regions, 44px targets, aria-pressed on save, alt text required (20+ chars) in CMS, decorative icons aria-hidden. Minor: idea numbers are aria-hidden visual text in a non-list, product tile is aria-hidden (fine, but then the card has no image at all for screen readers, which is correct). | various |
| Performance | Hero: `fetchPriority=high`, explicit dimensions, other images `loading=lazy`. Gaps: no `srcset`/`sizes`, JPEG only, hero files 245-430 KB at 1440-1600px wide (measured in build: cycling 427 KB, flower 392 KB, cozy 362 KB, crochet 266 KB) served unchanged to a 390px phone. | build output, Playwright metrics |

## 3. Screenshot findings (6 articles, 1280 and 390)

Articles: crocheting (project), mahjong night (hosting), 35 hobbies (discovery), creative starter kits (shopping), perfect picnic (itinerary-like), book club (feature). No horizontal overflow on any page at either width.

1. **Hero image starts below the fold on both sizes** (crocheting). Desktop: headline, dek, byline, "How we make this" link and four action links push the photo's top edge to y=722 of 900. Phone: the entire first screen (844px) is breadcrumb, title, dek, byline, link and a three-line wrap of Save / Send / Copy / Pin; the photo only starts at the very bottom. This is the single biggest "blog, not magazine" signal. Photo is also boxed with 96px side margins, not full-bleed.
2. **Same page shape everywhere.** All six look identical above the body and below it; only block mix differs. A hosting guide, a shopping guide and a 35-item list are indistinguishable at a glance.
3. **Product tile without a photo is carrying too much weight.** On the crochet page two different yarns show the same pink "YARN / Soft start" tile; the featured tile is ~270px square of colour that conveys nothing about the product. Kits page: three different products wear generic "CLAY KIT / Shape it tonight", "BRUSHES / Brush in hand" tiles. It reads as a placeholder, not a design choice, which is exactly the "affiliate blog with decorative photography" risk. It is good as a fallback, weak as the main visual.
4. **Orphan card.** Crochet "Pretty extras for later" shows a single half-width card in a 2-column grid with empty space to its right; the pick plus one extra is the whole shop, yet it still gets pick/then-add/extras scaffolding.
5. **Hidden/collapsed shop via DOM mutation.** The kits page shows 2 of 7 products plus "See all (7)". `ShopFold` hides cards by scanning the DOM for `[data-product-id]` and matching the text "another option" with a regex. It works today but is fragile and is hidden from the editor.
6. **Discovery list is a wall of text rows.** The 35-hobbies page is ~18,700px tall on desktop and ~25,200px on phone, 35 numbered text entries with chips and a "More" disclosure, no image per entry. Readable, but monotone, and nothing to Pin from within the body.
7. **Legacy product-type cards read as empty.** Picnic "Picnic: where to start" shows bordered cards with a bookmark icon, a name, and "look for →" text and no button or visual (0 buy links on that page). Honest, but visually unfinished next to the verified cards.
8. **Callouts and content that deserve richer blocks are plain.** Picnic "What you'll need" is a tinted checklist (good) but the timeline, menu and spot-choosing sections are bullet lists that would be better as a timeline and a short gallery.
9. **Reading experience is the strongest part.** Measure, spacing, sticky mini-TOC and "Skip to shopping" all work on phone. Keep.
10. **Hero art reuse.** `shopGirlsNight` is the hero of both mahjong night and book club; `potteryNight` is hero of two articles; several heroes are shop collection images. Not a renderer problem, but a layout that leans harder on photography will expose it (art direction, outside this review).

## 4. Gaps against the owner's needs

| Need | Gap |
|---|---|
| Full-bleed / editorial hero | Needs hero variants and a title-over-image option; header actions need to collapse so the image is above the fold. |
| Pull quotes | Exists but single style, no attribution. Extend. |
| Curated shopping with and without product image | Component supports both, but selection is implicit and layout is one-size. Needs an explicit block with product ids and editor's reason, and card layouts that don't depend on a photo. |
| Project inspiration gallery | Missing. |
| Visual step-by-step | Missing (text steps only). |
| Comparison table, mobile-friendly | Missing. |
| Experience guide: timeline + shopping list + checklist | Timeline missing; checklist partial; shopping list exists via "Add to my list" but not as a combined "your list" block. |
| Save / share | Good. Gap: no "add all to my list" for a product group (the shoplist store already exists). |
| Related content | Good; no mid-article "read next". |
| Disclosure | Present; repetitive. Should be one visible disclosure near the first commercial module plus one at block end, not per layout. |
| Pinterest vertical | Pin files live outside the CMS and are slated for removal from deploy. Need an article field for a vertical image (or per-block "pin this" image). |
| Performance | Responsive image sizes and modern format are missing; fix once for all layouts. |
| CMS | One flat block list; no layout choice; image choice is a two-step flow (add in Images, then pick); products are not editable in the CMS at all (`.pages.yml` footer says so). |

## 5. Proposals (smallest reusable set)

Principles: additive (existing block names and JSON keep working), reference product ids only, every new block has a text-only/no-image rendering that looks intentional, every field is something the owner can type or pick.

Scoring key: CV customer value, COM commercial value, M maintenance burden, S/M/L complexity, CMS = nontechnical-owner editability, Risk = to the 32 existing pages.

### 5.1 Article `layout` field plus 3 header variants and 3 side-rail variants

One optional select field, `layout`, absent = today's look. The route picks a header variant and a rail variant and a body modifier class; body blocks are unchanged.
- CV high (above-the-fold photo; each article type feels distinct). COM medium (shopping edit layout lifts the pick earlier). M low (6 templates, 3 headers x 3 rails). Complexity **M**. CMS easy (one dropdown with plain labels). Risk **low** if default is unchanged and covered by a before/after screenshot test.

### 5.2 `productEdit` block (curated shopping; replaces 4 legacy shop blocks over time)
- CV high. COM high (owner chooses what is shown and why). M low-medium: every product edit goes through the Stage 2a id source. Complexity **M**. CMS medium: depends on how 2a exposes products (see dependency note). Risk medium: must coexist with `shopTheArticle`/`shopHobby`/`starterKit`/`shopMyHobby`; keep those rendering as-is, migrate only new/rewritten articles.

### 5.3 `compare` block (mobile-friendly comparison)
- CV high for "kit vs loose", "which set". COM medium. M low (text only; product link by id optional). Complexity **S-M** (table on desktop, stacked cards on phone). CMS medium (rows and cells are a repeater; fine for 3-6 rows). Risk none (new).

### 5.4 `steps` block (visual tutorial)
- CV high for project tutorials (clay, crochet, embroidery, journaling). COM medium (materials link to products). M low. Complexity **M**. CMS easy (repeater: heading, text, optional picture, optional tip). Risk none (new; `first30` stays).

### 5.5 `gallery` block (inspiration)
- CV high (this is the "magazine" feel and the Pinterest saver). COM low direct, high indirect. M low. Complexity **S-M** (CSS grid or mosaic; no carousel library). CMS easy (pick pictures from Images, optional caption). Risk none. Must be visibly "inspiration" (distinct from product photos).

### 5.6 `timeline` block (experience itinerary / run of show)
- CV high (picnic, hosting nights, solo Saturdays). COM medium (an entry can reference products). M low. Complexity **S**. CMS easy (time label, heading, text). Risk none.

### 5.7 Extend existing blocks (no new types)
- `image`: add `size` (inline / wide / full-bleed), `ratio` (landscape / portrait), `credit`. S, risk none (defaults = today).
- `quote`: add `attribution` and `style` (centered / side). S, risk none.
- `whatYoullNeed`: add optional `checkable` (client-only ticks, not saved server-side) and per-item optional `productId`. S, risk none. Serves as the checklist and shopping list.

### 5.8 Article-level fields (not blocks)
- `atAGlance`: up to 4 label/value pairs (time, cost, difficulty, serves, season). Replaces the weak computed "short version" ("Read 4 min / Pick from 2 ideas") with editor-stated facts, reused as the layout rail. CV medium-high. S.
- `heroCredit` / `heroCaption`: S, supports licensing.
- `pinImage`: a reference to a vertical picture from the Images collection, used by Pin it and og:image. Also solves the "pins out of the deployed site" question for the new library. S-M.

## 6. Recommended spec (field lists, no code)

### Layout templates (6)

| Layout | Header | Rail | Body modifiers | Best for | Typical blocks |
|---|---|---|---|---|---|
| `feature` | Full-bleed hero, title below or over, actions collapsed to one "Save / Share" row | none (single centered column, wider photos) | large pull quotes, wide images | essays, "life feels like work-sleep-repeat" style | p, quote, image(wide/full), gallery, ifYouLoved |
| `shopping-edit` | Split: title left, product-led image right | At-a-glance + "The one pick" jump | `productEdit` first-screen, `compare`, minimal prose | supplies guides, kit comparisons | productEdit, compare, whatYoullNeed, saveSplurge |
| `project` | Inset hero, at-a-glance chips under title | Sticky "Materials" rail (desktop) / collapsible on phone | steps get large photos | clay, crochet, embroidery, junk journaling | whatYoullNeed, steps, gallery, productEdit |
| `hosting-guide` | Hero + at-a-glance (serves, prep time, cost) | Contents + "Print/Save" | timeline, checkable checklist | mahjong, craft night, paint night, book club | timeline, whatYoullNeed(checkable), productEdit, saveSplurge |
| `discovery-list` | Compact header, no tall hero | Contents | items become 2-up image cards on desktop; optional per-item image | 35 hobbies, solo dates, weekend ideas | item (+image), gallery, quote |
| `itinerary` | Portrait/full-bleed hero | Timeline index | timeline is the spine, entries can carry a photo and product ids | picnic, solo Saturday, coffee-shop date | timeline, gallery, whatYoullNeed, makePlan |

Layouts differ by a header variant (3), rail variant (3) and a few CSS modifiers. `hosting-guide` and `itinerary` share the timeline block and can ship as one layout first.

### Block specs

**productEdit** (new)
- `title` (text), `intro` (text, optional)
- `style` (pick: "one pick plus list" / "grid" / "list, no pictures")
- `items` (repeater, in display order): `productId` (reference to product id, required), `note` (the editor's reason, 1-2 sentences, article-specific copy only), `role` (optional label override: "Our one pick", "Also good", "Later")
- `showAddAll` (yes/no, uses existing shopping list)
- Rendering rules: product name, brand, link and role from the product record; image if rights recorded else the label tile (or no tile in "list, no pictures"); never any copied product data; build fails on unknown or replaced-without-successor id. One disclosure line under the block (existing `ShopDisclosure`).

**compare** (new)
- `title`, `caption` (optional), `columns` (list of 2-5 short strings; first column is the row name)
- `rows` (repeater): `name`, `productId` (optional; shows link/card), `cells` (list, same length as `columns - 1`)
- `verdict` (optional line under the table)
- Phone: each row becomes a stacked card with "column: value" pairs (no horizontal scroll). Validation: cell count matches columns.

**steps** (new)
- `title`, `time` (optional), `difficulty` (optional), `materialsFrom` (optional: `whatYoullNeed` of the same article, rendered at the top)
- `steps` (repeater): `heading`, `text`, `image` (optional picture), `caption` (optional), `tip` (optional)

**gallery** (new)
- `title`, `intro` (optional), `layout` (pick: "even grid" / "one large, rest small")
- `items` (repeater): `image` (picture), `caption` (optional), `credit` (optional; falls back to the image record's credit)
- Uses the existing Images collection and alt text; lazy-loaded; no carousel.

**timeline** (new)
- `title`, `intro` (optional)
- `entries` (repeater): `when` (text, e.g. "Three days out", "6:30 pm"), `heading`, `text`, `image` (optional), `productIds` (optional list, same product-by-id rule)

**Extended**: `image` (`size`, `ratio`, `credit`), `quote` (`attribution`, `style`), `whatYoullNeed` (`checkable`, per-item `productId`).

### Product-id dependency (Stage 2a)
Blocks reference stable product ids only. Pages CMS `reference` fields need a collection of files (as the Images collection does today). Options for 2a: (a) expose a Products collection of JSON files so the owner picks from a list; (b) keep the CSV importer and give the owner a generated, read-only "product ids" page plus the build gate. Option (a) makes `productEdit` and `compare` genuinely nontechnical-editable; under (b) they are editable but error-prone, and the build gate (unknown id, replaced id, missing note) becomes the safety net. This review does not choose; it flags that the CMS-editability ratings below assume (a).

### Product imagery: design for both
- Every product surface has two states and both must look intentional: with an approved photo (4:3 or 1:1, credit visible, `photoFor` rights rule unchanged) and without (a compact label, not a large placeholder).
- Without images, shrink the tile: a single-row label (as the existing `compact` variant already does) for lists; reserve the large tile for the one pick only, and drop it entirely in the "list, no pictures" style.
- Keep inspiration imagery (gallery, hero, steps) visibly separate from product imagery, as the plan requires.
- Do not store or hotlink Amazon images. Nothing here depends on the imagery research outcome; a future image field is already modelled in the catalog (`imageUrl`, `imageCredit`, `imageRights`).

### Cross-cutting fixes (apply once, benefit all layouts)
- Header: collapse Save/Send/Copy/Pin into one compact row, move it below the hero on phone, so the photo is above the fold.
- Images: build 480/960/1600 widths (the repo already builds 480/640/960 for the homepage in `public/lcp`), emit `srcset`/`sizes`, add WebP/AVIF; keep `fetchPriority=high` only on the hero. Likely the biggest LCP and bytes win.
- Disclosure: one visible line near the first product module, one at the end of each product block, no repeats inside a block.
- Replace `ShopFold`'s DOM scan/regex with a `limit` on `productEdit` (e.g. show first 3, "See all"), driven by data not by text matching.
- Hide the "pick / then add / extras" scaffolding when there are fewer than 4 products (avoids the orphan card).
- Add `<ol>` semantics to numbered items/steps (currently the number is aria-hidden text).

## 7. Summary table

| Item | Customer | Commercial | Maintenance | Complexity | CMS (nontechnical) | Risk to existing pages |
|---|---|---|---|---|---|---|
| `layout` + header/rail variants | High | Medium | Low | M | Easy | Low (default unchanged) |
| `productEdit` | High | High | Low-Med | M | Medium (Easy if 2a gives a Products collection) | Medium (coexists with legacy blocks) |
| `compare` | High | Medium | Low | S-M | Medium | None |
| `steps` | High | Medium | Low | M | Easy | None |
| `gallery` | High | Medium (indirect, Pinterest) | Low | S-M | Easy | None |
| `timeline` | High | Medium | Low | S | Easy | None |
| Extend `image`/`quote`/`whatYoullNeed` | Medium | Low-Med | Low | S | Easy | None |
| `atAGlance`, `heroCredit`, `pinImage` fields | Medium | Medium | Low | S-M | Easy | None |
| Responsive images + header compaction | High | Medium | None | M | n/a | Low |

## 8. Build now vs defer

**Build now (before the four pilots are rendered)**
1. `layout` field with `feature`, `shopping-edit`, `project`, `hosting-guide`/`itinerary` (4 initial variants cover the pilots: clay = project, junk journaling supplies = shopping-edit, mahjong = hosting-guide, 35 hobbies = discovery-list or feature).
2. `steps`, `gallery`, `timeline`, `compare`, `productEdit` (after Stage 2a ids are stable; until then, build the block against the id contract and a fixture).
3. `image`/`quote`/`whatYoullNeed` extensions; `atAGlance`; `pinImage`; `heroCredit`.
4. Header compaction, responsive images, disclosure de-duplication, validation gates for the new blocks (unknown product id, mismatched compare columns, missing alt on any picture).

**Defer**
- A mid-article "read next" card block (nice, not needed; the end-of-article related row works).
- A generic "note/callout" block with tone selector (the 7 fixed callouts suffice until a real article needs more).
- Reordering `discovery-list` into a filterable index.
- Saving a checklist's ticks across devices.
- Migrating the 32 legacy articles to new blocks (they are being replaced, not renovated).

## 9. Over-engineering to avoid
- A page builder, drag-and-drop layouts, per-article custom CSS or free-form columns.
- A carousel/lightbox library for galleries; a JS table component; a markdown/MDX pipeline.
- Per-article theming or user-selectable themes; more than about 6 layouts.
- A second product store inside article JSON (copying names, brands, links or images into blocks) or a "dynamic price/availability" widget.
- Accounts, server-side save of checklists, comment systems, live "trending" modules.
- Automatic image resizing at request time or a paid image CDN; do it at build.
- Rewriting the 5 commerce components into one before the new blocks prove out; wrap them.

## 10. Risks and open questions
- The CMS cannot be fully verified: `.pages.yml` has never been opened in the live Pages CMS (its own header says so). Block repeaters and reference pickers should be tested in the Cowork CMS task before the owner depends on them.
- Hero art is thin and reused (section 3, item 10). A richer layout will expose this; photography direction is an art-direction task, not renderer work.
- Pins: Stage 1 removes pins from the deployed site, but `pins.ts`/`pinImageFor` depend on them. `pinImage` must land before or with that removal, or Pin it silently falls back to landscape heroes.
- Legacy shop blocks and `verifiedFor()` overlap rules must keep working until old articles are retired; do not remove them in the same change as the new blocks.
- Measurements here come from one local build; no Lighthouse or field data was gathered, so LCP values are not claimed.
