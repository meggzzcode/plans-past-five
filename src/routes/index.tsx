import { createFileRoute, Link } from "@tanstack/react-router";
import { images } from "@/data/images";
import { categories } from "@/data/categories";
import { articles } from "@/content";
import { collections } from "@/data/products";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";
import { WordmarkStacked } from "@/components/brand/Wordmark";
import { Star, Sparkle, Bow, Flower, Arrow, Squiggle, Divider } from "@/components/brand/Doodles";
import { ArticleCard, CollectionCard } from "@/components/cards/Cards";
import { SectionHead, Kicker, toneBg } from "@/components/editorial/Section";
import { AffiliateNote } from "@/components/editorial/AffiliateNote";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => seo({
    title: `${site.name} — ${site.tagline}`,
    description: "Creative hobbies, cute weekend plans, solo dates, new friendships and little adventures for women who want a life they love outside of work.",
    path: "/",
  }),
  component: Home,
});

function Img({ k, className, eager }: { k: keyof typeof images; className?: string; eager?: boolean }) {
  const i = images[k];
  return <img src={i.src} alt={i.alt} width={i.w} height={i.h} loading={eager ? "eager" : "lazy"} className={cn("h-full w-full object-cover", className)} />;
}

const fiveOhOne = [
  { label: "Something creative", text: "Paint whatever's on your counter in three colors.", to: "/hobbies/watercolor-painting" },
  { label: "Something low-energy", text: "Start a puzzle, put on an album, leave your phone in the kitchen.", to: "/hobbies/jigsaw-puzzles" },
  { label: "Something outdoors", text: "A golden-hour walk with no destination and no step count.", to: "/movement" },
  { label: "Something solo", text: "Take yourself on a bookstore date and read five first pages.", to: "/solo-dates" },
  { label: "Something to text a friend about", text: "'Bracelets and snacks at mine, Thursday?'", to: "/better-together" },
] as { label: string; text: string; to: string }[];

const weekendEdit = [
  "Visit a farmers market.", "Try a pottery workshop.", "Take yourself on a bookstore date.",
  "Host a jewelry-making evening.", "Play tennis with a friend.", "Pack a picnic.",
];

function Home() {
  const featured = articles[0];
  const rest = articles.slice(1);
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-10 md:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-24 lg:pt-16">
          <div className="relative z-10">
            <p className="kicker flex items-center gap-2 text-cherry"><Star className="h-3.5 w-3.5" />{site.signature}</p>
            <h1 className="mt-5 text-[3.2rem] leading-[0.95] sm:text-6xl lg:text-[5.4rem]">
              Because the best part of your day is <em className="relative whitespace-nowrap text-cherry">still ahead.<Squiggle className="absolute -bottom-2 left-0 w-full text-cherry/60" /></em>
            </h1>
            <p className="mt-7 max-w-xl text-lg text-espresso md:text-xl">
              Creative hobbies, cute weekend plans, solo dates, new friendships and little adventures. Because there's a whole lot of life waiting for you after you close your laptop.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/hobby-finder" className="bg-cherry px-7 py-3.5 font-semibold text-cream shadow-[4px_4px_0_var(--ink)] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--ink)]">Find Your Thing</Link>
              <Link to="/make-plans" className="border-b-2 border-ink pb-1 font-semibold text-ink hover:border-cherry hover:text-cherry">Let's Make Plans →</Link>
            </div>
            <p className="hand mt-10 hidden items-center gap-2 text-2xl text-cherry lg:flex"><Arrow className="h-8 w-14 -scale-y-100 rotate-12" />{site.slogan}</p>
          </div>
          {/* collage */}
          <div className="relative mx-auto h-[440px] w-full max-w-[560px] sm:h-[540px]">
            <div className="postcard absolute left-0 top-6 w-[66%] -rotate-3 sm:top-4">
              <div className="aspect-[4/3] overflow-hidden"><Img k="potteryNight" eager /></div>
              <p className="hand absolute bottom-2 left-3 text-xl text-cherry">pottery night, thurs.</p>
              <span className="tape -top-3 left-1/3 rotate-3" />
            </div>
            <div className="postcard absolute right-0 top-0 w-[40%] rotate-[5deg]">
              <div className="aspect-[3/4] overflow-hidden"><Img k="tennis" eager /></div>
              <p className="hand absolute bottom-2 left-3 text-lg text-cherry">7pm rally ♡</p>
            </div>
            <div className="postcard absolute bottom-0 right-[8%] w-[48%] -rotate-[2deg]">
              <div className="aspect-[4/3] overflow-hidden"><Img k="picnic" /></div>
              <p className="hand absolute bottom-2 left-3 text-lg text-cherry">saturday, sorted</p>
              <span className="tape -top-3 right-6 -rotate-6" />
            </div>
            <div className="absolute bottom-6 left-2 grid h-28 w-28 rotate-[-8deg] place-items-center rounded-full bg-butter text-center shadow-[var(--shadow-paper)] sm:h-32 sm:w-32">
              <p className="font-display text-sm italic leading-tight text-cherry">more hobbies.<br />fewer<br />meetings.</p>
            </div>
            <Star className="absolute left-[55%] top-[46%] h-7 w-7 text-cherry" />
            <Sparkle className="absolute right-[45%] top-2 h-5 w-5 text-cherry" />
          </div>
        </div>
        <div className="gingham-strip" />
      </section>

      {/* RELATABLE INTRO */}
      <section className="mx-auto max-w-5xl px-5 py-20 text-center md:px-8 md:py-28">
        <p className="hand text-3xl text-cherry">hi, you clocked out. what's the plan?</p>
        <p className="mt-6 font-display text-3xl leading-snug text-ink md:text-[2.7rem] md:leading-[1.2]">
          Your Outlook calendar is full. Your evenings are… a lot of scrolling. We think you deserve <em className="text-cherry">hobbies that aren't side hustles</em>, plans that aren't just brunch, and something to look forward to on a Wednesday.
        </p>
        <p className="mx-auto mt-8 max-w-xl text-muted-foreground">{site.philosophy} Plans Past Five is your creative best friend for the hours after five, the weekends and every day off in between.</p>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead kicker="Find your kind of fun" title="Six ways to spend the life outside your laptop" italic="outside your laptop" />
          <Link to="/hobbies" className="border-b-2 border-cherry pb-0.5 text-sm font-semibold text-cherry">Browse all 36 hobbies</Link>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-8">
          {categories.map((c, i) => (
            <Link key={c.slug} to={`/${c.slug}`} className={cn("group block", i % 3 === 1 && "md:mt-14")}>
              <div className={cn("overflow-hidden", i % 2 ? "aspect-[4/5]" : "aspect-square")}><Img k={c.image} className="transition duration-700 group-hover:scale-105" /></div>
              <p className="kicker mt-4 text-cherry">{c.kicker}</p>
              <h3 className="mt-1 text-2xl italic group-hover:text-cherry md:text-3xl">{c.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.short}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* HOBBY FINDER TEASER */}
      <section className="mt-24 bg-strawberry">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:px-8">
          <div>
            <Kicker>Find Your Thing</Kicker>
            <h2 className="mt-3 text-5xl leading-[1] md:text-6xl">Not sure what you're <em className="text-cherry">into</em> yet?</h2>
            <p className="mt-5 max-w-md text-lg text-espresso">Six quick questions about your time, budget, energy and who you want to spend it with. We'll match you with three to five hobbies that actually fit your life.</p>
            <Link to="/hobby-finder" className="mt-8 inline-block bg-cherry px-7 py-3.5 font-semibold text-cream shadow-[4px_4px_0_var(--ink)] transition hover:-translate-y-0.5">Take the 2-minute quiz</Link>
          </div>
          <div className="relative">
            <div className="paper relative -rotate-2 p-7 md:p-9">
              <p className="kicker text-muted-foreground">Question 1 of 6</p>
              <p className="mt-3 font-display text-3xl">What are you craving more of?</p>
              <div className="mt-6 grid grid-cols-2 gap-2.5 text-sm font-medium">
                {["Creativity", "A little relaxation", "Adventure", "New friendships", "Movement", "Something different"].map((o, i) => (
                  <span key={o} className={cn("border px-3 py-2.5", i === 0 ? "border-cherry bg-cherry text-cream" : "border-border bg-cream")}>{o}</span>
                ))}
              </div>
            </div>
            <Bow className="absolute -right-3 -top-6 h-12 w-16 rotate-12 text-cherry" />
          </div>
        </div>
      </section>

      {/* 5:01 EDIT */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead kicker="After Hours" title="The 5:01 Edit" italic="5:01" dek="Five ideas for tonight, depending on what's left in the tank." />
            <div className="mt-8 aspect-[4/5] max-w-sm overflow-hidden"><Img k="watercolor" /></div>
          </div>
          <ol className="divide-y divide-border border-y border-border">
            {fiveOhOne.map((f, i) => (
              <li key={f.label}>
                <Link to={f.to} className="group flex gap-6 py-7">
                  <span className="font-display text-5xl italic leading-none text-cherry/80">0{i + 1}</span>
                  <span>
                    <span className="kicker text-cherry">{f.label}</span>
                    <span className="mt-2 block font-display text-2xl leading-snug text-ink group-hover:text-cherry md:text-3xl">{f.text}</span>
                  </span>
                </Link>
              </li>
            ))}
            <li className="py-6"><Link to="/journal/$slug" params={{ slug: "things-to-do-after-work-instead-of-scrolling" }} className="font-semibold text-cherry underline underline-offset-4">Read: 25 things to do after work instead of scrolling →</Link></li>
          </ol>
        </div>
      </section>

      {/* WEEKEND EDIT */}
      <section className="bg-butter">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="relative order-2 md:order-1">
              <div className="aspect-[5/4] overflow-hidden"><Img k="picnic" /></div>
              <div className="paper absolute -bottom-8 right-4 w-56 rotate-3 p-4 md:-right-8">
                <p className="hand text-2xl leading-tight text-cherry">Let's give Saturday a storyline.</p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <Kicker>The Weekend Edit</Kicker>
              <h2 className="mt-3 text-5xl leading-[1]">Weekend plans that <em className="text-cherry">aren't just brunch</em></h2>
              <ul className="mt-8 space-y-3">
                {weekendEdit.map((w) => (
                  <li key={w} className="flex items-center gap-3 border-b border-ink/15 pb-3 font-display text-xl text-ink"><Flower className="h-5 w-5 shrink-0 text-cherry" />{w}</li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-5">
                <Link to="/weekends" className="bg-ink px-6 py-3 text-sm font-semibold text-cream hover:bg-cherry">See The Weekend Edit</Link>
                <Link to="/make-plans" className="border-b-2 border-ink pb-1 text-sm font-semibold text-ink">Build a weekend plan →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TABLE FOR ONE + BETTER TOGETHER */}
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-24 md:grid-cols-2 md:px-8">
        {[
          { to: "/solo-dates", k: "soloCafe" as const, kicker: "Table for One", title: "Solo, not lonely.", text: "Bookstore wanders, a café window seat, one museum room. Make plans with yourself, and keep them.", tone: "bg-warm-white" },
          { to: "/better-together", k: "girlsNight" as const, kicker: "Better Together", title: "Text the group chat.", text: "Craft nights, book clubs and a standing game night. Hobbies are easier to love with people.", tone: "bg-strawberry" },
        ].map((x) => (
          <Link key={x.to} to={x.to} className={cn("group grid gap-0 sm:grid-cols-2", x.tone)}>
            <div className="aspect-[4/5] overflow-hidden sm:aspect-auto"><Img k={x.k} className="transition duration-700 group-hover:scale-105" /></div>
            <div className="flex flex-col justify-between p-7">
              <div>
                <p className="kicker text-cherry">{x.kicker}</p>
                <h3 className="mt-3 text-4xl italic leading-[1.02]">{x.title}</h3>
                <p className="mt-4 text-espresso">{x.text}</p>
              </div>
              <span className="mt-6 text-sm font-semibold text-cherry group-hover:underline">Explore →</span>
            </div>
          </Link>
        ))}
      </section>

      {/* JOURNAL */}
      <section className="mx-auto max-w-7xl px-5 md:px-8">
        <Divider label="The Journal" />
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          {featured && <ArticleCard a={featured} size="lg" />}
          <div className="grid gap-8">
            {rest.slice(0, 3).map((a) => (
              <Link key={a.slug} to="/journal/$slug" params={{ slug: a.slug }} className="group grid grid-cols-[120px_1fr] gap-5">
                <div className="aspect-square overflow-hidden"><Img k={a.hero} /></div>
                <div>
                  <p className="kicker text-cherry">{categories.find((c) => c.slug === a.category)?.name}</p>
                  <h3 className="mt-1 text-xl leading-tight group-hover:text-cherry">{a.title}</h3>
                </div>
              </Link>
            ))}
            <Link to="/journal" className="w-fit border-b-2 border-cherry pb-0.5 text-sm font-semibold text-cherry">All stories in The Journal →</Link>
          </div>
        </div>
      </section>

      {/* SHOP */}
      <section className="mx-auto mt-24 max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead kicker="Off Duty Essentials" title="Starting a new hobby? Here's what actually helps." italic="actually helps" dek="Six curated collections of beginner supplies, chosen because they make the first try easier. Not because they're trendy." />
          <Link to="/shop" className="border-b-2 border-cherry pb-0.5 text-sm font-semibold text-cherry">Visit the shop</Link>
        </div>
        <div className="mt-10 flex snap-x gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible lg:grid-cols-6">
          {collections.map((c) => <CollectionCard key={c.slug} c={c} className="w-[62%] shrink-0 snap-start md:w-auto" />)}
        </div>
        <AffiliateNote className="mt-4" />
      </section>

      {/* PRINTABLE */}
      <section className="mx-auto mt-24 max-w-7xl px-5 md:px-8">
        <div className={cn("relative grid items-center gap-10 overflow-hidden p-8 md:grid-cols-[1fr_1.1fr] md:p-14", toneBg.matcha)}>
          <div className="paper mx-auto w-full max-w-xs -rotate-3 p-6">
            <p className="kicker text-cherry">Free printable</p>
            <p className="mt-2 font-display text-3xl italic leading-tight text-cherry">The Out-of-Office Bucket List</p>
            <ul className="mt-4 space-y-1.5 text-sm text-espresso">
              {["Paint a mug at a pottery studio", "Have dinner out alone", "Host a bracelet night", "Hike a short local trail", "Listen to an album start to finish"].map((t) => <li key={t} className="flex gap-2"><span className="inline-block h-3.5 w-3.5 shrink-0 translate-y-0.5 border border-cherry" />{t}</li>)}
              <li className="hand text-lg text-cherry">+ 45 more…</li>
            </ul>
          </div>
          <div>
            <Kicker>The Out-of-Office Collection</Kicker>
            <h2 className="mt-3 text-5xl leading-[1]">Fifty things to do <em className="text-cherry">outside of work.</em></h2>
            <p className="mt-5 max-w-md text-lg text-ink">Print it, stick it on the fridge, tick one off a week. Plus a weekend planner and a hobby tracker. All free, no email required.</p>
            <div className="mt-7 flex flex-wrap gap-5">
              <Link to="/printables/$slug" params={{ slug: "out-of-office-bucket-list" }} className="bg-cherry px-6 py-3 text-sm font-semibold text-cream hover:bg-ink">Print the bucket list</Link>
              <Link to="/printables" className="border-b-2 border-ink pb-1 text-sm font-semibold text-ink">See all printables →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER-READY */}
      <section className="mx-auto mt-24 max-w-3xl px-5 text-center md:px-8">
        <div className="mx-auto w-fit text-6xl"><WordmarkStacked /></div>
        <p className="kicker mt-8 text-cherry">The Out-of-Office Note</p>
        <h2 className="mt-3 text-4xl">A little weekly note for your life outside work.</h2>
        <p className="mt-4 text-muted-foreground">Our newsletter is getting ready. Until it launches, save ideas to My Plans and they'll be waiting for you on this device.</p>
        <Link to="/saved" className="mt-6 inline-block border-2 border-cherry px-6 py-2.5 text-sm font-semibold text-cherry hover:bg-cherry hover:text-cream">Open My Plans</Link>
      </section>
    </>
  );
}
