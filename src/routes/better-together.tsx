import { createFileRoute } from "@tanstack/react-router";
import { getCategory } from "@/data/categories";
import { CategoryPage } from "@/components/pages/CategoryPage";
import { seo } from "@/lib/seo";

const c = getCategory("better-together")!;

export const Route = createFileRoute("/better-together")({
  head: () => seo({ title: c.metaTitle, description: c.metaDescription, path: "/better-together" }),
  component: () => <CategoryPage c={c} />,
});
