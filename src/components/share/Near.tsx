import { useEffect, useState } from "react";
import { ExternalLink, MapPin } from "lucide-react";
import { mapsSearchUrl, sanitizePlace, useNearPlace } from "@/lib/near";
import { cn } from "@/lib/utils";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cherry";

/**
 * Stage 3a: the postcode box is no longer shown on any page (an unrequested extra for a first-time
 * visitor). The component, its library and its tests are intact. To bring it back, set this to true.
 */
export const SHOW_NEAR_BOX = false;

/**
 * Optional town or postcode box. Kept in this browser's localStorage only; it is never sent to us.
 * It only builds Google Maps search links that open in a new tab.
 */
export function NearBox({ className }: { className?: string }) {
  const { place, ready, setPlace, clear } = useNearPlace();
  const [draft, setDraft] = useState("");
  useEffect(() => setDraft(place), [place]);
  if (!ready) return null;
  const dirty = sanitizePlace(draft) !== place;
  return (
    <form
      className={cn("no-print border-2 border-dashed border-ink/25 p-3", className)}
      data-testid="near-box"
      onSubmit={(e) => {
        e.preventDefault();
        setPlace(draft);
      }}
    >
      <label htmlFor="near-place" className="kicker flex items-center gap-1.5 text-ink">
        <MapPin className="h-3.5 w-3.5 text-cherry" aria-hidden />
        Find it near you (optional)
      </label>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <input
          id="near-place"
          type="text"
          inputMode="text"
          autoComplete="off"
          maxLength={60}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Town or postcode"
          className={cn(
            "min-h-11 w-full max-w-xs border-2 border-ink/25 bg-warm-white px-3 text-base text-ink",
            FOCUS,
          )}
        />
        <button
          type="submit"
          disabled={!dirty}
          className={cn(
            "inline-flex min-h-11 items-center bg-cherry px-4 text-sm font-semibold text-cream hover:bg-ink disabled:opacity-50",
            FOCUS,
          )}
        >
          {place && !draft.trim() ? "Clear" : "Use this"}
        </button>
        {place && (
          <button
            type="button"
            onClick={() => {
              clear();
              setDraft("");
            }}
            className={cn("min-h-11 px-2 text-sm font-semibold text-ink underline", FOCUS)}
          >
            Forget it
          </button>
        )}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Stays on this device. We never see it. It only builds Google Maps search links that open in
        a new tab. No location permission is asked for.
      </p>
    </form>
  );
}

/** One "search Google Maps near me" link. Renders nothing until a place is set. */
export function NearLink({ term, className }: { term: string | null; className?: string }) {
  const { place, ready } = useNearPlace();
  if (!ready || !place || !term) return null;
  return (
    <a
      href={mapsSearchUrl(term, place)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "no-print inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-ink underline underline-offset-4 hover:text-cherry",
        FOCUS,
        className,
      )}
      data-testid="near-link"
    >
      <MapPin className="h-3.5 w-3.5 text-cherry" aria-hidden />
      Search {term} near {place}
      <ExternalLink className="h-3 w-3" aria-hidden />
      <span className="sr-only"> (opens Google Maps in a new tab)</span>
    </a>
  );
}
