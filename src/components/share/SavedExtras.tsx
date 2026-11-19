import { useCallback, useMemo } from "react";
import type { SavedItem } from "@/lib/saved";
import { planFromIds, sanitizePlanData } from "@/lib/planner";
import { canonicalUrl } from "@/lib/share";
import { hrefFor } from "@/lib/saved-share";
import { eventsFromPlan, type CalendarPresetId } from "@/lib/ics";
import { nearTermFor } from "@/lib/near";
import { AddToCalendar } from "./AddToCalendar";
import { NearLink } from "./Near";

/** Add to calendar for a saved itinerary, and "near you" links for its stops and saved hobbies. */
export function SavedExtras({ item }: { item: SavedItem }) {
  const plan = useMemo(() => {
    if (item.kind !== "plan" || !item.plan) return null;
    const data = sanitizePlanData(item.plan);
    return data ? planFromIds(data.input, data.seed, data.ids) : null;
  }, [item]);
  const url = canonicalUrl(hrefFor(item));
  const build = useCallback(
    (preset: CalendarPresetId, now: Date) => (plan ? eventsFromPlan(plan, preset, now, url) : []),
    [plan, url],
  );
  const terms = useMemo(() => {
    const out: (string | null)[] = [];
    if (plan) {
      for (const s of plan.slots)
        if (s.activity) out.push(nearTermFor({ activityId: s.activity.id }));
    } else if (item.kind === "hobby") {
      out.push(nearTermFor({ hobbySlug: item.key.replace(/^hobby:/, "") }));
    } else if (item.key.startsWith("idea:")) {
      out.push(nearTermFor({ activityId: item.key.slice("idea:".length) }));
    }
    return [...new Set(out.filter((t): t is string => !!t))];
  }, [plan, item]);
  if (!plan && terms.length === 0) return null;
  return (
    <div className="mt-1 flex flex-wrap items-start gap-x-4">
      {plan && <AddToCalendar title={item.title} build={build} />}
      {terms.map((t) => (
        <NearLink key={t} term={t} />
      ))}
    </div>
  );
}
