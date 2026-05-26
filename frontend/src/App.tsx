import { useState } from "react";
import { shortenUrl } from "./api";
import { Header } from "./components/Header";
import { ResultCards } from "./components/ResultCards";
import { Toast } from "./components/Toast";
import { UrlComposer } from "./components/UrlComposer";
import type { ShortenResponse } from "./types";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ShortenResponse | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  async function handleShorten(url: string) {
    setLoading(true);
    setError(null);
    try {
      const data = await shortenUrl(url);
      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "เกิดข้อผิดพลาด ลองใหม่อีกครั้ง",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setToast("คัดลอกแล้ว");
    } catch {
      setToast("คัดลอกไม่ได้");
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-skin">
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-35"
        style={{
          backgroundImage:
            "radial-gradient(rgba(60,40,20,.06) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />

      <Header />

      <main className="relative z-10 mx-auto w-full max-w-5xl flex-1 px-10 pb-10 pt-14 max-sm:px-6 max-sm:pt-9">
        {/* hero */}
        <section className="mb-9">
          <div className="mb-3 flex items-center gap-2.5 text-xs uppercase tracking-widest text-ink-muted">
            <span className="h-px w-9 bg-rule-strong" />
            ย่อลิงก์ + สร้าง QR
          </div>
          <h1 className="mb-3  text-4xl font-normal leading-tight tracking-tight sm:text-6xl">
            วางลิงก์ยาว
            <br />
            รับ <em className="italic text-accent-ink">ลิงก์สั้น</em> และ{" "}
            <em className="italic text-accent-ink">QR code</em> ทันที
          </h1>
          <p className="max-w-xl text-lg text-ink-soft">
            ได้ 2 อย่าง — สะดวก ง่าย รวดเร็ว
          </p>
        </section>

        <UrlComposer onSubmit={handleShorten} loading={loading} error={error} />

        <div>
          {result && <ResultCards result={result} onCopy={handleCopy} />}
        </div>

        {/* credit */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 text-xs text-ink-muted">
          <span>© 2026 Thanet J.</span>
          <a
            href="https://github.com/thanetpooh/yor-hai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-ink"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5"
              fill="currentColor"
            >
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
            </svg>
            thanetpooh/yor-hai
          </a>
        </div>
      </main>

      <Toast message={toast} onDone={() => setToast(null)} />
    </div>
  );
}
