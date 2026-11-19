import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarHeart, ShoppingBag, Sparkles, type LucideIcon } from "lucide-react";
import { images, type ImageKey } from "@/data/images";
import { categories } from "@/data/categories";
import { hobbies } from "@/data/hobbies";
import { articles, getArticle } from "@/content";
import { collections } from "@/data/products";
import { quizCountWord } from "@/data/quiz-meta";
import { site } from "@/config/site";
import { absoluteUrl, seo } from "@/lib/seo";
import { Star, Sparkle, Squiggle } from "@/components/brand/Doodles";
import { SeasonStrip } from "@/components/home/SeasonStrip";
import { NAMES } from "@/components/layout/nav";
import { AffiliateNote } from "@/components/editorial/AffiliateNote";
import { cn } from "@/lib/utils";

/**
 * The one image that is the page's largest paint: a 960px copy for phones and most laptops (the
 * 1440px original is only used on very sharp screens). Same picture, less to download.
 */
const HERO_SMALL = "/lcp/hero-pottery-night-960.jpg";
const HERO_SIZES = "(min-width: 1024px) 500px, (min-width: 640px) 420px, 340px";
const heroSrcSet = () => `${HERO_SMALL} 960w, ${images.potteryNight.src} ${images.potteryNight.w}w`;

export const Route = createFileRoute("/")({
  head: () => {
    const page = seo({
      title: `${site.name}: Hobbies, Weekend Plans & Starter Supplies for After Work`,
      description:
        "Find a hobby you'll actually look forward to, plan a weekend with a storyline, and shop simple starter supplies. For women with plans past five.",
      path: "/",
      image: absoluteUrl(images.potteryNight.src),
    });
    return {
      ...page,
      links: [
        ...page.links,
        // Start the hero download before the stylesheet is parsed; nothing else on the page is preloaded.
        {
          rel: "preload",
          as: "image",
          href: HERO_SMALL,
          imageSrcSet: heroSrcSet(),
          imageSizes: HERO_SIZES,
          fetchPriority: "high",
        },
      ],
    };
  },
  component: Home,
});

/** Image in a fixed-ratio, brand-tinted frame: no layout shift, no blank block while it loads. */
function Pic({
  k,
  ratio,
  className,
  eager,
}: {
  k: ImageKey;
  ratio: string;
  className?: string;
  eager?: boolean;
}) {
  const i = images[k];
  return (
    <div className={cn("relative overflow-hidden bg-strawberry/50", ratio, className)}>
      <img
        src={i.src}
        alt={i.alt}
        width={i.w}
        height={i.h}
        {...(eager ? { srcSet: heroSrcSet(), sizes: HERO_SIZES } : {})}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding={eager ? "sync" : "async"}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />
    </div>
  );
}

/** The three journeys. Shop replaces the old "What tonight?" tile; Tonight stays in the nav and Make Some Plans. */
const startTiles: {
  to: string;
  title: string;
  line: string;
  k: ImageKey;
  Icon: LucideIcon;
  tone: string;
  primary?: boolean;
}[] = [
  {
    to: "/hobby-finder",
    title: NAMES.quiz,
    line: `${quizCountWord()} questions. A few hobbies that fit your time, budget and energy.`,
    k: "hiking",
    Icon: Sparkles,
    tone: "bg-strawberry",
    primary: true,
  },
  {
    to: "/make-plans",
    title: NAMES.plans,
    line: "Pick the night and the mood. Get a plan you can save or print.",
    k: "shopAdventures",
    Icon: CalendarHeart,
    tone: "bg-butter",
  },
  {
    to: "/shop",
    title: NAMES.shop,
    line: "Everything you need for the first try, hobby by hobby.",
    k: "shopBookish",
    Icon: ShoppingBag,
    tone: "bg-matcha",
  },
];

const featuredSlugs = [
  "things-to-do-after-work-instead-of-scrolling",
  "how-to-host-a-craft-night",
  "how-to-start-playing-tennis-as-an-adult",
];

/** Collections not already pictured by the start tiles. */
const shopTeaser = collections
  .filter((c) => !["shopAdventures", "shopBookish"].includes(c.image))
  .slice(0, 4);

function Home() {
  const featured = featuredSlugs.map((s) => getArticle(s)).filter((a) => !!a);
  const picks = (featured.length >= 2 ? featured : articles.slice(0, 3)).slice(0, 3);
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-6 px-5 pb-8 pt-6 md:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:pb-14 lg:pt-12">
          <div className="relative z-10">
            <h1 className="text-[2.7rem] leading-[0.98] sm:text-6xl lg:text-[5.2rem]">
              Because the best part of your day is{" "}
              <em className="relative whitespace-nowrap text-cherry">
                still ahead.
                <Squiggle className="absolute -bottom-2 left-0 w-full text-cherry/60" />
              </em>
            </h1>
            <p className="mt-5 max-w-md text-lg text-espresso md:text-xl">
              Find a hobby, plan the night, and get the little supplies to start it. Close the
              laptop. Open your evening.
            </p>
            <div className="mt-6 flex flex-col items-stretch gap-1 sm:max-w-xs">
              <Link
                to="/hobby-finder"
                className="inline-flex min-h-12 items-center justify-center gap-2 border-2 border-cherry bg-cherry px-6 text-base font-semibold text-cream transition hover:bg-transparent hover:text-cherry"
              >
                Find your thing <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/make-plans"
                className="inline-flex min-h-11 items-center justify-center text-sm font-semibold text-ink underline decoration-cherry decoration-2 underline-offset-4"
              >
                or plan this weekend
              </Link>
              <p className="text-center text-xs text-muted-foreground">
                A few quick questions. No account needed.
              </p>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[340px] pb-4 sm:max-w-[420px] lg:max-w-[500px]">
            <div className="postcard -rotate-2">
              <Pic k="potteryNight" ratio="aspect-[4/3]" eager />
              <p className="hand absolute bottom-2 left-3 text-xl text-cherry">
                pottery night, thurs.
              </p>
              <span className="tape -top-3 left-1/3 rotate-3" />
            </div>
            <div className="absolute -bottom-1 right-0 grid h-24 w-24 rotate-[-8deg] place-items-center rounded-full bg-butter text-center shadow-[var(--shadow-paper)] sm:h-28 sm:w-28">
              <p className="font-display text-xs italic leading-tight text-cherry sm:text-sm">
                more hobbies.
                <br />
                fewer
                <br />
                meetings.
              </p>
            </div>
            <Star className="absolute -left-1 top-1/2 h-6 w-6 text-cherry" />
            <Sparkle className="absolute right-6 -top-2 h-5 w-5 text-cherry" />
          </div>
        </div>
        <div className="gingham-strip" />
      </section>

      {/* START HERE */}
      <section className="mx-auto max-w-7xl px-5 pt-8 md:px-8 md:pt-12" aria-labelledby="start">
        <h2 id="start" className="hand text-3xl text-cherry md:text-4xl">
          hi, you clocked out. start here:
        </h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-3 md:gap-6">
          {startTiles.map((t) => (
            <li key={t.to}>
              <Link
                to={t.to}
                className={cn(
                  "group grid min-h-24 grid-cols-[6.5rem_1fr] items-stretch overflow-hidden shadow-[var(--shadow-paper)] transition hover:-translate-y-0.5 md:block",
                  t.tone,
                  t.primary && "ring-2 ring-cherry",
                )}
              >
                <Pic k={t.k} ratio="h-full min-h-24 md:aspect-[16/10] md:h-auto" />
                <div className="flex flex-col justify-center gap-1 p-3 md:p-5">
                  {t.primary && <p className="kicker text-cherry">Start here</p>}
                  <h3 className="flex items-center gap-2 font-display text-xl italic leading-tight text-ink md:text-2xl">
                    <t.Icon className="h-5 w-5 shrink-0 text-cherry" />
                    {t.title}
                  </h3>
                  <p className="text-sm text-espresso md:text-base">{t.line}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        {/* Secondary entry: a quiet text link, not a fourth journey. */}
        <p className="mt-4 text-sm text-espresso md:text-base" data-testid="home-tonight">
          Just need something for tonight?{" "}
          <Link
            to="/tools/tonight"
            className="inline-flex min-h-11 items-center gap-1 border-b-2 border-cherry font-semibold text-cherry hover:border-transparent"
          >
            {NAMES.tonight} <ArrowRight className="h-4 w-4" />
          </Link>
        </p>
      </section>

      {/* THIS SEASON */}
      <SeasonStrip />

      {/* SHOP TEASER */}
      <section className="mt-14 bg-butter md:mt-20">
        <div className="gingham-strip" />
        <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-12">
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1">
            <h2 className="text-3xl leading-tight md:text-4xl">
              Everything you need for <em className="text-cherry">try number one</em>
            </h2>
            <Link
              to="/shop"
              className="inline-flex min-h-11 items-center border-b-2 border-cherry text-sm font-semibold text-cherry"
            >
              See the starter lists <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <p className="mt-2 max-w-xl text-espresso">
            Pick a hobby, see the starter list, buy only what you need. Opens on Amazon.
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
            {shopTeaser.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/shop/$category"
                  params={{ category: c.slug }}
                  className="group block bg-cream"
                >
                  <Pic k={c.image} ratio="aspect-square" />
                  <div className="p-2.5 md:p-3">
                    <h3 className="text-base italic leading-tight group-hover:text-cherry md:text-lg">
                      {c.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-espresso md:text-sm">{c.dek}</p>
                    <p className="mt-1 text-xs font-semibold text-cherry underline decoration-2 underline-offset-4 md:text-sm">
                      See the starter list
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <AffiliateNote className="mt-3 text-espresso" />
        </div>
      </section>

      {/* SIX SECTIONS */}
      <section className="mx-auto mt-14 max-w-7xl px-5 md:mt-20 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1">
          <h2 className="text-3xl leading-tight md:text-5xl">
            Pick your kind of <em className="text-cherry">plans past five</em>
          </h2>
          <Link
            to="/hobbies"
            className="inline-flex min-h-11 items-center border-b-2 border-cherry text-sm font-semibold text-cherry"
          >
            All {hobbies.length} hobbies <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-3 md:gap-x-6 md:gap-y-8">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link to={`/${c.slug}`} className="group block">
                <Pic k={c.image} ratio="aspect-[4/3]" />
                <h3 className="mt-2 text-lg italic leading-tight group-hover:text-cherry md:text-2xl">
                  {c.name}
                </h3>
                <p className="text-sm text-muted-foreground">{c.short}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* FEATURED ARTICLES */}
      <section className="mx-auto mt-14 max-w-7xl px-5 md:mt-20 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1">
          <h2 className="text-3xl leading-tight md:text-5xl">
            Ideas <em className="text-cherry">worth stealing</em>
          </h2>
          <Link
            to="/journal"
            className="inline-flex min-h-11 items-center border-b-2 border-cherry text-sm font-semibold text-cherry"
          >
            More ideas <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <ul className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
          {picks.map((a, i) => (
            <li key={a.slug} className={cn(i === 2 && "hidden md:block")}>
              <Link to="/journal/$slug" params={{ slug: a.slug }} className="group block">
                <Pic k={a.hero} ratio="aspect-[4/3]" />
                <p className="kicker mt-2 text-cherry">
                  {categories.find((c) => c.slug === a.category)?.name}
                </p>
                <h3 className="mt-1 line-clamp-3 text-base leading-snug group-hover:text-cherry md:text-xl">
                  {a.title}
                </h3>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* CLOSING */}
      <section className="mx-auto max-w-3xl px-5 py-12 text-center md:py-16">
        <p className="hand text-3xl text-cherry md:text-4xl">{site.slogan}</p>
        <p className="mx-auto mt-3 max-w-md text-espresso">
          Your evening is allowed to be the main character.
        </p>
        <div className="mt-5 flex flex-col items-center gap-1">
          <Link
            to="/hobby-finder"
            className="inline-flex min-h-12 items-center justify-center gap-2 border-2 border-cherry bg-cherry px-6 text-base font-semibold text-cream transition hover:bg-transparent hover:text-cherry"
          >
            Find your thing <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/start-here"
            className="inline-flex min-h-11 items-center px-3 text-sm font-semibold text-ink underline decoration-cherry decoration-2 underline-offset-4"
          >
            or start here
          </Link>
        </div>
      </section>
    </>
  );
}
