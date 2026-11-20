import { expenseCategories, salesSeries } from '../lib/mock-dashboard-data';

const points = salesSeries.map((item, index) => `${48 + index * 140},${173 - item.value * 2.6}`).join(' ');

export function SalesPerformance() {
  return (
    <section className="panel sales-panel" aria-labelledby="sales-performance-title">
      <div className="panel-heading">
        <span className="panel-heading-icon">▥</span>
        <div>
          <h2 id="sales-performance-title">Sales Performance</h2>
          <p>Total sales over time</p>
        </div>
      </div>
      <div className="chart-wrap">
        <div className="chart-y-labels" aria-hidden="true">
          <span>50K</span><span>40K</span><span>30K</span><span>20K</span><span>10K</span><span>0</span>
        </div>
        <div className="chart-area">
          <svg className="sales-chart" viewBox="0 0 760 190" role="img" aria-labelledby="sales-chart-title sales-chart-desc" preserveAspectRatio="none">
            <title id="sales-chart-title">Sales performance from July to December</title>
            <desc id="sales-chart-desc">Demonstration data rises overall from 22 thousand dollars in July to 45 thousand dollars in December.</desc>
            <defs>
              <linearGradient id="sales-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#72a8c5" stopOpacity=".5" />
                <stop offset="100%" stopColor="#dbe8f1" stopOpacity=".6" />
              </linearGradient>
            </defs>
            {[20, 50, 80, 110, 140, 170].map((y) => <line key={y} x1="0" x2="760" y1={y} y2={y} className="chart-gridline" />)}
            <polygon points={`48,170 ${points} 748,170`} fill="url(#sales-fill)" />
            <polyline points={points} fill="none" stroke="#3d7798" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            {salesSeries.map((item, index) => (
              <circle key={item.month} cx={48 + index * 140} cy={173 - item.value * 2.6} r="5" fill="white" stroke="#3d7798" strokeWidth="3" />
            ))}
          </svg>
          <div className="chart-months" aria-hidden="true">{salesSeries.map(({ month }) => <span key={month}>{month}</span>)}</div>
        </div>
      </div>
      <p className="demo-note">Demonstration data · Last 6 months</p>
    </section>
  );
}

export function ExpenseCategories() {
  return (
    <section className="panel expense-panel" aria-labelledby="expense-categories-title">
      <div className="panel-heading">
        <span className="panel-heading-icon pie-icon" aria-hidden="true">◕</span>
        <div>
          <h2 id="expense-categories-title">Expense Categories</h2>
          <p>Share of total expenses</p>
        </div>
      </div>
      <div className="expense-content">
        <div className="expense-donut" role="img" aria-label="Demonstration expense category breakdown, totaling $16,320">
          <span>$16,320</span>
        </div>
        <ul className="expense-legend">
          {expenseCategories.map(({ label, value, color }) => (
            <li key={label}><i className={color} aria-hidden="true" /><span>{label}</span><strong>{value}</strong></li>
          ))}
        </ul>
      </div>
      <p className="demo-note">Demonstration data</p>
    </section>
  );
}
