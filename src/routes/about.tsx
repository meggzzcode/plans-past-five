import { createFileRoute, Link } from "@tanstack/react-router";
import { seo, breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/config/site";
import { ProsePage } from "@/components/pages/ProsePage";
import { images } from "@/data/images";

export const Route = createFileRoute("/about")({
  head: () =>
    seo({
      title: "About Plans Past Five",
      description: site.mission,
      path: "/about",
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
        Plans Past Five is a lifestyle publication and hobby discovery destination for
        career-oriented women who want a more creative, interesting, social and fulfilling life
        outside of work. We celebrate ambition. We just don't think your job should be your whole
        identity.
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
      </figure>
      <h2>Who it's for</h2>
      <p>
        The woman who closes her laptop at 5:01 and wonders what to do with the rest of her evening.
        Introverts and extroverts, people new to a city, people navigating changing friendships,
        people on a budget, and anyone who wants to try pottery painting, tennis, junk journaling or
        a solo café date and just needs a nudge.
      </p>
      <h2>How we work</h2>
      <p>
        Everything here is written by {site.editorialByline}. We don't fabricate personal
        experiences, product tests, reviews or community numbers. Read our{" "}
        <Link to="/editorial-policy">editorial policy</Link> and{" "}
        <Link to="/affiliate-disclosure">affiliate disclosure</Link>.
      </p>
      <p className="hand text-3xl text-cherry">{site.slogan}</p>
    </ProsePage>
  ),
});
