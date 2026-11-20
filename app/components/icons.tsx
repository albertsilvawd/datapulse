import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

export function BrandMark({ className, ...props }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 42 42" fill="none" className={className} {...props}>
      <rect x="3" y="24" width="9" height="15" rx="4" fill="currentColor" />
      <rect x="16" y="14" width="9" height="25" rx="4" fill="currentColor" />
      <rect x="29" y="3" width="9" height="36" rx="4" fill="currentColor" />
    </svg>
  );
}

export function BarsIcon({ className, ...props }: IconProps) {
  return <BrandMark className={className} {...props} />;
}

export function LayersIcon({ className, ...props }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" className={className} {...props}>
      <path d="m24 5 19 10-19 10L5 15 24 5Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="m7 23 17 9 17-9M7 31l17 9 17-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TargetIcon({ className, ...props }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" className={className} {...props}>
      <circle cx="23" cy="25" r="17" stroke="currentColor" strokeWidth="3" />
      <circle cx="23" cy="25" r="9" stroke="currentColor" strokeWidth="3" />
      <circle cx="23" cy="25" r="2.5" fill="currentColor" />
      <path d="m24 24 16-16m-7 1h7v7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CartIcon({ className, ...props }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" className={className} {...props}>
      <path d="M4 6h3l3.2 14.2h14.6l3-10.2H9" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12.5" cy="25" r="1.8" fill="currentColor" />
      <circle cx="23" cy="25" r="1.8" fill="currentColor" />
    </svg>
  );
}

export function StoreIcon({ className, ...props }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" className={className} {...props}>
      <path d="M5 13h22l-2-7H7l-2 7Zm2 0v13h18V13M12 26v-8h8v8" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M5 13a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 4 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function CoinsIcon({ className, ...props }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" className={className} {...props}>
      <ellipse cx="13" cy="8" rx="8" ry="4" stroke="currentColor" strokeWidth="2.5" />
      <path d="M5 8v6c0 2.2 3.6 4 8 4 1.2 0 2.4-.2 3.4-.4M5 14v6c0 2.2 3.6 4 8 4" stroke="currentColor" strokeWidth="2.5" />
      <ellipse cx="21" cy="19" rx="7" ry="3.5" stroke="currentColor" strokeWidth="2.5" />
      <path d="M14 19v5c0 2 3.1 3.5 7 3.5s7-1.5 7-3.5v-5" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}

export function PercentIcon({ className, ...props }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" className={className} {...props}>
      <circle cx="9" cy="9" r="3.2" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="23" cy="23" r="3.2" stroke="currentColor" strokeWidth="2.5" />
      <path d="m24 6-16 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function BellIcon({ className, ...props }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 28 28" fill="none" className={className} {...props}>
      <path d="M7 11a7 7 0 0 1 14 0c0 8 3 8 3 10H4c0-2 3-2 3-10Zm4 13a3 3 0 0 0 6 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
