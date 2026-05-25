# 🔗 Yor-Hai — URL Shortener API

A RESTful URL shortening service built with **Node.js**, **Express**, and **Redis**.  
Generates short codes, redirects users, enforces rate limiting, and expires links automatically — all containerised with Docker.

---

## ✨ Features

- **Shorten URLs** — generates a unique 6-character short code per URL
- **Instant redirect** — resolves a short code and redirects to the original URL
- **Auto-expiry** — links expire after **30 days** via Redis TTL
- **Rate limiting** — max **10 requests / 15 min per IP** on the shorten endpoint
- **Input validation** — accepts HTTPS URLs only, powered by Zod schema validation
- **Dockerised** — single `docker compose up` spins up the app and Redis together

---

## 🛠️ Tech Stack

| Layer            | Technology               |
| ---------------- | ------------------------ |
| Runtime          | Node.js 20+ (ES Modules) |
| Framework        | Express.js v5            |
| Database         | Redis 7                  |
| Validation       | Zod v4                   |
| Rate Limiting    | express-rate-limit       |
| Containerisation | Docker + Docker Compose  |

---

## 🚀 Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) installed

### Run with Docker

```bash
# 1. Clone the repo
git clone https://github.com/<your-username>/yor-hai.git
cd yor-hai

# 2. Copy env file and adjust if needed
cp .env.example .env

# 3. Start app + Redis
docker compose up --build
```

The API will be available at `http://localhost:3000`.

### Run locally (without Docker)

```bash
npm install
cp .env.example .env
# Make sure a Redis instance is running on localhost:6379
npm run dev
```

---
