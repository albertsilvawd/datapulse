# DataPulse

A simple KPI dashboard that helps small business owners track their key numbers and see their progress in charts.

## Team Members

- Albert Vicente Santos Silva
- Onavino Tamarabrakemi Pre Ajenavi
- William Benjamin Francia Poma

## Database Setup

DataPulse uses PostgreSQL hosted on Neon through Vercel.

1. Link the project and download the environment variables:
   - `vercel link` (select the **datapulse** project)
   - `vercel env pull .env.local`
2. Make sure `.env.local` contains `DATABASE_URL`. See `.env.example` for the format. Never commit `.env.local`.
3. The tables are already created on the shared database. To recreate them in a new database, run `db/schema.sql` and then `db/seed.sql` in the Neon SQL Editor.
4. Check the connection by running `npm run dev` and opening `http://localhost:3000/api/health`.

### Data model

- **users**: id, name, email (unique), password_hash, created_at
- **businesses**: id, user_id → users, name, currency, created_at
- **sales**: id, business_id → businesses, date, amount, description, created_at
- **expenses**: id, business_id → businesses, date, amount, category, description, created_at
- **kpis**: id, business_id → businesses, name, unit, target_value, period (weekly/monthly), created_at

One user has many businesses, and one business has many sales, expenses, and KPIs. Deleting a business also deletes its related records.

Shared TypeScript types are in `lib/definitions.ts`, and the database client is in `lib/db.ts` (`import { sql } from '@/lib/db'`).
