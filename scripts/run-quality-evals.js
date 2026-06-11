#!/usr/bin/env node

/**
 * Run Quality Evals Script
 *
 * Runs quality evaluation suites and generates reports.
 *
 * Usage:
 *   node scripts/run-quality-evals.js \\
 *     --category "visual-quality" \\
 *     --phase "2.1" \\
 *     --slice "A"
 */

const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2).reduce((acc, arg) => {
  const [key, value] = arg.replace(/^--/, '').split('=');
  acc[key] = value || true;
  return acc;
}, {});

// Category mapping
const categoryMap = {
  'visual-quality': 'VIS',
  'agent-reliability': 'AGENT',
  'product-acceptance': 'PROD',
  'security': 'SEC'
};

const category = args.category;
if (!category || !categoryMap[category]) {
  console.error(`Invalid or missing category: ${category}`);
  console.error(`Valid categories: ${Object.keys(categoryMap).join(', ')}`);
  process.exit(1);
}

const catCode = categoryMap[category];
const dataFile = path.join(__dirname, '..', 'evals', `${category}-cases.jsonl`);

// Check if data file exists
if (!fs.existsSync(dataFile)) {
  console.error(`No eval cases found for category: ${category}`);
  console.error(`Expected file: ${dataFile}`);
  process.exit(1);
}

// Read eval cases
const content = fs.readFileSync(dataFile, 'utf8');
const lines = content.trim().split('\n').filter(line => line);
const evalCases = lines.map(line => {
  try {
    return JSON.parse(line);
  } catch (e) {
    console.error(`Error parsing line: ${line.substring(0, 50)}...`);
    return null;
  }
}).filter(c => c);

console.log(`\nRunning ${category} evals...`);
console.log(`Total cases: ${evalCases.length}\n`);

// Filter by phase/slice if specified
let filteredCases = evalCases;
if (args.phase) {
  filteredCases = filteredCases.filter(c => c.phase === args.phase);
}
if (args.slice) {
  filteredCases = filteredCases.filter(c => c.slice === args.slice);
}

console.log(`Filtered cases: ${filteredCases.length}\n`);

// Calculate metrics based on category
let metrics = {};

if (category === 'visual-quality') {
  metrics = calculateVisualQualityMetrics(filteredCases);
} else if (category === 'agent-reliability') {
  metrics = calculateAgentReliabilityMetrics(filteredCases);
} else if (category === 'product-acceptance') {
  metrics = calculateProductAcceptanceMetrics(filteredCases);
}

// Print results
console.log('=== RESULTS ===\n');
console.log(`Total Cases Evaluated: ${filteredCases.length}`);
console.log(`Cases Closed: ${filteredCases.filter(c => c.status === 'CLOSED').length}`);
console.log(`Cases Open: ${filteredCases.filter(c => c.status === 'OPEN').length}`);
console.log(`Recurrences: ${filteredCases.reduce((sum, c) => sum + (c.metrics?.recurrences || 0), 0)}`);

if (Object.keys(metrics).length > 0) {
  console.log('\n=== METRICS ===');
  for (const [key, value] of Object.entries(metrics)) {
    console.log(`${key}: ${value}`);
  }
}

// Print case details
if (args.verbose) {
  console.log('\n=== CASE DETAILS ===');
  filteredCases.forEach((c, i) => {
    console.log(`\n${i + 1}. ${c.eval_id} — ${c.failure_type}`);
    console.log(`   Phase: ${c.phase}, Slice: ${c.slice}`);
    console.log(`   Status: ${c.status}`);
    console.log(`   Agent Verdict: ${c.agent_verdict}`);
    console.log(`   Human Verdict: ${c.human_verdict || 'N/A'}`);
    console.log(`   Root Cause: ${c.root_cause.substring(0, 80)}...`);
  });
}

console.log('\n=== EVAL COMPLETE ===');

process.exit(0);

// Metric calculation functions

function calculateVisualQualityMetrics(cases) {
  const totalCases = cases.length;
  if (totalCases === 0) return {};

  const avgVisualParity = cases.reduce((sum, c) => sum + (c.metrics?.visual_parity_score || 0), 0) / totalCases;
  const avgEvidenceCompleteness = cases.reduce((sum, c) => sum + (c.metrics?.evidence_completeness || 0), 0) / totalCases;
  const genericPatternRate = cases.filter(c => c.metrics?.generic_saaS_detection > 0).length / totalCases;

  return {
    'Average Visual Parity Score': avgVisualParity.toFixed(2) + '/5',
    'Average Evidence Completeness': (avgEvidenceCompleteness * 100).toFixed(1) + '%',
    'Generic Pattern Detection Rate': (genericPatternRate * 100).toFixed(1) + '%',
    'Cases with P0 Blockers': cases.filter(c => c.failure_type === 'VISUAL_MISMATCH').length
  };
}

function calculateAgentReliabilityMetrics(cases) {
  const totalCases = cases.length;
  if (totalCases === 0) return {};

  const avgFalsePassRate = cases.reduce((sum, c) => sum + (c.metrics?.false_pass_rate || 0), 0) / totalCases;
  const avgSelfApprovalRate = cases.reduce((sum, c) => sum + (c.metrics?.self_approval_rate || 0), 0) / totalCases;
  const avgMissingEvidenceRate = cases.reduce((sum, c) => sum + (c.metrics?.missing_evidence_rate || 0), 0) / totalCases;
  const avgAgentUsefulness = cases.reduce((sum, c) => sum + (c.metrics?.agent_usefulness_score || 0), 0) / totalCases;

  return {
    'Average False PASS Rate': (avgFalsePassRate * 100).toFixed(1) + '%',
    'Average Self-Approval Rate': (avgSelfApprovalRate * 100).toFixed(1) + '%',
    'Average Missing Evidence Rate': (avgMissingEvidenceRate * 100).toFixed(1) + '%',
    'Average Agent Usefulness': avgAgentUsefulness.toFixed(2) + '/5',
    'Independence Violations': cases.filter(c => c.failure_type === 'FALSE_AGENT_PASS').length
  };
}

function calculateProductAcceptanceMetrics(cases) {
  const totalCases = cases.length;
  if (totalCases === 0) return {};

  const avgPrdAlignment = cases.reduce((sum, c) => sum + (c.metrics?.prd_rfc_adr_alignment || 0), 0) / totalCases;
  const avgUserValueClarity = cases.reduce((sum, c) => sum + (c.metrics?.user_value_clarity || 0), 0) / totalCases;
  const avgAcceptanceCoverage = cases.reduce((sum, c) => sum + (c.metrics?.acceptance_criteria_coverage || 0), 0) / totalCases;

  return {
    'Average PRD/RFC/ADR Alignment': avgPrdAlignment.toFixed(2) + '/5',
    'Average User Value Clarity': avgUserValueClarity.toFixed(2) + '/5',
    'Average Acceptance Criteria Coverage': (avgAcceptanceCoverage * 100).toFixed(1) + '%',
    'Scope Creep Detected': cases.filter(c => c.scope_creep_detected).length,
    'Missing Requirements': cases.reduce((sum, c) => sum + (c.missing_requirements?.length || 0), 0)
  };
}
