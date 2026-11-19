import { createFileRoute, redirect } from "@tanstack/react-router";
import { seo } from "@/lib/seo";

const ANSWER_KEYS = ["t", "e", "b", "c", "w", "s"] as const;

/**
 * Tonight is now the first mode of Make Plans (Stage 3a). 301 to /make-plans?mode=tonight, keeping any
 * answers in the address (saved and shared Tonight links carry t, e, b, c, w, s). See src/config/redirects.ts.
 * There is deliberately no validateSearch here: the raw values pass straight through, so the old link
 * is redirected once, not canonicalised first.
 */
export const Route = createFileRoute("/tools/tonight")({
  beforeLoad: ({ search }) => {
    const raw = search as Record<string, unknown>;
    const answers: Record<string, string | number> = {};
    for (const k of ANSWER_KEYS) {
      const v = raw[k];
      if (typeof v === "string" || typeof v === "number") answers[k] = v;
    }
    throw redirect({
      to: "/make-plans",
      search: { mode: "tonight", ...answers } as never,
      statusCode: 301,
    });
  },
  head: () =>
    seo({
      title: "What Should I Do Tonight? (moved)",
      description: "This page has moved to Make Plans.",
      path: "/tools/tonight",
      noindex: true,
    }),
});
