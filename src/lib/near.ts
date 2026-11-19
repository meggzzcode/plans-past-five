/**
 * "Near me" without location data. The person may type a town or postcode; it is kept in this
 * browser's localStorage only and is used for one thing: building a Google Maps search link that
 * opens in a new tab. No geolocation API (public/_headers blocks it), no network call from us.
 */
import { useCallback, useEffect, useState } from "react";
import { activities } from "@/data/activities";
import { nearTermsByActivity } from "@/data/near-terms";

const STORAGE = "ppf:near-place:v1";
const EVENT = "ppf:near-change";
export const MAX_PLACE_LENGTH = 40;

/** Letters, digits, spaces and a few separators only; trimmed, collapsed, capped. Empty = none. */
export function sanitizePlace(raw: unknown): string {
  if (typeof raw !== "string") return "";
  return raw
    .normalize("NFC")
    .replace(/[^\p{L}\p{N} ,.'-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_PLACE_LENGTH)
    .trim();
}

/** `https://www.google.com/maps/search/?api=1&query=<keywords> near <place>` */
export function mapsSearchUrl(term: string, place: string): string {
  const u = new URL("https://www.google.com/maps/search/");
  u.searchParams.set("api", "1");
  u.searchParams.set("query", `${term} near ${place}`);
  return u.toString();
}

/** The search phrase for an activity id or a hobby slug, or null (home activities have none). */
export function nearTermFor(ref: { activityId?: string; hobbySlug?: string }): string | null {
  if (ref.activityId) return nearTermsByActivity[ref.activityId] ?? null;
  if (ref.hobbySlug) {
    const a = activities.find((x) => x.hobby === ref.hobbySlug && nearTermsByActivity[x.id]);
    return a ? (nearTermsByActivity[a.id] ?? null) : null;
  }
  return null;
}

function read(): string {
  if (typeof window === "undefined") return "";
  try {
    return sanitizePlace(window.localStorage.getItem(STORAGE));
  } catch {
    return "";
  }
}

function write(place: string) {
  try {
    if (place) window.localStorage.setItem(STORAGE, place);
    else window.localStorage.removeItem(STORAGE);
  } catch {
    // Blocked storage: the box simply forgets on reload.
  }
  window.dispatchEvent(new Event(EVENT));
}

/** Browser-only. Read after mount so server and first client render match. */
export function useNearPlace() {
  const [place, setPlaceState] = useState("");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const sync = () => setPlaceState(read());
    sync();
    setReady(true);
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  const setPlace = useCallback((raw: string) => write(sanitizePlace(raw)), []);
  const clear = useCallback(() => write(""), []);
  return { place, ready, setPlace, clear };
}
