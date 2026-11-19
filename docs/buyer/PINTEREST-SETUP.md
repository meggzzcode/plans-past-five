# Pinterest setup (buyer instructions)

Status: NEEDS OWNER. No Pinterest account was created, logged into or modified for this project; the build environment cannot and must not do that. Everything below is a checklist for the new owner (or for Cowork working inside the owner's own logged-in browser). Pinterest changes its menus and policies often; where a step says "check", confirm in Pinterest's current Help Center before acting.

What is already done in this repo:

- 95 vertical pins (1000x1500) in `public/pins/`, built from 8 template styles (`design/pins/`, rebuild with `node scripts/build-pins.mjs`).
- `docs/pinterest-pins.csv`: title, description, destination, tracked URL (UTM), board, keywords, concept, publish status, suggested date.
- `docs/PINTEREST-90-DAY-SCHEDULE.md`: day-by-day plan.
- 12 board cover images in `design/brand/exports/board-covers/`, profile avatar `design/brand/exports/social/profile-avatar-1000.png`.
- Article pages include a Pinterest share button (`src/components/editorial/ShareButtons.tsx`); no Pinterest tag, analytics or account ID is wired in the code.

## Prerequisites (owner)

1. The site is live on its real domain and `site.url` in `src/config/site.ts` matches it. At the time of writing `site.url` is `https://planspastfive.com` with the comment "update after the domain is connected": confirm the owner actually controls that domain. Pin links and canonicals must use the real domain. Replace `{SITE_URL}` in the CSV with it (find and replace).
2. A brand email address (see the contact details placeholders in `src/config/site.ts`) to own the account.
3. Access to DNS or to the site's `<head>` for claiming the domain.

## 1. Create a business account

1. Go to Pinterest and choose **Create a business account** (or convert a personal account under Settings, Account management). Use the brand email, not a personal one.
2. Business name: **Plans Past Five**. Username: choose the closest available match to the brand name, record it, then set the handle in `site.social` (`src/config/site.ts`).
3. Profile photo: `design/brand/exports/social/profile-avatar-1000.png` (cherry square with the italic 5; Pinterest crops to a circle).
4. About text (suggested; edit to taste): "Hobbies, plans and small adventures for your life outside work. Making a life, not just a living."
5. Country and language, then accept the Business Terms of Service (owner only).
6. Do not buy followers, join engagement pods or follow-for-follow groups.

## 2. Claim the website

Claiming connects your domain to the profile and unlocks analytics for your pins.

1. In Pinterest: Settings, **Claimed accounts**, claim your website, enter the domain.
2. Pinterest offers three methods. In order of ease for this project:
   - **HTML tag:** copy the `<meta name="p:domain_verify" content="...">` tag Pinterest gives you and add it to the site `<head>`. In this repo that is `src/routes/__root.tsx` (head meta). Redeploy, then press Verify.
   - **DNS TXT record:** add the TXT record at your registrar/DNS host. No code change.
   - **HTML file upload:** place the file in `public/` and redeploy.
3. Use the exact domain (with or without `www`) that your canonical URLs use.
4. Cowork can do the Verify step in the owner's logged-in session; only the owner can accept terms or enter billing details.

## 3. Create the 12 boards

Create these boards exactly (they are what the CSV references). Use the matching cover from `design/brand/exports/board-covers/`.

| Board | Cover file | Suggested board description (edit freely) |
|---|---|---|
| Plans Past Five | `plans-past-five.png` | Hobbies, plans and small adventures for your life outside work. |
| After Work Activities | `after-work-activities.png` | Things to do after work instead of scrolling. |
| Creative Hobbies for Beginners | `creative-hobbies-for-beginners.png` | Paint, clay, thread and paper for first-timers. |
| Solo Date Ideas | `solo-date-ideas.png` | Table for one: ways to take yourself out. |
| Weekend Activities | `weekend-activities.png` | Give Saturday a storyline. |
| Girls' Night Ideas | `girls-night-ideas.png` | Plans with friends that are not just drinks. |
| Junk Journaling | `junk-journaling.png` | Beginner junk journal ideas, supplies and first pages. |
| Cozy Hobbies | `cozy-hobbies.png` | Soft, slow hobbies for tired evenings. |
| Hobby Starter Kits | `hobby-starter-kits.png` | How to start a hobby without buying everything. |
| Affordable Adventures | `affordable-adventures.png` | Big feelings, small budget. |
| Printable Planners | `printable-planners.png` | Free printables for your life outside work. |
| Active Hobbies | `active-hobbies.png` | Move for the joy of it. |

Tips: make all boards public; add keyword-rich but natural descriptions; set a cover from one of your own pins once it exists, or upload the cover images above as pins to a board and choose them as covers. Pin 5 to 10 pins to each board before promoting the account (use the first-month live pins).

## 4. Rich Pins (check eligibility)

Rich Pins pull the page title and description straight from your page metadata, so they stay in sync.

1. The article template already emits Open Graph tags and Article JSON-LD (see `src/lib/seo.ts` and `src/routes/journal.$slug.tsx`). Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`) and Article metadata (headline, author, date) are what Pinterest reads.
2. Verify at least one live article URL in Pinterest's **Rich Pins validator** (search "Pinterest URL debugger / Rich Pins validator"; check the current URL), then **Apply**. Approval can take days.
3. Known gaps to fix before relying on Rich Pins (RECOMMENDED):
   - `src/lib/seo.ts` emits `og:image` only when a page passes an image, and there is no 1200x630 social image for most pages yet. `design/brand/exports/social/og-image-1200x630.png` is a brand default you can wire in; article-specific images are better (see `design/brand/article-templates/`).
   - Author name and `site.url` must be filled in.
   - Rich Pins apply to the page, not to the pin image; pin text still comes from the CSV.
4. If Rich Pins are not approved, the plain pins still work.

## 5. Uploading and scheduling pins

Images are served by the site itself at `{SITE_URL}/pins/<file>` once deployed (they live in `public/pins/`). Choose one method:

- **Manual, native scheduler (best for the first month):** Create Pin, upload the file from `public/pins/`, paste title, description and destination, choose the board, and use the schedule option to pick the date. Check Pinterest's current limit on how far ahead you can schedule (it has been about 30 days at the time of writing).
- **Bulk upload (CSV):** Pinterest's bulk pin tool accepts a CSV with its own column set (title, media URL, board, description, link, publish date, keywords at the time of writing; limits per upload apply). Open the bulk upload dialog, download Pinterest's current template, and map from `docs/pinterest-pins.csv`: `title`, `description`, `tracked_url` (as the link), `board`, `keywords`, `suggested_date`, and media URL = `{SITE_URL}/pins/<file name>` (strip the `public/pins/` prefix). The images must already be live at those URLs. Check the template for the exact date format.
- **Third-party scheduler:** optional. Do not give a third party the account password; use their OAuth flow only, and read their terms.

Rules while posting:

- Only post rows with `publish_status = published-article` until the destination is verified live. `hold-until-published` rows wait for the article or tool (`docs/PINTEREST-90-DAY-SCHEDULE.md`).
- Use the `tracked_url` column (it carries `utm_source=pinterest&utm_medium=social&utm_campaign=<slug>&utm_content=<pin id>`) as the destination so analytics can attribute clicks to each creative.
- Paste the `alt_text` into Pinterest's alt text field.
- Read each description once and edit a little so it sounds like you; do not post machine text unreviewed.

## 6. Disclosures and compliance (important)

- **Affiliate links:** pins here link only to your own pages. Shop pages contain Amazon search links; once you set an Associates tag (`src/config/affiliate.ts`), the site switches its disclosure automatically. When a pin leads to a shop page after monetization, add a plain disclosure to the description, such as "Contains affiliate links." Check current FTC guidance and Pinterest's policies before ever linking directly to Amazon from a pin (not recommended).
- **AI imagery:** pins reuse the site's AI-generated images. Pinterest labels AI-generated or AI-modified imagery and has controls for it; do not hide it. See `docs/buyer/IMAGE-AND-ASSET-RIGHTS.md`.
- **No fake engagement, no audience claims.** Do not describe the account as having followers, traffic or results until it has them.
- **Pinterest and brand terms:** use Pinterest's name and logo only as its brand guidelines allow ("Follow us on Pinterest" style links are fine).

## 7. Analytics

- Claiming the site gives Pinterest Analytics. Nothing else is wired. If you add Google Analytics 4 or Search Console, wire them with owner credentials, update the Privacy page and consent first (see `CLAUDE-HANDOFF.md`).
- Review at day 30, 60 and 90 as described in `docs/PINTEREST-90-DAY-SCHEDULE.md`.

## What only the owner can do

- Create/convert the account, choose the username, accept Pinterest's terms, set payment details if ever running ads.
- Provide the brand email and domain/DNS access.
- Decide the real start date and real affiliate/disclosure language.

## What Cowork can do inside the owner's logged-in browser (with the owner's go-ahead)

- Claim the website (Verify step) after the tag or DNS record is in place.
- Create the 12 boards, set covers and descriptions from this document.
- Run the Rich Pins validator and submit the application.
- Check each keyword in Pinterest search suggestions and Pinterest Trends and record the outcomes in the tracker (no invented volumes).
- Upload or schedule pins in batches from `public/pins/` and `docs/pinterest-pins.csv`, then screenshot the scheduled queue.
- Not allowed for Cowork: accepting terms, payments, tax or ad-account setup.

## Open items

| Item | Owner |
|---|---|
| Real domain and `site.url` | Owner |
| Pinterest username and `site.social` handle | Owner |
| Claim website (meta tag or DNS) | Owner or Cowork |
| Upload board covers and create boards | Cowork |
| Rich Pins validation and apply | Cowork |
| Keyword check in Pinterest search/Trends | Cowork |
| Replace the placeholder 2027-01-04 start date | Owner |
| Per-article OG images (1200x630) | Claude Code or owner |
