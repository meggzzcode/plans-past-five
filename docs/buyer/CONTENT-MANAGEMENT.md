# Content management

> **NOT YET TESTED WITH A REAL LOGIN.** The browser editor (Pages CMS) is configured but no real login test has been run: `docs/buyer/CMS-TEST-PLAN.md`.

**Saved is not Published.** A CMS save (a commit to main) does not change the website. Publish with Netlify **Deploys > Trigger deploy > Deploy site** (or a commit message ending in `[deploy]`). Unpublish: set Status to Draft, save, publish. Rollback: Netlify Deploys > earlier deploy > Publish deploy, or git revert. About 15 credits per publish, at most 8 a month: `docs/buyer/NETLIFY-CREDITS-AND-RELEASES.md`.

Articles and images are data files (`content/articles/*.json`, `content/images/*.json`) that a developer edits directly or a non-coder edits in Pages CMS (`docs/buyer/CMS-SETUP.md`, `docs/buyer/EDITING-WITHOUT-CODE.md`; first live login test is a pending follow-up task listed in `docs/cowork`). `bun run content:build` validates them and writes the generated files; it runs automatically before every build. Hobbies, products and settings remain code. After any change run:

```
bunx vitest run
bunx tsc --noEmit
bunx vite build
```

## Publish an article

1. The article file is `content/articles/<slug>.json` (same fields as the `Article` type in `src/content/types.ts`).
2. Pass `docs/content/ARTICLE-QUALITY-CHECKLIST.md` and `docs/SOP-publish-article.md`: resolve every `coworkChecks` item, fill `sources`, set `verifiedAt`.
3. Set `"status": "published"` and `"publishedAt": "YYYY-MM-DD"`.
4. Registration is automatic: `scripts/build-content.mjs` writes only published articles to `src/content/generated/published.json` (the public bundle) and drafts to `drafts.json` (tests and scripts only). `src/test/content-registry.test.ts` checks that no draft reaches the public bundle.
5. Publish (see above), then confirm it appears in `/sitemap.xml` and request indexing.

## Update an article

Edit the JSON (or use Pages CMS); set `updatedAt: "YYYY-MM-DD"`. If you correct a factual error, also follow `docs/SOP-corrections.md` and add an entry in `src/content/corrections.ts` if the process there says so.

## Write a new article

Copy a similar `content/articles/*.json` (or use Add an entry in Pages CMS). Blocks available: `p`, `h2` (give an `id` for the table of contents), `h3`, `list`, `quote`, `image`, `item`, `whatYoullNeed`, `starterKit`, `shopHobby`, `saveSplurge`, `tryThisWeekend`, `girlsNight`, `first30`, `noSpend`, `makePlan`, `ifYouLoved`. Inline text supports `**bold**` and `[link](/path)`. Keep it `status: "draft"` until the gate passes. Voice: `docs/content/BRAND-VOICE.md`.

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
2. Add `content/images/<key>.json` (key, file, alt, credit, source, licence; w and h are read from the file) or use the Images form in Pages CMS; use the key as an article's `hero` or an `image` block.
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

Real-login test of Pages CMS and Trigger deploy: `docs/buyer/CMS-TEST-PLAN.md`.
