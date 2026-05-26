import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  BASE_URL: z.url().default("http://localhost:3000"),
  UPSTASH_REDIS_REST_URL: z.url("UPSTASH_REDIS_REST_URL ต้องเป็น URL"),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1, "UPSTASH_REDIS_REST_TOKEN ห้ามว่าง"),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error("❌  Invalid environment variables:");
  console.error(result.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = result.data;
