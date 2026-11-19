import { Link } from "@tanstack/react-router";
import { WordmarkStacked } from "@/components/brand/Wordmark";
import { Star } from "@/components/brand/Doodles";
import { site } from "@/config/site";
import { categories } from "@/data/categories";
import { NAMES } from "@/components/layout/nav";
import { PublishedBy } from "@/components/layout/PublishedBy";
import { trustLinks } from "@/config/trust-links";

export function Footer() {
  return (
    <footer className="no-print mt-16 bg-garden md:mt-24 text-cream">
      <div className="gingham-strip" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:px-8">
        <div className="col-span-2 md:col-span-1">
          <div className="text-6xl [&_*]:!text-cream">
            <WordmarkStacked />
          </div>
          <p className="mt-5 font-display text-xl italic text-butter">{site.tagline}</p>
          <p className="mt-3 max-w-xs text-sm text-cream/80">{site.mission}</p>
          <Link
            to="/hobby-finder"
            className="mt-5 inline-flex min-h-11 items-center bg-cream px-5 text-sm font-semibold text-garden transition hover:bg-butter"
          >
            Find your thing
          </Link>
        </div>
        <FooterCol
          title="Plans"
          links={[...categories.map((c) => ({ to: `/${c.slug}`, label: c.name }))]}
        />
        <FooterCol
          title="Try it"
          links={[
            { to: "/start-here", label: "Start Here" },
            { to: "/hobby-finder", label: NAMES.quiz },
            { to: "/make-plans", label: NAMES.plans },
            { to: "/shop", label: NAMES.shop },
            { to: "/tools/tonight", label: NAMES.tonight },
            { to: "/tools/hobby-budget", label: "Hobby Starter Budget" },
            { to: "/hobbies", label: NAMES.hobbies },
            { to: "/saved", label: NAMES.saved },
          ]}
        />
        <FooterCol
          title="About the site"
          links={[
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
            { to: "/affiliate-disclosure", label: "Affiliate Disclosure" },
            ...trustLinks.map((l) => ({ to: l.to as string, label: l.label })),
            { to: "/privacy", label: "Privacy" },
            { to: "/terms", label: "Terms" },
          ]}
        />
      </div>
      <div className="border-t border-cream/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs text-cream/70 md:flex-row md:px-8">
          <span className="flex flex-col items-center gap-1 md:items-start">
            <span>
              © {new Date().getFullYear()} {site.name}
            </span>
            <PublishedBy className="[&_a]:underline" />
            <Link
              to="/editorial-policy"
              className="inline-flex min-h-11 items-center underline underline-offset-[3px] hover:text-butter"
            >
              {NAMES.howWeMake}
            </Link>
          </span>
          <span className="flex items-center gap-2">
            <Star className="h-3 w-3 text-butter" /> {site.slogan}
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h2 className="kicker mb-4 font-sans text-butter">{title}</h2>
      <ul className="space-y-1">
        {links.map((l) => (
          <li key={l.to}>
            <Link
              to={l.to}
              className="inline-flex min-h-11 min-w-11 items-center text-sm text-cream/90 hover:text-butter hover:underline"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
