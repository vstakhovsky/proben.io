#!/usr/bin/env node

/**
 * Visual Evidence Report Generator (Updated)
 *
 * Generates a static HTML report comparing BEFORE/TARGET/AFTER screenshots
 * with DOM blocker results, requirement checklist, and visual parity scoring.
 *
 * Usage:
 *   node scripts/generate-visual-review-report.js \
 *     --phase "2.1" \
 *     --slice "A" \
 *     --slice-name "Header/Navigation" \
 *     --target "reference/screenshots/proben-mvp-6/hero-target-light-1.png" \
 *     --route "http://localhost:3000" \
 *     --output "test-results/visual-review/phase-2-1-slice-a.html"
 */

const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
const flags = {};
for (let i = 0; i < args.length; i += 2) {
  const flag = args[i].replace('--', '');
  flags[flag] = args[i + 1] || '';
}

// Default values
const config = {
  phase: flags.phase || '2.1',
  slice: flags.slice || 'A',
  sliceName: flags['slice-name'] || 'Unknown Slice',
  target: flags.target || '',
  route: flags.route || '',
  output: flags.output || 'test-results/visual-review/report.html',
  date: new Date().toISOString()
};

const sliceSlug = `phase-${config.phase.replace('.', '-')}-slice-${config.slice.toLowerCase()}`;
const outputDir = path.dirname(config.output);
const manifestPath = path.join(outputDir, `${sliceSlug}-manifest.json`);

// Generate file paths
const beforePath = path.join(outputDir, `${sliceSlug}-before.png`);
const afterPath = path.join(outputDir, `${sliceSlug}-after.png`);
const diffPath = path.join(outputDir, `${sliceSlug}-diff-comparison.html`);

// Verify files exist
const targetExists = config.target && fs.existsSync(config.target);
const beforeExists = fs.existsSync(beforePath);
const afterExists = fs.existsSync(afterPath);
const manifestExists = fs.existsSync(manifestPath);

// Load manifest if exists
let manifest = null;
let domBlockerResult = null;
let visualAssertionResult = null;

if (manifestExists) {
  manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  domBlockerResult = manifest.tests?.domBlockers;
  visualAssertionResult = manifest.tests?.visualAssertions;
}

// Check for blockers
const blockers = [];

if (!targetExists) blockers.push('Target screenshot is missing');
if (!beforeExists) blockers.push('Before screenshot is missing (expected for first run)');
if (!afterExists) blockers.push('After screenshot is missing');
if (!manifestExists) blockers.push('Evidence manifest is missing');
if (domBlockerResult === 'FAILED') blockers.push('DOM blocker tests failed');
if (domBlockerResult === null) blockers.push('DOM blocker tests not run - REQUIRED');

// Determine initial verdict
let initialVerdict = 'NEEDS_REVIEW';
if (blockers.length > 0) {
  initialVerdict = 'REJECTED';
}

// Generate HTML report
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Visual Evidence Report - Phase ${config.phase} Slice ${config.slice}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #1a1a1a;
      background: #f5f5f5;
      padding: 20px;
    }
    .container {
      max-width: 1600px;
      margin: 0 auto;
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header {
      border-bottom: 2px solid #e5e5e5;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .header h1 {
      font-size: 28px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    .meta {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 10px;
      margin-top: 15px;
      font-size: 14px;
    }
    .meta-item {
      padding: 8px;
      background: #f9f9f9;
      border-radius: 4px;
    }
    .meta-label {
      font-weight: 600;
      color: #666;
    }
    .verdict-banner {
      padding: 15px;
      border-radius: 6px;
      margin: 20px 0;
      font-weight: 600;
      font-size: 16px;
    }
    .verdict-accepted {
      background: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }
    .verdict-rejected {
      background: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }
    .verdict-needs-review {
      background: #fff3cd;
      color: #856404;
      border: 1px solid #ffeaa7;
    }
    .screenshots {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 15px;
      margin: 30px 0;
    }
    .screenshot-box {
      border: 1px solid #e5e5e5;
      border-radius: 6px;
      overflow: hidden;
    }
    .screenshot-header {
      padding: 10px;
      background: #f9f9f9;
      border-bottom: 1px solid #e5e5e5;
      font-weight: 600;
      font-size: 12px;
      text-align: center;
    }
    .screenshot-header.target { background: #e8f5e9; color: #2e7d32; }
    .screenshot-header.after { background: #e3f2fd; color: #1565c0; }
    .screenshot-header.before { background: #fff3e0; color: #e65100; }
    .screenshot-header.diff { background: #f3e5f5; color: #7b1fa2; }
    .screenshot-image {
      width: 100%;
      height: auto;
      display: block;
      cursor: pointer;
    }
    .screenshot-caption {
      padding: 8px 10px;
      font-size: 10px;
      color: #666;
      background: #fafafa;
      border-top: 1px solid #e5e5e5;
      word-break: break-all;
    }
    .missing-screenshot {
      padding: 20px;
      text-align: center;
      color: #dc3545;
      background: #fff5f5;
      font-size: 12px;
    }
    .section {
      margin: 30px 0;
    }
    .section h2 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 1px solid #e5e5e5;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
      font-size: 14px;
    }
    th, td {
      padding: 10px;
      text-align: left;
      border-bottom: 1px solid #e5e5e5;
    }
    th {
      background: #f9f9f9;
      font-weight: 600;
      font-size: 13px;
    }
    .status-pass {
      background: #d4edda;
      color: #155724;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600;
    }
    .status-fail {
      background: #f8d7da;
      color: #721c24;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600;
    }
    .status-review {
      background: #fff3cd;
      color: #856404;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600;
    }
    .blocker-yes {
      color: #dc3545;
      font-weight: 600;
      font-size: 12px;
    }
    .blocker-no {
      color: #28a745;
      font-weight: 600;
      font-size: 12px;
    }
    .scoring {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 15px;
      margin: 20px 0;
    }
    .score-item {
      padding: 15px;
      background: #f9f9f9;
      border-radius: 6px;
      text-align: center;
    }
    .score-label {
      font-size: 12px;
      color: #666;
      margin-bottom: 5px;
    }
    .score-value {
      font-size: 24px;
      font-weight: 700;
      color: #1a1a1a;
    }
    .overall-score {
      grid-column: 1 / -1;
      background: #e8f5e9;
      padding: 20px;
      border-radius: 6px;
      text-align: center;
    }
    .overall-score .score-value {
      font-size: 36px;
      color: #2e7d32;
    }
    .blockers {
      background: #fff5f5;
      border: 1px solid #fed7d7;
      border-radius: 6px;
      padding: 15px;
      margin: 20px 0;
    }
    .blockers h3 {
      color: #c53030;
      font-size: 16px;
      margin-bottom: 10px;
    }
    .blockers ul {
      margin-left: 20px;
    }
    .blockers li {
      color: #742a2a;
      margin: 5px 0;
      font-size: 14px;
    }
    .dom-results {
      background: #f0f9ff;
      border: 1px solid #bae6fd;
      border-radius: 6px;
      padding: 15px;
      margin: 20px 0;
    }
    .dom-results h3 {
      color: #0369a1;
      font-size: 16px;
      margin-bottom: 10px;
    }
    .dom-results table {
      margin: 0;
      font-size: 13px;
    }
    .human-override {
      background: #f0f9ff;
      border: 1px solid #bae6fd;
      border-radius: 6px;
      padding: 20px;
      margin: 30px 0;
    }
    .human-override h2 {
      color: #0369a1;
      margin-bottom: 15px;
    }
    .human-override textarea {
      width: 100%;
      min-height: 80px;
      padding: 10px;
      border: 1px solid #bae6fd;
      border-radius: 4px;
      font-family: inherit;
      font-size: 14px;
      margin: 10px 0;
      resize: vertical;
    }
    .human-override .field {
      margin: 15px 0;
    }
    .human-override label {
      display: block;
      font-weight: 600;
      margin-bottom: 5px;
      font-size: 14px;
    }
    .human-override select,
    .human-override input[type="text"],
    .human-override input[type="date"] {
      width: 100%;
      padding: 8px;
      border: 1px solid #bae6fd;
      border-radius: 4px;
    }
    .note-box {
      background: #fffbeb;
      border: 1px solid #fde68a;
      border-radius: 6px;
      padding: 15px;
      margin: 20px 0;
      font-size: 14px;
    }
    .note-box h3 {
      color: #92400e;
      margin-bottom: 10px;
    }
    @media (max-width: 1200px) {
      .screenshots {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (max-width: 768px) {
      .screenshots {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Visual Evidence Report</h1>
      <div class="meta">
        <div class="meta-item">
          <span class="meta-label">Phase:</span> ${config.phase}
        </div>
        <div class="meta-item">
          <span class="meta-label">Slice:</span> ${config.slice} — ${config.sliceName}
        </div>
        <div class="meta-item">
          <span class="meta-label">Date/Time:</span> ${config.date}
        </div>
        <div class="meta-item">
          <span class="meta-label">Route:</span> ${config.route || 'N/A'}
        </div>
        ${manifest ? `
        <div class="meta-item">
          <span class="meta-label">Branch:</span> ${manifest.gitBranch || 'N/A'}
        </div>
        <div class="meta-item">
          <span class="meta-label">Commit:</span> ${manifest.gitCommit || 'N/A'}
        </div>
        ` : ''}
      </div>
    </div>

    ${blockers.length > 0 ? `
    <div class="verdict-banner verdict-rejected">
      ❌ REJECTED — Blockers Detected
    </div>
    <div class="blockers">
      <h3>Critical Blockers:</h3>
      <ul>
        ${blockers.map(b => `<li>${b}</li>`).join('')}
      </ul>
    </div>
    ` : `
    <div class="verdict-banner verdict-needs-review">
      ⏳ AWAITING VISUAL REVIEW — Complete checklist below
    </div>
    `}

    <div class="section">
      <h2>Four-Way Screenshot Comparison</h2>
      <div class="screenshots">
        <div class="screenshot-box">
          <div class="screenshot-header before">BEFORE</div>
          ${beforeExists
            ? `<img src="${path.basename(beforePath)}" alt="Before screenshot" class="screenshot-image">`
            : `<div class="missing-screenshot">⚠️ BEFORE missing (first run)</div>`
          }
          <div class="screenshot-caption">${beforeExists ? beforePath : 'Not captured yet'}</div>
        </div>

        <div class="screenshot-box">
          <div class="screenshot-header target">TARGET</div>
          ${targetExists
            ? `<img src="${path.relative(outputDir, config.target)}" alt="Target screenshot" class="screenshot-image">`
            : `<div class="missing-screenshot">❌ TARGET missing</div>`
          }
          <div class="screenshot-caption">${targetExists ? config.target : 'Not specified or not found'}</div>
        </div>

        <div class="screenshot-box">
          <div class="screenshot-header after">AFTER</div>
          ${afterExists
            ? `<img src="${path.basename(afterPath)}" alt="After screenshot" class="screenshot-image">`
            : `<div class="missing-screenshot">❌ AFTER missing</div>`
          }
          <div class="screenshot-caption">${afterExists ? afterPath : 'Not captured'}</div>
        </div>

        <div class="screenshot-box">
          <div class="screenshot-header diff">DIFF</div>
          ${fs.existsSync(diffPath)
            ? `<a href="${path.basename(diffPath)}" target="_blank" style="display:block; padding:20px; text-align:center; color:#7b1fa2;">🔍 Open Diff Comparison</a>`
            : `<div class="missing-screenshot">⚠️ DIFF not generated</div>`
          }
          <div class="screenshot-caption">${fs.existsSync(diffPath) ? diffPath : 'Run generate-visual-diff.js'}</div>
        </div>
      </div>

      <div class="note-box">
        <h3>📊 Comparison Criteria</h3>
        <p><strong>ACCEPT if:</strong> AFTER looks closer to TARGET than BEFORE, and all expected changes are visible.</p>
        <p><strong>REJECT if:</strong> AFTER looks identical to BEFORE (no changes) or closer to BEFORE than TARGET.</p>
      </div>
    </div>

    <div class="section">
      <h2>DOM Blocker Results</h2>
      ${domBlockerResult ? `
        <div class="dom-results">
          <h3>Test Result: ${domBlockerResult === 'PASSED' ? '✅ PASSED' : '❌ FAILED'}</h3>
          <p>Run: <code>npm test -- slice-a-header-parity</code></p>
          ${domBlockerResult === 'FAILED' ? '<p style="color: #dc3545; font-weight: 600;">❌ BLOCKER: DOM blocker tests failed - required elements missing or forbidden elements present</p>' : ''}
        </div>
      ` : `
        <div class="dom-results" style="background: #fff3cd; border-color: #ffeaa7;">
          <h3 style="color: #856404;">⏳ Tests Not Run</h3>
          <p>Run: <code>npm test -- slice-a-header-parity</code></p>
        </div>
      `}
    </div>

    <div class="section">
      <h2>Requirement Checklist</h2>
      <table>
        <thead>
          <tr>
            <th>Requirement</th>
            <th>Expected</th>
            <th>Evidence</th>
            <th>Status</th>
            <th>Blocker</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Rounded pill header container</strong></td>
            <td>Rounded-full, not full-width navbar</td>
            <td>See screenshots</td>
            <td><span class="status-review">NEEDS REVIEW</span></td>
            <td><span class="blocker-yes">YES</span></td>
          </tr>
          <tr>
            <td><strong>"MEETING READINESS" subtitle</strong></td>
            <td>Visible below Proben logo</td>
            <td>See screenshots + DOM test</td>
            <td><span class="status-review">NEEDS REVIEW</span></td>
            <td><span class="blocker-yes">YES</span></td>
          </tr>
          <tr>
            <td><strong>"Run readiness check" CTA</strong></td>
            <td>Green button, right side</td>
            <td>See screenshots</td>
            <td><span class="status-review">NEEDS REVIEW</span></td>
            <td><span class="blocker-yes">YES</span></td>
          </tr>
          <tr>
            <td><strong>"Log in" button</strong></td>
            <td>Visible before CTA</td>
            <td>See screenshots</td>
            <td><span class="status-review">NEEDS REVIEW</span></td>
            <td><span class="blocker-yes">YES</span></td>
          </tr>
          <tr>
            <td><strong>Navigation items correct</strong></td>
            <td>Sample report, How it works, Checks, Resources, Pricing</td>
            <td>See screenshots</td>
            <td><span class="status-review">NEEDS REVIEW</span></td>
            <td><span class="blocker-yes">YES</span></td>
          </tr>
          <tr>
            <td><strong>Theme button</strong></td>
            <td>Sun/moon icon present</td>
            <td>See screenshots</td>
            <td><span class="status-review">NEEDS REVIEW</span></td>
            <td><span class="blocker-no">NO</span></td>
          </tr>
          <tr>
            <td><strong>NOT generic SaaS navbar</strong></td>
            <td>Premium editorial pill design</td>
            <td>See screenshots</td>
            <td><span class="status-review">NEEDS REVIEW</span></td>
            <td><span class="blocker-yes">YES</span></td>
          </tr>
          <tr>
            <td><strong>"Home" NOT in header</strong></td>
            <td>Old generic nav item absent</td>
            <td>DOM blocker test</td>
            <td>${domBlockerResult === 'FAILED' ? '<span class="status-fail">FAIL</span>' : '<span class="status-review">NEEDS REVIEW</span>'}</td>
            <td><span class="blocker-yes">YES</span></td>
          </tr>
          <tr>
            <td><strong>"Build Process" NOT in header</strong></td>
            <td>Portfolio nav absent from landing</td>
            <td>DOM blocker test</td>
            <td>${domBlockerResult === 'FAILED' ? '<span class="status-fail">FAIL</span>' : '<span class="status-review">NEEDS REVIEW</span>'}</td>
            <td><span class="blocker-yes">YES</span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section">
      <h2>Visual Parity Scoring</h2>
      <div class="scoring">
        <div class="score-item">
          <div class="score-label">Header Structure</div>
          <div class="score-value">?/5</div>
        </div>
        <div class="score-item">
          <div class="score-label">Logo/Subtitle</div>
          <div class="score-value">?/5</div>
        </div>
        <div class="score-item">
          <div class="score-label">Navigation Items</div>
          <div class="score-value">?/5</div>
        </div>
        <div class="score-item">
          <div class="score-label">CTA Hierarchy</div>
          <div class="score-value">?/5</div>
        </div>
        <div class="score-item">
          <div class="score-label">Prototype Similarity</div>
          <div class="score-value">?/5</div>
        </div>
        <div class="overall-score">
          <div class="score-label">Overall Parity Score</div>
          <div class="score-value">?/5</div>
          <div style="font-size: 14px; margin-top: 10px;">Acceptance threshold: ≥ 4.5/5</div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>Automatic Rejection Rules</h2>
      <div style="background: #f9f9f9; padding: 15px; border-radius: 6px; font-size: 14px;">
        <p><strong>Automatic REJECTION if:</strong></p>
        <ul style="margin-left: 20px; margin-top: 10px;">
          <li>Missing before screenshot</li>
          <li>Missing target screenshot</li>
          <li>Missing after screenshot</li>
          <li>Missing evidence manifest</li>
          <li>"MEETING READINESS" missing from DOM</li>
          <li>"Run readiness check" missing from DOM</li>
          <li>"Log in" missing from DOM</li>
          <li>"Home" found in landing header (forbidden old nav)</li>
          <li>"Build Process" found in landing header (forbidden portfolio nav)</li>
          <li>DOM blocker tests failed</li>
          <li>Current browser state contradicts agent verdict</li>
        </ul>
      </div>
    </div>

    <div class="human-override">
      <h2>Human Review Override</h2>
      <p style="color: #666; margin-bottom: 15px; font-size: 14px;">This section can be manually edited after review. Open the HTML file and update below.</p>

      <div class="field">
        <label>Human Verdict:</label>
        <select id="human-verdict">
          <option value="">-- Select verdict --</option>
          <option value="ACCEPTED">ACCEPTED ✅</option>
          <option value="NEEDS_REWORK">NEEDS REWORK ⚠️</option>
          <option value="REJECTED">REJECTED ❌</option>
        </select>
      </div>

      <div class="field">
        <label>Reason:</label>
        <textarea id="human-reason" placeholder="Explain your verdict based on visual evidence and DOM test results..."></textarea>
      </div>

      <div class="field">
        <label>Required Fixes:</label>
        <textarea id="human-fixes" placeholder="List specific fixes needed if not accepted..."></textarea>
      </div>

      <div class="field">
        <label>Fresh Reviewer Notes:</label>
        <textarea id="fresh-reviewer-notes" placeholder="Fresh reviewer observations..."></textarea>
      </div>

      <div class="field">
        <label>Principal Design Reviewer Notes:</label>
        <textarea id="design-reviewer-notes" placeholder="Design quality observations..."></textarea>
      </div>

      <div class="field">
        <label>Approved By:</label>
        <input type="text" id="human-approver" placeholder="Your name">
      </div>

      <div class="field">
        <label>Date:</label>
        <input type="date" id="human-date">
      </div>
    </div>

    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5; font-size: 12px; color: #666;">
      <p><strong>Source of Truth Policy:</strong> If browser state or screenshot evidence contradicts agent score, the screenshot/browser state is the source of truth.</p>
      <p style="margin-top: 10px;"><strong>Generated:</strong> ${config.date} | <strong>Phase:</strong> ${config.phase} | <strong>Slice:</strong> ${config.slice}</p>
    </div>
  </div>
</body>
</html>`;

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write HTML report
fs.writeFileSync(config.output, html);

console.log(`✅ Visual evidence report generated: ${config.output}`);
console.log(`\n📊 Summary:`);
console.log(`   Phase: ${config.phase}`);
console.log(`   Slice: ${config.slice} (${config.sliceName})`);
console.log(`   Target: ${targetExists ? '✅ Present' : '❌ Missing'} - ${config.target}`);
console.log(`   Before: ${beforeExists ? '✅ Present' : '⚠️  Missing (first run)'} - ${beforePath}`);
console.log(`   After: ${afterExists ? '✅ Present' : '❌ Missing'} - ${afterPath}`);
console.log(`   Manifest: ${manifestExists ? '✅ Present' : '❌ Missing'} - ${manifestPath}`);
console.log(`   DOM Tests: ${domBlockerResult || '⚠️  Not run'}`);

console.log(`\n${blockers.length > 0 ? '⚠️  BLOCKERS DETECTED - See report for details' : '⏳  Awaiting visual review - Open report to complete checklist'}`);

if (blockers.length > 0) {
  process.exit(1);
}
