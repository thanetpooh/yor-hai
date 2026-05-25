import { z } from "zod";

// nanoid(6) uses URL-safe alphabet: A-Za-z0-9_-
const SHORT_CODE_REGEX = /^[A-Za-z0-9_-]{6}$/;

export const qrParamsSchema = z.object({
  shortCode: z
    .string()
    .regex(SHORT_CODE_REGEX, "Invalid short code format"),
});

export const qrQuerySchema = z.object({
  format: z.enum(["png", "svg"]).default("png"),
});
