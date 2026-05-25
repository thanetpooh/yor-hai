import { z } from "zod";

export const urlInputSchema = z
  .string()
  .min(1, "กรุณากรอก URL")
  .trim()
  .check(
    z.httpUrl(
      "URL ไม่ถูกต้อง — กรุณากรอก URL ที่ขึ้นต้นด้วย https:// เช่น https://example.com",
    ),
  );
