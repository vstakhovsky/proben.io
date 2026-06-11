/* global React, Ic, Logo, Pill, Btn, ScoreRing, ScoreBar, RadarHero5, SIG5, CHECKS5, tcol, TOP_RISKS, TOP_FIXES, FOLLOWUPS */

const Sun = (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/></svg>;
const Moon = (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...p}><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></svg>;
function Toggle({ theme, onToggle }) {
  return <button onClick={onToggle} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, cursor: 'pointer', border: '1px solid var(--bp-line)', background: 'transparent', borderRadius: 8, padding: '8px 12px', color: 'var(--header-ink)', fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 500 }}><span style={{ fontSize: 15, display: 'flex', color: theme === 'dark' ? 'var(--bp)' : 'var(--ai)' }}>{theme === 'dark' ? <Moon /> : <Sun />}</span>{theme === 'dark' ? 'Dark' : 'Light'}</button>;
}

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 90;
  try { window.scrollTo({ top, behavior: 'smooth' }); } catch (e) { window.scrollTo(0, top); }
  // guaranteed fallback if smooth is a no-op in the host
  setTimeout(() => { if (Math.abs(window.scrollY - top) > 8) window.scrollTo(0, top); }, 60);
}
function NavLink({ label, onClick }) {
  return (
    <button onClick={onClick} style={{ background: 'none', border: 'none', color: 'var(--header-ink)', fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 500, opacity: 0.78, cursor: 'pointer', padding: '8px 14px', borderRadius: 999, transition: 'all .14s' }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--hover)'; e.currentTarget.style.opacity = 1; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.opacity = 0.78; }}>{label}</button>
  );
}
function Nav5({ onStart, onSample, theme, onToggle }) {
  const links = [['Sample report', 'sample'], ['How it works', 'how'], ['What it checks', 'checks'], ['Pricing', 'pricing']];
  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 30, padding: '16px 20px 0', pointerEvents: 'none' }}>
      <header style={{ pointerEvents: 'auto', maxWidth: 1180, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 10px 9px 20px', borderRadius: 999, border: '1px solid var(--header-line)', background: 'var(--header-blur)', backdropFilter: 'blur(16px)', boxShadow: 'var(--shadow-card)' }}>
        <Logo />
        <nav style={{ display: 'flex', alignItems: 'center', gap: 2, background: 'var(--inset)', borderRadius: 999, padding: 4, border: '1px solid var(--line)' }}>
          {links.map((l, i) => <NavLink key={i} label={l[0]} onClick={() => scrollToId(l[1])} />)}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Toggle theme={theme} onToggle={onToggle} />
          <Btn kind="lime" sm icon={<Ic.arrow />} onClick={onStart} style={{ padding: '11px 17px', fontSize: 14 }}>Run readiness check</Btn>
        </div>
      </header>
    </div>
  );
}
function Sec({ eyebrow, title, sub, children, tint, id }) {
  return (
    <section id={id} style={{ background: tint ? 'var(--bg-2)' : 'transparent', borderTop: tint ? '1px solid var(--line)' : 'none', borderBottom: tint ? '1px solid var(--line)' : 'none', scrollMarginTop: 96 }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '62px 36px' }}>
        {(eyebrow || title) && <div style={{ marginBottom: 32, maxWidth: 760 }}>{eyebrow && <div className="mono" style={{ color: 'var(--ai)', marginBottom: 13, display: 'flex', alignItems: 'center', gap: 9 }}><span style={{ width: 18, height: 1, background: 'var(--bp-line)' }} />{eyebrow}</div>}{title && <h2 className="serif" style={{ fontSize: 44, margin: 0, color: 'var(--ink)', lineHeight: 1.16 }}>{title}</h2>}{sub && <p style={{ color: 'var(--muted)', fontSize: 18, lineHeight: 1.5, marginTop: 18 }}>{sub}</p>}</div>}
        {children}
      </div>
    </section>
  );
}
const STRIP = [['readiness score', <Ic.target />], ['missing context', <Ic.gap />], ['top 3 fixes', <Ic.check />], ['likely questions', <span style={{ fontWeight: 700 }}>?</span>], ['one practice moment', <Ic.mic />]];

/* concrete hero product-demo card — replaces the abstract radar */
const HERO_CHECKS = [
  ['Goal clarity', '8.0', 'good'],
  ['Strategic context', '5.8', 'risk'],
  ['Evidence', '6.0', 'amber'],
  ['Stakeholder risk', '5.5', 'risk'],
  ['Decision ask', '5.2', 'risk'],
];
const HERO_GAPS = ['Business impact unclear', 'Decision threshold missing', 'Stakeholder pushback likely'];

/* hero — single readiness report preview, no decorative chips */
function HeroShowcase() {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 560, padding: '8px 0' }}>
      <HeroDemo />
    </div>
  );
}

function HeroDemo() {
  const col = (t) => t === 'good' ? 'var(--c-good)' : t === 'amber' ? 'var(--c-warn)' : 'var(--c-bad)';
  return (
    <div className="bp-card" style={{ width: '100%', maxWidth: 540, margin: '0 auto', padding: 0, overflow: 'hidden', boxShadow: 'var(--shadow-hero)', position: 'relative', zIndex: 2 }}>
      {/* window chrome */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 16px', borderBottom: '1px solid var(--line)', background: 'var(--bg-2)' }}>
        <span style={{ display: 'flex', gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--c-bad)', opacity: 0.55 }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--c-warn)', opacity: 0.55 }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--c-good)', opacity: 0.55 }} />
        </span>
        <span style={{ margin: '0 auto', display: 'inline-flex', alignItems: 'center', gap: 7, padding: '4px 12px', borderRadius: 7, background: 'var(--inset)', border: '1px solid var(--line)', fontFamily: 'var(--mono)', fontSize: 10.5, color: 'var(--muted)' }}><span style={{ fontSize: 11, display: 'flex', color: 'var(--ai)' }}><Ic.shield /></span>proben.io / readiness-brief</span>
      </div>
      {/* input row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '15px 20px', borderBottom: '1px solid var(--line)', background: 'var(--inset)' }}>
        <span style={{ width: 30, height: 30, borderRadius: 8, flex: 'none', display: 'grid', placeItems: 'center', background: 'var(--ai-dim)', color: 'var(--ai)', fontSize: 15 }}><Ic.doc /></span>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.14em', color: 'var(--muted-2)' }}>YOUR CONTEXT</div>
          <div style={{ color: 'var(--ink)', fontSize: 15, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Strategy review · roadmap pivot</div>
        </div>
        <span style={{ marginLeft: 'auto', flex: 'none', fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--lime-deep)', background: 'var(--lime-glow)', border: '1px solid color-mix(in srgb, var(--lime-deep) 28%, transparent)', padding: '4px 9px', borderRadius: 999 }}>ANALYZED</span>
      </div>
      {/* score + verdict */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '18px 20px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span className="serif" style={{ fontSize: 46, color: 'var(--c-warn)', lineHeight: 1 }}>6.2</span>
          <span style={{ color: 'var(--muted)', fontSize: 16, fontFamily: 'var(--mono)' }}>/10</span>
        </div>
        <div>
          <div style={{ color: 'var(--ink)', fontSize: 16, fontWeight: 600 }}>Partly ready</div>
          <div style={{ color: 'var(--c-bad)', fontSize: 13.5, fontWeight: 600, marginTop: 2 }}>3 context gaps found</div>
        </div>
      </div>
      {/* 5 checks */}
      <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.14em', color: 'var(--muted-2)', marginBottom: 11 }}>5 CHECKS</div>
        <div style={{ display: 'grid', gap: 9 }}>
          {HERO_CHECKS.map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', flex: 'none', background: col(c[2]) }} />
              <span style={{ color: 'var(--ink-dim)', fontSize: 14, fontWeight: 500, flex: 'none', width: 130 }}>{c[0]}</span>
              <span style={{ flex: 1, height: 6, background: 'var(--track)', borderRadius: 99, position: 'relative' }}><span style={{ position: 'absolute', inset: 0, width: (parseFloat(c[1]) * 10) + '%', background: col(c[2]), borderRadius: 99 }} /></span>
              <span style={{ fontFamily: 'var(--mono)', fontWeight: 600, fontSize: 13, color: col(c[2]), width: 28, textAlign: 'right' }}>{c[1]}</span>
            </div>
          ))}
        </div>
      </div>
      {/* gaps */}
      <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.14em', color: 'var(--c-bad)', marginBottom: 10 }}>3 CONTEXT GAPS FOUND</div>
        <div style={{ display: 'grid', gap: 7 }}>
          {HERO_GAPS.map((g, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--ink-dim)', fontSize: 14 }}>
              <span style={{ width: 18, height: 18, borderRadius: 5, flex: 'none', display: 'grid', placeItems: 'center', background: 'var(--risk-dim)', color: 'var(--c-bad)', fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600 }}>{i + 1}</span>{g}
            </div>
          ))}
        </div>
      </div>
      {/* top fix + practice */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--line)' }}>
        <div style={{ padding: '13px 18px', background: 'var(--panel)' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 8.5, letterSpacing: '0.14em', color: 'var(--muted-2)', marginBottom: 6 }}>TOP FIX</div>
          <div style={{ display: 'flex', gap: 8, color: 'var(--ink)', fontSize: 13.5, fontWeight: 500, lineHeight: 1.35 }}><span style={{ color: 'var(--lime-deep)', flex: 'none', display: 'flex', marginTop: 1 }}><Ic.check /></span>Add a business-impact number</div>
        </div>
        <div style={{ padding: '13px 18px', background: 'var(--panel)' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 8.5, letterSpacing: '0.14em', color: 'var(--muted-2)', marginBottom: 6 }}>PRACTICE MOMENT</div>
          <div style={{ display: 'flex', gap: 8, color: 'var(--ink)', fontSize: 13.5, fontWeight: 500, lineHeight: 1.35 }}><span style={{ color: 'var(--ai)', flex: 'none', display: 'flex', marginTop: 1 }}><Ic.mic /></span>“Why now?”</div>
        </div>
      </div>
    </div>
  );
}

/* ---- inline icons for the context-source set ---- */
const IcChart = (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 20V11M10 20V5M16 20v-6M21 20H3"/></svg>;
const IcCode = (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M8 7l-5 5 5 5M16 7l5 5-5 5"/></svg>;
const IcUsers = (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-5 6-5s6 1.7 6 5"/><path d="M16 5.2A3.2 3.2 0 0 1 16 11M21 20c0-3-1.6-4.6-4-4.9"/></svg>;
const IcSlides = (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M12 17v3M9 20h6"/></svg>;

/* the 8 context sources */
const CTX_SOURCES = [
  ['Strategy / OKRs', <Ic.target />],
  ['PRD / RFC / ADR', <Ic.doc />],
  ['Notes / Slides', <IcSlides />],
  ['Metrics / Dashboards', <IcChart />],
  ['Markdown files', <span style={{ fontFamily: 'var(--mono)', fontSize: 9, fontWeight: 700 }}>MD</span>],
  ['AI outputs', <Ic.spark />],
  ['GitHub / GitLab', <IcCode />],
  ['Stakeholder input', <IcUsers />],
];
const CG_SYMPTOMS = ['Missing context', 'Outdated info', 'Hidden objections', 'Unclear ask', 'Cross-team misalignment'];
const CG_ACTIONS = [
  ['Missing context', <Ic.gap />],
  ['Top risks', <Ic.warn />],
  ['Top fixes', <Ic.check />],
  ['Likely questions', <span style={{ fontWeight: 700 }}>?</span>],
  ['One practice moment', <Ic.mic />],
];
const CG_CHECKS = [
  ['Goal clarity', 8.0, 'good'],
  ['Strategic context', 5.8, 'risk'],
  ['Evidence', 6.0, 'amber'],
  ['Stakeholder risk', 5.5, 'risk'],
  ['Decision ask', 5.2, 'risk'],
];
const cgCol = (t) => t === 'good' ? 'var(--c-good)' : t === 'amber' ? 'var(--c-warn)' : 'var(--c-bad)';

/* one column of the diagram */
function CGColumn({ tone, step, title, sub, children }) {
  const col = tone === 'risk' ? 'var(--c-bad)' : 'var(--lime-deep)';
  return (
    <div className="cg-col bp-card" style={{ padding: 24, display: 'flex', flexDirection: 'column', borderColor: 'color-mix(in srgb, ' + col + ' 35%, var(--bp-line))', transition: 'transform .15s ease, border-color .15s ease' }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = 'color-mix(in srgb, ' + col + ' 60%, var(--bp-line))'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'color-mix(in srgb, ' + col + ' 35%, var(--bp-line))'; }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
        <span style={{ width: 24, height: 24, flex: 'none', borderRadius: 7, display: 'grid', placeItems: 'center', background: 'color-mix(in srgb, ' + col + ' 14%, transparent)', color: col, fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 12 }}>{step}</span>
        <span style={{ color: 'var(--ink)', fontSize: 18, fontWeight: 600 }}>{title}</span>
      </div>
      <div style={{ color: 'var(--muted)', fontSize: 13.5, lineHeight: 1.45, marginBottom: 18, paddingLeft: 34 }}>{sub}</div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>{children}</div>
    </div>
  );
}
function CGStatus({ tone, children }) {
  const col = tone === 'risk' ? 'var(--c-bad)' : 'var(--lime-deep)';
  return (
    <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 9, padding: '12px 14px', borderRadius: 10, background: tone === 'risk' ? 'var(--risk-dim)' : 'var(--lime-glow)', border: '1px solid color-mix(in srgb, ' + col + ' 22%, transparent)' }}>
      <span style={{ color: col, fontSize: 15, display: 'flex', flex: 'none' }}>{tone === 'risk' ? <Ic.warn /> : <Ic.check />}</span>
      <span style={{ color: 'var(--ink-dim)', fontSize: 13.5, fontWeight: 500, lineHeight: 1.35 }}>{children}</span>
    </div>
  );
}
function CGChip({ icon, label }) {
  return (
    <span className="cg-chip" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '7px 11px', borderRadius: 9, border: '1px solid var(--line-strong)', background: 'var(--panel)', color: 'var(--ink-dim)', fontSize: 12, fontWeight: 500, transition: 'border-color .14s ease' }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--bp)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--line-strong)'}>
      <span style={{ color: 'var(--muted)', fontSize: 12, display: 'flex', flex: 'none' }}>{icon}</span>{label}
    </span>
  );
}

/* green flow arrow that sits in a grid track between two steps */
function ZoneHead({ tone, step, title, sub }) {
  const col = tone === 'risk' ? 'var(--c-bad)' : 'var(--lime-deep)';
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
        <span style={{ width: 24, height: 24, flex: 'none', borderRadius: 7, display: 'grid', placeItems: 'center', background: 'color-mix(in srgb, ' + col + ' 16%, transparent)', color: col, fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 12 }}>{step}</span>
        <span style={{ color: 'var(--ink)', fontSize: 18, fontWeight: 600 }}>{title}</span>
      </div>
      <div style={{ color: 'var(--muted)', fontSize: 13.5, lineHeight: 1.45, paddingLeft: 34 }}>{sub}</div>
    </div>
  );
}
function CGArrow() {
  return (
    <div className="cg-arrow" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="46" height="22" viewBox="0 0 46 22" fill="none" style={{ overflow: 'visible' }}>
        <line x1="0" y1="11" x2="33" y2="11" stroke="var(--lime-deep)" strokeWidth="2" strokeLinecap="round" strokeDasharray="0.1 7" />
        <line x1="2" y1="11" x2="34" y2="11" stroke="var(--lime-deep)" strokeWidth="2" strokeLinecap="round" />
        <path d="M33 4 L45 11 L33 18" fill="none" stroke="var(--lime-deep)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* compact source row (left of step 1) */
function CGSource({ icon, label }) {
  return (
    <div className="cg-src" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 9px', borderRadius: 8, border: '1px solid var(--line-strong)', background: 'var(--panel)', color: 'var(--ink-dim)', fontSize: 11, fontWeight: 500, lineHeight: 1.2, transition: 'border-color .14s ease' }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--bp)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--line-strong)'}>
      <span style={{ color: 'var(--muted)', fontSize: 12, display: 'flex', flex: 'none' }}>{icon}</span><span style={{ minWidth: 0 }}>{label}</span>
    </div>
  );
}

/* scattered sources --(red dashed fan)--> symptoms */
function CGScatter() {
  // [sourceY, symptomY] in the 0..120 viewBox — intentionally crossed
  const links = [[6, 12], [21, 34], [36, 12], [51, 56], [66, 34], [81, 78], [96, 100], [111, 78]];
  return (
    <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 20, minHeight: 296, marginBottom: 6 }}>
      <svg viewBox="0 0 100 120" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        <defs>
          <marker id="cgArrowR" markerWidth="6" markerHeight="6" refX="4.5" refY="3" orient="auto">
            <path d="M0.5 0.5 L5 3 L0.5 5.5" fill="none" stroke="var(--c-bad)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>
        {links.map(([sy, dy], i) => (
          <path key={i} className="cg-redline" style={{ animationDelay: (i * 0.13) + 's' }} d={`M3 ${sy} C 46 ${sy}, 54 ${dy}, 95 ${dy}`} fill="none" stroke="var(--c-bad)" strokeWidth="0.7" strokeDasharray="2 2.4" opacity="0.6" markerEnd="url(#cgArrowR)" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {CTX_SOURCES.map((s, i) => <div key={i} className="cg-src" style={{ animationDelay: (i * 0.3) + 's' }}><CGSource icon={s[1]} label={s[0]} /></div>)}
      </div>
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {CG_SYMPTOMS.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 11px', borderRadius: 8, background: 'var(--risk-dim)', border: '1px solid color-mix(in srgb, var(--c-bad) 28%, transparent)', color: 'var(--ink-dim)', fontSize: 12.5, fontWeight: 500 }}>
            <span style={{ color: 'var(--c-bad)', fontSize: 13, display: 'flex', flex: 'none' }}><Ic.warn /></span>{s}
          </div>
        ))}
      </div>
    </div>
  );
}

const CG_W = 1200, CG_H = 600;
const pcx = (px) => (px / CG_W * 100) + '%';
const pcy = (px) => (px / CG_H * 100) + '%';
/* [sourceY, symptomY] on the 600-tall canvas — intentionally crossed for a fragmented feel */
const RED_LINKS = [[132, 206], [176, 150], [220, 318], [264, 206], [308, 150], [352, 374], [396, 262], [440, 318]];

function CGLabel({ x, y, tone, step, title, sub }) {
  const col = tone === 'risk' ? 'var(--c-bad)' : 'var(--lime-deep)';
  return (
    <div style={{ position: 'absolute', left: x + '%', top: y + '%', width: 250, zIndex: 4 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 4 }}>
        <span style={{ width: 22, height: 22, flex: 'none', borderRadius: 7, display: 'grid', placeItems: 'center', background: 'color-mix(in srgb, ' + col + ' 16%, transparent)', color: col, fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 11 }}>{step}</span>
        <span style={{ color: 'var(--ink)', fontSize: 16, fontWeight: 600, lineHeight: 1.15 }}>{title}</span>
      </div>
      <div style={{ color: 'var(--muted)', fontSize: 12.5, lineHeight: 1.4, paddingLeft: 31, maxWidth: 230 }}>{sub}</div>
    </div>
  );
}
function CGBanner({ x, y, w, tone, children }) {
  const col = tone === 'risk' ? 'var(--c-bad)' : 'var(--lime-deep)';
  return (
    <div style={{ position: 'absolute', left: x + '%', top: y + '%', width: w + '%', zIndex: 2, display: 'flex', alignItems: 'center', gap: 8, padding: '11px 13px', borderRadius: 10, background: tone === 'risk' ? 'var(--risk-dim)' : 'var(--lime-glow)', border: '1px solid color-mix(in srgb, ' + col + ' 22%, transparent)' }}>
      <span style={{ color: col, fontSize: 14, display: 'flex', flex: 'none' }}>{tone === 'risk' ? <Ic.warn /> : <Ic.check />}</span>
      <span style={{ color: 'var(--ink-dim)', fontSize: 12.5, fontWeight: 500, lineHeight: 1.3 }}>{children}</span>
    </div>
  );
}

function ContextGapSection() {
  return (
    <section id="context-gap" aria-label="Context gap" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', scrollMarginTop: 96 }}>
      <div className="bp-grid" style={{ maxWidth: 1320, margin: '0 auto', padding: '66px 36px' }}>
        {/* header + badge */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, marginBottom: 32, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 760 }}>
            <div className="mono" style={{ color: 'var(--ai)', marginBottom: 13, display: 'flex', alignItems: 'center', gap: 9 }}><span style={{ width: 18, height: 1, background: 'var(--bp-line)' }} />CONTEXT GAP</div>
            <h2 className="serif" style={{ fontSize: 42, margin: 0, color: 'var(--ink)', lineHeight: 1.16 }}>Most meetings fail before people start talking.</h2>
            <p style={{ color: 'var(--muted)', fontSize: 18, lineHeight: 1.55, marginTop: 16 }}>From 1:1s to cross-functional reviews, the problem is the same: context is scattered, readiness is unclear, and weak spots only surface in the room. Proben collects context, checks readiness, and shows what to fix before the meeting starts.</p>
          </div>
          <div className="bp-card" style={{ flex: 'none', padding: '12px 16px', textAlign: 'right', borderColor: 'color-mix(in srgb, var(--bp) 35%, var(--bp-line))' }}>
            <div className="mono" style={{ color: 'var(--ai)', fontSize: 9.5, marginBottom: 4 }}>WORKS FOR ANY MEETING SIZE</div>
            <div style={{ color: 'var(--ink)', fontSize: 15, fontWeight: 600 }}>1:1s to 100+ people</div>
          </div>
        </div>

        {/* ONE connected diagram — absolute canvas, shared SVG connector layer */}
        <div className="cg-scroll" style={{ overflowX: 'auto', overflowY: 'hidden', borderRadius: 24 }}>
          <div className="cg-canvas" style={{ position: 'relative', width: '100%', minWidth: 1060, aspectRatio: CG_W + ' / ' + CG_H, borderRadius: 24, border: '1px solid var(--bp-line)', overflow: 'hidden', background: 'radial-gradient(120% 100% at 6% 28%, color-mix(in srgb, var(--c-bad) 8%, transparent), transparent 40%), radial-gradient(120% 100% at 96% 62%, color-mix(in srgb, var(--lime-deep) 10%, transparent), transparent 46%), var(--panel)', boxShadow: 'var(--shadow-card)' }}>

            {/* shared SVG connector layer (behind nodes) */}
            <svg viewBox={'0 0 ' + CG_W + ' ' + CG_H} preserveAspectRatio="none" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
              <defs>
                <marker id="cgRed" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M1 1 L6 3.5 L1 6" fill="none" stroke="var(--c-bad)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></marker>
                <marker id="cgGrn" markerWidth="8" markerHeight="8" refX="5.5" refY="4" orient="auto"><path d="M1 1 L7 4 L1 7" fill="none" stroke="var(--lime-deep)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></marker>
                <linearGradient id="cgGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="var(--lime-deep)" stopOpacity="0.25" /><stop offset="1" stopColor="var(--lime-deep)" stopOpacity="0.9" /></linearGradient>
              </defs>
              {/* red dashed: sources -> symptoms (crossed, fragmented) */}
              {RED_LINKS.map(([sy, dy], i) => (
                <path key={i} className="cg-redline" style={{ animationDelay: (i * 0.11) + 's' }} d={`M170 ${sy} C 216 ${sy}, 208 ${dy}, 252 ${dy}`} fill="none" stroke="var(--c-bad)" strokeWidth="1.4" strokeDasharray="3 5" opacity="0.5" markerEnd="url(#cgRed)" vectorEffect="non-scaling-stroke" />
              ))}
              {/* green: symptoms -> engine (converging) */}
              {[150, 206, 262, 318, 374].map((y, i) => (
                <path key={i} d={`M408 ${y} C 452 ${y}, 470 300, 484 300`} fill="none" stroke="url(#cgGrad)" strokeWidth="2" opacity="0.55" vectorEffect="non-scaling-stroke" />
              ))}
              <path className="cg-greenflow" d="M408 262 C 452 262, 470 300, 484 300" fill="none" stroke="var(--lime-deep)" strokeWidth="2.4" strokeDasharray="2 12" strokeLinecap="round" opacity="0.75" vectorEffect="non-scaling-stroke" />
              {/* green: engine -> brief (strong output) */}
              <path d="M716 300 C 744 300, 752 300, 776 300" fill="none" stroke="var(--lime-deep)" strokeWidth="3.4" markerEnd="url(#cgGrn)" vectorEffect="non-scaling-stroke" />
              <path className="cg-greenflow" d="M716 300 C 744 300, 752 300, 772 300" fill="none" stroke="var(--lime-deep)" strokeWidth="3" strokeDasharray="2 11" strokeLinecap="round" opacity="0.85" vectorEffect="non-scaling-stroke" />
              {/* traveling light particles */}
              <circle r="3.4" fill="var(--lime-deep)"><animateMotion dur="1.9s" repeatCount="indefinite" path="M408 262 C 452 262, 470 300, 484 300" /></circle>
              <circle r="3" fill="var(--lime-deep)" opacity="0.7"><animateMotion dur="2.1s" repeatCount="indefinite" begin="0.6s" path="M408 150 C 452 150, 470 300, 484 300" /></circle>
              <circle r="4.2" fill="var(--lime-deep)"><animateMotion dur="1.5s" repeatCount="indefinite" begin="0.3s" path="M716 300 C 744 300, 752 300, 776 300" /></circle>
            </svg>

            {/* zone labels */}
            <CGLabel x={1.8} y={4} tone="risk" step="1" title="Context is scattered" sub="Sources, people, and knowledge are fragmented." />
            <CGLabel x={40.5} y={4} tone="good" step="2" title="Proben checks readiness" sub="Collects context, checks 5 signals, prepares a brief." />
            <CGLabel x={64.5} y={4} tone="good" step="3" title="Readiness before the meeting" sub="One brief before the room does the checking." />

            {/* sources (far left) */}
            {CTX_SOURCES.map((s, i) => (
              <div key={i} className="cg-src" style={{ position: 'absolute', left: pcx(92), top: pcy(132 + i * 44), transform: 'translate(-50%,-50%)', width: 150, zIndex: 2, animationDelay: (i * 0.28) + 's' }}><CGSource icon={s[1]} label={s[0]} /></div>
            ))}

            {/* symptoms */}
            {CG_SYMPTOMS.map((s, i) => (
              <div key={i} style={{ position: 'absolute', left: pcx(330), top: pcy(150 + i * 56), transform: 'translate(-50%,-50%)', width: 154, zIndex: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 11px', borderRadius: 9, background: 'var(--risk-dim)', border: '1px solid color-mix(in srgb, var(--c-bad) 28%, transparent)', color: 'var(--ink-dim)', fontSize: 12, fontWeight: 500 }}>
                  <span style={{ color: 'var(--c-bad)', fontSize: 13, display: 'flex', flex: 'none' }}><Ic.warn /></span>{s}
                </div>
              </div>
            ))}

            {/* central engine */}
            <div className="cg-engine" style={{ position: 'absolute', left: pcx(600), top: pcy(302), transform: 'translate(-50%,-50%)', width: 232, zIndex: 3, textAlign: 'center', padding: '22px 18px', borderRadius: 18, border: '1.5px solid color-mix(in srgb, var(--lime-deep) 50%, var(--line))', background: 'linear-gradient(180deg, color-mix(in srgb, var(--lime-deep) 16%, var(--panel)), var(--panel))' }}>
              <span style={{ display: 'inline-flex', marginBottom: 14 }}><Logo /></span>
              <div style={{ display: 'grid', gap: 8, textAlign: 'left' }}>
                {['Collects from all sources', 'Connects the full picture', 'Checks readiness'].map((b, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, color: 'var(--ink-dim)', fontSize: 13 }}><span style={{ color: 'var(--lime-deep)', fontSize: 13, display: 'flex', flex: 'none' }}><Ic.check /></span>{b}</div>
                ))}
              </div>
            </div>

            {/* readiness brief */}
            <div style={{ position: 'absolute', left: pcx(976), top: pcy(296), transform: 'translate(-50%,-50%)', width: 392, zIndex: 2, borderRadius: 16, border: '1px solid color-mix(in srgb, var(--lime-deep) 32%, var(--line))', background: 'var(--panel)', overflow: 'hidden', boxShadow: 'var(--shadow-pop)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 16px', borderBottom: '1px solid var(--line)', background: 'var(--inset)' }}>
                <span className="mono" style={{ color: 'var(--muted)', fontSize: 9 }}>READINESS BRIEF</span>
                <span style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}><span className="serif" style={{ fontSize: 26, color: 'var(--c-warn)', lineHeight: 1 }}>6.2</span><span style={{ color: 'var(--muted)', fontSize: 12, fontFamily: 'var(--mono)' }}>/10</span></span>
              </div>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>
                <div className="mono" style={{ color: 'var(--muted-2)', fontSize: 8.5, marginBottom: 9 }}>YOU GET</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px 14px' }}>
                  {CG_ACTIONS.map((a, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--ink-dim)', fontSize: 12.5 }}><span style={{ color: 'var(--ai)', fontSize: 12, display: 'flex', flex: 'none', width: 14, justifyContent: 'center' }}>{a[1]}</span>{a[0]}</div>
                  ))}
                </div>
              </div>
              <div style={{ padding: '12px 16px' }}>
                <div className="mono" style={{ color: 'var(--muted-2)', fontSize: 8.5, marginBottom: 9 }}>5 CHECKS</div>
                <div style={{ display: 'grid', gap: 8 }}>
                  {CG_CHECKS.map((c, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                      <span style={{ color: 'var(--ink-dim)', fontSize: 12, flex: 'none', width: 100 }}>{c[0]}</span>
                      <span className="cg-bar" style={{ flex: 1, height: 6, background: 'var(--track)', borderRadius: 99, overflow: 'hidden' }}><i style={{ width: (c[1] * 10) + '%', background: cgCol(c[2]), animationDelay: (0.2 + i * 0.12) + 's' }} /></span>
                      <span style={{ fontFamily: 'var(--mono)', fontWeight: 600, fontSize: 11.5, color: cgCol(c[2]), width: 24, textAlign: 'right' }}>{c[1].toFixed(1)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* status banners */}
            <CGBanner x={1.8} y={87.5} w={33.5} tone="risk">Fragmented, partial, and not ready for the room.</CGBanner>
            <CGBanner x={40.5} y={87.5} w={19.2} tone="good">Same flow for any meeting size.</CGBanner>
            <CGBanner x={64.5} y={87.5} w={32.7} tone="good">Clearer context. Better readiness. Better conversations.</CGBanner>
          </div>
        </div>

        {/* bottom callout */}
        <div className="bp-card" style={{ marginTop: 16, padding: '22px 28px', textAlign: 'center', borderColor: 'color-mix(in srgb, var(--bp) 35%, var(--bp-line))' }}>
          <div style={{ color: 'var(--ink)', fontSize: 19, fontWeight: 600, marginBottom: 12 }}>Understand readiness before the meeting.</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, flexWrap: 'wrap', color: 'var(--muted)', fontSize: 14.5 }}>
            {['Surface weak spots early', 'Identify what’s missing', 'Focus on what matters', 'Make better decisions'].map((t, i) => (
              <React.Fragment key={i}>{i > 0 && <span style={{ color: 'var(--bp)', flex: 'none' }}>·</span>}<span>{t}</span></React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LandingMvp5({ onStart, onSample, theme, onToggle, embedded }) {
  return (
    <div style={{ minHeight: embedded ? 0 : '100vh', background: 'transparent' }}>
      {!embedded && <Nav5 onStart={onStart} onSample={onSample} theme={theme} onToggle={onToggle} />}
      <section className="bp-grid" style={{ borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '60px 36px', display: 'grid', gridTemplateColumns: '1fr 560px', gap: 56, alignItems: 'center' }}>
          <div className="fade-up">
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
              <Pill style={{ marginBottom: 0 }}><span className="dot" style={{ background: 'var(--ai)' }} />CONTEXT READINESS BEFORE IMPORTANT MEETINGS</Pill>
              <Mascot state="idle" size={48} animated dismissible />
            </div>
            <h1 className="serif" style={{ fontSize: 60, lineHeight: 1.12, margin: 0, color: 'var(--ink)', letterSpacing: '-0.01em' }}>Know what to fix before the meeting starts.</h1>
            <p style={{ fontSize: 20, lineHeight: 1.55, color: 'var(--muted)', maxWidth: 540, marginTop: 22 }}>Paste rough meeting context. Proben checks your <b style={{ color: 'var(--ink-dim)' }}>goal, strategy, evidence, stakeholder risk, and decision ask</b> — then shows what to fix before the room does.</p>
            <div style={{ display: 'flex', gap: 13, marginTop: 30 }}><Btn kind="lime" icon={<Ic.arrow />} onClick={onStart}>Run readiness check</Btn><Btn kind="ghost" icon={<Ic.eye />} onClick={onSample}>See sample report</Btn></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 22, color: 'var(--muted)', fontSize: 14 }}><span style={{ fontSize: 16, display: 'flex', color: 'var(--ai)' }}><Ic.shield /></span>No account required · Use rough notes · Not a personality score</div>
          </div>
          <div className="fade-up" style={{ animationDelay: '.08s', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <HeroShowcase />
          </div>
        </div>
      </section>

      <div style={{ background: 'var(--bg-2)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '20px 36px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <span className="mono" style={{ color: 'var(--muted)' }}>IN 3 MINUTES YOU GET</span>
          {STRIP.map((s, i) => <span key={i} className="bp-card" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 999, color: 'var(--ink-dim)', fontSize: 14.5 }}><span style={{ color: 'var(--ai)', fontSize: 14, display: 'flex' }}>{s[1]}</span>{s[0]}</span>)}
        </div>
      </div>

      <ContextGapSection />

      <Sec id="how" eyebrow="HOW IT WORKS" title="Paste context. See what’s missing. Practice the hard part.">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
          {[['01', 'Paste context', 'Agenda, notes, slide summary, draft answer, or a plain-English summary.', <Ic.doc />], ['02', 'Find missing context', 'Proben shows the business logic, evidence, or stakeholder concern you left out.', <Ic.gap />], ['03', 'Readiness report', 'Score, top risks, top fixes, and the questions you’ll be asked.', <IcChart />], ['04', 'Practice one moment', 'Rehearse the single answer most likely to decide the meeting.', <Ic.mic />]].map((s, i) => (
            <div key={i} className="bp-card howcard" style={{ padding: 24, position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{ width: 38, height: 38, borderRadius: 11, display: 'grid', placeItems: 'center', background: 'var(--inset)', border: '1px solid var(--card-line)', color: 'var(--ink)', fontSize: 17 }}>{s[3]}</span>
                <span className="mono" style={{ color: 'var(--muted-2)', fontSize: 12 }}>{s[0]}</span>
              </div>
              <div className="serif" style={{ fontSize: 22, marginBottom: 8, color: 'var(--ink)' }}>{s[1]}</div>
              <div style={{ color: 'var(--muted)', fontSize: 14.5, lineHeight: 1.5 }}>{s[2]}</div>
            </div>
          ))}
        </div>
      </Sec>

      <Sec id="checks" tint eyebrow="WHAT PROBEN CHECKS" title="Five signals. Each maps to a concrete question." sub="Delivery / voice is scored only after you practice — readiness is about the argument, not the performance.">
        <div className="bp-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '210px 1fr 116px 64px', alignItems: 'center', gap: 16, padding: '12px 22px', borderBottom: '1px solid var(--card-line)', background: 'var(--inset)' }}>
            <span className="mono" style={{ color: 'var(--muted-2)', fontSize: 9.5 }}>SIGNAL</span>
            <span className="mono" style={{ color: 'var(--muted-2)', fontSize: 9.5 }}>WHAT IT ASKS</span>
            <span className="mono" style={{ color: 'var(--muted-2)', fontSize: 9.5 }}>STATUS</span>
            <span className="mono" style={{ color: 'var(--muted-2)', fontSize: 9.5, textAlign: 'right' }}>SCORE</span>
          </div>
          {CHECKS5.map((s, i) => {
            const tone = SIG5[i].tone, c = tcol(tone);
            const word = tone === 'good' ? 'Strong' : tone === 'amber' ? 'Medium' : 'Weak';
            return (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '210px 1fr 116px 64px', alignItems: 'center', gap: 16, padding: '17px 22px', borderBottom: i < CHECKS5.length - 1 ? '1px solid var(--card-line)' : 'none' }}>
                <span style={{ color: 'var(--ink)', fontSize: 16.5, fontWeight: 600 }}>{s[0]}</span>
                <span style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.35 }}>{s[1]}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '4px 11px', borderRadius: 99, justifySelf: 'start', background: `color-mix(in srgb, ${c} 12%, transparent)`, color: c, fontSize: 12.5, fontWeight: 600 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: c }} />{word}</span>
                <span style={{ textAlign: 'right', fontFamily: 'var(--mono)', fontWeight: 600, fontSize: 15, color: c }}>{SIG5[i].v.toFixed(1)}</span>
              </div>
            );
          })}
        </div>
      </Sec>

      <Sec id="sample" eyebrow="SAMPLE REPORT" title="The report shows what to fix." sub="One question first — are you ready or not? — then exactly what to change.">
        <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 16, alignItems: 'start' }}>
          <div className="bp-card" style={{ padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <ScoreRing value={6.2} size={132} />
            <Pill color="var(--amber)" dot={false}>VERDICT: PARTLY READY</Pill>
            <div style={{ width: '100%', display: 'grid', gap: 13, marginTop: 4 }}>{SIG5.map((s, i) => <ScoreBar key={i} label={s.label} value={s.v} />)}</div>
          </div>
          <div style={{ display: 'grid', gap: 14 }}>
            <div className="bp-card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}><span style={{ color: 'var(--lime-deep)', fontSize: 16, display: 'flex' }}><Ic.check /></span><span className="serif" style={{ fontSize: 21, color: 'var(--ink)' }}>Top 3 fixes</span></div>
              <div style={{ display: 'grid', gap: 12 }}>{TOP_FIXES.map((r, i) => <div key={i} style={{ display: 'flex', gap: 11 }}><span style={{ color: 'var(--lime-deep)', flex: 'none', fontSize: 14, marginTop: 2, display: 'flex' }}><Ic.check /></span><div><div style={{ color: 'var(--ink)', fontSize: 15.5, fontWeight: 600 }}>{r.t}</div><div style={{ color: 'var(--muted)', fontSize: 14, marginTop: 3, lineHeight: 1.4 }}>{r.d}</div></div></div>)}</div>
            </div>
            <div className="bp-card" style={{ padding: 24 }}>
              <span className="serif" style={{ fontSize: 21, color: 'var(--ink)' }}>Likely questions</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, marginTop: 14 }}>{FOLLOWUPS.map((q, i) => <span key={i} style={{ padding: '10px 15px', borderRadius: 8, border: '1px solid var(--line)', background: 'var(--inset)', color: 'var(--ink-dim)', fontSize: 14.5 }}>“{q}”</span>)}</div>
            </div>
          </div>
        </div>
      </Sec>

      <Sec id="uses" tint eyebrow="USE CASES" title="Built for important work conversations." sub="Use Proben before any conversation where the outcome matters.">
        <div className="uc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 30 }}>
          {[[<Ic.target />, 'Product Manager', 'Defend roadmap decisions and handle stakeholder pushback.'], [<Ic.layers />, 'Tech Lead / Engineer', 'Explain technical trade-offs without losing business stakeholders.'], [<Ic.eye />, 'Analyst / Data', 'Turn numbers into a clear recommendation.'], [<Ic.user />, 'Manager / Lead', 'Handle performance, conflict, and alignment conversations.'], [<Ic.spark />, 'Job Seeker', 'Prepare stronger interview answers and follow-up responses.'], [<Ic.shield />, 'Founder / Executive', 'Prepare board updates, investor talks, and strategic decisions.']].map((r, i) => (
            <div key={i} className="bp-card uc-card" style={{ padding: 26, display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'transform .15s ease, border-color .15s ease, background .15s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = 'var(--bp)'; e.currentTarget.style.background = 'var(--hover)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--bp-line)'; e.currentTarget.style.background = ''; }}>
              <span style={{ width: 40, height: 40, borderRadius: 10, display: 'grid', placeItems: 'center', background: 'var(--ai-dim)', color: 'var(--ai)', fontSize: 18, marginBottom: 16 }}>{r[0]}</span>
              <div style={{ color: 'var(--ink)', fontSize: 18, fontWeight: 600, marginBottom: 7 }}>{r[1]}</div>
              <div style={{ color: 'var(--muted)', fontSize: 14.5, lineHeight: 1.5 }}>{r[2]}</div>
            </div>
          ))}
        </div>
        <div className="mono" style={{ color: 'var(--muted-2)', fontSize: 9.5, marginBottom: 14 }}>MEETING TYPES</div>
        <div className="mt-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
          {['Strategy review', 'Board update', 'Client call', 'Data presentation', 'Design review', 'Promotion panel', 'Performance review', 'Conflict conversation', 'Job interview', 'Executive update'].map((u, i) => <span key={i} className="bp-card" style={{ padding: '12px 16px', borderRadius: 12, color: 'var(--ink-dim)', fontSize: 14.5, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 46 }}>{u}</span>)}
        </div>
      </Sec>

      <Sec id="pricing" eyebrow="PRICING" title="Start with one readiness check." sub="Free to try. Upgrade when you want unlimited reports, voice practice, and saved briefs.">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1.1fr', gap: 16, alignItems: 'stretch' }}>
          {[
            { name: 'Free', price: '€0', tag: 'For your next meeting', feats: ['One readiness check', 'Sample report', 'Limited practice'], cta: 'Start free', kind: 'ghost' },
            { name: 'Pro', price: '€12', sub: '/ mo', tag: 'For regular high-stakes meetings', feats: ['Unlimited readiness reports', 'Voice practice', 'Saved meeting briefs', 'Source uploads'], cta: 'Start free', kind: 'lime', featured: true },
            { name: 'Team', price: 'Custom', tag: 'For teams that present together', feats: ['Shared briefs', 'Team templates', 'Workspace integrations', 'Admin controls'], cta: 'Contact us', kind: 'ghost' },
          ].map((p, i) => (
            <div key={i} className="bp-card" style={{ padding: 26, display: 'flex', flexDirection: 'column', borderColor: p.featured ? 'color-mix(in srgb, var(--lime-deep) 50%, var(--bp-line))' : 'var(--bp-line)', background: p.featured ? 'var(--lime-glow)' : undefined }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <span className="mono" style={{ color: p.featured ? 'var(--lime-deep)' : 'var(--muted)' }}>{p.name}</span>
                {p.featured && <Pill color="var(--lime-deep)" dot={false} style={{ fontSize: 9 }}>POPULAR</Pill>}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}><span className="serif" style={{ fontSize: 38, color: 'var(--ink)', lineHeight: 1 }}>{p.price}</span>{p.sub && <span style={{ color: 'var(--muted)', fontSize: 15, fontFamily: 'var(--mono)' }}>{p.sub}</span>}</div>
              <div style={{ color: 'var(--muted)', fontSize: 13.5, marginBottom: 18 }}>{p.tag}</div>
              <div style={{ display: 'grid', gap: 10, marginBottom: 22 }}>
                {p.feats.map((f, k) => <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 9, color: 'var(--ink-dim)', fontSize: 14.5 }}><span style={{ color: 'var(--lime-deep)', fontSize: 13, display: 'flex', flex: 'none' }}><Ic.check /></span>{f}</div>)}
              </div>
              <Btn kind={p.kind} sm onClick={onStart} style={{ marginTop: 'auto', width: '100%', justifyContent: 'center' }}>{p.cta}</Btn>
            </div>
          ))}
          <div className="bp-card" style={{ padding: 26, display: 'flex', flexDirection: 'column', justifyContent: 'center', borderColor: 'color-mix(in srgb, var(--ai) 30%, var(--bp-line))' }}>
            <span style={{ width: 38, height: 38, borderRadius: 10, display: 'grid', placeItems: 'center', background: 'var(--ai-dim)', color: 'var(--ai)', fontSize: 18, marginBottom: 14 }}><Ic.shield /></span>
            <div className="serif" style={{ fontSize: 22, color: 'var(--ink)', marginBottom: 8, lineHeight: 1.15 }}>You control what you upload.</div>
            <div style={{ color: 'var(--muted)', fontSize: 14.5, lineHeight: 1.5 }}>Proben can work from a plain-English summary. You don’t need to share sensitive documents.</div>
          </div>
        </div>
      </Sec>

      {!embedded && (
      <Sec>
        <div className="bp-card" style={{ padding: '44px 40px', textAlign: 'center', borderColor: 'color-mix(in srgb, var(--bp) 35%, var(--bp-line))' }}>
          <h2 className="serif" style={{ fontSize: 38, margin: '0 0 10px', color: 'var(--ink)', lineHeight: 1.1 }}>Check your context before the room does.</h2>
          <p style={{ color: 'var(--muted)', fontSize: 17, margin: '0 auto 26px', maxWidth: 540, lineHeight: 1.5 }}>A fast pre-meeting check: are you ready, what’s missing, and what to practice — in 3 minutes.</p>
          <Btn kind="lime" icon={<Ic.arrow />} onClick={onStart} style={{ margin: '0 auto' }}>Run readiness check</Btn>
        </div>
      </Sec>
      )}
      {!embedded && <div style={{ height: 40 }} />}
    </div>
  );
}
Object.assign(window, { LandingMvp5, Mvp5Sec: Sec });
