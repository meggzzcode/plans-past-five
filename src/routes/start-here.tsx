import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { ProsePage } from "@/components/pages/ProsePage";

export const Route = createFileRoute("/start-here")({
  head: () =>
    seo({
      title: "Start Here: New to Plans Past Five?",
      description:
        "A quick guide to finding your next hobby, planning your weekend and saving ideas on Plans Past Five.",
      path: "/start-here",
    }),
  component: () => (
    <ProsePage
      kicker="Start here"
      title="Hi. You clocked out. What's the plan?"
      italic="What's the plan?"
      dek="Four easy ways to use Plans Past Five, depending on how much you know about what you want."
      tone="butter"
    >
      <h2>1. If you have no idea what you're into</h2>
      <p>
        Take <Link to="/hobby-finder">Find Your Thing</Link>, our six-question hobby quiz. It
        respects your budget, time and energy, and gives you three to five ideas with an easy first
        step.
      </p>
      <h2>2. If you want a plan for tonight or this weekend</h2>
      <p>
        Use <Link to="/make-plans">Make Some Plans</Link>. Pick after work, Saturday or Sunday, a
        vibe and a budget, and we'll build a realistic plan you can save or print.
      </p>
      <h2>3. If you like to browse</h2>
      <p>
        Explore <Link to="/after-hours">After Hours</Link>,{" "}
        <Link to="/weekends">The Weekend Edit</Link>, <Link to="/solo-dates">Table for One</Link>,{" "}
        <Link to="/better-together">Better Together</Link>,{" "}
        <Link to="/creative-corner">Creative Corner</Link> and{" "}
        <Link to="/movement">A Little Movement</Link>, or the full{" "}
        <Link to="/hobbies">hobby directory</Link>.
      </p>
      <h2>Save as you go</h2>
      <p>
        Tap the bookmark on anything to add it to <Link to="/saved">My Plans</Link>. It's stored on
        this device, no account needed.
      </p>
    </ProsePage>
  ),
});
