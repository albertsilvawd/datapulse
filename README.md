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

## Authentication

DataPulse uses Auth.js v5 with email and password (Credentials provider).

- Sign up at `/signup` and log in at `/login`. Passwords are hashed with bcrypt before they are saved.
- `/dashboard`, `/sales`, and `/expenses` require login. This is handled by `proxy.ts` and `auth.config.ts`.
- `AUTH_SECRET` must be set in `.env.local` (see `.env.example`). Never commit it.
- Every signup also creates the user's first business.
- To read data safely, use the helpers in `lib/data/business.ts`. `getCurrentBusiness()` and `getOwnedBusiness(id)` always filter by the logged-in user, so a user cannot access another user's business records.

## API

All endpoints require a logged-in user and only return or change data from that user's business. Requests without a session receive `401`.

| Method | Route           | Description                                                                                                            | Success |
| ------ | --------------- | ---------------------------------------------------------------------------------------------------------------------- | ------- |
| GET    | `/api/health`   | Checks the database connection and lists the tables                                                                    | `200`   |
| GET    | `/api/sales`    | Lists the sales of the logged-in user's business (newest first)                                                        | `200`   |
| POST   | `/api/sales`    | Creates a sale. Body: `{ "date": "YYYY-MM-DD", "amount": 850.5, "description": "optional" }`                           | `201`   |
| GET    | `/api/expenses` | Lists the expenses of the logged-in user's business (newest first)                                                     | `200`   |
| POST   | `/api/expenses` | Creates an expense. Body: `{ "date": "YYYY-MM-DD", "amount": 320, "category": "Supplies", "description": "optional" }` | `201`   |

Invalid input returns `400` with an `error` message (for example, an invalid date or a negative amount). The business id is always taken from the session, never from the request body.

Server Components can call the same logic directly from `lib/data/sales.ts` and `lib/data/expenses.ts`.
