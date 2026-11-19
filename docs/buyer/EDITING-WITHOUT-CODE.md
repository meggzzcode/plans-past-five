# Editing articles and images without writing code

Status 2026-11-19: **the content is now stored as data files that a free browser editor (Pages CMS) can change.** The conversion is done and the build checks every edit. One step is still open: nobody has yet signed in to Pages CMS with the owner's GitHub login and edited a real article through it. That first live test is Cowork task C17 in `docs/cowork/PLANS-PAST-FIVE-COWORK-TASKS.md`. Until C17 reports, treat the browser editor as "configured but not yet proven".

## How it works

- Articles are files in `content/articles/` (one `.json` file per article). Pictures are described in `content/images/` and the photo files live in `public/uploads/`.
- `.pages.yml` (repo root) tells Pages CMS which forms to show. Pages CMS runs in your browser at https://pagescms.org, signs in with GitHub and saves edits straight into the GitHub repository. There is no server, database or account of ours, and no secret in the repo.
- Every save becomes a commit. Netlify sees it, runs `scripts/build-content.mjs` (checks all content), then rebuilds the site.
- **A bad edit cannot take the site down.** If the check finds a problem (a missing picture description, a web address that does not start with https://, an unknown block type, a bad status, a duplicate web address name) the build stops, the previous version of the site stays live, and the Netlify deploy log lists each problem in plain English with the file and field name.
- Drafts stay private: only articles with Status "Published" are put into the website. A draft's text never reaches the public site.

## What you can edit in the browser

| Task | Where in Pages CMS |
|---|---|
| Fix a typo or rewrite an article | Articles, open the article, change the blocks, Save |
| Publish a draft | Articles, open it, set Status to Published, fill "First published on" and "Facts last checked on", Save |
| Write a new article | Articles, Add an entry, keep Status on Draft until finished |
| Add or replace a picture | Images, Add an entry, upload the photo, describe it (required), Save. Then choose it in an article |
| Change an article's top picture | Open the article, pick another picture in "Top picture" |

## What still needs another route

| Task | How |
|---|---|
| Hobbies (names, supplies, costs) | Still code in `src/data/hobbies.ts`: ask Lovable chat or an AI assistant, following `docs/buyer/CONTENT-MANAGEMENT.md`. A browser form for hobbies is not built |
| Products and the shop | The importer spreadsheet flow in `docs/buyer/PRODUCT-MANAGEMENT.md` |
| Site name, affiliate IDs, contact email | `src/config/site.ts` and `src/config/affiliate.ts`: deliberately not in the CMS because a wrong value can break links or tracking |
| Page layout and design | Lovable chat or a developer |

Step-by-step instructions for a non-technical owner: `docs/buyer/CMS-SETUP.md`.

## What to tell a buyer

"Articles and pictures can be edited in a browser with Pages CMS (free, signs in with GitHub). Edits are checked automatically before the site is rebuilt, and a mistake leaves the live site unchanged. Hobbies, products and site settings are edited through other routes described in `docs/buyer/EDITING-WITHOUT-CODE.md`." Add "tested live with the owner's login" only after Cowork task C17 has reported success.

## Costs and trade-offs

Pages CMS is free. You need a GitHub account with access to the repository. The editor changes files; it cannot run code or change the site's design. The build step runs on Netlify (already used for hosting).
