import { Redis } from "@upstash/redis";
import { env } from "./config/env.js";

const client = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});

await client.set("foo", "bar");
const val = await client.get("foo");
console.log("got:", val);
