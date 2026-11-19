import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { ProsePage } from "@/components/pages/ProsePage";

/** The page lives at /editorial-policy; this alias catches the name used elsewhere. Not in the sitemap. */
export const Route = createFileRoute("/editorial-standards")({
  beforeLoad: () => {
    throw redirect({ to: "/editorial-policy", statusCode: 301 });
  },
  head: () =>
    seo({
      title: "Editorial Standards (moved)",
      description: "This page has moved to the editorial policy page.",
      path: "/editorial-standards",
      noindex: true,
    }),
  // Only shown if the redirect cannot run; the router normally never renders it.
  component: () => (
    <ProsePage kicker="The fine print" title="Editorial standards" dek="This page has moved.">
      <p>
        Read our <Link to="/editorial-policy">editorial standards</Link>.
      </p>
    </ProsePage>
  ),
});
