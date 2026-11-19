import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import {
  affiliateRegistry,
  AMAZON_ASSOCIATE_STATEMENT,
  resolveProductLink,
} from "@/config/affiliate";
import { exportLinkFor, exportPageUrl } from "@/lib/export-links";
import { buildListText, SHOPLIST_KEY } from "@/lib/shoplist";
import { buildBundle, bundleToCode, bundleToJson } from "@/lib/saved-transfer";
import { savedShareText } from "@/lib/saved-share";
import { filterVerified, linkableFor, verifiedCatalog, type CatalogProduct } from "@/data/catalog";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRouter,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ShopMyHobby } from "@/components/commerce/ShopMyHobby";
import { ProductCard } from "@/components/commerce/ProductCard";

const Wrap = ({ children }: { children: ReactNode }) => {
  const root = createRootRoute({ component: () => <>{children}</> });
  const router = createRouter({
    routeTree: root,
    history: createMemoryHistory({ initialEntries: ["/"] }),
  });
  return <RouterProvider router={router} />;
};

const amazon = affiliateRegistry["amazon"]!;
const snapshot = { ...amazon };
afterEach(() => {
  Object.assign(amazon, snapshot);
  cleanup();
  window.localStorage.clear();
});
const enable = () =>
  Object.assign(amazon, {
    websiteTrackingId: "demo-20",
    approvalStatus: "approved",
    active: true,
    lastVerified: "2026-01-01",
  });

const p: CatalogProduct = {
  id: "ex-fixture",
  name: "EXPORT FIXTURE washi set",
  brand: "Test Brand",
  category: "Washi tape",
  description: "A fixture used only in tests.",
  asin: "B0EXPORT01",
  amazonUrl: "https://www.amazon.com/dp/B0EXPORT01",
  specs: [{ label: "Width", value: "15 mm" }],
  hobbies: ["junk-journaling"],
  articles: [],
  collections: [],
  kitSlots: [],
  role: "affordable",
  isEssential: true,
  audience: "Beginners",
  whySelected: "Fixture reason.",
  limitations: ["Fixture limitation."],
  researchSources: ["https://example.com/source"],
  lastVerified: "2026-01-01",
  availability: "available",
  affiliateStatus: "not-activated",
  status: "verified",
};

const BANNED = /tag=|ref=|ref_=|linkCode|ascsubtag|demo-20|utm_|Associate/i;

describe.each([
  ["disabled", () => {}],
  ["enabled", enable],
])("export links with registry %s", (mode, setup) => {
  it("on-site links follow the registry; exports never carry a tag", async () => {
    setup();
    const on = resolveProductLink(linkableFor(p)).href;
    expect(on.includes("tag=demo-20")).toBe(mode === "enabled");

    const link = exportLinkFor(p);
    expect(link.href).toBe("https://www.amazon.com/dp/B0EXPORT01");
    expect(link.href).not.toMatch(BANNED);

    const text = buildListText([p], { [p.id]: "need" }, "2026-02-03");
    expect(text).toContain(p.name);
    expect(text).toContain(exportPageUrl());
    expect(text).not.toMatch(BANNED);

    const bundle = buildBundle(
      [{ id: "x", kind: "hobby", title: "Pottery", href: "/hobbies/pottery", savedAt: 1 } as never],
      { [p.id]: "need" },
    );
    expect(bundleToJson(bundle)).not.toMatch(BANNED);
    const code = bundleToCode(bundle);
    const decoded = atob(code.slice(5).replace(/-/g, "+").replace(/_/g, "/"));
    expect(decoded).not.toMatch(BANNED);

    const shared = savedShareText({
      id: "x",
      kind: "hobby",
      title: "Pottery",
      href: "/hobbies/pottery",
      savedAt: 1,
    } as never);
    expect(`${shared.text} ${shared.url ?? ""}`).not.toMatch(BANNED);
  });

  it("printed list markup and copied text have no tag or statement; statement stays beside on-site links", async () => {
    setup();
    window.localStorage.setItem(SHOPLIST_KEY, JSON.stringify({ v: 1, items: { [p.id]: "need" } }));
    window.print = vi.fn();
    const copyMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: copyMock },
      configurable: true,
    });
    const { container } = render(
      <Wrap>
        <ShopMyHobby hobby="junk-journaling" catalog={filterVerified([p])} today="2026-02-03" />
      </Wrap>,
    );
    await act(async () => {});
    const area = document.body.querySelector(":scope > .shop-print-area")!;
    expect(area.innerHTML).not.toMatch(BANNED);
    expect(area.innerHTML).not.toContain("amazon.com");
    fireEvent.click(screen.getByRole("button", { name: /Copy my list/ }));
    await act(async () => {});
    expect(copyMock).toHaveBeenCalled();
    expect(String(copyMock.mock.calls[0]![0])).not.toMatch(BANNED);

    // On-site section: the statement appears only when live, beside on-site links.
    const onSite = container.textContent ?? "";
    expect(onSite.includes(AMAZON_ASSOCIATE_STATEMENT)).toBe(mode === "enabled");
    const hrefs = [...container.querySelectorAll("a")].map((a) => a.getAttribute("href") ?? "");
    expect(hrefs.some((h) => h.includes("tag=demo-20"))).toBe(mode === "enabled");
  });

  it("product card buy button follows the registry", () => {
    setup();
    render(<ProductCard product={p} placement="test" />);
    const a = screen.getByText(/See it on Amazon/).closest("a")!;
    expect(a.getAttribute("href")?.includes("tag=demo-20")).toBe(mode === "enabled");
  });
});

describe("no internal notes in public product cards", () => {
  const FORBIDDEN = /Cowork|not yet checked|verify|TODO|retry|candidate/i;
  it("renders no internal phrases for any shipped product", () => {
    for (const prod of verifiedCatalog) {
      const { container, unmount } = render(<ProductCard product={prod} placement="test" />);
      expect(container.textContent, prod.id).not.toMatch(FORBIDDEN);
      unmount();
    }
  });
});
