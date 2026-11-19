import { createFileRoute } from "@tanstack/react-router";
import { seo, breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/config/site";
import { commissionStatement } from "@/config/affiliate";
import { Link } from "@tanstack/react-router";
import { ProsePage } from "@/components/pages/ProsePage";

export const Route = createFileRoute("/editorial-policy")({
  head: () =>
    seo({
      title: "Editorial Standards",
      description: `How ${site.name} picks hobbies and products, how we use AI tools and images, what we'll never make up, and how we fix mistakes.`,
      path: "/editorial-policy",
      jsonLd: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Editorial Standards", path: "/editorial-policy" },
        ]),
      ],
    }),
  component: () => (
    <ProsePage
      kicker="The fine print"
      title="Editorial standards"
      dek="How we pick hobbies and products, what we'll never make up, and how we fix mistakes."
      tone="matcha"
    >
      <h2>Original and useful</h2>
      <p>
        Every story is written to be genuinely useful to a beginner: realistic time, approximate
        cost ranges, what you actually need, and an easy first step.
      </p>
      <aside className="not-prose my-8 border-2 border-dashed border-cherry bg-cream p-5">
        <p className="kicker text-cherry">Why you can trust the picks</p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-ink">
          <li>We name a product only after checking its Amazon listing.</li>
          <li>We never invent reviews, prices, ratings or personal experiences.</li>
          <li>If something changes or turns out wrong, we update the page and say so.</li>
        </ul>
      </aside>
      <h2>What we won't do</h2>
      <ul>
        <li>Invent personal experiences, product testing, testimonials or community statistics.</li>
        <li>
          Publish fake reviews, or show prices, discounts, star ratings or review counts at all.
        </li>
        <li>Invent local businesses, classes or events.</li>
        <li>Make medical or mental-health claims. Hobbies can be lovely; they aren't treatment.</li>
      </ul>
      <h2>How we use AI and images</h2>
      <p>
        We use AI tools to help with research, content development, organization and website
        operations. We do not claim firsthand experience, personal testing or human review that did
        not occur. The images on this site were created with AI tools and depict no real people or
        brands. Please confirm important details, such as costs, safety, availability and rules,
        with the provider before you rely on them.
      </p>
      <h2>Bylines and updates</h2>
      <p>
        Stories are credited to {site.editorialByline}. Each shows its publication date, and a
        collapsed "Sources and when we checked" section lists sources and the date its facts were
        last checked. We update stories when information changes and note the update date.
      </p>
      <h2>Commercial independence</h2>
      <p>
        Picks are chosen because they help you start, and we show product names and brands only for
        products we've checked against their Amazon listing. We haven't tested them ourselves. Our
        shopping links go to Amazon.{" "}
        {commissionStatement().live
          ? "We may earn a commission on qualifying purchases at no extra cost to you."
          : "Today they are ordinary links and we don't earn a commission from them."}{" "}
        If that changes, the note beside every link changes with it, and what we recommend stays the
        same.
      </p>
      <h2>More on how we work</h2>
      <p>
        Read <Link to="/methodology">how we choose hobbies and products</Link>, see our{" "}
        <Link to="/corrections">corrections policy and log</Link>, and our{" "}
        <Link to="/affiliate-disclosure">affiliate disclosure</Link>.
      </p>
    </ProsePage>
  ),
});
