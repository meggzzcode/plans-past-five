import { useRef, useState } from "react";
import { Download, Copy, Upload } from "lucide-react";
import { readSaved, useSaved } from "@/lib/saved";
import { copyText, readShopList, replaceShopList } from "@/lib/shoplist";
import {
  MAX_FILE_CHARS,
  buildBundle,
  bundleToCode,
  bundleToJson,
  mergeSaved,
  mergeShop,
  parseImport,
  type Bundle,
} from "@/lib/saved-transfer";

const BTN =
  "inline-flex min-h-11 items-center gap-2 border-2 border-cherry px-4 text-sm font-semibold text-cherry hover:bg-cherry hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cherry";

/**
 * Stage 3a: the backup/import panel is hidden from My Plans (it is a power-user extra). The panel,
 * its library and its tests are intact. To bring it back, set this to true.
 */
export const SHOW_TRANSFER = false;

/** Export and import so My Plans can move between devices. Merge only: an import never deletes anything. */
export function Transfer() {
  const { replaceAll } = useSaved();
  const [note, setNote] = useState("");
  const [code, setCode] = useState("");
  const [pending, setPending] = useState<{ bundle: Bundle; skipped: number } | null>(null);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const current = () => buildBundle(readSaved(), readShopList());

  const download = () => {
    const blob = new Blob([bundleToJson(current())], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `plans-past-five-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNote("Backup downloaded.");
  };

  const copyCode = async () => {
    setNote(
      (await copyText(bundleToCode(current())))
        ? "Code copied."
        : "Couldn't copy. Try the download instead.",
    );
  };

  const check = (text: string) => {
    const r = parseImport(text);
    if (r.ok) {
      setError("");
      setPending({ bundle: r.bundle, skipped: r.skipped });
    } else {
      setPending(null);
      setError(r.error);
    }
  };

  const onFile = async (f: File | undefined) => {
    if (!f) return;
    if (f.size > MAX_FILE_CHARS * 3) {
      setPending(null);
      setError("That file is too large to import.");
      return;
    }
    try {
      check(await f.text());
    } catch {
      setError("Couldn't read that file.");
    }
    if (fileRef.current) fileRef.current.value = "";
  };

  const apply = () => {
    if (!pending) return;
    replaceAll(mergeSaved(readSaved(), pending.bundle.saved));
    replaceShopList(mergeShop(readShopList(), pending.bundle.shop));
    setNote(
      `Added ${pending.bundle.saved.length} saved item${pending.bundle.saved.length === 1 ? "" : "s"} and ${Object.keys(pending.bundle.shop).length} shopping list item${Object.keys(pending.bundle.shop).length === 1 ? "" : "s"}.`,
    );
    setPending(null);
    setCode("");
  };

  return (
    <section
      className="mt-12 border-t border-border pt-10"
      aria-labelledby="move-devices"
      data-testid="transfer"
    >
      <h2 id="move-devices" className="text-3xl italic">
        Move to another device
      </h2>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        My Plans lives in this browser only. Download a backup file or copy a code, then import it
        on your other device. Importing adds to what's there; it never removes anything.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={download} className={BTN}>
          <Download className="h-4 w-4" aria-hidden /> Download backup (.json)
        </button>
        <button type="button" onClick={copyCode} className={BTN}>
          <Copy className="h-4 w-4" aria-hidden /> Copy backup code
        </button>
        <label className={`${BTN} cursor-pointer focus-within:outline focus-within:outline-2`}>
          <Upload className="h-4 w-4" aria-hidden /> Import a file
          <input
            ref={fileRef}
            type="file"
            accept=".json,application/json"
            className="sr-only"
            onChange={(e) => void onFile(e.target.files?.[0])}
          />
        </label>
      </div>
      <div className="mt-5 max-w-2xl">
        <label htmlFor="import-code" className="flex min-h-11 items-center text-sm font-semibold">
          Or paste a backup code
        </label>
        <textarea
          id="import-code"
          value={code}
          onChange={(e) => setCode(e.target.value.slice(0, MAX_FILE_CHARS + 10))}
          rows={3}
          spellCheck={false}
          autoComplete="off"
          placeholder="PPF1.…"
          className="mt-1 block w-full border border-border bg-background p-3 font-mono text-sm"
        />
        <button
          type="button"
          onClick={() => check(code)}
          disabled={code.trim().length === 0}
          className={`${BTN} mt-2 disabled:opacity-50`}
        >
          Check code
        </button>
      </div>
      <div role="status" aria-live="polite" className="mt-4 empty:hidden">
        {error && <p className="font-semibold text-cherry">{error}</p>}
        {note && !error && <p className="text-sm font-semibold text-espresso">{note}</p>}
      </div>
      {pending && (
        <div className="paper mt-3 max-w-2xl p-5">
          <p className="font-display text-xl">
            Found {pending.bundle.saved.length} saved item
            {pending.bundle.saved.length === 1 ? "" : "s"} and{" "}
            {Object.keys(pending.bundle.shop).length} shopping list item
            {Object.keys(pending.bundle.shop).length === 1 ? "" : "s"}.
          </p>
          {pending.skipped > 0 && (
            <p className="mt-1 text-sm text-muted-foreground">
              {pending.skipped} entr{pending.skipped === 1 ? "y was" : "ies were"} skipped because
              they weren't valid.
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={apply}
              className="inline-flex min-h-11 items-center bg-cherry px-5 text-sm font-semibold text-cream hover:bg-ink"
            >
              Add to this device
            </button>
            <button type="button" onClick={() => setPending(null)} className={BTN}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
