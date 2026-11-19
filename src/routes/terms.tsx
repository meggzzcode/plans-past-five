import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { site } from "@/config/site";
import { ProsePage } from "@/components/pages/ProsePage";

export const Route = createFileRoute("/terms")({
  head: () => seo({ title: "Terms of Use", description: "Terms for using the Plans Past Five website and printables.", path: "/terms" }),
  component: () => (
    <ProsePage kicker="The fine print" title="Terms of use" dek="The ground rules for using this site and its free resources." tone="butter">
      <p><em>Starter terms for the site owner to review with a qualified professional before launch.</em></p>
      <h2>Content</h2>
      <p>Stories, images, printables and design on {site.name} are provided for personal, non-commercial use. Please don't republish them without permission. Sharing links and pinning pages is very welcome.</p>
      <h2>Ideas, not instructions</h2>
      <p>Our activity and hobby suggestions are general ideas. Use your judgment about safety, local conditions, opening hours and costs, and check details with any venue before you go.</p>
      <h2>Printables</h2>
      <p>Free printables are for personal use. You're welcome to print as many as you like for yourself, your friends or a small group activity.</p>
      <h2>Changes</h2>
      <p>We may update these terms; the date below shows the latest version. Last updated {site.legal.lastUpdated}.</p>
    </ProsePage>
  ),
});
