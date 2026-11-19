/**
 * Amazon destination builder. Unmonetized by default.
 * To monetize: set `associatesTag` to a valid Amazon Associates tracking ID
 * (e.g. "yourtag-20"). Every product link on the site updates automatically.
 * Products with a verified `exactUrl` use that instead of a search link.
 */
export const affiliate = {
  associatesTag: "",
  marketplace: "https://www.amazon.com",
};

export function amazonSearchUrl(query: string) {
  const u = new URL("/s", affiliate.marketplace);
  u.searchParams.set("k", query);
  if (affiliate.associatesTag) u.searchParams.set("tag", affiliate.associatesTag);
  return u.toString();
}

export function productHref(p: { amazonQuery: string; exactUrl?: string }) {
  if (p.exactUrl) {
    const u = new URL(p.exactUrl);
    if (affiliate.associatesTag) u.searchParams.set("tag", affiliate.associatesTag);
    return u.toString();
  }
  return amazonSearchUrl(p.amazonQuery);
}

export const isMonetized = () => affiliate.associatesTag.length > 0;
