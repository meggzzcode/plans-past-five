import { createFileRoute, Link } from "@tanstack/react-router";
import { seo, breadcrumbJsonLd } from "@/lib/seo";
import { ProsePage } from "@/components/pages/ProsePage";
import { SHOP_LINK_FACTS, isMonetized } from "@/config/affiliate";

export const Route = createFileRoute("/methodology")({
  head: () =>
    seo({
      title: "How We Choose Hobbies and Products",
      description:
        "How Plans Past Five picks hobbies and starter products, what manufacturer claims mean here, and why we show no prices or ratings.",
      path: "/methodology",
      jsonLd: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "How We Choose", path: "/methodology" },
        ]),
      ],
    }),
  component: () => (
    <ProsePage
      kicker="The fine print"
      title="How we choose"
      dek="How hobbies and starter products make it onto the site, and what our recommendations are and are not."
      tone="matcha"
    >
      <h2>Choosing hobbies</h2>
      <p>
        We include hobbies that a beginner can realistically start with limited time, a modest
        budget and no special talent. For each one we describe the rough time, cost range, space and
        company it suits, plus an easy first session. We favor variety across creative, social,
        active and quiet options so there is something for different energy levels.
      </p>
      <h2>Choosing products</h2>
      <p>There are two kinds of shopping help on the site, and the buttons say which is which.</p>
      <ul>
        <li>
          <strong>Named products.</strong> For a growing number of hobbies we name a specific
          product and brand, and we have checked it against its Amazon listing: we compared the
          listing with what we say about it and recorded the date. The button reads "View on Amazon"
          and opens that product's own page. A product only appears once that check is done;
          anything still being researched stays off the site.
        </li>
        <li>
          <strong>Types of product.</strong> Elsewhere we describe what to look for ("a round brush,
          a notebook that takes glue") and the button reads "Browse options on Amazon", which opens
          a search so you can compare for yourself.
        </li>
      </ul>
      <p>
        In each starter kit we lead with the one thing to buy if you only buy one, mark what is
        essential and what is an optional extra, and fold other options for the same need under the
        pick with a line on how they differ. We aim for picks that look good and fit a modest
        budget, and a kit can say you probably own something already.
      </p>
      <h2>Manufacturer claims versus independent testing</h2>
      <p>
        Unless a page says otherwise, we have not independently tested products. What we say about a
        named product comes from its Amazon listing and, where we could read it, the maker's page.
        Those are claims, not our test results, and we do not present them as personal experience.
      </p>
      <h2>No prices, ratings or review counts</h2>
      <p>
        We show a product's brand and name, and never a price, discount, star rating or review
        count, because they change often and an out-of-date figure is worse than none. Amazon or the
        seller sets the price, shipping and returns; check them on the product page before you buy.
      </p>
      <h2>Photos</h2>
      <p>
        The pictures on shopping cards are either a product photo we have the right to show, with a
        credit, or a plain label with the brand and product type. We do not copy Amazon's images.
        The illustrations on collection pages are styling, not specific products, and were made with
        AI tools.
      </p>
      <h2>Last verified dates</h2>
      <p>
        When a story's facts have been checked against sources, we record that date. Stories show
        their publication date, and a "Sources and when we checked" section at the end of the story
        lists the sources and the date the facts were last checked. We do not invent dates. If
        something is wrong, see our <Link to="/corrections">corrections policy</Link>.
      </p>
      <h2>Commercial relationships</h2>
      <p>
        {isMonetized()
          ? "Some of our shopping links are affiliate links, and the note beside each one says so. "
          : `${SHOP_LINK_FACTS.notEarning} If affiliate links are activated, the note beside the links changes automatically and this page will be updated. `}
        Earning a commission would not change what we recommend. See the{" "}
        <Link to="/affiliate-disclosure">affiliate disclosure</Link> and our{" "}
        <Link to="/editorial-policy">editorial standards</Link>.
      </p>
    </ProsePage>
  ),
});
