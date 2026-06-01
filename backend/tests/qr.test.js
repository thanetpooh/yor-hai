import { describe, test, expect } from "vitest";
import request from "supertest";
import app from "../app.js";

async function createShortCode() {
  const res = await request(app)
    .post("/api/shorten")
    .send({ url: "https://google.com" });
  return res.body.shortUrl.split("/").pop();
}

describe("GET /api/qr/:shortCode", () => {
  describe("Success Case", () => {
    test("valid shortCode → 200 PNG", async () => {
      const shortCode = await createShortCode();
      const res = await request(app).get(`/api/qr/${shortCode}`);
      expect(res.status).toBe(200);
      expect(res.headers["content-type"]).toContain("image/png");
    });

    test("valid shortCode + format=svg → 200 SVG", async () => {
      const shortCode = await createShortCode();
      const res = await request(app).get(`/api/qr/${shortCode}?format=svg`);
      expect(res.status).toBe(200);
      expect(res.headers["content-type"]).toContain("image/svg+xml");
    });
  });

  describe("Validation Error", () => {
    test("shortCode wrong format  → 400", async () => {
      const res = await request(app).get("/api/qr/!!!");
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("errors");
    });

    test("Invaild format query → 400", async () => {
      const shortCode = await createShortCode();
      const res = await request(app).get(`/api/qr/${shortCode}?format=gif`);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("errors");
    });
  });

  describe("Not Found", () => {
    test("shortCode ไม่มีในระบบ → 404", async () => {
      const res = await request(app).get("/api/qr/abcdef");
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("message");
    });
  });
});
