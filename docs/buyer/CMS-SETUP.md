# Pages CMS setup and daily use

For the owner or buyer. No coding. You need: a GitHub account that can edit the Plans Past Five repository, and a web browser. Status: configured in `.pages.yml`; the first live test with the owner's login is a pending follow-up task listed in `docs/cowork`.

## One-time setup

1. Go to https://pagescms.org and choose **Sign in with GitHub**. Approve the request. (This is your own GitHub login; nothing is stored by us.)
2. Choose **Add a project**, then pick the Plans Past Five repository. If you do not see it, click the GitHub link on that screen to allow Pages CMS access to this one repository.
3. Choose the branch **main**. (The website is published from main.)
4. You should now see **Articles** and **Images** in the left menu. If you see a message about `.pages.yml`, copy it and send it to the person who maintains the site.

## Edit an article

1. Articles, click the article.
2. Change the text. The article is a stack of blocks (paragraph, heading, list, picture, "try this weekend" box and so on). Use the arrows to reorder; use "Add" to insert a block.
3. Text boxes accept `**bold**` and links written like `[link words](/journal/another-article)`.
4. Press **Save**. The site updates in a few minutes.

## Add an image

1. Images, **Add an entry**.
2. Give it a one-word **Picture name** such as `crochetHands` (no spaces).
3. Upload the photo (JPG, PNG or WebP, about 1600 pixels wide, under 400 KB) and write the description in the **Describe the photo** box. This is required: it is read aloud for people who cannot see the picture.
4. Fill in who made it, where it came from and the licence. Only use photos you have the right to publish (see `docs/buyer/IMAGE-AND-ASSET-RIGHTS.md`).
5. Save. Then open an article and choose it under **Top picture** or in a Picture block.

## How drafts publish

- Status **Draft**: saved but never shown on the website. Safe to leave half-finished.
- Status **Published**: appears after the next automatic build. Before switching, fill in **First published on** and **Facts last checked on** (dates written like 2026-11-19) and empty the "Facts still waiting to be checked" list.
- To take an article offline, set it back to Draft.

## What a failed build looks like (the live site stays up)

If something in an edit is not valid (for example a source address that does not start with https://, or a picture with no description), Netlify's build stops. Nothing goes live: visitors keep seeing the last good version. You will see a failed deploy in Netlify (Deploys) and, if you set up notifications, an email. Open the failed deploy's log. The message starts with "The website was NOT rebuilt because some content needs fixing" and lists each problem, for example:

`content/articles/how-to-start-crocheting.json, field "sources > #1 > url": must be a full web address starting with https://`

Fix that field in Pages CMS and Save again. The next build runs automatically.

## Undo a bad edit (GitHub history)

1. Open the repository on github.com, click **Commits** on the main branch.
2. Find your edit (the message names the file). Open it, then choose **...** (top right), **Revert**. GitHub proposes a change that undoes it; click **Create pull request**, then **Merge pull request**.
3. Netlify rebuilds with the old content. Never use "force push" or rewrite history: the site is also connected to Lovable.

## Things Pages CMS cannot do

Change design or code, edit hobbies, products or site settings (see `docs/buyer/EDITING-WITHOUT-CODE.md`), or fix a broken build by itself.

## For the maintainer

- Generated files `src/content/generated/*.json` and `src/data/images.generated.ts` are rebuilt from `content/` by `bun run content:build` (also the `prebuild` step). They are committed so Lovable previews and tests work, but after a CMS edit the committed copy can lag until the next build or until someone runs `bun run content:build` and commits.
- Check content without writing: `node scripts/build-content.mjs --check`.
