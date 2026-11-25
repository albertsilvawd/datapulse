import { ChartNoAxesCombined } from "lucide-react";

export function KpiEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-card px-6 py-12 text-center">
      <div className="mb-4 rounded-full bg-muted p-4">
        <ChartNoAxesCombined className="h-8 w-8 text-muted-foreground" />
      </div>

      <h3 className="font-semibold">No custom KPIs yet</h3>

      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        You haven't created any custom metrics.
        Add your first KPI to start tracking the
        business metrics that matter to you.
      </p>
    </div>
  );
}
