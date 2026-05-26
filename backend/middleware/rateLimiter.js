import { rateLimit } from "express-rate-limit";

export function createRateLimiter(options = {}) {
  return rateLimit({
    windowMs: 60 * 1000,
    limit: 10,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { message: "Too many requests, please try again later." },
  });
}

// POST /api/shorten
export const shortenLimiter = createRateLimiter({
  limit: 10,
  windowMs: 15 * 60 * 1000,
});

// GET /api/qr/:shortCode
export const qrLimiter = createRateLimiter({
  limit: 30,
  windowMs: 15 * 60 * 1000,
});
