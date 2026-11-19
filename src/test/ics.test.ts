import { describe, expect, it } from "vitest";
import {
  buildIcs,
  eventFromSuggestion,
  eventsFromPlan,
  foldLine,
  formatFloating,
  googleCalendarUrl,
  icsEscape,
  icsFilename,
  presetStart,
  scheduleItems,
  type CalendarEvent,
} from "@/lib/ics";
import { DEFAULT_INPUT, makePlan } from "@/lib/planner";

type Prop = { name: string; value: string };
type Node = { type: string; props: Prop[]; children: Node[] };

/** Minimal RFC 5545 reader: unfold, split into components and properties, unescape TEXT. */
function parseIcs(text: string): Node {
  expect(text.endsWith("\r\n")).toBe(true);
  expect(text.replace(/\r\n/g, "")).not.toMatch(/[\r\n]/);
  const unfolded = text
    .replace(/\r\n[ \t]/g, "")
    .split("\r\n")
    .filter(Boolean);
  const root: Node = { type: "ROOT", props: [], children: [] };
  const stack = [root];
  for (const line of unfolded) {
    const i = line.indexOf(":");
    const name = line.slice(0, i);
    const value = line.slice(i + 1);
    if (name === "BEGIN") {
      const n: Node = { type: value, props: [], children: [] };
      stack.at(-1)!.children.push(n);
      stack.push(n);
    } else if (name === "END") {
      expect(stack.pop()!.type).toBe(value);
    } else stack.at(-1)!.props.push({ name, value });
  }
  expect(stack).toHaveLength(1);
  return root.children[0]!;
}
const prop = (n: Node, name: string) => n.props.find((p) => p.name === name)?.value;
const unescape = (v: string) => v.replace(/\\n/gi, "\n").replace(/\\([;,\\])/g, "$1");

const NOW = new Date(2026, 10, 19, 14, 5); // Thursday 19 Nov 2026, local

describe("icsEscape and foldLine", () => {
  it("escapes backslash, semicolon, comma and newlines", () => {
    expect(icsEscape("a\\b;c,d\ne\r\nf")).toBe("a\\\\b\\;c\\,d\\ne\\nf");
  });
  it("folds at 75 octets without splitting characters, and unfolds back", () => {
    const long = "Café ☕ ".repeat(40);
    const folded = foldLine(`SUMMARY:${long}`);
    for (const part of folded.split("\r\n")) {
      expect(new TextEncoder().encode(part).length).toBeLessThanOrEqual(75);
    }
    expect(folded.replace(/\r\n /g, "")).toBe(`SUMMARY:${long}`);
    expect(foldLine("SHORT:line")).toBe("SHORT:line");
  });
});

describe("buildIcs", () => {
  const events: CalendarEvent[] = [
    {
      summary: "Paint-your-own pottery, with a friend; bring snacks",
      description:
        "Line one\nLine two, with a comma; and a semicolon \\ backslash " + "x".repeat(120),
      start: new Date(2026, 10, 21, 10, 0),
      minutes: 90,
      url: "https://planspastfive.com/make-plans?when=saturday",
    },
    { summary: "Walk", start: new Date(2026, 10, 21, 12, 0), minutes: 45 },
  ];
  const cal = parseIcs(buildIcs(events, new Date(Date.UTC(2026, 10, 19, 14, 5, 0))));

  it("is a valid calendar with one VEVENT per activity", () => {
    expect(cal.type).toBe("VCALENDAR");
    expect(prop(cal, "VERSION")).toBe("2.0");
    expect(prop(cal, "PRODID")).toContain("Plans Past Five");
    const vevents = cal.children.filter((c) => c.type === "VEVENT");
    expect(vevents).toHaveLength(2);
  });
  it("writes floating local times (no Z, no TZID) and a UTC DTSTAMP", () => {
    const [e] = cal.children;
    expect(e!.props.find((p) => p.name.startsWith("DTSTART"))!.name).toBe("DTSTART");
    expect(prop(e!, "DTSTART")).toBe("20261121T100000");
    expect(prop(e!, "DTEND")).toBe("20261121T113000");
    expect(prop(e!, "DTSTAMP")).toBe("20261119T140500Z");
    expect(prop(cal.children[1]!, "DTEND")).toBe("20261121T124500");
  });
  it("round-trips escaped text", () => {
    const e = cal.children[0]!;
    expect(unescape(prop(e, "SUMMARY")!)).toBe(events[0]!.summary);
    expect(unescape(prop(e, "DESCRIPTION")!)).toBe(events[0]!.description);
    expect(prop(e, "URL")).toBe(events[0]!.url);
  });
  it("gives every event a stable, unique UID and a reminder", () => {
    const uids = cal.children.map((e) => prop(e, "UID")!);
    expect(new Set(uids).size).toBe(2);
    expect(uids[0]).toMatch(/^[0-9a-f]{16}@planspastfive\.com$/);
    const again = parseIcs(buildIcs(events, new Date()));
    expect(again.children.map((e) => prop(e, "UID"))).toEqual(uids);
    const alarm = cal.children[0]!.children[0]!;
    expect(alarm.type).toBe("VALARM");
    expect(prop(alarm, "TRIGGER")).toBe("-PT1H");
  });
});

describe("presets", () => {
  it("Saturday morning is the next Saturday at 10:00", () => {
    const p = presetStart("saturday-morning", NOW);
    expect(
      formatFloating(
        new Date(p.day.getFullYear(), p.day.getMonth(), p.day.getDate(), 0, p.startMinutes),
      ),
    ).toBe("20261121T100000");
  });
  it("on a Saturday, before 10:00 it means today, after 10:00 next week", () => {
    expect(presetStart("saturday-morning", new Date(2026, 10, 21, 8, 0)).day.getDate()).toBe(21);
    expect(presetStart("saturday-morning", new Date(2026, 10, 21, 11, 0)).day.getDate()).toBe(28);
  });
  it("This evening is 18:00 today, then the next half hour, then tomorrow", () => {
    expect(presetStart("this-evening", NOW)).toMatchObject({ startMinutes: 18 * 60 });
    expect(presetStart("this-evening", new Date(2026, 10, 19, 18, 10))).toMatchObject({
      startMinutes: 19 * 60,
    });
    const late = presetStart("this-evening", new Date(2026, 10, 19, 21, 30));
    expect(late.day.getDate()).toBe(20);
    expect(late.startMinutes).toBe(18 * 60);
  });
  it("keeps the gaps between stops and handles Sunday", () => {
    const d = scheduleItems(
      [
        { dayIndex: 0, startMinutes: 9 * 60 },
        { dayIndex: 0, startMinutes: 13 * 60 },
        { dayIndex: 1, startMinutes: 10 * 60 },
      ],
      "saturday-morning",
      NOW,
    );
    expect(d.map(formatFloating)).toEqual([
      "20261121T100000",
      "20261121T140000",
      "20261122T110000",
    ]);
  });
});

describe("plans and Tonight picks", () => {
  it("makes one event per planned activity inside the chosen preset", () => {
    const plan = makePlan({ ...DEFAULT_INPUT, when: "saturday", length: "full-day" }, 0);
    expect(plan.filled).toBeGreaterThan(1);
    const evs = eventsFromPlan(
      plan,
      "saturday-morning",
      NOW,
      "https://planspastfive.com/make-plans",
    );
    expect(evs).toHaveLength(plan.filled);
    expect(formatFloating(evs[0]!.start)).toBe("20261121T100000");
    for (let i = 1; i < evs.length; i++)
      expect(evs[i]!.start.getTime()).toBeGreaterThan(evs[i - 1]!.start.getTime());
    const ics = parseIcs(buildIcs(evs, NOW));
    expect(ics.children).toHaveLength(plan.filled);
    expect(unescape(prop(ics.children[0]!, "SUMMARY")!)).toBe(
      plan.slots.find((s) => s.activity)!.activity!.name,
    );
  });
  it("puts a weekend plan's Sunday stops on the Sunday", () => {
    const plan = makePlan({ ...DEFAULT_INPUT, when: "weekend", length: "full-day" }, 0);
    const evs = eventsFromPlan(plan, "saturday-morning", NOW);
    const days = new Set(evs.map((e) => e.start.getDate()));
    expect(days.has(21)).toBe(true);
    if (plan.slots.some((s) => s.day === "Sunday" && s.activity)) expect(days.has(22)).toBe(true);
  });
  it("makes a single event for a Tonight pick", () => {
    const e = eventFromSuggestion(
      { title: "Café crossword", minutes: 60, firstStep: "Bring a pen." },
      "this-evening",
      NOW,
      "https://planspastfive.com/tools/tonight",
    );
    expect(formatFloating(e.start)).toBe("20261119T180000");
    expect(e.minutes).toBe(60);
  });
});

describe("googleCalendarUrl and filename", () => {
  it("builds a TEMPLATE link with floating dates", () => {
    const u = new URL(
      googleCalendarUrl({
        summary: "A & B",
        description: "d",
        start: new Date(2026, 10, 21, 10, 0),
        minutes: 60,
        url: "https://planspastfive.com/x",
      }),
    );
    expect(u.origin + u.pathname).toBe("https://calendar.google.com/calendar/render");
    expect(u.searchParams.get("action")).toBe("TEMPLATE");
    expect(u.searchParams.get("text")).toBe("A & B");
    expect(u.searchParams.get("dates")).toBe("20261121T100000/20261121T110000");
    expect(u.searchParams.get("details")).toContain("https://planspastfive.com/x");
  });
  it("makes a safe file name", () => {
    expect(icsFilename("Solo Saturday: café & clay!")).toBe("solo-saturday-caf-clay.ics");
    expect(icsFilename("???")).toBe("plan.ics");
  });
});
