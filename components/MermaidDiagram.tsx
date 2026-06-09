'use client';

import { useEffect, useRef, useState } from 'react';

interface MermaidDiagramProps {
  chart: string;
  id?: string;
}

export function MermaidDiagram({ chart, id = 'mermaid-chart' }: MermaidDiagramProps) {
  const chartRef = useRef<HTMLPreElement>(null);
  const uniqueId = `${id}-${Math.random().toString(36).substr(2, 9)}`;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load mermaid from CDN on client side only
    const loadMermaid = async () => {
      if (typeof window !== 'undefined' && !window.mermaid) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
        script.async = true;
        script.onload = () => {
          if (window.mermaid) {
            window.mermaid.initialize({
              startOnLoad: false,
              theme: 'default',
              securityLevel: 'loose',
              fontFamily: 'ui-sans-serif, system-ui, sans-serif',
            });
            setIsLoaded(true);
          }
        };
        document.head.appendChild(script);
      } else if (window.mermaid) {
        setIsLoaded(true);
      }
    };

    loadMermaid();
  }, []);

  useEffect(() => {
    if (!isLoaded || !chartRef.current || !window.mermaid) return;

    const renderDiagram = async () => {
      try {
        await window.mermaid.run({
          querySelector: `#${uniqueId}`,
        });
      } catch (error) {
        console.error('Mermaid rendering error:', error);
      }
    };

    renderDiagram();
  }, [chart, uniqueId, isLoaded]);

  return (
    <div className="flex justify-center items-center py-8">
      <pre
        id={uniqueId}
        ref={chartRef}
        className="mermaid"
        style={{ display: 'none' }}
        data-testid={`mermaid-${uniqueId}`}
      >
        {chart}
      </pre>
    </div>
  );
}

// Extend window interface
declare global {
  interface Window {
    mermaid: any;
  }
}
