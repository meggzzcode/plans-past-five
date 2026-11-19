import { Link } from "@tanstack/react-router";
import { WordmarkStacked } from "@/components/brand/Wordmark";
import { Star } from "@/components/brand/Doodles";
import { site } from "@/config/site";
import { footerNav, SITEMAP_HREF } from "@/components/layout/nav";
import { PublishedBy } from "@/components/layout/PublishedBy";

export function Footer() {
  return (
    <footer className="no-print mt-16 bg-garden md:mt-24 text-cream">
      <div className="gingham-strip" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.3fr_2fr] md:px-8">
        <div>
          <div className="text-6xl [&_*]:!text-cream">
            <WordmarkStacked />
          </div>
          <p className="mt-5 font-display text-xl italic text-butter">{site.tagline}</p>
          <p className="mt-3 max-w-xs text-sm text-cream/80">{site.mission}</p>
        </div>
        <nav aria-label="Footer">
          <h2 className="kicker mb-4 font-sans text-butter">About the site</h2>
          <ul className="grid grid-cols-2 gap-x-6 sm:grid-cols-3">
            {footerNav.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="inline-flex min-h-11 min-w-11 items-center text-sm text-cream/90 hover:text-butter hover:underline"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={SITEMAP_HREF}
                className="inline-flex min-h-11 min-w-11 items-center text-sm text-cream/90 hover:text-butter hover:underline"
              >
                Sitemap
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-cream/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs text-cream/70 md:flex-row md:px-8">
          <span className="flex flex-col items-center gap-1 md:items-start">
            <span>
              © {new Date().getFullYear()} {site.name}
            </span>
            <PublishedBy className="[&_a]:underline" />
          </span>
          <span className="flex items-center gap-2">
            <Star className="h-3 w-3 text-butter" /> {site.slogan}
          </span>
        </div>
      </div>
    </footer>
  );
}
