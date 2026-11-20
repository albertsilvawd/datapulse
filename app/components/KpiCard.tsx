import type { ComponentType, SVGProps } from 'react';

type KpiCardProps = {
  title: string;
  value: string;
  trend: string;
  direction: 'up' | 'down';
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
        <p className="kpi-value">{value}</p>
        <p className={`kpi-trend ${direction}`}>
          <span aria-hidden="true">{direction === 'up' ? '▲' : '▼'}</span> {trend}
        </p>
      </div>
      <span className={`mini-bars ${direction}`} aria-hidden="true">
        {[22, 34, 49, 66].map((height, index) => (
          <i key={index} style={{ height: `${direction === 'up' ? height : 88 - height}px` }} />
        ))}
      </span>
    </article>
  );
}
