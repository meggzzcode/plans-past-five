# CMS login and publishing acceptance test: what the owner must do

Status 2026-11-19: **MANDATORY and NOT YET DONE.** Nobody has signed in to Pages CMS with a real GitHub login, saved a real edit, pressed a publish control or seen a Netlify build of this site from a CMS save. Until every row in `docs/buyer/CMS-TEST-PLAN.md` is recorded as PASS, the buyer-facing claim "edit and publish in a browser" must stay labelled UNTESTED. Do not remove the banner early. No production publishing is part of this test.

## 1. Why the owner is needed
Only the account holders can sign in to GitHub, Pages CMS and Netlify. An assistant (Cowork or Claude) can drive a browser the owner has signed in to, but cannot create the accounts, approve the GitHub App install, or accept Netlify's terms.

## 2. Accounts and permissions needed
| Account | What the tester needs | Why |
|---|---|---|
| GitHub (owner's own) | Owner or admin rights on a **throwaway private repository** copy of this project (name it `ppf-cms-test`). Admin is needed to install the Pages CMS GitHub App on that one repository and to change Settings > Actions > General > Workflow permissions to "Read and write". | Pages CMS signs in with GitHub and writes commits through its GitHub App. The publish workflow pushes with the built-in token. |
| Pages CMS (https://pagescms.org, free) | Sign in with that GitHub account; install the app for the test repository only (not "all repositories"). | The editor under test. |
| Netlify (owner's own, free plan) | Permission to create a **new throwaway site** from `ppf-cms-test` (a `*.netlify.app` address only), set the production branch, and under Project configuration > Developer settings > Continuous deployment > Branches and deploy contexts enable branch deploys for `content-edits`. | The host under test. Free plan is enough: budget about 6 production deploys = 90 of 300 credits; previews cost 0. |
| A second email address | One address that has **no GitHub account**, to be invited as a Pages CMS collaborator by email. | Verifies the "editor without GitHub" route that the docs describe (https://pagescms.org/docs/configuration/collaborators/). |

Not needed and not to be used: the production repository, the real domain, any DNS change, any payment method, any Amazon Associates account, any analytics account.

## 3. A safe test environment (no production impact)
1. On GitHub create a new **private** repository `ppf-cms-test` by copying the project (download the release or push a clone; do not fork into the production repo's network). Confirm Actions is enabled.
2. Netlify: Add new project from `ppf-cms-test`. Leave the build settings as `netlify.toml` provides. Use the generated `*.netlify.app` address. Turn on password protection or delete the site after the test so fake content is not public. Do not add a custom domain.
3. Settings in the test copy use fake values only: contact email `test@example.invalid`, tracking ID `testsite-20` (fake, never submitted to Amazon), GA4 empty.
4. For the publish-button part only: copy `docs/editorial-reset/proposed/publish-content.yml` to `.github/workflows/` **in the test repository**, create branch `content-edits` from `main`, add the `actions:` block from `docs/editorial-reset/proposed/pages-yml-publish-action.md` to the test repository's `.pages.yml`.
5. When finished, delete the Netlify site and the test repository. Revoke the Pages CMS app on it.

## 4. Test steps (record PASS or FAIL for each in `docs/cowork/CMS-LIVE-TEST-LOG.md`, with screenshots)
Part A: the editor (maps to `docs/buyer/CMS-TEST-PLAN.md` rows 1 to 6, 12 to 14)
1. Sign in with GitHub, add the project, open `main`. Expect forms: Articles, Images, **Site settings**. Note any `.pages.yml` error text exactly.
2. Site settings: change the site name, press Save. In GitHub open the commit and `content/settings.json`. Record: 2-space indent, no trailing newline, keys kept, booleans as true/false (not "true").
3. Site settings: type `UA-1234` in the Google Analytics field and Save. Run the Netlify build (or open the branch preview). Expect: build **fails** with `not a Google Analytics 4 measurement ID`; live site unchanged. Fix and Save.
4. Images: add an entry with a small JPG and **no alt text**: expect the form to refuse. Add alt, source and licence: expect the photo in `public/uploads/` and a record in `content/images/`. Leave source empty once: expect the build to refuse with `needs "Where it came from"`.
5. Articles: create a Draft article, then open an existing published article and Save with no change. Diff on GitHub: no fields lost, no empty keys added. Record the **file name** Pages CMS gave the new article (title or slug).
6. Break it on purpose (source URL without `https://`): expect a failed build with the file and field named. Then set a linked article to Draft: expect the integrity message listing every page that still links to it.
7. Invite the second email as a collaborator. Sign in as that person without GitHub. Expect them to edit an article and Save.

Part B: publishing (maps to rows 7 to 11, 15, 16, plus the new options)
8. Current method: after a Save on `main`, check Netlify Deploys: record whether the build was **Skipped**. Press **Trigger deploy > Deploy site**: record whether it ran or was Skipped (UNKNOWN 2 in the recommendation). If skipped, edit `RELEASES.md` on GitHub with a message ending `[deploy]` and record that it builds.
9. Netlify Usage: after steps 3 to 8, record credits used. Does a **skipped** build cost credits (UNKNOWN 1)? Does a failed build?
10. Recommended method, on the test repository only: open the CMS on branch `content-edits`; save an article edit; open `https://content-edits--<site>.netlify.app`. Expect a preview build with 0 credits and the edit visible.
11. Press **Publish site** in the CMS. Expect the GitHub Actions run to merge, validate and push; Netlify then makes one production deploy; the edit is live. Record the time from press to live, and credits used (expect 15).
12. Make the validation fail on the branch (broken source URL) and press **Publish site**: expect the run to fail with the plain-English message and `main` to stay unchanged.
13. Rollback: Netlify Deploys, an earlier deploy, Publish deploy; confirm the site reverts and the credit meter does not move. Then on GitHub revert the publish merge commit; delete and re-create `content-edits` from `main`.
14. Record the file-name question (step 5), whether the branch picker and the Publish button worked, and whether a non-default branch is editable.

## 5. Pass rule and what happens next
- Part A rows all PASS: the "edit in a browser" claim can be made for articles, images and settings.
- Part B step 8 decides the fallback; steps 10 to 13 decide whether the Publish-button workflow becomes the documented publish path (then move the proposed files into the real repository with the owner's approval). If any of 10 to 13 fails, keep the documented marker/Trigger-deploy method and record the failure, or move to Option A on a paid plan (see `PUBLISHING-WORKFLOW-RECOMMENDATION.md`).
- Only then update the four banners in `docs/buyer/` (CMS-SETUP, CMS-TEST-PLAN, EDITING-WITHOUT-CODE, NETLIFY-CREDITS-AND-RELEASES).
- Time estimate (UNKNOWN until done): 2 to 3 hours with the owner present.
