import { Bookmark, BookmarkCheck } from "lucide-react";
import { useSaved, type SavedItem } from "@/lib/saved";
import { cn } from "@/lib/utils";

export function SaveButton({ item, className, compact }: { item: Omit<SavedItem, "savedAt">; className?: string; compact?: boolean }) {
  const { isSaved, toggle, ready } = useSaved();
  const saved = ready && isSaved(item.key);
  return (
    <button
      type="button"
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(item); }}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${item.title} from My Plans` : `Save ${item.title} to My Plans`}
      className={cn(
        "no-print inline-flex items-center gap-1.5 text-sm font-semibold transition",
        compact ? "grid h-9 w-9 place-items-center rounded-full bg-cream/95 text-cherry shadow hover:scale-105" : "border-b-2 border-cherry pb-0.5 text-cherry hover:border-transparent",
        className,
      )}
    >
      {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
      {!compact && (saved ? "Saved to My Plans" : "Save to My Plans")}
    </button>
  );
}
