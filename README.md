# 🔗 Yor-Hai — URL Shortener + QR Generator

A full-stack URL shortening service with a QR code generator UI.  
Backend: **Node.js + Express + Redis**. Frontend: **React + TypeScript + Tailwind + DaisyUI**.

---

## ✨ Features

- **Shorten URLs** — generates a unique 6-character short code
- **QR code** — served as PNG or SVG from the backend
- **Instant redirect** — resolves short code and redirects
- **Auto-expiry** — links expire after **30 days** via Redis TTL
- **Rate limiting** — max **10 requests / 15 min** on the shorten endpoint
- **Input validation** — HTTPS URLs only, validated with Zod
- **Dockerised** — single `docker compose up` spins everything up

## 🚀 Getting Started

### Run with Docker (recommended)

```bash
cp backend/.env.example backend/.env
docker compose up --build
```

- API → `http://localhost:3000`
- Frontend dev server → `http://localhost:5173` (run separately, see below)

### Run locally (without Docker)

```bash
# Terminal 1 — backend (requires Redis on localhost:6379)
cd backend
cp .env.example .env
npm install
npm run dev

# Terminal 2 — frontend
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` — the Vite dev server proxies `/api` to `localhost:3000`.
