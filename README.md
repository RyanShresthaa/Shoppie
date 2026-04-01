# Shoppie

E-commerce storefront and admin panel: browse by category, manage a cart, check out with Stripe or cash on delivery, and keep the catalog updated from a dashboard.

This is a split project: a Vite + React client and an Express API backed by MongoDB. Nothing fancy about the layout—`frontend/` and `backend/` are independent Node apps with their own `package.json` files.

## Stack

**Client:** React 19, Vite, React Router, Redux Toolkit, Tailwind CSS, Axios, Stripe.js  

**Server:** Express 5, Mongoose, JWT (access) + refresh token in an HTTP-only cookie, Multer for uploads, Cloudinary for image storage, Resend for mail, Stripe for payments  

**Data:** MongoDB

## What you get

- Registration, login, profile, and password reset flows (email goes through Resend when configured)
- Product discovery: home, categories, subcategories, search, product detail
- Cart and checkout (Stripe online payment or COD, depending on what you enable)
- Saved addresses and order history under `/dashboard`
- Admin-only routes for categories, subcategories, product CRUD, and uploads (gated in the UI)

## Prerequisites

- Node.js 18 or newer (20 LTS is a safe bet)
- A MongoDB connection string (Atlas or local)
- Accounts/keys if you want the full experience: Stripe, Cloudinary, Resend

## Setup

```bash
git clone <your-repo-url>
cd Shoppie
