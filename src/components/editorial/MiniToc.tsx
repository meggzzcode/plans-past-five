import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { openAndScrollTo } from "@/lib/reading";
import { SHOP_ANCHOR } from "./ArticleBody";

type Section = { id: string; text: string };

/**
 * Phone-only sticky "In this story" bar. A native details element, so it opens and closes without
 * JavaScript; after hydration it also shows the section being read and opens folded sections when a
 * link points into one. The same list stays in the page for desktop (the sidebar) and for search.
 */
export function MiniToc({ sections, shop }: { sections: Section[]; shop: boolean }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const [top, setTop] = useState(88);
  const [current, setCurrent] = useState<string | null>(null);

  // Sit just under the site header, whatever height it has at this width.
  useEffect(() => {
    const header = document.querySelector("header");
    const measure = () => {
      const h = header?.getBoundingClientRect().height;
      if (h) setTop(Math.round(h));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // The last section heading that has scrolled past the top of the page.
  useEffect(() => {
    const heads = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);
    if (heads.length === 0 || typeof IntersectionObserver === "undefined") return;
    const seen = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(e.target.id, e.boundingClientRect.top < top + 80);
        const passed = heads.filter((h) => seen.get(h.id));
        setCurrent(passed.length ? passed[passed.length - 1]!.id : null);
      },
      { rootMargin: "0px 0px -100% 0px", threshold: [0, 1] },
    );
    heads.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [sections, top]);

  const go = (id: string) => (e: React.MouseEvent) => {
    if (!openAndScrollTo(id)) return;
    e.preventDefault();
    try {
      window.history.replaceState(window.history.state, "", `#${id}`);
    } catch {
      // Embedded browsers may block this: the scroll already happened.
    }
    if (ref.current) ref.current.open = false;
  };

  const now = sections.find((s) => s.id === current)?.text;
  return (
    <nav
      aria-label="In this story"
      data-mini-toc
      style={{ top }}
      className="sticky z-30 -mx-5 mb-6 border-y border-border bg-background/95 px-5 backdrop-blur-sm lg:hidden"
    >
      <details ref={ref}>
        <summary
          className={`flex min-h-11 cursor-pointer list-none items-center gap-2 text-sm [&::-webkit-details-marker]:hidden ${shop ? "pr-32" : ""}`}
        >
          <span className="kicker shrink-0 text-cherry">In this story</span>
          <span className="min-w-0 flex-1 truncate text-espresso">{now ?? ""}</span>
          <ChevronDown aria-hidden className="h-4 w-4 shrink-0 text-cherry" />
        </summary>
        <ol className="max-h-[55vh] space-y-0.5 overflow-y-auto pb-3 pt-1 text-sm">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={go(s.id)}
                aria-current={s.id === current ? "true" : undefined}
                className="flex min-h-11 items-center text-espresso hover:text-cherry aria-[current=true]:font-semibold aria-[current=true]:text-cherry"
              >
                {s.text}
              </a>
            </li>
          ))}
        </ol>
      </details>
      {shop && (
        <a
          href={`#${SHOP_ANCHOR}`}
          onClick={go(SHOP_ANCHOR)}
          className="absolute right-5 top-0 inline-flex min-h-11 items-center text-sm font-semibold text-cherry underline underline-offset-4"
        >
          Skip to shopping
        </a>
      )}
    </nav>
  );
}
