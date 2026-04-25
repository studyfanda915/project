# Full-Stack Restaurant Management Web App

This repository contains a complete QR-first restaurant workflow with three roles:

- **Customer**: scans QR code, browses categorized menu with images, adds cart items, places orders.
- **Owner**: receives real-time order notifications, updates status, assigns staff, manages payment state, and tracks bill totals.
- **Admin**: adds/edits/deletes menu items, uploads item images, controls customer/owner visibility.

## Monorepo Structure

- `frontend/` → Next.js + Tailwind CSS app (mobile-first pages for Customer, Owner, Admin)
- `backend/` → Node.js + Express + Socket.IO + MongoDB API and scheduled jobs

## Core Features Implemented

### Customer Module
- QR-ready route pattern via `/table/:tableNumber`.
- Responsive categorized menu cards with item images and prices.
- Cart and order placement flow.
- Table number captured in each order payload.

### Owner Dashboard
- Real-time updates using Socket.IO events (`order:new`, `order:updated`).
- Incoming order list with status badges.
- Staff assignment and order status controls (`Pending`, `Preparing`, `Completed`).
- Payment status toggling (`unpaid`/`paid`).
- Auto-bill generation with subtotal + tax.
- Automated 2-hour report generation (PDF + Excel) and optional WhatsApp API delivery.

### Admin Panel
- Menu CRUD operations.
- Menu image upload endpoint (multipart with Multer).
- Price/category management.
- Visibility controls (`visibleToCustomers`, `visibleToOwners`).

### Backend Data Rules
- Orders store timestamps via Mongoose `timestamps`.
- Retention job keeps only last 7 days in active collection.
- Optional archiving to `ArchivedOrder` when `ARCHIVE_ORDERS=true`.

## API Overview

- `GET /api/menu?visible=true`
- `POST /api/menu/upload` (Admin role)
- `POST /api/menu` (Admin role)
- `PATCH /api/menu/:id` (Admin role)
- `DELETE /api/menu/:id` (Admin role)
- `POST /api/orders`
- `GET /api/orders` (Owner/Admin role)
- `PATCH /api/orders/:id` (Owner/Admin role)

> Role guard is implemented through `x-role` request header for demo purposes.

## Environment Variables (Backend)

Create `backend/.env`:

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/restaurant
ARCHIVE_ORDERS=true
WHATSAPP_API_URL=
WHATSAPP_NUMBER=
```

## Local Development

```bash
npm install
npm run dev:backend
npm run dev:frontend
```

Frontend default URL: `http://localhost:3000`
Backend default URL: `http://localhost:4000`

Set `NEXT_PUBLIC_API_URL=http://localhost:4000/api` in `frontend/.env.local` if needed.

## Deployment Suggestion

- Deploy `frontend/` on **Vercel**.
- Deploy `backend/` on **Render** or **Railway**.
- Use managed MongoDB (Atlas) and set CORS/Socket origins accordingly.

## Security + Scalability Notes

- Add JWT/session auth and role-based middleware tied to users table before production.
- Restrict upload MIME types, add antivirus scanning/CDN storage for images.
- Use queues/workers for report jobs in high-traffic environments.
- Add rate-limiting, Helmet, and request validation (zod/joi).
