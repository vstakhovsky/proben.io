/* global React, Ic, Pill, Btn, ScoreRing, ScoreBar, TOP_RISKS, TOP_FIXES, FOLLOWUPS, useState, useEffect */
/* Proben MVP 5 — Context readiness before important meetings. Blueprint skin (radar.css). */

const SIG5 = [
  { label: 'Goal clarity',      v: 8.0, tone: 'good',  note: 'Do you know what decision you need?' },
  { label: 'Strategic context', v: 5.8, tone: 'risk',  note: 'Not tied to a company priority' },
  { label: 'Evidence strength', v: 6.0, tone: 'amber', note: 'Business impact missing' },
  { label: 'Stakeholder risk',  v: 5.5, tone: 'risk',  note: 'VP may challenge timing' },
  { label: 'Decision ask',      v: 5.2, tone: 'risk',  note: 'Ask not specific enough' },
];
const CHECKS5 = [
  ['Goal clarity', 'Do you know what decision you need?'],
  ['Strategic context', 'Does your idea connect to company goals, OKRs, strategy, customer insight, revenue, cost, or risk?'],
  ['Evidence strength', 'Do you have numbers, examples, assumptions, or proof?'],
  ['Stakeholder risk', 'Do you know what each person will push back on?'],
  ['Decision ask', 'Is your ask specific enough to approve, reject, or revise?'],
];
const GAPS = [
  { t: 'Business impact is unclear', d: 'You mention validation, but not the revenue, cost, or risk behind it.', q: 'What metric or business outcome does this protect?', why: 'Without this, your ask may sound like an opinion, not a business case.' },
  { t: 'Stakeholder concern is underdefined', d: 'Dana likely cares about timing and team capacity.', q: 'What is her strongest objection likely to be?', why: 'If you can’t name the objection, you can’t prepare the answer that decides the meeting.' },
  { t: 'Decision threshold is missing', d: 'You ask to validate, but don’t define what result would justify the next step.', q: 'What result would make this validation worth continuing?', why: 'A clear threshold turns a vague request into something a stakeholder can approve or reject.' },
];
const tcol = (t) => t === 'good' ? 'var(--c-good)' : t === 'amber' ? 'var(--c-warn)' : t === 'risk' ? 'var(--c-bad)' : 'var(--muted-2)';
const MEETINGS = ['Strategy review', 'Board update', 'Client call', 'Data presentation', 'Design review', 'Promotion panel', 'Performance review', 'Conflict conversation', 'Job interview', 'Other'];
const SAMPLE_CONTEXT = 'Leadership wants to pivot the roadmap toward a new horizontal feature. I think we should run a narrow 2-week validation on the enterprise segment first, because it is already blocked. I need Dana to approve the validation without reopening the whole roadmap.';

/* ===== chrome ===== */
function TopBar({ left, center, right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 36px', borderBottom: '1px solid var(--line)', position: 'sticky', top: 0, zIndex: 6, background: 'var(--header-blur)', backdropFilter: 'blur(10px)' }}>
      <div style={{ flex: 1 }}>{left}</div><span className="mono" style={{ color: 'var(--muted)' }}>{center}</span><div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>{right}</div>
    </div>
  );
}
const Back = ({ onClick, label }) => <button onClick={onClick} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--sans)', fontSize: 14.5 }}><span style={{ fontSize: 16, display: 'flex' }}><Ic.chevL /></span>{label}</button>;

/* ===== hero radar (5 signals) ===== */
const RW = 660, RH = 540, HUB5 = { x: 330, y: 392 }, ORG5 = { x: 330, y: 540 };
const MAP5 = [
  { v: 8.0, tone: 'good',  label: 'Goal clarity',      gap: 'Goal is clear',          x: 330, y: 96 },
  { v: 5.8, tone: 'risk',  label: 'Strategic context', gap: 'Business impact unclear', x: 132, y: 206 },
  { v: 5.2, tone: 'risk',  label: 'Decision ask',      gap: 'Threshold missing',       x: 528, y: 206 },
  { v: 6.0, tone: 'amber', label: 'Evidence',          gap: 'Needs one number',        x: 108, y: 360 },
  { v: 5.5, tone: 'risk',  label: 'Stakeholder',       gap: 'Pushback likely',         x: 552, y: 360 },
];
function spoke5(c) { const dx = c.x - HUB5.x, dy = c.y - HUB5.y, l = Math.hypot(dx, dy) || 1, ux = dx / l, uy = dy / l; return { x1: HUB5.x + ux * 14, y1: HUB5.y + uy * 14, x2: c.x - ux * 46, y2: c.y - uy * 46 }; }
function RadarHero5() {
  const arcs = [120, 210, 300, 392];
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: RW, aspectRatio: RW + '/' + RH, overflow: 'visible' }}>
      <div className="bp-grid" style={{ position: 'absolute', inset: 0, border: '1px solid var(--bp-line)', borderRadius: 12, overflow: 'hidden', background: 'linear-gradient(180deg, color-mix(in srgb, var(--bp) 4%, transparent), color-mix(in srgb, var(--bp) 9%, transparent))' }}>
        <svg viewBox={`0 0 ${RW} ${RH}`} width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
          <defs><marker id="tri5" markerWidth="9" markerHeight="9" refX="4.5" refY="4.5" orient="auto"><path d="M1 1 L8 4.5 L1 8 Z" fill="var(--bp)" opacity="0.85" /></marker></defs>
          {arcs.map((r, i) => <circle key={i} cx={ORG5.x} cy={ORG5.y} r={r} fill="none" stroke="var(--radar)" strokeWidth="1" opacity={1 - i * 0.16} />)}
          <line x1={ORG5.x} y1={ORG5.y} x2={ORG5.x} y2={HUB5.y + 36} stroke="var(--radar-soft)" strokeWidth="1" />
          {MAP5.map((s, i) => { const p = spoke5(s); return <line key={i} x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2} stroke="var(--bp-line)" strokeWidth="1" markerEnd="url(#tri5)" />; })}
          <circle cx={ORG5.x} cy={ORG5.y} r="15" fill="none" stroke="var(--bp)" strokeWidth="1.5" /><circle cx={ORG5.x} cy={ORG5.y} r="4" fill="var(--bp)" />
        </svg>
        {[0, 1.4].map((d, i) => <span key={i} style={{ position: 'absolute', left: '50%', top: '100%', width: 200, height: 200, marginLeft: -100, marginTop: -100, borderRadius: '50%', border: '1px solid var(--bp)', animation: 'radarPulse 3.4s ease-out infinite', animationDelay: d + 's', pointerEvents: 'none' }} />)}
        <div className="mono" style={{ position: 'absolute', top: 13, left: 14, right: 52, color: 'var(--muted)', fontSize: 8.5, lineHeight: 1.45, letterSpacing: '0.1em' }}>CONTEXT ANALYZED · notes · slides · metrics · stakeholder concern</div>
        <div className="mono" style={{ position: 'absolute', top: 14, right: 14, border: '1px solid var(--bp-line)', borderRadius: 5, padding: '4px 7px', color: 'var(--ai)', fontSize: 10, background: 'var(--ai-dim)' }}>AI</div>
      </div>
      {MAP5.map((s, i) => {
        const col = tcol(s.tone);
        return (
          <div key={i} className="bp-card fade-in" style={{ position: 'absolute', left: (s.x / RW * 100) + '%', top: (s.y / RH * 100) + '%', transform: 'translate(-50%,-50%)', width: 182, padding: '11px 13px', animationDelay: (0.2 + i * 0.08) + 's' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 7, minWidth: 0 }}>
                <span className="dot" style={{ background: col, boxShadow: '0 0 0 3px color-mix(in srgb,' + col + ' 18%, transparent)', flex: 'none' }} />
                <span style={{ color: 'var(--ink)', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap' }}>{s.label}</span>
              </span>
              <span style={{ fontFamily: 'var(--mono)', fontWeight: 600, fontSize: 13, color: col, flex: 'none' }}>{s.v.toFixed(1)}</span>
            </div>
            <div style={{ color: 'var(--muted)', fontSize: 12, marginTop: 6, lineHeight: 1.3 }}>{s.gap}</div>
          </div>
        );
      })}
      <div className="bp-card" style={{ position: 'absolute', left: '50%', top: (HUB5.y / RH * 100) + '%', transform: 'translate(-50%,-50%)', width: 206, padding: '16px', textAlign: 'center', boxShadow: 'var(--shadow-pop)', borderColor: 'color-mix(in srgb, var(--bp) 55%, transparent)' }}>
        <div className="mono" style={{ color: 'var(--muted)', fontSize: 9 }}>YOUR MEETING</div>
        <div className="serif" style={{ fontSize: 24, color: 'var(--ink)', marginTop: 4, lineHeight: 1.04, whiteSpace: 'nowrap' }}>Strategy review</div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 4, marginTop: 8 }}><span className="serif" style={{ fontSize: 42, color: 'var(--c-mid)', lineHeight: 1 }}>6.2</span><span style={{ color: 'var(--muted)', fontSize: 15, fontFamily: 'var(--mono)' }}>/10</span></div>
        <div style={{ marginTop: 9 }}><Pill color="var(--amber)" dot={false} style={{ fontSize: 9, padding: '4px 9px', whiteSpace: 'nowrap' }}>PARTLY READY</Pill></div>
        <div style={{ marginTop: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: 'var(--ai)', fontSize: 11.5, fontWeight: 600 }}><span style={{ fontSize: 12, display: 'flex' }}><Ic.layers /></span>3 context gaps found</div>
      </div>
    </div>
  );
}

/* ===== STEP 1 — paste context ===== */
const FORMATS = [
  ['PDF', 'PDF'], ['PPT / Slides', 'PPT'], ['Screenshots', 'IMG'], ['Audio notes', 'M4A'],
  ['Markdown', 'MD'], ['Agenda', 'DOC'], ['Notes / memo', 'TXT'], ['Draft answer', 'DOC'], ['Metrics', 'CSV'],
];
const EXAMPLES = ['PDF strategy doc', 'PPT deck', 'dashboard screenshot', 'voice note', 'markdown brief from Claude Code', 'meeting transcript', 'KPI / metrics CSV'];

/* neutral monochrome line glyphs — recognizable tool shapes, never bare letters */
const sgProps = { viewBox: '0 0 24 24', width: '1em', height: '1em', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' };
const SG = {
  drive:      <svg {...sgProps}><path d="M3 9a1 1 0 0 1 1-1h4l2 2h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/></svg>,
  docs:       <svg {...sgProps}><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/><path d="M10 12h5M10 16h5"/></svg>,
  slides:     <svg {...sgProps}><rect x="3" y="4" width="18" height="12" rx="1"/><path d="M12 16v3M9 21l3-2 3 2"/></svg>,
  notion:     <svg {...sgProps}><path d="M5 4h14v16H5z"/><path d="M8 4v16"/><path d="M11 9h5M11 13h5"/></svg>,
  slack:      <svg {...sgProps}><rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/></svg>,
  confluence: <svg {...sgProps}><path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/></svg>,
  jira:       <svg {...sgProps}><path d="M12 3l9 9-9 9-9-9z"/><path d="M12 8l4 4-4 4-4-4z"/></svg>,
  linear:     <svg {...sgProps}><path d="M5 13L13 5M9 19l10-10M14 19l5-5"/></svg>,
  dropbox:    <svg {...sgProps}><path d="M3 7l9-4 9 4-9 4z"/><path d="M3 7v8l9 4 9-4V7"/></svg>,
  zoom:       <svg {...sgProps}><rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3z"/></svg>,
  upload:     <svg {...sgProps}><path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"/></svg>,
};
/* [name, helper, tooltip, glyph] — flows into a 3-col grid as 4 rows */
const SRC = [
  ['Google Drive', 'Docs, decks & notes', 'Find docs, decks, and notes.', 'drive'],
  ['Google Docs', 'Briefs & drafts', 'Pull meeting briefs and drafts.', 'docs'],
  ['Google Slides', 'Deck structure', 'Review presentation structure.', 'slides'],
  ['Notion', 'Product & strategy', 'Pull product notes and strategy docs.', 'notion'],
  ['Slack', 'Stakeholder threads', 'Find stakeholder comments and objections.', 'slack'],
  ['Confluence', 'Team docs', 'Pull team documentation.', 'confluence'],
  ['Jira', 'Delivery & risks', 'Understand delivery scope and risks.', 'jira'],
  ['Linear', 'Roadmap & tasks', 'Pull roadmap and task context.', 'linear'],
  ['Dropbox', 'External files', 'Add external files.', 'dropbox'],
  ['Zoom', 'Recordings & transcripts', 'Analyze meeting recordings or transcripts.', 'zoom'],
  ['Local upload', 'Upload files directly', 'Upload files directly.', 'upload'],
];
const SRC_GLYPH = SRC.reduce((m, s) => { m[s[0]] = s[3]; return m; }, {});
const MORE_SOURCES = ['Microsoft Teams', 'Outlook Calendar', 'Google Calendar', 'Figma', 'Miro', 'GitHub', 'Gong / call recordings', 'Loom', 'Coda'];

function SrcTile({ children, on }) {
  return <span style={{ width: 30, height: 30, borderRadius: 8, flex: 'none', display: 'grid', placeItems: 'center', fontSize: 16, background: on ? 'color-mix(in srgb, var(--lime-deep) 16%, transparent)' : 'var(--ai-dim)', color: on ? 'var(--lime-deep)' : 'var(--ai)' }}>{children}</span>;
}

function Input5({ onBack, onAnalyze }) {
  const [type, setType] = useState('Strategy review');
  const [text, setText] = useState('Leadership wants to pivot the roadmap toward a new horizontal feature. I think we should run a narrow 2-week validation on the enterprise segment first, because it is already blocked. I need Dana to approve the validation without reopening the whole roadmap.');
  const [moreSrc, setMoreSrc] = useState(false);
  const [hi, setHi] = useState(false);
  const [picked, setPicked] = useState(['PPT / Slides', 'Metrics']);
  const [conn, setConn] = useState(['Notion']);
  const [moreDet, setMoreDet] = useState(false);
  const [det, setDet] = useState({ stakeholder: 'Dana, VP Product', room: '', goal: 'Get approval for a narrow validation', outcome: '', worry: 'I may sound defensive', deadline: 'Tomorrow', objections: '', link: '' });
  const togF = (f) => setPicked((x) => x.includes(f) ? x.filter((y) => y !== f) : [...x, f]);
  const togC = (c) => setConn((x) => x.includes(c) ? x.filter((y) => y !== c) : [...x, c]);
  const flashDrop = () => { setHi(true); setTimeout(() => setHi(false), 1500); };
  const set = (k, v) => setDet((d) => ({ ...d, [k]: v }));

  const [sub, setSub] = useState(0);          // 0..4
  const TOTAL = 5;
  const go = (n) => { window.scrollTo(0, 0); setSub(Math.max(0, Math.min(TOTAL - 1, n))); };
  const next = () => sub === TOTAL - 1 ? onAnalyze() : go(sub + 1);
  const back = () => sub === 0 ? onBack() : go(sub - 1);
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const HELP = [
    ['Why this matters', 'Pick the kind of conversation you’re preparing for. Proben uses it to adjust the checks, the likely objections, and the readiness output.'],
    ['What good input looks like', 'You don’t need a polished brief. Rough notes are fine. Proben looks for missing context, stakeholder risk, evidence, and clarity of ask.'],
    ['Materials are optional', 'You can continue without attachments. Raw context alone is enough for a first readiness check — files just sharpen it.'],
    ['Sources are optional', 'Pull context from tools you already use to surface stakeholder threads, strategy docs, and delivery risk. Skip anytime.'],
    ['Before you analyze', 'Proben works with raw text, docs, slides, screenshots, and audio notes. No perfect formatting required.'],
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-0)' }} className="bp-grid">
      <TopBar
        left={<Back onClick={back} label={sub === 0 ? 'Home' : 'Back'} />}
        center={'STEP 1 / 5 · CONTEXT · ' + (sub + 1) + ' OF ' + TOTAL}
        right={<Pill color="var(--ai)">{['MEETING TYPE', 'RAW CONTEXT', 'MATERIALS', 'SOURCES', 'REVIEW'][sub]}</Pill>} />

      {/* local progress bar */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '0 36px' }}>
        <div style={{ display: 'flex', gap: 6, marginTop: 22 }}>
          {Array.from({ length: TOTAL }).map((_, i) => (
            <button key={i} onClick={() => i <= sub && go(i)} style={{ flex: 1, height: 4, borderRadius: 99, border: 'none', padding: 0, cursor: i <= sub ? 'pointer' : 'default', background: i <= sub ? 'var(--lime-deep)' : 'var(--track)', transition: 'background .3s' }} />
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 980, margin: '0 auto', padding: '34px 36px 130px', display: 'grid', gridTemplateColumns: '1fr 280px', gap: 40, alignItems: 'start' }} className="cg-scroll">
        <div key={sub} className="fade-up" style={{ minWidth: 0 }}>

          {/* ── SUBSTEP 1 — MEETING TYPE ── */}
          {sub === 0 && (
            <>
              <h1 className="serif" style={{ fontSize: 42, margin: '0 0 10px', color: 'var(--ink)', lineHeight: 1.06 }}>What are you preparing for?</h1>
              <p style={{ color: 'var(--muted)', fontSize: 17, margin: '0 0 30px', maxWidth: 560, lineHeight: 1.5 }}>Choose the conversation type. Proben tailors the readiness check to the kind of meeting you’re walking into.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                {MEETINGS.map((m) => {
                  const on = type === m;
                  return (
                    <button key={m} onClick={() => setType(m)} className="bp-card" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 18px', borderRadius: 12, cursor: 'pointer', fontFamily: 'var(--sans)', textAlign: 'left', borderColor: on ? 'var(--lime-deep)' : 'var(--bp-line)', background: on ? 'var(--lime-glow)' : undefined, transition: 'all .14s' }}>
                      <span style={{ width: 20, height: 20, flex: 'none', borderRadius: '50%', border: '2px solid ' + (on ? 'var(--lime-deep)' : 'var(--line-strong)'), background: on ? 'var(--lime-deep)' : 'transparent', display: 'grid', placeItems: 'center', color: '#fff', fontSize: 11 }}>{on && <Ic.check />}</span>
                      <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)' }}>{m}</span>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* ── SUBSTEP 2 — RAW CONTEXT ── */}
          {sub === 1 && (
            <>
              <h1 className="serif" style={{ fontSize: 42, margin: '0 0 10px', color: 'var(--ink)', lineHeight: 1.06 }}>What’s the situation?</h1>
              <p style={{ color: 'var(--muted)', fontSize: 17, margin: '0 0 24px', maxWidth: 580, lineHeight: 1.5 }}>Paste your raw meeting context. No formatting needed — a few rough sentences are enough.</p>
              <div className="bp-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', borderBottom: '1px solid var(--line)' }}>
                  <span className="mono" style={{ color: 'var(--muted)' }}>RAW CONTEXT</span>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => setText(SAMPLE_CONTEXT)} title="Strategy review · roadmap pivot" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '7px 13px', borderRadius: 8, cursor: 'pointer', color: 'var(--lime-deep)', fontFamily: 'var(--sans)', fontSize: 13.5, fontWeight: 600, border: '1px solid color-mix(in srgb, var(--lime-deep) 35%, transparent)', background: 'var(--lime-glow)' }}><span style={{ fontSize: 13, display: 'flex' }}><Ic.spark /></span>Use sample</button>
                    <button className="bp-card" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 13px', borderRadius: 8, cursor: 'pointer', color: 'var(--ai)', fontFamily: 'var(--sans)', fontSize: 13.5, borderColor: 'color-mix(in srgb, var(--ai) 40%, transparent)' }}><span style={{ fontSize: 14, display: 'flex' }}><Ic.mic /></span>Dictate</button>
                  </div>
                </div>
                <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Leadership wants to pivot the roadmap… I think we should validate the enterprise segment first… I need Dana to approve it." style={{ width: '100%', minHeight: 260, resize: 'vertical', padding: 22, border: 'none', outline: 'none', background: 'transparent', color: 'var(--ink)', fontFamily: 'var(--sans)', fontSize: 17, lineHeight: 1.6 }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
                <span style={{ color: 'var(--muted-2)', fontSize: 13 }}>Fastest path · no formatting required</span>
                <span style={{ color: 'var(--muted-2)', fontSize: 13, fontFamily: 'var(--mono)' }}>{wordCount} words</span>
              </div>
            </>
          )}

          {/* ── SUBSTEP 3 — MATERIALS ── */}
          {sub === 2 && (
            <>
              <h1 className="serif" style={{ fontSize: 42, margin: '0 0 10px', color: 'var(--ink)', lineHeight: 1.06 }}>Do you want to add materials?</h1>
              <p style={{ color: 'var(--muted)', fontSize: 17, margin: '0 0 24px', maxWidth: 580, lineHeight: 1.5 }}>Optional — this helps Proben sharpen the analysis with stronger evidence, clearer context, and fewer blind spots.</p>
              <button onClick={flashDrop} style={{ width: '100%', padding: '34px', borderRadius: 14, border: (hi ? '1.5px solid var(--lime-deep)' : '1.5px dashed var(--line-strong)'), background: hi ? 'var(--lime-glow)' : 'var(--inset)', cursor: 'pointer', color: 'var(--muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9, marginBottom: 18, transition: 'all .2s' }}>
                <span style={{ fontSize: 28, color: 'var(--lime-deep)', display: 'flex' }}><Ic.upload /></span>
                <span style={{ fontSize: 16.5, color: 'var(--ink)', fontWeight: 600 }}>Drop files or click to upload</span>
                <span style={{ fontSize: 13, textAlign: 'center', maxWidth: 540, lineHeight: 1.5 }}>{EXAMPLES.join(' · ')}</span>
              </button>
              <div className="mono" style={{ color: 'var(--muted-2)', fontSize: 9.5, marginBottom: 11 }}>OR TAG WHAT YOU HAVE</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
                {FORMATS.map(([label, tag]) => {
                  const on = picked.includes(label);
                  return (
                    <button key={label} onClick={() => togF(label)} className="bp-card" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '9px 14px', borderRadius: 10, cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink)', borderColor: on ? 'var(--lime-deep)' : 'var(--bp-line)', background: on ? 'var(--lime-glow)' : undefined }}>
                      <span className="mono" style={{ fontSize: 8.5, padding: '3px 6px', borderRadius: 5, background: 'var(--inset-2)', color: 'var(--muted)' }}>{tag}</span>
                      {label}
                      {on && <span style={{ color: 'var(--lime-deep)', fontSize: 13, display: 'flex' }}><Ic.check /></span>}
                    </button>
                  );
                })}
              </div>
              <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 9, color: 'var(--muted-2)', fontSize: 13 }}>
                <span style={{ color: 'var(--ai)', fontSize: 14, display: 'flex', flex: 'none' }}><Ic.shield /></span>
                You can continue without attachments. Raw context alone is enough to get a first readiness check.
              </div>
            </>
          )}

          {/* ── SUBSTEP 4 — CONNECT SOURCES ── */}
          {sub === 3 && (
            <>
              <h1 className="serif" style={{ fontSize: 42, margin: '0 0 10px', color: 'var(--ink)', lineHeight: 1.06 }}>Connect a source</h1>
              <p style={{ color: 'var(--muted)', fontSize: 17, margin: '0 0 24px', maxWidth: 580, lineHeight: 1.5 }}>Optional — pull context from the tools you already use. This helps Proben find missing context, stakeholder risks, and stronger evidence.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
                {SRC.map(([name, helper, desc, g]) => {
                  const isLocal = name === 'Local upload';
                  const on = !isLocal && conn.includes(name);
                  return (
                    <button key={name} title={desc} onClick={() => isLocal ? flashDrop() : togC(name)} className="bp-card"
                      style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '13px 14px', borderRadius: 11, cursor: 'pointer', fontFamily: 'var(--sans)', textAlign: 'left', borderColor: on ? 'var(--lime-deep)' : 'var(--bp-line)', background: on ? 'var(--lime-glow)' : undefined }}>
                      <SrcTile on={on}>{SG[g]}</SrcTile>
                      <span style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</span>
                        <span style={{ display: 'block', fontSize: 11.5, color: 'var(--muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{helper}</span>
                      </span>
                      {on
                        ? <span style={{ color: 'var(--lime-deep)', fontSize: 14, display: 'flex', flex: 'none' }}><Ic.check /></span>
                        : <span style={{ color: 'var(--muted-2)', fontSize: isLocal ? 14 : 18, lineHeight: 1, flex: 'none', display: 'flex' }}>{isLocal ? <Ic.upload /> : '+'}</span>}
                    </button>
                  );
                })}
              </div>
              {conn.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <div className="mono" style={{ color: 'var(--muted-2)', fontSize: 9, marginBottom: 8 }}>CONNECTED INPUTS</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {conn.map((name) => (
                      <span key={name} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 10px 7px 11px', borderRadius: 999, border: '1px solid var(--lime-deep)', background: 'var(--lime-glow)', color: 'var(--ink)', fontSize: 13.5 }}>
                        <span style={{ color: 'var(--lime-deep)', fontSize: 13, display: 'flex' }}>{SG[SRC_GLYPH[name]] || <Ic.layers />}</span>
                        {name}
                        <span onClick={() => togC(name)} title="Remove" style={{ cursor: 'pointer', color: 'var(--muted)', fontSize: 12, display: 'flex', marginLeft: 2 }}><Ic.x /></span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <button onClick={() => setMoreSrc(!moreSrc)} style={{ background: 'none', border: 'none', color: 'var(--ai)', cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: 14, display: 'flex', alignItems: 'center', gap: 7, marginBottom: moreSrc ? 12 : 14 }}>
                <span style={{ fontSize: 14, display: 'flex', transform: moreSrc ? 'rotate(90deg)' : 'none', transition: 'transform .2s' }}><Ic.chevR /></span>More sources
              </button>
              {moreSrc && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
                  {MORE_SOURCES.map((s) => {
                    const on = conn.includes(s);
                    return (
                      <button key={s} onClick={() => togC(s)} className="bp-card" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '8px 13px', borderRadius: 999, cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: 13.5, color: on ? 'var(--ink)' : 'var(--muted)', borderColor: on ? 'var(--lime-deep)' : 'var(--bp-line)', background: on ? 'var(--lime-glow)' : undefined }}>
                        {on && <span style={{ color: 'var(--lime-deep)', fontSize: 12, display: 'flex' }}><Ic.check /></span>}{s}
                      </button>
                    );
                  })}
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--muted-2)', fontSize: 12 }}>
                <span style={{ color: 'var(--ai)', fontSize: 13, display: 'flex', flex: 'none' }}><Ic.shield /></span>
                Prototype: integrations are shown as readiness inputs and may not yet be fully connected.
              </div>
            </>
          )}

          {/* ── SUBSTEP 5 — REVIEW ── */}
          {sub === 4 && (
            <>
              <h1 className="serif" style={{ fontSize: 42, margin: '0 0 10px', color: 'var(--ink)', lineHeight: 1.06 }}>Ready to analyze?</h1>
              <p style={{ color: 'var(--muted)', fontSize: 17, margin: '0 0 24px', maxWidth: 580, lineHeight: 1.5 }}>Here’s what Proben will use for your readiness check.</p>
              <div style={{ display: 'grid', gap: 12 }}>
                <ReviewRow label="Meeting type" onEdit={() => go(0)}><span style={{ color: 'var(--ink)', fontSize: 15.5, fontWeight: 600 }}>{type}</span></ReviewRow>
                <ReviewRow label="Raw context" onEdit={() => go(1)}><span style={{ color: 'var(--ink-dim)', fontSize: 14.5, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{text || <span style={{ color: 'var(--muted-2)' }}>No context added yet</span>}</span></ReviewRow>
                <ReviewRow label="Materials" onEdit={() => go(2)}>{picked.length ? <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{picked.map((p) => <span key={p} style={{ fontSize: 12.5, padding: '4px 9px', borderRadius: 999, background: 'var(--inset-2)', color: 'var(--ink-dim)' }}>{p}</span>)}</div> : <span style={{ color: 'var(--muted-2)', fontSize: 14 }}>None — raw context is enough</span>}</ReviewRow>
                <ReviewRow label="Connected sources" onEdit={() => go(3)}>{conn.length ? <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{conn.map((c) => <span key={c} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, padding: '4px 9px', borderRadius: 999, background: 'var(--lime-glow)', border: '1px solid color-mix(in srgb, var(--lime-deep) 28%, transparent)', color: 'var(--ink-dim)' }}><span style={{ color: 'var(--lime-deep)', fontSize: 12, display: 'flex' }}>{SG[SRC_GLYPH[c]] || <Ic.layers />}</span>{c}</span>)}</div> : <span style={{ color: 'var(--muted-2)', fontSize: 14 }}>None connected</span>}</ReviewRow>
              </div>
              {/* optional details accordion */}
              <button onClick={() => setMoreDet(!moreDet)} style={{ background: 'none', border: 'none', color: 'var(--ai)', cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: 14.5, display: 'flex', alignItems: 'center', gap: 7, marginTop: 18, marginBottom: moreDet ? 14 : 0 }}>
                <span style={{ fontSize: 15, display: 'flex', transform: moreDet ? 'rotate(90deg)' : 'none', transition: 'transform .2s' }}><Ic.chevR /></span>Optional details — for a sharper readiness analysis
              </button>
              {moreDet && (
                <div className="bp-card" style={{ padding: 22, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  {[['Decision maker', 'stakeholder'], ['Who is in the room?', 'room'], ['Desired outcome', 'outcome'], ['Known objections', 'objections'], ['What worries you most?', 'worry'], ['Deadline / urgency', 'deadline']].map(([label, key]) => (
                    <label key={key}><div className="mono" style={{ color: 'var(--muted-2)', fontSize: 9.5, marginBottom: 6 }}>{label}</div><input value={det[key]} onChange={(e) => set(key, e.target.value)} style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid var(--line)', background: 'var(--inset)', color: 'var(--ink)', fontFamily: 'var(--sans)', fontSize: 15 }} /></label>
                  ))}
                </div>
              )}
              <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 9, color: 'var(--muted-2)', fontSize: 13 }}>
                <span style={{ color: 'var(--ai)', fontSize: 14, display: 'flex', flex: 'none' }}><Ic.shield /></span>
                Proben works with raw text, docs, slides, screenshots, and audio notes. No perfect formatting required.
              </div>
            </>
          )}
        </div>

        {/* helper side panel */}
        <aside className="cg-hide-narrow" style={{ position: 'sticky', top: 96 }}>
          <div className="bp-card" style={{ padding: 20, borderColor: 'color-mix(in srgb, var(--ai) 28%, var(--bp-line))' }}>
            <div className="mono" style={{ color: 'var(--ai)', fontSize: 9.5, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ fontSize: 13, display: 'flex' }}><Ic.spark /></span>{HELP[sub][0].toUpperCase()}</div>
            <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.55, margin: 0 }}>{HELP[sub][1]}</p>
          </div>
        </aside>
      </div>

      {/* sticky footer nav — primary CTA fixed position */}
      <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 20, borderTop: '1px solid var(--line)', background: 'var(--header-blur)', backdropFilter: 'blur(12px)' }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '14px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <Btn kind="ghost" sm icon={<Ic.chevL />} onClick={back}>{sub === 0 ? 'Home' : 'Back'}</Btn>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {(sub === 2 || sub === 3) && <button onClick={next} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: 14.5 }}>Skip</button>}
            {sub < TOTAL - 1
              ? <Btn kind="lime" iconR={<Ic.arrow />} onClick={next} disabled={sub === 1 && wordCount === 0}>{sub === 3 ? 'Review' : 'Next'}</Btn>
              : <Btn kind="lime" icon={<Ic.spark />} onClick={onAnalyze}>Analyze readiness</Btn>}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewRow({ label, children, onEdit }) {
  return (
    <div className="bp-card" style={{ padding: '15px 18px', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
      <div className="mono" style={{ color: 'var(--muted-2)', fontSize: 9, width: 130, flex: 'none', marginTop: 3 }}>{label.toUpperCase()}</div>
      <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
      <button onClick={onEdit} style={{ flex: 'none', background: 'none', border: 'none', color: 'var(--ai)', cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 600 }}>Edit</button>
    </div>
  );
}

/* ===== STEP 2 — context gaps ===== */
function ContextGaps({ onBack, onContinue }) {
  const [ans, setAns] = useState(['', '', '']);
  const [skip, setSkip] = useState([false, false, false]);
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-0)' }} className="bp-grid">
      <TopBar left={<Back onClick={onBack} label="Edit context" />} center="STEP 2 / 5 · CONTEXT GAPS" right={<Pill color="var(--ai)">GAP FINDER</Pill>} />
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '32px 36px 60px' }} className="fade-up">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <Mascot state="gap" size={40} animated />
          <div className="mono" style={{ color: 'var(--ai)', display: 'flex', alignItems: 'center', gap: 9 }}><span style={{ fontSize: 14, display: 'flex' }}><Ic.layers /></span>PROBEN SCANNED YOUR CONTEXT</div>
        </div>
        <h1 className="serif" style={{ fontSize: 38, margin: '0 0 6px', color: 'var(--ink)', lineHeight: 1.1 }}>Proben found 3 missing pieces of context.</h1>
        <p style={{ color: 'var(--muted)', fontSize: 16.5, margin: '0 0 26px', maxWidth: 640, lineHeight: 1.5 }}>Answer what you can — it sharpens your readiness report. Skip anything you’ll handle live.</p>
        <div style={{ display: 'grid', gap: 14 }}>
          {GAPS.map((g, i) => (
            <div key={i} className="bp-card" style={{ padding: 22, opacity: skip[i] ? 0.55 : 1, transition: 'opacity .2s' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 13 }}>
                <span style={{ width: 28, height: 28, borderRadius: 8, flex: 'none', display: 'grid', placeItems: 'center', background: 'var(--ai-dim)', color: 'var(--ai)', fontFamily: 'var(--mono)', fontWeight: 600, fontSize: 13 }}>{i + 1}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ color: 'var(--ink)', fontSize: 18, fontWeight: 600 }}>{g.t}</div>
                  <div style={{ color: 'var(--muted)', fontSize: 15, marginTop: 5, lineHeight: 1.45 }}>{g.d}</div>
                  <div style={{ marginTop: 10, display: 'flex', gap: 9, padding: '9px 12px', borderRadius: 9, background: 'var(--inset)', border: '1px solid var(--line)' }}>
                    <span className="mono" style={{ color: 'var(--c-bad)', fontSize: 8.5, flex: 'none', marginTop: 3, letterSpacing: '0.14em' }}>WHY IT MATTERS</span>
                    <span style={{ color: 'var(--ink-dim)', fontSize: 13.5, lineHeight: 1.45 }}>{g.why}</span>
                  </div>
                  {!skip[i] && (
                    <div style={{ marginTop: 14 }}>
                      <div style={{ color: 'var(--ink-dim)', fontSize: 14.5, fontWeight: 600, marginBottom: 8 }}>{g.q}</div>
                      <input value={ans[i]} onChange={(e) => setAns(ans.map((a, k) => k === i ? e.target.value : a))} placeholder="Type a short answer…" style={{ width: '100%', padding: '12px 15px', borderRadius: 9, border: '1px solid var(--line)', background: 'var(--inset)', color: 'var(--ink)', fontFamily: 'var(--sans)', fontSize: 15.5 }} />
                    </div>
                  )}
                </div>
                <button onClick={() => setSkip(skip.map((s, k) => k === i ? !s : s))} style={{ background: 'none', border: '1px solid var(--line-strong)', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', color: 'var(--muted)', fontFamily: 'var(--sans)', fontSize: 13, flex: 'none' }}>{skip[i] ? 'Answer' : 'Skip'}</button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}><Btn kind="lime" icon={<Ic.arrow />} onClick={onContinue}>Update readiness report</Btn></div>
      </div>
    </div>
  );
}

/* ===== Analyzing ===== */
function Analyzing5({ onDone }) {
  const steps = ['Reading meeting context', 'Checking strategic context', 'Scoring 5 readiness signals', 'Detecting risks & likely objections', 'Finding the critical practice moment'];
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => x + 1), 540); const d = setTimeout(onDone, 540 * steps.length + 300); return () => { clearInterval(t); clearTimeout(d); }; }, []);
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--bg-0)' }} className="bp-grid">
      <div style={{ textAlign: 'center', width: 440 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}><Mascot state="scanning" size={48} animated /></div>
        <div style={{ position: 'relative', width: 116, height: 116, margin: '0 auto 26px' }}>
          {[0, 1.4].map((dl, k) => <span key={k} style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid var(--bp)', animation: 'radarPulse 2.6s ease-out infinite', animationDelay: dl + 's' }} />)}
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid var(--track)', borderTopColor: 'var(--bp)', animation: 'spin5 1s linear infinite' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: 'var(--bp)', fontSize: 26 }}><Ic.target /></div>
        </div>
        <div className="serif" style={{ fontSize: 27, color: 'var(--ink)' }}>Checking your readiness…</div>
        <div style={{ marginTop: 24, display: 'grid', gap: 11, textAlign: 'left' }}>
          {steps.map((s, k) => <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 12, opacity: k <= i ? 1 : 0.3, transition: 'opacity .3s' }}><span style={{ width: 22, height: 22, borderRadius: '50%', display: 'grid', placeItems: 'center', background: k < i ? 'var(--lime)' : 'transparent', border: '1px solid ' + (k <= i ? 'var(--bp)' : 'var(--line)'), color: 'var(--cta-ink)', fontSize: 12 }}>{k < i && <Ic.check />}</span><span style={{ color: k <= i ? 'var(--ink)' : 'var(--muted)', fontSize: 15.5 }}>{s}</span></div>)}
        </div>
      </div>
      <style>{`@keyframes spin5{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

/* ===== STEP 3 — readiness report (5 signals) ===== */
function FixCard({ r, i }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { try { navigator.clipboard.writeText(r.ex); } catch (e) {} setCopied(true); setTimeout(() => setCopied(false), 1600); };
  return (
    <div className="bp-card" style={{ padding: 22 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 16 }}>
        <span style={{ width: 26, height: 26, borderRadius: 7, flex: 'none', display: 'grid', placeItems: 'center', background: 'color-mix(in srgb, var(--lime-deep) 16%, transparent)', color: 'var(--lime-deep)', fontFamily: 'var(--mono)', fontWeight: 600, fontSize: 13 }}>{i + 1}</span>
        <span className="serif" style={{ fontSize: 20, color: 'var(--ink)', lineHeight: 1.15 }}>{r.t}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <div style={{ display: 'grid', gap: 13, alignContent: 'start' }}>
          <Kv label="WHAT TO ADD" v={r.d} />
          <Kv label="WHY IT MATTERS" v={r.why} />
          <div>
            <div className="mono" style={{ color: 'var(--muted-2)', fontSize: 9, marginBottom: 7 }}>SCORE IMPACT</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              {r.impact.map((m, k) => <span key={k} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 10px', borderRadius: 999, background: 'var(--lime-glow)', border: '1px solid color-mix(in srgb, var(--lime-deep) 28%, transparent)', color: 'var(--lime-deep)', fontSize: 12.5, fontWeight: 600 }}>{m[0]} <span style={{ fontFamily: 'var(--mono)' }}>{m[1]}</span></span>)}
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gap: 12, alignContent: 'start' }}>
          <div style={{ borderRadius: 11, border: '1px solid color-mix(in srgb, var(--lime-deep) 30%, transparent)', background: 'var(--lime-glow)', padding: '13px 15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span className="mono" style={{ color: 'var(--lime-deep)', fontSize: 9 }}>COPY-READY LINE</span>
              <button onClick={copy} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 9px', borderRadius: 7, border: '1px solid color-mix(in srgb, var(--lime-deep) 35%, transparent)', background: 'var(--panel)', color: 'var(--lime-deep)', fontFamily: 'var(--sans)', fontSize: 11.5, fontWeight: 600, cursor: 'pointer' }}>
                <span style={{ fontSize: 12, display: 'flex' }}><Ic.check /></span>{copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="serif" style={{ fontSize: 16, color: 'var(--ink)', fontStyle: 'italic', lineHeight: 1.45 }}>“{r.ex}”</div>
          </div>
          <div style={{ borderRadius: 11, border: '1px solid var(--line)', background: 'var(--inset)', padding: '13px 15px' }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 9 }}>
              <span style={{ color: 'var(--amber)', fontSize: 13, fontWeight: 700, flex: 'none' }}>?</span>
              <div><span className="mono" style={{ color: 'var(--muted-2)', fontSize: 8.5 }}>LIKELY OBJECTION</span><div style={{ color: 'var(--ink)', fontSize: 14, fontWeight: 600, marginTop: 2 }}>“{r.objection}”</div></div>
            </div>
            <div style={{ display: 'flex', gap: 8, paddingTop: 9, borderTop: '1px solid var(--line)' }}>
              <span style={{ color: 'var(--lime-deep)', fontSize: 13, flex: 'none', marginTop: 1, display: 'flex' }}><Ic.arrow /></span>
              <div><span className="mono" style={{ color: 'var(--muted-2)', fontSize: 8.5 }}>HOW TO ANSWER</span><div style={{ color: 'var(--ink-dim)', fontSize: 14, marginTop: 2, lineHeight: 1.45 }}>{r.answer}</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function Kv({ label, v }) {
  return <div><div className="mono" style={{ color: 'var(--muted-2)', fontSize: 9, marginBottom: 5 }}>{label}</div><div style={{ color: 'var(--ink-dim)', fontSize: 14.5, lineHeight: 1.45 }}>{v}</div></div>;
}

function Report5({ onBack, onChat, onVoice, onUpload }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-0)' }} className="bp-grid">
      <TopBar left={<Back onClick={onBack} label="Edit context" />} center="STEP 3 / 5 · READINESS REPORT" right={<Pill color="var(--amber)" dot={false}>HIGH STAKES</Pill>} />
      <div style={{ maxWidth: 1040, margin: '0 auto', padding: '32px 36px 70px' }} className="fade-up">
        <div className="mono" style={{ color: 'var(--ai)', marginBottom: 10 }}>READINESS REPORT · STRATEGY REVIEW</div>
        <h1 className="serif" style={{ fontSize: 40, margin: '0 0 8px', color: 'var(--ink)', lineHeight: 1.08 }}>You’re partly ready — fix 3 things first.</h1>
        <p style={{ color: 'var(--muted)', fontSize: 17, margin: '0 0 24px', maxWidth: 720, lineHeight: 1.5 }}>Your meeting can work, but the decision ask, evidence, and stakeholder pushback need improvement before you walk in.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 16, marginBottom: 16 }}>
          <div className="bp-card" style={{ padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <ScoreRing value={6.2} size={144} />
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}><Pill color="var(--amber)" dot={false}>PARTLY READY</Pill><Pill color="var(--muted)" dot={false}>CONFIDENCE: MED</Pill></div>
            <div style={{ width: '100%', display: 'grid', gap: 9 }}>
              <Btn kind="lime" icon={<Ic.doc />} sm onClick={onChat} style={{ width: '100%', justifyContent: 'center' }}>Practice in chat</Btn>
              <Btn kind="ghost" icon={<Ic.mic />} sm onClick={onVoice} style={{ width: '100%', justifyContent: 'center' }}>Practice by voice</Btn>
              <button onClick={() => { try { navigator.clipboard.writeText('Readiness 6.2/10 — Partly ready. Top fixes: 1) Add a business-impact number. 2) Clarify the decision threshold. 3) Reframe pushback as risk management. Likely questions: Why now? · What does this delay? · What is the expected business impact? · Who owns the validation?'); } catch (e) {} }} style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '9px', borderRadius: 9, cursor: 'pointer', border: 'none', background: 'none', color: 'var(--muted)', fontFamily: 'var(--sans)', fontSize: 13.5 }}><span style={{ fontSize: 14, display: 'flex' }}><Ic.check /></span>Copy readiness brief</button>
            </div>
          </div>
          <div className="bp-card" style={{ padding: '24px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}><span className="mono" style={{ color: 'var(--muted)' }}>5 READINESS SIGNALS</span><span className="mono" style={{ color: 'var(--muted-2)', fontSize: 9.5 }}>DELIVERY SCORED AFTER PRACTICE</span></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px 34px' }}>{SIG5.map((s, i) => <ScoreBar key={i} label={s.label} value={s.v} />)}</div>
          </div>
        </div>
        {/* risks — 3 up */}
        <div className="bp-card" style={{ padding: 24, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}><span style={{ color: 'var(--risk)', fontSize: 17, display: 'flex' }}><Ic.warn /></span><span className="serif" style={{ fontSize: 22, color: 'var(--ink)' }}>Top 3 risks</span></div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
            {TOP_RISKS.map((r, i) => (
              <div key={i} style={{ display: 'grid', gap: 8, alignContent: 'start', paddingLeft: 14, borderLeft: '2px solid color-mix(in srgb, var(--risk) 40%, transparent)' }}>
                <div style={{ color: 'var(--ink)', fontSize: 16, fontWeight: 600, lineHeight: 1.2 }}>{r.t}</div>
                <div style={{ color: 'var(--muted)', fontSize: 13.5, lineHeight: 1.45 }}>{r.d}</div>
                <div style={{ color: 'var(--risk)', fontSize: 12.5, display: 'flex', gap: 7, marginTop: 2 }}><span className="mono" style={{ fontSize: 8, opacity: 0.8, flex: 'none', marginTop: 2 }}>LEADS&nbsp;TO</span>{r.cause}</div>
              </div>
            ))}
          </div>
        </div>

        {/* fixes — rich, copy-ready */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '0 0 14px' }}>
          <span style={{ color: 'var(--lime-deep)', fontSize: 17, display: 'flex' }}><Ic.check /></span>
          <span className="serif" style={{ fontSize: 22, color: 'var(--ink)' }}>Top 3 fixes — ready to use</span>
        </div>
        <div style={{ display: 'grid', gap: 12, marginBottom: 16 }}>
          {TOP_FIXES.map((r, i) => <FixCard key={i} r={r} i={i} />)}
        </div>

        <div className="bp-card" style={{ padding: 24 }}>
          <span className="serif" style={{ fontSize: 22, color: 'var(--ink)' }}>Likely questions</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 16 }}>{FOLLOWUPS.map((q, i) => <span key={i} style={{ padding: '11px 17px', borderRadius: 8, border: '1px solid var(--line)', background: 'var(--inset)', color: 'var(--ink-dim)', fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ color: 'var(--amber)', fontSize: 12 }}>?</span>“{q}”</span>)}</div>
        </div>

        {/* choose practice mode */}
        <div style={{ marginTop: 28 }}>
          <h2 className="serif" style={{ fontSize: 28, margin: 0, color: 'var(--ink)', lineHeight: 1.15 }}>Practice the moment most likely to decide the meeting.</h2>
          <p style={{ color: 'var(--muted)', fontSize: 16, margin: '8px 0 20px' }}>Try it in chat first, or rehearse it out loud when you’re ready.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
            {[
              { ic: <Ic.doc />, label: 'Practice in chat', rec: true, d: 'Role-play the stakeholder objection in writing. Proben replies as the stakeholder and scores your response.', best: 'Quiet rooms, first drafts, non-native speakers.', on: onChat, cta: 'Start chat' },
              { ic: <Ic.mic />, label: 'Practice by voice', d: 'Answer out loud, share your screen or documents, and get delivery feedback.', best: 'Final rehearsal, exec meetings, interviews.', on: onVoice, cta: 'Start voice' },
              { ic: <Ic.upload />, label: 'Upload for analysis', d: 'Drop a slide, doc, transcript, or draft answer. Proben checks whether it supports the goal.', best: 'You already have materials to check.', on: onUpload, cta: 'Upload' },
            ].map((m, i) => (
              <div key={i} className="bp-card" style={{ padding: 22, display: 'flex', flexDirection: 'column', borderColor: m.rec ? 'color-mix(in srgb, var(--lime-deep) 50%, var(--bp-line))' : 'var(--bp-line)', background: m.rec ? 'var(--lime-glow)' : undefined }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 13 }}>
                  <span style={{ width: 38, height: 38, borderRadius: 10, display: 'grid', placeItems: 'center', background: m.rec ? 'var(--panel)' : 'var(--ai-dim)', color: m.rec ? 'var(--lime-deep)' : 'var(--ai)', fontSize: 18 }}>{m.ic}</span>
                  {m.rec && <Pill color="var(--lime-deep)" dot={false} style={{ fontSize: 9 }}>RECOMMENDED</Pill>}
                </div>
                <div style={{ color: 'var(--ink)', fontSize: 18, fontWeight: 600, marginBottom: 7 }}>{m.label}</div>
                <div style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.45, marginBottom: 12 }}>{m.d}</div>
                <div style={{ color: 'var(--muted-2)', fontSize: 12.5, lineHeight: 1.4, marginBottom: 16, display: 'flex', gap: 7 }}><span className="mono" style={{ fontSize: 8.5, flex: 'none', marginTop: 2 }}>BEST&nbsp;FOR</span>{m.best}</div>
                <Btn kind={m.rec ? 'lime' : 'ghost'} sm icon={m.ic} onClick={m.on} style={{ marginTop: 'auto', width: '100%', justifyContent: 'center' }}>{m.cta}</Btn>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== STEP 5 — updated readiness ===== */
function Updated5({ onBack, onPractice, onChat, onDialogue }) {
  const deltas = [['Stakeholder risk', 5.5, 6.8], ['Decision ask', 5.2, 6.7], ['Delivery / voice', null, 6.9], ['Evidence', 6.0, 6.0]];
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-0)' }} className="bp-grid">
      <TopBar left={<Back onClick={onBack} label="Back to practice" />} center="STEP 5 / 5 · UPDATED READINESS" right={<Pill color="var(--lime)">+1.2</Pill>} />
      <div style={{ maxWidth: 880, margin: '0 auto', padding: '32px 36px 70px' }} className="fade-up">
        <div className="bp-card" style={{ padding: 28, marginBottom: 18, background: 'linear-gradient(110deg, var(--accent-panel-a), var(--accent-panel-b))', borderColor: 'color-mix(in srgb, var(--c-good) 30%, var(--bp-line))' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <Mascot state="celebrate" size={48} animated />
            <div className="mono" style={{ color: 'var(--c-good)' }}>AFTER PRACTICE</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <div style={{ textAlign: 'center' }}><div className="mono" style={{ color: 'var(--muted)', fontSize: 9.5, marginBottom: 4 }}>BEFORE</div><div className="serif" style={{ fontSize: 30, color: 'var(--muted)', lineHeight: 1 }}>6.2</div></div>
              <span style={{ fontSize: 22, color: 'var(--c-good)', display: 'flex' }}><Ic.arrow /></span>
              <div style={{ textAlign: 'center' }}><div className="mono" style={{ color: 'var(--muted)', fontSize: 9.5, marginBottom: 4 }}>NOW</div><div className="serif" style={{ fontSize: 40, color: 'var(--c-good)', lineHeight: 1 }}>7.4</div></div>
            </div>
            <div style={{ flex: 1, minWidth: 240, color: 'var(--ink-dim)', fontSize: 16, lineHeight: 1.5 }}>Your answer improved because you acknowledged the constraint, narrowed the ask, and reduced defensiveness. <b style={{ color: 'var(--ink)' }}>Evidence is still the main gap.</b></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginTop: 20 }}>
            {deltas.map((d, i) => <div key={i} style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid var(--line)', background: 'var(--panel)' }}><div className="mono" style={{ color: 'var(--muted)', fontSize: 9, marginBottom: 7 }}>{d[0]}</div><div style={{ display: 'flex', alignItems: 'baseline', gap: 7 }}><span style={{ color: 'var(--ink-dim)', fontFamily: 'var(--mono)', fontSize: 13 }}>{d[1] == null ? '—' : d[1].toFixed(1)} → {d[2].toFixed(1)}</span><span style={{ marginLeft: 'auto', fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 12.5, color: (d[1] == null || d[2] > d[1]) ? 'var(--c-good)' : 'var(--muted-2)' }}>{d[1] == null ? 'new' : d[2] > d[1] ? '+' + (d[2] - d[1]).toFixed(1) : '0'}</span></div></div>)}
          </div>
        </div>
        <div className="bp-card" style={{ padding: 22, marginBottom: 18, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: 'var(--lime-deep)', fontSize: 17, display: 'flex' }}><Ic.arrow /></span>
          <span style={{ color: 'var(--ink)', fontSize: 16.5 }}><b>Next fix:</b> add one business-impact slide before the meeting (enterprise blocked → €1.2M/yr → 2-week validation).</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          <Btn kind="lime" icon={<Ic.spark />} onClick={() => {}}>Copy better answer</Btn>
          <Btn kind="ghost" icon={<Ic.doc />} onClick={onChat}>Try in chat</Btn>
          <Btn kind="ghost" icon={<Ic.mic />} onClick={onPractice}>Practice again</Btn>
          <Btn kind="ghost" icon={<Ic.layers />} onClick={onDialogue}>See where it split</Btn>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { SIG5, CHECKS5, tcol, RadarHero5, Input5, ContextGaps, Analyzing5, Report5, Updated5, TopBar, Back });
