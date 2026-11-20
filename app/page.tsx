import Link from 'next/link';
import { BarsIcon, BrandMark, LayersIcon, TargetIcon } from './components/icons';

function DashboardIllustration() {
  return (
    <div className="hero-visual" aria-label="Preview illustration of the DataPulse dashboard">
      <div className="visual-orb" />
      <div className="visual-window">
        <div className="window-top">
          <i />
          <i />
          <i />
        </div>
        <div className="window-body">
          <aside className="visual-sidebar">
            <div className="visual-brand">
              <BrandMark />
              <strong>DataPulse</strong>
            </div>
            <i />
            <i />
            <i />
            <i />
          </aside>
          <div className="visual-content">
            <div className="visual-stats">
              <div>
                <span>
                  <BarsIcon />
                </span>
              </div>
              <div>
                <span>
                  <LayersIcon />
                </span>
              </div>
              <div>
                <span>
                  <BarsIcon />
                </span>
              </div>
              <div>
                <span className="visual-percent">%</span>
              </div>
            </div>
            <div className="visual-panels">
              <div className="visual-line-panel">
                <svg viewBox="0 0 260 105" aria-hidden="true" preserveAspectRatio="none">
                  <path
                    d="M0 82 C30 58 44 53 69 63 S111 43 132 37 S175 56 199 45 S235 14 260 29 V105 H0Z"
                    fill="#d9e7f1"
                  />
                  <path
                    d="M0 82 C30 58 44 53 69 63 S111 43 132 37 S175 56 199 45 S235 14 260 29"
                    fill="none"
                    stroke="#3f7d9e"
                    strokeWidth="4"
                  />
                </svg>
              </div>
              <div className="visual-donut-panel">
                <span />
                <i />
                <i />
                <i />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const benefits = [
  {
    title: 'Track Performance',
    description: 'Monitor your key business metrics in real time.',
    icon: BarsIcon,
  },
  {
    title: 'Make Better Decisions',
    description: 'Turn your data into clear and actionable insights.',
    icon: LayersIcon,
  },
  {
    title: 'Grow Your Business',
    description: 'Identify opportunities and improve your results.',
    icon: TargetIcon,
  },
];

export default function Home() {
  return (
    <main className="home-main">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">
            <span /> Business Analytics
          </p>
          <h1>
            Turn Your Business Data into <em>Clear Results</em>
          </h1>
          <p className="hero-description">
            Track your sales, manage expenses, and monitor key performance metrics — all in one
            simple platform.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/dashboard">
              <BarsIcon /> Go to Dashboard <span aria-hidden="true">→</span>
            </Link>
            <a className="button button-secondary" href="#benefits">
              <span className="play-icon" aria-hidden="true">
                ▶
              </span>{' '}
              See How It Works
            </a>
          </div>
        </div>
        <DashboardIllustration />
      </section>

      <section className="benefits-grid" id="benefits" aria-label="DataPulse benefits">
        {benefits.map(({ title, description, icon: Icon }) => (
          <article className="benefit-card" key={title}>
            <span className="benefit-icon">
              <Icon />
            </span>
            <div>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
