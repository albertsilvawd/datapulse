import type { ExpenseCategory, SalesPoint } from '../lib/dashboard-data';

type SalesPerformanceProps = { data: SalesPoint[] };
type ExpenseCategoriesProps = { categories: ExpenseCategory[]; total: string | null };

const categoryColors: Record<ExpenseCategory['color'], string> = {
  blue: '#2f7398',
  mid: '#619fc1',
  light: '#8ab6d3',
  pale: '#cbdbe7',
};

function buildDonutGradient(categories: ExpenseCategory[]) {
  const total = categories.reduce((sum, category) => sum + category.value, 0);
  if (total <= 0) return 'conic-gradient(#dce5ef 0% 100%)';

  let current = 0;
  const segments = categories.map((category) => {
    const start = (current / total) * 100;
    current += category.value;
    const end = (current / total) * 100;
    return `${categoryColors[category.color]} ${start}% ${end}%`;
  });

  return `conic-gradient(${segments.join(', ')})`;
}

export function SalesPerformance({ data }: SalesPerformanceProps) {
  const maxValue = Math.max(...data.map((point) => point.value), 1);
  const points = data.map((point, index) => {
    const x = data.length === 1 ? 380 : 48 + (index * 700) / (data.length - 1);
    const y = 170 - (point.value / maxValue) * 145;
    return { ...point, x, y };
  });
  const pointString = points.map(({ x, y }) => `${x},${y}`).join(' ');
  const polygonPoints = points.length > 1 ? `48,170 ${pointString} 748,170` : '';
  const axisLabels = [1, 0.75, 0.5, 0.25, 0].map((ratio) => {
    const value = maxValue * ratio;
    return value >= 1000 ? `${Math.round(value / 1000)}K` : Math.round(value).toString();
  });

  return (
    <section className="panel sales-panel" aria-labelledby="sales-performance-title">
      <div className="panel-heading">
        <span className="panel-heading-icon" aria-hidden="true">
          ▥
        </span>
        <div>
          <h2 id="sales-performance-title">Sales Performance</h2>
          <p>Total sales over time</p>
        </div>
      </div>
      {data.length === 0 ? (
        <div className="chart-empty" role="status">
          <span className="empty-chart-icon" aria-hidden="true">
            ⌁
          </span>
          <strong>No sales data yet</strong>
          <p>Sales performance will appear here once data is available.</p>
        </div>
      ) : (
        <div className="chart-wrap">
          <div className="chart-y-labels" aria-hidden="true">
            {axisLabels.map((label, index) => (
              <span key={index}>{label}</span>
            ))}
          </div>
          <div className="chart-area">
            <svg
              className="sales-chart"
              viewBox="0 0 760 190"
              role="img"
              aria-labelledby="sales-chart-title sales-chart-desc"
              preserveAspectRatio="none"
            >
              <title id="sales-chart-title">Sales performance over time</title>
              <desc id="sales-chart-desc">
                Sales trend based on the values provided by the dashboard data source.
              </desc>
              <defs>
                <linearGradient id="sales-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#72a8c5" stopOpacity=".5" />
                  <stop offset="100%" stopColor="#dbe8f1" stopOpacity=".6" />
                </linearGradient>
              </defs>
              {[20, 57, 94, 132, 170].map((y) => (
                <line key={y} x1="0" x2="760" y1={y} y2={y} className="chart-gridline" />
              ))}
              {points.length > 1 && <polygon points={polygonPoints} fill="url(#sales-fill)" />}
              {points.length > 1 ? (
                <polyline
                  points={pointString}
                  fill="none"
                  stroke="#3d7798"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : null}
              {points.map((point) => (
                <circle
                  key={point.month}
                  cx={point.x}
                  cy={point.y}
                  r="5"
                  fill="white"
                  stroke="#3d7798"
                  strokeWidth="3"
                />
              ))}
            </svg>
            <div className="chart-months" aria-hidden="true">
              {data.map(({ month }) => (
                <span key={month}>{month}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export function ExpenseCategories({ categories, total }: ExpenseCategoriesProps) {
  const categoryTotal = categories.reduce((sum, category) => sum + category.value, 0);

  return (
    <section className="panel expense-panel" aria-labelledby="expense-categories-title">
      <div className="panel-heading">
        <span className="panel-heading-icon pie-icon" aria-hidden="true">
          ◕
        </span>
        <div>
          <h2 id="expense-categories-title">Expense Categories</h2>
          <p>Share of total expenses</p>
        </div>
      </div>
      {categories.length === 0 ? (
        <div className="chart-empty" role="status">
          <span className="empty-chart-icon" aria-hidden="true">
            ◔
          </span>
          <strong>No expense data yet</strong>
          <p>Category breakdowns will appear here once data is available.</p>
        </div>
      ) : (
        <div className="expense-content">
          <div
            className="expense-donut"
            role="img"
            aria-label="Expense categories breakdown"
            style={{ background: buildDonutGradient(categories) }}
          >
            <span>{total ?? '—'}</span>
          </div>
          <ul className="expense-legend">
            {categories.map(({ label, value, color }) => (
              <li key={label}>
                <i style={{ backgroundColor: categoryColors[color] }} aria-hidden="true" />
                <span>{label}</span>
                <strong>
                  {categoryTotal > 0 ? `${((value / categoryTotal) * 100).toFixed(1)}%` : '—'}
                </strong>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
