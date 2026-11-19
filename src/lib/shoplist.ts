/**
 * Browser-only shopping checklist for the commerce components. localStorage key `ppf:shop-list:v1`.
 * Frontend-only: nothing leaves the device. Read after mount so SSR output never mismatches.
 */
import { useCallback, useEffect, useState } from "react";
import { resolveProductLink, liveDisclosureSentences, isMonetized } from "@/config/affiliate";
import { linkableFor, type CatalogProduct } from "@/data/catalog";
import { track } from "@/lib/track";

export type ShopStatus = "need" | "own" | "later";
/** product id -> status. A product with no entry is neither ticked nor owned. */
export type ShopListState = Record<string, ShopStatus>;

export const SHOPLIST_KEY = "ppf:shop-list:v1";
const EVENT = "ppf:shoplist-change";
const STATUSES: ShopStatus[] = ["need", "own", "later"];

/** Keep only well-formed entries so corrupt storage can never crash a page. */
export function sanitizeShopList(raw: unknown): ShopListState {
  if (!raw || typeof raw !== "object") return {};
  const items = (raw as { items?: unknown }).items;
  if (!items || typeof items !== "object" || Array.isArray(items)) return {};
  const out: ShopListState = {};
  for (const [id, v] of Object.entries(items as Record<string, unknown>))
    if (typeof v === "string" && STATUSES.includes(v as ShopStatus)) out[id] = v as ShopStatus;
  return out;
}

export function readShopList(): ShopListState {
  if (typeof window === "undefined") return {};
  try {
    return sanitizeShopList(JSON.parse(window.localStorage.getItem(SHOPLIST_KEY) ?? "{}"));
  } catch {
    return {};
  }
}

export function writeShopList(state: ShopListState) {
  try {
    window.localStorage.setItem(SHOPLIST_KEY, JSON.stringify({ v: 1, items: state }));
  } catch {
    // Storage full or blocked: fail quietly.
  }
  window.dispatchEvent(new Event(EVENT));
}

/** Pure transition: choosing the status a product already has clears it. */
export function nextState(
  state: ShopListState,
  id: string,
  status: ShopStatus | null,
): ShopListState {
  const next = { ...state };
  if (status === null || next[id] === status) delete next[id];
  else next[id] = status;
  return next;
}

export function useShopList() {
  const [state, setState] = useState<ShopListState>({});
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const sync = () => setState(readShopList());
    sync();
    setReady(true);
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  const setStatus = useCallback(
    (p: Pick<CatalogProduct, "id" | "role">, status: ShopStatus | null) => {
      const cur = readShopList();
      const next = nextState(cur, p.id, status);
      writeShopList(next);
      track("shoplist_save", { product_id: p.id, role: p.role, action: next[p.id] ?? "clear" });
    },
    [],
  );
  const setMany = useCallback((ids: string[], status: ShopStatus) => {
    const next = { ...readShopList() };
    for (const id of ids) next[id] = status;
    writeShopList(next);
    track("shoplist_save", { action: `select-${status}`, count: ids.length });
  }, []);
  const clear = useCallback(() => writeShopList({}), []);
  return { state, ready, setStatus, setMany, clear };
}

export const neededProducts = (products: CatalogProduct[], state: ShopListState) =>
  products.filter((p) => state[p.id] === "need");

/**
 * Plain-text list for clipboard or printing: product names, brands and the real destination URLs.
 * URLs come from `resolveProductLink`, so they are ordinary links today and tagged only after a buyer
 * activates the registry (in which case the required disclosure sentence is appended).
 */
export function buildListText(
  products: CatalogProduct[],
  state: ShopListState,
  today: string,
  title = "My shopping list",
): string {
  const needed = neededProducts(products, state);
  const lines = [
    `${title} (Plans Past Five)`,
    `Made ${today}. Prices and availability are set by the retailer, so check each listing.`,
    "",
  ];
  for (const p of needed) {
    const link = resolveProductLink(linkableFor(p));
    lines.push(`[ ] ${p.name}${p.brand ? ` (${p.brand})` : ""}`);
    lines.push(`    ${link.retailer}: ${link.href}`);
  }
  const owned = products.filter((p) => state[p.id] === "own");
  if (owned.length) lines.push("", `Already own: ${owned.map((p) => p.name).join(", ")}`);
  if (isMonetized()) lines.push("", liveDisclosureSentences().join(" "));
  return lines.join("\n");
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}
