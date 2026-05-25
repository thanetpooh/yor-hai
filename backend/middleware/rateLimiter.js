import { rateLimit } from "express-rate-limit";

/**
 * Factory — lets tests or other limiters override defaults.
 * @param {import("express-rate-limit").Options} options
 */
export function createRateLimiter(options = {}) {
  return rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { message: "Too many requests, please try again later." },
    ...options, // fix: actually spread the overrides
  });
}

// POST /api/shorten — stricter (write operation)
export const shortenLimiter = createRateLimiter({
  limit: 10,
  windowMs: 15 * 60 * 1000,
});

// GET /api/qr/:shortCode — more lenient (read-only, but still protected)
export const qrLimiter = createRateLimiter({
  limit: 30,
  windowMs: 15 * 60 * 1000,
});
