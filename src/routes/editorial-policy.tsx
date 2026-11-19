import { createFileRoute } from "@tanstack/react-router";
import { seo, breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/config/site";
import { Link } from "@tanstack/react-router";
import { ProsePage } from "@/components/pages/ProsePage";

export const Route = createFileRoute("/editorial-policy")({
  head: () =>
    seo({
      title: "Editorial Standards",
      description:
        "How Plans Past Five researches, writes and updates its stories, how we use AI tools and images, and what we will not do.",
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
      dek="How we write, what we won't do, and how we keep things honest."
      tone="matcha"
    >
      <h2>Original and useful</h2>
      <p>
        Every story is written to be genuinely useful to a beginner: realistic time, approximate
        cost ranges, what you actually need, and an easy first step.
      </p>
      <h2>What we won't do</h2>
      <ul>
        <li>Invent personal experiences, product testing, testimonials or community statistics.</li>
        <li>Publish fake reviews, prices or star ratings.</li>
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
        Stories are credited to {site.editorialByline}. Each shows its publication date; we update
        stories when information changes and note the update date.
      </p>
      <h2>Commercial independence</h2>
      <p>
        Recommendations are chosen because they help someone start a hobby. Any commercial
        relationship is disclosed beside the relevant links.
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
