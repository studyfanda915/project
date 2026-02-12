# Smart File Converter

Production-ready full-stack Next.js 14 app for converting documents, images, media, and AI-assisted transformations.

## Stack
- Next.js 14 (App Router) + TypeScript strict mode
- TailwindCSS + reusable UI components + lucide-react icons
- Prisma + PostgreSQL
- NextAuth (credentials + Google OAuth)
- Queue architecture (worker-compatible conversion queue module)
- Redis/BullMQ ready via docker-compose
- Vitest unit tests + Playwright smoke tests
- Docker + docker-compose for local production-like run

## Features delivered
- Converters: document, image, media
- Tool suites: PDF tools, image tools, video tools
- AI APIs: summarize, translate, rewrite, extract key points (provider interface + mock provider)
- QR code generator (PNG data URL)
- User dashboard and admin dashboard
- API key creation/revoke endpoints (Pro monetization architecture)
- Security defaults: rate limiting, encrypted file-at-rest, retention policy, virus-scan hook placeholder, minimal logs architecture
- Legal/support pages and pricing

## Quick start
```bash
cp .env.example .env
npm install
npm run prisma:generate
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
```

Open http://localhost:3000

## Docker
```bash
docker-compose up --build
```

Then run migrations in container shell:
```bash
docker-compose exec app npx prisma migrate dev --name init
docker-compose exec app npm run prisma:seed
```

## API overview
- `POST /api/upload`
- `POST /api/jobs`
- `GET /api/jobs/:id`
- `GET /api/download/:id`
- `DELETE /api/files/:id`
- `POST /api/ai/summarize|translate|rewrite|extract`
- `POST /api/qr`
- `GET /api/admin/stats`
- `POST/DELETE /api/api-keys`

## Notes
Actual conversion engines (LibreOffice, FFmpeg, OCR binaries, background remover model, signing engines, Stripe live billing) are intentionally abstracted so production implementations can be plugged into the provided architecture.
