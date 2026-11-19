import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Search, Heart } from "lucide-react";
import { WordmarkInline } from "@/components/brand/Wordmark";
import { Star } from "@/components/brand/Doodles";
import { site } from "@/config/site";
import { useSaved } from "@/lib/saved";
import {
  finePrintNav,
  isFindAHobbyPath,
  NAMES,
  primaryNav,
  topNav,
  type NavItem,
} from "@/components/layout/nav";

const ACTIVE = "data-[status=active]:text-cherry";

function MenuLink({ n, onNavigate }: { n: NavItem; onNavigate: () => void }) {
  return (
    <Link
      to={n.to}
      onClick={onNavigate}
      className={`flex min-h-11 items-center gap-3 rounded-sm px-2 py-2 text-ink hover:bg-strawberry/50 hover:text-cherry ${ACTIVE} data-[status=active]:bg-strawberry/60`}
    >
      <n.Icon className="h-5 w-5 shrink-0 text-cherry" />
      <span className="font-display text-lg leading-tight">{n.label}</span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { items, ready } = useSaved();
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  const close = () => setOpen(false);
  return (
    <header className="no-print sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="bg-cherry px-4 py-1.5 text-center text-[0.72rem] font-medium tracking-[0.14em] uppercase text-cream">
        <Star className="mr-2 inline h-3 w-3 align-[-1px]" />
        {site.signature}
        <Star className="ml-2 inline h-3 w-3 align-[-1px]" />
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-2 sm:gap-4 sm:px-5 md:px-8">
        <Link
          to="/"
          className="inline-flex min-h-11 shrink-0 items-center text-[1.02rem] min-[380px]:text-[1.15rem] md:text-[1.3rem]"
        >
          <WordmarkInline className="whitespace-nowrap" />
          <span className="sr-only"> home</span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {topNav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`inline-flex min-h-11 items-center text-sm font-medium text-espresso decoration-cherry decoration-2 underline-offset-[6px] hover:text-cherry hover:underline ${ACTIVE} data-[status=active]:underline ${n.to === "/hobbies" && isFindAHobbyPath(pathname) ? "text-cherry underline" : ""}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center">
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
            className="relative grid h-11 w-11 place-items-center text-espresso hover:text-cherry data-[status=active]:text-cherry"
            aria-label={NAMES.saved}
          >
            <Heart className="h-5 w-5" />
            {ready && items.length > 0 && (
              <span className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-cherry px-1 text-[0.6rem] font-bold text-cream">
                {items.length}
              </span>
            )}
          </Link>
          <button
            className="grid h-11 w-11 place-items-center text-espresso lg:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div
          id="mobile-menu"
          className="max-h-[calc(100dvh-6.5rem)] overflow-y-auto border-t border-border bg-cream px-3 pb-6 pt-4 lg:hidden"
        >
          <nav aria-label="Mobile">
            <ul>
              {primaryNav.map((n) => (
                <li key={n.to}>
                  <MenuLink n={n} onNavigate={close} />
                </li>
              ))}
            </ul>
            <ul
              aria-label="Fine print"
              className="mt-4 flex flex-wrap gap-x-4 border-t border-border px-2 pt-3 text-sm text-espresso"
            >
              {finePrintNav.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    onClick={close}
                    className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-cherry"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
