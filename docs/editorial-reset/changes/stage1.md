# Stage 1 change record (technical foundation)

Branch `worktree-agent-ad2b830adf0246eeb` (from `editorial-reset` abc456b). Everything removed in Stage 1 is recorded here.

How to restore: view with `git show <commit>^:<path>`; restore a file or folder with `git checkout <commit>^ -- <path>`; undo a whole batch with `git revert <commit>`. For dependencies, restore `package.json` and `bun.lock` from `<commit>^` and run `bun install`. Commit ids are in the "Commits" table at the end.

## Batch 1: unused shadcn UI, unused hook, components.json, unused dependencies

Reason: no file outside `src/components/ui/` imports anything from it (grep of `components/ui`, `../ui`, `./ui`; no tooltip, dialog, sonner or toaster user exists in routes, components, CMS or accessibility code). `use-mobile.tsx` is imported only by the sidebar in that folder. `components.json` is shadcn CLI config only. Proven by tsc, eslint, tests and both builds.

Files removed:

| Path | Lines |
|---|---|
| src/components/ui/accordion.tsx | 51 |
| src/components/ui/alert-dialog.tsx | 115 |
| src/components/ui/alert.tsx | 49 |
| src/components/ui/aspect-ratio.tsx | 5 |
| src/components/ui/avatar.tsx | 47 |
| src/components/ui/badge.tsx | 32 |
| src/components/ui/breadcrumb.tsx | 101 |
| src/components/ui/button.tsx | 49 |
| src/components/ui/calendar.tsx | 177 |
| src/components/ui/card.tsx | 55 |
| src/components/ui/carousel.tsx | 240 |
| src/components/ui/chart.tsx | 331 |
| src/components/ui/checkbox.tsx | 26 |
| src/components/ui/collapsible.tsx | 11 |
| src/components/ui/command.tsx | 143 |
| src/components/ui/context-menu.tsx | 186 |
| src/components/ui/dialog.tsx | 104 |
| src/components/ui/drawer.tsx | 98 |
| src/components/ui/dropdown-menu.tsx | 187 |
| src/components/ui/form.tsx | 171 |
| src/components/ui/hover-card.tsx | 27 |
| src/components/ui/input-otp.tsx | 73 |
| src/components/ui/input.tsx | 22 |
| src/components/ui/label.tsx | 21 |
| src/components/ui/menubar.tsx | 228 |
| src/components/ui/navigation-menu.tsx | 120 |
| src/components/ui/pagination.tsx | 98 |
| src/components/ui/popover.tsx | 31 |
| src/components/ui/progress.tsx | 25 |
| src/components/ui/radio-group.tsx | 36 |
| src/components/ui/resizable.tsx | 37 |
| src/components/ui/scroll-area.tsx | 44 |
| src/components/ui/select.tsx | 152 |
| src/components/ui/separator.tsx | 24 |
| src/components/ui/sheet.tsx | 122 |
| src/components/ui/sidebar.tsx | 744 |
| src/components/ui/skeleton.tsx | 7 |
| src/components/ui/slider.tsx | 23 |
| src/components/ui/sonner.tsx | 23 |
| src/components/ui/switch.tsx | 27 |
| src/components/ui/table.tsx | 94 |
| src/components/ui/tabs.tsx | 53 |
| src/components/ui/textarea.tsx | 21 |
| src/components/ui/toggle-group.tsx | 57 |
| src/components/ui/toggle.tsx | 42 |
| src/components/ui/tooltip.tsx | 32 |
| src/hooks/use-mobile.tsx | 19 |
| components.json | 22 |

Dependencies removed in batch 1 (39): 27 `@radix-ui/*` packages, `@hookform/resolvers`, `class-variance-authority`, `cmdk`, `date-fns`, `embla-carousel-react`, `input-otp`, `react-day-picker`, `react-hook-form`, `react-resizable-panels`, `recharts`, `sonner`, `vaul`, `tw-animate-css` (its `@import` removed from `src/styles.css`). Kept on purpose: `eslint-config-prettier` (eslint-plugin-prettier needs it), `@tailwindcss/vite` and `vite-tsconfig-paths` (loaded dynamically by `@lovable.dev/vite-tanstack-config`), `zod`, `clsx`, `tailwind-merge`, `lucide-react`. Docs references to `components/ui` and `components.json` removed from `docs/buyer/WEBSITE-ARCHITECTURE.md` and `BUYER-PACKAGE-CONTENTS.md`.

## Batch 2: react-query wiring and redundant router-plugin pin

No `useQuery`/`useMutation` existed. Removed: `QueryClient` creation and router context in `src/router.tsx`; `QueryClientProvider` and `createRootRouteWithContext` in `src/routes/__root.tsx` (now `createRootRoute`); the QueryClient in `src/test/app-routing.test.tsx`; dependencies `@tanstack/react-query` and `@tanstack/router-plugin` (still installed transitively at the same version via `@tanstack/start-plugin-core`). Restore: revert the batch 2 commit.
