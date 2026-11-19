/**
 * Links for anything that leaves the website: copied text, printed pages, downloads, exports and
 * group-chat shares. NEVER affiliate. Amazon's Associates policies bar Special Links in printed
 * material, e-books, mailings and offline use (docs/commerce/EXPORT-LINK-POLICY.md), so this module
 * deliberately does not import the affiliate registry. On-site buttons use `resolveProductLink`.
 *
 * Decision: offline materials carry the plain product name plus a link back to the Plans Past Five
 * page for that hobby or shop (`exportPageUrl`). `exportLinkFor` also gives the ordinary,
 * parameter-free amazon.com/dp/<ASIN> address for any caller that needs a direct URL.
 */
import { canonicalUrl } from "@/lib/share";

const ASIN = /^[A-Z0-9]{10}$/;

export type ExportLink = {
  /** Ordinary https://www.amazon.com/dp/<ASIN>, no query string, no tag. Empty when the ASIN is unusable. */
  href: string;
  /** Plain name to print beside it. */
  label: string;
};

/** Ordinary, untagged product address with every query parameter and fragment dropped. */
export function exportLinkFor(p: { name: string; asin: string }): ExportLink {
  return {
    href: ASIN.test(p.asin) ? `https://www.amazon.com/dp/${p.asin}` : "",
    label: p.name,
  };
}

/** Our own page to point readers back to from offline materials (a hobby page, else the shop). */
export function exportPageUrl(hobby?: string): string {
  return canonicalUrl(hobby ? `/hobbies/${hobby}` : "/shop");
}
