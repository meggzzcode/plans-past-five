import { createFileRoute, redirect } from "@tanstack/react-router";
import { seo } from "@/lib/seo";

/**
 * Start Here is folded into the homepage (Stage 3a). 301 to `/`; see src/config/redirects.ts.
 * The previous page is in git history (docs/editorial-reset/changes/stage3a.md has the restore command).
 */
export const Route = createFileRoute("/start-here")({
  beforeLoad: () => {
    throw redirect({ to: "/", statusCode: 301 });
  },
  head: () =>
    seo({
      title: "Start Here (moved)",
      description: "This page has moved to the home page.",
      path: "/start-here",
      noindex: true,
    }),
});
