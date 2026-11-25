import { createExpenseForCurrentUser, getExpensesForCurrentUser } from '@/lib/data/expenses';

// GET /api/expenses: expenses of the logged-in user's business
export async function GET(): Promise<Response> {
  const expenses = await getExpensesForCurrentUser();
  if (!expenses) {
    return Response.json({ error: 'You must be logged in.' }, { status: 401 });
  }
  return Response.json(expenses);
}

// POST /api/expenses: create an expense for the logged-in user's business
export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Request body must be valid JSON.' }, { status: 400 });
  }

  const result = await createExpenseForCurrentUser(body);
  if (!result.ok) {
    return Response.json({ error: result.error }, { status: result.status });
  }
  return Response.json(result.data, { status: 201 });
}
