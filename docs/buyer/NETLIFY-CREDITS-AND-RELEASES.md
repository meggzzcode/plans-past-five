# Netlify credits and the publish workflow (buyer)

> **VERIFIED ACCOUNT FACTS (read from the owner's Netlify dashboard, 2026-11-19; source `docs/marketplace/final-inspection/NETLIFY-ACCOUNT-FACTS.md`).** The owner's account is on the **Personal plan, $9 a month**, with **1,000 credits a month** (not the free plan's 300). Period Nov 17 to Dec 16: 855 credits already used by 57 production deploys at 15 credits each, **135 credits left, about 9 more production deploys this period**, auto-recharge disabled. So 15 credits per deploy is confirmed; 1,000 credits is about 66 deploys in a normal month. Still NOT FOUND (needs the account): whether a skipped build costs credits, and what branch deploys or previews cost (both are currently switched off for this project). Where this page or others say 'free plan, 300 credits', read it as the conservative case a buyer on the free plan would face. The Netlify plan is a recurring cost of $108 a year for this setup and belongs in the operating-cost table. The buyer opens their own Netlify account; the owner's plan does not transfer.


> **NOT YET TESTED WITH A REAL LOGIN.** The CMS is configured (`.pages.yml`) and the content checks are tested, but nobody has yet signed in to Pages CMS with the owner's GitHub login, edited a real article, or pressed Publish site on this site. Do not treat it as fully operational until `docs/buyer/CMS-TEST-PLAN.md` has been run and recorded as passed.

Status on 2026-11-19: a Netlify project exists on the seller's account as a test deploy (a `netlify.app` address; the main routes returned 200). It is not part of the handover; you create your own. Nothing was purchased.

## The cap (free plan)
Read from Netlify's own pages on 2026-11-19 (re-read live before relying on them; Netlify changes plans): https://www.netlify.com/pricing/ , https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/ and .../credit-based-pricing-plans/.

- **300 credits per month** on the free plan (Personal $9: 1,000; Pro $20: 3,000). The free plan has a hard limit and no auto recharge.
- **15 credits per production deploy** (each successful one).
- **0 credits** for failed deploys, for rolling back to a previous production deploy, and for Deploy Previews and branch deploys (their traffic still counts as bandwidth).
- **20 credits per GB of bandwidth.**
- **When the credits run out, every project on the account is paused**: visitors see "Site not available" until the next cycle or an upgrade.
- UNKNOWN (the pages do not say; only a test on your account answers): whether a *skipped* build costs anything, and whether Trigger deploy honours the skip rule.

Worked example: 8 deploys use 120 credits, leaving 180 credits (about 9 GB of bandwidth). 20 deploys would use all 300 credits before any visitor downloads anything. That is why automatic deploy on every CMS save is unsafe on the free plan; the Publish site button (`docs/buyer/PUBLISH-AND-ROLLBACK.md`) spends 15 credits only when you press it. Options and sources: `docs/editorial-reset/PUBLISHING-WORKFLOW-RECOMMENDATION.md`.

## The one rule: Saved is not Published

| Word | What happened | Is it on the website? | Credits |
|---|---|---|---|
| **Saved** | You pressed Save in Pages CMS on the `content-edits` branch. The change is stored in GitHub. | **No.** Visitors see the old site. | 0 for the live site. Netlify builds a preview of the branch (0 credits per Netlify's docs). |
| **Published** | You pressed **Publish site** in Pages CMS. GitHub checks the content, merges `content-edits` into `main` with the release marker, and Netlify makes one production deploy. | **Yes**, after about 2 to 5 minutes. | 15 per publish |

You can save as many times as you like. Publish once when a batch of edits is ready. Whether Netlify charges anything for a *skipped* build is not confirmed: check Usage after your first week.

Why: `netlify.toml` skips every production build unless the newest commit message contains the release marker (the word deploy in square brackets). Pages CMS saves do not carry the marker; the merge commit made by the Publish workflow does, so exactly one production build happens per publish. Deploy Previews and branch deploys are never skipped by that rule (they cost 0 credits and are your preview). A commit-message template that added the marker to every save would spend 15 credits per save, so it is not used.

## How to publish (exact clicks)
Full guide: `docs/buyer/PUBLISH-AND-ROLLBACK.md`.
1. Pages CMS, branch `content-edits`, check the preview, click **Publish site**, **Publish now**.
2. Watch GitHub **Actions > Publish content** (green = merged) and Netlify **Deploys** (green **Published** = live). If red, read the message; the live site is unchanged.
3. Fallback only if the button cannot be used (edits saved on `main`): Netlify **Deploys**, **Trigger deploy**, **Deploy site**. Whether Trigger deploy honours the skip rule is UNKNOWN until the CMS test; if it says **Skipped**, edit `RELEASES.md` on github.com and end the commit message with the marker, for example `Release: new article [deploy]`.

## Preview before publishing
Netlify Deploys, filter **Branch deploys**, open the newest `content-edits` build, **Preview** (or `https://content-edits--<your-site>.netlify.app`). It needs the one-time setting Netlify Project configuration > Continuous deployment > Branches and deploy contexts > add `content-edits` (branch deploys are off by default, Netlify docs). A draft is never built into any copy of the site: set it to Published on the branch to preview it; nothing is live until you press Publish site.

## Unpublish
In Pages CMS set the article's Status to **Draft**, Save, then Publish site. The article is removed from the site and sitemap at that publish.

## Roll back
Steps in `docs/buyer/PUBLISH-AND-ROLLBACK.md`, section 5:
- Fast, no code: Netlify **Deploys**, click an earlier **Published** deploy, **Publish deploy** (0 credits per Netlify's docs). Netlify then stops auto-publishing, so turn auto publishing back on afterwards.
- Make GitHub agree: GitHub **Actions > Undo last publish > Run workflow**, then reset the `content-edits` branch. Never force-push `main`; the site is also connected to Lovable.

## Expected credits
| Editing pace | Publishes per month | Credits |
|---|---|---|
| 1 article a week, publish weekly | 4 | 60 |
| Recommended maximum | 8 | 120 |
| Publish after every save | 20 or more | 300+, site pauses |

Plus bandwidth at 20 credits per GB. **Recommended: at most 8 publishes a month.**

## Monthly check (2 minutes)
1. Netlify Billing/Usage: note credits used and the cycle reset date.
2. If you are over 60 percent before mid-month, stop publishing until the next cycle.

## If the site pauses
Upgrade, wait for the reset, or move the output elsewhere (`docs/buyer/HOSTING-AND-DEPLOYMENT.md`). Do not delete the project.
