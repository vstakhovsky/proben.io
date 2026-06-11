#!/usr/bin/env node

/**
 * Generate Visual Diff
 *
 * Generates a visual diff between BEFORE and AFTER screenshots.
 * Since we don't want to add heavy dependencies, this creates a simple
 * comparison report that can be reviewed manually.
 *
 * Usage:
 *   node scripts/generate-visual-diff.js \
 *     --phase "2.1" \
 *     --slice "A" \
 *     --output-dir "test-results/visual-review"
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

const config = {
  phase: flags.phase || '2.1',
  slice: flags.slice || 'A',
  outputDir: flags['output-dir'] || 'test-results/visual-review'
};

const sliceSlug = `phase-${config.phase.replace('.', '-')}-slice-${config.slice.toLowerCase()}`;
const manifestPath = path.join(config.outputDir, `${sliceSlug}-manifest.json`);
const beforePath = path.join(config.outputDir, `${sliceSlug}-before.png`);
const afterPath = path.join(config.outputDir, `${sliceSlug}-after.png`);
const diffPath = path.join(config.outputDir, `${sliceSlug}-diff.png`);

console.log(`🔍 Generating Visual Diff`);
console.log(`\nPhase: ${config.phase}`);
console.log(`Slice: ${config.slice}`);

// Check if screenshots exist
const beforeExists = fs.existsSync(beforePath);
const afterExists = fs.existsSync(afterPath);

if (!beforeExists) {
  console.log(`⚠️  BEFORE screenshot not found: ${beforePath}`);
  console.log(`   (Expected for first run. Diff will be placeholder.)`);
}

if (!afterExists) {
  console.error(`❌ AFTER screenshot not found: ${afterPath}`);
  console.error(`   Run capture-ui-slice-evidence.js first.`);
  process.exit(1);
}

// Read manifest if exists
let manifest = null;
if (fs.existsSync(manifestPath)) {
  manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
}

// Since we don't have image comparison library, create a placeholder
// The HTML report will show the images side-by-side for manual comparison
console.log(`\n📊 Diff analysis:`);

if (beforeExists && afterExists) {
  const beforeStats = fs.statSync(beforePath);
  const afterStats = fs.statSync(afterPath);

  console.log(`   BEFORE: ${beforeStats.size} bytes`);
  console.log(`   AFTER:  ${afterStats.size} bytes`);

  const sizeDiff = afterStats.size - beforeStats.size;
  const percentChange = beforeStats.size > 0 ? ((sizeDiff / beforeStats.size) * 100).toFixed(1) : 0;

  if (sizeDiff > 0) {
    console.log(`   Size increase: +${sizeDiff} bytes (+${percentChange}%)`);
  } else if (sizeDiff < 0) {
    console.log(`   Size decrease: ${sizeDiff} bytes (${percentChange}%)`);
  } else {
    console.log(`   Size: identical`);
  }
}

// Create a simple HTML diff comparison as fallback
const diffHtmlPath = path.join(config.outputDir, `${sliceSlug}-diff-comparison.html`);
const diffHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Visual Diff - Phase ${config.phase} Slice ${config.slice}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 20px;
      background: #f5f5f5;
    }
    .container { max-width: 1400px; margin: 0 auto; }
    h1 { margin-bottom: 20px; }
    .comparison {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin: 20px 0;
    }
    .image-box {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .image-header {
      padding: 10px 15px;
      background: #f9f9f9;
      border-bottom: 1px solid #e5e5e5;
      font-weight: 600;
    }
    .image-content {
      position: relative;
    }
    .image-content img {
      width: 100%;
      height: auto;
      display: block;
    }
    .missing {
      padding: 40px;
      text-align: center;
      color: #dc3545;
      background: #fff5f5;
    }
    .note {
      background: #fff3cd;
      border: 1px solid #ffeaa7;
      border-radius: 6px;
      padding: 15px;
      margin: 20px 0;
    }
    .note h3 {
      color: #856404;
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Visual Diff - Phase ${config.phase} Slice ${config.slice}</h1>

    <div class="note">
      <h3>⏳ Manual Diff Comparison Required</h3>
      <p>No pixel-level diff library is available. Compare the images below visually to identify differences.</p>
      <p><strong>Key questions:</strong></p>
      <ul>
        <li>Does AFTER look more like TARGET than BEFORE?</li>
        <li>Are the expected changes visible?</li>
        <li>Are there any unintended changes?</li>
      </ul>
    </div>

    <div class="comparison">
      <div class="image-box">
        <div class="image-header">BEFORE (Pre-implementation)</div>
        <div class="image-content">
          ${beforeExists
            ? `<img src="${path.basename(beforePath)}" alt="Before screenshot">`
            : `<div class="missing">❌ BEFORE screenshot not found (expected for first run)</div>`
          }
        </div>
      </div>

      <div class="image-box">
        <div class="image-header">AFTER (Post-implementation)</div>
        <div class="image-content">
          ${afterExists
            ? `<img src="${path.basename(afterPath)}" alt="After screenshot">`
            : `<div class="missing">❌ AFTER screenshot not found</div>`
          }
        </div>
      </div>
    </div>

    <div class="note" style="background: #e8f5e9; border-color: #c3e6cb;">
      <h3 style="color: #2e7d32;">Decision Criteria</h3>
      <p><strong>ACCEPT if:</strong> AFTER looks closer to TARGET than BEFORE, and all expected changes are visible.</p>
      <p><strong>REWORK if:</strong> AFTER shows some progress but doesn't fully match TARGET.</p>
      <p><strong>REJECT if:</strong> AFTER looks identical to BEFORE (no changes) or shows wrong implementation.</p>
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync(diffHtmlPath, diffHtml);
console.log(`\n📄 HTML diff comparison created: ${diffHtmlPath}`);

// Update manifest with diff info
if (manifest) {
  manifest.screenshots.diff = diffHtmlPath; // Reference the HTML comparison
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`📋 Manifest updated with diff reference`);
}

console.log(`\n✅ Visual diff generation complete!`);
console.log(`\nOpen ${diffHtmlPath} in browser to compare BEFORE vs AFTER.`);
