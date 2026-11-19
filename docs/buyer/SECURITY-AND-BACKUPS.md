# Security and backups

## What the site is
A TanStack Start app with no database, accounts, payments or server secrets (it does run a server-rendering function on the host; see `docs/buyer/HOSTING-AND-DEPLOYMENT.md`). Saved items live in each visitor's browser (`src/lib/saved.ts`). Checked 2026-11-19: no API keys, tokens or credentials are committed in the repo (pattern scan of source, config and docs; no `.env` files tracked). Keep it that way: never put secret values in the repo; analytics IDs and verification codes are public by design.

## Security headers
`public/_headers` sets `X-Content-Type-Options`, `Referrer-Policy` and `Permissions-Policy`. Netlify is the configured host (nothing is deployed yet); this file is read by hosts that support `_headers` (Netlify, Cloudflare Pages) and is ignored elsewhere.
Server-rendered HTML pages get the same three headers from server code: `src/server.ts` wraps the SSR entry and applies `src/lib/security-headers.ts` to every HTML response (including the error page). No CSP is enforced, and HSTS and `X-Frame-Options` are intentionally not set because the Lovable editor previews the site in an iframe; add HSTS at the host once the domain is final. Verify on the live host with `curl -I https://yourdomain/` and `curl -I https://yourdomain/favicon.svg`.
Deliberately not set:
- **Strict-Transport-Security**: add `Strict-Transport-Security: max-age=31536000` only after the host confirms HTTPS works for the final domain (do not add `preload` casually).
- **X-Frame-Options / frame-ancestors**: the Lovable editor previews the site in an iframe.
- **Content-Security-Policy**: not enforced. Fonts load from Google Fonts and Lovable tooling injects scripts, so an enforced policy could break pages.

### CSP report-only draft (try first, do not enforce blindly)
```
Content-Security-Policy-Report-Only: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; base-uri 'self'; form-action 'self'; object-src 'none'
```
Add it as a header on the host, browse every page with the console open, fix violations, and only then consider enforcing. Add analytics domains to the draft when analytics is enabled.

## Backups
- The git repository (GitHub, synced with Lovable) is the backup of all code, content and data. Do not rewrite published history.
- Turn on two-factor authentication for GitHub, the domain registrar, the host and any affiliate account.
- Keep a copy of: registrar login, DNS records, host project, affiliate account details, and `docs/` in the owner's password manager. Never in the repo.
- Recovery: clone the repo, `bun install --frozen-lockfile`, build with the host's preset (Netlify: `NITRO_PRESET=netlify bun run build`, deploy `dist` plus the generated function; the default build writes `.output` for Cloudflare-style hosts), deploy.
- No user data exists to back up. If you later add forms or collect any visitor data, document where it lives and update the privacy page first.

## Dependencies
Dependabot (`.github/dependabot.yml`) opens grouped weekly pull requests; CI (`.github/workflows/ci.yml`) runs tests, typecheck and build on each. Merge only when green.

## Legal note
The Privacy and Terms pages are starter text, not legal advice. The owner should have a lawyer review them before launch and again before enabling analytics or affiliate links.
