'use client';

import { useState, useEffect } from 'react';

export function FloatingAskButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero section
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 100,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '12px 16px',
        borderRadius: '12px',
        background: 'var(--lime)',
        color: 'var(--cta-ink)',
        fontFamily: 'var(--sans)',
        fontWeight: 600,
        fontSize: '14px',
        boxShadow: 'var(--shadow-pop)',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        animation: 'popIn 0.3s ease both',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(150, 185, 70, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-pop)';
      }}
      onClick={() => {
        // Scroll to top or show contact form
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      <span style={{ fontSize: '16px' }}>💬</span>
      Ask about this page
    </button>
  );
}
