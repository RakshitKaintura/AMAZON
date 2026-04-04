# Amazon-Like E-Commerce Platform

Fast, polished, and production-ready e‑commerce starter showcasing seller workflows, admin tooling, secure Stripe checkout, and AI-driven review insights and AI Product Reviews Summarizer

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](#) [![Deploy](https://img.shields.io/badge/deploy-vercel-blue)](#) [![License: MIT](https://img.shields.io/badge/license-MIT-lightgrey)](#)

 
 [![Contribute](https://img.shields.io/badge/CONTRIBUTE-guidelines-brightgreen)](CONTRIBUTING.md) [![Code of Conduct](https://img.shields.io/badge/Code%20of%20Conduct-Required-lightgrey)](CODE_OF_CONDUCT.md)
 

---

Why this project matters

GoCart demonstrates how to build a modern marketplace front-to-back: multi-store support, role-based admin/seller experiences, secure payments, and actionable product intelligence. It's ideal as a portfolio piece because it contains real production concerns — webhooks, background jobs, DB modeling, and AI-assisted UX — all in a cohesive, deployable app.

Highlights for recruiters

- Polished UI with product listings, seller dashboards, and admin panels.
- End-to-end flows: add product → checkout → webhook reconciliation → order analytics.
- Real-world integrations: Stripe, ImageKit, OpenAI, Inngest.
- Pragmatic architecture using Next.js App Router + Prisma + Postgres.

---

Visual Tour (high-impact images)

Home / Landing

<p align="center">
	<img src="assets/README_IMAGES/HOME_PAGE.png" alt="Home Page" width="900" />
</p>


Seller Experience — grouped (dashboard, manage, add product, orders)

<p align="center">
	<img src="assets/README_IMAGES/SellerDashboard.png" alt="Seller Dashboard"height=350 width="420" />
	<img src="assets/README_IMAGES/Manage_Products.png" alt="Manage Products" height=350 width="420" />
</p>
<p align="center">
	<img src="assets/README_IMAGES/Add_New_Products.png" alt="Add New Product"height=350  width="420" />
	<img src="assets/README_IMAGES/OrdersPage.png" alt="Orders"height=350 width="420" />
</p>

Admin Panels — grouped (dashboard, stores, coupons)

<p align="center">
	<img src="assets/README_IMAGES/Admin_Dashboard.png" alt="Admin Dashboard" width="420" />
	<img src="assets/README_IMAGES/Admin_Stores_Page.png" alt="Admin Stores" width="420" />
	<img src="assets/README_IMAGES/Coupons_Page.png" alt="Coupons" width="420" />
</p>

User Flows & Checkout — grouped (cart, orders, payment, subscription, shop)

<p align="center">
	<img src="assets/README_IMAGES/Cart.png" alt="Cart" width="300" />
	<img src="assets/README_IMAGES/MyOrdersPage.png" alt="My Orders" width="300" />
	<img src="assets/README_IMAGES/Payment_Page.png" alt="Payment" width="300" />
	<img src="assets/README_IMAGES/Plus_Subscription_Page.png" alt="Subscription" width="300" />
	<img src="assets/README_IMAGES/Shop_Page.png" alt="Shop Listing" width="300" />
</p>

---

Core Features

- Next.js App Router + server components for fast SSR/SSG and secure server actions.
- Full Prisma data model: Users, Stores, Products, Orders, Ratings, Coupons (see `prisma/schema.prisma`).
- Stripe Checkout + webhook handling for secure payment flows and order reconciliation.
- Seller & Admin dashboards for real-world multi-role workflows.
- ImageKit integration for performant image delivery and uploads.
- Inngest-based background jobs for async tasks and event-driven behavior.
- AI review summarization using OpenAI to create concise product insights (`lib/reviewInsights.js`).

Tech Stack

- Frontend: Next.js (app router), React 19, Tailwind CSS, Lucide
- State: Redux Toolkit, react-redux
- Backend: Node.js (Next API routes / server actions), Prisma ORM
- Payments: Stripe
- Database: PostgreSQL (via Prisma)
- Other: ImageKit, Inngest, OpenAI, Clerk

---

Quickstart — run locally

Prerequisites: Node.js 18+, PostgreSQL (or Neon), Stripe account (for checkout), optional OpenAI key for review summaries.

```bash
git clone <repo-url>
cd amazon
npm install
npm run dev
```

Generate Prisma client (if needed):

```bash
npm run build
```

Environment template (`.env`)

```env
# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# OpenAI (optional)
OPENAI_API_KEY=sk-...
OPENAI_BASE_URL=
OPENAI_MODEL=gpt-4o-mini

# ImageKit
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=

# Clerk
CLERK_CLIENT_ID=
CLERK_FRONTEND_API=

# App
NEXT_PUBLIC_APP_NAME=GoCart
```

Architecture (high level)

```
app/        — Next.js app router (public, store, admin)
app/api/    — Server routes (stripe, products, orders, store, inngest)
components/ — Reusable UI components
lib/        — Prisma client, review insights, helpers
prisma/     — schema and migrations
assets/     — README images, UI screenshots
```

Notable implementation details

- `prisma/schema.prisma` contains the canonical DB models used throughout the app.
- `app/api/stripe/route.js` demonstrates secure Stripe webhook verification and order reconciliation.
- `lib/reviewInsights.js` shows how to safely summarize customer reviews with OpenAI and persist results.

Recruiter / Reviewer callouts

- Deployment-ready: uses Vercel-friendly Next.js outputs and stateless API routes.
- Thoughtful production concerns: idempotent webhook handling, on-delete cascades in Prisma, background jobs for expensive tasks.
- Showcase-ready UI: Clear flows for product management, order fulfillment, and analytics.

---

Want this polished further?

- Add a short screencast GIF for the top hero.
- Add `CONTRIBUTING.md`, unit tests, and a GitHub Actions CI pipeline.
- I can also commit a `docs/` folder with usage walkthroughs and architecture diagrams.

Contact

- Live demo: https://amazon-like-liard.vercel.app/
- Repo: [https://github.com/<your-username>/<repo>](https://github.com/RakshitKaintura/AMAZON)
- Author: Rakshit Kaintura blank1951k@gmail.com

---

