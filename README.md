This is a [Next.js](https://nextjs.org) waitlist application. Production hosting is Vercel behind Cloudflare, based on the public response headers verified during the readiness pass. Registrations use Supabase as the authoritative store; local file storage is development-only.

## Production storage and release configuration

1. Create a dedicated Supabase project and apply [`supabase/migrations/202610080001_authoritative_store.sql`](supabase/migrations/202610080001_authoritative_store.sql) with the migration owner. The migration keeps registrations, hashed deletion suppressions, admin sessions, and rate limits in a private schema and exposes only narrowly scoped server RPCs.
2. Set the server-only variables in [`.env.example`](.env.example) in Vercel Project Settings. Keep `SUPABASE_SERVICE_KEY`, `ADMIN_SECRET_KEY`, `ADMIN_SESSION_SECRET`, `SUPPRESSION_SECRET`, and `RATE_LIMIT_SECRET` out of browser variables and logs.
3. Set `BLLUMO_STORAGE=supabase`, `APP_ORIGIN=https://www.bllumo.com`, and keep `WAITLIST_ENABLED=false` while the private owner checklist is incomplete. Registration returns an error when the durable write or required configuration is unavailable.
4. Record the actual Supabase region, backup retention, waitlist retention, deletion workflow, and verified inbox results. Then obtain qualified privacy review and set the release gates. Do not claim a provider or region on the public policy until those values are confirmed.

Development can use `BLLUMO_STORAGE=development-file` and an isolated `BLLUMO_DATA_DIR`; this state is private test data and is never a production fallback.

## Readiness checks

The release pass must exercise restart persistence, concurrent submissions against two processes, database failure, duplicate registration, admin listing/export/deletion consistency, session-cookie replay after logout, token tampering and expiry, missing-secret behavior, origin protection, and shared rate limiting. Use isolated test data and do not print secrets.

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
