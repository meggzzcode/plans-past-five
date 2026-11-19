# Netlify first deploy log (2026-11-19)

Project: plans-past-five, URL https://plans-past-five.netlify.app, team "Megan Bhagwandat's team". No purchase, no plan change, no domain action, no CMS configured.

## Setup
- Imported github.com/meggzzcode/plans-past-five as a NEW Netlify project (the paws-passage site was not touched).
- **Deviation from the prompt:** production branch is `claude/vibrant-dirac-amdf7r`, not `main`. `netlify.toml` exists only on that branch (it is 5 commits ahead of `main`); on `main`, Netlify detected `bun run build` + `dist/client`, which ignores the Netlify preset. Owner chose this branch in chat. When the branch is merged into `main`, change Project configuration > Developer settings > Branches and deploy contexts > Production branch back to `main`.
- Settings applied from `netlify.toml`: build `bun install --frozen-lockfile && bun run build`, publish `dist`, Node 24, Ubuntu Noble 24.04. No environment variables were added.

## First deploy
- Published `claude/vibrant-dirac-amdf7r@9fd30f8` in 18 s. No failure, so no build-log excerpt is needed.
- Three more production deploys ran within about 3 minutes (e7759b4, 6f87ad2, c5f992f) because other agents pushed WIP commits to the same branch. Each push to the production branch triggers a deploy (the `ignore` rule only skips commits that change nothing under src, public, package.json, bun.lock, vite.config.ts, tsconfig.json or netlify.toml; these commits did change them).

## Route checks (browser, logged in; HTTP status from the browser network log)
| Path | Result |
|---|---|
| / | PASS, page title "Plans Past Five: Making a life, not just a living." |
| /hobby-finder | PASS 200 |
| /make-plans | PASS 200 |
| /shop | PASS 200 |
| /journal/how-to-start-a-book-club | PASS 200 |
| /sitemap.xml | PASS 200 |
| /robots.txt | PASS 200 |
| /no-such-page-xyz | PASS: status 404 with our own 404 page ("This page clocked out early.") |

Content of sitemap.xml and robots.txt was not read, only the status.

## Security headers
NOT VERIFIED on the live site. The browser tools in this session do not expose response headers and JavaScript was blocked on the netlify.app domain. The repo's `public/_headers` sets X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin and Permissions-Policy (camera, microphone, geolocation, payment, usb all off). Check in browser dev tools, Network tab, home page, Response Headers.

## Access
The site returns HTTP 401 to anyone not logged in to Netlify (checked from outside, 2026-11-19): Netlify announced that new projects are private by default. It was not changed. Make it public only when the owner decides (and before sharing links or submitting a sitemap).

## Settings
- Branch deploys: "Deploy only the production branch" (already).
- Deploy Previews: was "Any pull request against your production branch"; changed to "Don't deploy pull requests" and saved (reversible in the same place).

## Pricing facts (netlify.com/pricing, read 2026-11-19)
- Free plan: 300 credit limit per month; credits cover production deploys, compute, forms, bandwidth and web requests. The site pauses at the limit until the next billing cycle.
- Cost per production deploy: not stated for Free; the page's calculator defaults to 15 credits. At that rate 20 deploys use the whole month. Four deploys in the first three minutes could already be 60 credits (not confirmed in the usage page).
- Failed builds: cost not stated on the pricing page. NOT FOUND.
- Deploy previews: listed as unlimited on Free.

## Open for the owner
1. Domain (not started, per rule): owner has not confirmed that a domain is owned. planspastfive.com is unregistered per docs/NAME-CHECK-planspastfive.md.
2. Decide whether the site should be public.
3. Frequent WIP pushes will burn credits; consider pausing auto-publishing ("Lock to stop auto publishing") while agents are editing, or pointing production at a branch that changes rarely.

## Update 11:05 ET: builds stopped
To stop the credit drain, Build status was set to **Stopped builds** (Developer settings > Build settings). Netlify will not build or deploy on pushes until it is set back to Active, and a stopped project cannot be built from the dashboard: publish with the Netlify CLI/API, or switch to Active, push once, then stop again. Last published deploy: claude/vibrant-dirac-amdf7r@6f87ad2 or later (check Deploys). Better long-term fix: make production a rarely-updated branch (for example `release`) so WIP pushes on the working branch never deploy.
