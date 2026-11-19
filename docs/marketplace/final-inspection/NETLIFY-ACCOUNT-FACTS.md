# Netlify account facts (read from the logged-in dashboard, 2026-11-19, about 5:30 PM ET)
Source pages: app.netlify.com/teams/megan-bhagwandat/billing/general (Usage & billing), the project's Deploys page and Developer settings. Read only; the changes listed under "Changes made this session" were made at the owner's request in chat.

## Plan and credits (VERIFIED)
- Plan: **Personal, $9.00 a month**, effective Nov 17, 2026 (paid invoice Nov 16, 5:19 PM). 1,000 credits a month, smart secret detection, 7-day analytics, priority email support. Payment method on file (card ending 6964; no other card detail recorded).
- Billing period: Nov 17 to Dec 16. **135 of 1,000 credits remaining**, expiring Dec 16, 2026. Auto recharge: disabled. Concurrent builds: 1.
- Credit use this period: production deploys 57 = 855 credits (**15 credits per production deploy**, as shown), web requests 19,906 = 4, compute 1.4, bandwidth 8.3, AI inference 0. Total 868.7.
- At 15 credits per deploy, 135 credits is about 9 more production deploys this period.

## Cost questions
- Skipped build (commit without the [deploy] marker): cost NOT FOUND on the usage page. The build log shows the site's ignore command runs before the build; whether that run is billed was not displayed.
- Deploy previews and branch deploys: both are OFF in this project's settings, so none are produced. Their cost NOT FOUND.

## Site status
- Project plans-past-five, custom domain planspastfive.com. **Private**: returns HTTP 401 to anyone not logged in to Netlify (checked 2026-11-19). The owner decided to keep it private for now.
- Not paused.

## Configuration (Developer settings)
- Repository: github.com/meggzzcode/plans-past-five. Build command `bun install --frozen-lockfile && bun run build`; publish directory `dist`; functions directory `netlify/functions`; Node 24.
- Branch deploys: production branch only. Deploy previews: none.
- Build status: **Active** (was Stopped until this afternoon).
- Production branch: **main** (was claude/vibrant-dirac-amdf7r until this afternoon).
- Builds from main run only when the latest commit message contains `[deploy]` (the custom ignore command in the build log).

## Changes made this session (owner-requested)
1. Production branch changed from claude/vibrant-dirac-amdf7r to main.
2. Build status changed from Stopped to Active.
3. One production deploy triggered from main at 5:26 PM (published, build 22 seconds, 101 files uploaded).
The owner said earlier to hold off on making the site public; no access setting was changed.

## Owner decisions
- 135 credits is a thin margin. Batch edits into few `[deploy]` commits, or buy credits, before the month ends.
- Site stays private until the owner decides; affiliate links and pins cannot work for the public until then.
