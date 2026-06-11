'use client';

import React from 'react';

interface LogoProps {
  light?: boolean;
}

export function Logo({ light = false }: LogoProps) {
  const ink = light ? 'var(--silver-ink)' : 'var(--ink)';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 64 64"
        role="img"
        aria-label="Proben"
        style={{ display: 'block' }}
      >
        <path d="M32 42 l18 -9 l-18 -9 l-18 9 z" fill="var(--logo-bot, #C2C0B6)"/>
        <path d="M32 33 l18 -9 l-18 -9 l-18 9 z" fill="var(--logo-mid, #A8A69C)"/>
        <path d="M32 24 l18 -9 l-18 -9 l-18 9 z" fill="var(--logo-top, #639922)"/>
      </svg>
      <div style={{ lineHeight: 1 }}>
        <div
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 23,
            fontWeight: 600,
            color: ink,
            letterSpacing: '-0.01em'
          }}
        >
          Proben
        </div>
        <div
          className="mono"
          style={{
            fontSize: 8.5,
            color: light ? '#6f7973' : 'var(--muted-2)',
            marginTop: 3,
            letterSpacing: '0.18em'
          }}
        >
          MEETING READINESS
        </div>
      </div>
    </div>
  );
}
