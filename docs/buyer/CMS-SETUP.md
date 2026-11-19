# Pages CMS setup and daily use

> **NOT YET TESTED WITH A REAL LOGIN.** The CMS is configured (`.pages.yml`) and the content checks are tested, but nobody has yet signed in to Pages CMS with the owner's GitHub login, edited a real article, or pressed Netlify's Trigger deploy on this site. Do not treat it as fully operational until `docs/buyer/CMS-TEST-PLAN.md` has been run and recorded as passed.

For the owner or buyer. No coding. You need: a GitHub account that can edit the Plans Past Five repository, a Netlify login for the site, and a web browser.

## The two words that matter
- **Saved**: you pressed Save in the CMS. It is stored in GitHub. **The website does not change.**
- **Published**: you pressed Netlify **Deploys > Trigger deploy > Deploy site**. The website updates in 2 to 5 minutes. Each publish uses 15 of your 300 monthly Netlify credits, so batch your edits (aim for 8 publishes a month at most). Details: `docs/buyer/NETLIFY-CREDITS-AND-RELEASES.md`.

## One-time setup
1. Go to https://pagescms.org, choose **Sign in with GitHub**, approve.
2. **Add a project**, pick the Plans Past Five repository (use the GitHub link on that screen to allow access to this one repository if it is missing).
3. Choose branch **main**.
4. You should see **Articles** and **Images**. If you see a message about `.pages.yml`, copy it and send it to the person who maintains the site.

## Edit an article
1. Articles, click the article, change the blocks (arrows reorder, Add inserts). Text boxes accept `**bold**` and `[link words](/journal/another-article)`.
2. Press **Save**. That is Saved, not Published.
3. When your batch is ready, Publish (below).

## Add an image
1. Images, **Add an entry**. One-word **Picture name** such as `crochetHands`.
2. Upload the photo (JPG, PNG or WebP, about 1600 px wide, under 400 KB) and write the **Describe the photo** text (required).
3. Fill in creator, source, licence (`docs/buyer/IMAGE-AND-ASSET-RIGHTS.md`). Save. Then pick it in an article.

## Publish (exact clicks)
1. Netlify, your site, **Deploys**, **Trigger deploy**, **Deploy site**.
2. Wait for green **Published**. If **Failed**, the live site is unchanged; open the deploy and read the list, for example `content/articles/how-to-start-crocheting.json, field "sources > #1 > url": must be a full web address starting with https://`. Fix it in the CMS, Save, Publish again.
3. If the deploy says **Skipped**, use the backup: github.com, open `RELEASES.md`, pencil icon, add a line, commit to main with a message ending in `[deploy]`.

## Drafts, unpublish
- Status **Draft** is never on the website. For a new article keep Draft until finished.
- To go live: Status Published, fill **First published on** and **Facts last checked on** (like 2026-11-19), empty "Facts still waiting to be checked", Save, Publish.
- **Unpublish**: set Status to Draft, Save, Publish.

## Preview
There is no live preview of a draft by design (a draft's text never reaches the site build). Check the Pages CMS form, publish when ready, then view `/journal/<slug>`; unpublish if something is wrong.

## Roll back
- Netlify Deploys, click an earlier Published deploy, **Publish deploy**, then switch **Auto publish** back on.
- Or in GitHub: Commits on main, open your edit, **...**, **Revert**, Create pull request, Merge, then Publish. Never force-push (the site is also connected to Lovable).

## Things Pages CMS cannot do
Change design or code, edit hobbies, products or site settings (`docs/buyer/EDITING-WITHOUT-CODE.md`, `docs/buyer/PRODUCT-MANAGEMENT.md`), or fix a broken build by itself.

## For the maintainer
- Pages CMS offers `settings.commit.templates` for commit messages but no documented branch, PR or publish workflow (pagescms.org docs, checked 2026-11-19). Options weighed: (A) saves wait for Trigger deploy: chosen; (B) marker in every save message: 15 credits per save; (C) side branch plus merge: not supported by Pages CMS docs; (D) ignore rule builds whenever `content/` changes: also 15 credits per save.
- `netlify.toml` rule test: `bash scripts/check-netlify-ignore.sh`. Content check: `node scripts/build-content.mjs --check` (runs as `prebuild`, so an invalid edit fails the build and the live site stays).
- Generated files under `src/content/generated/` and `src/data/images.generated.ts` come from `bun run content:build`; the committed copy can lag a CMS edit until the next build.
