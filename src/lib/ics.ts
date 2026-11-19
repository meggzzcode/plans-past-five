/**
 * Add to calendar. Everything is built in the browser from a plan the person already has: an
 * RFC 5545 `.ics` file (floating local time, one VEVENT per activity) and a Google Calendar
 * template link. Nothing is hosted, uploaded or tracked.
 *
 * Floating time means no `Z` and no TZID: the event lands at the clock time shown, in whatever
 * time zone the calendar app is using. The Google link format is unofficial but long stable.
 */
import { site } from "@/config/site";
import type { Plan } from "@/lib/planner";
import type { Suggestion } from "@/lib/tonight";

export type CalendarEvent = {
  summary: string;
  description?: string;
  /** Local wall-clock start (the Date's local fields are what we write). */
  start: Date;
  minutes: number;
  /** Optional page the event links back to. */
  url?: string;
  location?: string;
};

export type CalendarPresetId = "saturday-morning" | "this-evening";

export const CALENDAR_PRESETS: { id: CalendarPresetId; label: string; startMinutes: number }[] = [
  { id: "saturday-morning", label: "Saturday morning", startMinutes: 10 * 60 },
  { id: "this-evening", label: "This evening", startMinutes: 18 * 60 },
];

const pad = (n: number, w = 2) => String(n).padStart(w, "0");

/** `YYYYMMDDTHHMMSS` from the local fields: a floating time. */
export function formatFloating(d: Date): string {
  return `${pad(d.getFullYear(), 4)}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

/** `YYYYMMDDTHHMMSSZ`: DTSTAMP must be UTC. */
export function formatUtc(d: Date): string {
  return `${pad(d.getUTCFullYear(), 4)}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
}

/** RFC 5545 TEXT escaping: backslash, semicolon, comma and line breaks. */
export function icsEscape(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r\n|\r|\n/g, "\\n");
}

const encoder = typeof TextEncoder === "undefined" ? null : new TextEncoder();
const byteLength = (s: string) => (encoder ? encoder.encode(s).length : s.length);

/**
 * Folds a content line to at most 75 octets per physical line (CRLF + one space continues it),
 * never splitting a multi-byte character.
 */
export function foldLine(line: string): string {
  if (byteLength(line) <= 75) return line;
  const out: string[] = [];
  let cur = "";
  let limit = 75;
  for (const ch of line) {
    if (byteLength(cur + ch) > limit) {
      out.push(cur);
      cur = "";
      limit = 74; // the leading space of a continuation line counts as one octet
    }
    cur += ch;
  }
  if (cur) out.push(cur);
  return out.join("\r\n ");
}

/** Small stable hash (FNV-1a, two seeds) so the same event always gets the same UID. */
function stableHex(s: string): string {
  const h = (seed: number) => {
    let x = seed;
    for (let i = 0; i < s.length; i++) {
      x ^= s.charCodeAt(i);
      x = Math.imul(x, 16777619);
    }
    return (x >>> 0).toString(16).padStart(8, "0");
  };
  return h(2166136261) + h(374761393);
}

const hostOf = (): string => {
  try {
    return new URL(site.url).hostname || "planspastfive.com";
  } catch {
    return "planspastfive.com";
  }
};

export const eventEnd = (e: CalendarEvent): Date =>
  new Date(
    e.start.getFullYear(),
    e.start.getMonth(),
    e.start.getDate(),
    e.start.getHours(),
    e.start.getMinutes() + Math.max(1, Math.round(e.minutes)),
  );

export const eventUid = (e: CalendarEvent): string =>
  `${stableHex(`${e.summary}|${formatFloating(e.start)}|${e.minutes}`)}@${hostOf()}`;

/** The whole `.ics` text (CRLF line endings, folded). `now` only sets DTSTAMP. */
export function buildIcs(events: CalendarEvent[], now: Date = new Date()): string {
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${site.name}//Plans//EN`,
    "CALSCALE:GREGORIAN",
  ];
  const stamp = formatUtc(now);
  for (const e of events) {
    lines.push(
      "BEGIN:VEVENT",
      `UID:${eventUid(e)}`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${formatFloating(e.start)}`,
      `DTEND:${formatFloating(eventEnd(e))}`,
      `SUMMARY:${icsEscape(e.summary)}`,
    );
    if (e.description) lines.push(`DESCRIPTION:${icsEscape(e.description)}`);
    if (e.location) lines.push(`LOCATION:${icsEscape(e.location)}`);
    if (e.url) lines.push(`URL:${e.url}`);
    lines.push(
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      `DESCRIPTION:${icsEscape(e.summary)}`,
      "TRIGGER:-PT1H",
      "END:VALARM",
      "END:VEVENT",
    );
  }
  lines.push("END:VCALENDAR");
  return lines.map(foldLine).join("\r\n") + "\r\n";
}

/** Google Calendar "create event" link. Dates have no `Z`, so Google uses the viewer's zone. */
export function googleCalendarUrl(e: CalendarEvent): string {
  const u = new URL("https://calendar.google.com/calendar/render");
  u.searchParams.set("action", "TEMPLATE");
  u.searchParams.set("text", e.summary);
  u.searchParams.set("dates", `${formatFloating(e.start)}/${formatFloating(eventEnd(e))}`);
  const details = [e.description, e.url].filter(Boolean).join("\n\n");
  if (details) u.searchParams.set("details", details);
  if (e.location) u.searchParams.set("location", e.location);
  return u.toString();
}

/** Downloads a `.ics` file from the browser. Returns false where Blob URLs are unavailable. */
export function downloadIcs(filename: string, ics: string): boolean {
  try {
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = filename;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(href), 1000);
    return true;
  } catch {
    return false;
  }
}

export const icsFilename = (name: string): string =>
  `${
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "plan"
  }.ics`;

/* ---------- Presets and scheduling ---------- */

const midnight = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

/**
 * The day and clock time a preset means, from `now`.
 * - Saturday morning: 10:00 on the next Saturday (today if it is Saturday and before 10:00).
 * - This evening: 18:00 today; once 18:00 has passed, the next half hour that is at least 30
 *   minutes away; after 21:00, 18:00 tomorrow.
 */
export function presetStart(
  id: CalendarPresetId,
  now: Date,
): { day: Date; startMinutes: number } {
  if (id === "saturday-morning") {
    const dow = now.getDay(); // 6 = Saturday
    const nowMin = now.getHours() * 60 + now.getMinutes();
    const ahead = dow === 6 && nowMin < 10 * 60 ? 0 : (6 - dow + 7) % 7 || 7;
    return { day: addDays(midnight(now), ahead), startMinutes: 10 * 60 };
  }
  const nowMin = now.getHours() * 60 + now.getMinutes();
  if (nowMin < 18 * 60) return { day: midnight(now), startMinutes: 18 * 60 };
  const next = Math.ceil((nowMin + 30) / 30) * 30;
  if (next > 21 * 60) return { day: addDays(midnight(now), 1), startMinutes: 18 * 60 };
  return { day: midnight(now), startMinutes: next };
}

export type TimedItem = { dayIndex: number; startMinutes: number };

/**
 * Local start times for a list of items. The first item lands on the preset time; everything else
 * keeps its distance from it, so the gaps in the plan survive. `dayIndex` is 0 for Saturday (or a
 * single day) and 1 for Sunday.
 */
export function scheduleItems(items: TimedItem[], id: CalendarPresetId, now: Date): Date[] {
  if (items.length === 0) return [];
  const { day, startMinutes } = presetStart(id, now);
  const first = items[0]!;
  const shift = startMinutes - first.startMinutes;
  // Saturday morning keeps Saturday/Sunday where they are (a Sunday-only plan lands on the Sunday).
  // This evening starts on the first item's day, whichever it is.
  const base = id === "saturday-morning" ? 0 : first.dayIndex;
  return items.map(
    (it) =>
      new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDate() + it.dayIndex - base,
        0,
        it.startMinutes + shift,
      ),
  );
}

/** Events for a saved or generated plan: one per activity, titled with the activity. */
export function eventsFromPlan(
  plan: Plan,
  id: CalendarPresetId,
  now: Date,
  url?: string,
): CalendarEvent[] {
  const filled = plan.slots.filter((s) => s.activity);
  const starts = scheduleItems(
    filled.map((s) => ({ dayIndex: s.day === "Sunday" ? 1 : 0, startMinutes: s.start })),
    id,
    now,
  );
  return filled.map((s, i) => {
    const a = s.activity!;
    return {
      summary: a.name,
      description: [`${plan.title}`, `Start: ${a.prep}`, "Costs and times are rough estimates."].join(
        "\n",
      ),
      start: starts[i]!,
      minutes: span > 0 ? span : a.minutes,
      ...(url ? { url } : {}),
    };
  });
}

/** One event for a Tonight pick. */
export function eventFromSuggestion(
  s: Pick<Suggestion, "title" | "minutes" | "firstStep">,
  id: CalendarPresetId,
  now: Date,
  url?: string,
): CalendarEvent {
  const [start] = scheduleItems([{ dayIndex: 0, startMinutes: 0 }], id, now);
  return {
    summary: s.title,
    description: `First step: ${s.firstStep}\nTimes are rough estimates.`,
    start: start!,
    minutes: s.minutes,
    ...(url ? { url } : {}),
  };
}

/** Plain-English day and time for a preview line, e.g. "Saturday 21 Nov, 10:00 AM". */
export function describeStart(d: Date): string {
  const day = d.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "short" });
  const h = d.getHours();
  const ap = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${day}, ${h12}:${pad(d.getMinutes())} ${ap}`;
}
