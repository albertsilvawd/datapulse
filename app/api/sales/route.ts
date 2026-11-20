import { createSaleForCurrentUser, getSalesForCurrentUser } from '@/lib/data/sales';

// GET /api/sales: sales of the logged-in user's business
export async function GET(): Promise<Response> {
  const sales = await getSalesForCurrentUser();
  if (!sales) {
    return Response.json({ error: 'You must be logged in.' }, { status: 401 });
  }
  return Response.json(sales);
}

// POST /api/sales: create a sale for the logged-in user's business
export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Request body must be valid JSON.' }, { status: 400 });
  }

  const result = await createSaleForCurrentUser(body);
  if (!result.ok) {
    return Response.json({ error: result.error }, { status: result.status });
  }
  return Response.json(result.data, { status: 201 });
}
