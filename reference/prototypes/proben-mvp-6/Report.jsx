/* global React, Ic, Btn, Card, Pill, ScoreRing, ScoreBar, SCENARIO, SIGNALS, TOP_RISKS, TOP_FIXES, FOLLOWUPS, useState, useEffect */

/* ---- Analyzing transition ---- */
function Analyzing({ onDone, label = 'Analyzing readiness', steps: customSteps }) {
  const steps = customSteps || ['Reading meeting context', 'Scoring readiness signals', 'Checking strategic context fit', 'Detecting risks & likely objections'];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => x + 1), 620);
    const done = setTimeout(onDone, 620 * steps.length + 300);
    return () => { clearInterval(t); clearTimeout(done); };
  }, []);
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'radial-gradient(120% 80% at 50% 30%, var(--rad-1), var(--rad-0) 60%)' }} className="grid-tex">
      <div style={{ textAlign: 'center', width: 420 }}>
        <div style={{ position: 'relative', width: 120, height: 120, margin: '0 auto 30px' }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '3px solid var(--track)', borderTopColor: 'var(--lime-deep)', animation: 'spin 1s linear infinite' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: 'var(--lime-deep)', fontSize: 30 }}><Ic.target /></div>
        </div>
        <div className="serif" style={{ fontSize: 28, color: 'var(--ink)' }}>{label}…</div>
        <div style={{ marginTop: 26, display: 'grid', gap: 12, textAlign: 'left' }}>
          {steps.map((s, k) => (
            <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 12, opacity: k <= i ? 1 : 0.3, transition: 'opacity .3s' }}>
              <span style={{ width: 22, height: 22, borderRadius: '50%', display: 'grid', placeItems: 'center', background: k < i ? 'var(--lime)' : 'transparent', border: '1px solid ' + (k <= i ? 'var(--lime-deep)' : 'var(--line)'), color: 'var(--cta-ink)', fontSize: 12 }}>{k < i && <Ic.check />}</span>
              <span style={{ color: k <= i ? 'var(--ink)' : 'var(--muted)', fontSize: 16 }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

function ReportHeader({ onBack, right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 40px', borderBottom: '1px solid var(--line)', position: 'sticky', top: 0, zIndex: 5, background: 'var(--header-blur)', backdropFilter: 'blur(10px)' }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--sans)', fontSize: 15 }}>
        <span style={{ fontSize: 17, display: 'flex' }}><Ic.chevL /></span> Edit context
      </button>
      <span className="mono" style={{ color: 'var(--muted)' }}>YOUR MEETING READINESS REPORT</span>
      {right || <span style={{ width: 90 }} />}
    </div>
  );
}

/* ---- Benchmark answers: what a strong reply sounds like ---- */
const BENCHMARKS = [
  { k: 'Concise executive', a: 'Recommendation: approve a scoped two-week validation on enterprise. Success = +12% activation. If it misses, we proceed with the pivot as planned.', why: 'Leads with the decision and a clear kill condition.', sig: 'Decision ask · Risk handling', out: 'Dana can say yes in one breath.' },
  { k: 'Evidence-first', a: 'Three enterprise deals stalled on this gap last quarter — €1.2M ARR. Give me two weeks to test whether a fix moves activation by the 12% we’d need.', why: 'Opens with the number, so the ask reads as a business case.', sig: 'Evidence strength', out: 'Dana debates scope, not whether it matters.' },
  { k: 'Diplomatic pushback', a: 'I’m fully behind the pivot. I just want to de-risk it: a two-week validation on the blocked enterprise segment before we commit the full roadmap.', why: 'Aligns with the VP before introducing the ask.', sig: 'Stakeholder alignment · Tone', out: 'Lowers defensiveness on both sides.' },
  { k: 'Principal PM', a: 'Let’s separate timing from impact. The enterprise block is a hidden cost we’re already paying — a narrow two-week validation tells us if it’s worth roadmap space, without reopening the plan.', why: 'Reframes the debate and contains the scope.', sig: 'Argument structure', out: 'Dana asks for the validation scope.' },
  { k: 'Staff Engineer', a: 'Technically this is ~8 engineer-days behind a feature flag — low blast radius. Two weeks gives us a clean read on activation before we commit the larger build.', why: 'Quantifies effort and risk in engineering terms.', sig: 'Evidence · Risk handling', out: 'Removes the “is this expensive?” objection.' },
];

function Benchmarks() {
  const [i, setI] = useState(0);
  const b = BENCHMARKS[i];
  return (
    <Card style={{ padding: 28, marginBottom: 18 }}>
      <span className="serif" style={{ fontSize: 23, color: 'var(--ink)' }}>Compare with a stronger answer</span>
      <p style={{ color: 'var(--muted)', fontSize: 14.5, margin: '6px 0 18px' }}>This is what “good” sounds like — pick a style to see how a strong operator would handle the pushback.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
        {BENCHMARKS.map((x, k) => (
          <button key={k} onClick={() => setI(k)} style={{ padding: '9px 15px', borderRadius: 999, cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 500, border: '1px solid ' + (i === k ? 'var(--ai)' : 'var(--line)'), background: i === k ? 'var(--ai-dim)' : 'transparent', color: i === k ? 'var(--ai)' : 'var(--ink-dim)' }}>{x.k}</button>
        ))}
      </div>
      <div className="pop-in" key={i} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 22, alignItems: 'start' }}>
        <div style={{ padding: '18px 22px', borderRadius: 14, background: 'var(--ai-dim)', border: '1px solid color-mix(in srgb, var(--ai) 28%, transparent)' }}>
          <div className="mono" style={{ color: 'var(--ai)', fontSize: 9.5, marginBottom: 9, display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ fontSize: 12, display: 'flex' }}><Ic.spark /></span>{b.k.toUpperCase()} ANSWER</div>
          <div className="serif" style={{ fontSize: 19, color: 'var(--ink)', lineHeight: 1.45, fontStyle: 'italic' }}>“{b.a}”</div>
        </div>
        <div style={{ display: 'grid', gap: 14 }}>
          <BMRow label="WHY IT WORKS" v={b.why} />
          <BMRow label="IMPROVES SIGNAL" v={b.sig} col="var(--good)" />
          <BMRow label="SUPPORTS OUTCOME" v={b.out} col="var(--lime-deep)" />
        </div>
      </div>
    </Card>
  );
}
function BMRow({ label, v, col }) {
  return (
    <div>
      <div className="mono" style={{ color: 'var(--muted-2)', fontSize: 9.5, marginBottom: 5 }}>{label}</div>
      <div style={{ color: col || 'var(--ink-dim)', fontSize: 15, lineHeight: 1.4 }}>{v}</div>
    </div>
  );
}

/* ---- Variant A / B readiness report ---- */
function Report({ variant, verdict, context, onBack, onPractice, onMap }) {
  const signals = context ? SIGNALS_CTX : SIGNALS;
  const followups = context ? FOLLOWUPS_CTX : FOLLOWUPS;
  const sigCount = signals.length === 7 ? 'SEVEN' : 'SIX';
  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(120% 60% at 80% -5%, var(--rad-1), var(--rad-0) 55%)' }} className="grid-tex">
      <ReportHeader onBack={onBack} />
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '44px 40px 80px' }} className="fade-up">

        {/* title + score */}
        <div className="mono" style={{ color: 'var(--lime)', marginBottom: 12 }}>READINESS REPORT · {SCENARIO.type.toUpperCase()}</div>
        <h1 className="serif" style={{ fontSize: 44, margin: '0 0 10px', color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1.04 }}>{verdict ? 'You’re partly ready — fix 3 things first.' : 'Your meeting readiness report'}</h1>
        <p style={{ color: 'var(--muted)', fontSize: 17.5, maxWidth: 700, lineHeight: 1.5, margin: '0 0 30px' }}>
          {verdict
            ? 'Your meeting can work, but the decision ask, evidence, and stakeholder pushback need improvement before you walk in.'
            : 'Readiness is not a personality score. It measures whether your objective, evidence, argument, stakeholder handling, and next step are strong enough for the outcome you want.'}
        </p>

        {/* score + signals row */}
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 18, marginBottom: 18 }}>
          <Card glow style={{ padding: 26, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18 }}>
            <ScoreRing value={6.2} size={150} />
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Pill color="var(--amber)" dot={false}>CONFIDENCE: MEDIUM</Pill>
              <Pill color="var(--risk)" dot={false}>HIGH STAKES</Pill>
            </div>
            <Btn kind="lime" icon={<Ic.mic />} onClick={variant === 'B' ? onMap : onPractice} sm style={{ width: '100%', justifyContent: 'center' }}>{variant === 'B' ? 'Map, then practice' : 'Practice this moment'}</Btn>
          </Card>
          <Card style={{ padding: '26px 30px' }}>
            <div className="mono" style={{ color: 'var(--muted)', marginBottom: 20 }}>{sigCount} READINESS SIGNALS</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 40px' }}>
              {signals.map((s, i) => <ScoreBar key={i} label={s.label} value={s.score ?? 0} muted={s.score == null} />)}
            </div>
          </Card>
        </div>

        {/* risks + fixes */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 18 }}>
          <Card style={{ padding: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span style={{ color: 'var(--risk)', fontSize: 18, display: 'flex' }}><Ic.warn /></span>
              <span className="serif" style={{ fontSize: 23, color: 'var(--ink)' }}>Top 3 risks</span>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: 14.5, margin: '0 0 18px' }}>The 3 things most likely to hurt the outcome.</p>
            <div style={{ display: 'grid', gap: 14 }}>
              {TOP_RISKS.map((r, i) => (
                <div key={i} style={{ display: 'flex', gap: 13, paddingBottom: 14, borderBottom: i < 2 ? '1px solid var(--line)' : 'none' }}>
                  <span style={{ fontFamily: 'var(--mono)', color: 'var(--risk)', fontWeight: 600, flex: 'none' }}>{i + 1}</span>
                  <div>
                    <div style={{ color: 'var(--ink)', fontSize: 16.5, fontWeight: 600 }}>{r.t}</div>
                    <div style={{ color: 'var(--muted)', fontSize: 14.5, marginTop: 4, lineHeight: 1.45 }}>{r.d}</div>
                    <div style={{ color: 'var(--risk)', fontSize: 13.5, marginTop: 7, display: 'flex', gap: 7 }}><span className="mono" style={{ fontSize: 9, opacity: 0.8, flex: 'none', marginTop: 2 }}>LEADS&nbsp;TO</span>{r.cause}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card style={{ padding: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span style={{ color: 'var(--lime)', fontSize: 18, display: 'flex' }}><Ic.check /></span>
              <span className="serif" style={{ fontSize: 23, color: 'var(--ink)' }}>Top 3 fixes</span>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: 14.5, margin: '0 0 18px' }}>Do these before you walk in.</p>
            <div style={{ display: 'grid', gap: 14 }}>
              {TOP_FIXES.map((r, i) => (
                <div key={i} style={{ display: 'flex', gap: 13, paddingBottom: 14, borderBottom: i < 2 ? '1px solid var(--line)' : 'none' }}>
                  <span style={{ color: 'var(--lime)', flex: 'none', fontSize: 16, marginTop: 2, display: 'flex' }}><Ic.check /></span>
                  <div>
                    <div style={{ color: 'var(--ink)', fontSize: 16.5, fontWeight: 600 }}>{r.t}</div>
                    <div style={{ color: 'var(--muted)', fontSize: 14.5, marginTop: 4, lineHeight: 1.45 }}>{r.d}</div>
                    <div style={{ color: 'var(--good)', fontSize: 13.5, marginTop: 7, display: 'flex', gap: 7 }}><span className="mono" style={{ fontSize: 9, opacity: 0.8, flex: 'none', marginTop: 2 }}>WHY</span>{r.why}</div>
                    {r.ex && <div style={{ marginTop: 9, padding: '9px 12px', borderRadius: 9, background: 'var(--inset)', border: '1px solid var(--line)', color: 'var(--ink-dim)', fontSize: 13.5, fontStyle: 'italic', lineHeight: 1.4 }}>“{r.ex}”</div>}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* missing context (context-aware) */}
        {context && (
          <Card style={{ padding: 28, marginBottom: 18, border: '1px solid color-mix(in srgb, var(--ai) 25%, var(--line))' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span style={{ color: 'var(--ai)', fontSize: 18, display: 'flex' }}><Ic.layers /></span>
              <span className="serif" style={{ fontSize: 23, color: 'var(--ink)', whiteSpace: 'nowrap' }}>Missing context</span>
              <Pill color="var(--ai)" dot={false} style={{ flex: 'none', fontSize: 9.5, padding: '4px 10px' }}>STRATEGIC FIT 5.6</Pill>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: 14.5, margin: '0 0 18px' }}>Your message is clear, but it isn’t yet connected to the business context Dana will weigh it against.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
              {MISSING_CONTEXT.map((m, i) => (
                <div key={i} style={{ padding: '18px 20px', borderRadius: 13, background: 'var(--ai-dim)', border: '1px solid color-mix(in srgb, var(--ai) 22%, transparent)' }}>
                  <div style={{ display: 'flex', gap: 9, alignItems: 'center', marginBottom: 9 }}>
                    <span style={{ color: 'var(--ai)', fontSize: 14, display: 'flex' }}><Ic.minus /></span>
                    <span style={{ color: 'var(--ink)', fontSize: 16, fontWeight: 600 }}>{m.t}</span>
                  </div>
                  <div style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.45, marginBottom: 10 }}>{m.d}</div>
                  <div style={{ color: 'var(--ink-dim)', fontSize: 13.5, lineHeight: 1.4, display: 'flex', gap: 7 }}><span className="mono" style={{ fontSize: 9, color: 'var(--ai)', flex: 'none', marginTop: 2 }}>ADD</span>{m.fix}</div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* follow ups */}
        <Card style={{ padding: 28, marginBottom: 18 }}>
          <span className="serif" style={{ fontSize: 23, color: 'var(--ink)' }}>Likely follow-up questions</span>
          <p style={{ color: 'var(--muted)', fontSize: 14.5, margin: '6px 0 18px' }}>Questions you should be ready to answer.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {followups.map((q, i) => (
              <span key={i} style={{ padding: '13px 20px', borderRadius: 12, border: '1px solid var(--line)', background: 'var(--inset)', color: 'var(--ink-dim)', fontSize: 16, display: 'flex', alignItems: 'center', gap: 9 }}>
                <span style={{ color: 'var(--amber)', fontSize: 13 }}>?</span>“{q}”
              </span>
            ))}
          </div>
        </Card>

        {/* benchmark answers */}
        <Benchmarks />

        {/* practice moment CTA */}
        <Card glow style={{ padding: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 30, background: 'linear-gradient(110deg, var(--accent-panel-a), var(--accent-panel-b))' }}>
          <div>
            <div className="mono" style={{ color: 'var(--lime)', marginBottom: 10 }}>SUGGESTED PRACTICE MOMENT</div>
            <div className="serif" style={{ fontSize: 30, color: 'var(--ink)', maxWidth: 560, lineHeight: 1.1 }}>Handle stakeholder pushback without sounding defensive.</div>
            <p style={{ color: 'var(--muted)', fontSize: 16, marginTop: 12, maxWidth: 540 }}>One voice rep against {SCENARIO.stakeholderName}, {SCENARIO.stakeholderRole}. We score delivery and update your readiness.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 'none' }}>
            {variant === 'B' && <Btn kind="ghost" icon={<Ic.layers />} onClick={onMap}>See predicted map</Btn>}
            <Btn kind="lime" icon={<Ic.mic />} onClick={variant === 'B' ? onMap : onPractice} style={{ whiteSpace: 'nowrap' }}>
              {variant === 'B' ? 'Map, then practice' : 'Practice this moment'}
            </Btn>
          </div>
        </Card>
      </div>
    </div>
  );
}

Object.assign(window, { Report, Analyzing, ReportHeader, Benchmarks });
