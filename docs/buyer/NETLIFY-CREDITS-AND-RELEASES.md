# Netlify credits and the release budget (buyer)

Status on 2026-11-19: a Netlify project exists on the seller's account for testing (`docs/cowork/NETLIFY-FIRST-DEPLOY-LOG.md`). It is not part of the handover; you create your own. Nothing was purchased.

## The cap (free plan)
As recorded for this project (figures recorded for this project on 2026-11-19; no copy of the page was saved. Official pages: https://www.netlify.com/pricing/ and Netlify's billing docs: **re-read live before relying on them**, Netlify changes plans):

- **300 credits per month** on the free plan.
- **15 credits per production deploy.**
- **20 credits per GB of bandwidth.**
- **When the credits run out, the site pauses** until the next cycle (or until you upgrade). A paused site is an offline site.

Worked example: 8 deploys use 120 credits, leaving 180 credits, about 9 GB of bandwidth. 20 deploys would use all 300 credits before a single visitor downloads anything. The file `netlify.toml` says "about 20 production deploys a month"; that ceiling ignores bandwidth, so treat it as an upper bound only.

## Recommended release budget
**At most 8 production deploys a month.** Batch edits into one release.

## The release marker rule
`netlify.toml` skips every build unless the latest commit message contains the marker `[deploy]`. So:

- Ordinary commits and pushes (including CMS saves) do not build and cost no credits.
- To publish: `git commit --allow-empty -m "Release: what changed [deploy]"` and push to the production branch.
- Put the marker on the last commit only. Check the deploy list before and after.
- Branch and preview deploys can also use credits: keep them off unless you need them (re-read live: this depends on your Netlify settings).

## Monthly check (2 minutes)
1. Open Netlify, Billing/Usage: note credits used and the cycle reset date.
2. If you are over 60 percent before mid-month, stop releasing until the next cycle.
3. Log the number in your own notes. Do not write it on the public site.

## If the site pauses
Upgrade the plan, wait for the reset, or move the static output to another host (`docs/buyer/HOSTING-AND-DEPLOYMENT.md`). Do not delete the project: that loses the deploy history.
