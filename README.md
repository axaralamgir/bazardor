# বাজার দর (BazarDor)

A Bengali daily market-price site for Bangladesh: today's prices for rice, lentils, oil, vegetables, fish, meat, eggs/dairy and spices, with price changes, a live ticker and market-by-market breakdowns.

## Features

- **Live price ticker** – seamless, pause-on-hover scroller (respects `prefers-reduced-motion`).
- **Biggest movers** – top 6 risers and top 6 fallers, sorted by numeric % change.
- **All products + category pages** with numeric price sorting (low→high, high→low).
- **Protected product details** – min / max / average and a market-wise price table from the API.
- **Better Auth** – email/password, Google and GitHub sign-in, server-validated sessions.
- **Profile + update name**, toast notifications, skeleton loaders, Bengali 404 and error pages.
- Prices formatted with `Intl.NumberFormat("bn-BD")`; Bengali date via `Intl.DateTimeFormat`.

## Tech stack

Next.js (App Router, JavaScript only) · React · Tailwind CSS · DaisyUI · Better Auth · MongoDB · react-hot-toast · Lucide React

## Setup

This repo contains the application source (`src/`) and config. Install the framework and libraries at their latest stable versions:

```bash
# 1. create a fresh JS App Router project (answer: No TypeScript, Yes ESLint, Yes Tailwind, Yes src/ dir, alias @/*)
npx create-next-app@latest bazardor
cd bazardor

# 2. copy this repo's src/, jsconfig.json, .env.example, .gitignore over the generated files

# 3. dependencies
npm install better-auth mongodb react-hot-toast lucide-react
npm install -D daisyui
```

Check the current install guides if a major version changed:
[Next.js](https://nextjs.org/docs) · [Tailwind](https://tailwindcss.com/docs/installation/framework-guides/nextjs) · [DaisyUI](https://daisyui.com/docs/install/) · [Better Auth](https://better-auth.com/docs).

## Environment variables

```bash
cp .env.example .env.local
```

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_BAZARDOR_API_URL` | Data API base URL (primary by default) |
| `NEXT_PUBLIC_BAZARDOR_FALLBACK_API_URL` | Used automatically if the primary fails |
| `BETTER_AUTH_SECRET` | Generate with `npx @better-auth/cli secret` or `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | Site origin, e.g. `http://localhost:3000` |
| `MONGODB_URI` | MongoDB connection string **including the database name** |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub OAuth |

To switch to the alternative API, set `NEXT_PUBLIC_BAZARDOR_API_URL=https://api.abcz.workers.dev/api/bazardor`.

### MongoDB

Create a free Atlas cluster, add a database user, allow your IP (or `0.0.0.0/0` for Vercel), and paste the URI into `MONGODB_URI`, e.g. `mongodb+srv://USER:PASS@cluster.mongodb.net/bazardor`. Better Auth needs the `user`, `session`, `account` and `verification` collections; create them with `npx @better-auth/cli migrate` or let MongoDB create them on first write.

### OAuth callback URLs

| Provider | Authorized redirect URI |
| --- | --- |
| Google (Cloud Console → Credentials → OAuth client, Web) | `{BETTER_AUTH_URL}/api/auth/callback/google` |
| GitHub (Settings → Developer settings → OAuth Apps) | `{BETTER_AUTH_URL}/api/auth/callback/github` |

Register both a `http://localhost:3000/...` and your production URL. A provider button works only once its client ID **and** secret are set.

## Commands

```bash
npm run dev      # development
npm run lint
npm run build
npm start        # production server
```

## API

Base: `https://api.api-store.workers.dev/api/bazardor` (fallback: `https://api.abcz.workers.dev/api/bazardor`)

`GET /products` · `GET /products/:id` · `GET /categories` · `GET /categories/:slug`

Product fields used: `id, slug, nameBn, category, categoryNameBn, categoryIcon, unit (kg|litre|dozen|piece), image, today, yesterday, lastWeek, lastMonth, change.pct, markets[{market, division, min, max}]`. All access goes through `src/lib/api.js`, which validates the shape, falls back to the alternative API on outages, and treats a 404 as "not found" rather than an outage.

## Deploying to Vercel

1. Push to GitHub and import the repo in Vercel.
2. Add every variable from `.env.example` in Project Settings → Environment Variables (`BETTER_AUTH_URL` = your production origin).
3. Add the production callback URLs to the Google and GitHub OAuth apps and allow Vercel's IPs in MongoDB Atlas.
4. Deploy. All routes are server-rendered on demand, so dynamic URLs work on refresh.

## Notes

Prices come from a third-party API and are indicative only; they change with market conditions and the API may be temporarily unavailable.
