/* global React, Ic, Pill, Btn, ScoreRing, TopBar, Back, useState, useEffect, useRef */
/* Proben MVP 5 — practice modes: Chat simulation + Upload analysis. Blueprint skin. */

const STAKE = { name: 'Dana', role: 'VP Product', attitude: 'Skeptical', cares: 'Business impact, timing, team capacity', objection: '“Why now? We already have too many commitments.”', win: 'Dana agrees to a scoped next step' };

const COACH_KEYS = ['Clarity', 'Strategic context', 'Evidence', 'Stakeholder handling', 'Decision ask', 'Tone'];
/* scripted role-play: dana reply + feedback per user turn */
const TURNS = [
  {
    dana: 'Okay — but what makes the enterprise segment more important than the horizontal bet leadership wants?',
    worked: 'You acknowledged the capacity concern instead of arguing against it.',
    weakened: 'Still no business-impact number, and the ask sounds broad.',
    better: '“I agree we should avoid adding scope. My ask isn’t a roadmap change — it’s a two-week validation to decide whether this enterprise blocker is worth prioritizing.”',
    scores: [7.2, 5.8, 5.5, 6.6, 5.6, 7.0],
  },
  {
    dana: 'And if the validation fails — what have we actually learned?',
    worked: 'You framed it as de-risking, which aligns with how Dana thinks.',
    weakened: 'You haven’t named a success threshold or an owner yet.',
    better: '“If activation doesn’t move by 12% in two weeks, we drop it and proceed with the pivot. Either way we stop guessing — I’ll own the validation.”',
    scores: [7.8, 6.9, 6.4, 7.4, 6.9, 7.2],
  },
];
const SUGGESTIONS = [
  '“I’m not asking to reopen the roadmap — just two weeks to validate the enterprise blocker.”',
  '“Enterprise is already blocked, that’s ~€1.2M/yr at risk. Two weeks tells us if a fix is worth it.”',
  '“If it doesn’t move activation by 12%, we drop it. I’ll own it and report next sprint.”',
];

function CoachMeter({ k, v, on }) {
  const col = !on ? 'var(--muted-2)' : v >= 7.5 ? 'var(--c-good)' : v >= 6 ? 'var(--c-mid)' : v >= 4.5 ? 'var(--c-warn)' : 'var(--c-bad)';
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}><span style={{ color: 'var(--ink-dim)', fontSize: 13.5 }}>{k}</span><span style={{ fontFamily: 'var(--mono)', fontSize: 12.5, color: col }}>{on ? v.toFixed(1) : '—'}</span></div>
      <div style={{ height: 6, background: 'var(--track)', borderRadius: 99, overflow: 'hidden' }}><div style={{ height: '100%', width: on ? (v / 10 * 100) + '%' : '0%', background: col, borderRadius: 99, transition: 'width .8s cubic-bezier(.2,.8,.3,1)' }} /></div>
    </div>
  );
}

/* ===== CHAT SIMULATION ===== */
function ChatSim({ onBack, onVoice, onUpload, onResults }) {
  const [msgs, setMsgs] = useState([{ who: 'dana', text: STAKE.objection.replace(/[“”]/g, '') }]);
  const [draft, setDraft] = useState('');
  const [turn, setTurn] = useState(0);
  const [fb, setFb] = useState(null);
  const [ended, setEnded] = useState(false);
  const [showBench, setShowBench] = useState(false);
  const threadRef = useRef(null);
  const scores = turn === 0 ? null : TURNS[Math.min(turn, TURNS.length) - 1].scores;

  useEffect(() => { if (threadRef.current) threadRef.current.scrollTop = threadRef.current.scrollHeight; }, [msgs, fb]);

  const send = () => {
    if (!draft.trim() || turn >= TURNS.length) return;
    const t = TURNS[turn];
    setMsgs((m) => [...m, { who: 'me', text: draft.trim() }]);
    setDraft('');
    setFb(null);
    setTimeout(() => {
      setMsgs((m) => [...m, { who: 'dana', text: t.dana }]);
      setFb(t);
      setTurn((x) => x + 1);
    }, 550);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-0)' }} className="bp-grid">
      <TopBar left={<Back onClick={onBack} label="Practice modes" />} center="PRACTICE · CHAT SIMULATION" right={<Pill color="var(--ai)">ROLE-PLAY</Pill>} />
      {!ended ? (
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '26px 36px 60px' }} className="fade-up">
          <h1 className="serif" style={{ fontSize: 32, margin: '0 0 4px', color: 'var(--ink)', lineHeight: 1.15 }}>Practice in chat</h1>
          <p style={{ color: 'var(--muted)', fontSize: 15.5, margin: '0 0 20px', maxWidth: 720, lineHeight: 1.5 }}>Proben plays the stakeholder. Answer the objection and move the meeting toward a clear next step.</p>
          {/* context bar */}
          <div className="bp-card" style={{ padding: '12px 18px', display: 'flex', flexWrap: 'wrap', gap: 22, marginBottom: 16 }}>
            {[['MEETING', 'Strategy review'], ['GOAL', 'Approval for a narrow validation'], ['STAKEHOLDER', STAKE.name + ', ' + STAKE.role], ['WIN CONDITION', STAKE.win]].map((c, i) => (
              <div key={i}><div className="mono" style={{ color: 'var(--muted-2)', fontSize: 9, marginBottom: 3 }}>{c[0]}</div><div style={{ color: 'var(--ink-dim)', fontSize: 14, fontWeight: 500 }}>{c[1]}</div></div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '270px 1fr 270px', gap: 16, alignItems: 'start' }}>
            {/* left — stakeholder */}
            <div className="bp-card" style={{ padding: 20 }}>
              <div className="mono" style={{ color: 'var(--muted)', marginBottom: 14 }}>STAKEHOLDER</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span style={{ width: 46, height: 46, borderRadius: '50%', background: 'var(--amber-dim)', color: 'var(--amber)', display: 'grid', placeItems: 'center', fontSize: 20, flex: 'none' }}><Ic.user /></span>
                <div><div className="serif" style={{ fontSize: 21, color: 'var(--ink)' }}>{STAKE.name}</div><div style={{ color: 'var(--muted)', fontSize: 13.5 }}>{STAKE.role}</div></div>
              </div>
              <div style={{ display: 'grid', gap: 12 }}>
                {[['ATTITUDE', STAKE.attitude], ['CARES ABOUT', STAKE.cares], ['LIKELY OBJECTION', 'Why now?'], ['RISK', 'You may sound defensive or vague']].map((m, i) => (
                  <div key={i}><div className="mono" style={{ color: 'var(--muted-2)', fontSize: 9, marginBottom: 4 }}>{m[0]}</div><div style={{ color: 'var(--ink-dim)', fontSize: 13.5, lineHeight: 1.4 }}>{m[1]}</div></div>
                ))}
              </div>
            </div>

            {/* center — thread */}
            <div className="bp-card" style={{ padding: 0, display: 'flex', flexDirection: 'column', minHeight: 540 }}>
              <div ref={threadRef} style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 14, flex: 1, overflowY: 'auto', maxHeight: 460 }}>
                {msgs.map((m, i) => m.who === 'dana' ? (
                  <div key={i} style={{ display: 'flex', gap: 11, alignItems: 'flex-end' }}>
                    <span style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--amber-dim)', color: 'var(--amber)', display: 'grid', placeItems: 'center', fontSize: 14, flex: 'none' }}><Ic.user /></span>
                    <div style={{ background: 'color-mix(in srgb, var(--amber) 8%, transparent)', border: '1px solid color-mix(in srgb, var(--amber) 25%, transparent)', borderRadius: '3px 14px 14px 14px', padding: '12px 16px', maxWidth: '78%' }}><div style={{ color: 'var(--ink)', fontSize: 15.5, lineHeight: 1.45 }}>{m.text}</div></div>
                  </div>
                ) : (
                  <div key={i} style={{ display: 'flex', gap: 11, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                    <div style={{ background: 'var(--lime-glow)', border: '1px solid color-mix(in srgb, var(--lime-deep) 30%, transparent)', borderRadius: '14px 3px 14px 14px', padding: '12px 16px', maxWidth: '78%' }}><div style={{ color: 'var(--ink)', fontSize: 15.5, lineHeight: 1.45 }}>{m.text}</div></div>
                  </div>
                ))}
                {fb && (
                  <div className="pop-in" style={{ borderRadius: 12, border: '1px solid var(--line)', background: 'var(--inset)', padding: '14px 16px', marginTop: 2 }}>
                    <div className="mono" style={{ color: 'var(--ai)', fontSize: 9, marginBottom: 9 }}>COACHING</div>
                    <div style={{ display: 'grid', gap: 7 }}>
                      <div style={{ display: 'flex', gap: 8, color: 'var(--ink-dim)', fontSize: 13.5, lineHeight: 1.4 }}><span style={{ color: 'var(--c-good)', flex: 'none' }}>✓</span>{fb.worked}</div>
                      <div style={{ display: 'flex', gap: 8, color: 'var(--ink-dim)', fontSize: 13.5, lineHeight: 1.4 }}><span style={{ color: 'var(--c-warn)', flex: 'none' }}>→</span>{fb.weakened}</div>
                    </div>
                    <div style={{ marginTop: 11, paddingTop: 11, borderTop: '1px solid var(--line)' }}>
                      <div className="mono" style={{ color: 'var(--muted-2)', fontSize: 8.5, marginBottom: 5 }}>BETTER NEXT REPLY</div>
                      <div style={{ color: 'var(--ink)', fontSize: 14, fontStyle: 'italic', lineHeight: 1.45 }}>{fb.better}</div>
                    </div>
                  </div>
                )}
                {turn >= TURNS.length && (
                  <div style={{ textAlign: 'center', color: 'var(--muted-2)', fontSize: 13, padding: '8px 0' }}>You’ve handled both objections — end the simulation to see your updated readiness.</div>
                )}
              </div>
              {/* input */}
              <div style={{ borderTop: '1px solid var(--line)', padding: 14 }}>
                {showBench && <div className="pop-in" style={{ marginBottom: 10, padding: 12, borderRadius: 10, background: 'var(--lime-glow)', border: '1px solid color-mix(in srgb, var(--lime-deep) 28%, transparent)' }}><div className="mono" style={{ color: 'var(--lime-deep)', fontSize: 8.5, marginBottom: 6 }}>BENCHMARK ANSWER</div><div style={{ color: 'var(--ink)', fontSize: 14, lineHeight: 1.45 }}>{SUGGESTIONS[Math.min(turn, 2)]}</div></div>}
                <textarea value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={turn >= TURNS.length ? 'Simulation complete — end to see results' : 'Type your response…'} disabled={turn >= TURNS.length}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
                  style={{ width: '100%', minHeight: 60, resize: 'none', padding: 13, borderRadius: 10, border: '1px solid var(--line)', background: 'var(--inset)', color: 'var(--ink)', fontFamily: 'var(--sans)', fontSize: 15, lineHeight: 1.5 }} />
                <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                  <Btn kind="lime" sm icon={<Ic.arrow />} onClick={send} disabled={turn >= TURNS.length || !draft.trim()}>Send reply</Btn>
                  <Btn kind="ghost" sm icon={<Ic.spark />} onClick={() => setShowBench((s) => !s)}>Benchmark answer</Btn>
                  <Btn kind="ghost" sm onClick={() => setEnded(true)} style={{ marginLeft: 'auto' }}>End simulation</Btn>
                </div>
              </div>
            </div>

            {/* right — live coaching */}
            <div className="bp-card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}><span className="mono" style={{ color: 'var(--muted)' }}>LIVE COACHING</span>{scores && <Pill color="var(--lime-deep)" dot={false} style={{ fontSize: 9, padding: '3px 9px' }}>LIVE</Pill>}</div>
              <div style={{ display: 'grid', gap: 13 }}>{COACH_KEYS.map((k, i) => <CoachMeter key={k} k={k} v={scores ? scores[i] : 0} on={!!scores} />)}</div>
              {!scores && <p style={{ color: 'var(--muted-2)', fontSize: 13, marginTop: 16, lineHeight: 1.5 }}>Scores appear as you reply. Not ready to speak? This is the safe first step.</p>}
            </div>
          </div>
        </div>
      ) : (
        <ChatEnd onBack={() => setEnded(false)} onVoice={onVoice} onUpload={onUpload} onResults={onResults} />
      )}
    </div>
  );
}

function ChatEnd({ onBack, onVoice, onUpload, onResults }) {
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '30px 36px 70px' }} className="fade-up">
      <div className="mono" style={{ color: 'var(--lime-deep)', marginBottom: 10 }}>CHAT SIMULATION · RESULT</div>
      <h1 className="serif" style={{ fontSize: 34, margin: '0 0 20px', color: 'var(--ink)', lineHeight: 1.12 }}>You moved the meeting forward.</h1>
      <div className="bp-card" style={{ padding: 26, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap', background: 'linear-gradient(110deg, var(--accent-panel-a), var(--accent-panel-b))', borderColor: 'color-mix(in srgb, var(--c-good) 30%, var(--bp-line))' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ textAlign: 'center' }}><div className="mono" style={{ color: 'var(--muted)', fontSize: 9.5, marginBottom: 4 }}>BEFORE</div><div className="serif" style={{ fontSize: 30, color: 'var(--muted)', lineHeight: 1 }}>6.2</div></div>
          <span style={{ fontSize: 22, color: 'var(--c-good)', display: 'flex' }}><Ic.arrow /></span>
          <div style={{ textAlign: 'center' }}><div className="mono" style={{ color: 'var(--muted)', fontSize: 9.5, marginBottom: 4 }}>NOW</div><div className="serif" style={{ fontSize: 40, color: 'var(--c-good)', lineHeight: 1 }}>7.0</div></div>
        </div>
        <div style={{ flex: 1, minWidth: 220, color: 'var(--ink-dim)', fontSize: 15.5, lineHeight: 1.5 }}>Your replies got clearer and less defensive. <b style={{ color: 'var(--ink)' }}>Evidence is still the gap</b> — add one business-impact number.</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
        <div className="bp-card" style={{ padding: 20 }}>
          <div className="mono" style={{ color: 'var(--c-good)', fontSize: 9.5, marginBottom: 11 }}>WHAT IMPROVED</div>
          {['Stakeholder handling +1.2', 'Decision ask +0.8', 'Tone +0.6'].map((t, i) => <div key={i} style={{ display: 'flex', gap: 8, color: 'var(--ink-dim)', fontSize: 14, marginBottom: 7 }}><span style={{ color: 'var(--c-good)' }}>✓</span>{t}</div>)}
        </div>
        <div className="bp-card" style={{ padding: 20 }}>
          <div className="mono" style={{ color: 'var(--c-warn)', fontSize: 9.5, marginBottom: 11 }}>STILL WEAK</div>
          {['Add business-impact number', 'Name owner of validation', 'Define success threshold'].map((t, i) => <div key={i} style={{ display: 'flex', gap: 8, color: 'var(--ink-dim)', fontSize: 14, marginBottom: 7 }}><span style={{ color: 'var(--c-warn)' }}>→</span>{t}</div>)}
        </div>
      </div>
      <div className="bp-card" style={{ padding: 22, marginBottom: 20 }}>
        <div className="mono" style={{ color: 'var(--muted-2)', fontSize: 9, marginBottom: 9 }}>BEST ANSWER FROM THIS SESSION</div>
        <div className="serif" style={{ fontSize: 18, color: 'var(--ink)', fontStyle: 'italic', lineHeight: 1.45 }}>{SUGGESTIONS[2]}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
        <Btn kind="ghost" icon={<Ic.doc />} onClick={onBack}>Practice again</Btn>
        <Btn kind="ghost" icon={<Ic.mic />} onClick={onVoice}>Switch to voice</Btn>
        <Btn kind="ghost" icon={<Ic.upload />} onClick={onUpload}>Upload document</Btn>
        <Btn kind="lime" icon={<Ic.layers />} onClick={onResults}>See updated readiness</Btn>
      </div>
    </div>
  );
}

/* ===== UPLOAD FOR ANALYSIS ===== */
const FILE_TYPES = ['PDF', 'PPT / Slides', 'Screenshot', 'Markdown', 'Transcript', 'Metrics sheet', 'Draft answer', 'Audio note'];
const INTEGRATIONS = ['Google Drive', 'Google Docs', 'Google Slides', 'Notion', 'Slack', 'Confluence', 'Jira', 'Linear', 'Dropbox', 'Zoom transcript'];

function UploadAnalysis({ onBack, onChat, onVoice, onResults }) {
  const [analyzed, setAnalyzed] = useState(false);
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-0)' }} className="bp-grid">
      <TopBar left={<Back onClick={onBack} label="Practice modes" />} center="PRACTICE · UPLOAD FOR ANALYSIS" right={<Pill color="var(--ai)">EVIDENCE CHECK</Pill>} />
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '30px 36px 70px' }} className="fade-up">
        <h1 className="serif" style={{ fontSize: 32, margin: '0 0 4px', color: 'var(--ink)', lineHeight: 1.15 }}>Does your material support the meeting?</h1>
        <p style={{ color: 'var(--muted)', fontSize: 15.5, margin: '0 0 22px', maxWidth: 660, lineHeight: 1.5 }}>Upload a slide, note, screenshot, transcript, or metric. Proben checks whether your answer is supported by evidence.</p>

        <div className="bp-card" style={{ padding: 0, overflow: 'hidden', marginBottom: 14 }}>
          <div style={{ padding: '26px', borderBottom: '1px solid var(--line)' }}>
            <button style={{ width: '100%', padding: '26px', borderRadius: 12, border: '1.5px dashed var(--line-strong)', background: 'var(--inset)', cursor: 'pointer', color: 'var(--muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9 }}>
              <span style={{ fontSize: 26, color: 'var(--ai)', display: 'flex' }}><Ic.upload /></span>
              <span style={{ fontSize: 16, color: 'var(--ink)', fontWeight: 600 }}>Add supporting context</span>
              <span style={{ fontSize: 13.5 }}>Drop a file or paste a link</span>
            </button>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>{FILE_TYPES.map((f) => <span key={f} style={{ padding: '7px 13px', borderRadius: 999, border: '1px solid var(--line)', background: 'var(--panel)', color: 'var(--ink-dim)', fontSize: 13 }}>{f}</span>)}</div>
          </div>
          <div style={{ padding: '18px 26px' }}>
            <div className="mono" style={{ color: 'var(--muted-2)', fontSize: 9, marginBottom: 11 }}>OR CONNECT A SOURCE</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{INTEGRATIONS.map((f) => <span key={f} className="bp-card" style={{ padding: '7px 13px', borderRadius: 8, color: 'var(--ink-dim)', fontSize: 13 }}>{f}</span>)}</div>
          </div>
        </div>

        {/* attached file */}
        <div className="bp-card" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 13, marginBottom: 16 }}>
          <span style={{ width: 36, height: 36, borderRadius: 9, background: 'var(--ai-dim)', color: 'var(--ai)', display: 'grid', placeItems: 'center', fontSize: 16, flex: 'none' }}><Ic.doc /></span>
          <div style={{ flex: 1 }}><div style={{ color: 'var(--ink)', fontSize: 15, fontWeight: 600 }}>Q3-enterprise-deck.pdf</div><div style={{ color: 'var(--muted-2)', fontSize: 12.5 }}>1.4 MB · 8 slides · attached</div></div>
          {!analyzed && <Btn kind="lime" sm icon={<Ic.spark />} onClick={() => setAnalyzed(true)}>Analyze</Btn>}
          {analyzed && <Pill color="var(--lime-deep)" dot={false} style={{ fontSize: 9 }}>ANALYZED</Pill>}
        </div>

        {analyzed && (
          <div className="fade-up">
            <div className="bp-card" style={{ padding: 24, marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}><span style={{ color: 'var(--ai)', fontSize: 17, display: 'flex' }}><Ic.layers /></span><span className="serif" style={{ fontSize: 22, color: 'var(--ink)' }}>Evidence analysis</span></div>
              <div style={{ display: 'grid', gap: 12 }}>
                {[
                  { tone: 'good', q: 'Supports the meeting goal?', a: 'Partly. The deck shows the €1.2M revenue upside, which backs the “why this matters” claim.' },
                  { tone: 'warn', q: 'Is the business logic clear?', a: 'The upside is shown, but the slide doesn’t explain why the validation must happen now.' },
                  { tone: 'good', q: 'Are the numbers strong enough?', a: 'Revenue figure is credible; add the projected activation uplift (12%) to complete it.' },
                  { tone: 'warn', q: 'What context is still missing?', a: 'No timing logic, no success threshold, and no validation owner.' },
                  { tone: 'ai', q: 'Which objection does it answer?', a: 'It answers “what’s the impact?” — but not Dana’s “why now?”.' },
                ].map((r, i) => {
                  const col = r.tone === 'good' ? 'var(--c-good)' : r.tone === 'warn' ? 'var(--c-warn)' : 'var(--ai)';
                  return (
                    <div key={i} style={{ display: 'flex', gap: 12, paddingBottom: 12, borderBottom: i < 4 ? '1px solid var(--line)' : 'none' }}>
                      <span style={{ color: col, fontSize: 15, flex: 'none', marginTop: 2, display: 'flex' }}>{r.tone === 'good' ? <Ic.check /> : r.tone === 'ai' ? <Ic.layers /> : <Ic.warn />}</span>
                      <div><div style={{ color: 'var(--ink)', fontSize: 15.5, fontWeight: 600 }}>{r.q}</div><div style={{ color: 'var(--muted)', fontSize: 14, marginTop: 3, lineHeight: 1.45 }}>{r.a}</div></div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="bp-card" style={{ padding: 20, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ color: 'var(--lime-deep)', fontSize: 17, display: 'flex' }}><Ic.arrow /></span>
              <span style={{ color: 'var(--ink)', fontSize: 15.5, lineHeight: 1.45 }}>In your answer, reference <b>slide 4</b> (revenue upside) and add a single timing line: “enterprise is already blocked.”</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
              <Btn kind="lime" icon={<Ic.doc />} onClick={onChat}>Practice in chat</Btn>
              <Btn kind="ghost" icon={<Ic.mic />} onClick={onVoice}>Practice by voice</Btn>
              <Btn kind="ghost" icon={<Ic.layers />} onClick={onResults}>See updated readiness</Btn>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { ChatSim, UploadAnalysis });
