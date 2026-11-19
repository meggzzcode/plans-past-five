# Edit, preview, publish and roll back (no terminal, no GitHub file editing)

> **NOT YET TESTED WITH A REAL LOGIN.** The workflow files, the Pages CMS button and the checks are installed and tested on a simulated copy, but nobody has yet signed in to Pages CMS, saved an edit to the `content-edits` branch, seen a Netlify branch preview or pressed **Publish site** on a real account. Until the acceptance test in `docs/editorial-reset/CMS-ACCEPTANCE-TEST-OWNER-ACTIONS.md` is recorded as passed, treat every click path below as "written from the documentation, not yet proven". Do not remove this banner early.

Everything here is done in a web browser: Pages CMS, Netlify's website and GitHub's website. No terminal, no code, and you never edit a GitHub file by hand.

## The picture in four words

| Word | What it means | Is the live website changed? | Netlify credits |
|---|---|---|---|
| **Saved** | You pressed Save in Pages CMS. The edit is stored on a side branch of your GitHub copy called `content-edits`. | **No** | 0 |
| **Previewed** | Netlify builds a private-style copy of the whole website from `content-edits` at its own address. Only people who have the link see it, and search engines are told to ignore it. | **No** | 0 (Netlify lists branch deploys at 0 credits; viewing it counts as normal bandwidth) |
| **Published** | You pressed **Publish site** in Pages CMS. The site checks everything, joins your edits into the live branch (`main`), and Netlify builds the live website once. | **Yes**, after a few minutes | 15 for the one production build |
| **Rolled back** | You told Netlify to serve an earlier build again. | Yes, back to how it was | 0 |

Credit figures are from Netlify's own pages (read 2026-11-19, see `docs/editorial-reset/PUBLISHING-WORKFLOW-RECOMMENDATION.md` and `docs/buyer/NETLIFY-CREDITS-AND-RELEASES.md`). Netlify changes its plans: re-read before relying on them.

## One-time setup (about 15 minutes, once)
Do these three things in your own accounts (a developer or assistant cannot do them for you; they need your logins).
1. **GitHub, create the edit branch.** Open your repository on github.com. Click the branch button (it says **main**), type `content-edits` in the box, click **Create branch: content-edits from main**.
2. **GitHub, allow the Publish button to work.** Repository **Settings**, left menu **Actions**, **General**, scroll to **Workflow permissions**, choose **Read and write permissions**, **Save**. (The publish workflow uses GitHub's own built-in token; there is no password or key to create.) Also make sure the `main` branch has no protection rule that blocks pushes from GitHub Actions (Settings, Branches).
3. **Netlify, turn on the preview.** Your site, **Project configuration**, **Build & deploy**, **Continuous deployment**, **Branches and deploy contexts**, set **Branch deploys** to "Let me add individual branches" (or similar wording) and add `content-edits`. Keep the **Production branch** as `main`. Branch deploys are off by default (Netlify docs). Your preview address will look like `https://content-edits--your-site-name.netlify.app`.

Then sign in to https://pagescms.org with GitHub, open this repository and use the **branch picker** (top of the page) to choose **content-edits**. From now on always work on `content-edits`. See `docs/buyer/CMS-SETUP.md`.

## 1. Edit and save
1. Pages CMS, make sure the branch shown is **content-edits**.
2. Choose **Articles**, **Images** or **Site settings**, change what you need, press **Save**. A small message confirms it. This is Saved: nothing live has changed and nothing has been spent.
3. Pictures: use **Images**, **Add an entry** only (it records the description, where it came from and the licence). Keep a new article on **Draft** until it is finished.
4. Save as often as you like, in any order.

## 2. Preview
1. Wait one to three minutes after your last Save (Netlify builds the branch each time).
2. Open Netlify, your site, **Deploys**, change the filter to **Branch deploys** and click the newest `content-edits` entry, then **Preview**. Or just open `https://content-edits--your-site-name.netlify.app`.
3. Look at your changes on a phone-sized window too. If the deploy there says **Failed**, open it: the first lines are a plain-English list naming the file and the field to fix (for example a web address not starting with https://). Fix it in Pages CMS, Save, wait, look again.
4. A **Draft** article is never built into any copy of the site, so it has no preview page. To look at a finished draft, change its Status to **Published** on the `content-edits` branch, Save, and look at the preview. It is still not live: nobody sees it until you press Publish.

## 3. Publish
1. In Pages CMS click **Publish site** (the button in the left side menu, under the forms). A window asks "Publish your saved edits to the live website?". Click **Publish now**.
2. What happens, in order, on GitHub (you can watch it: your repository, **Actions** tab, **Publish content**):
   - It first checks that you only changed website content (articles, images, settings, photos), never code.
   - It joins your edits into `main` on a temporary machine, **without** changing `main` yet.
   - It runs the full content check and the content tests on the result.
   - **Only if everything passes** it updates `main` with a note ending in the release marker `[deploy]`. Netlify sees the marker and builds the live site **once** (15 credits). Then it brings `content-edits` level with `main` so you can keep working.
3. After a minute or two check Netlify **Deploys** for a green **Published** at the top, and look at the live website.
4. Nothing to publish? The run says so and changes nothing.

### If you cannot use the button
GitHub, your repository, **Actions** tab, **Publish content** (left list), **Run workflow**, keep **main**, **Run workflow**. Same result. If neither works (for example Pages CMS cannot open the `content-edits` branch), the older method still exists: Netlify **Deploys**, **Trigger deploy**, **Deploy site**, but edits must then be saved on `main`. Whether Trigger deploy builds when the marker is missing is UNKNOWN until tested; if it says **Skipped**, edit `RELEASES.md` on github.com and finish the message with the marker, for example `Release: new article [deploy]`.

## 4. When something fails (what each message means)
Every failure leaves the live website exactly as it was. Open GitHub, **Actions**, **Publish content**, the red run, and read the red message at the top.

| Message starts with | Plain meaning | What to do |
|---|---|---|
| The branch called content-edits does not exist yet | You skipped one-time setup step 1, or the branch was deleted. | Create it (setup step 1), save an edit, press Publish again. |
| The content-edits branch changes a file that is not website content | Something other than articles, images, settings or photos was changed on that branch. | Ask your site maintainer. Never publish code through this button. |
| These edits clash with a change made directly on main | Someone also changed the same content directly on `main`. | Reset the edit branch (below). Your unpublished edits on it are lost, so copy any text you need first. |
| The content check found a problem | A form value is wrong. The list above the message names the file and the field, for example `content/articles/x.json, field "sources > #1 > url"`. | Fix it in Pages CMS on `content-edits`, Save, Publish again. |
| A content test failed | Usually a link, a Pinterest pin or a Related list points at an article that is now a Draft, or a photo lacks its description, source or licence. | Fix or republish the article that is still linked, Save, Publish again. |
| GitHub refused the final step | `main` changed while it ran (press Publish again), or `main` is protected, or one-time setup step 2 was not done. | Press Publish again once; then check setup step 2. |
| Published, but content-edits was not levelled (a yellow warning) | Your edits are live, but the side branch could not be updated. | Reset the edit branch before your next edit. |
| The **Publish site** button is missing or shows an error | Pages CMS could not read its configuration for this branch (it reads `.pages.yml` separately for each branch). | Copy the message exactly and send it to the maintainer; use the "If you cannot use the button" route meanwhile. |

If the website itself looks wrong after a successful publish, roll back (next section).

## 5. Roll back (undo a published edit)
Do these in order. Step 1 fixes the live website in seconds; steps 2 and 3 make GitHub agree so the problem does not return.

1. **Put the earlier website back (Netlify, 0 credits).** Netlify, your site, **Deploys**. Find the last deploy that was good (before the one you want to undo; its label shows the date and the commit note) and open it. Click **Publish deploy**. Netlify's documentation says rolling back to a previous production deploy does not use credits. The live site is restored within moments. Netlify then stops building new versions automatically ("Auto publish" is locked); you will turn it back on in step 4.
2. **Undo the change on GitHub (the website, no code).** GitHub's commit page has no Revert button for this kind of change, so use the prepared button: your repository, **Actions** tab, **Undo last publish** (left list), **Run workflow**, keep the branch **main**, leave the box unticked (you already restored the site in step 1, so no credits are spent), **Run workflow**. It makes a new commit that cancels your last publish (history is kept; nothing is deleted). It stops with a plain message if it cannot do this safely. It undoes the newest publish only, so run it once; do not run it twice. To go further back, ask your maintainer.
3. **Reset the edit branch so the undone edits do not return.** GitHub, your repository, branch button, **View all branches**, find `content-edits`, click the bin icon to delete it, then in the branch button type `content-edits` and click **Create branch: content-edits from main**. Any edits you saved but did not publish are lost: copy text you want to keep first. Then refresh Pages CMS and pick `content-edits` again.
4. **Turn Netlify back on.** Netlify, **Deploys**, click **Start auto publishing** (or **Auto publish**) at the top. The next Publish site builds as normal.
5. **Check:** open the live website and one affected page.

Never force-push or delete `main`; the site is also connected to Lovable (`docs/buyer/SECURITY-AND-BACKUPS.md`).

## 6. Costs (only what has been verified)
- Each **Publish** is one production build: 15 credits. Saves, previews, failed builds and rollbacks are 0.
- The free plan has 300 credits a month as a hard limit; when they run out every site on the account is paused until the next cycle. At most 8 publishes a month (120 credits) keeps you safe with room for bandwidth, which costs 20 credits per GB.
- UNKNOWN until tested on your account: whether a skipped build costs credits, and whether Netlify's **Trigger deploy** honours the skip rule. Check Netlify **Usage** after your first week.

## 7. Things not yet proven (the acceptance test answers these)
- Whether Pages CMS lets you open and save on `content-edits` and shows the **Publish site** button there.
- Whether the Netlify branch preview appears for each Save, and how long it takes.
- Whether Netlify cancels or merges two builds started close together.
- The file name Pages CMS gives a new article (title or slug); nothing here depends on it.

## For the maintainer
- Workflows: `.github/workflows/publish-content.yml` (merge, check, push main with `[deploy]`), `.github/workflows/undo-last-publish.yml` (new commit that reverses the newest publish merge). Both run only by hand or from the Pages CMS button, only on `main`, with `contents: write` and no secrets or third-party actions. Tests: `src/test/publish-workflow.test.ts`.
- The release marker in the merge message must equal the one in `netlify.toml`; test: `bash scripts/check-netlify-ignore.sh`.
- Pages CMS `actions:` keys used are only those documented at https://pagescms.org/docs/configuration/actions/ (read 2026-11-19): `name`, `label`, `workflow`, `ref`, `cancelable`, `confirm`. Pages CMS sends a `payload` input; the workflow accepts and ignores it.
- To remove the whole route: delete the `actions:` block in `.pages.yml`, delete both workflow files, edit on `main`, and publish with the marker commit.
