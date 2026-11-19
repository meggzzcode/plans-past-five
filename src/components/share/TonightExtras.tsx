import { useCallback } from "react";
import type { Suggestion } from "@/lib/tonight";
import { canonicalUrl } from "@/lib/share";
import { eventFromSuggestion, type CalendarPresetId } from "@/lib/ics";
import { nearTermFor } from "@/lib/near";
import { AddToCalendar } from "./AddToCalendar";
import { NearLink } from "./Near";

/** Add to calendar (default: this evening) and a "near you" search link for one Tonight pick. */
export function TonightExtras({ s, href }: { s: Suggestion; href: string }) {
  const url = canonicalUrl(href);
  const build = useCallback(
    (preset: CalendarPresetId, now: Date) => [eventFromSuggestion(s, preset, now, url)],
    [s, url],
  );
  const term = s.id.startsWith("idea:")
    ? nearTermFor({ activityId: s.id.slice("idea:".length) })
    : s.hobbySlug
      ? nearTermFor({ hobbySlug: s.hobbySlug })
      : null;
  return (
    <div className="mt-2 flex flex-wrap items-start gap-x-4">
      <AddToCalendar title={s.title} build={build} defaultPreset="this-evening" />
      <NearLink term={term} />
    </div>
  );
}
