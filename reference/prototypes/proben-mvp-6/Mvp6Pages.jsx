/* global React, Ic, Pill, Btn, useState, useEffect, useRef */
/* Proben MVP 6 — extra pages: FAQ, API docs, Policy, Terms, and the page assistant. */

/* ===================== FAQ ===================== */
const FAQS = [
  ['Can I use Proben without uploading confidential documents?', 'Yes. Proben works with a plain-English summary, notes, or a draft answer. You can paste only what you’re comfortable sharing.'],
  ['What counts as context?', 'Context can be a rough note, agenda, slide summary, PRD, RFC, ADR, metrics screenshot, customer insight, stakeholder input, codebase note, AI output, meeting transcript, or draft answer. You do not need a perfect document — a few rough sentences are enough for a first readiness check.'],
  ['What counts as one readiness check?', 'One readiness check is one meeting or conversation context analyzed into a readiness score, missing context, top risks, top fixes, likely questions, and one practice moment.'],
  ['Is Proben only for job interviews?', 'No. Job interviews are one use case. Proben is mainly built for high-stakes work conversations: strategy reviews, board updates, client calls, data presentations, conflict conversations, promotion panels, and stakeholder meetings.'],
  ['Does Proben score my personality?', 'No. Proben is not a personality score. It checks meeting readiness: goal clarity, strategic context, evidence, stakeholder risk, and decision ask. Voice delivery is only scored after practice.'],
  ['Can I practice without speaking out loud?', 'Yes. You can start with chat practice. Proben plays the stakeholder, replies to your message, and scores your response. Voice mode is optional.'],
  ['Can I upload slides, PDFs, screenshots, or audio notes?', 'Yes. Proben is designed to work with meeting context from docs, slides, screenshots, audio notes, markdown files, transcripts, and metrics.'],
  ['How is Proben different from a human coach?', 'A human coach gives deep judgment and personal support. Proben is faster and repeatable: a quick readiness check before every meeting, finding missing context, predicting objections, and letting you practice the decisive moment in chat or voice.'],
  ['How is Proben different from a generic AI chat?', 'Generic AI helps rewrite text. Proben follows a readiness flow: it checks strategic context, evidence, stakeholder risk, and decision ask, then turns the gaps into a report and a practice scenario.'],
  ['Will Proben integrate with Google Drive, Notion, Slack, or Jira?', 'Workspace integrations are planned. Today the product shows Google Drive, Docs, Slides, Notion, Slack, Confluence, Jira, Linear, Dropbox, Zoom, and local upload as context sources.'],
  ['Does Proben guarantee a successful meeting?', 'No. Proben helps you prepare, identify gaps, and practice stronger responses. It does not guarantee a specific meeting outcome, promotion, investment, or interview result.'],
];

function FaqList({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div style={{ display: 'grid', gap: 10, maxWidth: 860 }}>
      {items.map(([q, a], i) => {
        const on = open === i;
        return (
          <div key={i} className="bp-card" style={{ padding: 0, overflow: 'hidden' }}>
            <button onClick={() => setOpen(on ? -1 : i)} aria-expanded={on} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
              <span style={{ color: 'var(--ink)', fontSize: 17, fontWeight: 600 }}>{q}</span>
              <span style={{ flex: 'none', color: 'var(--ai)', fontSize: 16, display: 'flex', transform: on ? 'rotate(90deg)' : 'none', transition: 'transform .2s' }}><Ic.chevR /></span>
            </button>
            {on && <div className="fade-in" style={{ padding: '0 24px 22px', color: 'var(--muted)', fontSize: 15.5, lineHeight: 1.6, maxWidth: 720 }}>{a}</div>}
          </div>
        );
      })}
    </div>
  );
}

function FaqSection({ id }) {
  return (
    <section id={id} style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', scrollMarginTop: 96 }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '62px 36px' }}>
        <div style={{ marginBottom: 30, maxWidth: 720 }}>
          <div className="mono" style={{ color: 'var(--ai)', marginBottom: 13, display: 'flex', alignItems: 'center', gap: 9 }}><span style={{ width: 18, height: 1, background: 'var(--bp-line)' }} />FAQ</div>
          <h2 className="serif" style={{ fontSize: 42, margin: 0, color: 'var(--ink)', lineHeight: 1.16 }}>Common questions.</h2>
          <p style={{ color: 'var(--muted)', fontSize: 18, lineHeight: 1.5, marginTop: 16 }}>Readiness checks, privacy, practice modes, and uploaded context.</p>
        </div>
        <FaqList items={FAQS} />
      </div>
    </section>
  );
}

/* ===================== LEGAL LAYOUT ===================== */
function LegalPage({ eyebrow, title, sub, updated, sections }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-0)' }}>
      <div className="bp-grid" style={{ borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '70px 36px 48px' }}>
          <div className="mono" style={{ color: 'var(--ai)', marginBottom: 14 }}>{eyebrow}</div>
          <h1 className="serif" style={{ fontSize: 50, margin: 0, color: 'var(--ink)', lineHeight: 1.08 }}>{title}</h1>
          <p style={{ color: 'var(--muted)', fontSize: 18, lineHeight: 1.5, marginTop: 16, maxWidth: 620 }}>{sub}</p>
          <div style={{ color: 'var(--muted-2)', fontSize: 13, marginTop: 16 }}>Last updated: June 4, 2026</div>
        </div>
      </div>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '40px 36px 80px' }}>
        <div className="bp-card" style={{ padding: '14px 18px', marginBottom: 28, display: 'flex', gap: 10, alignItems: 'center', color: 'var(--muted)', fontSize: 13.5 }}>
          <span style={{ color: 'var(--ai)', fontSize: 15, display: 'flex', flex: 'none' }}><Ic.shield /></span>This is a product summary, not legal advice.
        </div>
        <div style={{ display: 'grid', gap: 30 }}>
          {sections.map((s, i) => (
            <div key={i}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 10 }}>
                <span className="mono" style={{ color: 'var(--lime-deep)', fontSize: 12, flex: 'none' }}>{String(i + 1).padStart(2, '0')}</span>
                <h2 className="serif" style={{ fontSize: 24, margin: 0, color: 'var(--ink)', lineHeight: 1.2 }}>{s[0]}</h2>
              </div>
              <p style={{ color: 'var(--ink-dim)', fontSize: 16, lineHeight: 1.65, margin: 0, paddingLeft: 30 }}>{s[1]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PolicyPage() {
  return <LegalPage eyebrow="PRIVACY & SECURITY" title="Privacy & Security" sub="How Proben handles meeting context, uploaded materials, and workspace integrations." sections={[
    ['What you can upload', 'You can paste raw context, notes, drafts, meeting briefs, screenshots, slides, PDFs, markdown files, transcripts, and metrics. Bring as much or as little as you want.'],
    ['You control what you share', 'Proben can work from a plain-English summary. You do not need to upload confidential documents to get value — a short description of the meeting is enough to start.'],
    ['How uploaded context is used', 'Uploaded context is used to generate your readiness analysis: missing-context prompts, risks, fixes, likely questions, and practice scenarios. It is not used to score your personality.'],
    ['Sensitive information', 'Avoid uploading secrets, passwords, private keys, confidential customer data, personal data, or regulated information unless your company policy allows it. When in doubt, summarize instead of uploading.'],
    ['Workspace integrations', 'Planned and optional integrations include Google Drive, Google Docs, Google Slides, Notion, Slack, Confluence, Jira, Linear, Dropbox, Zoom, and local uploads. Integrations are opt-in.'],
    ['Data retention', 'Retention settings will depend on the selected plan and workspace configuration. You will be able to delete a readiness check and its uploaded materials.'],
    ['Security controls', 'Authentication, access control, encryption in transit, limited internal access, auditability, and workspace permissions are part of the security model.'],
    ['Contact', 'Questions about privacy or security? Reach us at security@proben.io.'],
  ]} />;
}

function TermsPage() {
  return <LegalPage eyebrow="TERMS OF USE" title="Terms of Use" sub="Rules and responsibilities for using Proben." sections={[
    ['Acceptance of terms', 'By using Proben you agree to these terms. If you use Proben on behalf of an organization, you accept these terms for that organization.'],
    ['Account registration', 'Some features require an account. You are responsible for keeping your credentials secure and for activity under your account.'],
    ['Acceptable use', 'Use Proben for legitimate meeting preparation. Do not misuse the service, attempt to break security, or upload content you do not have the right to share.'],
    ['Uploaded content', 'You retain ownership of the context you upload. You grant Proben permission to process it solely to generate your readiness analysis and practice scenarios.'],
    ['AI-generated recommendations', 'Readiness reports, fixes, and practice feedback are generated suggestions. Use your own judgment before acting on them.'],
    ['No guarantee of meeting outcome', 'Proben provides readiness analysis and practice recommendations, but it does not guarantee a specific meeting, interview, promotion, funding, or business outcome.'],
    ['Billing and subscriptions', 'Paid plans renew until cancelled. Pricing and plan features are described on the pricing section and may change with notice.'],
    ['API usage', 'API access is subject to authentication, rate limits, and fair use. Do not resell raw API access without permission.'],
    ['Service availability', 'We aim for high availability but do not guarantee uninterrupted service. Features may change as the product evolves.'],
    ['Limitation of liability', 'To the extent permitted by law, Proben is not liable for indirect or consequential damages arising from use of the service.'],
    ['Changes to terms', 'We may update these terms. Material changes will be reflected by the “last updated” date above.'],
    ['Contact', 'Questions about these terms? Reach us at legal@proben.io.'],
  ]} />;
}

/* ===================== API DOCS ===================== */
const API_NAV = [
  ['GETTING STARTED', [['Overview', 'overview'], ['Authentication', 'auth'], ['Usage & limits', 'limits']]],
  ['PROBEN API', [['Intro to Proben API', 'intro'], ['Create readiness check', 'create'], ['Get readiness report', 'report'], ['Start practice session', 'practice'], ['Submit practice response', 'respond'], ['List readiness checks', 'list']]],
  ['OPERATIONS', [['Status codes', 'status'], ['Errors', 'errors'], ['Rate limits', 'rate'], ['Webhooks — soon', 'hooks']]],
];
const CREATE_REQ = `{
  "meetingType": "strategy_review",
  "title": "Enterprise roadmap validation",
  "goal": "Get approval for a narrow two-week validation",
  "stakeholders": [
    {
      "name": "Dana",
      "role": "VP Product",
      "attitude": "skeptical",
      "caresAbout": ["business impact", "timing", "team capacity"],
      "likelyObjection": "Why now? We already have too many commitments."
    }
  ],
  "context": {
    "summary": "Validate the enterprise segment before reopening the roadmap.",
    "materials": [
      { "type": "markdown", "name": "meeting-brief.md" },
      { "type": "slides", "name": "strategy-review.pptx" }
    ]
  }
}`;
const CREATE_RES = `{
  "checkId": "chk_123",
  "status": "processing",
  "createdAt": "2026-06-04T12:00:00Z"
}`;
const REPORT_RES = `{
  "checkId": "chk_123",
  "readinessScore": 6.2,
  "status": "partly_ready",
  "signals": {
    "goalClarity": 8.0,
    "strategicContext": 5.8,
    "evidenceStrength": 6.0,
    "stakeholderRisk": 5.5,
    "decisionAsk": 5.2
  },
  "missingContext": [
    "Business impact is unclear",
    "Decision threshold is missing",
    "Stakeholder concern is underdefined"
  ],
  "topFixes": [
    "Add a business-impact number",
    "Define a clear success threshold",
    "Frame the validation as risk management"
  ],
  "practiceMoment": {
    "stakeholder": "Dana",
    "prompt": "Why now? We already have too many commitments.",
    "recommendedMode": "chat"
  }
}`;
const ENDPOINTS = [
  ['POST', '/api/v1/readiness-checks'],
  ['GET', '/api/v1/readiness-checks/{checkId}'],
  ['GET', '/api/v1/readiness-checks/{checkId}/report'],
  ['POST', '/api/v1/readiness-checks/{checkId}/practice-sessions'],
  ['POST', '/api/v1/practice-sessions/{sessionId}/responses'],
  ['GET', '/api/v1/readiness-checks'],
];

function CodeBlock({ title, code, lang }) {
  const [copied, setCopied] = useState(false);
  const langs = ['Shell', 'Node', 'Python'];
  const [active, setActive] = useState(lang || 'Node');
  const copy = () => { try { navigator.clipboard.writeText(code); } catch (e) {} setCopied(true); setTimeout(() => setCopied(false), 1500); };
  return (
    <div style={{ borderRadius: 12, border: '1px solid var(--bp-line)', background: 'var(--card-2)', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px 8px 14px', borderBottom: '1px solid var(--line)', background: 'var(--inset)' }}>
        {title ? <span className="mono" style={{ color: 'var(--muted)', fontSize: 10 }}>{title}</span> : (
          <div style={{ display: 'flex', gap: 3 }}>{langs.map((l) => <button key={l} onClick={() => setActive(l)} style={{ padding: '5px 10px', borderRadius: 7, cursor: 'pointer', border: 'none', fontFamily: 'var(--mono)', fontSize: 11, background: active === l ? 'var(--bp)' : 'transparent', color: active === l ? '#fff' : 'var(--muted)' }}>{l}</button>)}</div>
        )}
        <button onClick={copy} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 9px', borderRadius: 7, border: '1px solid var(--line)', background: 'var(--panel)', color: 'var(--ink-dim)', fontFamily: 'var(--sans)', fontSize: 11.5, cursor: 'pointer' }}><span style={{ fontSize: 12, display: 'flex' }}><Ic.check /></span>{copied ? 'Copied' : 'Copy'}</button>
      </div>
      <pre style={{ margin: 0, padding: '16px 18px', overflowX: 'auto', fontFamily: 'var(--mono)', fontSize: 12.5, lineHeight: 1.6, color: 'var(--ink-dim)' }}>{code}</pre>
    </div>
  );
}

function ApiPage() {
  const [active, setActive] = useState('create');
  const go = (id) => { setActive(id); const el = document.getElementById('api-' + id); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 110, behavior: 'smooth' }); };
  const Method = ({ m }) => <span className="mono" style={{ fontSize: 10, padding: '3px 8px', borderRadius: 6, fontWeight: 600, color: m === 'GET' ? 'var(--ai)' : 'var(--lime-deep)', background: m === 'GET' ? 'var(--ai-dim)' : 'var(--lime-glow)', border: '1px solid ' + (m === 'GET' ? 'color-mix(in srgb,var(--ai) 30%,transparent)' : 'color-mix(in srgb,var(--lime-deep) 30%,transparent)') }}>{m}</span>;
  const Block = ({ id, title, children }) => (
    <div id={'api-' + id} style={{ scrollMarginTop: 110, marginBottom: 40 }}>
      <h2 className="serif" style={{ fontSize: 28, color: 'var(--ink)', margin: '0 0 14px', lineHeight: 1.2 }}>{title}</h2>
      {children}
    </div>
  );
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-0)' }} className="bp-grid">
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '40px 36px 70px', display: 'grid', gridTemplateColumns: '220px 1fr 380px', gap: 32, alignItems: 'start' }}>
        {/* sidebar */}
        <nav style={{ position: 'sticky', top: 96, display: 'grid', gap: 22 }}>
          {API_NAV.map((grp, i) => (
            <div key={i}>
              <div className="mono" style={{ color: 'var(--muted-2)', fontSize: 9, marginBottom: 10 }}>{grp[0]}</div>
              <div style={{ display: 'grid', gap: 3 }}>
                {grp[1].map(([label, id]) => (
                  <button key={id} onClick={() => go(id)} style={{ textAlign: 'left', padding: '7px 11px', borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: 13.5, background: active === id ? 'var(--lime-glow)' : 'none', color: active === id ? 'var(--lime-deep)' : 'var(--muted)', fontWeight: active === id ? 600 : 400 }}>{label}</button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* main */}
        <main style={{ minWidth: 0 }}>
          <div className="mono" style={{ color: 'var(--muted-2)', fontSize: 10, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>PROBEN API <span style={{ opacity: 0.5 }}>/</span> API REFERENCE <span style={{ opacity: 0.5 }}>/</span> <span style={{ color: 'var(--ai)' }}>CREATE READINESS CHECK</span></div>
          <h1 className="serif" style={{ fontSize: 46, color: 'var(--ink)', margin: '0 0 12px', lineHeight: 1.08 }}>Proben API</h1>
          <p style={{ color: 'var(--muted)', fontSize: 18, lineHeight: 1.55, margin: '0 0 14px', maxWidth: 620 }}>Create readiness checks, upload meeting context, retrieve reports, and start practice sessions from your own product.</p>
          <p style={{ color: 'var(--ink-dim)', fontSize: 15.5, lineHeight: 1.6, margin: '0 0 36px', maxWidth: 640 }}>Use the Proben API to turn meeting context into readiness scores, missing context, likely objections, top fixes, and practice moments.</p>

          <Block id="overview" title="Overview">
            <div className="bp-card" style={{ padding: 0, overflow: 'hidden', marginBottom: 14 }}>
              {ENDPOINTS.map((e, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: i < ENDPOINTS.length - 1 ? '1px solid var(--line)' : 'none' }}>
                  <Method m={e[0]} /><code style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink-dim)' }}>{e[1]}</code>
                </div>
              ))}
            </div>
          </Block>

          <Block id="auth" title="Authentication">
            <p style={{ color: 'var(--ink-dim)', fontSize: 15.5, lineHeight: 1.6, marginBottom: 14 }}>Authenticate with a bearer token in the <code style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ai)' }}>Authorization</code> header. Keep your key server-side.</p>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
              <input placeholder="pk_live_••••••••••••••••" style={{ flex: 1, padding: '11px 14px', borderRadius: 9, border: '1px solid var(--line)', background: 'var(--inset)', color: 'var(--ink)', fontFamily: 'var(--mono)', fontSize: 13 }} />
              <Btn kind="ghost" sm>Try it</Btn>
            </div>
          </Block>

          <Block id="limits" title="Usage & limits">
            <p style={{ color: 'var(--ink-dim)', fontSize: 15.5, lineHeight: 1.6 }}>Free keys are rate-limited to a small number of readiness checks per day. Pro and Team plans raise limits and unlock practice sessions and source uploads.</p>
          </Block>

          <Block id="create" title="Create readiness check"><div style={{ marginBottom: 12, display: 'flex', gap: 10, alignItems: 'center' }}><Method m="POST" /><code style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink-dim)' }}>/api/v1/readiness-checks</code></div><p style={{ color: 'var(--ink-dim)', fontSize: 15.5, lineHeight: 1.6 }}>Submit meeting type, goal, stakeholders, and context. Returns a check id you can poll for the report.</p></Block>
          <Block id="report" title="Get readiness report"><div style={{ marginBottom: 12, display: 'flex', gap: 10, alignItems: 'center' }}><Method m="GET" /><code style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink-dim)' }}>/api/v1/readiness-checks/{'{checkId}'}/report</code></div><p style={{ color: 'var(--ink-dim)', fontSize: 15.5, lineHeight: 1.6 }}>Returns the readiness score, five signals, missing context, top fixes, likely questions, and the suggested practice moment.</p></Block>
          <Block id="practice" title="Start practice session"><div style={{ marginBottom: 12, display: 'flex', gap: 10, alignItems: 'center' }}><Method m="POST" /><code style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink-dim)' }}>/api/v1/readiness-checks/{'{checkId}'}/practice-sessions</code></div><p style={{ color: 'var(--ink-dim)', fontSize: 15.5, lineHeight: 1.6 }}>Start a chat or voice practice session against the stakeholder practice agent for the decisive moment.</p></Block>
          <Block id="respond" title="Submit practice response"><div style={{ marginBottom: 12, display: 'flex', gap: 10, alignItems: 'center' }}><Method m="POST" /><code style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink-dim)' }}>/api/v1/practice-sessions/{'{sessionId}'}/responses</code></div><p style={{ color: 'var(--ink-dim)', fontSize: 15.5, lineHeight: 1.6 }}>Submit a reply. Returns coaching on clarity, strategic context, evidence, stakeholder handling, decision ask, and an updated readiness estimate.</p></Block>
          <Block id="list" title="List readiness checks"><div style={{ marginBottom: 12, display: 'flex', gap: 10, alignItems: 'center' }}><Method m="GET" /><code style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink-dim)' }}>/api/v1/readiness-checks</code></div><p style={{ color: 'var(--ink-dim)', fontSize: 15.5, lineHeight: 1.6 }}>List previous readiness checks with status and score.</p></Block>

          <Block id="status" title="Status codes"><p style={{ color: 'var(--ink-dim)', fontSize: 15.5, lineHeight: 1.6 }}>200 OK · 201 Created · 202 Accepted (processing) · 400 Bad request · 401 Unauthorized · 429 Rate limited · 500 Server error.</p></Block>
          <Block id="errors" title="Errors"><p style={{ color: 'var(--ink-dim)', fontSize: 15.5, lineHeight: 1.6 }}>Errors return a JSON body with <code style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ai)' }}>error.code</code> and <code style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ai)' }}>error.message</code>.</p></Block>
          <Block id="rate" title="Rate limits"><p style={{ color: 'var(--ink-dim)', fontSize: 15.5, lineHeight: 1.6 }}>Rate limits are returned in <code style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ai)' }}>X-RateLimit-*</code> headers. A 429 includes a retry hint.</p></Block>
          <Block id="hooks" title="Webhooks — coming soon"><p style={{ color: 'var(--muted)', fontSize: 15.5, lineHeight: 1.6 }}>Subscribe to <code style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ai)' }}>readiness.completed</code> events to know when a report is ready. Planned.</p></Block>
        </main>

        {/* sticky code panel */}
        <aside style={{ position: 'sticky', top: 96, display: 'grid', gap: 14 }}>
          <CodeBlock code={'curl https://api.proben.io/v1/readiness-checks \\\n  -H "Authorization: Bearer $PROBEN_KEY" \\\n  -d @check.json'} lang="Shell" />
          <CodeBlock title="REQUEST · CREATE READINESS CHECK" code={CREATE_REQ} />
          <CodeBlock title="RESPONSE · 202 ACCEPTED" code={CREATE_RES} />
          <CodeBlock title="RESPONSE · READINESS REPORT" code={REPORT_RES} />
        </aside>
      </div>
    </div>
  );
}

/* ===================== ASK ABOUT THIS PAGE ===================== */
const PROMPTS = {
  home: ['What does Proben actually do?', 'How is this different from a generic AI chat?', 'Can I use it without uploading documents?', 'What do I get in 3 minutes?'],
  blog: ['What topics does the blog cover?', 'Where do I start?'],
  changelog: ['What changed recently?', 'What is coming next?'],
  api: ['How do I create a readiness check?', 'What payload should I send?', 'How do I get the readiness report?'],
  policy: ['Do I need to upload sensitive documents?', 'How is uploaded context used?', 'What integrations are planned?'],
  terms: ['Does Proben guarantee outcomes?', 'What are my responsibilities?'],
  post: ['Summarize this article', 'How does this apply to my meeting?'],
};
const ANSWERS = {
  'What does Proben actually do?': 'Proben checks whether you’re ready for an important meeting: it finds missing business context, likely objections, top fixes, and the one answer worth practicing.',
  'How is this different from a generic AI chat?': 'Generic AI rewrites text. Proben follows a readiness flow — it scores strategic context, evidence, stakeholder risk, and decision ask, then turns the gaps into a report and a practice scenario.',
  'Can I use it without uploading documents?': 'Yes. Proben works from a plain-English summary. Paste only what you’re comfortable sharing.',
  'What do I get in 3 minutes?': 'A readiness score, missing context, top 3 risks, top 3 fixes, likely questions, and one practice moment.',
  'How do I create a readiness check?': 'Send a POST to /api/v1/readiness-checks with meetingType, goal, stakeholders, and context. You get back a checkId to poll for the report.',
  'What payload should I send?': 'A JSON body with meetingType, title, goal, a stakeholders array, and a context object (summary + optional materials). See the request example on this page.',
  'How do I get the readiness report?': 'GET /api/v1/readiness-checks/{checkId}/report — it returns the score, five signals, missing context, top fixes, and the practice moment.',
  'Do I need to upload sensitive documents?': 'No. A plain-English summary is enough. Avoid uploading secrets or regulated data unless your company policy allows it.',
  'How is uploaded context used?': 'Only to generate your readiness analysis — missing context, risks, fixes, likely questions, and practice scenarios. It is not a personality score.',
  'What integrations are planned?': 'Google Drive, Docs, Slides, Notion, Slack, Confluence, Jira, Linear, Dropbox, Zoom, and local upload — shown today as planned/prototype inputs.',
  'Does Proben guarantee outcomes?': 'No. Proben helps you prepare and practice, but it does not guarantee a specific meeting, interview, promotion, or funding outcome.',
  'What are my responsibilities?': 'Use Proben for legitimate prep, keep your account secure, and only upload content you have the right to share.',
  'What changed recently?': 'Recent updates: chat practice mode, a report that separates strategic context from evidence, and uploads for PDFs, slides, screenshots, and audio notes.',
  'What is coming next?': 'Planned: Google Drive and Notion as live context sources, plus API webhooks.',
};

function PageAssistant({ pageId, pageTitle }) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [draft, setDraft] = useState('');
  const threadRef = useRef(null);
  const prompts = PROMPTS[pageId] || PROMPTS.home;
  useEffect(() => { setMsgs([]); }, [pageId]);
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey);
  }, []);
  useEffect(() => { if (threadRef.current) threadRef.current.scrollTop = threadRef.current.scrollHeight; }, [msgs]);
  const ask = (q) => {
    const a = ANSWERS[q] || 'I don’t see that on this page yet. Try one of the suggested questions, or check the page content directly.';
    setMsgs((m) => [...m, { who: 'me', t: q }, { who: 'ai', t: a }]);
    setDraft('');
  };
  return (
    <div style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 80 }}>
      {open && (
        <div className="pop-in" role="dialog" aria-label="Ask about this page" style={{ position: 'absolute', bottom: 56, right: 0, width: 360, maxWidth: '90vw', maxHeight: '70vh', display: 'flex', flexDirection: 'column', background: 'var(--pop-bg)', border: '1px solid var(--bp-line)', borderRadius: 16, boxShadow: 'var(--shadow-pop)', overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
            <div>
              <div style={{ color: 'var(--ink)', fontSize: 15, fontWeight: 600 }}>Ask about this page</div>
              <div style={{ color: 'var(--muted-2)', fontSize: 11.5, marginTop: 2 }}>Context: {pageTitle}</div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', display: 'flex', fontSize: 16 }}><Ic.x /></button>
          </div>
          <div ref={threadRef} style={{ flex: 1, overflowY: 'auto', padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {msgs.length === 0 && (
              <div style={{ display: 'grid', gap: 8 }}>
                <div style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.5, marginBottom: 2 }}>Get help with this Proben page. Try:</div>
                {prompts.map((p, i) => <button key={i} onClick={() => ask(p)} style={{ textAlign: 'left', padding: '10px 13px', borderRadius: 10, border: '1px solid var(--line)', background: 'var(--inset)', color: 'var(--ink-dim)', fontFamily: 'var(--sans)', fontSize: 13.5, cursor: 'pointer' }}>{p}</button>)}
              </div>
            )}
            {msgs.map((m, i) => (
              <div key={i} style={{ alignSelf: m.who === 'me' ? 'flex-end' : 'flex-start', maxWidth: '88%', padding: '10px 13px', borderRadius: m.who === 'me' ? '12px 12px 3px 12px' : '12px 12px 12px 3px', background: m.who === 'me' ? 'var(--lime-glow)' : 'var(--inset)', border: '1px solid ' + (m.who === 'me' ? 'color-mix(in srgb,var(--lime-deep) 25%,transparent)' : 'var(--line)'), color: 'var(--ink)', fontSize: 14, lineHeight: 1.5 }}>{m.t}</div>
            ))}
          </div>
          <div style={{ padding: 12, borderTop: '1px solid var(--line)' }}>
            <form onSubmit={(e) => { e.preventDefault(); if (draft.trim()) ask(draft.trim()); }} style={{ display: 'flex', gap: 8 }}>
              <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Ask a question about this page…" style={{ flex: 1, padding: '10px 13px', borderRadius: 10, border: '1px solid var(--line)', background: 'var(--inset)', color: 'var(--ink)', fontFamily: 'var(--sans)', fontSize: 13.5 }} />
              <button type="submit" aria-label="Send" style={{ flex: 'none', width: 38, borderRadius: 10, border: 'none', background: 'var(--lime)', color: 'var(--cta-ink)', cursor: 'pointer', display: 'grid', placeItems: 'center', fontSize: 15 }}><Ic.arrow /></button>
            </form>
            <div style={{ color: 'var(--muted-2)', fontSize: 10.5, marginTop: 8, lineHeight: 1.4 }}>AI answers may be incomplete. Check the page content before making decisions.</div>
          </div>
        </div>
      )}
      <button onClick={() => setOpen(!open)} className="bp-card" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '11px 16px', borderRadius: 999, cursor: 'pointer', boxShadow: 'var(--shadow-pop)', color: 'var(--ink)', fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 600 }}>
        <span style={{ color: 'var(--ai)', fontSize: 16, display: 'flex' }}><Ic.spark /></span>Ask about this page
      </button>
    </div>
  );
}

Object.assign(window, { FAQS, FaqList, FaqSection, PolicyPage, TermsPage, LegalPage, ApiPage, PageAssistant });
