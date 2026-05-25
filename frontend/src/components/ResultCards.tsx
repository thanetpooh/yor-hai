import type { ShortenResponse } from "../types";

interface Props {
  result: ShortenResponse;
  onCopy: (text: string) => void;
}

export function ResultCards({ result, onCopy }: Props) {
  const { originalUrl, shortUrl, qrUrl } = result;

  const parts = shortUrl.split("/");
  const shortCode = parts[parts.length - 1] ?? "qr";

  function downloadQr(format: "png" | "svg") {
    const a = document.createElement("a");
    a.href = `${qrUrl}?format=${format}`;
    a.download = `qr-${shortCode}.${format}`;
    a.click();
  }

  return (
    <section className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
      {/* short link version */}
      <div className="relative rounded-2xl border border-rule bg-card p-6">
        <span className="absolute right-4 top-4 font-mono text-xs uppercase tracking-widest text-ink-muted">
          ลิงก์สั้น
        </span>

        <h3 className="mb-1 font-serif text-2xl font-normal">ลิงก์ของคุณ</h3>
        <p className="mb-5 font-mono text-xs text-ink-muted">
          redirect ผ่าน server ของคุณเอง
        </p>

        <div className="flex items-center gap-2 rounded-xl border border-dashed border-rule-strong bg-skin px-4 py-3.5">
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-0 flex-1 truncate font-mono text-lg text-ink hover:text-accent-ink hover:underline"
          >
            {shortUrl}
          </a>

          <button
            onClick={() => onCopy(shortUrl)}
            title="คัดลอก"
            className="icon-btn"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="11" height="11" rx="2" />
              <path d="M5 15V5a2 2 0 0 1 2-2h10" />
            </svg>
          </button>

          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="เปิดลิงก์"
            className="icon-btn"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17 17 7" />
              <path d="M8 7h9v9" />
            </svg>
          </a>
        </div>

        <p
          className="mt-4 truncate font-mono text-xs text-ink-muted"
          title={originalUrl}
        >
          <strong className="font-medium text-ink-soft">ต้นฉบับ →</strong>{" "}
          {originalUrl}
        </p>
      </div>

      {/* QR Code */}
      <div className="relative rounded-2xl border border-rule bg-card p-6">
        <span className="absolute right-4 top-4 font-mono text-xs uppercase tracking-widest text-ink-muted">
          QR Code
        </span>

        <h3 className="mb-1 font-serif text-2xl font-normal">สแกนได้เลย</h3>

        <div className="flex flex-col items-center">
          <div className="relative aspect-square w-full max-w-72 rounded-xl border border-rule bg-white p-4">
            <span className="corner-mark left-2 top-2 border-b-0 border-r-0" />
            <span className="corner-mark right-2 top-2 border-b-0 border-l-0" />
            <span className="corner-mark bottom-2 left-2 border-r-0 border-t-0" />
            <span className="corner-mark bottom-2 right-2 border-l-0 border-t-0" />
            <img
              src={qrUrl}
              alt={`QR สำหรับ ${shortUrl}`}
              className="h-full w-full object-contain"
              style={{ imageRendering: "pixelated" }}
            />
          </div>

          <div className="mt-3 flex w-full max-w-72 gap-2">
            <button
              onClick={() => downloadQr("png")}
              className="flex-1 rounded-lg border border-rule-strong bg-skin py-2.5 font-mono text-xs uppercase tracking-widest text-ink transition-colors hover:border-ink hover:bg-ink hover:text-skin"
            >
              PNG
            </button>
            <button
              onClick={() => downloadQr("svg")}
              className="flex-1 rounded-lg border border-rule-strong bg-skin py-2.5 font-mono text-xs uppercase tracking-widest text-ink transition-colors hover:border-ink hover:bg-ink hover:text-skin"
            >
              SVG
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
