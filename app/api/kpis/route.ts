import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import {
  getCurrentUserId,
  getCurrentBusiness,
} from "@/lib/data/business";

export const dynamic = "force-dynamic";

// GET: Fetch KPIs belonging to the logged-in user's business.
export async function GET() {
  try {
    const userId = await getCurrentUserId();

    if (!userId) {
      return NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 }
      );
    }

    const business = await getCurrentBusiness();

    if (!business) {
      return NextResponse.json(
        { error: "No business found for this account." },
        { status: 404 }
      );
    }

    const kpis = await sql`
      SELECT
        id,
        business_id AS "businessId",
        name,
        unit,
        target_value AS "targetValue",
        period,
        created_at AS "createdAt"
      FROM kpis
      WHERE business_id = ${business.id}
      ORDER BY created_at DESC
    `;

    const formattedKpis = kpis.map((kpi) => ({
      ...kpi,
      id: Number(kpi.id),
      businessId: Number(kpi.businessId),
      targetValue:
        kpi.targetValue === null
          ? null
          : Number(kpi.targetValue),
    }));

    return NextResponse.json({
      kpis: formattedKpis,
    });

  } catch (error) {
    console.error("GET KPIs error:", error);

    return NextResponse.json(
      { error: "Unable to retrieve KPIs." },
      { status: 500 }
    );
  }
}


// POST: Create a new KPI.
export async function POST(request: Request) {
  try {
    const userId = await getCurrentUserId();

    if (!userId) {
      return NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 }
      );
    }

    const business = await getCurrentBusiness();

    if (!business) {
      return NextResponse.json(
        { error: "No business found for this account." },
        { status: 404 }
      );
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }

    if (
      typeof body !== "object" ||
      body === null ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        { error: "Invalid request data." },
        { status: 400 }
      );
    }

    const data = body as Record<string, unknown>;

    const name =
      typeof data.name === "string"
        ? data.name.trim()
        : "";

    const unit =
      typeof data.unit === "string"
        ? data.unit.trim()
        : "";

    const period = data.period;
    const targetValue = data.target_value;

    // Validate KPI name.
    if (!name || name.length > 100) {
      return NextResponse.json(
        { error: "KPI name is required and must not exceed 100 characters." },
        { status: 400 }
      );
    }

    // Validate unit.
    if (!unit || unit.length > 30) {
      return NextResponse.json(
        { error: "Unit is required and must not exceed 30 characters." },
        { status: 400 }
      );
    }

    // Validate period.
    if (period !== "weekly" && period !== "monthly") {
      return NextResponse.json(
        { error: "Period must be weekly or monthly." },
        { status: 400 }
      );
    }

    // Validate optional target value.
    if (
      targetValue !== null &&
      (
        typeof targetValue !== "number" ||
        !Number.isFinite(targetValue) ||
        Math.abs(targetValue) >= 10_000_000_000
      )
    ) {
      return NextResponse.json(
        { error: "Target value must be a valid number within the database limit." },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO kpis (
        business_id,
        name,
        unit,
        target_value,
        period
      )
      VALUES (
        ${business.id},
        ${name},
        ${unit},
        ${targetValue},
        ${period}
      )
      RETURNING
        id,
        business_id AS "businessId",
        name,
        unit,
        target_value AS "targetValue",
        period,
        created_at AS "createdAt"
    `;

    const kpi = {
      ...result[0],
      id: Number(result[0].id),
      businessId: Number(result[0].businessId),
      targetValue:
        result[0].targetValue === null
          ? null
          : Number(result[0].targetValue),
    };

    return NextResponse.json(
      {
        message: "KPI created successfully.",
        kpi,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("POST KPI error:", error);

    return NextResponse.json(
      { error: "Unable to create KPI." },
      { status: 500 }
    );
  }
}


// DELETE: Delete a KPI belonging to the logged-in user's business.
export async function DELETE(request: Request) {
  try {
    const userId = await getCurrentUserId();

    if (!userId) {
      return NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 }
      );
    }

    const business = await getCurrentBusiness();

    if (!business) {
      return NextResponse.json(
        { error: "No business found for this account." },
        { status: 404 }
      );
    }

    const { searchParams } = new URL(request.url);

    const id = Number(searchParams.get("id"));

    if (!Number.isSafeInteger(id) || id <= 0) {
      return NextResponse.json(
        { error: "A valid KPI ID is required." },
        { status: 400 }
      );
    }

    const result = await sql`
      DELETE FROM kpis
      WHERE id = ${id}
        AND business_id = ${business.id}
      RETURNING id
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: "KPI not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "KPI deleted successfully.",
    });

  } catch (error) {
    console.error("DELETE KPI error:", error);

    return NextResponse.json(
      { error: "Unable to delete KPI." },
      { status: 500 }
    );
  }
}
