/**
 * Browser-only shopping checklist for the commerce components. localStorage key `ppf:shop-list:v1`.
 * Frontend-only: nothing leaves the device. Read after mount so SSR output never mismatches.
 */
import { useCallback, useEffect, useState } from "react";
import { exportPageUrl } from "@/lib/export-links";
import type { CatalogProduct } from "@/data/catalog";
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
 * Plain-text list for clipboard, printing or sharing: product names and brands plus ONE link back to
 * our own page. It never contains retailer or affiliate links (see src/lib/export-links.ts and
 * docs/commerce/EXPORT-LINK-POLICY.md), so no Associates tag or Associate statement can appear here,
 * whatever the registry says.
 */
export function buildListText(
  products: CatalogProduct[],
  state: ShopListState,
  today: string,
  title = "My shopping list",
  pageUrl: string = exportPageUrl(),
): string {
  const needed = neededProducts(products, state);
  const lines = [
    `${title} (Plans Past Five)`,
    `Made ${today}. Check each listing for current availability.`,
    "",
  ];
  for (const p of needed) lines.push(`[ ] ${p.name}${p.brand ? ` (${p.brand})` : ""}`);
  if (needed.length) lines.push("", `Find each item and its details: ${pageUrl}`);
  const owned = products.filter((p) => state[p.id] === "own");
  if (owned.length) lines.push("", `Already own: ${owned.map((p) => p.name).join(", ")}`);
  const later = products.filter((p) => state[p.id] === "later");
  if (later.length) lines.push("", `Maybe later: ${later.map((p) => p.name).join(", ")}`);
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

/** Replace the whole stored list (used by import after merging). */
export const replaceShopList = (state: ShopListState) =>
  writeShopList(sanitizeShopList({ items: state }));

/** Products on the list for one status, in catalog order. */
export const productsWithStatus = (
  products: CatalogProduct[],
  state: ShopListState,
  status: ShopStatus,
) => products.filter((p) => state[p.id] === status);
