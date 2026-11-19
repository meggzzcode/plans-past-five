import { beforeEach, describe, expect, it } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import path from "node:path";
import { activities } from "@/data/activities";
import { nearTermsByActivity } from "@/data/near-terms";
import { MAX_PLACE_LENGTH, mapsSearchUrl, nearTermFor, sanitizePlace } from "@/lib/near";
import { NearBox, NearLink } from "@/components/share/Near";

describe("near-me helpers", () => {
  it("sanitises what is typed", () => {
    expect(sanitizePlace("  SW1A   1AA ")).toBe("SW1A 1AA");
    expect(sanitizePlace("Bath <script>alert(1)</script>")).not.toMatch(/[<>()]/);
    expect(sanitizePlace("St. John's, NY")).toBe("St. John's, NY");
    expect(sanitizePlace("x".repeat(200))).toHaveLength(MAX_PLACE_LENGTH);
    expect(sanitizePlace(42)).toBe("");
  });
  it("builds a Google Maps search URL: keywords near place", () => {
    const u = new URL(mapsSearchUrl("pottery class", "SW1A 1AA"));
    expect(u.origin + u.pathname).toBe("https://www.google.com/maps/search/");
    expect(u.searchParams.get("api")).toBe("1");
    expect(u.searchParams.get("query")).toBe("pottery class near SW1A 1AA");
  });
  it("maps only real activities that are done out, and never home ones", () => {
    for (const id of Object.keys(nearTermsByActivity)) {
      const a = activities.find((x) => x.id === id);
      expect(a, id).toBeDefined();
      expect(a!.home, `${id} is at home`).toBe(false);
    }
    for (const a of activities.filter((x) => x.home))
      expect(nearTermFor({ activityId: a.id })).toBeNull();
    expect(nearTermFor({ hobbySlug: "tennis" })).toBe("public tennis courts");
    expect(nearTermFor({ hobbySlug: "no-such" })).toBeNull();
  });
  it("never calls the geolocation API or sends the place anywhere", () => {
    for (const f of ["src/lib/near.ts", "src/components/share/Near.tsx"]) {
      const src = readFileSync(path.resolve(__dirname, "../..", f), "utf8");
      expect(src).not.toMatch(
        /navigator\.geolocation|getCurrentPosition|watchPosition|fetch\(|sendBeacon|XMLHttpRequest/,
      );
    }
  });
});

describe("NearBox and NearLink", () => {
  beforeEach(() => window.localStorage.clear());
  it("keeps the place in localStorage only, says so, and links open in a new tab", async () => {
    render(
      <>
        <NearBox />
        <NearLink term="public tennis courts" />
      </>,
    );
    expect(await screen.findByText(/Stays on this device/)).toBeInTheDocument();
    expect(screen.queryByTestId("near-link")).toBeNull();
    fireEvent.change(screen.getByLabelText(/Find it near you/), { target: { value: "Bath" } });
    await act(async () => {
      fireEvent.submit(screen.getByTestId("near-box"));
    });
    expect(window.localStorage.getItem("ppf:near-place:v1")).toBe("Bath");
    const a = (await screen.findByTestId("near-link")) as HTMLAnchorElement;
    expect(a.target).toBe("_blank");
    expect(a.rel).toBe("noopener noreferrer");
    expect(new URL(a.href).searchParams.get("query")).toBe("public tennis courts near Bath");
    await act(async () => {
      fireEvent.click(screen.getByText("Forget it"));
    });
    expect(window.localStorage.getItem("ppf:near-place:v1")).toBeNull();
    expect(screen.queryByTestId("near-link")).toBeNull();
  });
});
