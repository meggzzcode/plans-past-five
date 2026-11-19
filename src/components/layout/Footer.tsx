import { Link } from "@tanstack/react-router";
import { WordmarkStacked } from "@/components/brand/Wordmark";
import { Star } from "@/components/brand/Doodles";
import { site } from "@/config/site";
import { categories } from "@/data/categories";
import { trustLinks } from "@/config/trust-links";

export function Footer() {
  return (
    <footer className="no-print mt-24 bg-garden text-cream">
      <div className="gingham-strip" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:px-8">
        <div>
          <div className="text-6xl [&_*]:!text-cream">
            <WordmarkStacked />
          </div>
          <p className="mt-5 font-display text-xl italic text-butter">{site.tagline}</p>
          <p className="mt-3 max-w-xs text-sm text-cream/80">{site.mission}</p>
        </div>
        <FooterCol
          title="Explore"
          links={categories.map((c) => ({ to: `/${c.slug}`, label: c.name }))}
        />
        <FooterCol
          title="Tools & extras"
          links={[
            { to: "/hobby-finder", label: "Find Your Thing" },
            { to: "/make-plans", label: "Make Some Plans" },
            { to: "/tools/hobby-budget", label: "Hobby Starter Budget" },
            { to: "/tools/tonight", label: "What Should I Do Tonight?" },
            { to: "/hobbies", label: "Hobby Directory" },
            { to: "/shop", label: "Off Duty Essentials" },
            { to: "/saved", label: "My Plans" },
          ]}
        />
        <FooterCol
          title="The fine print"
          links={[
            { to: "/about", label: "About" },
            { to: "/start-here", label: "Start Here" },
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
          <span>
            © {new Date().getFullYear()} {site.name}. {site.signature}
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
      <h3 className="kicker mb-4 font-sans text-butter">{title}</h3>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-sm text-cream/90 hover:text-butter hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
