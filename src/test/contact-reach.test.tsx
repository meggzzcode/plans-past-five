import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, render } from "@testing-library/react";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRouter,
} from "@tanstack/react-router";

// A scratch stand-in for the site config: only contactEmail is swapped, the rest is the real one.
const state = vi.hoisted(() => ({ email: "" }));
vi.mock("@/config/site", async (orig) => {
  const actual = await orig<typeof import("@/config/site")>();
  return {
    ...actual,
    site: Object.defineProperty(Object.create(actual.site), "contactEmail", {
      get: () => state.email,
    }),
  };
});

import { ContactPage } from "@/components/pages/ContactPage";

afterEach(cleanup);

async function show() {
  const root = createRootRoute({ component: ContactPage });
  const router = createRouter({
    routeTree: root,
    history: createMemoryHistory({ initialEntries: ["/"] }),
  });
  const { container } = render(<RouterProvider router={router} />);
  await act(async () => {});
  return container;
}

describe("contact page", () => {
  it("with an address: shows it, a mailto link and the corrections contact, no placeholder", async () => {
    state.email = "hello@fake-test.example";
    const c = await show();
    const text = c.textContent ?? "";
    expect(text).toContain("hello@fake-test.example");
    const hrefs = [...c.querySelectorAll("a")].map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("mailto:hello@fake-test.example");
    expect(
      hrefs.some((h) => h?.startsWith("mailto:hello@fake-test.example?subject=Correction")),
    ).toBe(true);
    expect(text).toMatch(/How to reach us/);
    expect(text).toMatch(/Corrections/);
    expect(text).not.toMatch(/isn't open yet|won't show an address|TODO|placeholder|example\.com/i);
  });

  it("without an address: honest text, no mailto, no form, same headings", async () => {
    state.email = "";
    const c = await show();
    const text = c.textContent ?? "";
    expect(text).toMatch(/inbox isn't open yet/);
    expect(text).toMatch(/How to reach us/);
    expect(text).toMatch(/Corrections/);
    expect(c.querySelector('a[href^="mailto:"]')).toBeNull();
    expect(c.querySelector("form, input, textarea")).toBeNull();
    expect(text).not.toMatch(/@/);
  });
});
