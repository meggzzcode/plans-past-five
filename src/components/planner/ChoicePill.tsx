import { cn } from "@/lib/utils";

/**
 * One answer in a question, drawn as a pill but built as a real radio input. Inside a
 * `<form method="get">` it works before the page's JavaScript has loaded: the answers travel in the
 * URL. After hydration the form's onChange handler reads the same inputs, so there is one code path.
 * Uncontrolled on purpose (defaultChecked): React never overwrites a choice made before hydration.
 */
export function ChoicePill({
  name,
  value,
  label,
  defaultChecked,
}: {
  name: string;
  value: string;
  label: string;
  defaultChecked: boolean;
}) {
  return (
    <label className="relative inline-flex">
      <input
        type="radio"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        className="peer sr-only"
      />
      <span
        className={cn(
          "inline-flex min-h-11 cursor-pointer items-center border-2 border-ink/20 bg-cream px-4 py-2 text-sm font-medium text-ink transition hover:border-cherry",
          "peer-checked:border-cherry peer-checked:bg-cherry peer-checked:text-cream",
          "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-cherry",
        )}
      >
        {label}
      </span>
    </label>
  );
}
