# Pages CMS setup and daily use

> **NOT YET TESTED WITH A REAL LOGIN.** The CMS is configured (`.pages.yml`) and the content checks are tested, but nobody has yet signed in to Pages CMS with a real GitHub login, edited a real article, or published from it on this site. The required test, with the exact accounts and a safe throwaway setup, is in `docs/editorial-reset/CMS-ACCEPTANCE-TEST-OWNER-ACTIONS.md` and the checklist is `docs/buyer/CMS-TEST-PLAN.md`. Do not treat the CMS as proven until that test is recorded as passed.

For the owner or buyer. No coding. You need: a GitHub account that can edit the Plans Past Five repository (or an email invitation as a Pages CMS collaborator, see below), a Netlify login for the site, and a web browser. Pages CMS is free (pagescms.org says "100% free", MIT licence, read 2026-11-19).

## What you can change here
| Task | Form | Works today? |
|---|---|---|
| Write, edit, publish or unpublish an article | **Articles** | Configured; build checks tested with simulated CMS saves; real login test pending |
| Add or change a picture | **Images** (the only picture route) | Same |
| Site name, tagline, website address, contact email, Google Analytics ID, Search Console / Bing / Pinterest codes | **Site settings** | Same |
| Amazon tracking ID, marketplace, tracking on/off | **Site settings** | Same. Stays OFF until you switch it on |

Not in the CMS: hobbies and products (code and the product importer; see `docs/buyer/PRODUCT-MANAGEMENT.md`), the logo and pin pictures, page layout.

## The two words that matter
- **Saved**: you pressed Save in the CMS. It is stored in GitHub.
- **Published**: the live website changed.

**How Saved becomes Published:** you edit on the `content-edits` branch, look at the free Netlify preview, then press **Publish site** in Pages CMS. That button runs a GitHub check-and-merge and Netlify then makes one production build (15 credits). The complete walk-through, one-time setup, failure messages and rollback are in `docs/buyer/PUBLISH-AND-ROLLBACK.md`. Fallback if the button cannot be used: Netlify **Deploys > Trigger deploy > Deploy site** (edits saved on `main`; whether it honours the skip rule is UNKNOWN until the real test) or a `RELEASES.md` edit with a message ending in `[deploy]`.

**Why saves are not live automatically (verified 2026-11-19, Netlify docs):** the free Netlify plan has 300 credits a month as a hard limit, a successful production deploy costs 15 credits, and when credits run out the whole site shows "Site not available". Automatic deploy on every save could therefore take the site offline after about 20 saves. Rollbacks and failed builds cost 0, and so do Deploy Previews and branch deploys. Sources for the one-button route (edit on a branch, preview free, press Publish) are in `docs/editorial-reset/PUBLISHING-WORKFLOW-RECOMMENDATION.md`. A paid Netlify plan changes this: re-read Netlify's pricing before relying on the numbers.

## One-time setup
1. Go to https://pagescms.org, choose **Sign in with GitHub**, approve.
2. **Add a project**, pick the Plans Past Five repository (use the GitHub link on that screen to allow access to this one repository if it is missing).
3. Choose branch **content-edits** (create it first: one-time setup in `docs/buyer/PUBLISH-AND-ROLLBACK.md`). Whether Pages CMS can open a non-default branch for your account is UNKNOWN until the real test; if it cannot, choose **main** and use the fallback publish method above.
4. You should see **Articles**, **Images** and **Site settings**. If you see a message about `.pages.yml`, copy it and send it to the person who maintains the site.
5. To let a helper edit without a GitHub account, invite them by email in Pages CMS (Collaborators). Their edits are written through the Pages CMS app (docs read 2026-11-19; not yet tested here).

## Edit an article
1. Articles, click the article, change the blocks (arrows reorder, Add inserts). Text boxes accept `**bold**` and `[link words](/journal/another-article)`.
2. Press **Save**. That is Saved, not Published.
3. When your batch is ready, Publish (below).

Pages CMS writes the file in its own layout (2-space indent, no final newline). That is fine: the build understands it and tidies it, and no test fails because of layout.

## Hide an article or change its web address
Setting an article to **Draft**, or changing its web address name, fails the build with a plain list if anything still points at it: links in other articles, the "Related" list, shop blocks, Pinterest pins, page-title overrides or the corrections log. Fix each line listed (change or remove the link) and save again. Pins and page-title overrides are in code (`src/data/pins.ts`, `src/lib/seo.ts`): ask your developer or assistant, or keep the article published.

## Add an image (the only picture route)
1. Images, **Add an entry**. One-word **Picture name** such as `crochetHands`.
2. Upload the photo (JPG, PNG or WebP, about 1600 px wide, under 400 KB) and write the **Describe the photo** text (required).
3. Fill in **Where it came from** and **Licence** (for example "my own photo", or the licence the photo came with). The build refuses an uploaded photo without them, so the record of your right to use it is always kept. See `docs/buyer/IMAGE-AND-ASSET-RIGHTS.md`.
4. Save. Then pick it in an article ("Top picture" or an image block).
Do not upload loose files in the Media tab and do not put photos in `src/assets/`: those routes skip the descriptions and licence record.

## Site settings (one form, validated)
Open **Site settings**. Every value is checked at build time and a wrong one stops the build with a plain message (for example "is not a Google Analytics 4 measurement ID ... like G-ABC123XYZ9"), leaving the live site as it was. Public values only: never type a password, key or private token. Details of each field are on the form. To remove analytics, empty the Google Analytics field.

## Amazon affiliate tracking (stays OFF until you authorise it)
Shipped state: no ID, switch OFF, so links are plain Amazon links and the site says it does not earn from them. To turn on: (1) your own Amazon Associates account must be approved for this website (the seller's account does not transfer: Amazon's Operating Agreement restricts assignment without its written approval, `docs/buyer/AFFILIATE-ACTIVATION.md`); (2) in Site settings type **your** tracking ID (like `yourstore-20`), the date you confirmed the approval, and switch **Amazon tracking ON**; (3) Save and publish. One ID changes every Amazon link site-wide, and the earnings disclosure appears by itself. **To replace the ID** (new owner, new account): change the one field, Save, publish; no other place holds an ID. Typing an ID with the switch off changes nothing. The exact disclosure wording is read from `src/config/affiliate.ts`; the current Amazon wording still has to be re-read from Amazon's Operating Agreement before switching on (open item, see `docs/editorial-reset/changes/stage2b.md`).

## Publish (exact clicks)
1. Pages CMS on branch `content-edits`: look at your edits in the Netlify preview first, then click **Publish site** and confirm **Publish now**.
2. GitHub, **Actions** tab, **Publish content**: a green tick means your edits were checked and merged; Netlify then builds the live site (watch Netlify **Deploys** for **Published**).
3. If it is red, nothing changed on the live site: read the red message (meanings in `docs/buyer/PUBLISH-AND-ROLLBACK.md`, section 4), fix in the CMS, Save, press Publish site again.
4. Fallback only if the button cannot be used: Netlify **Deploys > Trigger deploy > Deploy site** (edits on `main`), or a `RELEASES.md` edit with a message ending in `[deploy]`.

## Drafts, unpublish
- Status **Draft** is never on the website. For a new article keep Draft until finished.
- To go live: Status Published, fill **First published on** and **Facts last checked on** (like 2026-11-19), add at least one source, and resolve every "Facts still waiting to be checked" line (start it with RESOLVED and a date) or the build fails; Save, Publish site.
- **Unpublish**: set Status to Draft, Save, Publish site (see the note above about links to it).

## Preview
Saving on the `content-edits` branch gives a free Netlify preview of the whole site with your edits (0 credits; address `https://content-edits--<your-site>.netlify.app`; needs the one-time Netlify branch-deploy setting). A draft is never built into any copy of the site, so it has no preview page: set it to Published on the branch, Save, check the preview, then Publish site. Details: `docs/buyer/PUBLISH-AND-ROLLBACK.md`.

## Roll back
Netlify Deploys, an earlier good deploy, **Publish deploy** (0 credits); then GitHub Actions, **Undo last publish**; then reset the `content-edits` branch; then turn Netlify auto publishing back on. Step by step in `docs/buyer/PUBLISH-AND-ROLLBACK.md`, section 5. Never force-push `main`.

## For the maintainer
- Settings live in `content/settings.json` and are read by `src/config/site.ts` and `src/config/affiliate.ts`. The check is `settingsSchema` in `scripts/content-lib.mjs`.
- Publish route (installed, untested with a real login): `.github/workflows/publish-content.yml`, `.github/workflows/undo-last-publish.yml`, the `actions:` block in `.pages.yml`, tests in `src/test/publish-workflow.test.ts`. Pages CMS reads `.pages.yml` per branch, so keep it the same on `main` and `content-edits` (the publish workflow levels the branches).
- `netlify.toml` rule test: `bash scripts/check-netlify-ignore.sh`. Content check: `node scripts/build-content.mjs --check` (runs as `prebuild`).
- Generated files under `src/content/generated/`, `src/data/images.generated.ts`, the app name in `public/manifest.webmanifest` and the sitemap line in `public/robots.txt` come from `bun run content:build`; the tests run it first.
