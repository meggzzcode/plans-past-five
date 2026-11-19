import { createFileRoute } from "@tanstack/react-router";
import { seo, breadcrumbJsonLd } from "@/lib/seo";
import { ContactPage } from "@/components/pages/ContactPage";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo({
      title: "Contact",
      description:
        "Story ideas, corrections and partnership questions for Plans Past Five, and how we handle each.",
      path: "/contact",
      jsonLd: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]),
      ],
    }),
  component: () => <ContactPage />,
});
