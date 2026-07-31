# GoCart — Architecture Documentation

> **Open `diagrams/architecture.html` in your browser** to see all five sections rendered as interactive, beautifully styled Mermaid diagrams.

## Contents

1. **High-Level Architecture Diagram** — Full-stack overview of all services, clients, databases, and external integrations.
2. **ER Diagram (Entity-Relationship)** — Complete database schema showing all models, fields, types, and relationships.
3. **Authentication Flow** — Clerk-based auth lifecycle including user sync via Inngest, admin verification, and seller authorization.
4. **Request / Sequence Flow** — End-to-end flows for product browsing, cart management, checkout (COD + Stripe), rating, and store management.
5. **Technology Decision Sheet** — Rationale behind every major technology choice.

---

## Quick Reference

| Layer           | Technology                              |
|----------------|-----------------------------------------|
| Framework      | Next.js 16 (App Router)                |
| Auth           | Clerk                                  |
| Database       | Neon Serverless Postgres               |
| ORM            | Prisma (with `@prisma/adapter-neon`)   |
| State          | Redux Toolkit                          |
| Payments       | Stripe (Checkout + Webhooks)           |
| AI             | OpenAI (review summaries)              |
| Image Upload   | ImageKit                               |
| Background Jobs| Inngest                                |
| Styling        | Tailwind CSS v4                        |
| Charts         | Recharts                               |

---

Rendered diagrams → [`diagrams/architecture.html`](./diagrams/architecture.html)
