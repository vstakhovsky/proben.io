'use client';

import Link from 'next/link';
import React from 'react';

interface ClientButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'lime' | 'ghost';
  className?: string;
}

export function ClientButton({
  href,
  children,
  variant = 'lime',
  className = '',
}: ClientButtonProps) {
  const baseStyle = {
    display: 'inline-flex' as const,
    alignItems: 'center' as const,
    gap: 11,
    fontFamily: 'var(--sans)',
    fontWeight: 600,
    fontSize: '16px',
    border: 'none',
    borderRadius: 10,
    cursor: 'pointer',
    padding: '16px 24px',
    lineHeight: 1,
    textDecoration: 'none',
    transition: 'transform .15s ease, background .15s ease, box-shadow .15s ease, border-color .15s ease',
  };

  const limeStyle = {
    ...baseStyle,
    background: 'var(--lime)',
    color: 'var(--cta-ink)',
  };

  const ghostStyle = {
    ...baseStyle,
    border: '1px solid var(--line-strong)',
    background: 'var(--inset)',
    color: 'var(--ink)',
  };

  const style = variant === 'lime' ? limeStyle : ghostStyle;

  return (
    <Link
      href={href}
      className={className}
      style={style}
      onMouseEnter={(e) => {
        if (variant === 'lime') {
          e.currentTarget.style.background =
            'color-mix(in srgb, var(--lime) 88%, white)';
        } else {
          e.currentTarget.style.background = 'var(--hover)';
          e.currentTarget.style.borderColor = 'var(--bp)';
        }
      }}
      onMouseLeave={(e) => {
        if (variant === 'lime') {
          e.currentTarget.style.background = 'var(--lime)';
        } else {
          e.currentTarget.style.background = 'var(--inset)';
          e.currentTarget.style.borderColor = 'var(--line-strong)';
        }
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'translateY(1px)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'none';
      }}
    >
      {children}
    </Link>
  );
}
