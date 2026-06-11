/* global React */
const { useState, useEffect, useRef } = React;

/* ============================================================
   ICONS — thin line set, currentColor
   ============================================================ */
const Ic = {
  arrow: (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
  eye: (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>,
  shield: (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/></svg>,
  layers: (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/></svg>,
  gap: (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3l9 5-9 5-9-5 9-5z"/><text x="12" y="10.7" fontSize="7" fontWeight="700" fill="currentColor" stroke="none" textAnchor="middle">?</text></svg>,
  target: (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/></svg>,
  warn: (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3l9 16H3z"/><path d="M12 10v4M12 17h.01"/></svg>,
  minus: (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14"/></svg>,
  check: (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 12l5 5 11-12"/></svg>,
  mic: (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>,
  spark: (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/></svg>,
  chevR: (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 6l6 6-6 6"/></svg>,
  chevL: (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M15 6l-6 6 6 6"/></svg>,
  upload: (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"/></svg>,
  doc: (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v4h4M9 13h6M9 17h6"/></svg>,
  flask: (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 3h6M10 3v6L5 19a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-10V3"/></svg>,
  x: (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 6l12 12M18 6L6 18"/></svg>,
  user: (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>,
  play: (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...p}><path d="M8 5v14l11-7z"/></svg>,
};

/* ============================================================
   ATOMS
   ============================================================ */
function Logo({ light }) {
  const ink = light ? 'var(--silver-ink)' : 'var(--ink)';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <svg width="36" height="36" viewBox="0 0 64 64" role="img" aria-label="Proben" style={{ display: 'block' }}>
        <path d="M32 42 l18 -9 l-18 -9 l-18 9 z" fill="var(--logo-bot, #C2C0B6)"/>
        <path d="M32 33 l18 -9 l-18 -9 l-18 9 z" fill="var(--logo-mid, #A8A69C)"/>
        <path d="M32 24 l18 -9 l-18 -9 l-18 9 z" fill="var(--logo-top, #639922)"/>
      </svg>
      <div style={{ lineHeight: 1 }}>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 23, fontWeight: 600, color: ink, letterSpacing: '-0.01em' }}>Proben</div>
        <div className="mono" style={{ fontSize: 8.5, color: light ? '#6f7973' : 'var(--muted-2)', marginTop: 3, letterSpacing: '0.18em' }}>MEETING READINESS</div>
      </div>
    </div>
  );
}

function Pill({ children, color = 'var(--lime)', dot = true, style }) {
  return (
    <span className="pill mono" style={{ color, borderColor: 'color-mix(in srgb, ' + color + ' 35%, transparent)', background: 'color-mix(in srgb, ' + color + ' 7%, transparent)', ...style }}>
      {dot && <span className="dot" style={{ background: color }} />}
      {children}
    </span>
  );
}

function Btn({ children, kind = 'lime', icon, iconR, sm, onClick, style, disabled }) {
  return (
    <button className={'btn btn-' + kind + (sm ? ' btn-sm' : '')} onClick={onClick} disabled={disabled} style={{ opacity: disabled ? 0.45 : 1, cursor: disabled ? 'not-allowed' : 'pointer', ...style }}>
      {icon && <span style={{ fontSize: '1.15em', display: 'flex' }}>{icon}</span>}
      {children}
      {iconR && <span style={{ fontSize: '1.05em', display: 'flex' }}>{iconR}</span>}
    </button>
  );
}

function Card({ children, style, glow, onClick, className = '' }) {
  return (
    <div onClick={onClick} className={className} style={{
      background: 'linear-gradient(180deg, var(--card-2), var(--card))',
      border: '1px solid var(--line)', borderRadius: 'var(--r)',
      boxShadow: glow ? '0 0 0 1px var(--lime-glow), 0 0 40px -10px var(--lime-glow)' : 'none',
      ...style,
    }}>{children}</div>
  );
}

/* small signal chip used on the readiness map */
function SignalChip({ label, score, note, tone = 'good', muted, style }) {
  const col = tone === 'good' ? 'var(--good)' : tone === 'amber' ? 'var(--amber)' : tone === 'risk' ? 'var(--risk)' : 'var(--muted)';
  return (
    <div style={{
      background: 'var(--chip-bg)', border: '1px solid var(--line)', borderRadius: 13,
      padding: '12px 13px', backdropFilter: 'blur(6px)', width: 188, ...style,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <span className="mono" style={{ color: 'var(--ink-dim)', fontSize: 10, display: 'flex', alignItems: 'center', gap: 7, overflow: 'hidden' }}>
          <span className="dot" style={{ background: col }} />
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</span>
        </span>
        <span style={{ fontFamily: 'var(--mono)', color: muted ? 'var(--muted-2)' : col, fontWeight: 600, fontSize: 15 }}>{muted ? '—' : Number(score).toFixed(1)}</span>
      </div>
      <div style={{ color: 'var(--muted)', fontSize: 13, marginTop: 6, lineHeight: 1.35 }}>{note}</div>
    </div>
  );
}

/* circular score ring */
function ScoreRing({ value, max = 10, size = 132, stroke = 9, label }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = value / max;
  const col = value >= 7.5 ? 'var(--c-good)' : value >= 6 ? 'var(--c-mid)' : value >= 4.5 ? 'var(--c-warn)' : 'var(--c-bad)';
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--track)" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={col} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - pct)} style={{ transition: 'stroke-dashoffset 1s cubic-bezier(.2,.8,.3,1)' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: 'var(--serif)', fontSize: size * 0.34, color: col, lineHeight: 1, fontWeight: 600 }}>{value.toFixed(1)}</div>
        <div className="mono" style={{ color: 'var(--muted)', fontSize: 9.5, marginTop: 4 }}>{label || ('/ ' + max)}</div>
      </div>
    </div>
  );
}

/* horizontal score bar */
function ScoreBar({ label, value, max = 10, muted }) {
  const pct = muted ? 0 : (value / max) * 100;
  const col = value >= 7.5 ? 'var(--c-good)' : value >= 6 ? 'var(--c-mid)' : value >= 4.5 ? 'var(--c-warn)' : 'var(--c-bad)';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
        <span style={{ color: 'var(--ink-dim)', fontSize: 14.5, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</span>
        <span style={{ fontFamily: 'var(--mono)', fontWeight: 600, fontSize: 14, color: muted ? 'var(--muted-2)' : col, flex: 'none' }}>{muted ? 'Not yet' : value.toFixed(1)}</span>
      </div>
      <div style={{ height: 7, background: 'var(--track)', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{ width: pct + '%', height: '100%', background: col, borderRadius: 99, transition: 'width .9s cubic-bezier(.2,.8,.3,1)' }} />
      </div>
    </div>
  );
}

/* ============================================================
   SAMPLE SCENARIO DATA (shared across all variants)
   ============================================================ */
const SCENARIO = {
  type: 'Strategy review',
  role: 'Product Manager',
  objective: 'Push back on a roadmap pivot and get approval for a narrow validation.',
  stakeholderName: 'Dana',
  stakeholderRole: 'VP Product',
  attitude: 'Skeptical',
  cares: 'Business impact, timing, team capacity',
  situation: 'Leadership wants to pivot the roadmap toward a new horizontal feature. I think we should run a narrow 2-week validation on the enterprise segment first, because it is already blocked. I need Dana to approve the validation without reopening the whole roadmap.',
  concern: 'I may sound defensive and may not have enough evidence.',
  when: 'Tomorrow',
};

const SIGNALS = [
  { label: 'Goal clarity',        score: 8.0, tone: 'good',  note: 'Goal is clear' },
  { label: 'Argument structure',  score: 6.8, tone: 'amber', note: 'Sharper trade-off needed' },
  { label: 'Evidence strength',   score: 6.0, tone: 'amber', note: 'Decision threshold missing' },
  { label: 'Stakeholder align.',  score: 5.5, tone: 'risk',  note: 'VP may challenge timing' },
  { label: 'Risk handling',       score: 5.2, tone: 'risk',  note: 'Executive pushback likely' },
  { label: 'Delivery / voice',    score: null, tone: 'muted', note: 'Record answer to evaluate' },
];

const TOP_RISKS = [
  { t: 'Weak decision threshold', d: 'You ask to “validate” but never define what result would justify the pivot — or kill it.', cause: 'The discussion may reopen the whole roadmap.' },
  { t: 'Missing evidence for business impact', d: 'No number ties the enterprise block to revenue, so the ask reads as opinion.', cause: 'Dana asks for data you don’t have on hand.' },
  { t: 'Stakeholder pushback likely', d: 'Dana cares about timing and capacity; expect a direct challenge on “why now”.', cause: 'You get defensive and lose the room.' },
];

const TOP_FIXES = [
  { t: 'Add a business-impact number', d: 'Enterprise segment blocked → €1.2M/yr upside → 2-week validation, low engineering risk.', why: 'Without a revenue, cost, or risk number, the ask sounds like an opinion.', ex: 'Enterprise activation is already blocked, so I propose a two-week validation before we commit roadmap capacity.', objection: 'Why now?', answer: 'Because the delay already has a measurable opportunity cost — about €1.2M a year.', impact: [['Strategic context', '+0.8'], ['Evidence', '+0.6']] },
  { t: 'Clarify the decision threshold', d: 'Define what result makes the 2-week validation worth continuing — and what kills it.', why: 'Without a threshold, the meeting can turn into a broad roadmap debate.', ex: 'If enterprise activation doesn’t improve by 12% after two weeks, we stop and keep the current roadmap.', objection: 'What if the result is inconclusive?', answer: 'Then we don’t scale it — the validation protects capacity, it doesn’t expand scope.', impact: [['Decision ask', '+1.2'], ['Stakeholder risk', '+0.7']] },
  { t: 'Reframe pushback as risk management', d: 'Position the validation as removing a hidden cost, not disagreeing with the pivot.', why: 'Aligns you with Dana instead of sounding defensive against leadership.', ex: 'I’m not raising this to add scope — it’s to remove a hidden cost we can settle in two weeks.', objection: 'Isn’t this just delaying the roadmap?', answer: 'No — it runs in parallel and only changes the plan if the data clearly justifies it.', impact: [['Stakeholder risk', '+0.9'], ['Decision ask', '+0.4']] },
];

const FOLLOWUPS = [
  'Why now?',
  'What does this delay?',
  'Do we have enough data?',
  'What is the expected business impact?',
  'Who owns the validation?',
];

/* ---- context-aware additions (MVP3) ---- */
const SIGNALS_CTX = [
  { label: 'Goal clarity',          score: 8.0,  tone: 'good',  note: 'Goal is clear' },
  { label: 'Decision ask',          score: 6.4,  tone: 'amber', note: 'Ask not specific enough' },
  { label: 'Strategic context fit', score: 5.8,  tone: 'risk',  note: 'Not tied to a priority' },
  { label: 'Evidence strength',     score: 6.0,  tone: 'amber', note: 'Business impact missing' },
  { label: 'Stakeholder align.',    score: 5.5,  tone: 'risk',  note: 'VP may challenge timing' },
  { label: 'Risk handling',         score: 5.2,  tone: 'risk',  note: 'Executive pushback likely' },
  { label: 'Delivery / voice',      score: null, tone: 'muted', note: 'Record answer to evaluate' },
];

const MISSING_CONTEXT = [
  { t: 'Current company priority', d: 'You mention enterprise activation, but don’t tie it to this quarter’s stated priority.', fix: 'Name the Q3 enterprise-growth objective this supports.' },
  { t: 'A business metric', d: 'No revenue, cost, or risk number anchors the impact.', fix: 'Add the €1.2M/yr at risk and the projected activation uplift.' },
  { t: 'Trade-off vs. current roadmap', d: 'You don’t say what this competes with or displaces.', fix: 'State that the validation runs without disrupting the core roadmap.' },
];

const FOLLOWUPS_CTX = [
  'Why now?',
  'Which company objective does this move?',
  'What does this delay or displace?',
  'What is the expected business impact?',
  'Who owns the validation?',
  'What would make us stop?',
  'What happens if we do nothing?',
];

/* expose to other babel scripts */
Object.assign(window, { Ic, Logo, Pill, Btn, Card, SignalChip, ScoreRing, ScoreBar, SCENARIO, SIGNALS, SIGNALS_CTX, MISSING_CONTEXT, TOP_RISKS, TOP_FIXES, FOLLOWUPS, FOLLOWUPS_CTX, useState, useEffect, useRef });
