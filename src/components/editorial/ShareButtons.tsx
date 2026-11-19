import { useState } from "react";
import { Link2, Check } from "lucide-react";
import { site } from "@/config/site";

export function ShareButtons({
  title,
  path,
  image,
}: {
  title: string;
  path: string;
  image?: string;
}) {
  const [copied, setCopied] = useState(false);
  const url = `${site.url}${path}`;
  const copy = async () => {
    const live = typeof window !== "undefined" ? window.location.origin + path : url;
    try {
      await navigator.clipboard.writeText(live);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };
  const pin = () => {
    const origin = window.location.origin;
    const media = image ? (image.startsWith("http") ? image : origin + image) : "";
    const u = new URL("https://www.pinterest.com/pin/create/button/");
    u.searchParams.set("url", origin + path);
    u.searchParams.set("description", title);
    if (media) u.searchParams.set("media", media);
    window.open(u.toString(), "_blank", "noopener");
  };
  return (
    <div className="no-print flex items-center gap-4 text-sm font-semibold">
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-11 items-center gap-1.5 text-espresso hover:text-cherry"
      >
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
        {copied ? "Link copied" : "Copy link"}
      </button>
      <button
        type="button"
        onClick={pin}
        className="inline-flex min-h-11 items-center gap-1.5 text-espresso hover:text-cherry"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
          <path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.5 1.8-2.5.9 0 1.3.7 1.3 1.4 0 .9-.6 2.2-.8 3.4-.2 1 .5 1.9 1.6 1.9 1.9 0 3.3-2 3.3-4.9 0-2.5-1.8-4.3-4.4-4.3-3 0-4.8 2.3-4.8 4.6 0 .9.3 1.9.8 2.4.1.1.1.2.1.3l-.3 1.2c0 .2-.2.3-.4.2-1.4-.6-2.2-2.6-2.2-4.2 0-3.4 2.5-6.6 7.2-6.6 3.8 0 6.7 2.7 6.7 6.3 0 3.7-2.4 6.8-5.6 6.8-1.1 0-2.2-.6-2.5-1.3l-.7 2.6c-.2 1-.9 2.2-1.4 2.9A10 10 0 1 0 12 2z" />
        </svg>
        Pin it
      </button>
    </div>
  );
}
