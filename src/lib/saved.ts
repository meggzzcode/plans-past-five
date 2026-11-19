import { useCallback, useEffect, useState } from "react";

export type SavedKind = "article" | "hobby" | "plan" | "product" | "solo-date";
export type SavedItem = { key: string; kind: SavedKind; title: string; href: string; note?: string; savedAt: string };

const STORAGE = "ppf:my-plans:v1";
const EVENT = "ppf:saved-change";

function read(): SavedItem[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(window.localStorage.getItem(STORAGE) ?? "[]"); } catch { return []; }
}
function write(items: SavedItem[]) {
  window.localStorage.setItem(STORAGE, JSON.stringify(items));
  window.dispatchEvent(new Event(EVENT));
}

/** Browser-only bookmarks. Read after mount to avoid hydration mismatches. */
export function useSaved() {
  const [items, setItems] = useState<SavedItem[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const sync = () => setItems(read());
    sync(); setReady(true);
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => { window.removeEventListener(EVENT, sync); window.removeEventListener("storage", sync); };
  }, []);
  const isSaved = useCallback((key: string) => items.some((i) => i.key === key), [items]);
  const toggle = useCallback((item: Omit<SavedItem, "savedAt">) => {
    const cur = read();
    write(cur.some((i) => i.key === item.key) ? cur.filter((i) => i.key !== item.key) : [{ ...item, savedAt: new Date().toISOString() }, ...cur]);
  }, []);
  const remove = useCallback((key: string) => write(read().filter((i) => i.key !== key)), []);
  const clear = useCallback(() => write([]), []);
  return { items, ready, isSaved, toggle, remove, clear };
}
