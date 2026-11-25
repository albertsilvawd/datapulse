"use client";

import { useState } from "react";

export function KpiForm() {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [targetValue, setTargetValue] = useState("");
  const [period, setPeriod] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    if (!name.trim()) {
      setError("KPI name is required.");
      return;
    }

    if (!unit.trim()) {
      setError("Unit is required.");
      return;
    }

    if (!period) {
      setError("Please select a period.");
      return;
    }

    if (
      targetValue.trim() !== "" &&
      (
        !Number.isFinite(Number(targetValue)) ||
        Math.abs(Number(targetValue)) >= 10_000_000_000
      )
    ) {
      setError("Please enter a valid target value.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/kpis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          unit: unit.trim(),
          target_value:
            targetValue.trim() === ""
              ? null
              : Number(targetValue),
          period,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to save KPI.");
        return;
      }

      // Notify the KPI list to fetch the latest records.
      window.dispatchEvent(new Event("kpis-updated"));

      // Reset the form after successful creation.
      setName("");
      setUnit("");
      setTargetValue("");
      setPeriod("");
    } catch {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-xl border bg-card p-6">
      <h2 className="text-lg font-semibold">
        Add custom KPI
      </h2>

      <p className="mb-5 text-sm text-muted-foreground">
        Define a new metric for your business.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="space-y-2">
          <label htmlFor="kpi-name" className="text-sm font-medium">
            KPI Name <span className="text-destructive">*</span>
          </label>

          <input
            id="kpi-name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            placeholder="e.g. Customer Retention Rate"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            maxLength={100}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="kpi-unit" className="text-sm font-medium">
            Unit <span className="text-destructive">*</span>
          </label>

          <input
            id="kpi-unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            placeholder="e.g. %, USD, customers"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            maxLength={30}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="kpi-target-value" className="text-sm font-medium">
            Target Value
            <span className="text-muted-foreground"> (Optional)</span>
          </label>

          <input
            id="kpi-target-value"
            type="number"
            step="any"
            value={targetValue}
            onChange={(e) => {
              setTargetValue(e.target.value);
              setError("");
            }}
            placeholder="e.g. 95"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="kpi-period" className="text-sm font-medium">
            Period <span className="text-destructive">*</span>
          </label>

          <select
            id="kpi-period"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            required
          >
            <option value="">Select a period</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add KPI"}
        </button>

      </form>
    </section>
  );
}
