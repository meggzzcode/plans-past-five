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

export type RoleNeed = "essential" | "optional" | "household" | "probably-own";

/**
 * One vocabulary for a product's place in a list. A "Starter pick" is what a beginner buys first. A
 * "Step up" is a beginner's next step (a nicer version, or something to add once hooked), never an
 * expert piece. Anything else is a skippable "Nice later". Never a price tier.
 */
export function roleLabel(p: CatalogProduct, need?: RoleNeed): string {
  if (need === "household" || need === "probably-own") return "Check your drawer";
  if (need === "essential" || (need === undefined && p.isEssential)) return "Starter pick";
  if (p.role === "aesthetic-upgrade") return "Step up: a prettier version";
  if (p.role === "later-upgrade") return "Step up: once you're hooked";
  return "Nice later";
}
