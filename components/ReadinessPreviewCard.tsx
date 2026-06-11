'use client';

import React from 'react';
import { Ic } from '@/components/icons';

interface ReadinessPreviewCardProps {
  className?: string;
}

const HERO_CHECKS = [
  ['Goal clarity', '8.0', 'good'],
  ['Strategic context', '5.8', 'risk'],
  ['Evidence', '6.0', 'amber'],
  ['Stakeholder risk', '5.5', 'risk'],
  ['Decision ask', '5.2', 'risk'],
];

const HERO_GAPS = [
  'Business impact unclear',
  'Decision threshold missing',
  'Stakeholder pushback likely',
];

function getScoreColor(tone: string): string {
  switch (tone) {
    case 'good':
      return 'var(--c-good)';
    case 'amber':
      return 'var(--c-warn)';
    case 'risk':
      return 'var(--c-bad)';
    default:
      return 'var(--c-mid)';
  }
}

export function ReadinessPreviewCard({ className = '' }: ReadinessPreviewCardProps) {
  return (
    <div
      className="bp-card fade-up"
      style={{
        width: '100%',
        maxWidth: '540px',
        margin: '0 auto',
        padding: 0,
        overflow: 'hidden',
        boxShadow: 'var(--shadow-hero)',
        position: 'relative',
        zIndex: 2,
        animationDelay: '0.08s',
      }}
    >
      {/* Window Chrome */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '11px 16px',
          borderBottom: '1px solid var(--line)',
          background: 'var(--bg-2)',
        }}
      >
        <span style={{ display: 'flex', gap: '6px' }}>
          <span
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: 'var(--c-bad)',
              opacity: 0.55,
            }}
          />
          <span
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: 'var(--c-warn)',
              opacity: 0.55,
            }}
          />
          <span
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: 'var(--c-good)',
              opacity: 0.55,
            }}
          />
        </span>
        <span
          style={{
            margin: '0 auto',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            padding: '4px 12px',
            borderRadius: '7px',
            background: 'var(--inset)',
            border: '1px solid var(--line)',
            fontFamily: 'var(--mono)',
            fontSize: '10.5px',
            color: 'var(--muted-2)',
          }}
        >
          <span style={{ fontSize: '11px', display: 'flex', color: 'var(--ai)' }}>
            <Ic.shield />
          </span>
          proben.io / readiness-brief
        </span>
      </div>

      {/* Input Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '11px',
          padding: '15px 20px',
          borderBottom: '1px solid var(--line)',
          background: 'var(--inset)',
        }}
      >
        <span
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '8px',
            flex: 'none',
            display: 'grid',
            placeItems: 'center',
            background: 'var(--ai-dim)',
            color: 'var(--ai)',
            fontSize: '15px',
          }}
        >
          <Ic.doc />
        </span>
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '9px',
              letterSpacing: '0.14em',
              color: 'var(--muted-2)',
            }}
          >
            YOUR CONTEXT
          </div>
          <div
            style={{
              color: 'var(--ink)',
              fontSize: '15px',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            Strategy review · roadmap pivot
          </div>
        </div>
        <span
          style={{
            marginLeft: 'auto',
            flex: 'none',
            fontFamily: 'var(--mono)',
            fontSize: '10px',
            color: 'var(--lime-deep)',
            background: 'var(--lime-glow)',
            border: '1px solid ' + 'color-mix(in srgb, var(--lime-deep) 28%, transparent)',
            padding: '4px 9px',
            borderRadius: 999,
          }}
        >
          ANALYZED
        </span>
      </div>

      {/* Score + Verdict */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '18px',
          padding: '18px 20px',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span
            className="serif"
            style={{ fontSize: '46px', color: 'var(--c-warn)', lineHeight: 1 }}
          >
            6.2
          </span>
          <span
            style={{ color: 'var(--muted)', fontSize: '16px', fontFamily: 'var(--mono)' }}
          >
            /10
          </span>
        </div>
        <div>
          <div style={{ color: 'var(--ink)', fontSize: '16px', fontWeight: 600 }}>
            Partly ready
          </div>
          <div
            style={{ color: 'var(--c-bad)', fontSize: '13.5px', fontWeight: 600, marginTop: 2 }}
          >
            3 context gaps found
          </div>
        </div>
      </div>

      {/* 5 Checks */}
      <div
        style={{ padding: '14px 20px', borderBottom: '1px solid var(--line)' }}
      >
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '9px',
            letterSpacing: '0.14em',
            color: 'var(--muted-2)',
            marginBottom: 11,
          }}
        >
          5 CHECKS
        </div>
        <div style={{ display: 'grid', gap: 9 }}>
          {HERO_CHECKS.map((check, i) => {
            const tone = check[2];
            const color = getScoreColor(tone);
            const percentage = parseFloat(check[1]) * 10;

            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    flex: 'none',
                    background: color,
                  }}
                />
                <span
                  style={{
                    color: 'var(--ink-dim)',
                    fontSize: '14px',
                    fontWeight: 500,
                    flex: 'none',
                    width: '130px',
                  }}
                >
                  {check[0]}
                </span>
                <span
                  style={{
                    flex: 1,
                    height: '6px',
                    background: 'var(--track)',
                    borderRadius: 99,
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: percentage + '%',
                      background: color,
                      borderRadius: 99,
                    }}
                  />
                </span>
                <span
                  style={{
                    fontFamily: 'var(--mono)',
                    fontWeight: 600,
                    fontSize: '13px',
                    color: color,
                    width: '28px',
                    textAlign: 'right',
                  }}
                >
                  {check[1]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Context Gaps */}
      <div
        style={{ padding: '14px 20px', borderBottom: '1px solid var(--line)' }}
      >
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '9px',
            letterSpacing: '0.14em',
            color: 'var(--c-bad)',
            marginBottom: 10,
          }}
        >
          3 CONTEXT GAPS FOUND
        </div>
        <div style={{ display: 'grid', gap: 7 }}>
          {HERO_GAPS.map((gap, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                color: 'var(--ink-dim)',
                fontSize: '14px',
              }}
            >
              <span
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '5px',
                  flex: 'none',
                  display: 'grid',
                  placeItems: 'center',
                  background: 'var(--risk-dim)',
                  color: 'var(--c-bad)',
                  fontFamily: 'var(--mono)',
                  fontSize: '11px',
                  fontWeight: 600,
                }}
              >
                {i + 1}
              </span>
              {gap}
            </div>
          ))}
        </div>
      </div>

      {/* Top Fix + Practice Moment */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1px',
          background: 'var(--line)',
        }}
      >
        <div
          style={{
            padding: '13px 18px',
            background: 'var(--panel)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '8.5px',
              letterSpacing: '0.14em',
              color: 'var(--muted-2)',
              marginBottom: 6,
            }}
          >
            TOP FIX
          </div>
          <div
            style={{
              display: 'flex',
              gap: 8,
              color: 'var(--ink)',
              fontSize: '13.5px',
              fontWeight: 500,
              lineHeight: 1.35,
            }}
          >
            <span
              style={{
                color: 'var(--lime-deep)',
                flex: 'none',
                display: 'flex',
                marginTop: 1,
                fontSize: '14px',
              }}
            >
              <Ic.check />
            </span>
            Add a business-impact number
          </div>
        </div>
        <div
          style={{
            padding: '13px 18px',
            background: 'var(--panel)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '8.5px',
              letterSpacing: '0.14em',
              color: 'var(--muted-2)',
              marginBottom: 6,
            }}
          >
            PRACTICE MOMENT
          </div>
          <div
            style={{
              display: 'flex',
              gap: 8,
              color: 'var(--ink)',
              fontSize: '13.5px',
              fontWeight: 500,
              lineHeight: 1.35,
            }}
          >
            <span
              style={{
                color: 'var(--ai)',
                flex: 'none',
                display: 'flex',
                marginTop: 1,
                fontSize: '14px',
              }}
            >
              <Ic.mic />
            </span>
            &quot;Why now?&quot;
          </div>
        </div>
      </div>
    </div>
  );
}
