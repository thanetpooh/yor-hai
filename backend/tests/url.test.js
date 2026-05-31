import { describe, test, expect } from "vitest";
import request from "supertest";
import app from "../app.js";

describe("POST /api/shorten", () => {
  test("URL Correctly → 201", async () => {
    const res = await request(app)
      .post("/api/shorten")
      .send({ url: "https://mikelopster.dev/" });
    expect(res.status).toBe(201);
  });

  test("Wrong URL Format → 400", async () => {
    const res = await request(app)
      .post("/api/shorten")
      .send({ url: "http://mikelopster.dev/" });
    expect(res.status).toEqual(400);
  });

  test("Empty Body → 400", async () => {
    const res = await request(app).post("/api/shorten");
    expect(res.status).toEqual(400);
  });
});

describe("GET /:shorten", () => {
  test("shortCode exists → 302", async () => {
    const createRes = await request(app)
      .post("/api/shorten")
      .send({ url: "https://google.com" });
    const shortCode = createRes.body.shortUrl.split("/").pop();
    const res = await request(app).get(`/${shortCode}`);
    expect(res.status).toBe(302);
  });

  test("shortCode not exists →  404", async () => {
    const res = await request(app).get("/notexist123");
    expect(res.status).toBe(404);
  });
});
