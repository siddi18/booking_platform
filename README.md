# Booking Platform

[Frontend (Vercel) — Live]
https://booking-platform-eight.vercel.app

[Backend API (Render) — Live]
https://booking-platform-ks70.onrender.com

> API base URL for the frontend: https://booking-platform-ks70.onrender.com/api

## Overview

A full‑stack booking platform for curated experiences. Users can browse experiences, view details, select dates/times, apply promo codes, and complete bookings. The project is a monorepo with a Node/Express/MongoDB backend and a React + Vite + TypeScript frontend.

## Tech Stack

- Backend: Node.js, Express, Mongoose (MongoDB Atlas)
- Frontend: React 19, Vite, TypeScript, Tailwind CSS
- Deployment: Render (backend) and Vercel (frontend)

## Repository Structure

- backend/ — Express API (routes, controllers, models)
- frontend/ — React app (pages, components, API client)

## Quick Start (Local)

### Prerequisites
- Node.js 18+
- A MongoDB Atlas connection string

### 1) Backend (API)

Create `backend/.env`:

```
MONGODB_URI=<your_mongodb_atlas_uri>
PORT=5000
# Leave this off in production; route is disabled unless set to true
ALLOW_SEED=false
# Optional: comma-separated allowlist, overrides defaults
# CORS_ORIGINS=https://your-frontend.example.com,http://localhost:5173
```

Install and run:

```powershell
cd backend
npm ci
npm run dev
```

API will run at http://localhost:5000 with base path `/api`.

### 2) Frontend (Web)

Create `frontend/.env`:

```
VITE_API_URL=http://localhost:5000/api
```

Install and run:

```powershell
cd frontend
npm ci
npm run dev
```

Open the app (default) at http://localhost:5173.

## Environment Variables

### Backend
- MONGODB_URI — MongoDB Atlas connection string
- PORT — HTTP port (default 5000)
- ALLOW_SEED — Enable `/api/seed` only when explicitly `true` (default off)
- CORS_ORIGINS — Optional comma‑separated allowlist that overrides defaults
- ALLOW_ALL_ORIGINS — Optional `true` for temporary debugging only

### Frontend
- VITE_API_URL — The API base URL, e.g. `https://booking-platform-ks70.onrender.com/api`

## Deployment

### Backend on Render
- Root Directory: `backend`
- Build Command: `npm ci`
- Start Command: `npm start`
- Environment:
  - `MONGODB_URI` (required)
  - `PORT` (optional)
  - `ALLOW_SEED=false` (recommended)
  - `CORS_ORIGINS` (optional; e.g. `https://booking-platform-eight.vercel.app`)

CORS in the server allows localhost and `*.vercel.app` by default for previews. You can lock this down with `CORS_ORIGINS` for production‑only domains.

### Frontend on Vercel
- Root Directory: `frontend`
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment:
  - `VITE_API_URL=https://booking-platform-ks70.onrender.com/api`

Redeploy after changing environment variables.

## API Reference

Base URL: `…/api`

- GET `/experiences` — List experiences with pagination and search
  - Query: `page`, `limit`, `search`
- GET `/experiences/:id` — Get one experience with slots
- POST `/bookings` — Create a booking
- GET `/bookings/:email` — Get bookings for a user email
- POST `/promo/validate` — Validate a promo code against a subtotal
- GET `/health` — Service health check

## Seeding Data

There is a reusable seed function and a CLI runner.

- CLI: from `backend/` run

```powershell
npm run seed
```

- HTTP seed route: disabled by default; only mounted if `ALLOW_SEED=true`. Do not enable this in production.

## CORS Notes

- The server sends CORS headers for allowed origins and handles preflight (OPTIONS) globally.
- Defaults allow localhost and `https://*.vercel.app` preview URLs. For strict production, set `CORS_ORIGINS` to an explicit list and redeploy.

## Troubleshooting

- CORS error (No 'Access-Control-Allow-Origin'):
  - Ensure the backend is redeployed with correct CORS settings
  - Set `CORS_ORIGINS` to include your exact frontend domain(s)
  - Verify `VITE_API_URL` points to `…/api`
- Network Error from Axios:
  - Usually a blocked preflight or wrong URL; inspect the browser Network tab

## License

This project is for educational/demo purposes.
