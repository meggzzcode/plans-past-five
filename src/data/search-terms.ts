/**
 * Search terms: the ONE short list behind every generic "Find ... on Amazon" link.
 *
 * A search term is a KIND of product ("beginner watercolor sets"), not a pick. It has no brand, no
 * ASIN and no claim about any listing; its button opens an ordinary Amazon search. Named products
 * live in content/products (src/data/catalog.ts). The list is edited in Pages CMS
 * (content/product-search-terms.json) and compiled by scripts/build-content.mjs.
 *
 * These replace the old hand-written "product types" (src/data/products.ts). Where a named product
 * exists for the same need the site shows the product instead.
 */
import { generatedSearchTerms } from "./search-terms.generated";

export type SearchTerm = {
  id: string;
  /** What the reader sees: "Clay sculpting tools". */
  label: string;
  /** The Amazon search words. Lowercase letters, numbers and spaces only. */
  query: string;
  /** The /shop collection it belongs to. */
  collection: string;
  /** Hobby slugs it serves (the first is the main one). */
  hobbies: string[];
};

export const searchTerms: SearchTerm[] = [...generatedSearchTerms];
export const searchTermIds: string[] = searchTerms.map((t) => t.id);

export const getSearchTerm = (id: string) => searchTerms.find((t) => t.id === id);
export const searchTermsFor = (ids: string[]) =>
  ids.map(getSearchTerm).filter((t): t is SearchTerm => !!t);

/** Search terms that belong to a shop collection, including ones that collection lists from others. */
export function collectionSearchTerms(slug: string, extraIds: string[] = []): SearchTerm[] {
  const own = searchTerms.filter((t) => t.collection === slug);
  const extra = searchTermsFor(extraIds).filter((t) => t.collection !== slug);
  return [...own, ...extra];
}

/** Shape `resolveProductLink` expects for a generic search link. */
export const searchLinkable = (t: SearchTerm) => ({ amazonQuery: t.query });
