import { Link } from "@tanstack/react-router";

export function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4 py-20">
      <div className="max-w-lg text-center">
        <p className="hand text-3xl text-cherry">out of office…</p>
        <h1 className="mt-2 font-display text-7xl italic text-cherry">404</h1>
        <h2 className="mt-4 text-3xl">This page clocked out early.</h2>
        <p className="mt-3 text-muted-foreground">
          It doesn't exist or has moved. Good news: there's plenty else to do tonight.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/hobby-finder"
            className="bg-cherry px-5 py-2.5 text-sm font-semibold text-cream hover:bg-ink"
          >
            Find Your Thing
          </Link>
          <Link
            to="/"
            className="border-2 border-cherry px-5 py-2 text-sm font-semibold text-cherry hover:bg-cherry hover:text-cream"
          >
            Back home
          </Link>
        </div>
        <p className="mt-5 text-sm text-espresso">
          <Link to="/make-plans" className="underline decoration-cherry underline-offset-4">
            Make Some Plans
          </Link>
          {" · "}
          <Link to="/shop" className="underline decoration-cherry underline-offset-4">
            Shop Your Hobby
          </Link>
        </p>
      </div>
    </div>
  );
}
