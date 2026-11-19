/**
 * Sharing helpers. No SDKs, no network calls from our code: Pinterest gets its standard pin-creation
 * URL (opened by the visitor), the group-chat action uses the Web Share API with a copy fallback.
 */
import { site } from "@/config/site";
import { copyText } from "@/lib/shoplist";

/** Absolute URL on our canonical origin (what Pinterest and chat apps should see). */
export function absoluteUrl(pathOrUrl: string, origin: string = site.url): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${origin.replace(/\/$/, "")}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

/**
 * The one canonical address every share, copy and group-chat action uses (site.url), never the
 * address the page happens to be open on (localhost, a preview host). Pass a path plus any query.
 */
export const canonicalUrl = (pathAndQuery: string): string => absoluteUrl(pathAndQuery);

/** Standard Pinterest pin-creation URL for one of our own pages and one of our own images. */
export function pinterestCreateUrl(opts: {
  path: string;
  description: string;
  image?: string;
  origin?: string;
}): string {
  const u = new URL("https://www.pinterest.com/pin/create/button/");
  u.searchParams.set("url", absoluteUrl(opts.path, opts.origin));
  u.searchParams.set("description", opts.description.slice(0, 480));
  if (opts.image) u.searchParams.set("media", absoluteUrl(opts.image, opts.origin));
  return u.toString();
}

export type ShareOutcome = "shared" | "copied" | "cancelled" | "failed";

type ShareNavigator = {
  share?: (d: ShareData) => Promise<void>;
  canShare?: (d: ShareData) => boolean;
};

/**
 * "Send to the group chat": the ONE helper behind every send/share button. It tries the native
 * share sheet (title, text and the canonical URL), and otherwise copies the text. A person closing
 * the share sheet is not an error and does not trigger the copy fallback.
 * Set `textIncludesUrl` when `text` already ends with the link, so a copy does not repeat it.
 */
export async function sendToGroupChat(
  data: { title: string; text: string; url?: string; textIncludesUrl?: boolean; files?: File[] },
  nav: ShareNavigator | undefined = typeof navigator === "undefined" ? undefined : navigator,
  copy: (t: string) => Promise<boolean> = copyText,
): Promise<ShareOutcome> {
  if (nav && typeof nav.share === "function") {
    const payload: ShareData = {
      title: data.title,
      text: data.text,
      ...(data.url ? { url: data.url } : {}),
    };
    if (data.files?.length && nav.canShare?.({ files: data.files })) payload.files = data.files;
    try {
      await nav.share(payload);
      return "shared";
    } catch (e) {
      if (e instanceof Error && e.name === "AbortError") return "cancelled";
      // Any other failure: fall through to copying.
    }
  }
  const full = data.url && !data.textIncludesUrl ? `${data.text}\n${data.url}` : data.text;
  return (await copy(full)) ? "copied" : "failed";
}

export const outcomeMessage: Record<ShareOutcome, string> = {
  shared: "Sent.",
  copied: "Copied. Paste it in the chat.",
  cancelled: "",
  failed: "Couldn't copy. Your browser blocked it.",
};

/** Plain-text version of a saved itinerary or bookmark, for copying or pasting into a chat. */
export function savedItemText(
  item: { title: string; note?: string; href: string },
  origin: string = site.url,
): string {
  const lines = [item.title];
  if (item.note) lines.push(item.note);
  lines.push(absoluteUrl(item.href, origin));
  return lines.join("\n");
}
