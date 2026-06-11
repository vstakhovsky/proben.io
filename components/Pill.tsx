'use client';

import React from 'react';

export function Pill({
  children,
  className = '',
  color = 'ai',
}: {
  children: React.ReactNode;
  className?: string;
  color?: 'ai' | 'lime' | 'amber' | 'risk' | 'good';
}) {
  const getDotColor = () => {
    switch (color) {
      case 'ai':
        return 'var(--ai)';
      case 'lime':
        return 'var(--lime-deep)';
      case 'amber':
        return 'var(--c-warn)';
      case 'risk':
        return 'var(--c-bad)';
      case 'good':
        return 'var(--c-good)';
      default:
        return 'var(--ai)';
    }
  };

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        borderRadius: 999,
        padding: '6px 13px',
        border: '1px solid var(--line-strong)',
        background: 'color-mix(in srgb, var(--bp) 8%, transparent)',
      }}
    >
      <span
        className="dot"
        style={{
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          flex: 'none',
          background: getDotColor(),
        }}
      />
      {children}
    </div>
  );
}
