import { planFromIds, planSummary, sanitizePlanData } from "@/lib/planner";
import type { SavedItem } from "@/lib/saved";

/** "Nov 19, 2026" from a stored ISO timestamp, or null when it is not a real date. */
export function savedDateLabel(savedAt: string): string | null {
  const d = new Date(savedAt);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

/** The cost range and length for a saved plan, from the exact itinerary it restores. Null otherwise. */
export function savedPlanLine(i: SavedItem): string | null {
  if (i.kind !== "plan" || !i.plan) return null;
  const data = sanitizePlanData(i.plan);
  const plan = data ? planFromIds(data.input, data.seed, data.ids) : null;
  if (!plan || plan.filled === 0) return null;
  return planSummary(plan);
}

/** One quiet line under a saved item's title: what it costs (plans) and when it was saved. */
export function SavedMeta({ item }: { item: SavedItem }) {
  const line = savedPlanLine(item);
  const date = savedDateLabel(item.savedAt);
  if (!line && !date) return null;
  return (
    <p className="text-xs font-medium text-espresso" data-testid="saved-meta">
      {line && (
        <span data-testid="saved-cost">
          {line} <span className="font-normal text-muted-foreground">(rough estimate)</span>
        </span>
      )}
      {line && date && <span aria-hidden> · </span>}
      {date && <span data-testid="saved-date">Saved {date}</span>}
    </p>
  );
}
