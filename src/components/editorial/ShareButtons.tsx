import { canonicalUrl, pinterestCreateUrl } from "@/lib/share";
import { ShareActions } from "@/components/share/ShareActions";
import { pinImageFor } from "@/lib/pins";

const BTN =
  "inline-flex min-h-11 items-center gap-1.5 text-espresso hover:text-cherry focus-visible:outline focus-visible:outline-2 focus-visible:outline-cherry";

/** Copy link, Save to Pinterest (standard pin URL, our page and image) and Send to the group chat. */
export function ShareButtons({
  title,
  path,
  image,
  description,
}: {
  title: string;
  path: string;
  /** Fallback image (the page hero) when the page has no 2:3 pin of its own. */
  image?: string;
  /** Pin text; defaults to the title. */
  description?: string;
}) {
  const pinImage = pinImageFor(path, image);
  const pin = () => {
    window.open(
      pinterestCreateUrl({
        path,
        description: description ?? title,
        ...(pinImage ? { image: pinImage } : {}),
      }),
      "_blank",
      "noopener,noreferrer",
    );
  };
  return (
    <ShareActions
      variant="link"
      className="gap-x-4 text-sm"
      title={title}
      text={`${title} (Plans Past Five)`}
      url={canonicalUrl(path)}
      extra={
        <button type="button" onClick={pin} className={BTN} aria-label="Save to Pinterest">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
            <path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.5 1.8-2.5.9 0 1.3.7 1.3 1.4 0 .9-.6 2.2-.8 3.4-.2 1 .5 1.9 1.6 1.9 1.9 0 3.3-2 3.3-4.9 0-2.5-1.8-4.3-4.4-4.3-3 0-4.8 2.3-4.8 4.6 0 .9.3 1.9.8 2.4.1.1.1.2.1.3l-.3 1.2c0 .2-.2.3-.4.2-1.4-.6-2.2-2.6-2.2-4.2 0-3.4 2.5-6.6 7.2-6.6 3.8 0 6.7 2.7 6.7 6.3 0 3.7-2.4 6.8-5.6 6.8-1.1 0-2.2-.6-2.5-1.3l-.7 2.6c-.2 1-.9 2.2-1.4 2.9A10 10 0 1 0 12 2z" />
          </svg>
          Pin it
        </button>
      }
    />
  );
}
