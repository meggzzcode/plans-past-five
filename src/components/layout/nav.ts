import type { ComponentType } from "react";
import {
  BookOpen,
  CalendarHeart,
  Coffee,
  Footprints,
  Moon,
  Palette,
  ShoppingBag,
  Sparkles,
  Sun,
  Users,
} from "lucide-react";
import { categories, type CategorySlug } from "@/data/categories";

type Icon = ComponentType<{ className?: string }>;
export type NavItem = { to: string; label: string; Icon: Icon };

/** One icon per mood page. Names always come from src/data/categories.ts. */
const sectionIcons: Record<CategorySlug, Icon> = {
  "after-hours": Moon,
  weekends: Sun,
  "solo-dates": Coffee,
  "better-together": Users,
  "creative-corner": Palette,
  movement: Footprints,
};

/**
 * The six mood pages. They are no longer in the header, menu or footer (Stage 3a); they are reached
 * from the Journal index until phase two turns them into Journal topics.
 */
export const sectionNav: NavItem[] = categories.map((c) => ({
  to: `/${c.slug}`,
  label: c.name,
  Icon: sectionIcons[c.slug],
}));

/**
 * Names, one per thing, used by the header, footer, homepage, page titles and tool headings.
 * The quiz and the hobby directory are one destination ("Find a Hobby").
 */
export const NAMES = {
  quiz: "Find a Hobby",
  plans: "Make Plans",
  shop: "The Shop",
  saved: "My Plans",
  /** Tonight is a mode of Make Plans (/make-plans?mode=tonight), not a destination. */
  tonight: "Tonight",
  hobbies: "Find a Hobby",
  journal: "The Journal",
  /** Small link in article bylines; goes to the Editorial Standards page (/editorial-policy). */
  howWeMake: "How we make this",
} as const;

/** The four destinations: desktop top bar and the mobile menu, in this order. */
export const primaryNav: NavItem[] = [
  { to: "/hobbies", label: NAMES.hobbies, Icon: Sparkles },
  { to: "/make-plans", label: NAMES.plans, Icon: CalendarHeart },
  { to: "/shop", label: NAMES.shop, Icon: ShoppingBag },
  { to: "/journal", label: NAMES.journal, Icon: BookOpen },
];

/** Desktop top bar. */
export const topNav = primaryNav.map(({ to, label }) => ({ to, label }));

/** Everything the mobile menu lists as a full row, in order. */
export const mobileNavItems: NavItem[] = primaryNav;

/**
 * Paths that belong to "Find a Hobby" for the active-link highlight: the directory, every hobby
 * page and the quiz.
 */
export const isFindAHobbyPath = (pathname: string) =>
  pathname === "/hobbies" ||
  pathname.startsWith("/hobbies/") ||
  pathname.startsWith("/hobby-finder");

/** Fine print for the mobile menu (small text links). Same labels as the footer. */
export const finePrintNav = [
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/affiliate-disclosure", label: "Affiliate Disclosure" },
  { to: "/editorial-policy", label: "Editorial Standards" },
] as const;

/** The footer: the legal and trust links, plus the sitemap file (see SITEMAP_HREF). */
export const footerNav: { to: string; label: string }[] = [
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
  { to: "/affiliate-disclosure", label: "Affiliate Disclosure" },
  { to: "/editorial-policy", label: "Editorial Standards" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];
/** A file, not a page of the app, so the footer renders it as a plain anchor. */
export const SITEMAP_HREF = "/sitemap.xml";
