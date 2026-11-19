/**
 * Which 2:3 pin image belongs to which page. Articles and tools use the pin built for that exact
 * page. Hobby pages borrow the pin of their first published guide that has one (the guide is about
 * the same hobby). Anything else falls back to the page's own hero image, never an invented path.
 */
import { articlesForHobby } from "@/content";
import { pinFiles } from "@/data/pins";

export const PIN_DIR = "/pins/";

/** Site path of the primary pin for a page path such as `/journal/some-guide`, or undefined. */
export function pinFor(path: string): string | undefined {
  const file = pinFiles[path]?.[0];
  return file ? `${PIN_DIR}${file}` : undefined;
}

/** All pin images for a page path (primary first). */
export const pinsFor = (path: string): string[] => (pinFiles[path] ?? []).map((f) => `${PIN_DIR}${f}`);

/** Pin for a hobby page: the pin of its first published guide that has one. */
export function pinForHobby(slug: string): string | undefined {
  for (const a of articlesForHobby(slug)) {
    const p = pinFor(`/journal/${a.slug}`);
    if (p) return p;
  }
  return undefined;
}

/** The pin to use for any page path, or `fallback` (the page's hero) when none exists. */
export function pinImageFor(path: string, fallback?: string): string | undefined {
  const hobby = /^\/hobbies\/([a-z0-9-]+)$/.exec(path);
  return (hobby ? pinForHobby(hobby[1]!) : pinFor(path)) ?? fallback;
}

/** Same lookup, but true only when a real 2:3 pin exists (not the hero fallback). */
export const hasPin = (path: string): boolean => {
  const hobby = /^\/hobbies\/([a-z0-9-]+)$/.exec(path);
  return !!(hobby ? pinForHobby(hobby[1]!) : pinFor(path));
};
