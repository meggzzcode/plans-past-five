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
