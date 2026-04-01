````markdown
# 🛍️ Shoppie

A full-stack e-commerce storefront with an admin panel — browse by category, manage a cart, check out with Stripe or cash on delivery, and keep the catalog updated from a dashboard.

![React](https://img.shields.io/badge/React_19-blue?style=flat-square&logo=react)
![Express](https://img.shields.io/badge/Express_5-black?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-green?style=flat-square&logo=mongodb)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=flat-square&logo=stripe&logoColor=white)

---

## Overview

Shoppie is a split project — a **Vite + React** client and an **Express API** backed by MongoDB. The `frontend/` and `backend/` directories are independent Node apps, each with their own `package.json`.

---

## Features

- Registration, login, profile management, and password reset (email via Resend when configured)
- Product discovery — home, categories, subcategories, search, and product detail pages
- Cart and checkout with **Stripe online payment** or **cash on delivery**
- Saved addresses and order history at `/dashboard`
- Admin-only routes for categories, subcategories, and product CRUD with image uploads

---

## Stack

| Layer | Technologies |
|-------|-------------|
| **Client** | React 19, Vite, React Router, Redux Toolkit, Tailwind CSS, Axios, Stripe.js |
| **Server** | Express 5, Mongoose, JWT + HTTP-only refresh tokens, Multer, Cloudinary, Resend, Stripe |
| **Database** | MongoDB |

---

## Prerequisites

- Node.js 18 or newer (20 LTS recommended)
- A MongoDB connection string — Atlas or local
- Optional accounts for the full experience: Stripe, Cloudinary, Resend

---

## Setup

```bash
git clone <your-repo-url>
cd Shoppie
```

Install dependencies in both apps:

```bash
cd backend && npm install
cd ../frontend && npm install
```

### Backend environment

Create `backend/.env`. The API will not start without `MONGODB_URI`.

| Variable | Purpose |
|----------|---------|
| `MONGODB_URI` | **Required.** MongoDB connection string. |
| `PORT` | API port. Defaults to `5000`. |
| `FRONTEND_URL` | Origin of the React app (e.g. `http://localhost:5173`). Used for CORS and Stripe redirect URLs. |
| `SECRET_KEY_ACCESS_TOKEN` | JWT secret for access tokens. |
| `SECRET_KEY_REFRESH_TOKEN` | Secret for verifying refresh tokens. |
| `STRIPE_SECRET_KEY` | Stripe secret key for online checkout. |
| `STRIPE_ENPOINT_WEBHOOK_SECRET_KEY` | Webhook signing secret for the Stripe handler in `order.controller.js`. |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name. |
| `CLOUDINARY_API_KEY` | Cloudinary API key. |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret (also accepted as `CLOUDINARY_API_SECRET_KEY`). |
| `RESEND_API` | Resend API key for transactional email. |

> Leave `NODE_ENV` unset for local development. Setting `NODE_ENV=production` enables secure cookie settings.

### Frontend environment

Create `frontend/.env` as needed:

| Variable | Purpose |
|----------|---------|
| `VITE_STRIPE_PUBLIC_KEY` | Stripe publishable key for the checkout page. |
| `VITE_API_URL` | API base URL. Defaults to `http://localhost:5000` if omitted. |

> During development, Vite proxies `/api` to `http://localhost:5000` via `frontend/vite.config.js` — no extra CORS configuration needed.

---

## Running locally

**Terminal 1 — API:**

```bash
cd backend
npm run dev
```

**Terminal 2 — client:**

```bash
cd frontend
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). Keep `FRONTEND_URL` in `backend/.env` aligned with that origin.

### Demo catalog (optional)

Seed sample categories and products without using the admin UI:

```bash
cd backend
npm run seed:demo
```

Run `npm run backfill:images` to refresh product images against Cloudinary once that integration is configured.

---

## Project layout

```
Shoppie/
├── backend/     Express app · routes under /api/*
└── frontend/    Vite + React SPA
```

Production build: `cd frontend && npm run build` — serve the `dist/` folder from any static host and point `VITE_API_URL` (or your reverse proxy) at the live API.

---

## License

No license file is included in this repository. Add one before open-sourcing or redistributing.
````
