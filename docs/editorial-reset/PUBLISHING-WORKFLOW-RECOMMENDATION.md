# Publishing workflow recommendation (Stage 2b / 2c)

Date: 2026-11-19. Status: RECOMMENDATION, owner-approved and INSTALLED in Stage 2c (`.github/workflows/publish-content.yml`, `undo-last-publish.yml`, `.pages.yml` `actions:`, `docs/buyer/PUBLISH-AND-ROLLBACK.md`, `docs/editorial-reset/changes/stage2c.md`); still NOT tested with real accounts. Nothing here has been run on a real GitHub, Pages CMS or Netlify account; the mandatory real-login test is described in `CMS-ACCEPTANCE-TEST-OWNER-ACTIONS.md`. No production publish was made.

## 1. What is known, with sources (all read 2026-11-19)

| Fact | Source |
|---|---|
| Netlify Free: $0, 300 credits a month. Personal $9, 1,000 credits. Pro $20, 3,000 credits. A production deploy is "15 credits each". | https://www.netlify.com/pricing/ |
| "each successful production deploy consumes 15 credits". "Failed deploys and rolling back a production deploy to a previous production deploy does not consume credits." | https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/ |
| Deploy Previews and branch deploys are listed at "0 credits" ("free deployments for previewing, experimenting"). Requests to them still count toward web request (bandwidth) usage. | same page, and https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/ |
| Free has a hard credit limit with no auto recharge. When credits are used up "all of your web projects are paused and visitors ... will find a `Site not available` page". Web bandwidth costs 20 credits per GB. | the two credit pages above |
| Deploy Previews are ON by default for pull requests from the connected repository. Branch deploys are OFF by default and are enabled per branch in Project configuration > Developer settings > Continuous deployment > Branches and deploy contexts. Previews send `X-Robots-Tag: noindex`. | https://docs.netlify.com/deploy/deploy-types/deploy-previews/ and https://docs.netlify.com/deploy/deploy-types/branch-deploys/ |
| The `ignore` command: exit 0 skips the build, exit 1 builds. "The `ignore` command won't cancel a build triggered by a build hook". | https://docs.netlify.com/build/configure-builds/ignore-builds/ |
| Pages CMS is free ("100% free", MIT licence), GitHub only, stores content in the repository (no database). Collaborators can be invited by email and need no GitHub account; their writes are authorised by the GitHub App. | https://pagescms.org/ and https://pagescms.org/docs/configuration/collaborators/ |
| Pages CMS reads `.pages.yml` "per repository and per branch". It has commit-message templates (`settings.commit`), and repository "Actions" buttons that dispatch a GitHub Actions workflow (`workflow_dispatch` with a `payload` input; `ref: current` runs it on the branch open in the CMS). | https://pagescms.org/docs/configuration/ , .../settings/ , .../actions/ |
| Pages CMS writes JSON as `JSON.stringify(object, null, 2)`: 2-space indent and NO trailing newline. | https://github.com/pages-cms/pages-cms (`lib/serialization.ts`, read 2026-11-19) |

UNKNOWN (only the owner's own accounts, or a real test, can answer):
1. Whether a skipped build (the current `ignore` rule) costs any credits. The credit pages say only successful production deploys cost credits, but do not mention skipped builds.
2. Whether Netlify's **Trigger deploy** button honours the `ignore` rule. The ignore page is silent (it says only that build hooks are not cancelled).
3. Which Netlify plan and which GitHub plan the owner or buyer is actually on, and whether the buyer already has a paid plan.
4. Whether the hosted Pages CMS app can be pointed at a non-default branch for a given account, and whether its Actions button works for the app as configured (docs describe it; nobody has pressed it here).
5. Whether the filename template `{primary}` in `.pages.yml` produces a file named after the title or the slug (the test suite no longer depends on it, see `changes/stage2b.md`).
6. Whether Netlify cancels or coalesces several queued builds from quick successive commits.

## 2. The options

| | A. Every CMS save on `main` deploys | B. CMS saves to a branch; one Publish button merges it | C. Today: saves are skipped, publish by marker commit or Trigger deploy |
|---|---|---|---|
| Credits | 15 per successful save-deploy. 20 saves a month is the whole free allowance; one afternoon of edits (say 10 saves) is 150. At the cap every page is replaced by "Site not available". | 15 per Publish, only when the owner presses it. Previews on the branch are 0 credits. | 15 per publish, if Trigger deploy works; unknown if skipped builds cost anything. |
| Preview before live | None. Each save of a published article is live in minutes. | Yes: the branch deploy URL shows the whole site with the edits, free. | None (a draft is never built). |
| Validation | At build; a failed build keeps the old site. Nothing earlier. | At build on the branch (preview fails visibly) and again in the Publish workflow before anything reaches `main`. | At build only. |
| Steps for the owner | 1 (Save). | 3 (Save, look at the preview link, press Publish). | 3 to 5, including a marker-commit fallback that is a second, obscure procedure. |
| Rollback | Netlify "Publish deploy" on an earlier deploy (0 credits) plus a GitHub revert. | Same, and the unpublished branch is untouched by a rollback of `main`. | Same. |
| Moving parts | None added. | A long-lived branch, one workflow file, one Pages CMS Action, one Netlify setting (branch deploys). All unverified until the acceptance test. | Existing marker rule; behaviour of Trigger deploy unknown. |
| Failure if it breaks | The free site goes dark at the cap. | The Publish button fails with a message; the live site is unaffected. Fallback: GitHub "merge branch" in the browser. | Edits sit unpublished and the owner cannot tell why. |

Option A is the simplest and is a good choice **only if** the owner is on a paid plan (UNKNOWN). On the free plan it is unsafe: the failure mode is the whole site going offline, caused by ordinary editing. That follows directly from verified facts (15 credits per deploy, 300 credit hard cap, pause at cap), not from an assumption.

Option C rests on two things nobody has verified (does Trigger deploy honour the rule, do skipped builds cost credits) and its fallback needs a marker commit, which is not something a non-coder will remember.

## 3. Recommendation (one publish path, one image path)

**Publish path: Option B.** Owners edit in Pages CMS on a branch called `content-edits`; the branch has a free Netlify preview; a single **Publish site** button in Pages CMS runs a GitHub Actions workflow that merges the branch into `main`, validates the content first, and lets Netlify build `main` (one production deploy, 15 credits). Saving never touches the live site and never costs credits.

**Image path: the Images form only.** Pages CMS Images, Add an entry: it uploads the photo to `public/uploads/` and writes the record `content/images/<name>.json` with the required alt text, source and licence. The build now refuses an uploaded photo with no source or licence (so the rights record cannot drift), and refuses missing files and short alt text. Do not upload loose files from the CMS Media tab, and do not drop photos into `src/assets/` (that route belongs to the existing 39 photos and the licence ledger the tests check). One path, one place the rights are recorded.

**Preview:** the Netlify branch deploy for `content-edits` (`https://content-edits--<site>.netlify.app`, noindex by Netlify, 0 credits). It is the whole site built from the branch, so a changed published article, picture or setting can be checked before anyone else sees it. A Draft is never built into any site by design, so a draft has no page to preview: finish it as a Draft, then switch it to Published on the branch, look at the preview, and only then press Publish.

**Validation:** `scripts/build-content.mjs` (settings, articles, images, integrity gate) runs on every branch preview build, in the Publish workflow before the merge, and on the production build. A bad edit fails with a plain-English list; live site untouched.

**Recovery (rollback):** (1) Netlify Deploys, an earlier Published deploy, Publish deploy: 0 credits, seconds. (2) Then undo the change in Git: GitHub Actions, Undo last publish (Stage 2c finding: GitHub's web page offers Revert only for merged pull requests, and the Publish merge is not one). (3) Reset the `content-edits` branch to `main` (delete it and re-create it from `main`, two clicks) so the reverted edits do not return. Never force-push `main`.

## 4. What to change, and what was changed

Changed now (safe, reversible, production behaviour identical):
- `netlify.toml` `ignore` rule: Deploy Previews and branch deploys are no longer skipped by the marker rule (they cost 0 credits and are the preview); production is unchanged (skipped unless the newest commit message contains the release marker; Trigger deploy behaviour still UNKNOWN). If `CONTEXT` were ever unset the rule falls back to the old production behaviour. Test: `bash scripts/check-netlify-ignore.sh` (now 9 cases). Restore: `git revert <commit>` or put the previous single-line rule back (see `changes/stage2b.md`).

Originally not changed pending approval (installed in Stage 2c; the copies in `docs/editorial-reset/proposed/` are superseded and kept for history):
- `publish-content.yml` (copy to `.github/workflows/`): the Publish workflow.
- The `actions:` block for `.pages.yml` (a Publish button), kept out of the live config because an invalid key could break the whole CMS form and cannot be tested without a login.
- Create the `content-edits` branch from `main`; enable branch deploys for it in Netlify; set the repository's Actions workflow permission to read and write; make sure `main` has no branch protection that blocks the workflow's push.
- Until the acceptance test passes and the owner approves, the documented publish method stays Trigger deploy with the marker-commit fallback, clearly labelled untested.

If the acceptance test shows Pages CMS cannot edit a non-default branch, or its Action button fails, fall back to **Option A on a paid Netlify plan** (Personal, $9 a month for 1,000 credits at time of reading) with edits made on `main`, or to option C unchanged. The decision does not depend on anything else in the codebase.

## 5. Cost summary for the buyer (re-read live before relying on it)
- Pages CMS: $0. GitHub (private repo) and Netlify Free: $0. Each publish: 15 of 300 free credits; previews: 0 credits plus bandwidth. A normal month of 4 publishes is 60 credits.
- Bandwidth is the other credit consumer (20 credits per GB). A site that grows past roughly 10 GB a month on the free plan exhausts it; the owner should check Netlify Usage monthly.
