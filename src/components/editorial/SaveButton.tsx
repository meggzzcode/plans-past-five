import { Bookmark, BookmarkCheck, Heart } from "lucide-react";
import { useSaved, type SavedItem } from "@/lib/saved";
import { cn } from "@/lib/utils";

export function SaveButton({
  item,
  className,
  compact,
}: {
  item: Omit<SavedItem, "savedAt">;
  className?: string;
  compact?: boolean;
}) {
  const { isSaved, toggle, ready } = useSaved();
  const saved = ready && isSaved(item.key);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(item);
      }}
      aria-pressed={saved}
      aria-label={
        compact
          ? saved
            ? `Remove ${item.title} from My Plans`
            : `Save ${item.title} to My Plans`
          : `${saved ? "Saved to My Plans" : "Save to My Plans"}: ${item.title}`
      }
      className={cn(
        "no-print inline-flex items-center gap-1.5 text-sm font-semibold transition",
        compact
          ? "grid h-11 w-11 place-items-center rounded-full md:h-9 md:w-9 bg-cream/95 text-cherry shadow hover:scale-105"
          : "relative border-b-2 border-cherry pb-0.5 text-cherry after:absolute after:inset-x-0 after:-inset-y-2.5 after:content-[''] hover:border-transparent",
        className,
      )}
    >
      {item.kind === "hobby" ? (
        <Heart className={cn("h-4 w-4", saved && "fill-current")} aria-hidden />
      ) : saved ? (
        <BookmarkCheck className="h-4 w-4" />
      ) : (
        <Bookmark className="h-4 w-4" />
      )}
      {!compact && (saved ? "Saved to My Plans" : "Save to My Plans")}
    </button>
  );
}
