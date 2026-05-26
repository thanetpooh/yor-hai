# 🔗 Yor-Hai — URL Shortener + QR Generator
<img width="1252" height="886" alt="Image" src="https://github.com/user-attachments/assets/1f1af6c5-4143-4095-aac3-54c6c1948249" />

A full-stack URL shortening service with a QR code generator UI.  
Backend: **Node.js + Express + Upstash Redis**. Frontend: **React + TypeScript + Tailwind**.

---

## ✨ Features

- **Shorten URLs** — generates a unique 6-character short code
- **QR code** — served as PNG or SVG from the backend
- **Instant redirect** — resolves short code and redirects
- **Auto-expiry** — links expire after **30 days** via Redis TTL
- **Rate limiting** — max **10 requests / 15 min** on the shorten endpoint
- **Input validation** — HTTP/HTTPS URLs only, validated with Zod

---

## 🚀 Getting Started

### Prerequisites

Create **Upstash Redis** database free from [upstash.com](https://upstash.com) you will get `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`

---

### Run with Docker

```bash
cp backend/.env.example backend/.env
# edit your config on backend/.env
docker compose up --build
```

- Backend → `http://localhost:3000`
- Frontend → `http://localhost:5173`

---

### Run locally (without Docker)

```bash
# Terminal 1 — backend
cd backend
cp .env.example .env
# edit .env
npm install
npm run dev

# Terminal 2 — frontend
cd frontend
npm install
npm run dev
```
