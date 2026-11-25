"use client";

import { useEffect, useState } from "react";
import type { Kpi } from "@/lib/definitions";
import { KpiEmptyState } from "@/app/components/KpiEmptyState";

export function KpiList() {
    const [kpis, setKpis] = useState<Kpi[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deletingId, setDeletingId] = useState<number | null>(null);

    async function loadKpis() {
        try {
            setError("");

            const response = await fetch("/api/kpis", {
                cache: "no-store",
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to load KPIs.");
            }

            setKpis(data.kpis);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Unable to load KPIs. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadKpis();

        window.addEventListener("kpis-updated", loadKpis);

        return () => {
            window.removeEventListener("kpis-updated", loadKpis);
        };
    }, []);

    async function deleteKpi(id: number) {
        setDeletingId(id);
        setError("");

        try {
            const response = await fetch(
                `/api/kpis?id=${encodeURIComponent(id)}`,
                { method: "DELETE" }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to delete KPI.");
            }

            await loadKpis();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Unable to delete KPI. Please try again."
            );
        } finally {
            setDeletingId(null);
        }
    }

    if (loading) {
        return (
            <p className="text-sm text-muted-foreground">
                Loading KPIs...
            </p>
        );
    }


    return (
        <section className="space-y-4">

            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold">
                        Your KPIs
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Manage your custom business metrics.
                    </p>
                </div>

                <span className="text-sm text-muted-foreground">
                    {kpis.length} total
                </span>
            </div>

            {error && (
                <p role="alert" className="text-sm text-destructive">
                    {error}

                    <button
                        onClick={loadKpis}
                        className="ml-2 underline"
                    >
                        Retry
                    </button>
                </p>
            )}

            {kpis.length === 0 && !error ? (
                <KpiEmptyState />
            ) : kpis.length > 0 ? (
                <div className="space-y-3">
                    {kpis.map((kpi) => (
                        <div
                            key={kpi.id}
                            className="flex items-center justify-between rounded-xl border bg-card p-4"
                        >
                            <div className="space-y-1">
                                <h3 className="font-medium">
                                    {kpi.name}
                                </h3>

                                <p className="text-sm text-muted-foreground">
                                    Unit: {kpi.unit}
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    Target: {kpi.targetValue ?? "Not specified"}
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    Period: {kpi.period}
                                </p>
                            </div>

                            <button
                                onClick={() => deleteKpi(kpi.id)}
                                disabled={deletingId === kpi.id}
                                className="text-sm text-destructive hover:underline disabled:opacity-50"
                                aria-label={`Delete ${kpi.name}`}
                            >
                                {deletingId === kpi.id ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    ))}
                </div>
            ) : null}

        </section>
    );

}
