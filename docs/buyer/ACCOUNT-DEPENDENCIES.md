# Account dependencies

Every account or service the site, its content or its marketing could touch. "Transferable" means the seller can hand the same account to a buyer. As of 2026-11-19 the repo confirms **no** active third-party account for this site except the code repository and the Lovable connection described in `AGENTS.md`. Everything else is UNCONFIRMED. Where a provider's rule is not read from an official page, it is marked PENDING COWORK.

| Account or service | Role | Evidence in repo | Transferable? | Buyer action |
|---|---|---|---|---|
| GitHub repository | Code, content, history, CI | `.github/workflows` | Repository transfer or copy is possible; account is not | Receive repo into your own account (`docs/buyer/TRANSFER-CHECKLIST.md`); check Actions secrets are not carried over |
| Lovable project | Editor and sync of commits | `AGENTS.md`, `README.md` (project id in README link) | PENDING COWORK: check Lovable's terms for project transfer | Decide whether to keep using it; otherwise work in git directly. Avoid rewriting pushed history while connected |
| Hosting | Runs the site | none (not chosen) | n/a | Create your own (`docs/buyer/HOSTING-AND-DEPLOYMENT.md`) |
| Domain registrar | Domain | `site.url` placeholder only | Domains can usually be transferred between registrars; rules vary (PENDING COWORK) | Obtain registrar proof first; register or transfer in your name |
| DNS | Points domain to host | none | Part of registrar or host | Re-create records under your account |
| Email mailbox | hello@ | `contactEmail` empty | Mailboxes are typically not transferred; create new | `docs/buyer/DOMAIN-AND-EMAIL.md` |
| Amazon Associates | Affiliate income | `src/config/affiliate.ts` ships blank | **Not transferable.** Buyer applies with own account; approval not guaranteed | `docs/buyer/AFFILIATE-SETUP.md` |
| Other affiliate networks | Optional | `src/data/affiliate-programs.ts` (candidates only, unverified) | Not transferable (verify each: PENDING COWORK) | Apply in your own name |
| Google Analytics and Search Console | Measurement, indexing | IDs empty in `site.ts` | Property ownership could be shared, but buyer should create own and start clean | Create new properties; replace any IDs |
| Bing Webmaster Tools | Optional | none | n/a | Create own |
| Pinterest | Distribution | `site.social.pinterest` empty; pin assets only | Account transfer rules: PENDING COWORK | Create own business account; use `public/pins` and `docs/pinterest-pins.csv` |
| Instagram, TikTok | Optional | `site.social` empty | Not created | Create own if wanted |
| Newsletter provider | Optional | disabled in `site.ts` | No list exists | Create own; update privacy first |
| Image tools and licenses | Assets | `docs/IMAGE-LICENSES.md` (images generated with Lovable's AI image tool, stored in `src/assets`) | License terms transfer is PENDING COWORK to confirm against the tool's terms | Review `docs/buyer/IMAGE-AND-ASSET-RIGHTS.md` (other worker) before relying on it |
| Fonts | Typography | Google Fonts (OFL per `docs/BRAND-GUIDE.md`) | Open license | Self-host if preferred |
| Canva or design files | Pin sources | Sources live in `design/` | Not account-based | None |
| Password manager | Holds credentials | n/a | n/a | Buyer's own |
| Seller's other affiliate portfolio | Seller's other sites | none in repo | Must stay separate | Seller removes this site from it (`docs/buyer/TRANSFER-CHECKLIST.md`) |

## Rules

- Nothing shared with any other site: no shared analytics, tags, tracking IDs, mailboxes or repos (`docs/TURNKEY-PLAN.md`: never copy another site's IDs).
- No secrets live in the repo (`docs/buyer/SECURITY-AND-BACKUPS.md`). Credentials are handed over only through the buyer's secure channel, never in git or chat.
