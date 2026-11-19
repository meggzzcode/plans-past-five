/**
 * Export and import of everything saved on this device (My Plans bookmarks, saved itineraries, the
 * shopping list). Input is untrusted: a file the visitor picked or a code they pasted. Parsing never
 * evaluates anything, rebuilds every object from an allow-list of fields, enforces size and count limits,
 * and only accepts same-site paths as links. Text is cleaned of control characters and angle brackets
 * (React escapes it on render anyway; this is defence in depth).
 */
import type { SavedItem, SavedKind } from "@/lib/saved";
import { sanitizePlanData, type SavedPlanData } from "@/lib/planner";
import type { ShopListState, ShopStatus } from "@/lib/shoplist";
import { site } from "@/config/site";

export const BUNDLE_APP = "plans-past-five";
export const BUNDLE_VERSION = 1;
export const CODE_PREFIX = "PPF1.";

export const MAX_FILE_CHARS = 400_000;
export const MAX_ITEMS = 300;
export const MAX_SHOP_ITEMS = 500;
const MAX_TITLE = 200;
const MAX_NOTE = 1500;
const MAX_HREF = 1500;
const MAX_KEY = 1600;
const MAX_PLAN_IDS = 40;

const KINDS: SavedKind[] = ["article", "hobby", "plan", "product", "solo-date"];
const STATUSES: ShopStatus[] = ["need", "own", "later"];

export type Bundle = {
  app: typeof BUNDLE_APP;
  v: typeof BUNDLE_VERSION;
  exportedAt: string;
  saved: SavedItem[];
  shop: ShopListState;
};

export function buildBundle(
  saved: SavedItem[],
  shop: ShopListState,
  now: Date = new Date(),
): Bundle {
  return {
    app: BUNDLE_APP,
    v: BUNDLE_VERSION,
    exportedAt: now.toISOString(),
    saved,
    shop,
  };
}

export const bundleToJson = (b: Bundle) => JSON.stringify(b, null, 2);

/* ---------- Copyable code (base64url of compact JSON) ---------- */

function toBase64Url(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000)
    bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(code: string): string | null {
  if (!/^[A-Za-z0-9_-]*$/.test(code)) return null;
  try {
    const b64 = code.replace(/-/g, "+").replace(/_/g, "/");
    const bin = atob(b64 + "=".repeat((4 - (b64.length % 4)) % 4));
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return null;
  }
}

export const bundleToCode = (b: Bundle) => CODE_PREFIX + toBase64Url(JSON.stringify(b));

/* ---------- Field cleaning ---------- */

// eslint-disable-next-line no-control-regex
const CONTROL = /[\u0000-\u0009\u000b-\u001f\u007f-\u009f\u2028\u2029]/g;

function cleanText(v: unknown, max: number, keepNewlines = false): string | null {
  if (typeof v !== "string") return null;
  let s = v.replace(/\r\n?/g, "\n").replace(CONTROL, "").replace(/[<>]/g, "");
  if (!keepNewlines) s = s.replace(/\n/g, " ");
  s = s.trim();
  return s.length === 0 || s.length > max ? null : s;
}

/** Same-site path only: starts with a single "/", printable ASCII, no quotes, brackets or backslashes. */
export function isSafeInternalHref(v: unknown): v is string {
  return (
    typeof v === "string" &&
    v.length <= MAX_HREF &&
    /^\/(?!\/)[\x21-\x7e]*$/.test(v) &&
    !/[<>"'`\\]/.test(v)
  );
}

function cleanPlan(raw: unknown): SavedPlanData | undefined {
  if (raw === undefined) return undefined;
  const p = sanitizePlanData(raw);
  if (!p || p.ids.length > MAX_PLAN_IDS) return undefined;
  if (!p.ids.every((id) => /^[A-Za-z0-9][A-Za-z0-9._-]{0,79}$/.test(id))) return undefined;
  if (!Number.isInteger(p.seed) || p.seed < 0 || p.seed > 1_000_000) return undefined;
  return p;
}

export function cleanSavedItem(raw: unknown): SavedItem | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const r = raw as Record<string, unknown>;
  const kind = r["kind"];
  if (typeof kind !== "string" || !KINDS.includes(kind as SavedKind)) return null;
  const key = r["key"];
  if (
    typeof key !== "string" ||
    key.length > MAX_KEY ||
    !key.startsWith(`${kind}:`) ||
    !/^[\x21-\x7e]+$/.test(key) ||
    /[<>"'`\\]/.test(key)
  )
    return null;
  const title = cleanText(r["title"], MAX_TITLE);
  if (!title || !isSafeInternalHref(r["href"])) return null;
  const savedMs = typeof r["savedAt"] === "string" ? Date.parse(r["savedAt"]) : NaN;
  if (!Number.isFinite(savedMs)) return null;
  const item: SavedItem = {
    key,
    kind: kind as SavedKind,
    title,
    href: r["href"],
    savedAt: new Date(savedMs).toISOString(),
  };
  if (r["note"] !== undefined) {
    const note = cleanText(r["note"], MAX_NOTE, true);
    if (note) item.note = note;
  }
  const plan = cleanPlan(r["plan"]);
  if (plan) item.plan = plan;
  return item;
}

export function cleanShopList(raw: unknown): { items: ShopListState; skipped: number } {
  const items: ShopListState = {};
  let skipped = 0;
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return { items, skipped };
  let n = 0;
  for (const [id, status] of Object.entries(raw as Record<string, unknown>)) {
    if (
      n < MAX_SHOP_ITEMS &&
      /^[A-Za-z0-9][A-Za-z0-9._-]{0,79}$/.test(id) &&
      typeof status === "string" &&
      STATUSES.includes(status as ShopStatus)
    ) {
      items[id] = status as ShopStatus;
      n++;
    } else skipped++;
  }
  return { items, skipped };
}

/* ---------- Parsing ---------- */

export type ImportResult =
  { ok: true; bundle: Bundle; skipped: number } | { ok: false; error: string };

const NOT_OURS = `That doesn't look like a ${site.name} backup.`;

/** Accepts the text of a .json backup or a pasted code (PPF1.…). Never throws. */
export function parseImport(input: unknown): ImportResult {
  if (typeof input !== "string") return { ok: false, error: NOT_OURS };
  const text = input.trim();
  if (text.length === 0) return { ok: false, error: "Nothing to import yet." };
  if (text.length > MAX_FILE_CHARS)
    return { ok: false, error: "That backup is too large to import." };

  let json = text;
  if (text.startsWith(CODE_PREFIX)) {
    const decoded = fromBase64Url(text.slice(CODE_PREFIX.length).replace(/\s+/g, ""));
    if (decoded === null) return { ok: false, error: "That code is damaged or incomplete." };
    json = decoded;
  }
  if (json.length > MAX_FILE_CHARS)
    return { ok: false, error: "That backup is too large to import." };

  let data: unknown;
  try {
    data = JSON.parse(json);
  } catch {
    return { ok: false, error: NOT_OURS };
  }
  if (!data || typeof data !== "object" || Array.isArray(data))
    return { ok: false, error: NOT_OURS };
  const d = data as Record<string, unknown>;
  if (d["app"] !== BUNDLE_APP) return { ok: false, error: NOT_OURS };
  if (d["v"] !== BUNDLE_VERSION)
    return { ok: false, error: "That backup is from a different version of the site." };

  const rawSaved = d["saved"] === undefined ? [] : d["saved"];
  if (
    !Array.isArray(rawSaved) ||
    (d["shop"] !== undefined &&
      (typeof d["shop"] !== "object" || d["shop"] === null || Array.isArray(d["shop"])))
  )
    return { ok: false, error: NOT_OURS };

  let skipped = 0;
  const saved: SavedItem[] = [];
  const seen = new Set<string>();
  for (const raw of rawSaved) {
    const item = saved.length < MAX_ITEMS ? cleanSavedItem(raw) : null;
    if (!item || seen.has(item.key)) {
      skipped++;
      continue;
    }
    seen.add(item.key);
    saved.push(item);
  }
  const shop = cleanShopList(d["shop"]);
  skipped += shop.skipped;

  if (saved.length === 0 && Object.keys(shop.items).length === 0)
    return { ok: false, error: "That backup has nothing we can import." };

  const exported = typeof d["exportedAt"] === "string" ? Date.parse(d["exportedAt"]) : NaN;
  return {
    ok: true,
    skipped,
    bundle: {
      app: BUNDLE_APP,
      v: BUNDLE_VERSION,
      exportedAt: Number.isFinite(exported)
        ? new Date(exported).toISOString()
        : new Date(0).toISOString(),
      saved,
      shop: shop.items,
    },
  };
}

/* ---------- Merging (imports only ever add; they never delete what is already here) ---------- */

/** On a key clash the more recently saved copy wins. Newest first, capped at MAX_ITEMS. */
export function mergeSaved(existing: SavedItem[], incoming: SavedItem[]): SavedItem[] {
  const byKey = new Map<string, SavedItem>();
  for (const i of existing) byKey.set(i.key, i);
  for (const i of incoming) {
    const cur = byKey.get(i.key);
    if (!cur || Date.parse(i.savedAt) > Date.parse(cur.savedAt)) byKey.set(i.key, i);
  }
  return [...byKey.values()]
    .sort((a, b) => Date.parse(b.savedAt) - Date.parse(a.savedAt))
    .slice(0, MAX_ITEMS);
}

/** Existing choices on this device win; imported products fill in the rest. */
export function mergeShop(existing: ShopListState, incoming: ShopListState): ShopListState {
  return { ...incoming, ...existing };
}
