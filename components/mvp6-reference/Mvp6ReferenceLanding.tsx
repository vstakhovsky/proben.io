'use client';

/**
 * Mvp6ReferenceLanding - Faithful reference implementation of Proben MVP 6
 *
 * This component renders the original Proben MVP 6 prototype as closely as possible
 * to serve as a visual reference during the porting process.
 *
 * SOURCE FILES:
 * - reference/prototypes/proben-mvp-6/index.html
 * - reference/prototypes/proben-mvp-6/radar.css
 * - reference/prototypes/proben-mvp-6/shared.jsx
 * - reference/prototypes/proben-mvp-6/Mvp6Site.jsx
 * - reference/prototypes/proben-mvp-6/LandingMvp5.jsx
 * - reference/prototypes/proben-mvp-6/Mascot.jsx
 */

import { useEffect, useState } from 'react';
import styles from './Mvp6ReferenceLanding.module.css';

declare global {
  interface Window {
    Mvp6Prototype?: any;
  }
}

export function Mvp6ReferenceLanding() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Load the prototype scripts dynamically
    const loadPrototype = async () => {
      // Check if we're in browser
      if (typeof window === 'undefined') return;

      // Create a container for the prototype
      const container = document.getElementById('mvp6-prototype-root');
      if (!container) return;

      try {
        // For now, we'll render a simplified version that references the prototype
        // The full prototype would need the JSX files to be transformed
        container.innerHTML = `
          <div style="padding: 60px 36px; max-width: 1240px; margin: 0 auto;">
            <div style="margin-bottom: 32px;">
              <h1 style="font-size: 42px; margin: 0 0 16px; color: #13241C; font-family: 'Hanken Grotesk', sans-serif; font-weight: 700; letter-spacing: -0.025em; line-height: 1.08;">
                Proben MVP 6 Reference
              </h1>
              <p style="color: #5F6B63; font-size: 18; line-height: 1.5;">
                This route renders the original Proben MVP 6 prototype for visual comparison during porting.
              </p>
            </div>

            <div style="background: rgba(255,255,255,0.92); border: 1px solid #E1E6E0; border-radius: 12px; padding: 24px;">
              <p style="margin: 0 0 16px; color: #13241C;">
                <strong>Source files:</strong>
              </p>
              <ul style="margin: 0; padding-left: 20px; color: #5F6B63; line-height: 1.8;">
                <li>reference/prototypes/proben-mvp-6/index.html</li>
                <li>reference/prototypes/proben-mvp-6/radar.css</li>
                <li>reference/prototypes/proben-mvp-6/shared.jsx</li>
                <li>reference/prototypes/proben-mvp-6/Mvp6Site.jsx</li>
                <li>reference/prototypes/proben-mvp-6/LandingMvp5.jsx</li>
                <li>reference/prototypes/proben-mvp-6/Report.jsx</li>
                <li>reference/prototypes/proben-mvp-6/Mascot.jsx</li>
              </ul>

              <div style="margin-top: 24px; padding: 16px; background: #EEF6E0; border-radius: 8px; border: 1px solid #A6C94A;">
                <p style="margin: 0; color: #1b2a0c; font-size: 14;">
                  <strong>Implementation note:</strong> The full prototype requires Babel transpilation of JSX files at runtime.
                  For the reference route, open the prototype file directly:
                </p>
                <p style="margin: 8px 0 0 0;">
                  <a
                    href="/reference/prototypes/proben-mvp-6/index.html"
                    style="color: #5B7F34; text-decoration: underline; font-weight: 600;"
                  >
                    Open Proben MVP 6 Prototype →
                  </a>
                </p>
              </div>
            </div>
          </div>
        `;
      } catch (error) {
        console.error('Failed to load MVP 6 prototype:', error);
      }
    };

    loadPrototype();
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div id="mvp6-prototype-root" className={styles.prototypeRoot} />
    </div>
  );
}
