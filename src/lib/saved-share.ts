import type { SavedItem } from "@/lib/saved";
import { planFromIds, planHref, planText, sanitizePlanData } from "@/lib/planner";
import { canonicalUrl } from "@/lib/share";

/** Saved plans restore their exact itinerary from the stored input, seed and activity ids. */
export function hrefFor(i: SavedItem) {
  if (i.kind === "plan" && i.plan) {
    const p = sanitizePlanData(i.plan);
    if (p) return planHref(p.input, p.seed, p.ids);
  }
  return i.href;
}

/**
 * The text copied or sent for a saved item. A saved plan uses the planner's own copy text (invite
 * line, times, cost, total and link), so /saved and the planner paste identically. Links always use
 * the canonical site address.
 */
export function savedShareText(i: SavedItem): { text: string; url?: string } {
  const href = canonicalUrl(hrefFor(i));
  if (i.kind === "plan" && i.plan) {
    const data = sanitizePlanData(i.plan);
    const plan = data ? planFromIds(data.input, data.seed, data.ids) : null;
    if (plan) return { text: planText(plan, href) };
  }
  return { text: i.note ? `${i.title}\n${i.note}` : i.title, url: href };
}
