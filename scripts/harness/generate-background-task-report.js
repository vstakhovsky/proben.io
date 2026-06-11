#!/usr/bin/env node

/**
 * Background Task Report Generator
 * 
 * Generates an HTML dashboard report showing agent harness workflow status,
 * phases, gates, roles, evidence, KPIs, and next steps.
 * 
 * Usage:
 *   node scripts/harness/generate-background-task-report.js
 * 
 * Output:
 *   test-results/harness/latest/background-task-report.html
 */

const fs = require('fs');
const path = require('path');

const RESULTS_DIR = path.join(process.cwd(), 'test-results', 'harness');
const LATEST_DIR = path.join(RESULTS_DIR, 'latest');
const REPORT_PATH = path.join(LATEST_DIR, 'background-task-report.html');

// Ensure directory exists
if (!fs.existsSync(LATEST_DIR)) {
  fs.mkdirSync(LATEST_DIR, { recursive: true });
}

// Sample data (in real implementation, this would read from state files)
const workflowData = {
  workflowName: 'Phase 2.1 Design Parity',
  status: 'RUNNING',
  startedAt: '2026-06-10T18:00:00Z',
  currentPhase: 'IMPLEMENT',
  phases: [
    {
      name: 'IMPLEMENT',
      role: 'Implementer (Level 1 - Builder)',
      status: 'RUNNING',
      entryCriteria: [
        { name: 'Visual plan approved', status: true },
        { name: 'Requirements defined', status: true },
        { name: 'Test plan ready', status: true }
      ],
      exitCriteria: [
        { name: 'Implementation complete', status: false },
        { name: 'Tests passing locally', status: false },
        { name: 'Evidence capture helpers ready', status: false }
      ],
      evidenceArtifacts: [
        { name: 'Code implementation', status: 'pending' },
        { name: 'Test files', status: 'pending' },
        { name: 'Local test results', status: 'pending' }
      ],
      gate: { name: 'Implementation complete → VERIFY', status: 'pending' }
    },
    {
      name: 'VERIFY',
      role: 'Verifier (Level 1 - Verification)',
      status: 'PENDING',
      entryCriteria: [
        { name: 'IMPLEMENT state complete', status: false },
        { name: 'Implementation ready for verification', status: false }
      ],
      exitCriteria: [
        { name: 'All proof manifests PASSED', status: false },
        { name: 'SHA-256 hashes verified', status: false },
        { name: 'Evidence complete', status: false },
        { name: 'No blockers found', status: false }
      ],
      evidenceArtifacts: [
        { name: 'typecheck.log', status: 'pending' },
        { name: 'tests.log', status: 'pending' },
        { name: 'build.log', status: 'pending' },
        { name: 'proof-manifest.json', status: 'pending' },
        { name: 'screenshots', status: 'pending' },
        { name: 'dom-blocker-results.json', status: 'pending' }
      ],
      gate: { name: 'All proof manifests PASSED → REVIEW', status: 'pending' }
    },
    {
      name: 'REVIEW',
      role: 'Reviewer (Level 2 - Principal Reviewer)',
      status: 'PENDING',
      entryCriteria: [
        { name: 'VERIFY state complete', status: false },
        { name: 'All proof manifests PASSED', status: false },
        { name: 'Evidence complete', status: false }
      ],
      exitCriteria: [
        { name: 'Review complete', status: false },
        { name: 'Verdict documented', status: false },
        { name: 'Evidence verified', status: false }
      ],
      evidenceArtifacts: [
        { name: 'Review verdict', status: 'pending' },
        { name: 'Blocker list', status: 'pending' },
        { name: 'Evidence verification report', status: 'pending' },
        { name: 'Risk score', status: 'pending' }
      ],
      gate: { name: 'ACCEPTED → CLOSE', status: 'pending' }
    },
    {
      name: 'CLOSE',
      role: 'Closer (Level 3 - CTO Bar Raiser)',
      status: 'PENDING',
      entryCriteria: [
        { name: 'REVIEW state complete', status: false },
        { name: 'Review verdict: ACCEPTED', status: false },
        { name: 'Evidence package complete', status: false }
      ],
      exitCriteria: [
        { name: 'All gates passed', status: false },
        { name: 'Evidence verified', status: false },
        { name: 'Human approval recorded', status: false },
        { name: 'Harness report generated', status: false }
      ],
      evidenceArtifacts: [
        { name: 'Close validation report', status: 'pending' },
        { name: 'Evidence package verification', status: 'pending' },
        { name: 'Human approval record', status: 'pending' },
        { name: 'Harness report', status: 'pending' }
      ],
      gate: { name: 'CLOSE complete → RETRO', status: 'pending' }
    },
    {
      name: 'RETRO',
      role: 'Retro (Level 4 - System Governance)',
      status: 'PENDING',
      entryCriteria: [
        { name: 'CLOSE state complete', status: false },
        { name: 'Evidence package complete', status: false }
      ],
      exitCriteria: [
        { name: 'Retro entry written', status: false },
        { name: 'Learning documented', status: false },
        { name: 'Eval cases updated', status: false },
        { name: 'Gates updated', status: false }
      ],
      evidenceArtifacts: [
        { name: 'Retro entry', status: 'pending' },
        { name: 'Eval cases', status: 'pending' },
        { name: 'Gate updates', status: 'pending' },
        { name: 'Gotcha updates', status: 'pending' }
      ],
      gate: { name: 'RETRO complete → DONE', status: 'pending' }
    },
    {
      name: 'DONE',
      role: 'Final State',
      status: 'PENDING',
      entryCriteria: [],
      exitCriteria: [
        { name: 'Slice accepted', status: false },
        { name: 'All gates passed', status: false },
        { name: 'Evidence complete', status: false },
        { name: 'Retro documented', status: false }
      ],
      evidenceArtifacts: [],
      gate: null
    }
  ],
  kpis: [
    { name: 'False PASS Rate', target: '0', current: 'Measuring', status: 'tracking' },
    { name: 'Evidence Completeness', target: '100%', current: '100% required', status: 'tracking' },
    { name: 'Revision Loops', target: '≤ 2', current: '0', status: 'within-budget' },
    { name: 'Skill Usefulness', target: 'Measured by evals', current: 'Measuring', status: 'tracking' }
  ],
  slices: [
    {
      name: 'Slice A: Phase 2.1 Header/Navigation Parity',
      status: 'RUNNING',
      phase: 'IMPLEMENT',
      target: 'Proben MVP 6 visual direction',
      revisionCount: 0,
      revisionBudget: 2,
      blocker: 'Generic SaaS output rejection'
    },
    {
      name: 'Slice B: Phase 2.1 Hero Section Parity',
      status: 'BLOCKED',
      phase: null,
      target: 'Proben MVP 6 visual direction',
      revisionCount: 0,
      revisionBudget: 2,
      blocker: 'Slice A must pass harness before Slice B can start'
    }
  ],
  retroNotes: [
    'BLD-008 — Replace Agent Sprawl with Case-Inspired State Machine and Evidence Gates (2026-06-10)',
    'BLD-007 — AI Build Speed Requires Experimentation Infrastructure (2026-06-10)',
    'BLD-006 — Agent Sprawl Creates Process Noise (2026-06-10)'
  ],
  nextSteps: [
    'For Slice A: Complete IMPLEMENT phase, proceed to VERIFY phase, generate proof manifests, capture visual evidence, submit for REVIEW',
    'For Slice B: BLOCKED — Wait for Slice A to pass harness'
  ]
};

// Generate HTML report
function generateHTML(data) {
  const statusColors = {
    'RUNNING': '#3B82F6',
    'BLOCKED': '#EF4444',
    'NEEDS_REWORK': '#F59E0B',
    'ACCEPTED': '#10B981',
    'REJECTED': '#EF4444',
    'PENDING': '#6B7280',
    'tracking': '#F59E0B',
    'within-budget': '#10B981',
    'over-budget': '#EF4444'
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'RUNNING': return '🔄';
      case 'BLOCKED': return '🚫';
      case 'NEEDS_REWORK': return '⚠️';
      case 'ACCEPTED': return '✅';
      case 'REJECTED': return '❌';
      case 'PENDING': return '⏳';
      default: return '•';
    }
  };

  const getCriteriaIcon = (status) => {
    return status ? '✅' : '⏳';
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Background Task Report — ${data.workflowName}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: #0f172a;
      color: #e2e8f0;
      line-height: 1.6;
      padding: 20px;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
    }

    .header {
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 24px;
    }

    .header h1 {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 8px;
      color: #f1f5f9;
    }

    .workflow-status {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 16px;
    }

    .workflow-info {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      font-size: 13px;
      color: #94a3b8;
    }

    .workflow-info div strong {
      color: #cbd5e1;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 20px;
      margin-bottom: 24px;
    }

    .card {
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 0;
    }

    .card-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 16px;
      color: #f1f5f9;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .phase-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .phase {
      border: 1px solid #334155;
      border-radius: 8px;
      padding: 16px;
      background: rgba(15, 23, 42, 0.5);
    }

    .phase.active {
      border-color: #3b82f6;
      background: rgba(59, 130, 246, 0.1);
    }

    .phase-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .phase-name {
      font-size: 14px;
      font-weight: 600;
      color: #f1f5f9;
    }

    .phase-status {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 500;
    }

    .phase-role {
      font-size: 12px;
      color: #94a3b8;
      margin-bottom: 12px;
    }

    .criteria-section {
      margin-bottom: 12px;
    }

    .criteria-title {
      font-size: 12px;
      font-weight: 500;
      color: #cbd5e1;
      margin-bottom: 8px;
    }

    .criteria-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .criteria-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      color: #94a3b8;
    }

    .evidence-section {
      margin-bottom: 12px;
    }

    .evidence-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .evidence-item {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 10px;
      background: rgba(100, 116, 139, 0.2);
      border: 1px solid #334155;
    }

    .evidence-item.ready {
      background: rgba(16, 185, 129, 0.2);
      border-color: #10b981;
    }

    .gate {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px;
      background: rgba(59, 130, 246, 0.1);
      border: 1px solid #334155;
      border-radius: 6px;
      font-size: 11px;
      color: #cbd5e1;
    }

    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 12px;
    }

    .kpi-card {
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid #334155;
      border-radius: 8px;
      padding: 12px;
      text-align: center;
    }

    .kpi-name {
      font-size: 11px;
      color: #94a3b8;
      margin-bottom: 4px;
    }

    .kpi-value {
      font-size: 18px;
      font-weight: 600;
      color: #f1f5f9;
      margin-bottom: 2px;
    }

    .kpi-target {
      font-size: 10px;
      color: #64748b;
    }

    .slice-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .slice {
      border: 1px solid #334155;
      border-radius: 8px;
      padding: 12px;
      background: rgba(15, 23, 42, 0.5);
    }

    .slice-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .slice-name {
      font-size: 13px;
      font-weight: 600;
      color: #f1f5f9;
    }

    .slice-status {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 500;
    }

    .slice-info {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 8px;
      font-size: 11px;
      color: #94a3b8;
    }

    .slice-blocker {
      margin-top: 8px;
      padding: 8px;
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid #dc2626;
      border-radius: 6px;
      font-size: 11px;
      color: #fca5a5;
    }

    .retro-notes {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .retro-note {
      padding: 8px 12px;
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid #334155;
      border-radius: 6px;
      font-size: 11px;
      color: #94a3b8;
    }

    .next-steps {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .next-step {
      padding: 8px 12px;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid #059669;
      border-radius: 6px;
      font-size: 11px;
      color: #6ee7b7;
    }

    .next-step.blocked {
      background: rgba(239, 68, 68, 0.1);
      border-color: #dc2626;
      color: #fca5a5;
    }

    .footer {
      text-align: center;
      padding: 20px;
      color: #64748b;
      font-size: 12px;
    }

    .footer a {
      color: #94a3b8;
      text-decoration: none;
    }

    .footer a:hover {
      color: #cbd5e1;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Background Task Report</h1>
      <div class="workflow-status" style="background: ${statusColors[data.status]}20; color: ${statusColors[data.status]}; border: 1px solid ${statusColors[data.status]};">
        ${getStatusIcon(data.status)} ${data.status}
      </div>
      <div class="workflow-info">
        <div><strong>Workflow:</strong> ${data.workflowName}</div>
        <div><strong>Started:</strong> ${new Date(data.startedAt).toLocaleString()}</div>
        <div><strong>Current Phase:</strong> ${data.currentPhase}</div>
        <div><strong>Generated:</strong> ${new Date().toLocaleString()}</div>
      </div>
    </div>

    <div class="grid">
      <div class="card">
        <div class="card-title">📋 Workflow Phases</div>
        <div class="phase-list">
          ${data.phases.map(phase => `
            <div class="phase ${phase.status === 'RUNNING' ? 'active' : ''}">
              <div class="phase-header">
                <div class="phase-name">${phase.name}</div>
                <div class="phase-status" style="background: ${statusColors[phase.status]}20; color: ${statusColors[phase.status]}; border: 1px solid ${statusColors[phase.status]};">
                  ${getStatusIcon(phase.status)} ${phase.status}
                </div>
              </div>
              <div class="phase-role">${phase.role}</div>
              ${phase.entryCriteria.length > 0 ? `
                <div class="criteria-section">
                  <div class="criteria-title">Entry Criteria</div>
                  <div class="criteria-list">
                    ${phase.entryCriteria.map(c => `
                      <div class="criteria-item">${getCriteriaIcon(c.status)} ${c.name}</div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
              ${phase.exitCriteria.length > 0 ? `
                <div class="criteria-section">
                  <div class="criteria-title">Exit Criteria</div>
                  <div class="criteria-list">
                    ${phase.exitCriteria.map(c => `
                      <div class="criteria-item">${getCriteriaIcon(c.status)} ${c.name}</div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
              ${phase.evidenceArtifacts.length > 0 ? `
                <div class="evidence-section">
                  <div class="criteria-title">Evidence Artifacts</div>
                  <div class="evidence-list">
                    ${phase.evidenceArtifacts.map(e => `
                      <div class="evidence-item ${e.status === 'ready' ? 'ready' : ''}">${e.status === 'ready' ? '✅' : '⏳'} ${e.name}</div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
              ${phase.gate ? `
                <div class="gate">🚦 ${phase.gate.name}</div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>

      <div class="card">
        <div class="card-title">📊 KPIs</div>
        <div class="kpi-grid">
          ${data.kpis.map(kpi => `
            <div class="kpi-card">
              <div class="kpi-name">${kpi.name}</div>
              <div class="kpi-value">${kpi.current}</div>
              <div class="kpi-target">Target: ${kpi.target}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="card">
        <div class="card-title">🎯 Slice Status</div>
        <div class="slice-list">
          ${data.slices.map(slice => `
            <div class="slice">
              <div class="slice-header">
                <div class="slice-name">${slice.name}</div>
                <div class="slice-status" style="background: ${statusColors[slice.status]}20; color: ${statusColors[slice.status]}; border: 1px solid ${statusColors[slice.status]};">
                  ${getStatusIcon(slice.status)} ${slice.status}
                </div>
              </div>
              <div class="slice-info">
                <div><strong>Phase:</strong> ${slice.phase || 'N/A'}</div>
                <div><strong>Target:</strong> ${slice.target}</div>
                <div><strong>Revisions:</strong> ${slice.revisionCount}/${slice.revisionBudget}</div>
              </div>
              ${slice.blocker ? `
                <div class="slice-blocker">🚫 ${slice.blocker}</div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>

      <div class="card">
        <div class="card-title">📝 Retro Notes</div>
        <div class="retro-notes">
          ${data.retroNotes.map(note => `
            <div class="retro-note">${note}</div>
          `).join('')}
        </div>
      </div>

      <div class="card">
        <div class="card-title">➡️ Next Safe Steps</div>
        <div class="next-steps">
          ${data.nextSteps.map(step => `
            <div class="next-step ${step.includes('BLOCKED') ? 'blocked' : ''}">${step.includes('BLOCKED') ? '🚫' : '✅'} ${step}</div>
          `).join('')}
        </div>
      </div>
    </div>

    <div class="footer">
      <p>Generated by Proben.io Agent Harness System</p>
      <p>Inspired by Nick Nisi's "Case" from WorkOS</p>
      <p><a href="../..">View Documentation</a></p>
    </div>
  </div>
</body>
</html>`;
}

// Write report
fs.writeFileSync(REPORT_PATH, generateHTML(workflowData));

console.log(`✅ Background task report generated: ${REPORT_PATH}`);
console.log(`\n📖 View report: open ${REPORT_PATH}`);
