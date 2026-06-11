#!/usr/bin/env node

/**
 * Generate Harness Report Script
 *
 * Generates an HTML report showing harness state, gates, evidence, and verdict.
 *
 * Usage:
 *   node scripts/harness/generate-harness-report.js --run-id <run-id>
 */

const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2).reduce((acc, arg) => {
  const [key, value] = arg.replace(/^--/, '').split('=');
  acc[key] = value || true;
  return acc;
}, {});

// Required arguments
const required = ['run-id'];
for (const req of required) {
  if (!args[req]) {
    console.error(`Missing required argument: --${req}`);
    console.error('Usage: node scripts/harness/generate-harness-report.js --run-id <run-id>');
    process.exit(1);
  }
}

const runId = args['run-id'];

console.log(`Generating harness report for run: ${runId}`);

// Load state
const harnessDir = path.join(process.cwd(), 'test-results', 'harness', runId);
const statePath = path.join(harnessDir, 'state.json');

if (!fs.existsSync(statePath)) {
  console.error('✗ State file does not exist');
  process.exit(1);
}

let state;
try {
  const stateContent = fs.readFileSync(statePath, 'utf-8');
  state = JSON.parse(stateContent);
} catch (error) {
  console.error('✗ Failed to read or parse state:', error.message);
  process.exit(1);
}

// Load proof manifest (if exists)
let manifest = null;
const manifestPath = path.join(harnessDir, 'proof-manifest.json');
if (fs.existsSync(manifestPath)) {
  try {
    const manifestContent = fs.readFileSync(manifestPath, 'utf-8');
    manifest = JSON.parse(manifestContent);
  } catch (error) {
    console.warn('⚠ Failed to read proof manifest:', error.message);
  }
}

// Generate HTML report
const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Harness Report - ${runId}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      background: #f5f5f5;
    }
    .header {
      background: white;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .header h1 {
      margin: 0 0 10px 0;
      color: #333;
    }
    .state-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 4px;
      font-weight: 600;
      font-size: 14px;
    }
    .state-IMPLEMENT { background: #e3f2fd; color: #1976d2; }
    .state-VERIFY { background: #fff3e0; color: #f57c00; }
    .state-REVIEW { background: #f3e5f5; color: #7b1fa2; }
    .state-CLOSE { background: #e8f5e9; color: #388e3c; }
    .state-RETRO { background: #fce4ec; color: #c2185b; }
    .state-DONE { background: #e0f2f1; color: #00695c; }
    .section {
      background: white;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .section h2 {
      margin: 0 0 15px 0;
      color: #333;
      font-size: 18px;
    }
    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 15px;
    }
    .info-item {
      padding: 10px;
      background: #f9f9f9;
      border-radius: 4px;
    }
    .info-label {
      font-size: 12px;
      color: #666;
      margin-bottom: 4px;
    }
    .info-value {
      font-size: 14px;
      color: #333;
      font-weight: 500;
    }
    .gates-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .gate-item {
      padding: 10px;
      margin-bottom: 8px;
      background: #f9f9f9;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .gate-status {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 600;
    }
    .gate-status.passed {
      background: #4caf50;
      color: white;
    }
    .gate-status.failed {
      background: #f44336;
      color: white;
    }
    .gate-status.pending {
      background: #ff9800;
      color: white;
    }
    .evidence-links {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .evidence-links li {
      padding: 8px;
      margin-bottom: 4px;
      background: #f9f9f9;
      border-radius: 4px;
    }
    .evidence-links a {
      color: #1976d2;
      text-decoration: none;
      font-size: 14px;
    }
    .evidence-links a:hover {
      text-decoration: underline;
    }
    .verdict {
      padding: 15px;
      border-radius: 4px;
      font-weight: 600;
      text-align: center;
    }
    .verdict.ACCEPTED {
      background: #e8f5e9;
      color: #2e7d32;
    }
    .verdict.REJECTED {
      background: #ffebee;
      color: #c62828;
    }
    .verdict.NEEDS_REWORK {
      background: #fff3e0;
      color: #ef6c00;
    }
    .verdict.PENDING {
      background: #e3f2fd;
      color: #1565c0;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Harness Report</h1>
    <p>Run ID: <code>${runId}</code></p>
    <p>Current State: <span class="state-badge state-${state.currentState}">${state.currentState}</span></p>
  </div>

  <div class="section">
    <h2>Run Information</h2>
    <div class="info-grid">
      <div class="info-item">
        <div class="info-label">Started At</div>
        <div class="info-value">${state.startedAt || 'Unknown'}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Updated At</div>
        <div class="info-value">${state.updatedAt || 'Unknown'}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Revision Count</div>
        <div class="info-value">${state.revisionCount || 0}/${state.revisionBudget || 2}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Previous States</div>
        <div class="info-value">${(state.previousStates || []).join(' → ')}</div>
      </div>
    </div>
  </div>

  ${manifest ? `
  <div class="section">
    <h2>Proof Manifest</h2>
    <div class="info-grid">
      <div class="info-item">
        <div class="info-label">Command</div>
        <div class="info-value">${manifest.command || 'Unknown'}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Status</div>
        <div class="info-value">${manifest.status || 'Unknown'}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Exit Code</div>
        <div class="info-value">${manifest.exitCode}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Duration</div>
        <div class="info-value">${manifest.durationMs}ms</div>
      </div>
    </div>
  </div>
  ` : ''}

  <div class="section">
    <h2>Gates</h2>
    <ul class="gates-list">
      <li class="gate-item">
        <span class="gate-status ${state.currentState === 'DONE' || state.currentState === 'RETRO' ? 'passed' : 'pending'}">
          ${state.currentState === 'DONE' || state.currentState === 'RETRO' ? '✓' : '◐'}
        </span>
        <span>Product Goal Gate</span>
      </li>
      <li class="gate-item">
        <span class="gate-status ${state.currentState === 'DONE' || state.currentState === 'RETRO' ? 'passed' : 'pending'}">
          ${state.currentState === 'DONE' || state.currentState === 'RETRO' ? '✓' : '◐'}
        </span>
        <span>Design/Requirements Gate</span>
      </li>
      <li class="gate-item">
        <span class="gate-status ${['VERIFY', 'REVIEW', 'CLOSE', 'RETRO', 'DONE'].includes(state.currentState) ? 'passed' : 'pending'}">
          ${['VERIFY', 'REVIEW', 'CLOSE', 'RETRO', 'DONE'].includes(state.currentState) ? '✓' : '◐'}
        </span>
        <span>Implementation Gate</span>
      </li>
      <li class="gate-item">
        <span class="gate-status ${['REVIEW', 'CLOSE', 'RETRO', 'DONE'].includes(state.currentState) ? 'passed' : 'pending'}">
          ${['REVIEW', 'CLOSE', 'RETRO', 'DONE'].includes(state.currentState) ? '✓' : '◐'}
        </span>
        <span>Verify Gate</span>
      </li>
      <li class="gate-item">
        <span class="gate-status ${['CLOSE', 'RETRO', 'DONE'].includes(state.currentState) ? 'passed' : 'pending'}">
          ${['CLOSE', 'RETRO', 'DONE'].includes(state.currentState) ? '✓' : '◐'}
        </span>
        <span>Review Gate</span>
      </li>
      <li class="gate-item">
        <span class="gate-status ${['RETRO', 'DONE'].includes(state.currentState) ? 'passed' : 'pending'}">
          ${['RETRO', 'DONE'].includes(state.currentState) ? '✓' : '◐'}
        </span>
        <span>Close Gate</span>
      </li>
      <li class="gate-item">
        <span class="gate-status ${state.currentState === 'DONE' ? 'passed' : 'pending'}">
          ${state.currentState === 'DONE' ? '✓' : '◐'}
        </span>
        <span>Retro Gate</span>
      </li>
    </ul>
  </div>

  <div class="section">
    <h2>Evidence</h2>
    <ul class="evidence-links">
      <li>
        <a href="../../../../../test-results/harness/${runId}/state.json">State File</a>
      </li>
      ${manifest ? `
      <li>
        <a href="../../../../../test-results/harness/${runId}/proof-manifest.json">Proof Manifest</a>
      </li>
      ${manifest.logPath ? `
      <li>
        <a href="../../../../../test-results/harness/${runId}/${path.basename(manifest.logPath)}">Command Log</a>
      </li>
      ` : ''}
      ` : ''}
    </ul>
  </div>

  <div class="section">
    <h2>Verdict</h2>
    <div class="verdict ${state.reviewVerdict || 'PENDING'}">
      ${state.reviewVerdict || 'PENDING'}
    </div>
  </div>

  <div class="section">
    <h2>Retro Entry</h2>
    ${state.retroWritten ?
      '<p>✓ Retro entry written</p>' :
      '<p>◐ Retro entry pending</p>'
    }
  </div>
</body>
</html>
`;

// Write HTML report
const reportDir = path.join(process.cwd(), 'test-results', 'harness', runId);
fs.mkdirSync(reportDir, { recursive: true });

const reportPath = path.join(reportDir, 'harness-report.html');

try {
  fs.writeFileSync(reportPath, htmlContent, 'utf-8');
  console.log(`✓ Harness report created: ${reportPath}`);
  console.log(`\nOpen in browser: file://${reportPath}`);
  process.exit(0);
} catch (error) {
  console.error('✗ Failed to write harness report:', error.message);
  process.exit(1);
}
