import type { ShortenResponse } from "./types";

export async function shortenUrl(url: string): Promise<ShortenResponse> {
  const base = import.meta.env.VITE_API_URL ?? "";
  const res = await fetch(`${base}/api/shorten`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  const data = await res.json();

  if (!res.ok) {
    const msg =
      data?.errors?.[0]?.message ??
      data?.message ??
      "Something went wrong. Try again.";
    throw new Error(msg);
  }

  const qrPath = new URL(data.qrUrl).pathname;

  return { ...data, qrUrl: `${base}${qrPath}` };
}
