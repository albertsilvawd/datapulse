import type { ComponentType, SVGProps } from 'react';

type KpiCardProps = {
  title: string;
  value: string | null;
  trend?: string | null;
  direction?: 'up' | 'down';
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export default function KpiCard({ title, value, trend, direction, icon: Icon }: KpiCardProps) {
  return (
    <article className="kpi-card">
      <span className="kpi-icon-wrap">
        <Icon className="kpi-icon" />
      </span>
      <div className="kpi-content">
        <h2>{title}</h2>
        <p className="kpi-value">{value ?? '—'}</p>
        {value === null ? (
          <p className="kpi-trend empty">No data yet</p>
        ) : trend ? (
          <p className={`kpi-trend ${direction ?? 'up'}`}>
            <span aria-hidden="true">{direction === 'down' ? '▼' : '▲'}</span> {trend}
          </p>
        ) : null}
      </div>
    </article>
  );
}
