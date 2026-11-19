# Hosting and deployment

**Configured host: Netlify.** `netlify.toml` is set up for Netlify (build command, `dist` publish folder, `NITRO_PRESET=netlify`, and the release-marker rule that skips every build unless the latest commit message contains `[deploy]`). The Netlify credit and release rules in these docs (`docs/buyer/NETLIFY-CREDITS-AND-RELEASES.md`) are written for it. **A first test deploy ran on the seller's own Netlify account on 2026-11-19** (a `netlify.app` address; the main routes returned 200 and a missing page returned the site's own 404). That project belongs to the seller and is **not part of the handover**: you create your own. What has NOT been verified: security headers on a live host, the real domain, whether Trigger deploy honours the skip rule, credit use over a month, and any non-Netlify host. The local build for the preset is `NITRO_PRESET=netlify bun run build` (writes `dist/` and a server function). Cloudflare, Vercel or any other host is an alternative that needs its own configuration and its own verification. Prices and plan limits change: re-read the provider's page before relying on any number (nothing is quoted here).

## What the current architecture needs

The site is **server-rendered (SSR)**. It is not a folder of static HTML files. A host must therefore provide:

- A **server runtime for the SSR function**. On Netlify the build writes static files to `dist/` plus a function to `.netlify/functions-internal`; both must deploy. A purely static host (a plain file server, GitHub Pages) cannot serve this build.
- A **build step**: `bun install --frozen-lockfile`, then `bun run build` (`vite build`; it first runs the content build, `node scripts/build-content.mjs`). The host must support Bun lockfile builds, or you must change the install command (re-read live). CI runs the same steps (`.github/workflows/ci.yml`).
- The **Nitro preset** chosen by environment variable: `NITRO_PRESET=netlify` (set in `netlify.toml`). The default preset with no variable targets a Cloudflare Worker and writes `.output/` with `server/wrangler.json`. Deploying `.output` is only right for the default preset.
- **No database, no secrets, no required environment variables** beyond the preset. `VITE_*` injection exists but nothing needs it; verify with a clean build in your environment.
- **HTTPS and a domain**, set in `src/config/site.ts` (`site.url`), `public/robots.txt` (`Sitemap:` line) and canonical tags, before search engines see the site (`docs/buyer/SEO-GUIDE.md`).
- **Headers**: `public/_headers` covers static assets on hosts that read it (Netlify does). Server-rendered HTML needs the same headers from server code or host config (`docs/buyer/SECURITY-AND-BACKUPS.md`).
- **Node 22** and **Bun** versions are not pinned in the repo; choose and record them in the host's settings.

## Options (honest status)

| Option | Status | What it needs |
| --- | --- | --- |
| **Netlify** | The configured host. Local preset build passes and one test deploy worked on the seller's account; headers, domain and the skip rule are unverified | Your own Netlify account, your GitHub copy connected, production branch set, domain and DNS. Free-plan credits and limits: re-read live. Whether the **Trigger deploy** button honours the `[deploy]` skip rule is untested (`docs/buyer/CMS-TEST-PLAN.md`) |
| Cloudflare Workers with static assets | Alternative. The default build targets it and a config is generated; **not deployed, runtime untested** | Your own Cloudflare account and project name (the generated name comes from the seller's Lovable project; set your own). Whether server rendering stays inside the free plan's per-request CPU limit is NOT TESTED; trial before relying on it |
| Other Node or edge hosts that run a Nitro server | Alternative; would need another Nitro preset and re-testing | A code or config change and a full re-test. Do not add duplicate Vite plugins (`vite.config.ts` notes) |
| Vercel | A Nitro preset exists and built in a scratch test, **not deployed**. **Do not treat the free Hobby plan as a suitable option for a monetised site:** whether Hobby allows commercial use was **NOT FOUND** in the pages read on 2026-11-19 | If you consider Vercel, read its Terms of Service and plan terms yourself first and expect to need a paid plan; this repo makes no claim either way |
| Lovable publishing | Not part of the package. The Lovable project is the seller's and its service agreement is not assignable | Do not plan on it (`docs/buyer/ACCOUNT-DEPENDENCIES.md`) |
| Static export | Not supported | The site relies on SSR; a static export would be a separate engineering task |

Do not pick a host from this table alone: compare current pricing and terms from each provider.

## Local verification before any deploy

```
bun run build
node scripts/serve-built.mjs 3000   # previews the default (.output) build
curl http://localhost:3000/
bun run health:links
```

To check the Netlify output: `NITRO_PRESET=netlify bun run build`, then confirm `dist/` and `.netlify/functions-internal/` exist. Do this in a copy, not over a build you rely on.

## Deploy checklist

1. Create your own host account with two-factor authentication.
2. Connect your GitHub copy (`docs/buyer/TRANSFER-CHECKLIST.md`).
3. Build command `bun install --frozen-lockfile && bun run build`, publish folder `dist`, preset `netlify` (already in `netlify.toml`).
4. Attach the domain and confirm HTTPS (`docs/buyer/DOMAIN-AND-EMAIL.md`).
5. Set `site.url` in `src/config/site.ts` to the final origin; update the `Sitemap:` line in `public/robots.txt`.
6. Verify headers with `curl -I https://yourdomain/` and `curl -I https://yourdomain/favicon.svg`.
7. Load `/`, an article, `/shop`, `/sitemap.xml`; run the site-health workflow once.
8. Add HSTS only after HTTPS is confirmed for the final domain.
9. Record the host, account owner and renewal terms in your own password manager (not the repo).

## Publishing model and credits (Netlify)

**Saved is not Published.** `netlify.toml` skips every build unless the newest commit message contains the release marker (the word deploy in square brackets) or you press Netlify **Deploys > Trigger deploy > Deploy site**. CMS saves carry no marker, so they wait until you publish. The credit cap, the cost per production deploy and the recommended limit of 8 deploys a month are in `docs/buyer/NETLIFY-CREDITS-AND-RELEASES.md` (re-read live). If Trigger deploy shows Skipped, edit `RELEASES.md` on GitHub with a commit message ending in the marker. Unpublish: Status Draft in the CMS, then publish. Roll back: Netlify Deploys, earlier deploy, Publish deploy. This workflow has **not been tested with a real login** (`docs/buyer/CMS-TEST-PLAN.md`). Check the rule locally with `bash scripts/check-netlify-ignore.sh`.

## Rollback and backups

Git is the backup (`docs/buyer/SECURITY-AND-BACKUPS.md`). In Netlify choose an earlier deploy and Publish deploy if a release breaks.

## Open items to check live

1. Does Netlify currently support a Bun lockfile build and the SSR function for this preset on the plan you choose, and with what limits? (Official docs, dated.)
2. If you prefer another host: which Nitro preset, and what free-plan limits and commercial-use terms apply? (Official docs, dated.)
