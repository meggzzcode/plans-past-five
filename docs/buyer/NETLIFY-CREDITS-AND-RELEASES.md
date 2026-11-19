# Netlify credits and the publish workflow (buyer)

> **NOT YET TESTED WITH A REAL LOGIN.** The CMS is configured (`.pages.yml`) and the content checks are tested, but nobody has yet signed in to Pages CMS with the owner's GitHub login, edited a real article, or pressed Netlify's Trigger deploy on this site. Do not treat it as fully operational until `docs/buyer/CMS-TEST-PLAN.md` has been run and recorded as passed.

Status on 2026-11-19: a Netlify project exists on the seller's account as a test deploy (a `netlify.app` address; the main routes returned 200). It is not part of the handover; you create your own. Nothing was purchased.

## The cap (free plan)
Read from Netlify's own pages on 2026-11-19 (re-read live before relying on them; Netlify changes plans): https://www.netlify.com/pricing/ , https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/ and .../credit-based-pricing-plans/.

- **300 credits per month** on the free plan (Personal $9: 1,000; Pro $20: 3,000). The free plan has a hard limit and no auto recharge.
- **15 credits per successful production deploy.**
- **0 credits** for failed deploys, for rolling back to a previous production deploy, and for Deploy Previews and branch deploys (their traffic still counts as bandwidth).
- **20 credits per GB of bandwidth.**
- **When the credits run out, every project on the account is paused**: visitors see "Site not available" until the next cycle or an upgrade.
- UNKNOWN (the pages do not say; only a test on your account answers): whether a *skipped* build costs anything, and whether Trigger deploy honours the skip rule.

Worked example: 8 deploys use 120 credits, leaving 180 credits (about 9 GB of bandwidth). 20 deploys would use all 300 credits before any visitor downloads anything. That is why automatic deploy on every CMS save is unsafe on the free plan; see `docs/editorial-reset/PUBLISHING-WORKFLOW-RECOMMENDATION.md` for the options and the recommended one-button route.

## The one rule: Saved is not Published

| Word | What happened | Is it on the website? | Credits |
|---|---|---|---|
| **Saved** | You pressed Save in Pages CMS. The change is stored in GitHub. | **No.** Visitors see the old site. | 0 (the build is skipped; whether Netlify charges anything for a skipped build is not confirmed, check Usage after your first week) |
| **Published** | You pressed Netlify **Deploys > Trigger deploy > Deploy site**. Netlify checks the content and rebuilds. | **Yes**, after about 2 to 5 minutes. | 15 per publish |

You can save as many times as you like. Publish once when a batch of edits is ready.

Why: `netlify.toml` skips every build unless the newest commit message contains the release marker (the word deploy in square brackets), or you press Trigger deploy. Pages CMS saves do not add that marker. A commit-message template that added the marker would publish and spend 15 credits on every single save, so it is not used. Pages CMS does read its configuration per branch and has Actions buttons (pagescms.org docs, read 2026-11-19), so a branch plus Publish-button route is possible; it is proposed, not active, in `docs/editorial-reset/PUBLISHING-WORKFLOW-RECOMMENDATION.md`.

## How to publish (exact clicks)
1. Open Netlify, choose your site, then **Deploys**.
2. Click **Trigger deploy**, then **Deploy site**.
3. Wait for the top deploy to say **Published** (green). If it says **Failed**, nothing changed on the live site: open it and read the plain-English list of problems (see `docs/buyer/CMS-SETUP.md`), fix them in the CMS, Save, and trigger again.
4. **If the deploy says Skipped or "Canceled"** (not yet confirmed whether Trigger deploy ignores the skip rule; the CMS test checks this): use the backup method. On github.com open the file `RELEASES.md`, click the pencil, add a line, then in "Commit changes" write a message ending in the marker, for example `Release: new article [deploy]`, and commit to main.

## Preview before publishing
Netlify Deploys, open a deploy, **Preview** shows a build. For a pre-publish look at a draft, a draft is never on the website by design: publish with Status Published only when finished. To check an article live without telling anyone, publish it and check `/journal/<slug>`; to hide again see Unpublish below. (Netlify Deploy Previews of pull requests are on by default and branch deploys are off by default; both cost 0 credits and the `netlify.toml` rule no longer skips them. They become the preview step if the proposed route is approved.)

## Unpublish
In Pages CMS set the article's Status to **Draft**, Save, then Publish as above. The article is removed from the site and sitemap at that publish.

## Roll back
- Fast, no code: Netlify **Deploys**, click an earlier **Published** deploy, then **Publish deploy**. This restores that build instantly and costs 0 credits per Netlify's docs. Netlify then stops auto-publishing, so press **Auto publish** again afterwards.
- Permanent: undo the bad edit in GitHub history (GitHub **Commits** on main, open it, **...**, **Revert**, Create pull request, Merge), then Publish. Never force-push; the site is also connected to Lovable.

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
