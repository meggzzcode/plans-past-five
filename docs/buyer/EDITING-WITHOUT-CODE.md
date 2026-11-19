# Editing articles and images without writing code

> **NOT YET TESTED WITH A REAL LOGIN.** Content is stored as data files that Pages CMS can edit and the build checks every edit, but nobody has yet signed in with the owner's GitHub login, edited a real article or pressed Trigger deploy. Run `docs/buyer/CMS-TEST-PLAN.md` first. Treat the editor as "configured, not proven".

**Saved is not Published.** Saving in the CMS stores the edit in GitHub only. To put it on the website press Netlify **Deploys > Trigger deploy > Deploy site** (about 15 of 300 monthly credits; batch edits, at most 8 a month). Unpublish: Status Draft, Save, Publish. Roll back: Netlify Deploys > earlier deploy > Publish deploy. Full steps: `docs/buyer/CMS-SETUP.md`.

## How it works

- Articles are files in `content/articles/` (one `.json` file per article). Pictures are described in `content/images/` and the photo files live in `public/uploads/`.
- `.pages.yml` (repo root) tells Pages CMS which forms to show. Pages CMS runs in your browser at https://pagescms.org, signs in with GitHub and saves edits straight into the GitHub repository. There is no server, database or account of ours, and no secret in the repo.
- Every save becomes a commit. Netlify does not build it until you publish. The publish runs `scripts/build-content.mjs` (checks all content), then rebuilds the site.
- **A bad edit cannot take the site down.** If the check finds a problem (a missing picture description, a web address that does not start with https://, an unknown block type, a bad status, a duplicate web address name) the build stops, the previous version of the site stays live, and the Netlify deploy log lists each problem in plain English with the file and field name.
- Drafts stay private: only articles with Status "Published" are put into the website. A draft's text never reaches the public site.

## What you can edit in the browser

| Task | Where in Pages CMS |
|---|---|
| Fix a typo or rewrite an article | Articles, open the article, change the blocks, Save |
| Publish a draft | Articles, open it, set Status to Published, fill "First published on" and "Facts last checked on", Save, then Trigger deploy in Netlify |
| Write a new article | Articles, Add an entry, keep Status on Draft until finished |
| Add or replace a picture | Images, Add an entry, upload the photo, describe it (required), Save. Then choose it in an article |
| Change an article's top picture | Open the article, pick another picture in "Top picture" |

## What still needs another route

| Task | How |
|---|---|
| Hobbies (names, supplies, costs) | Still code in `src/data/hobbies.ts`: ask Lovable chat or an AI assistant, following `docs/buyer/CONTENT-MANAGEMENT.md`. A browser form for hobbies is not built |
| Products and the shop | Not for a non-coder alone: the importer needs a command line. Lovable chat or a developer; see `docs/buyer/PRODUCT-MANAGEMENT.md` |
| Site name, affiliate IDs, contact email | `src/config/site.ts` and `src/config/affiliate.ts`: deliberately not in the CMS because a wrong value can break links or tracking |
| Page layout and design | Lovable chat or a developer |

Step-by-step instructions for a non-technical owner: `docs/buyer/CMS-SETUP.md`.

## What to tell a buyer

"Articles and pictures can be edited in a browser with Pages CMS (free, signs in with GitHub). Edits are checked automatically when you publish, and a mistake leaves the live site unchanged. Hobbies, products and site settings are edited through other routes described in `docs/buyer/EDITING-WITHOUT-CODE.md`." Add "tested live with the owner's login" only after `docs/buyer/CMS-TEST-PLAN.md` has passed. Say plainly: saving does not publish; you press one Netlify button.

## Costs and trade-offs

Pages CMS is free. You need a GitHub account with access to the repository. The editor changes files; it cannot run code or change the site's design. The build step runs on Netlify (already used for hosting).
