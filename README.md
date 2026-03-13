# March Madness

A web app featuring three year recap images, a **Rocket Boost counter**, an interactive **coin flip**, and a **Whiskey Line counter**. Both counters persist across sessions via SQLite.

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18 + Vite |
| Backend | Node.js + Express |
| Database | SQLite (`better-sqlite3`) |
| Deployment | Render (single web service) |

---

## Local Development

```bash
# 1. Install all dependencies
npm run install:all

# 2. Start both servers (frontend + backend)
npm run dev
```

- Frontend → http://localhost:5173
- Backend API → http://localhost:3001

Vite automatically proxies `/api/*` to the backend in dev mode.

---

## Deploy to Render

1. Push this folder to a new GitHub repository.
2. In [Render](https://render.com), click **New → Web Service** and connect the repo.
3. Render reads `render.yaml` and configures everything automatically.
4. Click **Deploy**.

> **SQLite persistence note:** `render.yaml` includes a persistent disk at `/var/data` (≈$1/mo). Without it, the database resets on every deploy. Remove the `disk:` block from `render.yaml` if that's acceptable.

---

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/counters` | Fetch both counter values |
| POST | `/api/counters/rocket/increment` | +1 Rocket |
| POST | `/api/counters/rocket/decrement` | −1 Rocket (min 0) |
| POST | `/api/counters/rocket/reset` | Reset Rocket to 0 |
| POST | `/api/counters/whiskey/increment` | +1 Whiskey |
| POST | `/api/counters/whiskey/decrement` | −1 Whiskey (min 0) |
| POST | `/api/counters/whiskey/reset` | Reset Whiskey to 0 |

---

## Project Structure

```
march-madness/
├── package.json              ← root scripts
├── render.yaml               ← Render deploy config
├── .gitignore
├── README.md
├── server/
│   ├── index.js              ← Express server & API routes
│   ├── db.js                 ← SQLite setup & seeding
│   └── package.json
└── client/
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── App.jsx
        ├── App.css
        └── components/
            ├── ImageCard.jsx       ← Year recap images (top row)
            ├── RocketCounter.jsx   ← Rocket Boost counter
            ├── CoinFlip.jsx        ← 5s animated coin flip
            └── WhiskeyCounter.jsx  ← Whiskey Line counter
```
