# Editing articles and images without writing code

> **NOT YET TESTED WITH A REAL LOGIN.** Content is stored as data files that Pages CMS can edit and the build checks every edit, but nobody has yet signed in with the owner's GitHub login, edited a real article or pressed Trigger deploy. Run `docs/buyer/CMS-TEST-PLAN.md` first. Treat the editor as "configured, not proven".

**Saved is not Published.** Saving in the CMS stores the edit in GitHub only. To put it on the website press Netlify **Deploys > Trigger deploy > Deploy site** (15 of the free plan's 300 monthly credits per successful publish, verified in Netlify's docs 2026-11-19; failed builds, rollbacks and previews cost 0). Unpublish: Status Draft, Save, Publish. Roll back: Netlify Deploys > earlier deploy > Publish deploy. Full steps: `docs/buyer/CMS-SETUP.md`. The recommended one-button route (edit on a branch, free preview, press Publish) is proposed in `docs/editorial-reset/PUBLISHING-WORKFLOW-RECOMMENDATION.md` and needs the owner's approval.

## How it works

- Articles are files in `content/articles/` (one `.json` file per article). Pictures are described in `content/images/` and the photo files live in `public/uploads/`. Site settings are one file, `content/settings.json`.
- `.pages.yml` (repo root) tells Pages CMS which forms to show. Pages CMS runs in your browser at https://pagescms.org, signs in with GitHub and saves edits straight into the GitHub repository. There is no server, database or account of ours, and no secret in the repo. Settings are public values only.
- Every save becomes a commit. Netlify does not build it until you publish. The publish runs `scripts/build-content.mjs` (checks all content and settings), then rebuilds the site.
- **A bad edit cannot take the site down.** If the check finds a problem (a missing picture description, a web address that does not start with https://, an unknown block type, a bad status, a duplicate web address name, a malformed Analytics ID or email, an article hidden while other pages still link to it) the build stops, the previous version of the site stays live, and the Netlify deploy log lists each problem in plain English with the file and field name.
- **A valid edit never turns the automated tests red.** The tests check behaviour and integrity (links resolve, disclosure follows the affiliate switch, every hobby has its data), not particular names, counts or settings values, and the content build tidies the layout Pages CMS writes. This was checked by simulating owner edits in a scratch copy: new site name, URL, email and Analytics ID; a new hobby; the first uploaded photo; a typo fix; a different JSON indent (`docs/editorial-reset/changes/stage2b.md`). It has not been checked with a real Pages CMS login.
- Drafts stay private: only articles with Status "Published" are put into the website. A draft's text never reaches the public site.

## What you can edit in the browser

| Task | Where in Pages CMS | Works today? |
|---|---|---|
| Fix a typo or rewrite an article | Articles, open the article, change the blocks, Save | Build side verified in a scratch copy; real login untested |
| Publish a draft | Articles, open it, set Status to Published, fill "First published on" and "Facts last checked on", Save, then publish | Same |
| Write a new article | Articles, Add an entry, keep Status on Draft until finished | Same |
| Add or replace a picture | Images, Add an entry, upload the photo, describe it, say where it came from and the licence, Save. Then choose it in an article | Same |
| Change an article's top picture | Open the article, pick another picture in "Top picture" | Same |
| Site name, tagline, address, contact email, Analytics ID, verification codes | Site settings | Same |
| Amazon tracking ID, marketplace and on/off (OFF until you authorise it) | Site settings | Same. Needs your own approved Associates account |

## What still needs another route

| Task | How |
|---|---|
| Hobbies (names, supplies, costs) | Still code in `src/data/hobbies.ts` and `src/data/equipment.ts`: ask an AI assistant or developer, following `docs/buyer/CONTENT-MANAGEMENT.md`. Adding a hobby no longer breaks tests on a count, but every hobby needs its enrichment and equipment entries or the completeness checks fail. A browser form for hobbies is not built |
| Products and the shop | Not for a non-coder alone: the importer needs a command line. A developer or AI assistant; see `docs/buyer/PRODUCT-MANAGEMENT.md` (being reworked) |
| Choosing which content is featured (homepage, collections) | Code today (`src/routes/index.tsx`, `src/data/`). Not a CMS form |
| Pinterest pins, logos | Artwork; see `docs/buyer/BRAND-GUIDELINES.md` |
| Page layout and design | A developer or AI assistant |

Step-by-step instructions for a non-technical owner: `docs/buyer/CMS-SETUP.md`.

## What to tell a buyer

"Articles, pictures and the main site settings (name, email, analytics, Amazon tracking ID) can be edited in a browser with Pages CMS (free, signs in with GitHub). Edits are checked automatically when you publish, and a mistake leaves the live site unchanged. Hobbies, products and featured placements are edited through other routes described in `docs/buyer/EDITING-WITHOUT-CODE.md`." Add "tested live with a real login" only after `docs/buyer/CMS-TEST-PLAN.md` has passed. Say plainly: saving does not publish.

## Costs and trade-offs

Pages CMS is free. You need a GitHub account with access to the repository (or an email invitation as a collaborator). The editor changes files; it cannot run code or change the site's design. The build step runs on Netlify (already used for hosting).
