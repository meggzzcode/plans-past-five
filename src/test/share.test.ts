import { describe, expect, it, vi } from "vitest";
import { pinterestCreateUrl, sendToGroupChat } from "@/lib/share";

describe("pinterestCreateUrl", () => {
  it("uses the standard pin-creation URL with our own page and image", () => {
    const u = new URL(
      pinterestCreateUrl({
        path: "/journal/x",
        description: "T",
        image: "/img/a.jpg",
        origin: "https://planspastfive.com",
      }),
    );
    expect(u.origin + u.pathname).toBe("https://www.pinterest.com/pin/create/button/");
    expect(u.searchParams.get("url")).toBe("https://planspastfive.com/journal/x");
    expect(u.searchParams.get("media")).toBe("https://planspastfive.com/img/a.jpg");
    expect(u.searchParams.get("description")).toBe("T");
  });
});

describe("sendToGroupChat", () => {
  const data = { title: "T", text: "hello", url: "https://x.test/p" };
  it("uses navigator.share when available", async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    expect(await sendToGroupChat(data, { share })).toBe("shared");
    expect(share).toHaveBeenCalledWith({ title: "T", text: "hello", url: "https://x.test/p" });
  });
  it("treats a closed share sheet as cancelled, not an error", async () => {
    const copy = vi.fn();
    const share = vi.fn().mockRejectedValue(Object.assign(new Error("x"), { name: "AbortError" }));
    expect(await sendToGroupChat(data, { share }, copy)).toBe("cancelled");
    expect(copy).not.toHaveBeenCalled();
  });
  it("falls back to copying when share is missing or fails", async () => {
    const copy = vi.fn().mockResolvedValue(true);
    expect(await sendToGroupChat(data, {}, copy)).toBe("copied");
    expect(copy).toHaveBeenCalledWith("hello\nhttps://x.test/p");
    const share = vi.fn().mockRejectedValue(new Error("nope"));
    expect(await sendToGroupChat(data, { share }, copy)).toBe("copied");
    expect(await sendToGroupChat(data, {}, vi.fn().mockResolvedValue(false))).toBe("failed");
  });
});
