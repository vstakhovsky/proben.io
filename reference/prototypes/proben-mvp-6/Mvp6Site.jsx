/* global React, Ic, Logo, Pill, Btn, LandingMvp5, Mvp5Sec, useState, useEffect */
/* Proben MVP 6 — mature marketing site: floating nav, mega-menus, blog, changelog, footer. */

const Sun = (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/></svg>;
const Moon = (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...p}><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></svg>;

const RESOURCES = [
  ['Blog', 'Practical guides on meeting readiness, stakeholder communication, and business context.', <Ic.doc />, 'blog'],
  ['Changelog', 'New features, product improvements, integrations, and experiments.', <Ic.spark />, 'changelog'],
  ['API Docs', 'Create readiness checks, reports, and practice sessions from your own product.', <Ic.layers />, 'api'],
  ['Docs / Help Center', 'Upload context, connect sources, and understand readiness scoring.', <Ic.eye />, 'faq'],
  ['Security & Privacy', 'How Proben handles uploaded context, documents, and integrations.', <Ic.shield />, 'policy'],
  ['Terms', 'Rules and responsibilities for using Proben.', <Ic.doc />, 'terms'],
];
const USECASES = [
  ['Product managers', 'Defend roadmap decisions and handle stakeholder pushback.', <Ic.target />],
  ['Tech leads / engineers', 'Explain technical trade-offs without losing business stakeholders.', <Ic.layers />],
  ['Analysts / data', 'Turn numbers into a clear recommendation.', <Ic.eye />],
  ['Managers / leads', 'Handle alignment, conflict, and performance conversations.', <Ic.user />],
  ['Job seekers', 'Prepare stronger interview answers and follow-up responses.', <Ic.spark />],
  ['Founders / executives', 'Pressure-test board updates, investor talks, and strategic decisions.', <Ic.shield />],
];

const BLOG_CATS = ['All', 'Meeting Readiness', 'Stakeholder Communication', 'Product Decisions', 'AI for Product Teams', 'Context Engineering', 'Interview Readiness'];
const BLOG = [
  { t: 'Why most meetings fail before people start talking', cat: 'Meeting Readiness', sum: 'The real failure point isn’t delivery — it’s missing business context nobody surfaced in prep.', read: '6 min', date: 'Jun 2, 2026', feat: true },
  { t: 'The 5 signals of meeting readiness', cat: 'Meeting Readiness', sum: 'Goal clarity, strategic context, evidence, stakeholder risk, and decision ask — and how to score each.', read: '5 min', date: 'May 28, 2026' },
  { t: 'How to prepare for stakeholder pushback in 10 minutes', cat: 'Stakeholder Communication', sum: 'A fast routine for predicting the hard question and rehearsing the one answer that matters.', read: '7 min', date: 'May 21, 2026' },
  { t: 'Why AI meeting prep fails without business context', cat: 'AI for Product Teams', sum: 'Generic AI advice sounds smart and lands flat. The fix is grounding prompts in company context.', read: '8 min', date: 'May 14, 2026' },
  { t: 'How to turn messy notes into a clear decision ask', cat: 'Product Decisions', sum: 'From a wall of notes to a scoped, approvable request with a success threshold.', read: '5 min', date: 'May 7, 2026' },
  { t: 'Readiness score vs confidence: why they are not the same', cat: 'Context Engineering', sum: 'A high score with low confidence means the inputs were thin. Here’s how to read both.', read: '4 min', date: 'Apr 30, 2026' },
  { t: 'Business English for high-stakes work conversations', cat: 'Interview Readiness', sum: 'Phrasing that stays calm, specific, and non-defensive under executive pressure.', read: '6 min', date: 'Apr 23, 2026' },
];

const CL_CATS = { 'New feature': 'var(--lime-deep)', 'Improvement': 'var(--ai)', 'Integration': 'var(--ai)', 'Experiment': 'var(--amber)', 'Coming soon': 'var(--muted)' };
const CHANGELOG = [
  { cat: 'New feature', t: 'Chat practice mode for stakeholder objections', sum: 'Role-play the hardest objection in writing — Proben replies as the stakeholder and scores each reply.', date: 'Jun 2, 2026', pill: 'New' },
  { cat: 'Improvement', t: 'Readiness report separates strategic context from evidence', sum: 'The five signals now distinguish “does this connect to strategy?” from “do you have proof?”.', date: 'May 27, 2026' },
  { cat: 'New feature', t: 'Upload PDFs, slides, screenshots, audio notes, and markdown briefs', sum: 'Bring real materials into the context check, not just typed text.', date: 'May 20, 2026', pill: 'New' },
  { cat: 'Experiment', t: 'Context gap finder before readiness scoring', sum: 'Proben now surfaces up to three missing pieces of context before it scores you.', date: 'May 12, 2026' },
  { cat: 'Improvement', t: 'Softer readiness verdicts and clearer top 3 fixes', sum: 'Every fix now ships with a copy-ready line, a likely objection, and a score impact.', date: 'May 5, 2026' },
  { cat: 'Coming soon', t: 'Google Drive and Notion context sources', sum: 'Pull briefs, decks, and strategy docs straight from the tools you already use.', date: 'Soon' },
];

function Toggle({ theme, onToggle }) {
  return <button onClick={onToggle} title="Toggle theme" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, cursor: 'pointer', border: '1px solid var(--bp-line)', background: 'transparent', borderRadius: 8, padding: '8px 11px', color: 'var(--header-ink)', fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 500 }}><span style={{ fontSize: 15, display: 'flex', color: theme === 'dark' ? 'var(--bp)' : 'var(--ai)' }}>{theme === 'dark' ? <Moon /> : <Sun />}</span></button>;
}

/* settings menu — theme + Show mascot toggle */
function SettingsMenu({ theme, onToggle, go }) {
  const { enabled, toggle: toggleMascot } = useMascot();
  const [open, setOpen] = useState(false);
  const t = React.useRef(null);
  return (
    <div style={{ position: 'relative' }} onMouseEnter={() => { clearTimeout(t.current); setOpen(true); }} onMouseLeave={() => { t.current = setTimeout(() => setOpen(false), 160); }}>
      <button onClick={() => setOpen((o) => !o)} title="Settings" aria-label="Settings" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, cursor: 'pointer', border: '1px solid var(--bp-line)', background: open ? 'var(--hover)' : 'transparent', borderRadius: 8, padding: '8px 10px', color: 'var(--header-ink)' }}>
        <span style={{ fontSize: 15, display: 'flex', color: theme === 'dark' ? 'var(--bp)' : 'var(--ai)' }}>{theme === 'dark' ? <Moon /> : <Sun />}</span>
        <span style={{ fontSize: 10, display: 'flex', opacity: 0.5, transform: open ? 'rotate(-90deg)' : 'rotate(90deg)', transition: 'transform .2s' }}><Ic.chevR /></span>
      </button>
      {open && (
        <div className="pop-in" style={{ position: 'absolute', top: '100%', right: 0, marginTop: 10, width: 232, background: 'var(--pop-bg)', border: '1px solid var(--bp-line)', borderRadius: 14, padding: 8, boxShadow: 'var(--shadow-pop)', zIndex: 60 }}>
          <div className="mono" style={{ color: 'var(--muted-2)', fontSize: 9, padding: '6px 10px 8px' }}>SETTINGS</div>
          <SettingRow label="Theme" value={theme === 'dark' ? 'Dark' : 'Light'} onClick={onToggle} icon={theme === 'dark' ? <Moon /> : <Sun />} />
          <SettingRow label="Show mascot" value={enabled ? 'On' : 'Off'} on={enabled} onClick={toggleMascot} switchEl />
          <button onClick={() => { setOpen(false); go('mascot-preview'); }} style={{ width: '100%', textAlign: 'left', padding: '9px 10px', borderRadius: 9, border: 'none', background: 'none', cursor: 'pointer', color: 'var(--muted)', fontFamily: 'var(--sans)', fontSize: 13 }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--hover)'} onMouseLeave={(e) => e.currentTarget.style.background = 'none'}>Mascot preview →</button>
        </div>
      )}
    </div>
  );
}
function SettingRow({ label, value, onClick, icon, on, switchEl }) {
  return (
    <button onClick={onClick} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 9, border: 'none', background: 'none', cursor: 'pointer', color: 'var(--ink)', fontFamily: 'var(--sans)', fontSize: 14 }}
      onMouseEnter={(e) => e.currentTarget.style.background = 'var(--hover)'} onMouseLeave={(e) => e.currentTarget.style.background = 'none'}>
      {icon && <span style={{ fontSize: 14, display: 'flex', color: 'var(--ai)' }}>{icon}</span>}
      <span style={{ flex: 1, textAlign: 'left' }}>{label}</span>
      {switchEl
        ? <span style={{ width: 34, height: 19, borderRadius: 99, background: on ? 'var(--lime-deep)' : 'var(--track)', position: 'relative', transition: 'background .2s', flex: 'none' }}><span style={{ position: 'absolute', top: 2, left: on ? 17 : 2, width: 15, height: 15, borderRadius: '50%', background: '#fff', transition: 'left .2s' }} /></span>
        : <span style={{ color: 'var(--muted)', fontSize: 12.5, fontFamily: 'var(--mono)' }}>{value}</span>}
    </button>
  );
}

/* /mascot-preview — design QA route. Safe to remove before production. */
function MascotPreview({ theme, onToggleTheme }) {
  const STATES = ['idle', 'scanning', 'gap', 'practicing', 'ready', 'celebrate'];
  const SIZES = [24, 40, 64];
  return (
    <div style={{ minHeight: '100vh', background: 'transparent' }}>
      <div className="bp-grid" style={{ borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 36px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, flexWrap: 'wrap' }}>
          <div>
            <div className="mono" style={{ color: 'var(--ai)', marginBottom: 13 }}>DESIGN QA · REMOVE BEFORE PRODUCTION</div>
            <h1 className="serif" style={{ fontSize: 46, margin: 0, color: 'var(--ink)', lineHeight: 1.08 }}>Stacky — mascot states</h1>
          </div>
          <button onClick={onToggleTheme} className="bp-card" style={{ padding: '10px 16px', borderRadius: 10, cursor: 'pointer', color: 'var(--ink)', fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 600 }}>Toggle theme ({theme})</button>
        </div>
      </div>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '34px 36px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {STATES.map((s) => (
            <div key={s} className="bp-card" style={{ padding: 24 }}>
              <div className="mono" style={{ color: 'var(--muted)', marginBottom: 16 }}>{s.toUpperCase()}</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 22 }}>
                {SIZES.map((sz) => (
                  <div key={sz} style={{ textAlign: 'center' }}>
                    <Mascot state={s} size={sz} animated />
                    <div style={{ color: 'var(--muted-2)', fontSize: 11, marginTop: 8, fontFamily: 'var(--mono)' }}>{sz}px</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 24, lineHeight: 1.5 }}>Toggle the theme above to verify both palettes. Use the Settings menu (top-right) → “Show mascot” to disable globally; the choice persists across reloads. Animations respect <code style={{ fontFamily: 'var(--mono)', color: 'var(--ai)' }}>prefers-reduced-motion</code>.</p>
      </div>
    </div>
  );
}
function MegaCard({ cols, items, highlight }) {
  return (
    <div className="pop-in" style={{ width: cols === 3 ? 760 : 560, background: 'var(--pop-bg)', border: '1px solid var(--bp-line)', borderRadius: 16, padding: 14, boxShadow: 'var(--shadow-pop)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + cols + ',1fr)', gap: 6 }}>
        {items.map((it, i) => (
          <button key={i} onClick={it[3]} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', textAlign: 'left', padding: '13px 14px', borderRadius: 11, border: '1px solid transparent', background: 'none', cursor: 'pointer', transition: 'background .14s' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--hover)'} onMouseLeave={(e) => e.currentTarget.style.background = 'none'}>
            <span style={{ width: 32, height: 32, borderRadius: 9, flex: 'none', display: 'grid', placeItems: 'center', background: 'var(--ai-dim)', color: 'var(--ai)', fontSize: 16 }}>{it[2]}</span>
            <span>
              <span style={{ display: 'block', color: 'var(--ink)', fontSize: 15, fontWeight: 600, marginBottom: 3 }}>{it[0]}</span>
              <span style={{ display: 'block', color: 'var(--muted)', fontSize: 12.5, lineHeight: 1.4 }}>{it[1]}</span>
            </span>
          </button>
        ))}
      </div>
      {highlight && (
        <button onClick={highlight[2]} style={{ marginTop: 8, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '14px 16px', borderRadius: 12, border: '1px solid color-mix(in srgb, var(--lime-deep) 40%, transparent)', background: 'var(--lime-glow)', cursor: 'pointer', textAlign: 'left' }}>
          <span><span style={{ display: 'block', color: 'var(--ink)', fontSize: 15, fontWeight: 600 }}>{highlight[0]}</span><span style={{ color: 'var(--muted)', fontSize: 12.5 }}>{highlight[1]}</span></span>
          <span style={{ color: 'var(--lime-deep)', fontSize: 16, display: 'flex', flex: 'none' }}><Ic.arrow /></span>
        </button>
      )}
    </div>
  );
}

function Nav6({ go, scrollTo, onStart, theme, onToggle }) {
  const [menu, setMenu] = useState(null); // 'resources' | 'uses'
  const t = useRef(null);
  const open = (k) => { clearTimeout(t.current); setMenu(k); };
  const close = () => { clearTimeout(t.current); t.current = setTimeout(() => setMenu(null), 160); };
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenu(null); };
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey);
  }, []);
  const navBtn = (on) => ({ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', color: 'var(--header-ink)', fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 500, opacity: on ? 1 : 0.8, cursor: 'pointer', padding: '8px 13px', borderRadius: 999 });
  const Caret = ({ on }) => <span style={{ fontSize: 11, display: 'flex', opacity: 0.55, transform: on ? 'rotate(-90deg)' : 'rotate(90deg)', transition: 'transform .2s' }}><Ic.chevR /></span>;
  const link = (label, id) => <button onClick={() => scrollTo(id)} style={navBtn(false)} onMouseEnter={(e) => e.currentTarget.style.opacity = 1} onMouseLeave={(e) => e.currentTarget.style.opacity = 0.8}>{label}</button>;
  const drop = (label, key, card) => (
    <div style={{ position: 'relative' }} onMouseEnter={() => open(key)} onMouseLeave={close}>
      <button onClick={() => setMenu(menu === key ? null : key)} style={navBtn(menu === key)}>{label}<Caret on={menu === key} /></button>
      {menu === key && (
        <div onMouseEnter={() => open(key)} onMouseLeave={close} style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', paddingTop: 12, zIndex: 60 }}>{card}</div>
      )}
    </div>
  );
  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 50, padding: '16px 20px 0', pointerEvents: 'none' }}>
      <header style={{ pointerEvents: 'auto', maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 10px 9px 18px', borderRadius: 18, border: '1px solid var(--header-line)', background: 'var(--header-blur)', backdropFilter: 'blur(16px)', boxShadow: 'var(--shadow-card)' }}>
        <button onClick={() => go('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}><Logo /></button>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {link('Sample report', 'sample')}{link('How it works', 'how')}{link('Checks', 'checks')}
          {drop('Resources', 'resources', <MegaCard cols={2} items={RESOURCES.map((r) => [r[0], r[1], r[2], () => { setMenu(null); r[3] === 'blog' || r[3] === 'changelog' || r[3] === 'api' || r[3] === 'policy' || r[3] === 'terms' || r[3] === 'faq' ? go(r[3]) : scrollTo('sample'); }])} highlight={['See sample report', 'Turn meeting context into risks, fixes, and practice.', () => { setMenu(null); scrollTo('sample'); }]} />)}
          {link('Pricing', 'pricing')}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <SettingsMenu theme={theme} onToggle={onToggle} go={go} />
          <button onClick={() => go('home')} style={{ background: 'none', border: 'none', color: 'var(--header-ink)', fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 500, opacity: 0.8, cursor: 'pointer', padding: '8px 6px' }}>Log in</button>
          <Btn kind="lime" sm icon={<Ic.arrow />} onClick={onStart} style={{ padding: '11px 16px', fontSize: 14 }}>Run readiness check</Btn>
        </div>
      </header>
    </div>
  );
}

/* shared section wrapper for MVP6-added sections */
function S6({ eyebrow, title, sub, children, tint, id, head }) {
  return (
    <section id={id} style={{ background: tint ? 'var(--bg-2)' : 'transparent', borderTop: tint ? '1px solid var(--line)' : 'none', borderBottom: tint ? '1px solid var(--line)' : 'none', scrollMarginTop: 96 }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '62px 36px' }}>
        {(eyebrow || title) && (
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, marginBottom: 32, flexWrap: 'wrap' }}>
            <div style={{ maxWidth: 720 }}>
              {eyebrow && <div className="mono" style={{ color: 'var(--ai)', marginBottom: 13, display: 'flex', alignItems: 'center', gap: 9 }}><span style={{ width: 18, height: 1, background: 'var(--bp-line)' }} />{eyebrow}</div>}
              {title && <h2 className="serif" style={{ fontSize: 42, margin: 0, color: 'var(--ink)', lineHeight: 1.16 }}>{title}</h2>}
              {sub && <p style={{ color: 'var(--muted)', fontSize: 18, lineHeight: 1.5, marginTop: 16 }}>{sub}</p>}
            </div>
            {head}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

function BlogCard({ p, onClick, big }) {
  return (
    <button onClick={onClick} className="bp-card" style={{ textAlign: 'left', cursor: 'pointer', padding: big ? 28 : 22, display: 'flex', flexDirection: 'column', gridColumn: big ? 'span 2' : 'auto', transition: 'border-color .15s, transform .15s' }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--bp)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--bp-line)'; e.currentTarget.style.transform = 'none'; }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 13 }}>
        <span className="mono" style={{ color: 'var(--ai)', fontSize: 9.5, padding: '4px 9px', borderRadius: 999, border: '1px solid color-mix(in srgb, var(--ai) 30%, transparent)', background: 'var(--ai-dim)' }}>{p.cat}</span>
        {p.feat && <Pill color="var(--lime-deep)" dot={false} style={{ fontSize: 9 }}>FEATURED</Pill>}
      </div>
      <div className="serif" style={{ fontSize: big ? 27 : 20, color: 'var(--ink)', lineHeight: 1.18, marginBottom: 9 }}>{p.t}</div>
      <div style={{ color: 'var(--muted)', fontSize: 14.5, lineHeight: 1.5, marginBottom: 16 }}>{p.sum}</div>
      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 10, color: 'var(--muted-2)', fontSize: 12.5 }}>
        <span>{p.date}</span><span style={{ width: 3, height: 3, borderRadius: 2, background: 'var(--muted-2)' }} /><span>{p.read} read</span>
      </div>
    </button>
  );
}

function ChangeRow({ c }) {
  const col = CL_CATS[c.cat] || 'var(--muted)';
  return (
    <div className="bp-card" style={{ padding: 22, display: 'flex', gap: 18, alignItems: 'flex-start' }}>
      <div style={{ flex: 'none', width: 110 }}>
        <div className="mono" style={{ color: 'var(--muted-2)', fontSize: 10, marginBottom: 8 }}>{c.date}</div>
        <span className="mono" style={{ color: col, fontSize: 9, padding: '4px 9px', borderRadius: 999, border: '1px solid color-mix(in srgb,' + col + ' 35%, transparent)', whiteSpace: 'nowrap' }}>{c.cat.toUpperCase()}</span>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
          <span style={{ color: 'var(--ink)', fontSize: 17, fontWeight: 600 }}>{c.t}</span>
          {c.pill && <Pill color="var(--lime-deep)" dot={false} style={{ fontSize: 8.5 }}>{c.pill}</Pill>}
        </div>
        <div style={{ color: 'var(--muted)', fontSize: 14.5, lineHeight: 1.5 }}>{c.sum}</div>
      </div>
    </div>
  );
}

/* home-only extra section — FAQ. Blog & changelog live on their own pages via Resources. */
function HomeExtras({ go }) {
  return <FaqSection id="faq" />;
}

function Footer6({ go, scrollTo, onStart }) {
  const col = (title, links) => (
    <div>
      <div className="mono" style={{ color: 'var(--muted-2)', fontSize: 9.5, marginBottom: 14 }}>{title}</div>
      <div style={{ display: 'grid', gap: 10 }}>
        {links.map((l, i) => <button key={i} onClick={l[1]} style={{ background: 'none', border: 'none', textAlign: 'left', padding: 0, color: 'var(--muted)', fontFamily: 'var(--sans)', fontSize: 14.5, cursor: 'pointer' }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--ink)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}>{l[0]}</button>)}
      </div>
    </div>
  );
  return (
    <footer style={{ borderTop: '1px solid var(--line)', background: 'var(--bg-2)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '54px 36px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: 28, marginBottom: 44 }}>
          <div>
            <Logo />
            <p style={{ color: 'var(--muted)', fontSize: 14.5, lineHeight: 1.55, marginTop: 16, maxWidth: 260 }}>Context readiness before important meetings. Know what to fix before the meeting starts.</p>
          </div>
          {col('PRODUCT', [['Run readiness check', () => onStart()], ['Sample report', () => scrollTo('sample')], ['How it works', () => scrollTo('how')], ['Checks', () => scrollTo('checks')], ['Pricing', () => scrollTo('pricing')]])}
          {col('RESOURCES', [['Blog', () => go('blog')], ['Changelog', () => go('changelog')], ['API Docs', () => go('api')], ['Docs / Help Center', () => go('faq')], ['FAQ', () => scrollTo('faq')]])}
          {col('LEGAL', [['Privacy & Security', () => go('policy')], ['Terms of Use', () => go('terms')], ['Contact', () => go('home')]])}
        </div>
        <div className="bp-card" style={{ padding: '26px 30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', marginBottom: 30, borderColor: 'color-mix(in srgb, var(--bp) 35%, var(--bp-line))' }}>
          <div className="serif" style={{ fontSize: 26, color: 'var(--ink)', lineHeight: 1.15 }}>Check your context before the room does.</div>
          <Btn kind="lime" icon={<Ic.arrow />} onClick={onStart}>Run readiness check</Btn>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', color: 'var(--muted-2)', fontSize: 13 }}>
          <span>© 2026 Proben · proben.io</span>
          <span style={{ display: 'flex', gap: 18 }}><span>Not a personality score</span><span>Paste only what you’re comfortable sharing</span></span>
        </div>
      </div>
    </footer>
  );
}

/* ===== full pages ===== */
function PageHeader({ eyebrow, title, sub }) {
  return (
    <div className="bp-grid" style={{ borderBottom: '1px solid var(--line)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '70px 36px 54px' }}>
        <div className="mono" style={{ color: 'var(--ai)', marginBottom: 14 }}>{eyebrow}</div>
        <h1 className="serif" style={{ fontSize: 54, margin: 0, color: 'var(--ink)', lineHeight: 1.08, maxWidth: 800 }}>{title}</h1>
        <p style={{ color: 'var(--muted)', fontSize: 19, lineHeight: 1.5, marginTop: 18, maxWidth: 640 }}>{sub}</p>
      </div>
    </div>
  );
}

function BlogPage({ go }) {
  const [cat, setCat] = useState('All');
  const list = cat === 'All' ? BLOG : BLOG.filter((p) => p.cat === cat);
  return (
    <div style={{ minHeight: '100vh', background: 'transparent' }}>
      <PageHeader eyebrow="BLOG" title="Readiness guides for high-stakes conversations." sub="Practical writing on meeting preparation, stakeholder pushback, decision asks, and context-aware AI." />
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '36px 36px 70px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
          {BLOG_CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)} style={{ padding: '9px 15px', borderRadius: 999, cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: 13.5, fontWeight: 500, border: '1px solid ' + (cat === c ? 'var(--lime-deep)' : 'var(--bp-line)'), background: cat === c ? 'var(--lime-glow)' : 'transparent', color: cat === c ? 'var(--lime-deep)' : 'var(--muted)' }}>{c}</button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {list.map((p, i) => <BlogCard key={i} p={p} big={cat === 'All' && i === 0} onClick={() => go('post')} />)}
        </div>
      </div>
    </div>
  );
}

function BlogPost({ go }) {
  const p = BLOG[0];
  const paras = [
    'Most teams treat meeting prep as a delivery problem: rehearse the talk track, tighten the slides, calm the nerves. But the meetings that go sideways rarely fail on delivery. They fail because a piece of business context never made it into the room.',
    'The speaker knew the roadmap, but not the number that would make the ask land. They knew their recommendation, but not the objection the VP would raise first. The argument was reasonable — it just wasn’t connected to what the room actually cared about.',
    'That gap is invisible during prep because the context lives somewhere else: in an OKR doc, a metrics dashboard, a Slack thread, a stakeholder’s last decision. Preparation that doesn’t pull those threads together produces confidence without readiness.',
  ];
  const pts = ['Name the business outcome the decision protects.', 'Predict the single hardest objection — and answer it in one line.', 'Define the threshold that makes your ask easy to approve.'];
  return (
    <div style={{ minHeight: '100vh', background: 'transparent' }}>
      <div className="bp-grid" style={{ borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '60px 36px 44px' }}>
          <button onClick={() => go('blog')} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'var(--sans)', fontSize: 14, marginBottom: 22 }}><span style={{ fontSize: 15, display: 'flex' }}><Ic.chevL /></span>All posts</button>
          <span className="mono" style={{ color: 'var(--ai)', fontSize: 9.5, padding: '4px 9px', borderRadius: 999, border: '1px solid color-mix(in srgb, var(--ai) 30%, transparent)', background: 'var(--ai-dim)' }}>{p.cat}</span>
          <h1 className="serif" style={{ fontSize: 46, margin: '18px 0 14px', color: 'var(--ink)', lineHeight: 1.1 }}>{p.t}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--muted-2)', fontSize: 13.5 }}><span>{p.date}</span><span style={{ width: 3, height: 3, borderRadius: 2, background: 'var(--muted-2)' }} /><span>{p.read} read</span></div>
        </div>
      </div>
      <article style={{ maxWidth: 720, margin: '0 auto', padding: '44px 36px 70px' }}>
        {paras.map((t, i) => <p key={i} style={{ color: 'var(--ink-dim)', fontSize: 18, lineHeight: 1.7, margin: '0 0 22px' }}>{t}</p>)}
        <h2 className="serif" style={{ fontSize: 28, color: 'var(--ink)', margin: '36px 0 16px' }}>What readiness actually checks</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 28 }}>
          {pts.map((t, i) => <div key={i} className="bp-card" style={{ padding: '14px 18px', display: 'flex', gap: 11, alignItems: 'center' }}><span style={{ color: 'var(--lime-deep)', fontSize: 15, display: 'flex' }}><Ic.check /></span><span style={{ color: 'var(--ink)', fontSize: 16 }}>{t}</span></div>)}
        </div>
        <div className="bp-card" style={{ padding: 28, textAlign: 'center', borderColor: 'color-mix(in srgb, var(--bp) 35%, var(--bp-line))' }}>
          <div className="serif" style={{ fontSize: 24, color: 'var(--ink)', marginBottom: 14 }}>See your own readiness in 3 minutes.</div>
          <Btn kind="lime" icon={<Ic.arrow />} onClick={() => go('home')} style={{ margin: '0 auto' }}>Check my readiness</Btn>
        </div>
      </article>
    </div>
  );
}

function ChangelogPage() {
  const [cat, setCat] = useState('All');
  const cats = ['All', ...Object.keys(CL_CATS)];
  const list = cat === 'All' ? CHANGELOG : CHANGELOG.filter((c) => c.cat === cat);
  return (
    <div style={{ minHeight: '100vh', background: 'transparent' }}>
      <PageHeader eyebrow="CHANGELOG" title="What’s new in Proben." sub="Product updates, new practice modes, source uploads, integrations, and readiness improvements." />
      <div style={{ maxWidth: 920, margin: '0 auto', padding: '36px 36px 70px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} style={{ padding: '9px 15px', borderRadius: 999, cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: 13.5, fontWeight: 500, border: '1px solid ' + (cat === c ? 'var(--lime-deep)' : 'var(--bp-line)'), background: cat === c ? 'var(--lime-glow)' : 'transparent', color: cat === c ? 'var(--lime-deep)' : 'var(--muted)' }}>{c}</button>
          ))}
        </div>
        <div style={{ display: 'grid', gap: 12 }}>
          {list.map((c, i) => <ChangeRow key={i} c={c} />)}
        </div>
      </div>
    </div>
  );
}

function AppMvp6() {
  const [route, setRoute] = useState('home');
  const [theme, setTheme] = useState(() => localStorage.getItem('proben-mvp6-theme') || 'light');
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); localStorage.setItem('proben-mvp6-theme', theme); }, [theme]);
  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  const [flow, setFlow] = useState('input');
  const go = (r) => { window.scrollTo(0, 0); setRoute(r); };
  const startApp = () => { window.scrollTo(0, 0); setFlow('input'); setRoute('app'); };
  const fgo = (s) => { window.scrollTo(0, 0); setFlow(s); };
  const scrollTo = (id) => {
    if (route !== 'home') { setRoute('home'); setTimeout(() => doScroll(id), 80); return; }
    doScroll(id);
  };
  const doScroll = (id) => {
    if (id === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    try { window.scrollTo({ top, behavior: 'smooth' }); } catch (e) { window.scrollTo(0, top); }
    setTimeout(() => { if (Math.abs(window.scrollY - top) > 8) window.scrollTo(0, top); }, 60);
  };

  // product readiness flow (full-screen, no marketing chrome)
  if (route === 'app') {
    let v;
    if (flow === 'gaps') v = <ContextGaps onBack={() => fgo('input')} onContinue={() => fgo('analyzing')} />;
    else if (flow === 'analyzing') v = <Analyzing5 onDone={() => fgo('report')} />;
    else if (flow === 'report') v = <Report5 onBack={() => fgo('input')} onChat={() => fgo('chat')} onVoice={() => fgo('practice')} onUpload={() => fgo('upload')} />;
    else if (flow === 'chat') v = <ChatSim onBack={() => fgo('report')} onVoice={() => fgo('practice')} onUpload={() => fgo('upload')} onResults={() => fgo('updated')} />;
    else if (flow === 'practice') v = <VoicePractice share onBack={() => fgo('report')} onResults={() => fgo('updated')} />;
    else if (flow === 'upload') v = <UploadAnalysis onBack={() => fgo('report')} onChat={() => fgo('chat')} onVoice={() => fgo('practice')} onResults={() => fgo('updated')} />;
    else if (flow === 'updated') v = <Updated5 onBack={() => fgo('report')} onPractice={() => fgo('practice')} onChat={() => fgo('chat')} onDialogue={() => fgo('dialogue')} />;
    else if (flow === 'dialogue') v = <DialogueMap mode="post" onBack={() => fgo('updated')} onPractice={() => fgo('practice')} onContinue={() => fgo('practice')} onReport={() => fgo('report')} />;
    else v = <Input5 onBack={() => go('home')} onAnalyze={() => fgo('gaps')} />;
    return <div style={{ minHeight: '100vh', background: 'transparent' }}>{v}</div>;
  }

  let page;
  if (route === 'blog') page = <BlogPage go={go} />;
  else if (route === 'post') page = <BlogPost go={go} />;
  else if (route === 'changelog') page = <ChangelogPage />;
  else if (route === 'api') page = <ApiPage />;
  else if (route === 'policy') page = <PolicyPage />;
  else if (route === 'terms') page = <TermsPage />;
  else if (route === 'mascot-preview') page = <MascotPreview theme={theme} onToggleTheme={toggle} />;
  else if (route === 'faq') page = (
    <div style={{ minHeight: '100vh', background: 'transparent' }}>
      <PageHeader eyebrow="FAQ / HELP CENTER" title="Common questions." sub="Readiness checks, privacy, practice modes, and uploaded context." />
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '36px 36px 70px' }}><FaqList items={FAQS} /></div>
    </div>
  );
  else page = (
    <div id="top">
      <LandingMvp5 embedded theme={theme} onToggle={toggle} onStart={startApp} onSample={() => scrollTo('sample')} />
      <HomeExtras go={go} />
    </div>
  );

  const PAGE_TITLE = { home: 'Landing page', blog: 'Blog', post: 'Blog article', changelog: 'Changelog', api: 'API docs', policy: 'Privacy & Security', terms: 'Terms of Use', faq: 'Help Center' };
  return (
    <div style={{ minHeight: '100vh', background: 'transparent' }}>
      <Nav6 go={go} scrollTo={scrollTo} onStart={startApp} theme={theme} onToggle={toggle} />
      {page}
      <Footer6 go={go} scrollTo={scrollTo} onStart={startApp} />
      <PageAssistant pageId={route === 'post' ? 'post' : route} pageTitle={PAGE_TITLE[route] || 'Proben'} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<MascotProvider><AppMvp6 /></MascotProvider>);
