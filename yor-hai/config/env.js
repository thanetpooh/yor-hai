import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  BASE_URL: z.url().default("http://localhost:3000"),
  REDIS_HOST: z.string().default("redis"),
  REDIS_PORT: z.coerce.number().default(6379),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error("❌  Invalid environment variables:");
  console.error(result.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = result.data;
