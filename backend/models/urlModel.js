import client from "../config/redis.js";

const URL_TTL = 60 * 60 * 24 * 30; // 30 days in seconds

export async function saveUrl(shortCode, originalUrl) {
  return client.set(shortCode, originalUrl, {
    nx: true,
    ex: URL_TTL,
  });
}

export async function getUrl(shortCode) {
  return client.get(shortCode);
}
