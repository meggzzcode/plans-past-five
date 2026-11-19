# Amazon Associates path (buyer)

Status on 2026-11-19: **nobody has applied, there is no approved account and the site earns nothing.** Nothing here promises approval, sales or income. You apply in your own name; the seller's account (the "master" account that exists, if any) is excluded from the handover and cannot be assigned to you without Amazon's written approval (Operating Agreement, https://affiliate-program.amazon.com/help/operating/agreement, read 2026-11-18).

Amazon changes these rules. Everything below is a dated note, not a guarantee. Re-read the live page before you rely on a number.

## The path, in order

1. **Apply** at https://affiliate-program.amazon.com with your own Amazon account and your site URL. Have the site live and public first. You will complete a tax interview and add a payment method.
2. **Have content on the site early.** Amazon's review expects real, original, public content on the site; the timing noted for this project is "generally within 60 days" of applying. Source: re-read live (the page that states it was not saved with a URL; search Associates Central for "application review").
3. **Three qualified sales within 180 days of applying.** Source: Amazon's Application Review page, https://affiliate-program.amazon.com/help/node/topic/G8TW5AE9XL2VX9VM (read 2026-11-18 and recorded again 2026-11-19; `AFFILIATE-ACTIVATION.md` says the same). Your own orders do not count. Until three qualified sales happen, the account is not fully accepted. This needs real visitors; the site has no traffic history.
4. **Creators API is a later, separate step.** It needs 10 qualifying sales in the past 30 days. Source: re-read live (no URL recorded; open Associates Central and search for "Creators API"). Until then, keep ordinary links. Do not build price or image features from the API before you qualify. The site stores no prices, ratings or Amazon images on purpose.
5. **After approval**, follow `docs/buyer/AFFILIATE-ACTIVATION.md` to set `src/config/affiliate.ts`.

## Required statement and the lines it replaces

Required statement (Operating Agreement s.5; confirm the wording live): **As an Amazon Associate I earn from qualifying purchases.**

The site is written to say "We don't currently earn from these links" while no approved account is configured. Once you are approved and `affiliateRegistry.amazon` is active, those lines must be replaced by the required statement and the commission wording. Places to check, by search:

- `src/config/affiliate.ts` (`notEarning` and the short/long commission statements; they switch automatically with the registry, but read the output)
- `src/routes/editorial-policy.tsx` (a sentence that says links do not earn today)
- `src/routes/affiliate-disclosure.tsx`
- Tests that assert the "don't currently earn" wording (`src/test/shop.test.tsx`, `src/test/round3-fixes.test.tsx`): update them to the monetized wording when you flip the switch.
- Any copy in your listing or social posts.

Never say you are an Amazon Associate before Amazon has accepted you.

## What not to do
- Do not publish earnings, rates or conversion figures. Amazon restricts public communication about the Agreement.
- Do not use shortened or redirecting links, and do not use the seller's tracking id.
- Do not buy through your own links to hit the three sales: personal orders are excluded.

## Dates and sources
| Fact | Source | Read |
|---|---|---|
| 3 qualified sales within 180 days of applying | https://affiliate-program.amazon.com/help/node/topic/G8TW5AE9XL2VX9VM | 2026-11-18 (recorded again 2026-11-19; re-read live) |
| Creators API needs 10 qualifying sales in the past 30 days | official Associates Central page: re-read live | not recorded |
| Content generally within 60 days | official Associates Central page: re-read live | not recorded |
| Operating Agreement (assignment, disclosure) | https://affiliate-program.amazon.com/help/operating/agreement | 2026-11-18 |
| Program Policies | https://affiliate-program.amazon.com/help/operating/policies | 2026-11-18 |
