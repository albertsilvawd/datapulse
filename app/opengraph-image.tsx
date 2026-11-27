import { ImageResponse } from 'next/og';

export const alt = 'DataPulse: a KPI dashboard for small businesses';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        background: '#0B1F3A',
        color: '#F8FAFC',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '14px', marginBottom: '40px' }}>
        <div
          style={{ width: '28px', height: '60px', background: '#14B8A6', borderRadius: '6px' }}
        />
        <div
          style={{ width: '28px', height: '100px', background: '#14B8A6', borderRadius: '6px' }}
        />
        <div
          style={{ width: '28px', height: '140px', background: '#14B8A6', borderRadius: '6px' }}
        />
      </div>
      <div style={{ fontSize: '96px', fontWeight: 700 }}>DataPulse</div>
      <div style={{ fontSize: '40px', color: '#94A3B8', marginTop: '16px' }}>
        Track sales, expenses, and profit in one place.
      </div>
    </div>,
    size
  );
}
