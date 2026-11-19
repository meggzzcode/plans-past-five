import { useEffect, useMemo, useState } from "react";
import { CalendarPlus, Download, ExternalLink } from "lucide-react";
import {
  CALENDAR_PRESETS,
  buildIcs,
  describeStart,
  downloadIcs,
  googleCalendarUrl,
  icsFilename,
  type CalendarEvent,
  type CalendarPresetId,
} from "@/lib/ics";
import { cn } from "@/lib/utils";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cherry";

/**
 * "Add to calendar" for a plan or a Tonight pick. Pick "Saturday morning" or "This evening", then
 * download a .ics (opens in Apple, Google, Outlook calendars) or open a Google Calendar link. The
 * file is made in this browser; nothing is uploaded, hosted or tracked. Times are floating local
 * time, so the event lands at the clock time shown.
 */
export function AddToCalendar({
  title,
  build,
  defaultPreset = "saturday-morning",
  className,
}: {
  title: string;
  /** Events for a preset and the current time. Must be cheap and pure. */
  build: (preset: CalendarPresetId, now: Date) => CalendarEvent[];
  defaultPreset?: CalendarPresetId;
  className?: string;
}) {
  const [now, setNow] = useState<Date | null>(null);
  const [preset, setPreset] = useState<CalendarPresetId>(defaultPreset);
  const [msg, setMsg] = useState("");
  useEffect(() => setNow(new Date()), []);
  const events = useMemo(() => (now ? build(preset, now) : []), [build, preset, now]);
  if (!now || events.length === 0) return null;

  const download = () => {
    const ok = downloadIcs(icsFilename(title), buildIcs(events, new Date()));
    setMsg(ok ? "Calendar file made on this device." : "Couldn't make the file here.");
    setTimeout(() => setMsg(""), 3000);
  };
  const btn = "inline-flex min-h-11 items-center gap-1.5 px-3 text-sm font-semibold";

  return (
    <details className={cn("no-print group", className)} data-testid="add-to-calendar">
      <summary
        className={cn(
          "inline-flex min-h-11 cursor-pointer list-none items-center gap-1.5 text-sm font-semibold text-espresso hover:text-cherry [&::-webkit-details-marker]:hidden",
          FOCUS,
        )}
      >
        <CalendarPlus className="h-4 w-4" aria-hidden />
        Add to calendar
      </summary>
      <div className="mt-2 border-2 border-ink/15 bg-cream p-3">
        <fieldset>
          <legend className="kicker text-ink">When</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {CALENDAR_PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                aria-pressed={preset === p.id}
                onClick={() => setPreset(p.id)}
                className={cn(
                  "min-h-11 border-2 px-3 text-sm font-medium",
                  preset === p.id
                    ? "border-cherry bg-cherry text-cream"
                    : "border-ink/20 bg-warm-white text-ink hover:border-cherry",
                  FOCUS,
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
        </fieldset>
        <p className="mt-2 text-sm text-espresso">
          Starts {describeStart(events[0]!.start)}
          {events.length > 1 ? `, ${events.length} stops` : ""}. Edit the time in your calendar.
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-x-3">
          <button
            type="button"
            onClick={download}
            className={cn(btn, "bg-cherry text-cream hover:bg-ink", FOCUS)}
          >
            <Download className="h-4 w-4" aria-hidden />
            Download .ics
          </button>
          {events.length === 1 && (
            <a
              href={googleCalendarUrl(events[0]!)}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(btn, "text-ink underline underline-offset-4 hover:text-cherry", FOCUS)}
            >
              Google Calendar
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </div>
        {events.length > 1 && (
          <div className="mt-1">
            <p className="text-sm text-espresso">Google Calendar takes one event at a time:</p>
            <ul className="mt-1 flex flex-wrap gap-x-4">
              {events.map((e) => (
                <li key={e.summary + e.start.getTime()}>
                  <a
                    href={googleCalendarUrl(e)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-ink underline underline-offset-4 hover:text-cherry",
                      FOCUS,
                    )}
                  >
                    {e.summary}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    <span className="sr-only"> (opens Google Calendar in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        <p className="mt-1 text-xs text-muted-foreground">
          Built on this device. Nothing is uploaded or tracked.
        </p>
        <p role="status" aria-live="polite" className="min-h-4 text-xs font-medium text-garden">
          {msg}
        </p>
      </div>
    </details>
  );
}
