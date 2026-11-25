import { KpiForm } from "@/app/components/KpiForm";
import { KpiList } from "@/app/components/KpiList"

export default function KpisPage() {
  return (
    <main className="mx-auto w-full max-w-5xl space-y-8 p-6">
      <div>
        <h1 className="text-2xl font-semibold">
          Custom KPIs
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Create and manage your business performance metrics.
        </p>
      </div>
      <KpiForm />
      <KpiList />
    </main>
  );
}
