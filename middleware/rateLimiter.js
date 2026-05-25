import { rateLimit } from "express-rate-limit";

export function createRateLimiter(options = {}) {
  return rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 10, // max 10 requests per window per IP
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { message: "Too many requests, please try again later." },
  });
}

export const shortenLimiter = createRateLimiter();
