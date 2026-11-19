# Content management

**There is no CMS.** Content is TypeScript data edited in files and deployed with the site. Nothing is configured for browser-based editing. Evaluating a free Git-based CMS (a tool that edits files in the repo through a web interface) is PENDING: nobody has chosen or tested one, and adopting one would need a code change and a security review. Until then, the steps below are the process. After any change run:

```
bunx vitest run
bunx tsc --noEmit
bunx vite build
```

## Publish an article

1. The article file is `src/content/article-<slug>.ts`, exporting an `Article` (`src/content/types.ts`).
2. Pass `docs/content/ARTICLE-QUALITY-CHECKLIST.md` and `docs/SOP-publish-article.md`: resolve every `coworkChecks` item, fill `sources`, set `verifiedAt`.
3. Set `status: "published"` and `publishedAt: "YYYY-MM-DD"`.
4. Make sure it is imported and in the `all` array in `src/content/index.ts` (add the import if the file is new).
5. After deploy, confirm it appears in `/sitemap.xml` and request indexing.

## Update an article

Edit the file; set `updatedAt: "YYYY-MM-DD"`. If you correct a factual error, also follow `docs/SOP-corrections.md` and add an entry in `src/content/corrections.ts` if the process there says so.

## Write a new article

Copy a similar `article-*.ts`. Blocks available: `p`, `h2` (give an `id` for the table of contents), `h3`, `list`, `quote`, `image`, `item`, `whatYoullNeed`, `starterKit`, `shopHobby`, `saveSplurge`, `tryThisWeekend`, `girlsNight`, `first30`, `noSpend`, `makePlan`, `ifYouLoved`. Inline text supports `**bold**` and `[link](/path)`. Keep it `status: "draft"` until the gate passes. Voice: `docs/content/BRAND-VOICE.md`.

## Add a hobby

Edit `src/data/hobbies.ts`: add an entry following an existing one (name, category, settings, company, minutes, cost, energy, beginner, cravings, description, whyYoullLoveIt, supplies, optional, firstActivity, productIds). The slug is derived from the name. Hobby profile pages are `noindex` until a published article lists that hobby in its `hobbies` field. Run tests; `src/test/hobbies.test.ts` checks data rules.

## Edit a product (type record)

`src/data/products.ts`; rules in `docs/buyer/PRODUCT-CATALOG.md` and `docs/buyer/PRODUCT-MANAGEMENT.md`.

## Replace an affiliate URL or id

Never in content. Edit only the Amazon (or other) entry in `src/config/affiliate.ts`; every link follows. Steps: `docs/buyer/AFFILIATE-ACTIVATION.md`.

## Update homepage features

Edit `src/routes/index.tsx` (hero, categories, 5:01 Edit, Weekend Edit, shop and newsletter-ready blocks). Brand text and taglines come from `src/config/site.ts`. Check mobile width after changing layout.

## Upload an image

1. Put the file in `src/assets/` (the repo stores article and shop imagery there).
2. Register it in `src/data/images.ts` with real alt text; use the new key as an article's `hero` or an `image` block.
3. Record source and license in `docs/IMAGE-LICENSES.md`. Do not add images you cannot document (`docs/buyer/IMAGE-AND-ASSET-RIGHTS.md` from another worker, when present).
4. Keep files small enough for fast pages; PENDING: set a size budget.

## Manage collections (shop)

Collections are the `CollectionSlug` union and `collections` list in `src/data/products.ts`; each has six products and a test in `src/test/rules.test.ts` enforces that count. Changing the count means updating the test.

## Update metadata

Page titles and descriptions: each route's `head()` through `seo()` in `src/lib/seo.ts`; article metadata comes from the article's `title`, `dek` and fields. `src/test/seo-trust.test.ts` fails on duplicates. Global brand text: `src/config/site.ts`.

## Prepare Pinterest content

For each published article create three pins (search, aspirational, practical) and list them in `docs/pinterest-pins.csv`, with images in `public/pins/` (generator sources in `design/pins/`). See `docs/marketing/PINTEREST-STRATEGY.md`.

## Draft safety

Drafts must keep `status: "draft"`. Never import `allArticlesIncludingDrafts` in public code (`docs/buyer/TROUBLESHOOTING.md`).

## PENDING

Which free Git-based CMS, if any, fits this stack and the "no secrets in repo" rule? Research needed; nothing is installed.
