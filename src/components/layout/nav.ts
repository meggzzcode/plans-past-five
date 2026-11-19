import type { ComponentType } from "react";
import {
  Bookmark,
  BookOpen,
  CalendarHeart,
  Compass,
  Footprints,
  Lightbulb,
  Moon,
  Palette,
  ShoppingBag,
  Smile,
  Sparkles,
  Sun,
  Users,
  Coffee,
} from "lucide-react";
import { categories, type CategorySlug } from "@/data/categories";

type Icon = ComponentType<{ className?: string }>;
export type NavItem = { to: string; label: string; Icon: Icon };

/** One icon per section. Names always come from src/data/categories.ts. */
const sectionIcons: Record<CategorySlug, Icon> = {
  "after-hours": Moon,
  weekends: Sun,
  "solo-dates": Coffee,
  "better-together": Users,
  "creative-corner": Palette,
  movement: Footprints,
};

export const sectionNav: NavItem[] = categories.map((c) => ({
  to: `/${c.slug}`,
  label: c.name,
  Icon: sectionIcons[c.slug],
}));

/**
 * Names, one per thing, used by the header, footer, homepage, page titles and tool headings:
 * Find Your Thing (quiz), Make Some Plans (planner), Shop Your Hobby (shop), My Plans (saved),
 * What Should I Do Tonight? (tonight tool), Hobbies (directory), The Journal.
 */
export const NAMES = {
  quiz: "Find Your Thing",
  plans: "Make Some Plans",
  shop: "Shop Your Hobby",
  saved: "My Plans",
  tonight: "What Should I Do Tonight?",
  hobbies: "Hobbies",
  journal: "The Journal",
} as const;

/** Start here: the three journeys first, then the tools that support them. */
export const toolNav: NavItem[] = [
  { to: "/start-here", label: "Start Here", Icon: Compass },
  { to: "/hobby-finder", label: NAMES.quiz, Icon: Sparkles },
  { to: "/make-plans", label: NAMES.plans, Icon: CalendarHeart },
  { to: "/shop", label: NAMES.shop, Icon: ShoppingBag },
  { to: "/tools/tonight", label: NAMES.tonight, Icon: Lightbulb },
  { to: "/saved", label: NAMES.saved, Icon: Bookmark },
];

export const browseNav: NavItem[] = [
  { to: "/hobbies", label: NAMES.hobbies, Icon: Smile },
  { to: "/journal", label: NAMES.journal, Icon: BookOpen },
];

/** Desktop top bar (sections sit in a second row beneath it). */
export const topNav = [
  { to: "/start-here", label: "Start Here" },
  { to: "/make-plans", label: NAMES.plans },
  { to: "/hobbies", label: NAMES.hobbies },
  { to: "/journal", label: NAMES.journal },
  { to: "/shop", label: NAMES.shop },
] as const;

/** Everything the mobile menu lists, in order. */
export const mobileNavItems: NavItem[] = [...toolNav, ...sectionNav, ...browseNav];
