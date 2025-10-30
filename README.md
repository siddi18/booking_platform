A Hideway Delite — Experience Booking Platform

A fullstack web application for browsing and booking curated travel and adventure experiences.

## Quick summary

- Frontend: React + TypeScript, Vite, TailwindCSS
- Backend: Node.js + Express, MongoDB (Mongoose)
- Purpose: Browse experiences, choose dates/times, and create bookings with a checkout flow.

> Note: project was previously named "Highway Delight" in earlier materials — this repository now uses the brand name "Hideway Delite".

## Repository layout

```
HidewayDelite/
├── frontend/          # React + TypeScript frontend (Vite)
│   ├── src/
│   └── public/
└── backend/           # Node.js + Express backend
   ├── controllers/
   ├── models/
   ├── routes/
   └── test&seed/     # Database seeding scripts
```

## Requirements

- Node.js 18+ (LTS recommended)
- npm (comes with Node.js)
- A MongoDB instance (MongoDB Atlas recommended)

## Environment variables

Create a `.env` file in the `backend/` directory containing at least:

```powershell
# backend\.env
MONGODB_URI="your_mongodb_connection_string"
PORT=5000
```

Replace `your_mongodb_connection_string` with your Atlas connection string (include username, password, and the default database name).

## Install and run (Windows PowerShell)

1. Backend

```powershell
cd 'c:\Users\Siddhi\Downloads\HighwayDeliteAssignment-main\HighwayDeliteAssignment-main\backend'
npm install
# Seed the DB (uses MONGODB_URI from backend\.env)
npm run seed
# Start server
npm run dev
```

The backend listens on the port specified in `.env` (default 5000).

2. Frontend

```powershell
cd 'c:\Users\Siddhi\Downloads\HighwayDeliteAssignment-main\HighwayDeliteAssignment-main\frontend'
npm install
npm run dev
```

The frontend dev server (Vite) typically runs on http://localhost:5173.

## Seed data

- A seed script is provided at `backend/test&seed/seed-runner.js` and an HTTP seed endpoint `POST /api/seed` (server must be running).
- Use `npm run seed` from the `backend/` folder to populate the `experiences` collection with sample experiences.

## Notable implementation details

- TypeScript: the frontend uses TypeScript 5.9.x. If your editor (VS Code) highlights config errors, choose the workspace TypeScript version (Command Palette → "TypeScript: Select TypeScript Version" → "Use Workspace Version").
- The `frontend/tsconfig.app.json` was adjusted for broad tool compatibility; `allowImportingTsExtensions` is enabled since some imports use explicit `.tsx` extensions.
- The backend uses ES modules ("type": "module" in `backend/package.json`).

## API (backend)

- GET /api/experiences?page=&limit=&q=  — list experiences (pagination + search)
- GET /api/experiences/:id                  — get single experience
- POST /api/bookings                         — create a booking
- GET /api/bookings/:id                      — retrieve a booking
- POST /api/seed                             — seed the experiences collection (or run the CLI seed)

## UI changes made in this repository

- Branding updated to "Hideway Delite". The header logo shows an "HD" style icon and the word "delite" (the letter "d" uses a yellow accent in the navbar).
- The details page no longer shows the numeric "X left" availability next to time slots (only a "Sold out" badge appears when a timeslot is fully booked).

## Troubleshooting

- "Cannot find type definition file for 'vite/client'": ensure you installed the frontend dev dependencies and that your editor uses the workspace TypeScript (see note above). Run `npx tsc -p tsconfig.app.json --noEmit` to reproduce/diagnose local TypeScript issues.
- If `npm run seed` fails, confirm `MONGODB_URI` is valid and reachable from your environment. For Atlas, whitelist your IP or allow access from anywhere (temporarily) while seeding.

## Contributing

If you want to contribute changes, please:

1. Open an issue describing the feature or bug.
2. Create a branch for your change.
3. Open a pull request with a concise description and include reproduction steps or screenshots if UI changes.

## License

MIT

---

If you'd like, I can also:
- Update the navbar text to "hideway" and make the "d" yellow in the code (I partially updated components earlier) — I can finish that across components.

Hideway Delite — Department Submission

Overview
--------

Hideway Delite is a compact full-stack application built for demonstrating an end-to-end booking flow: a user browses curated experiences, inspects details, selects date/time slots, and completes bookings via a checkout page. This README is rewritten to be unique for departmental evaluation and contains explicit validation steps, API examples, and administrative notes.

Core technologies
-----------------

- Frontend: React 19 (TypeScript), Vite, Tailwind CSS
- Backend: Node.js + Express, Mongoose for MongoDB
- Database: MongoDB (Atlas or local) storing Experience and Booking documents

Repository layout (concise)
---------------------------

- `frontend/` — React application (Vite). Key folders: `src/components`, `src/pages`, `src/lib`.
- `backend/` — Express app, routes, controllers, Mongoose models. Seeder at `backend/test&seed/seed-runner.js`.

Preparing the environment
-------------------------

1. Create the backend environment file `backend/.env` with these entries:

```text
MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/hideway?retryWrites=true&w=majority"
PORT=5000
```

2. (Optional) If using MongoDB Atlas, add your development IP to the project's network access allow list.

Commands to run locally (recommended order)
-----------------------------------------

Backend (install, seed, run):

```powershell
cd backend
npm ci
npm run seed       # inserts sample experiences
npm run dev        # starts Express server (dev)
```

Frontend (install, serve):

```powershell
cd frontend
npm ci
npm run dev
```

Quick verification (2-minute check)
----------------------------------

1. Backend health: http://localhost:5000/api/health should return an OK JSON.
2. Seed verification: after `npm run seed`, call GET /api/experiences and ensure items are returned.
3. Frontend: open http://localhost:5173 — you should see cards for experiences and be able to open details pages.

API examples
------------

- List experiences (paginated):

   curl:

   ```bash
   curl "http://localhost:5000/api/experiences?page=1&limit=9"
   ```

- Get experience details:

   ```bash
   curl "http://localhost:5000/api/experiences/<experienceId>"
   ```

- Create booking (example payload):

   ```bash
   curl -X POST "http://localhost:5000/api/bookings" \
      -H "Content-Type: application/json" \
      -d '{"experienceId":"<id>","experienceName":"Sample","fullName":"Test User","email":"user@example.com","date":"Oct 30","time":"05:30 am","quantity":2,"subtotal":1000,"taxes":50,"total":1050}'
   ```

Data model summary
------------------

- Experience: { title, location, description, price, image, category, minAge, includes, slots }
- Booking: { experienceId, experienceName, fullName, email, date, time, quantity, subtotal, taxes, total, bookingRef }

Notes for reviewers
-------------------

- The frontend recently removed numeric "X left" availability from the details UI; only a "Sold out" indicator shows when a timeslot has no availability.
- The navbar branding uses an "HD" icon and highlights the letter "d" in yellow for visual identity.

Troubleshooting
---------------

- If TypeScript reports `Cannot find type definition file for 'vite/client'`, ensure frontend dependencies are installed (`npm ci` in `frontend/`). Also set VS Code to use the workspace TypeScript version.
- If seeding fails, check that `MONGODB_URI` is correct and reachable from your machine. For Atlas, ensure network access rules permit your IP.

Optional next steps (I can implement)
-----------------------------------

1. Replace the placeholder header/logo with a provided institutional SVG and enforce the new brand name across the UI.
2. Add a `CONTRIBUTING.md` with coding standards and a `DEV_SETUP.md` with Docker instructions.
3. Run a full frontend production build and provide sample deployment steps.

Contact
-------

For adjustments requested by the department (institutional header, contact email, or additional screenshots), tell me what to include and I will update this README accordingly.

License
-------

MIT
