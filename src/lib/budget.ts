import { hobbies, getHobby } from "@/data/hobbies";
import type { CollectionSlug } from "@/data/products";
import {
  categoryOrder,
  categoryLabels,
  equipmentByHobby,
  type EquipmentCategory,
  type EquipmentItem,
} from "@/data/equipment";

/**
 * Hobby Starter Budget Calculator: pure logic + editable assumptions.
 *
 * EVERY NUMBER IN THIS FILE IS AN APPROXIMATE ASSUMPTION, not a live price.
 * Ranges are whole US dollars for a typical beginner-friendly option, no brands.
 * A buyer can change any figure below (or the multipliers) in this one file.
 */

export * from "@/data/equipment";
export type Level = "brand-new" | "dabbled" | "returning";
export type BudgetPref = "lean" | "balanced" | "treat";

export const levelOptions: { v: Level; label: string; hint: string }[] = [
  { v: "brand-new", label: "Brand new", hint: "Never tried it" },
  { v: "dabbled", label: "Dabbled", hint: "A few attempts" },
  { v: "returning", label: "Returning", hint: "Used to do it, starting again" },
];

export const budgetOptions: { v: BudgetPref; label: string; hint: string }[] = [
  { v: "lean", label: "Keep it lean", hint: "Cheapest sensible versions" },
  { v: "balanced", label: "Balanced", hint: "A fair middle" },
  { v: "treat", label: "Treat myself", hint: "Nicer versions" },
];

/**
 * Multipliers applied to each item's low/high assumption. Edit here.
 * Level: people who have dabbled tend to buy a step up; returners often own a bit already.
 * Budget: lean aims at the low end, treat at the high end.
 */
export const assumptions = {
  level: {
    "brand-new": { low: 1, high: 1 },
    dabbled: { low: 1, high: 1.15 },
    returning: { low: 0.8, high: 1.1 },
  } satisfies Record<Level, { low: number; high: number }>,
  budget: {
    lean: { low: 0.8, high: 0.7 },
    balanced: { low: 1, high: 1 },
    treat: { low: 1.3, high: 1.4 },
  } satisfies Record<BudgetPref, { low: number; high: number }>,
  /** Estimates are rounded to the nearest dollar, then to this step in the headline range. */
  roundTo: 5,
  disclaimer:
    "Costs are approximate planning assumptions for a typical beginner option, not live prices. Real prices change by place and season, so check before you buy. Secondhand, borrowed and library options can cost far less.",
};

export type BudgetInput = {
  hobby: string;
  level: Level;
  budget: BudgetPref;
  /** Optional item ids the person wants to include. Essentials are always included. */
  optionalIds: string[];
  /** Item ids (essential or optional) they already own. */
  ownedIds: string[];
};

export type PricedItem = EquipmentItem & { estLow: number; estHigh: number };

export type BudgetResult = {
  hobbySlug: string;
  hobbyName: string;
  low: number;
  high: number;
  /** Rounded for headline display. */
  displayLow: number;
  displayHigh: number;
  free: boolean;
  items: PricedItem[]; // counted in the total
  owned: PricedItem[]; // skipped because they already own it
  skippedOptional: PricedItem[]; // optional, not selected
  checklist: { category: EquipmentCategory; label: string; items: PricedItem[] }[];
  collections: CollectionSlug[];
};

export const hasBudgetFor = (slug: string) => !!equipmentByHobby[slug];

export function itemsFor(slug: string): EquipmentItem[] {
  return equipmentByHobby[slug] ?? [];
}

const priceItem = (it: EquipmentItem, level: Level, pref: BudgetPref): PricedItem => {
  const l = assumptions.level[level];
  const b = assumptions.budget[pref];
  const estLow = Math.round(it.low * l.low * b.low);
  const estHigh = Math.max(estLow, Math.round(it.high * l.high * b.high));
  return { ...it, estLow, estHigh };
};

const roundStep = (n: number, dir: "down" | "up") =>
  dir === "down"
    ? Math.floor(n / assumptions.roundTo) * assumptions.roundTo
    : Math.ceil(n / assumptions.roundTo) * assumptions.roundTo;

/** Returns null for an unknown hobby slug. */
export function calculateBudget(input: BudgetInput): BudgetResult | null {
  const hobby = getHobby(input.hobby);
  const list = itemsFor(input.hobby);
  if (!hobby || list.length === 0) return null;
  const owned = new Set(input.ownedIds);
  const wanted = new Set(input.optionalIds);
  const items: PricedItem[] = [];
  const ownedItems: PricedItem[] = [];
  const skippedOptional: PricedItem[] = [];
  for (const it of list) {
    const priced = priceItem(it, input.level, input.budget);
    if (owned.has(it.id)) ownedItems.push(priced);
    else if (it.kind === "optional" && !wanted.has(it.id)) skippedOptional.push(priced);
    else items.push(priced);
  }
  const low = items.reduce((s, i) => s + i.estLow, 0);
  const high = items.reduce((s, i) => s + i.estHigh, 0);
  const free = high === 0;
  const checklist = categoryOrder
    .map((category) => ({
      category,
      label: categoryLabels[category],
      items: items.filter((i) => i.category === category),
    }))
    .filter((g) => g.items.length > 0);
  const collections = [
    ...new Set(items.map((i) => i.collection).filter((c): c is CollectionSlug => !!c)),
  ];
  return {
    hobbySlug: hobby.slug,
    hobbyName: hobby.name,
    low,
    high,
    displayLow: free ? 0 : roundStep(low, "down"),
    displayHigh: free ? 0 : roundStep(high, "up"),
    free,
    items,
    owned: ownedItems,
    skippedOptional,
    checklist,
    collections,
  };
}

export const formatRange = (low: number, high: number) =>
  high === 0 ? "Free" : low === high ? `about $${low}` : `about $${low}–$${high}`;

export const budgetHobbies = () =>
  hobbies.filter((h) => hasBudgetFor(h.slug)).map((h) => ({ slug: h.slug, name: h.name }));
