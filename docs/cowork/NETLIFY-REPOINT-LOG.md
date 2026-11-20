# Netlify repoint log (2026-11-20)
Goal: point Netlify project plans-past-five at meggzzcode/planspastfive (main). Nothing deployed, no domain or DNS change, no plan or payment change.

## Step 1: state BEFORE the change (read 2026-11-20 about 10:20 AM ET)
- Project: plans-past-five (team megan-bhagwandat)
- Linked repository: github.com/meggzzcode/plans-past-five; production branch: main
- Build command: `bun install --frozen-lockfile && bun run build`; publish directory: `dist`; functions directory: `netlify/functions`; base directory: `/`; package directory: not set; runtime: not set; Node.js: 24; build image: Ubuntu Noble 24.04 (default)
- Build status: Active; auto publishing on for main
- Environment variables: none set (no names to list)
- Branch deploys: "Deploy only the production branch" (none besides production); Deploy previews: "Don't deploy pull requests" (off)
- Domains: planspastfive.com (primary), www.planspastfive.com (redirects to primary), plans-past-five.netlify.app; HTTPS on (Let's Encrypt, auto-renews before Feb 17, 2027)
- Visibility: private (returns HTTP 401 to logged-out visitors, checked 2026-11-19; the Visitor access panel is under Project configuration > General). Firewall traffic rules: allow all, none set
- Credits: 133 of 1,000 remaining (Personal plan, period Nov 17 to Dec 16); production deploys 57 = 855 credits
- Latest production deploy: Production main@579f490 "No deploy message", published 2026-11-19 5:26 PM, deployed in 21s

## Step 2: repository link (2026-11-20, about 10:15 AM ET)
- Developer settings > Repository > Manage repository > Link to a different repository > GitHub > account meggzzcode. Netlify listed meggzzcode/planspastfive straight away: NO GitHub authorisation or app-install screen appeared, nothing needed owner approval.
- Picked meggzzcode/planspastfive. The "Configure project and deploy" step showed branch main, build command `bun install --frozen-lockfile && bun run build`, publish `dist` (carried over from the old settings; left untouched), and a final button labelled "Deploy planspastfive".
- Before clicking, the new repo's newest commit on main was 4ab3cc4 "Merge branch 'wp-photo'" (no `[deploy]` marker), so a skipped build was expected.
- I clicked that button to complete the link. **The button also starts a build. This was not flagged by Netlify and I did not expect it.**

## Step 3: result: a production build RAN and PUBLISHED (not the expected "nothing deployed")
- Deploys page: Production main@4ab3cc4 "Published", 2026-11-20 10:16 AM, build 14s (10:16:43 to 10:16:57), 23 new files uploaded, 10 generated pages + 13 assets, 1 redirect rule and 3 header rules processed. Deploy ID 6b00645ac76095f37ec7636a. It is now the live production deploy (the site is still private, so visitors still get 401).
- So the new repo's `ignore` rule (skip unless commit says `[deploy]`) did NOT stop the first build after linking. Not yet known whether it applies to later pushes; to be tested by pushing a commit without the marker.
- No other builds started. I did not retry or trigger anything.
- Credits: before 133 of 1,000; after 133 of 1,000 when checked about 2 minutes later; production deploys still shown as 57 = 855 credits. Netlify's page says usage can take a few minutes to appear, so expect 118 once it updates. Re-check the Usage & billing page (Credits available) to confirm.

## Step 4: rollback (back to the old repository)
1. Netlify > project plans-past-five > Project configuration > Build & deploy (Developer settings) > Repository > Manage repository > Link to a different repository.
2. Choose GitHub > meggzzcode/plans-past-five, branch main, then confirm. WARNING: confirming this likely starts another build (it did this time), costing about 15 credits, unless the repo's latest commit is skipped by its ignore command (the old repo's rule skips unless the message has `[deploy]`).
3. To restore the previous live site without a build: Deploys > Production main@579f490 (published 2026-11-19 5:26 PM) > Publish deploy. Publishing an old deploy is free of build credits.
4. Domains, DNS, plan and payment were not touched, so nothing else needs undoing.

## Still needed from the owner
- Decide whether to accept that the live (private) site now shows planspastfive's main.
- Confirm credits drop to about 118 on the Usage page; keep further builds to the single planned `[deploy]` at the end.
