import type { ComponentType } from "react";
import {
  Bookmark,
  BookOpen,
  CalendarHeart,
  Compass,
  Footprints,
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

/** Tools and orientation: Start Here first. */
export const toolNav: NavItem[] = [
  { to: "/start-here", label: "Start Here", Icon: Compass },
  { to: "/hobby-finder", label: "Find Your Thing", Icon: Sparkles },
  { to: "/make-plans", label: "Make Some Plans", Icon: CalendarHeart },
  { to: "/saved", label: "My Plans", Icon: Bookmark },
];

export const browseNav: NavItem[] = [
  { to: "/hobbies", label: "Hobbies", Icon: Smile },
  { to: "/journal", label: "The Journal", Icon: BookOpen },
  { to: "/shop", label: "The Shop", Icon: ShoppingBag },
];

/** Desktop top bar (sections sit in a second row beneath it). */
export const topNav = [
  { to: "/start-here", label: "Start Here" },
  { to: "/make-plans", label: "Make Some Plans" },
  { to: "/hobbies", label: "Hobbies" },
  { to: "/journal", label: "The Journal" },
  { to: "/shop", label: "The Shop" },
] as const;

/** Everything the mobile menu lists, in order. */
export const mobileNavItems: NavItem[] = [...toolNav, ...sectionNav, ...browseNav];
