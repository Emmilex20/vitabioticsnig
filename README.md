# Vitabiotics Rebuild

A production-style Next.js commerce platform for a Vitabiotics-inspired wellness brand experience.

This project combines a modern storefront, customer account area, admin product/order management, and a professional portal for doctors and pharmacists in one codebase.

## Overview

The app is built for a premium supplements and wellness shopping flow with:

- A responsive storefront with category browsing, product detail pages, cart, checkout, order tracking, reviews, and wishlist
- Customer accounts with profile, addresses, orders, reviews, and wishlist management
- An admin dashboard for catalog management, order operations, resources, requests, and user oversight
- A professional portal for doctors and pharmacists with gated resources and request submission flows
- SEO foundations including metadata, sitemap, robots, Open Graph, JSON-LD, and favicon support

## Key Features

### Storefront

- Homepage with hero, featured categories, trust sections, and best sellers
- Product listing pages for women, men, kids, pregnancy, and all products
- Product detail pages with gallery, benefit spotlight, reviews, related products, and add-to-cart upsell modal
- Cart and responsive checkout flow
- Paystack payment initialization and verification flow
- Order tracking by reference

### Customer Experience

- Customer sign up and sign in
- Saved addresses and default delivery address support
- Wishlist management
- Product reviews
- Order history and reorder flow

### Admin

- Admin dashboard with request, resource, user, and product insights
- Product list, create, edit, image upload, and catalog management
- Order review and status updates
- Portal resource publishing
- Professional request review workflows

### Professional Portal

- Separate doctor and pharmacist experiences
- Resource library for healthcare professionals
- Request flows for samples, training, presentations, CME/CPD sessions, and medical representative contact

## Tech Stack

- `Next.js 16` with App Router
- `React 19`
- `TypeScript`
- `Tailwind CSS 4`
- `Prisma 7`
- `PostgreSQL`
- `Cloudinary` for media uploads
- `Paystack` for checkout payments
- `Resend` for email flows
- `Sonner` for toast notifications

## Project Structure

```text
src/
  app/
    admin/           Admin dashboard and management screens
    account/         Customer account area
    api/             Route handlers
    portal/          Doctor and pharmacist portal
    products/        Product detail pages
    shop/            Category and catalog pages
  components/
    account/         Customer account UI
    admin/           Admin UI
    auth/            Professional portal auth UI
    home/            Homepage sections
    layout/          Shared shell, navbar, footer
    portal/          Professional portal UI
    shop/            Storefront and checkout UI
  lib/               Shared helpers for auth, SEO, email, payments, Prisma, and storefront mapping
prisma/
  schema.prisma      Data model
  seed.ts            Seed script for portal resources
public/              Static assets and site images
```

## Environment Variables

Create a `.env` file in the project root and provide values for the following variables:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Token signing secret for auth/session handling |
| `NEXTAUTH_URL` | Base application URL |
| `NEXT_PUBLIC_APP_URL` | Public-facing site URL used for SEO and links |
| `RESEND_API_KEY` | Resend API key for email delivery |
| `EMAIL_FROM` | Default sender identity for transactional emails |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `PAYSTACK_SECRET_KEY` | Paystack secret key for payment initialization and verification |

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Generate Prisma client

```bash
npx prisma generate
```

### 3. Push the schema to your database

```bash
npx prisma db push
```

### 4. Seed starter portal resources

```bash
npm run seed
```

### 5. Start the development server

```bash
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | Run ESLint |
| `npm run seed` | Seed starter portal resources into the database |

## Primary Routes

| Area | Route |
| --- | --- |
| Home | `/` |
| Shop | `/shop` |
| Product detail | `/products/[slug]` |
| Cart | `/cart` |
| Checkout | `/checkout` |
| Customer account | `/account` |
| Admin | `/admin` |
| Professional portal | `/portal` |
| Doctor portal | `/portal/doctor` |
| Pharmacist portal | `/portal/pharmacist` |

## Notes for Development

- Product and catalog management are backed by Prisma models in `prisma/schema.prisma`
- Product uploads use Cloudinary-backed admin upload endpoints
- Checkout totals include a fixed delivery fee configured in the checkout/order flow
- SEO metadata is centralized through helpers in `src/lib/seo.ts`
- Storefront and admin auth use role-based route protection

## Deployment Checklist

Before deploying:

1. Set production values for all environment variables
2. Update `NEXT_PUBLIC_APP_URL` and `NEXTAUTH_URL` to the live domain
3. Run `npx prisma generate`
4. Apply the schema to the production database
5. Run `npm run build` to confirm the app compiles cleanly

## Quality Checks

Recommended before pushing:

```bash
npm run lint
npm run build
```

## GitHub README Tips

If you want to make the repository page even stronger, the next good additions would be:

- product screenshots or animated previews
- a small architecture diagram
- a deployment section for Vercel or your preferred host
- contributor/setup notes for admin and portal test accounts

