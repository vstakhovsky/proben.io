/* global React, Ic, Btn, Card, Pill, ReportHeader, SCENARIO, useState */

const AI_ACTIONS = ['Rewrite more clearly', 'Make it more diplomatic', 'Make it more direct', 'Make it executive-ready', 'Add business impact', 'Add evidence', 'Turn into a slide', 'Practice this reply'];

const AI_RESULTS = {
  'Rewrite more clearly': 'Here’s the issue in one line: the enterprise segment is blocked today. I’m asking to validate one narrow fix in two weeks — not to reopen the roadmap.',
  'Make it more diplomatic': 'I’m fully behind the pivot. I just want to de-risk it: a two-week validation on the blocked enterprise segment before we commit the full roadmap.',
  'Make it more direct': 'We’re leaving €1.2M/yr on the table while enterprise is blocked. Give me two weeks to validate the fix. That’s the whole ask.',
  'Make it executive-ready': 'Recommendation: approve a scoped two-week validation on enterprise. Success = +12% activation. If it misses, we drop it and proceed with the pivot as planned.',
  'Add business impact': 'The enterprise segment is blocked — that’s ~€1.2M/yr at risk. A two-week validation costs ~8 eng-days and tells us whether the fix is worth roadmap space.',
  'Add evidence': 'Three enterprise deals stalled on this exact gap last quarter (€1.2M ARR). A two-week validation confirms whether a fix moves activation by the 12% we’d need.',
  'Turn into a slide': 'Slide drafted → “Enterprise validation: €1.2M upside · 2-week effort · success = +12% activation · low eng risk.” Added to your deck.',
  'Practice this reply': 'Loading this reply into voice practice…',
};

/* AI action menu */
function AIMenu({ onPick }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setOpen(!open)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 14px', borderRadius: 10, cursor: 'pointer', border: '1px solid var(--ai)', background: 'var(--ai-dim)', color: 'var(--ai)', fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 600 }}>
        <span style={{ fontSize: 15, display: 'flex' }}><Ic.spark /></span> Improve with AI
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 20 }} />
          <div className="pop-in" style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, zIndex: 21, width: 230, background: 'var(--pop-bg)', border: '1px solid var(--line-strong)', borderRadius: 13, padding: 7, boxShadow: 'var(--shadow-pop)' }}>
            {AI_ACTIONS.map((a) => (
              <button key={a} onClick={() => { onPick(a); setOpen(false); }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 12px', borderRadius: 8, border: 'none', background: 'none', cursor: 'pointer', color: 'var(--ink-dim)', fontFamily: 'var(--sans)', fontSize: 14.5 }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--hover)'} onMouseLeave={(e) => e.currentTarget.style.background = 'none'}>{a}</button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* one path column */
function PathCard({ tone, label, badge, quote, points, pointsLabel, outcome, outcomeLabel, impact, hasAI, onPractice }) {
  const col = tone === 'risk' ? 'var(--risk)' : tone === 'good' ? 'var(--good)' : 'var(--ai)';
  const [aiText, setAiText] = useState(null);
  const handle = (a) => {
    if (a === 'Practice this reply') { onPractice && onPractice(); return; }
    setAiText(AI_RESULTS[a]);
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', borderRadius: 18, border: '1px solid color-mix(in srgb,' + col + ' 35%, var(--line))', background: 'linear-gradient(180deg, color-mix(in srgb,' + col + ' 9%, var(--path-bg)), var(--path-bg-2))', overflow: 'hidden' }}>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid color-mix(in srgb,' + col + ' 22%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'color-mix(in srgb,' + col + ' 12%, transparent)' }}>
        <span className="mono" style={{ color: col, fontSize: 11.5 }}>{label}</span>
        {badge && <Pill color={col} dot={false} style={{ fontSize: 9.5, padding: '4px 9px' }}>{badge}</Pill>}
      </div>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
        <div className="serif" style={{ fontSize: 19, color: 'var(--ink)', lineHeight: 1.4, fontStyle: 'italic' }}>“{quote}”</div>
        <div>
          <div className="mono" style={{ color: 'var(--muted)', fontSize: 10, marginBottom: 8 }}>{pointsLabel}</div>
          <div style={{ display: 'grid', gap: 6 }}>
            {points.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: 9, color: 'var(--ink-dim)', fontSize: 14.5, lineHeight: 1.4 }}>
                <span style={{ color: col, flex: 'none', marginTop: 1, fontSize: 12 }}>{tone === 'risk' ? '✕' : '•'}</span>{p}
              </div>
            ))}
          </div>
        </div>
        {aiText && (
          <div className="pop-in" style={{ padding: 14, borderRadius: 11, background: 'var(--ai-dim)', border: '1px solid color-mix(in srgb, var(--ai) 30%, transparent)' }}>
            <div className="mono" style={{ color: 'var(--ai)', fontSize: 9.5, marginBottom: 7, display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ fontSize: 12, display: 'flex' }}><Ic.spark /></span>AI SUGGESTION</div>
            <div style={{ color: 'var(--ink)', fontSize: 14.5, lineHeight: 1.45 }}>{aiText}</div>
          </div>
        )}
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ paddingTop: 14, borderTop: '1px solid var(--line)', display: 'grid', gap: 9 }}>
            {impact && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--muted)', fontSize: 13.5 }}>Readiness impact</span>
                <span style={{ color: col, fontSize: 16, fontWeight: 700, fontFamily: 'var(--mono)' }}>{impact}</span>
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--muted)', fontSize: 13.5 }}>{outcomeLabel}</span>
              <span style={{ color: 'var(--ink-dim)', fontSize: 14, fontWeight: 600, textAlign: 'right' }}>{outcome}</span>
            </div>
          </div>
          {hasAI ? <AIMenu onPick={handle} /> : <button onClick={() => handle('Add evidence')} style={{ padding: '9px 14px', borderRadius: 10, cursor: 'pointer', border: '1px solid var(--line-strong)', background: 'transparent', color: 'var(--muted)', fontFamily: 'var(--sans)', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}><span style={{ fontSize: 14, display: 'flex' }}><Ic.spark /></span>Generate stronger branch</button>}
        </div>
      </div>
    </div>
  );
}

const PATHS = {
  risk: { tone: 'risk', label: 'RISK PATH', badge: 'AVOID', quote: 'We already discussed this before.', pointsLabel: 'WHY IT HURTS', points: ['Sounds defensive', 'Doesn’t answer the real objection', 'No business impact'], outcomeLabel: 'Likely outcome', outcome: 'Decision delayed', impact: '−0.8' },
  good: { tone: 'good', label: 'RECOMMENDED PATH', badge: 'USE THIS', quote: 'Let me separate timing from impact. I’m not asking for a roadmap reset — just to validate one narrow change, because the enterprise segment is already blocked.', pointsLabel: 'WHY IT WORKS', points: ['Clearer framing', 'Less defensive', 'Narrow, scoped ask'], outcomeLabel: 'Likely outcome', outcome: 'VP asks for validation scope', impact: '+0.6' },
  ai: { tone: 'ai', label: 'AI-IMPROVED PATH', badge: 'AI', quote: 'I’m not raising this to add scope — it’s to avoid carrying hidden cost. Enterprise is already blocked, so I’d propose a two-week validation, not a roadmap reset.', pointsLabel: 'WHAT AI ADDED', points: ['Names the hidden cost', 'Pre-empts the “why now”', 'Quantified, scoped'], outcomeLabel: 'Likely outcome', outcome: 'VP aligns', impact: '+1.2', hasAI: true },
};

const SIGNAL_DELTAS = [
  { k: 'Risk handling', from: 5.2, to: 6.4, d: '+1.2' },
  { k: 'Tone',          from: 6.1, to: 7.0, d: '+0.9' },
  { k: 'Structure',     from: 6.8, to: 7.2, d: '+0.4' },
  { k: 'Evidence',      from: 6.0, to: 6.0, d: 'no change' },
];

const CHANGED = {
  worked: ['You acknowledged the constraint first', 'You separated timing from impact', 'You made the ask narrower', 'You sounded less defensive'],
  missing: ['Add one business-impact number', 'Name who owns the validation', 'Close with a clear yes/no ask'],
};

/* ---- Predicted (Variant B) + Post-practice dialogue map ---- */
function DialogueMap({ mode, onBack, onPractice, onContinue, onReport }) {
  const post = mode === 'post';
  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(120% 60% at 50% -5%, var(--rad-1), var(--rad-0) 55%)' }} className="grid-tex">
      <ReportHeader onBack={onBack} />
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '44px 40px 80px' }} className="fade-up">
        <div className="mono" style={{ color: post ? 'var(--ai)' : 'var(--lime)', marginBottom: 12 }}>{post ? 'POST-PRACTICE · CONVERSATION PATH' : 'PREDICTED CONVERSATION MAP'}</div>
        <h1 className="serif" style={{ fontSize: 44, margin: '0 0 8px', color: 'var(--ink)', letterSpacing: '-0.02em' }}>{post ? 'Where the conversation split' : 'The one moment that decides this meeting'}</h1>
        <p style={{ color: 'var(--muted)', fontSize: 17.5, maxWidth: 760, lineHeight: 1.5, margin: '0 0 28px' }}>
          {post ? 'Your score improved from 6.2 to 6.9. Here’s where the conversation changed — and which answer would create a better outcome.' : 'Proben predicts the critical exchange before it happens — so you practice the moment that matters, not the whole meeting.'}
        </p>

        {/* post-practice score movement */}
        {post && (
          <Card glow style={{ padding: 24, marginBottom: 22, background: 'linear-gradient(110deg, var(--accent-panel-a), var(--accent-panel-b))' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 30, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ textAlign: 'center' }}>
                  <div className="mono" style={{ color: 'var(--muted)', fontSize: 9.5, marginBottom: 4 }}>BEFORE PRACTICE</div>
                  <div className="serif" style={{ fontSize: 32, color: 'var(--muted)', lineHeight: 1 }}>6.2<span style={{ fontSize: 16, fontFamily: 'var(--mono)' }}>/10</span></div>
                </div>
                <span style={{ fontSize: 22, color: 'var(--good)', display: 'flex' }}><Ic.arrow /></span>
                <div style={{ textAlign: 'center' }}>
                  <div className="mono" style={{ color: 'var(--muted)', fontSize: 9.5, marginBottom: 4 }}>AFTER PRACTICE</div>
                  <div className="serif" style={{ fontSize: 40, color: 'var(--c-good)', lineHeight: 1, fontWeight: 600 }}>6.9<span style={{ fontSize: 18, fontFamily: 'var(--mono)', color: 'var(--muted)' }}>/10</span></div>
                </div>
                <Pill color="var(--good)" style={{ alignSelf: 'center' }}>+0.7 READINESS</Pill>
              </div>
              <div style={{ flex: 1, minWidth: 240, color: 'var(--muted)', fontSize: 15.5, lineHeight: 1.5 }}>
                Your answer improved because you acknowledged the constraint, narrowed the ask, and reduced defensiveness.
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginTop: 20 }}>
              {SIGNAL_DELTAS.map((s, i) => (
                <div key={i} style={{ padding: '12px 14px', borderRadius: 11, border: '1px solid var(--line)', background: 'var(--panel)' }}>
                  <div className="mono" style={{ color: 'var(--muted)', fontSize: 9.5, marginBottom: 7 }}>{s.k}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ color: 'var(--ink-dim)', fontFamily: 'var(--mono)', fontSize: 13.5 }}>{s.from.toFixed(1)} → {s.to.toFixed(1)}</span>
                    <span style={{ marginLeft: 'auto', fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 13, color: s.d === 'no change' ? 'var(--muted-2)' : 'var(--good)' }}>{s.d}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* stakeholder line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 24px', borderRadius: 16, border: '1px solid var(--line)', background: 'var(--inset)', marginBottom: 8 }}>
          <span style={{ width: 46, height: 46, borderRadius: '50%', background: 'var(--amber-dim)', color: 'var(--amber)', display: 'grid', placeItems: 'center', fontSize: 20, flex: 'none' }}><Ic.user /></span>
          <div>
            <div className="mono" style={{ color: 'var(--muted)', fontSize: 10, marginBottom: 5 }}>STAGE · STAKEHOLDER PUSHBACK · {SCENARIO.stakeholderName.toUpperCase()}, {SCENARIO.stakeholderRole.toUpperCase()}</div>
            <div className="serif" style={{ fontSize: 22, color: 'var(--ink)', fontStyle: 'italic' }}>“Why now? We already have too many commitments.”</div>
          </div>
        </div>

        {/* connector */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', height: 30 }}>
          {[0, 1, 2].map((i) => <div key={i} style={{ borderLeft: i === 1 ? '1px dashed var(--line-strong)' : 'none', margin: '0 auto', width: 1, opacity: 0.6 }} />)}
        </div>

        {/* three paths */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, alignItems: 'stretch' }}>
          <PathCard {...PATHS.risk} onPractice={onPractice} />
          <PathCard {...(post ? { ...PATHS.good, label: 'BETTER PATH' } : PATHS.good)} onPractice={onPractice} />
          <PathCard {...PATHS.ai} onPractice={onPractice} />
        </div>

        {/* evidence slide */}
        <Card style={{ padding: 26, marginTop: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 16 }}>
            <span style={{ color: 'var(--lime)', fontSize: 18, display: 'flex' }}><Ic.doc /></span>
            <span className="serif" style={{ fontSize: 22, color: 'var(--ink)' }}>Evidence you’ll need: enterprise validation</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
            {[['Projected uplift', '+12–15%'], ['Revenue upside', '€1.2M / yr'], ['Effort', '2-week validation'], ['Eng. risk', 'Low disruption']].map((m, i) => (
              <div key={i} style={{ padding: '16px 18px', borderRadius: 12, background: 'var(--inset)', border: '1px solid var(--line)' }}>
                <div className="mono" style={{ color: 'var(--muted)', fontSize: 10, marginBottom: 8 }}>{m[0]}</div>
                <div className="serif" style={{ fontSize: 24, color: 'var(--c-good)' }}>{m[1]}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* what changed after practice */}
        {post && (
          <div style={{ marginTop: 26 }}>
            <div className="serif" style={{ fontSize: 26, color: 'var(--ink)', marginBottom: 16 }}>What changed after practice</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Card style={{ padding: 24, border: '1px solid color-mix(in srgb, var(--good) 28%, var(--line))' }}>
                <div className="mono" style={{ color: 'var(--good)', marginBottom: 14 }}>WORKED BETTER</div>
                <div style={{ display: 'grid', gap: 10 }}>
                  {CHANGED.worked.map((t, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, color: 'var(--ink-dim)', fontSize: 15.5, lineHeight: 1.4 }}><span style={{ color: 'var(--good)', flex: 'none', fontSize: 14, marginTop: 2, display: 'flex' }}><Ic.check /></span>{t}</div>
                  ))}
                </div>
              </Card>
              <Card style={{ padding: 24, border: '1px solid color-mix(in srgb, var(--amber) 28%, var(--line))' }}>
                <div className="mono" style={{ color: 'var(--amber)', marginBottom: 14 }}>STILL MISSING</div>
                <div style={{ display: 'grid', gap: 10 }}>
                  {CHANGED.missing.map((t, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, color: 'var(--ink-dim)', fontSize: 15.5, lineHeight: 1.4 }}><span style={{ color: 'var(--amber)', flex: 'none', fontSize: 13, marginTop: 1 }}>△</span>{t}</div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* footer CTA */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
          {post
            ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <Btn kind="lime" icon={<Ic.mic />} onClick={onPractice}>Practice again</Btn>
                  <Btn kind="ghost" icon={<Ic.target />} onClick={onReport || onContinue}>Update readiness report</Btn>
                </div>
                <button onClick={() => {}} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ai)', fontFamily: 'var(--sans)', fontSize: 14.5, display: 'flex', alignItems: 'center', gap: 7 }}><span style={{ fontSize: 14, display: 'flex' }}><Ic.spark /></span>Copy improved answer</button>
              </div>
            )
            : <Btn kind="lime" icon={<Ic.mic />} onClick={onContinue}>Practice this moment</Btn>}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { DialogueMap, AIMenu, PathCard });
