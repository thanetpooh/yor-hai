import { createClient } from "redis";
import { env } from "./env.js";

const client = createClient({
  socket: {
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
  },
});

client.on("error", (err) => {
  console.error("Redis Client Error", err);
});

await client.connect();

export default client;
