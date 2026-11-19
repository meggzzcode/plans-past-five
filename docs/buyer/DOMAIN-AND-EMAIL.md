# Domain and email

## Domain

- `src/config/site.ts` has `domain: "planspastfive.com"` and `url: "https://planspastfive.com"` with the comment "update after the domain is connected".
- **Status as reported by the owner (2026-11-19):** the domain was registered at Namecheap with a Private Email mailbox, but it is not connected to hosting and the mailbox is untested. The repo cannot show ownership, expiry or renewal price. **Whether the domain and mailbox are included in a sale is an owner decision**, not assumed here (`docs/buyer/BUYER-PACKAGE-CONTENTS.md`). A buyer needs registrar proof and a registrar-to-registrar transfer or push; see `docs/buyer/TRANSFER-CHECKLIST.md`.
- If the domain is not available or not included, pick a new one and change `domain` and `url` in `src/config/site.ts`, plus the `Sitemap:` line in `public/robots.txt`. Canonicals, sitemap and JSON-LD follow `site.url`.
- Registrar transfer rules, timing and fees vary: re-read live to read the registrar's current policy.
- Use registrar two-factor authentication. Keep registrar and DNS credentials in a password manager, never in the repo.

## Email plan: hello@

Plan (recommendation, not built): one public mailbox, `hello@<domain>`, with aliases rather than separate mailboxes.

| Address | Purpose | Type |
|---|---|---|
| hello@ | Main contact, shown on the Contact page | Mailbox |
| press@, partnerships@, corrections@, privacy@ | Optional | Aliases forwarding to hello@ |

Steps:
1. After the domain is yours, choose a mailbox provider and set MX, SPF, DKIM and DMARC records as that provider instructs (re-read live: current steps from the provider's official docs).
2. Set `contactEmail` in `src/config/site.ts`. The Contact page hides the address until it is filled in, and fills it in automatically afterwards.
3. Check the Privacy page and Terms for the contact address before launch.
4. Send a test from outside and confirm replies work and do not land in spam.

Not confirmed: whether any mailbox exists. The seller's mailbox, if any, is not included; see `docs/buyer/ACCOUNT-DEPENDENCIES.md`.

## Checklist

- [ ] Domain registered in the buyer's name, two-factor on.
- [ ] DNS pointed at the host; HTTPS working.
- [ ] `site.url` and `domain` updated; robots.txt sitemap line updated.
- [ ] Mailbox with `hello@` working; `contactEmail` set.
- [ ] SPF, DKIM, DMARC configured per provider.
