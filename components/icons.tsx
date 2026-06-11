'use client';

import React from 'react';

// Icon set from Proben MVP 6 shared.jsx
// All icons use currentColor, thin stroke width

export const Ic = {
  arrow: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14M13 6l6 6-6 6"/>
    </svg>
  ),
  eye: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  shield: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>
    </svg>
  ),
  layers: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3l9 5-9 5-9-5 9-5z"/>
      <path d="M3 13l9 5 9-5"/>
    </svg>
  ),
  gap: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3l9 5-9 5-9-5 9-5z"/>
      <text x="12" y="10.7" fontSize="7" fontWeight="700" fill="currentColor" stroke="none" textAnchor="middle">?</text>
    </svg>
  ),
  target: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="8"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  warn: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3l9 16H3z"/>
      <path d="M12 10v4M12 17h.01"/>
    </svg>
  ),
  minus: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14"/>
    </svg>
  ),
  check: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 12l5 5 11-12"/>
    </svg>
  ),
  mic: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="9" y="3" width="6" height="11" rx="3"/>
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>
    </svg>
  ),
  spark: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>
    </svg>
  ),
  chevR: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 6l6 6-6 6"/>
    </svg>
  ),
  chevL: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 6l-6 6 6 6"/>
    </svg>
  ),
  doc: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 2h8l4 4v16H6z"/>
      <path d="M14 2v4h4M9 13h6M9 17h6"/>
    </svg>
  ),
  flask: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 3h6M10 3v6L5 19a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-10V3"/>
    </svg>
  ),
  x: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 6l12 12M18 6L6 18"/>
    </svg>
  ),
  user: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>
    </svg>
  ),
  play: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...props}>
      <path d="M8 5v14l11-7z"/>
    </svg>
  ),
};

// Theme toggle icons
export const Sun = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...props}>
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/>
  </svg>
);

export const Moon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...props}>
    <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>
  </svg>
);

// Additional icons for context sources
export const IcChart = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 20V11M10 20V5M16 20v-6M21 20H3"/>
  </svg>
);

export const IcCode = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M8 7l-5 5 5 5M16 7l5 5-5 5"/>
  </svg>
);

export const IcUsers = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="9" cy="8" r="3.2"/>
    <path d="M3 20c0-3.3 2.7-5 6-5s6 1.7 6 5"/>
    <path d="M16 5.2A3.2 3.2 0 0 1 16 11M21 20c0-3-1.6-4.6-4-4.9"/>
  </svg>
);

export const IcSlides = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="4" width="18" height="13" rx="2"/>
    <path d="M12 17v3M9 20h6"/>
  </svg>
);
