# Cowork prompt: set up Netlify hosting for Plans Past Five

Paste everything below the line into Cowork.

---

You are helping set up hosting for the website in GitHub repo meggzzcode/plans-past-five (branch `main`) on Netlify, using the owner's logged-in browser. You work in the browser only; do not edit code (Claude Code does that).

**Ground rules.** Do not purchase anything, enter payment or card details, change the Netlify plan, accept an agreement, buy or transfer a domain, or change DNS at a registrar without the owner confirming in chat. Stop at any login, CAPTCHA or two-factor prompt and ask the owner. Never write passwords, tokens or keys in any file or chat. If a step is ambiguous or costs money, stop and report.

**Background.** The site is a server-rendered TanStack Start app. The repo contains `netlify.toml` which sets `NITRO_PRESET=netlify`, build command `bun install --frozen-lockfile && bun run build`, publish directory `dist` (the server-rendering function is generated in `.netlify/functions-internal`). I verified this build locally. Netlify's free plan has a monthly credit allowance and a production deploy costs credits, so the repo skips deploys when only docs or tests change. The owner already has a Netlify account used for another site (paws-passage); do NOT touch that site.

**Tasks**
1. In Netlify, create a NEW project (not a copy of the other one) by importing the GitHub repo meggzzcode/plans-past-five. Production branch: `main`. Name it `plans-past-five` (or the closest available). Accept the detected settings only if they match `netlify.toml` (build command, publish dir `dist`); do not override environment variables except if the build fails because `NITRO_PRESET` is missing, in which case add `NITRO_PRESET=netlify` in Site configuration, Environment variables, and tell me.
2. Trigger the first deploy. If it fails, copy the last 40 lines of the build log (no secrets) into docs/cowork/NETLIFY-FIRST-DEPLOY-LOG.md and tell me exactly which step failed (bun not found, wrong Node version, missing preset, function size, etc.). Do not try random fixes.
3. When it succeeds, open the temporary `*.netlify.app` URL and check: home page, `/hobby-finder`, `/make-plans`, `/shop`, one article under `/journal/...`, `/sitemap.xml`, `/robots.txt` and a made-up URL (should show our 404 page). Also check response headers with browser dev tools on the home page (Network tab): `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`. Record pass or fail for each in docs/cowork/NETLIFY-FIRST-DEPLOY-LOG.md.
4. Read Netlify's current pricing page and Site configuration, Build and deploy pages and record: free-plan credit allowance, cost per production deploy, whether deploy previews and branch deploys are on (turn OFF branch deploys and deploy previews if the setting is visible and free to change, then tell me), and whether a failed build costs credits. Dated facts only.
5. Domain (STOP and ask the owner first): record the domain the owner chose (planspastfive.com is a placeholder and its purchase is not confirmed). Do not buy it. If the owner already owns it, read Netlify's current steps for adding a custom domain and for external DNS, list the exact DNS records Netlify asks for, and give them to the owner to enter at the registrar. After DNS propagates, confirm https works and the www or apex redirect is correct.
6. Report: the Netlify site URL, whether the first deploy passed, header and route check results, credit facts with dates, anything that needs the owner, and every file you wrote. Never include tokens.

**About the content editor (CMS).** Netlify only hosts and rebuilds the site. A browser-based editor is separate (for example Pages CMS, free, which edits the GitHub repo directly and triggers a Netlify deploy on each save). There is NO editor set up for this site yet, so do not configure one. Just note in your report whether Netlify's free plan has any limits that frequent content edits (many small commits) would hit, given the credit cost per deploy.
