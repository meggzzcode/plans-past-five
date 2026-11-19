import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { absoluteUrl, seo } from "@/lib/seo";
import { quizCountWord } from "@/data/quiz-meta";
import { images, type ImageKey } from "@/data/images";
import { categories } from "@/data/categories";
import { NAMES } from "@/components/layout/nav";
import { PageHero } from "@/components/editorial/Section";

export const Route = createFileRoute("/start-here")({
  head: () =>
    seo({
      title: "Start Here: Find a Hobby, Plan Tonight, Shop the Basics",
      description:
        "Not sure what to do after work? Take the hobby quiz, build a plan for tonight or this weekend, or shop simple starter supplies.",
      path: "/start-here",
      image: absoluteUrl(images.potteryNight.src),
    }),
  component: StartHere,
});

const paths: {
  to: string;
  k: ImageKey;
  title: string;
  body: string;
  cta: string;
  primary?: boolean;
}[] = [
  {
    to: "/hobby-finder",
    k: "hiking",
    title: "No idea what you're into?",
    body: `Answer ${quizCountWord().toLowerCase()} questions and get a few hobbies that fit your time, budget and energy.`,
    cta: "Find your thing",
    primary: true,
  },
  {
    to: "/make-plans",
    k: "shopAdventures",
    title: "Want a plan for tonight or this weekend?",
    body: "Pick the night, the mood and a budget. We'll build a realistic plan you can save or print.",
    cta: "Make some plans",
  },
  {
    to: "/shop",
    k: "shopBookish",
    title: "Already know your hobby?",
    body: "Go straight to the starter list: what you need for the first try, and nothing you don't.",
    cta: "Shop your hobby",
  },
];

function StartHere() {
  return (
    <>
      <PageHero
        kicker="Start here"
        title="Hi. You clocked out. What's the plan?"
        italic="What's the plan?"
        dek="Three ways in. Pick whichever sounds like you right now."
        tone="butter"
      />
      <div className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-16">
        <ul className="grid gap-6 md:grid-cols-3">
          {paths.map((p) => {
            const img = images[p.k];
            return (
              <li key={p.to} className="flex flex-col bg-cream shadow-[var(--shadow-paper)]">
                <div className="aspect-[16/10] overflow-hidden bg-strawberry/50">
                  <img
                    src={img.src}
                    alt={img.alt}
                    width={img.w}
                    height={img.h}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <h2 className="font-display text-2xl italic leading-tight">{p.title}</h2>
                  <p className="flex-1 text-espresso">{p.body}</p>
                  <Link
                    to={p.to}
                    className={
                      p.primary
                        ? "inline-flex min-h-12 items-center justify-center gap-2 border-2 border-cherry bg-cherry px-5 text-base font-semibold text-cream transition hover:bg-transparent hover:text-cherry"
                        : "inline-flex min-h-12 items-center justify-center gap-2 border-2 border-cherry px-5 text-base font-semibold text-cherry transition hover:bg-cherry hover:text-cream"
                    }
                  >
                    {p.cta} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>

        <section className="mt-14" aria-labelledby="look-around">
          <h2 id="look-around" className="text-2xl md:text-3xl">
            Rather just look around?
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-3 md:gap-x-6">
            {categories.map((c) => {
              const img = images[c.image];
              return (
                <li key={c.slug}>
                  <Link to={`/${c.slug}`} className="group block">
                    <div className="aspect-[4/3] overflow-hidden bg-strawberry/50">
                      <img
                        src={img.src}
                        alt={img.alt}
                        width={img.w}
                        height={img.h}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="mt-2 text-lg italic leading-tight group-hover:text-cherry md:text-xl">
                      {c.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{c.short}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="mt-5">
            <Link
              to="/hobbies"
              className="inline-flex min-h-11 items-center border-b-2 border-cherry text-sm font-semibold text-cherry"
            >
              Or browse all {NAMES.hobbies.toLowerCase()} <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </p>
        </section>

        <section className="mt-14 border-t border-border pt-8" aria-labelledby="save">
          <h2 id="save" className="text-2xl md:text-3xl">
            Save as you go
          </h2>
          <p className="mt-2 max-w-xl text-espresso">
            Tap the bookmark on anything to keep it in <Link to="/saved">{NAMES.saved}</Link>. It
            lives on this device. No account needed.
          </p>
        </section>
      </div>
    </>
  );
}
