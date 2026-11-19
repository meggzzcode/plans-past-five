import type { ComponentType } from "react";
import {
  BatteryLow,
  BatteryMedium,
  Zap,
  User,
  Users,
  Shuffle,
  Gift,
  Coins,
  Wallet,
  Sparkles,
} from "lucide-react";
import type { ImageKey } from "@/data/images";
import type { QuizKey } from "@/lib/quiz-flow";

/** One option card: an existing site image, or an icon on a tinted tile. No new image files. */
export type QuizOption = {
  v: string;
  label: string;
  image?: ImageKey;
  Icon?: ComponentType<{ className?: string }>;
};
export type QuizQuestion = { key: QuizKey; q: string; options: QuizOption[] };

/** The question bank, in the reader's words. Order and skip rules live in src/lib/quiz-flow.ts. */
export const questions: Record<QuizKey, QuizQuestion> = {
  craving: {
    key: "craving",
    q: "What do you want more of?",
    options: [
      { v: "creativity", label: "Making things", image: "junkJournal" },
      { v: "relaxation", label: "Time to unwind", image: "soloCafe" },
      { v: "adventure", label: "A little adventure", image: "hiking" },
      { v: "friendship", label: "New friends", image: "girlsNight" },
      { v: "movement", label: "Moving my body", image: "tennis" },
      { v: "different", label: "Surprise me", image: "potteryNight" },
    ],
  },
  energy: {
    key: "energy",
    q: "How much energy is left after work?",
    options: [
      { v: "low", label: "Running on fumes", Icon: BatteryLow },
      { v: "medium", label: "Some left in the tank", Icon: BatteryMedium },
      { v: "high", label: "Let's go", Icon: Zap },
    ],
  },
  company: {
    key: "company",
    q: "Who's coming along?",
    options: [
      { v: "solo", label: "Just me", Icon: User },
      { v: "social", label: "Friends", Icon: Users },
      { v: "either", label: "Either is good", Icon: Shuffle },
    ],
  },
  budget: {
    key: "budget",
    q: "What can you spend to start?",
    options: [
      { v: "free", label: "Nothing", Icon: Gift },
      { v: "under25", label: "Under $25", Icon: Coins },
      { v: "under50", label: "Under $50", Icon: Wallet },
      { v: "flexible", label: "Flexible", Icon: Sparkles },
    ],
  },
};

/** Short phrase for each answer, used in the "your answers" line on the results page. */
export const answerLabel = (key: QuizKey, v: string | undefined) =>
  questions[key].options.find((o) => o.v === v)?.label;
