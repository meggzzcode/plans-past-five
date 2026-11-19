import { Link } from "@tanstack/react-router";
import { site } from "@/config/site";
import { ProsePage } from "@/components/pages/ProsePage";
import { PublishedBy } from "@/components/layout/PublishedBy";

/**
 * The contact page. One structure for both states, so nothing moves when the inbox opens:
 * "How to reach us" (the address as a mailto link, or an honest "not open yet"), then the
 * corrections contact, then brands. No form: nothing here collects or sends anything.
 */
export function ContactPage() {
  const email = site.contactEmail.trim();
  return (
    <ProsePage
      kicker="Contact"
      title="Say hello."
      italic="hello."
      dek="Story ideas, corrections, partnership questions or just a hobby you think we should write about."
      tone="sunday"
    >
      <h2>How to reach us</h2>
      {email ? (
        <p>
          Email us at <a href={`mailto:${email}`}>{email}</a>. We read everything, though we can't
          always reply individually.
        </p>
      ) : (
        <p>
          Our public inbox isn't open yet, and we won't show an address until it is. When it opens,
          the address will appear right here, with the corrections contact below. Until then, take
          the <Link to="/hobby-finder">hobby quiz</Link>, build a plan on{" "}
          <Link to="/make-plans">Make Some Plans</Link> or keep ideas in{" "}
          <Link to="/saved">My Plans</Link>. None of it needs an account.
        </p>
      )}
      <PublishedBy />
      <h2>Corrections</h2>
      {email ? (
        <p>
          If something in a story is wrong or out of date, email{" "}
          <a href={`mailto:${email}?subject=Correction`}>{email}</a> with the page link and what
          needs fixing. See our <Link to="/corrections">corrections policy</Link>.
        </p>
      ) : (
        <p>
          If something in a story is wrong or out of date, we want to know. Once the inbox opens,
          you can send the page link and what needs fixing to the address above. See our{" "}
          <Link to="/corrections">corrections policy</Link>.
        </p>
      )}
      <h2>Brands and partnerships</h2>
      <p>
        We don't accept payment for editorial coverage. See our{" "}
        <Link to="/editorial-policy">editorial standards</Link> for how we choose what to recommend.
      </p>
    </ProsePage>
  );
}
