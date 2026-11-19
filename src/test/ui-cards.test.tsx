import { afterEach, describe, expect, it } from "vitest";
import { act, cleanup, render } from "@testing-library/react";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRouter,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArticleCard, CollectionCard, HobbyCard } from "@/components/cards/Cards";
import { categoryLabels, hobbies } from "@/data/hobbies";
import { collections } from "@/data/products";
import { articles } from "@/content";

const show = async (ui: ReactNode) => {
  const Wrap = () => {
    const root = createRootRoute({ component: () => <>{ui}</> });
    const router = createRouter({
      routeTree: root,
      history: createMemoryHistory({ initialEntries: ["/"] }),
    });
    return <RouterProvider router={router} />;
  };
  const r = render(<Wrap />);
  await act(async () => {});
  return r;
};

afterEach(cleanup);

const imageless = hobbies.filter((h) => !h.image);
const withImage = hobbies.filter((h) => h.image);

describe("HobbyCard fallback tile (no image)", () => {
  it("the catalogue really has image-less hobbies to cover", () => {
    expect(imageless.length).toBeGreaterThan(10);
    expect(withImage.length).toBeGreaterThan(0);
  });

  it.each(imageless.slice(0, 8).map((h) => [h.name, h] as const))(
    "%s shows its name exactly once, in the tile",
    async (_n, h) => {
      const { container } = await show(<HobbyCard h={h} />);
      const tile = container.querySelector("[data-fallback-tile]");
      expect(tile).not.toBeNull();
      expect(tile!.textContent).toBe(h.name);
      const headings = [...container.querySelectorAll("h3")];
      expect(headings).toHaveLength(1);
      expect(tile!.contains(headings[0]!)).toBe(true);
      expect(container.querySelector("img")).toBeNull();
      // The name must not be repeated anywhere else in the card's text (description may mention it).
      const link = container.querySelector("a")!;
      const kicker = link.querySelector(".kicker");
      expect(kicker!.textContent).toBe(categoryLabels[h.category]);
      expect(link.textContent!.startsWith(h.name + categoryLabels[h.category])).toBe(true);
    },
  );

  it("has no underline, overflow or clipping classes on the text", async () => {
    const { container } = await show(<HobbyCard h={imageless[0]!} />);
    const link = container.querySelector("a")!;
    const tile = container.querySelector("[data-fallback-tile]")!;
    const heading = tile.querySelector("h3")!;
    const classes = [link, tile, heading].map((e) => e.className).join(" ");
    expect(classes).not.toMatch(/(^|\s)underline(\s|$)/);
    expect(link.className).toContain("no-underline");
    expect(heading.className).toContain("no-underline");
    // Wraps and is sized to its container instead of a fixed huge size.
    expect(heading.className).toMatch(/text-balance/);
    expect(heading.className).toMatch(/break-words/);
    expect(heading.className).toMatch(/clamp\(/);
    expect(heading.className).not.toMatch(/text-[5-9]xl|whitespace-nowrap|truncate/);
    expect(heading.className).toMatch(/text-ink/);
  });

  it("opts out of running-text link styles so prose rules cannot underline it", async () => {
    const { container } = await show(<HobbyCard h={imageless[0]!} />);
    expect(container.querySelector("article")!.className).toContain("not-prose");
    expect(container.querySelector("a")!.className).toContain("not-prose");
  });

  it("is a single link with the save button outside it (no nested interactive elements)", async () => {
    const { container } = await show(<HobbyCard h={imageless[0]!} />);
    expect(container.querySelectorAll("a")).toHaveLength(1);
    expect(container.querySelector("a button")).toBeNull();
    expect(container.querySelector("a")!.getAttribute("href")).toBe(
      `/hobbies/${imageless[0]!.slug}`,
    );
  });

  it("cards with a photo keep the photo and the visible title below it", async () => {
    const h = withImage[0]!;
    const { container } = await show(<HobbyCard h={h} />);
    expect(container.querySelector("img")).not.toBeNull();
    expect(container.querySelector("[data-fallback-tile]")).toBeNull();
    expect(container.querySelectorAll("h3")).toHaveLength(1);
    expect(container.querySelector("h3")!.textContent).toBe(h.name);
  });
});

describe("other cards", () => {
  it("ArticleCard and CollectionCard are single not-prose links with an image", async () => {
    const a = articles.find((x) => x.status === "published")!;
    const c = collections[0]!;
    const { container } = await show(
      <>
        <ArticleCard a={a} />
        <CollectionCard c={c} />
      </>,
    );
    expect(container.querySelectorAll("img").length).toBe(2);
    for (const link of container.querySelectorAll("a")) {
      expect(link.className).toContain("not-prose");
      expect(link.querySelector("a")).toBeNull();
    }
  });
});
