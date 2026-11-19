import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, Copy, Send } from "lucide-react";
import { outcomeMessage, sendToGroupChat, type ShareOutcome } from "@/lib/share";
import { copyText } from "@/lib/shoplist";
import { cn } from "@/lib/utils";
import { useHydrated, waitingProps } from "@/lib/use-hydrated";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cherry";
const OUTLINE =
  "border-2 border-ink/25 px-4 py-2 text-ink hover:border-cherry disabled:cursor-wait disabled:opacity-60";
const LINK = "px-1 text-espresso hover:text-cherry";

/**
 * Every "send or share" surface (planner result, Tonight, saved plan, shopping list, quiz result,
 * article, hobby page) renders this. Two buttons, same labels everywhere:
 *   "Send to the group chat": native share sheet with title, text and canonical URL, else copies
 *   the text and says "Copied" on the button and in the status line.
 *   "Copy link" (or `copyLabel`): copies `copyValue`, by default the canonical URL.
 * No calendar, no network call from our code.
 */
export function ShareActions({
  title,
  text,
  url,
  textIncludesUrl,
  copyLabel,
  copyValue,
  variant = "outline",
  disabled,
  extra,
  prepareFiles,
  onShare,
  className,
}: {
  title: string;
  text: string;
  /** Canonical absolute URL (from canonicalUrl). */
  url?: string;
  textIncludesUrl?: boolean;
  /** Defaults to "Copy link" when there is a url, else "Copy list". */
  copyLabel?: string;
  /** What the copy button copies. Defaults to the url, else the text. */
  copyValue?: string;
  variant?: "outline" | "link";
  disabled?: boolean;
  /** More actions (for example Pin it) rendered in the same row. */
  extra?: ReactNode;
  /** Optional: files to offer to the share sheet (the quiz result card). */
  prepareFiles?: () => Promise<File[] | undefined>;
  onShare?: (action: "send" | "copy", outcome: ShareOutcome) => void;
  className?: string;
}) {
  const hydrated = useHydrated();
  const wait = waitingProps(hydrated);
  const [copied, setCopied] = useState<"" | "send" | "copy">("");
  const [note, setNote] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const flash = (which: "" | "send" | "copy", msg: string) => {
    setCopied(which);
    setNote(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setCopied("");
      setNote("");
    }, 2500);
  };
  const send = async () => {
    const files = prepareFiles ? await prepareFiles().catch(() => undefined) : undefined;
    const out = await sendToGroupChat({
      title,
      text,
      ...(url ? { url } : {}),
      ...(textIncludesUrl ? { textIncludesUrl } : {}),
      ...(files ? { files } : {}),
    });
    onShare?.("send", out);
    flash(out === "copied" ? "send" : "", outcomeMessage[out]);
  };
  const label = copyLabel ?? (url ? "Copy link" : "Copy list");
  const copy = async () => {
    const ok = await copyText(copyValue ?? url ?? text);
    onShare?.("copy", ok ? "copied" : "failed");
    flash(ok ? "copy" : "", ok ? "Copied." : outcomeMessage.failed);
  };
  const base = cn(
    "inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold",
    FOCUS,
    variant === "outline" ? OUTLINE : LINK,
  );
  return (
    <div
      className={cn(
        "no-print flex flex-wrap items-center",
        variant === "outline" ? "gap-2" : "gap-x-4",
        className,
      )}
    >
      <button type="button" onClick={send} disabled={disabled} {...wait} className={base}>
        {copied === "send" ? (
          <Check className="h-4 w-4" aria-hidden />
        ) : (
          <Send className="h-4 w-4" aria-hidden />
        )}
        {copied === "send" ? "Copied" : "Send to the group chat"}
      </button>
      <button type="button" onClick={copy} disabled={disabled} {...wait} className={base}>
        {copied === "copy" ? (
          <Check className="h-4 w-4" aria-hidden />
        ) : (
          <Copy className="h-4 w-4" aria-hidden />
        )}
        {copied === "copy" ? "Copied" : label}
      </button>
      {extra}
      <span
        role="status"
        aria-live="polite"
        className="w-full text-xs text-muted-foreground empty:hidden"
      >
        {note}
      </span>
    </div>
  );
}
