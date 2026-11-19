/**
 * Central analytics helper. No-op by default: it only fires when
 * `site.integrations.googleAnalyticsId` (which follows `site.analytics.ga4MeasurementId`; the one
 * setting) is set AND a gtag function exists on the page. It never loads a script itself:
 * src/lib/analytics.ts renders the tag when a valid ID is set.
 * It never sends personal data: only the allow-listed keys below, and only primitive values.
 */
import { site } from "@/config/site";

export type TrackEvent =
  | "product_impression"
  | "product_click"
  | "retailer_outbound_click"
  | "affiliate_outbound_click"
  | "shop_article_interaction"
  | "kit_interaction"
  | "shoplist_save"
  | "quiz_complete"
  | "planner_use";

export const TRACK_EVENTS: TrackEvent[] = [
  "product_impression",
  "product_click",
  "retailer_outbound_click",
  "affiliate_outbound_click",
  "shop_article_interaction",
  "kit_interaction",
  "shoplist_save",
  "quiz_complete",
  "planner_use",
];

/** The only parameter names that may be sent. Ids and slugs, never user-entered text. */
export const TRACK_PARAM_KEYS = [
  "product_id",
  "hobby",
  "article",
  "collection",
  "kit",
  "slot",
  "retailer",
  "link_kind",
  "role",
  "placement",
  "action",
  "count",
  "theme",
  "persona",
  "when",
  "length",
] as const;

export type TrackParams = Partial<
  Record<(typeof TRACK_PARAM_KEYS)[number], string | number | boolean>
>;

type Gtag = (command: "event", name: string, params: Record<string, unknown>) => void;

export function trackEnabled(): boolean {
  return Boolean(site.integrations.googleAnalyticsId) && typeof window !== "undefined";
}

/** Strip everything that is not an allow-listed key with a short primitive value. */
export function cleanParams(
  params: Record<string, unknown> = {},
): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {};
  for (const k of TRACK_PARAM_KEYS) {
    const v = params[k];
    if (typeof v === "number" || typeof v === "boolean") out[k] = v;
    else if (typeof v === "string" && v.length <= 80 && !v.includes("@")) out[k] = v;
  }
  return out;
}

export function track(event: TrackEvent, params: TrackParams = {}): void {
  try {
    if (!trackEnabled() || !TRACK_EVENTS.includes(event)) return;
    const gtag = (window as unknown as { gtag?: Gtag }).gtag;
    if (typeof gtag !== "function") return;
    gtag("event", event, cleanParams(params));
  } catch {
    // Analytics must never break the page.
  }
}
