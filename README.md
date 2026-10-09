# Drive Fleet — Frontend

**Live site:** Not deployed yet — add the production URL here when available.

Drive Fleet is a car-rental web application for discovering vehicles, viewing listing details, and managing bookings. This repository contains the customer-facing Next.js application and its Better Auth integration.

## Features

- Browse the available vehicle fleet and search/filter cars.
- View vehicle details, daily pricing, capacity, pickup location, and availability.
- Create an account and sign in with email/password or Google using Better Auth.
- Add, update, and delete vehicle listings (for authenticated users).
- Book cars and view/manage bookings.
- Responsive homepage with featured cars, informational sections, and FAQs.
- JWT plugin configured for authenticated API token access.

## Tech stack

- Next.js 16 (App Router), React 19, and TypeScript
- HeroUI and Tailwind CSS 4
- Better Auth with MongoDB adapter and JWT plugin
- MongoDB-backed Express API (see the backend README)

## Local development

Prerequisites: Bun 1.4+ and a running backend/MongoDB configuration.

```bash
bun install
bun run dev
```

Open [http://localhost:3888](http://localhost:3888).

To create a production build:

```bash
bun run build
bun run start
```

## Environment variables

Create a `.env.local` file in this frontend directory. Use the appropriate local or deployed values; never commit secrets.

```env
NEXT_PUBLIC_SERVER_URI=http://localhost:8001/api/v1
MONGODB_URI=mongodb://localhost:27017/drive-fleet
BETTER_AUTH_URL=http://localhost:3888
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

`NEXT_PUBLIC_SERVER_URI` must include the API prefix (`/api/v1`). Configure a MongoDB connection string and Google OAuth credentials appropriate for your environment.

## Related project

The REST API is maintained in [`../programming-hero-b13-a09-backend-reboot`](../programming-hero-b13-a09-backend-reboot/README.md).
