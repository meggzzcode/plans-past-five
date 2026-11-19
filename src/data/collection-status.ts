import { verifiedCatalog, type CatalogProduct } from "./catalog";
import { fillKit, getKit, isFullKit } from "./kits";
import { collections, getCollection, type Collection } from "./products";

/**
 * When is a shop collection shown? One rule, applied everywhere, with nothing to toggle by hand.
 *
 * A collection is LIVE when it has at least MIN_SHOWN_PRODUCTS shown (verified, monetisable,
 * publicly visible) product tagged with its slug, OR one of its kits is complete (see `isFullKit`).
 * A live collection appears on the shop index, in search, in the sitemap and in "more in ..."
 * links. A collection that is not live is omitted from all of them, and its own URL shows a short
 * "coming soon" note that is `noindex` instead of a page of nothing. Add a verified product tagged
 * with the collection and it goes live by itself on the next build.
 *
 * Raise MIN_SHOWN_PRODUCTS to ask for more before a collection is shown (the owner has asked for
 * no mandatory minimum, only that an empty or weak collection is never published).
 */
export const MIN_SHOWN_PRODUCTS = 1;

/** Shown products tagged with the collection. */
export const collectionProducts = (
  slug: string,
  list: CatalogProduct[] = verifiedCatalog,
): CatalogProduct[] => list.filter((p) => p.collections.includes(slug));

/** True when one of the collection's kits has enough verified picks to count as a complete kit. */
export function hasCompleteKit(slug: string, list: CatalogProduct[] = verifiedCatalog): boolean {
  const c = getCollection(slug);
  return !!c?.kitIds?.some((id) => {
    const kit = getKit(id);
    return !!kit && isFullKit(fillKit(kit, list), kit);
  });
}

/** The one rule: does this collection have something real to show? Unknown slugs are never live. */
export function isCollectionLive(slug: string, list: CatalogProduct[] = verifiedCatalog): boolean {
  if (!getCollection(slug)) return false;
  return collectionProducts(slug, list).length >= MIN_SHOWN_PRODUCTS || hasCompleteKit(slug, list);
}

/** The collections to show anywhere on the site, in their usual order. */
export function liveCollections(list: CatalogProduct[] = verifiedCatalog): Collection[] {
  return collections.filter((c) => isCollectionLive(c.slug, list));
}

/** Why a collection is shown or not, for the build report and tests. */
export function collectionStatus(slug: string, list: CatalogProduct[] = verifiedCatalog) {
  const products = collectionProducts(slug, list).length;
  const completeKit = hasCompleteKit(slug, list);
  return { slug, live: isCollectionLive(slug, list), products, completeKit };
}
