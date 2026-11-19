import type { ResolvedLink } from "@/config/affiliate";
import type { CatalogProduct } from "@/data/catalog";

/**
 * Button text that names the real destination. A named product opens its own page ("See it on
 * Amazon"); a type of product opens a search ("Find beginner rackets on Amazon"). Never "Buy now".
 */
export function linkLabel(link: ResolvedLink, noun?: string): string {
  if (link.exact) return `See it on ${link.retailer}`;
  const what = noun?.trim().toLowerCase();
  return what ? `Find ${what} on ${link.retailer}` : `Find options on ${link.retailer}`;
}

export type RoleNeed = "essential" | "optional" | "probably-own";

/** One vocabulary for a product's place in a list. Skippable, never a shrug. */
export function roleLabel(p: CatalogProduct, need?: RoleNeed): string {
  if (need === "probably-own") return "Check your drawer";
  if (need === "essential" || (need === undefined && p.isEssential)) return "Start with this";
  if (p.role === "aesthetic-upgrade") return "Pretty extra";
  if (p.role === "later-upgrade") return "When you're hooked";
  return "Nice later";
}
