/* global React, Ic, Btn, Card, Pill, ReportHeader, ScoreRing, SCENARIO, useState, useEffect, useRef */

const COACH = [
  { k: 'Clarity', v: 7.8 }, { k: 'Tone', v: 6.9 }, { k: 'Structure', v: 7.2 }, { k: 'Evidence', v: 6.0 }, { k: 'Next step', v: 5.6 },
];
const USER_ANSWER = 'I hear that we’re stretched. I’m not trying to reopen the roadmap — I just want a two-week validation on the enterprise segment, because it’s already blocked. If it doesn’t move activation, we drop it.';

function MeterRow({ k, v, animate }) {
  const col = v >= 7.5 ? 'var(--good)' : v >= 6 ? 'var(--lime)' : v >= 4.5 ? 'var(--amber)' : 'var(--risk)';
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ color: 'var(--ink-dim)', fontSize: 14 }}>{k}</span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: animate ? col : 'var(--muted-2)' }}>{animate ? v.toFixed(1) : '—'}</span>
      </div>
      <div style={{ height: 6, background: 'var(--track)', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{ height: '100%', borderRadius: 99, background: col, width: animate ? (v / 10 * 100) + '%' : '0%', transition: 'width .8s cubic-bezier(.2,.8,.3,1)' }} />
      </div>
    </div>
  );
}

function VoicePractice({ onBack, onResults, share }) {
  const [phase, setPhase] = useState('idle'); // idle | recording | scored
  const [sec, setSec] = useState(0);
  const [text, setText] = useState('');
  const [showModel, setShowModel] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    if (phase === 'recording') {
      timer.current = setInterval(() => setSec((s) => s + 1), 1000);
    } else clearInterval(timer.current);
    return () => clearInterval(timer.current);
  }, [phase]);

  const startRec = () => { setSec(0); setPhase('recording'); };
  const submit = () => { setPhase('scored'); };
  const live = phase === 'recording' || phase === 'scored';

  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(120% 60% at 50% -5%, var(--rad-1), var(--rad-0) 55%)' }} className="grid-tex">
      <ReportHeader onBack={onBack} right={<Pill color="var(--lime)">VOICE PRACTICE</Pill>} />
      <div style={{ maxWidth: 1240, margin: '12px auto 0', padding: '0 40px' }} className="fade-up">
        <div style={{ padding: '16px 22px', borderRadius: 14, border: '1px solid var(--line)', background: 'var(--inset)', display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap' }}>
          <div className="serif" style={{ fontSize: 19, color: 'var(--ink)', flex: 'none' }}>Practice the answer most likely to decide the meeting.</div>
          <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginLeft: 'auto' }}>
            <span style={{ fontSize: 13.5, color: 'var(--muted)' }}><b style={{ color: 'var(--ink-dim)' }}>Goal:</b> get approval for a narrow validation</span>
            <span style={{ fontSize: 13.5, color: 'var(--muted)' }}><b style={{ color: 'var(--ink-dim)' }}>Win:</b> Dana agrees to a scoped next step</span>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '18px 40px 70px', display: 'grid', gridTemplateColumns: '300px 1fr 300px', gap: 18, alignItems: 'start' }} className="fade-up">

        {/* LEFT — persona */}
        <Card style={{ padding: 24 }}>
          <div className="mono" style={{ color: 'var(--muted)', marginBottom: 16 }}>STAKEHOLDER</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 18 }}>
            <span style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--amber-dim)', color: 'var(--amber)', display: 'grid', placeItems: 'center', fontSize: 22, flex: 'none' }}><Ic.user /></span>
            <div>
              <div className="serif" style={{ fontSize: 22, color: 'var(--ink)' }}>{SCENARIO.stakeholderName}</div>
              <div style={{ color: 'var(--muted)', fontSize: 14 }}>{SCENARIO.stakeholderRole}</div>
            </div>
          </div>
          <div style={{ display: 'grid', gap: 14 }}>
            <Meta label="ATTITUDE" v="Skeptical" />
            <Meta label="CARES ABOUT" v={SCENARIO.cares} />
            <Meta label="YOUR OBJECTIVE" v="Get approval for a narrow validation" />
          </div>
          {share ? (
            <div style={{ marginTop: 20 }}>
              <div className="mono" style={{ color: 'var(--muted)', fontSize: 9.5, marginBottom: 10 }}>SHARE CONTEXT DURING PRACTICE</div>
              <div style={{ display: 'grid', gap: 7 }}>
                {[['Share screen', <Ic.eye />], ['Upload slides', <Ic.upload />], ['Attach document', <Ic.doc />], ['Connect Google Drive', <Ic.layers />], ['Open meeting brief', <Ic.target />]].map((o, i) => (
                  <button key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 9, border: '1px solid var(--line)', background: 'var(--inset)', color: 'var(--ink-dim)', fontFamily: 'var(--sans)', fontSize: 13.5, cursor: 'pointer', textAlign: 'left' }}><span style={{ color: 'var(--ai)', fontSize: 14, display: 'flex' }}>{o[1]}</span>{o[0]}</button>
                ))}
              </div>
              <div style={{ marginTop: 10, padding: '10px 12px', borderRadius: 9, background: 'var(--ai-dim)', border: '1px solid color-mix(in srgb, var(--ai) 22%, transparent)', display: 'flex', gap: 9, alignItems: 'center' }}>
                <span style={{ color: 'var(--ai)', fontSize: 14, display: 'flex' }}><Ic.doc /></span>
                <span style={{ color: 'var(--ink-dim)', fontSize: 12.5 }}>Q3-enterprise-deck.pdf shared</span>
              </div>
            </div>
          ) : (
            <div style={{ marginTop: 20, padding: 16, borderRadius: 12, border: '1px dashed var(--line-strong)', color: 'var(--muted)', fontSize: 13.5, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 16, display: 'flex' }}><Ic.eye /></span> Screen sharing placeholder
            </div>
          )}
        </Card>

        {/* CENTER — exchange */}
        <Card style={{ padding: 30, minHeight: 520, display: 'flex', flexDirection: 'column' }}>
          <div className="mono" style={{ color: 'var(--muted)', marginBottom: 18 }}>CURRENT PROMPT</div>
          {/* stakeholder bubble */}
          <div style={{ display: 'flex', gap: 13, marginBottom: 24 }}>
            <span style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--amber-dim)', color: 'var(--amber)', display: 'grid', placeItems: 'center', fontSize: 17, flex: 'none' }}><Ic.user /></span>
            <div style={{ background: 'rgba(224,170,74,0.08)', border: '1px solid color-mix(in srgb, var(--amber) 25%, transparent)', borderRadius: '4px 16px 16px 16px', padding: '16px 20px' }}>
              <div className="serif" style={{ fontSize: 21, color: 'var(--ink)', lineHeight: 1.4 }}>“Why now? We already have too many commitments.”</div>
            </div>
          </div>

          {/* user response area */}
          {phase === 'scored' && (
            <div className="fade-up" style={{ display: 'flex', gap: 13, marginBottom: 20, justifyContent: 'flex-end' }}>
              <div style={{ background: 'var(--lime-glow)', border: '1px solid color-mix(in srgb, var(--lime) 30%, transparent)', borderRadius: '16px 4px 16px 16px', padding: '16px 20px', maxWidth: 460 }}>
                <div style={{ fontSize: 17, color: 'var(--ink)', lineHeight: 1.5 }}>{text || USER_ANSWER}</div>
              </div>
              <span style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--lime-glow)', color: 'var(--lime)', display: 'grid', placeItems: 'center', fontSize: 17, flex: 'none' }}><Ic.user /></span>
            </div>
          )}

          {/* controls */}
          <div style={{ marginTop: 'auto' }}>
            {phase !== 'scored' && (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '24px 0' }}>
                  <button onClick={phase === 'recording' ? submit : startRec} style={{ width: 84, height: 84, borderRadius: '50%', cursor: 'pointer', border: 'none', display: 'grid', placeItems: 'center', fontSize: 30, color: phase === 'recording' ? '#fff' : 'var(--cta-ink)', background: phase === 'recording' ? 'var(--risk)' : 'var(--lime)', boxShadow: phase === 'recording' ? '0 0 0 10px var(--risk-dim)' : '0 0 0 8px var(--lime-glow)', transition: 'all .2s' }}>
                    <Ic.mic />
                  </button>
                  <div style={{ color: 'var(--muted)', fontSize: 14, fontFamily: 'var(--mono)' }}>
                    {phase === 'recording' ? `RECORDING · ${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')} · TAP TO STOP` : (share ? 'TAP TO ANSWER · SCREEN + DOCS SHARED' : 'TAP TO ANSWER BY VOICE')}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '6px 0 16px' }}>
                  <div style={{ flex: 1, height: 1, background: 'var(--line)' }} /><span className="mono" style={{ color: 'var(--muted-2)' }}>OR TYPE</span><div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
                </div>
                <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your answer to Dana…" style={{ width: '100%', minHeight: 80, resize: 'vertical', padding: 16, borderRadius: 12, border: '1px solid var(--line)', background: 'var(--inset)', color: 'var(--ink)', fontFamily: 'var(--sans)', fontSize: 16, lineHeight: 1.5 }} />
                <div style={{ display: 'flex', gap: 12, marginTop: 14 }}>
                  <Btn kind="lime" icon={<Ic.arrow />} onClick={submit} disabled={phase === 'idle' && !text} style={{ flex: 1, justifyContent: 'center' }}>Submit answer</Btn>
                  <Btn kind="ghost" onClick={() => setShowModel(!showModel)}>Show model answer</Btn>
                </div>
                {showModel && (
                  <div className="pop-in" style={{ marginTop: 14, padding: 16, borderRadius: 12, background: 'var(--lime-glow)', border: '1px solid color-mix(in srgb, var(--lime) 28%, transparent)' }}>
                    <div className="mono" style={{ color: 'var(--lime)', fontSize: 10, marginBottom: 8 }}>MODEL ANSWER</div>
                    <div style={{ color: 'var(--ink)', fontSize: 15.5, lineHeight: 1.5 }}>“Let me separate timing from impact. I’m not asking for a roadmap reset — just a two-week validation, because the enterprise segment is already blocked and that’s €1.2M/yr at risk.”</div>
                  </div>
                )}
              </>
            )}

            {phase === 'scored' && (
              <div className="fade-up" style={{ display: 'grid', gap: 14 }}>
                <div style={{ padding: '14px 18px', borderRadius: 12, background: 'var(--lime-glow)', border: '1px solid color-mix(in srgb, var(--lime-deep) 35%, transparent)', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ color: 'var(--good)', fontSize: 17, display: 'flex' }}><Ic.spark /></span>
                  <span style={{ color: 'var(--ink)', fontSize: 16.5, fontWeight: 600 }}>Your readiness improved from 6.2 to 7.4.</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div style={{ padding: 18, borderRadius: 13, border: '1px solid color-mix(in srgb, var(--good) 28%, transparent)', background: 'rgba(155,210,74,0.06)' }}>
                    <div className="mono" style={{ color: 'var(--good)', fontSize: 10, marginBottom: 10 }}>WHAT WORKED</div>
                    {['Acknowledged the constraint first', 'Narrow, scoped ask', 'Clear kill condition'].map((t, i) => <div key={i} style={{ color: 'var(--ink-dim)', fontSize: 14.5, display: 'flex', gap: 8, marginBottom: 6 }}><span style={{ color: 'var(--good)' }}>✓</span>{t}</div>)}
                  </div>
                  <div style={{ padding: 18, borderRadius: 13, border: '1px solid color-mix(in srgb, var(--amber) 28%, transparent)', background: 'var(--amber-dim)' }}>
                    <div className="mono" style={{ color: 'var(--amber)', fontSize: 10, marginBottom: 10 }}>WHAT TO IMPROVE</div>
                    {['Lead with the €1.2M number', 'Name who owns the validation', 'Close with a yes/no ask'].map((t, i) => <div key={i} style={{ color: 'var(--ink-dim)', fontSize: 14.5, display: 'flex', gap: 8, marginBottom: 6 }}><span style={{ color: 'var(--amber)' }}>→</span>{t}</div>)}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <Btn kind="ghost" icon={<Ic.mic />} onClick={() => { setPhase('idle'); setSec(0); setText(''); }} style={{ flex: 1, justifyContent: 'center' }}>Practice again</Btn>
                  <Btn kind="lime" icon={<Ic.layers />} onClick={onResults} style={{ flex: 1, justifyContent: 'center' }}>See updated readiness</Btn>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* RIGHT — live coaching */}
        <Card style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <span className="mono" style={{ color: 'var(--muted)' }}>LIVE COACHING</span>
            {live && <Pill color="var(--lime)" style={{ padding: '4px 10px', fontSize: 9.5 }}>LIVE</Pill>}
          </div>
          {phase === 'scored' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 22 }}>
              <ScoreRing value={6.9} size={110} label="DELIVERY" />
            </div>
          )}
          <div style={{ display: 'grid', gap: 16 }}>
            {COACH.map((c) => <MeterRow key={c.k} {...c} animate={phase === 'scored'} />)}
          </div>
          {!live && <div style={{ marginTop: 20, color: 'var(--muted-2)', fontSize: 13.5, lineHeight: 1.5 }}>Coaching scores appear as you speak. Submit an answer to see your delivery breakdown.</div>}
          {phase === 'scored' && (
            <div style={{ marginTop: 20, padding: 14, borderRadius: 11, background: 'var(--inset)', border: '1px solid var(--line)' }}>
              <div className="mono" style={{ color: 'var(--muted)', fontSize: 9.5, marginBottom: 6 }}>BETTER NEXT STEP</div>
              <div style={{ color: 'var(--ink-dim)', fontSize: 14, lineHeight: 1.45 }}>“So — can I get a yes to two weeks of validation, owned by me, reviewed next sprint?”</div>
            </div>
          )}
          {phase === 'scored' && share && (
            <div style={{ marginTop: 14, padding: 14, borderRadius: 11, background: 'var(--ai-dim)', border: '1px solid color-mix(in srgb, var(--ai) 22%, transparent)' }}>
              <div className="mono" style={{ color: 'var(--ai)', fontSize: 9.5, marginBottom: 6 }}>SHARED MATERIAL</div>
              <div style={{ color: 'var(--ink-dim)', fontSize: 14, lineHeight: 1.45 }}>Slide 4 shows the revenue upside, but your answer didn’t mention it — reference it out loud.</div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function Meta({ label, v }) {
  return <div><div className="mono" style={{ color: 'var(--muted-2)', fontSize: 9.5, marginBottom: 5 }}>{label}</div><div style={{ color: 'var(--ink-dim)', fontSize: 15, lineHeight: 1.4 }}>{v}</div></div>;
}

Object.assign(window, { VoicePractice });
