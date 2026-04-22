This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## API Integration Prompt

Use this prompt when wiring frontend flows to the backend APIs:

```text
Integrate the frontend with the backend APIs using role-aware flows.

Use /api/auth/me as the single source of truth after login.
Do not decode JWT manually for identity or ownership.
Use the returned domain IDs for data ownership and API requests.
Use role only for authorization and UI branching.

Public Customer flow:
- Use publicCustomerId from /api/auth/me.
- Call public customer application and financial endpoints with that ID.

Bank Officer flow:
- Use officerId from /api/auth/me.
- After creating a customer, resolve the created bankCustomerId.
- Save step 2 to step 5 using bankCustomerId.

Bank Customer flow:
- Use bankCustomerId from /api/auth/me.
- Call transact, beneficiary, OTP, and history endpoints with bankCustomerId.

Admin flow:
- Use roleName and roleId only for permission checks and UI access.

Keep API calls typed, preserve current forms, and handle 401 by refreshing the token once.
```

Recommended frontend helper flow:
- Call `GET /api/auth/me` once after login or app bootstrap.
- Store the resolved identity in the auth store.
- Use the identity helper to pick the correct owner ID for each role.
- Keep request/response DTOs in `src/types/dto` and API wrappers in `src/api`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
