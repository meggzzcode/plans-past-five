# SOP: publishing an article

An article stays `status: "draft"` until every item in its `coworkChecks` is verified against a source.
1. Verify each claim (costs, rules, safety, availability) with a primary source; record it in `sources`.
2. Set `verifiedAt` (YYYY-MM-DD), `publishedAt`, and `status: "published"`. Then MOVE its import from `src/content/draft-registry.ts` to the `all` array in `src/content/index.ts`. Only `index.ts` is bundled into the public site; `draft-registry.ts` is for tests and scripts, so draft text never ships. `src/test/content-registry.test.ts` fails if a file is registered in the wrong place.
3. No invented experiences, testing, prices, ratings or ASINs (see `/editorial-policy`). Do not add AI notes inside the article; the general disclosure lives on `/editorial-policy`.
4. Run tests, typecheck and build. The SEO test confirms the title and description are unique.
5. Confirm it appears in `/sitemap.xml` after deploy, then request indexing in Search Console.
