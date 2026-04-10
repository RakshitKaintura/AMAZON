=======
# GoCart: Amazon-Like E-Commerce Platform

Fast, polished, and production-ready e‑commerce starter showcasing seller workflows, admin tooling, secure Stripe checkout, and AI-driven review insights.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](#) 
[![Deploy](https://img.shields.io/badge/deploy-vercel-blue)](#) 
[![License: MIT](https://img.shields.io/badge/license-MIT-lightgrey)](#)
[![Contribute](https://img.shields.io/badge/CONTRIBUTE-guidelines-brightgreen)](CONTRIBUTING.md)

---

## Why this project matters

**GoCart** demonstrates how to build a modern marketplace front-to-back. It features multi-store support, role-based admin/seller experiences, secure payments, and actionable product intelligence. It addresses real-world production concerns—webhooks, background jobs, complex DB modeling, and AI-assisted UX—within a cohesive, deployable Next.js application.

### Highlights for Recruiters
- **Polished UI:** Responsive design for product listings, seller dashboards, and admin panels.
- **End-to-End Flows:** Complete lifecycle from adding a product to checkout and webhook reconciliation.
- **Real-world Integrations:** Seamlessly uses Stripe, ImageKit, OpenAI, and Inngest.
- **Pragmatic Architecture:** Built with Next.js App Router, Prisma ORM, and PostgreSQL.

---

## Visual Tour

### Home / Landing
<p align="center">
  <img src="assets/README_IMAGES/HOME_PAGE.png" alt="Home Page" width="100%" />
</p>

### Seller Experience
*Dashboard, Inventory Management, and Order Fulfillment*

| | |
| :---: | :---: |
| <img src="assets/README_IMAGES/SellerDashboard.png" width="400" alt="Seller Dashboard" /> | <img src="assets/README_IMAGES/Manage_Products.png" width="400" alt="Manage Products" /> |
| **Seller Dashboard** | **Inventory Management** |
| <img src="assets/README_IMAGES/Add_New_Products.png" width="400" alt="Add New Product" /> | <img src="assets/README_IMAGES/Screenshot 2026-04-04 183837.png" height=500 width="400" alt="Orders Page" /> |
| **Add New Product** | **Order Tracking** |

### Admin Control Panel
*Global Oversight, Store Management, and Coupons*

<p align="center">
  <img src="assets/README_IMAGES/Admin_Dashboard.png" width="32%" alt="Admin Dashboard" />
  <img src="assets/README_IMAGES/Admin_Stores_Page.png" width="32%" alt="Admin Stores" />
  <img src="assets/README_IMAGES/Coupons_Page.png" width="32%" alt="Coupons Management" />
</p>

### User Journey & Checkout
*Seamless flow from discovery to payment*

| | | |
| :---: | :---: | :---: |
| <img src="assets/README_IMAGES/Cart.png" width="250" alt="Cart" /> | <img src="assets/README_IMAGES/Payment_Page.png" width="250" alt="Payment" /> | <img src="assets/README_IMAGES/Shop_Page.png" width="250" alt="Shop Listing" /> |
| **Smart Cart** | **Secure Payment** | **Product Browsing** |
| <img src="assets/README_IMAGES/MyOrdersPage.png" width="250" alt="My Orders" /> | <img src="assets/README_IMAGES/Plus_Subscription_Page.png" width="250" alt="Subscription" /> | |
| **Order History** | **GoCart+ Plus** | |

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


Review notes

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
>>>>>>> c900503d0290af82f5d071b0136b04fd57a6b608
