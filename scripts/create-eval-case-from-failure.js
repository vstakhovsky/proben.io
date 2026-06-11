#!/usr/bin/env node

/**
 * Create Eval Case From Failure Script
 *
 * Automatically generates eval cases from failures, false approvals,
 * rejected UI slices, or human overrides.
 *
 * Usage:
 *   node scripts/create-eval-case-from-failure.js \\
 *     --category "VIS" \\
 *     --failure-type "VISUAL_MISMATCH" \\
 *     --phase "2.1" \\
 *     --slice "A" \\
 *     --agent-verdict "ACCEPTED" \\
 *     --human-verdict "REJECTED" \\
 *     --root-cause "Missing DOM blocker" \\
 *     --evidence "path/to/evidence"
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
const required = ['category', 'failure-type', 'phase', 'slice'];
for (const req of required) {
  if (!args[req]) {
    console.error(`Missing required argument: --${req}`);
    process.exit(1);
  }
}

// Category mapping
const categoryMap = {
  'VIS': 'visual-quality',
  'AGENT': 'agent-reliability',
  'PROD': 'product-acceptance',
  'SEC': 'security'
};

const category = categoryMap[args.category];
if (!category) {
  console.error(`Invalid category: ${args.category}`);
  console.error(`Valid categories: ${Object.keys(categoryMap).join(', ')}`);
  process.exit(1);
}

// Get next eval ID number
const dataFile = path.join(__dirname, '..', 'evals', `${category}-cases.jsonl`);
let evalNumber = 1;

if (fs.existsSync(dataFile)) {
  const content = fs.readFileSync(dataFile, 'utf8');
  const lines = content.trim().split('\n').filter(line => line);
  const existingCases = lines.map(line => {
    try {
      return JSON.parse(line);
    } catch (e) {
      return null;
    }
  }).filter(c => c);

  if (existingCases.length > 0) {
    const lastCase = existingCases[existingCases.length - 1];
    const lastId = lastCase.eval_id;
    const lastNumber = parseInt(lastId.split('-')[2]);
    evalNumber = lastNumber + 1;
  }
}

// Create eval case
const evalId = `EV-${args.category}-${String(evalNumber).padStart(3, '0')}`;
const today = new Date().toISOString().split('T')[0];

const evalCase = {
  eval_id: evalId,
  date: args.date || today,
  phase: args.phase,
  slice: args.slice,
  failure_type: args['failure-type'],
  input_task: args['input-task'] || '',
  expected_behavior: args['expected-behavior'] || '',
  actual_agent_behavior: args['actual-behavior'] || '',
  evidence_paths: args.evidence ? { main: args.evidence } : {},
  blocker_expected: args['blocker-expected'] || '',
  correct_verdict: args['correct-verdict'] || 'REJECTED',
  agent_verdict: args['agent-verdict'] || '',
  human_verdict: args['human-verdict'] || '',
  root_cause: args['root-cause'] || '',
  required_gate_update: args['gate-update'] || '',
  regression_test_added: args['regression-test'] || '',
  status: args.status || 'OPEN',
  related_evals: args['related-evals'] ? args['related-evals'].split(',') : [],
  learning_outcomes: args['learning-outcomes'] ? args['learning-outcomes'].split(',') : [],
  prevention_added: args['prevention-added'] ? args['prevention-added'].split(',') : [],
  metrics: {
    time_to_detect: args['time-to-detect'] || 'TBD',
    time_to_fix: args['time-to-fix'] || 'TBD',
    recurrences: 0
  }
};

// Write to data file
const line = JSON.stringify(evalCase);
fs.appendFileSync(dataFile, line + '\n');

// Output result
console.log(`Created eval case: ${evalId}`);
console.log(`Category: ${category}`);
console.log(`Failure Type: ${evalCase.failure_type}`);
console.log(`Phase: ${evalCase.phase}`);
console.log(`Slice: ${evalCase.slice}`);
console.log(`Status: ${evalCase.status}`);
console.log(`\nData file: ${dataFile}`);
console.log(`\nTo update the registry, run:`);
console.log(`  node scripts/update-eval-registry.js`);

// Optionally print JSON
if (args.json) {
  console.log('\n' + JSON.stringify(evalCase, null, 2));
}

process.exit(0);
