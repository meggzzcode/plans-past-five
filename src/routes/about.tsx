import { createFileRoute, Link } from "@tanstack/react-router";
import { absoluteUrl, seo, breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/config/site";
import { ProsePage } from "@/components/pages/ProsePage";
import { images } from "@/data/images";
import { NAMES } from "@/components/layout/nav";

export const Route = createFileRoute("/about")({
  head: () =>
    seo({
      title: "About Plans Past Five",
      description:
        "Plans Past Five is for women who want something to look forward to after work: hobbies to try, plans to make and the supplies to get started.",
      path: "/about",
      image: absoluteUrl(images.girlsNight.src),
      jsonLd: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]),
      ],
    }),
  component: () => (
    <ProsePage
      kicker="About"
      title="Making a life, not just a living."
      italic="not just a living."
      dek={site.mission}
      tone="strawberry"
    >
      <p className="font-display text-2xl italic text-cherry">{site.philosophy}</p>
      <p>
        Plans Past Five is for the woman who closes her laptop at 5:01 and wants something to look
        forward to. We help you find a hobby, plan the evening or weekend, and pick up simple
        supplies to start. We love a good career. We just think your life gets to be bigger than it.
      </p>
      <h2>What we believe</h2>
      <ul>
        <li>
          Hobbies don't have to be profitable, productive, impressive or Instagram-worthy to be
          worthwhile.
        </li>
        <li>Being a beginner is a joy, not an embarrassment.</li>
        <li>
          A good life outside work shouldn't require a big budget, a car, a partner or a huge friend
          group.
        </li>
        <li>Having something to look forward to changes how the whole week feels.</li>
      </ul>
      <figure className="my-10">
        <img
          src={images.girlsNight.src}
          alt={images.girlsNight.alt}
          width={images.girlsNight.w}
          height={images.girlsNight.h}
          loading="lazy"
        />
        <figcaption className="hand mt-2 text-2xl text-cherry">
          saturday, with a storyline.
        </figcaption>
      </figure>
      <h2>Who it's for</h2>
      <p>
        Introverts and extroverts. New in town. Rebuilding friendships. Watching a budget. If you
        want to try pottery painting, tennis, junk journaling or a solo café date and just need a
        nudge, this is for you.
      </p>
      <h2>How we work</h2>
      <p>
        Everything here is written by {site.editorialByline}, with no single named author on
        purpose. We don't invent personal experiences, product tests, reviews or community numbers.
        How we write and check our stories is explained on the{" "}
        <Link to="/editorial-policy">editorial standards page</Link>, and our{" "}
        <Link to="/affiliate-disclosure">affiliate disclosure</Link> says how shopping links work.
      </p>
      <div className="not-prose mt-10 flex flex-col items-start gap-1">
        <Link
          to="/hobby-finder"
          className="inline-flex min-h-12 items-center justify-center border-2 border-cherry bg-cherry px-6 text-base font-semibold !text-cream no-underline transition hover:bg-transparent hover:!text-cherry"
        >
          {NAMES.quiz}
        </Link>
        <Link to="/make-plans" className="inline-flex min-h-11 items-center text-sm font-semibold">
          or make some plans
        </Link>
      </div>
      <p className="hand text-3xl text-cherry">{site.slogan}</p>
    </ProsePage>
  ),
});
