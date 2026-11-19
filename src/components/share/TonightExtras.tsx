import type { Suggestion } from "@/lib/tonight";
import { canonicalUrl } from "@/lib/share";
import { nearTermFor } from "@/lib/near";
import { NearLink } from "./Near";

/** A "near you" search link for one Tonight pick. */
export function TonightExtras({ s, href }: { s: Suggestion; href: string }) {
  const url = canonicalUrl(href);
  const term = s.id.startsWith("idea:")
    ? nearTermFor({ activityId: s.id.slice("idea:".length) })
    : s.hobbySlug
      ? nearTermFor({ hobbySlug: s.hobbySlug })
      : null;
  return (
    <div className="mt-2 flex flex-wrap items-start gap-x-4">
      <NearLink term={term} />
    </div>
  );
}
