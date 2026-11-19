import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Search, Bookmark } from "lucide-react";
import { WordmarkInline } from "@/components/brand/Wordmark";
import { Star } from "@/components/brand/Doodles";
import { site } from "@/config/site";
import { useSaved } from "@/lib/saved";

export const nav = [
  { to: "/hobbies", label: "Find a Hobby" },
  { to: "/after-hours", label: "After Hours" },
  { to: "/weekends", label: "Weekends" },
  { to: "/journal", label: "The Journal" },
  { to: "/shop", label: "The Shop" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const { items, ready } = useSaved();
  return (
    <header className="no-print sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="bg-cherry px-4 py-1.5 text-center text-[0.72rem] font-medium tracking-[0.14em] uppercase text-cream">
        <Star className="mr-2 inline h-3 w-3 align-[-1px]" />
        {site.signature}
        <Star className="ml-2 inline h-3 w-3 align-[-1px]" />
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 md:px-8">
        <Link to="/" className="inline-flex min-h-11 items-center text-[1.15rem] md:text-[1.3rem]">
          <WordmarkInline />
          <span className="sr-only"> home</span>
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm font-medium text-espresso decoration-cherry decoration-2 underline-offset-[6px] hover:text-cherry hover:underline"
              activeProps={{ className: "text-cherry underline" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <Link
            to="/search"
            search={{ q: "" }}
            className="grid h-11 w-11 place-items-center text-espresso hover:text-cherry"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Link>
          <Link
            to="/saved"
            className="relative grid h-11 w-11 place-items-center text-espresso hover:text-cherry"
            aria-label="My Plans"
          >
            <Bookmark className="h-5 w-5" />
            {ready && items.length > 0 && (
              <span className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-cherry px-1 text-[0.6rem] font-bold text-cream">
                {items.length}
              </span>
            )}
          </Link>
          <Link
            to="/hobby-finder"
            className="ml-2 hidden border-2 border-cherry bg-cherry px-4 py-2 text-sm font-semibold text-cream transition hover:bg-transparent hover:text-cherry md:inline-block"
          >
            Find Your Thing
          </Link>
          <button
            className="grid h-11 w-11 place-items-center text-espresso lg:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border bg-cream px-5 pb-8 pt-4 lg:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {[
              ...nav,
              { to: "/hobby-finder", label: "Find Your Thing" },
              { to: "/make-plans", label: "Let's Make Plans" },
              { to: "/saved", label: "My Plans" },
            ].map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="border-b border-border py-3.5 font-display text-2xl text-ink hover:text-cherry hover:italic"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <p className="hand mt-6 text-2xl text-cherry">{site.slogan}</p>
        </div>
      )}
    </header>
  );
}
