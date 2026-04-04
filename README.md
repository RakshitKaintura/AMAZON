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
| <img src="assets/README_IMAGES/Add_New_Products.png" width="400" alt="Add New Product" /> | <img src="assets/README_IMAGES/OrdersPage.png" width="400" alt="Orders Page" /> |
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

## Core Features

- **Next.js App Router:** Utilizing server components for fast SSR/SSG and secure server actions.
- **Robust Data Model:** Full Prisma schema covering Users, Stores, Products, Orders, Ratings, and Coupons.
- **Stripe Integration:** Checkout flows + webhook handling for secure payment reconciliation.
- **Multi-Role Dashboards:** Specialized views and permissions for Sellers and Administrators.
- **Image Optimization:** Integrated with ImageKit for performant asset delivery.
- **Background Jobs:** Powered by Inngest for event-driven, asynchronous tasks.
- **AI Insights:** Automated product review summarization using OpenAI (`lib/reviewInsights.js`).

---

## Tech Stack

- **Frontend:** Next.js 15 (App Router), React 19, Tailwind CSS, Lucide Icons
- **State Management:** Redux Toolkit, React-Redux
- **Backend:** Node.js, Prisma ORM
- **Database:** PostgreSQL
- **Services:** Stripe (Payments), ImageKit (Media), Inngest (Queueing), OpenAI (AI), Clerk (Auth)

---

## Quickstart

### Prerequisites
- Node.js 18+
- PostgreSQL instance (e.g., Neon)
- Stripe Account (for API keys)
- OpenAI Key (optional for AI summaries)

### Local Setup
1. **Clone the repository:**
   ```bash
   git clone [https://github.com/RakshitKaintura/AMAZON.git](https://github.com/RakshitKaintura/AMAZON.git)
   cd AMAZON
