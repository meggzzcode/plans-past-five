import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { site } from "@/config/site";
import { ProsePage } from "@/components/pages/ProsePage";

export const Route = createFileRoute("/editorial-policy")({
  head: () => seo({ title: "Editorial Policy", description: "How Plans Past Five researches, writes and updates its stories and recommendations.", path: "/editorial-policy" }),
  component: () => (
    <ProsePage kicker="The fine print" title="Editorial policy" dek="How we write, what we won't do, and how we keep things honest." tone="matcha">
      <h2>Original and useful</h2>
      <p>Every story is written to be genuinely useful to a beginner: realistic time, approximate cost ranges, what you actually need, and an easy first step.</p>
      <h2>What we won't do</h2>
      <ul>
        <li>Invent personal experiences, product testing, testimonials or community statistics.</li>
        <li>Publish fake reviews, prices or star ratings.</li>
        <li>Invent local businesses, classes or events.</li>
        <li>Make medical or mental-health claims. Hobbies can be lovely; they aren't treatment.</li>
      </ul>
      <h2>Bylines and updates</h2>
      <p>Stories are credited to {site.editorialByline}. Each shows its publication date; we update stories when information changes and note the update date.</p>
      <h2>Commercial independence</h2>
      <p>Recommendations are chosen because they help someone start a hobby. Any commercial relationship is disclosed beside the relevant links.</p>
    </ProsePage>
  ),
});
