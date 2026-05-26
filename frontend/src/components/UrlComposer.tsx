import { useRef, useState } from "react";
import { urlInputSchema } from "../validators";

interface Props {
  onSubmit: (url: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function UrlComposer({ onSubmit, loading, error }: Props) {
  const [value, setValue] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setValidationError(null);

    const result = urlInputSchema.safeParse(value);
    if (!result.success) {
      setValidationError(result.error.issues[0]?.message ?? "URL ไม่ถูกต้อง");
      inputRef.current?.focus();
      return;
    }

    await onSubmit(result.data);
  }

  const displayError = validationError ?? error;

  return (
    <form onSubmit={handleSubmit} autoComplete="off" noValidate>
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-rule bg-card p-2.5 shadow-lg">
        <div className="flex min-w-64 flex-1 items-center gap-2.5 px-4 py-2">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setValidationError(null);
            }}
            placeholder="https://example.com/"
            spellCheck={false}
            autoFocus
            className="min-w-0 flex-1 border-0 bg-transparent  text-base text-ink outline-none placeholder:text-ink-muted"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-ink px-5 py-3.5  text-base font-medium text-skin transition-colors hover:bg-accent-ink disabled:cursor-progress disabled:opacity-60"
        >
          {loading ? (
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-skin/30 border-t-skin" />
          ) : (
            <>
              <span>ย่อลิงก์</span>
              <kbd className="rounded border border-skin/25 px-1.5 py-0.5  text-xs opacity-55">
                ⏎
              </kbd>
            </>
          )}
        </button>
      </div>

      {displayError && (
        <p className="mt-2  text-sm text-danger">⚠ {displayError}</p>
      )}
    </form>
  );
}
