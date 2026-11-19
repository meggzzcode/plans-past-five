# Asset inventory

Status: DRAFT, 2026-11-19. Paths are relative to the repo root. Transfer method for repo files: sanitized archive or repo transfer per `docs/buyer/TRANSFER-CHECKLIST.md`. Re-check counts at listing time.

## Transferable assets

| Asset | Path | Status | Transfer method |
|---|---|---|---|
| Repository and git history | whole repo (branch claude/vibrant-dirac-amdf7r) | COMPLETED; secrets scan of history not yet run (NEEDS OWNER) | GitHub repo transfer or sanitized archive; scan history first |
| Application code | `src/`, `scripts/`, `.github/` | COMPLETED; 250 tests pass in 15 files (2026-11-19) | with repo |
| Brand assets (12 logos, 11 board covers, 4 social incl. OG, 4 article templates, 5 favicon, fonts and OFL licences, palette) | `design/brand` | COMPLETED | with repo |
| Published articles (27 `status: "published"`) | `src/content/article-*.ts`, registered in `src/content/index.ts` | COMPLETED on the branch; not deployed. 23 were source-checked by Cowork (2026-11-18; `docs/content/verification/`, `docs/content/verification-applied/`). The 4 originals (`article-35-hobbies.ts`, `article-after-work.ts`, `article-creative-home.ts`, `article-junk-journaling.ts`) are NOT source-checked yet (Cowork C4 still to do) | with repo |
| Draft articles (5 files plus 2 outline entries) | 5 `status: "draft"` files (how-to-start-air-dry-clay, how-to-start-crocheting, how-to-start-embroidery, watercolor-painting-for-beginners, affordable-hobbies-under-25) and `src/content/drafts.ts`; registered in `src/content/draft-registry.ts` | The 5 files were source-checked and left NOT READY; the 2 outlines are outline-only; not public | with repo |
| Research briefs (32), roadmap, editorial docs | `docs/content` | COMPLETED as written; Cowork keyword data PENDING | with repo |
| Hobby directory (36 hobbies) | `src/data/hobbies.ts` | COMPLETED | with repo |
| Product-type catalog (8 collections, 36 product types) | `src/data/products.ts` | COMPLETED | with repo |
| Verified product catalog | `src/data/catalog.ts`, `src/data/catalog.generated.ts` | 44 records: 37 verified, 7 candidate (never shown). Verified means the Amazon listing was opened and reviewed by Cowork (ordinary non-affiliate links); not tested by us. C3 continues toward about 60; manufacturer pages mostly unchecked | with repo |
| Kit slot definitions (15) | `src/data/kits.ts` | COMPLETED as system; 7 of 15 kits have at least one slot filled by a verified product, 8 have none (`docs/commerce/STARTER-KITS.md`) | with repo |
| Interactive tools (quiz, planner, budget, tonight) | `src/lib/finder.ts`, `planner.ts`, `budget.ts`, `tonight.ts`, `src/routes` | COMPLETED | with repo |
| Pinterest pins (88 images, manifest) | `public/pins`, `design/pins` | COMPLETED | with repo |
| Pins CSV and 90-day schedule | `docs/pinterest-pins.csv`, `docs/PINTEREST-90-DAY-SCHEDULE.md` | COMPLETED; start date is a placeholder | with repo |
| Site images (14 AI-generated) | `src/assets`, `docs/IMAGE-LICENSES.md` | COMPLETED; image-tool transfer terms PENDING COWORK (C10) | with repo; buyer should confirm terms |
| Documentation (160 Markdown files under docs, counted 2026-11-19; 25 buyer guides) | `docs/`, `CLAUDE-HANDOFF.md` | COMPLETED; some research PENDING COWORK | with repo |
| SEO research | `docs/content/briefs`, `docs/buyer/SEO-GUIDE.md` | PARTIAL: written briefs; keyword volume and competitor data PENDING COWORK (C1, C2) | with repo |
| Affiliate program register (candidates, unverified) | `src/data/affiliate-programs.ts` | IN PROGRESS (C5) | with repo |
| Marketplace package | `docs/marketplace` | DRAFT; C7 figures PENDING | with repo |
| CI, health and digest workflows | `.github/workflows` | COMPLETED | with repo |
| Domain | not recorded; `planspastfive.com` is a placeholder in `src/config/site.ts` | UNCONFIRMED (purchase and ownership not recorded) | registrar transfer only if the seller confirms ownership and agrees |

## Excluded or not existing

| Item | Status | Why |
|---|---|---|
| Seller's master or portfolio affiliate accounts, tracking IDs | EXCLUDED | Not transferable; buyer applies with their own account |
| Any affiliate approval for this site | DOES NOT EXIST | No application made |
| Payment and tax accounts | EXCLUDED or DOES NOT EXIST | Buyer's own |
| Hosting account | DOES NOT EXIST | Host not chosen |
| Mailbox and email | DOES NOT EXIST / EXCLUDED | Contact email empty; seller's mailbox excluded |
| Lovable project, credits | EXCLUDED | Belongs to the seller's account |
| Analytics, Search Console, Bing | DOES NOT EXIST | IDs empty in `site.ts` |
| Pinterest and social accounts | DOES NOT EXIST | Handles empty |
| Newsletter list | DOES NOT EXIST | Newsletter disabled |
| Credentials, password manager, seller's other sites and tools | EXCLUDED | Personal |
| Build output `.output` | EXCLUDED | Carries seller project labels; buyer rebuilds |
| Traffic, revenue and ranking history | DOES NOT EXIST | Pre-revenue |

## Accounts summary

Transfer: none by default. Buyer creates: host, domain registrar (unless domain transfers), mailbox, GitHub (receives repo), analytics, Search Console, Bing, Pinterest, affiliate programs. See `docs/buyer/ACCOUNT-DEPENDENCIES.md`.
