import { useCallback, useEffect, useState } from "react";
import type { SavedPlanData } from "@/lib/planner";

export type SavedKind = "article" | "hobby" | "plan" | "product" | "solo-date";
export type SavedItem = {
  key: string;
  kind: SavedKind;
  title: string;
  href: string;
  note?: string;
  /** For plans: everything needed to restore the exact itinerary (input, seed, activity ids). */
  plan?: SavedPlanData;
  savedAt: string;
};

const STORAGE = "ppf:my-plans:v1";
const EVENT = "ppf:saved-change";

const KINDS: SavedKind[] = ["article", "hobby", "plan", "product", "solo-date"];

/** Keeps only well-formed entries so corrupted or old-format storage can never crash the page. */
export function sanitizeSaved(raw: unknown): SavedItem[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(
      (i): i is SavedItem =>
        !!i &&
        typeof i === "object" &&
        typeof i.key === "string" &&
        typeof i.title === "string" &&
        typeof i.href === "string" &&
        typeof i.savedAt === "string" &&
        KINDS.includes(i.kind),
    )
    .map((i) => {
      if (i.plan === undefined || validPlan(i.plan)) return i;
      const { plan: _drop, ...rest } = i; // malformed plan data: keep the bookmark, drop the payload
      return rest;
    });
}

function validPlan(p: unknown): p is SavedPlanData {
  if (!p || typeof p !== "object") return false;
  const r = p as Record<string, unknown>;
  return (
    !!r["input"] &&
    typeof r["input"] === "object" &&
    typeof r["seed"] === "number" &&
    Array.isArray(r["ids"]) &&
    r["ids"].every((x) => typeof x === "string")
  );
}

function read(): SavedItem[] {
  if (typeof window === "undefined") return [];
  try {
    return sanitizeSaved(JSON.parse(window.localStorage.getItem(STORAGE) ?? "[]"));
  } catch {
    return [];
  }
}
function write(items: SavedItem[]) {
  try {
    window.localStorage.setItem(STORAGE, JSON.stringify(items));
  } catch {
    // Storage full or blocked (e.g. private mode): fail quietly rather than throw on click.
  }
  window.dispatchEvent(new Event(EVENT));
}

/** Browser-only bookmarks. Read after mount to avoid hydration mismatches. */
export function useSaved() {
  const [items, setItems] = useState<SavedItem[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const sync = () => setItems(read());
    sync();
    setReady(true);
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  const isSaved = useCallback((key: string) => items.some((i) => i.key === key), [items]);
  const toggle = useCallback((item: Omit<SavedItem, "savedAt">) => {
    const cur = read();
    write(
      cur.some((i) => i.key === item.key)
        ? cur.filter((i) => i.key !== item.key)
        : [{ ...item, savedAt: new Date().toISOString() }, ...cur],
    );
  }, []);
  const remove = useCallback((key: string) => write(read().filter((i) => i.key !== key)), []);
  const clear = useCallback(() => write([]), []);
  return { items, ready, isSaved, toggle, remove, clear };
}
