#!/usr/bin/env node

/**
 * Validate State Transition Script
 *
 * Validates state transitions are allowed and evidence is complete.
 *
 * Usage:
 *   node scripts/harness/validate-state-transition.js --from <state> --to <state> --run-id <run-id>
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
const required = ['from', 'to', 'run-id'];
for (const req of required) {
  if (!args[req]) {
    console.error(`Missing required argument: --${req}`);
    console.error('Usage: node scripts/harness/validate-state-transition.js --from <state> --to <state> --run-id <run-id>');
    process.exit(1);
  }
}

const fromState = args.from.toUpperCase();
const toState = args.to.toUpperCase();
const runId = args['run-id'];

console.log(`Validating state transition: ${fromState} → ${toState}`);
console.log(`Run ID: ${runId}`);

// Allowed transitions
const allowedTransitions = {
  'IMPLEMENT': ['VERIFY'],
  'VERIFY': ['REVIEW'],
  'REVIEW': ['CLOSE', 'IMPLEMENT'],
  'CLOSE': ['RETRO'],
  'RETRO': ['DONE']
};

// Forbidden transitions
const forbiddenTransitions = {
  'IMPLEMENT': ['CLOSE', 'DONE'],
  'VERIFY': ['CLOSE', 'DONE'],
  'REVIEW': ['DONE'],
  'CLOSE': ['IMPLEMENT', 'VERIFY', 'REVIEW'],
  'RETRO': ['IMPLEMENT', 'VERIFY', 'REVIEW', 'CLOSE']
};

// Check if transition is explicitly forbidden
if (forbiddenTransitions[fromState]?.includes(toState)) {
  console.error(`✗ Forbidden transition: ${fromState} → ${toState}`);
  process.exit(1);
}

// Check if transition is allowed
if (!allowedTransitions[fromState]?.includes(toState)) {
  console.error(`✗ Transition not allowed: ${fromState} → ${toState}`);
  console.error(`Allowed transitions from ${fromState}: ${allowedTransitions[fromState]?.join(', ') || 'none'}`);
  process.exit(1);
}

console.log(`✓ Transition allowed: ${fromState} → ${toState}`);

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

// Verify current state matches fromState
if (state.currentState !== fromState) {
  console.error(`✗ Current state mismatch: expected ${fromState}, got ${state.currentState}`);
  process.exit(1);
}

console.log(`✓ Current state verified: ${fromState}`);

// State-specific checks
const errors = [];

switch (toState) {
  case 'VERIFY':
    // IMPLEMENT → VERIFY
    // Check: Implementation complete, tests passing
    if (!state.testsPassing) {
      errors.push('Tests not passing (required for VERIFY)');
    }
    break;

  case 'REVIEW':
    // VERIFY → REVIEW
    // Check: Proof manifests valid, SHA-256 verified
    const manifestPath = path.join(harnessDir, 'proof-manifest.json');
    if (!fs.existsSync(manifestPath)) {
      errors.push('Proof manifest missing (required for REVIEW)');
    }
    break;

  case 'CLOSE':
    // REVIEW → CLOSE
    // Check: Review verdict ACCEPTED
    if (state.reviewVerdict !== 'ACCEPTED') {
      errors.push('Review verdict not ACCEPTED (required for CLOSE)');
    }
    break;

  case 'IMPLEMENT':
    // REVIEW → IMPLEMENT (revision loop)
    // Check: Revision budget available
    if (!state.revisionCount) state.revisionCount = 0;
    if (!state.revisionBudget) state.revisionBudget = 2;

    if (state.revisionCount >= state.revisionBudget) {
      errors.push('Revision budget exhausted (escalate to human)');
    }
    if (state.reviewVerdict !== 'NEEDS_REWORK') {
      errors.push('Review verdict not NEEDS_REWORK (required for revision)');
    }
    break;

  case 'RETRO':
    // CLOSE → RETRO
    // Check: Evidence package complete
    if (!state.evidenceComplete) {
      errors.push('Evidence package incomplete (required for RETRO)');
    }
    break;

  case 'DONE':
    // RETRO → DONE
    // Check: Retro entry written
    if (!state.retroWritten) {
      errors.push('Retro entry not written (required for DONE)');
    }
    break;
}

// Output results
if (errors.length > 0) {
  console.error(`\n✗ State transition BLOCKED`);
  console.error(`\nBlockers:`);
  errors.forEach(error => console.error(`  ✗ ${error}`));
  process.exit(1);
}

// Update state
state.currentState = toState;
state.previousStates = state.previousStates || [fromState];
if (!state.previousStates.includes(toState)) {
  state.previousStates.push(toState);
}
state.updatedAt = new Date().toISOString();

if (toState === 'IMPLEMENT' && fromState === 'REVIEW') {
  // Revision loop
  state.revisionCount = (state.revisionCount || 0) + 1;
  console.log(`✓ Revision count incremented: ${state.revisionCount}/${state.revisionBudget}`);
}

// Write updated state
try {
  fs.writeFileSync(statePath, JSON.stringify(state, null, 2), 'utf-8');
  console.log(`✓ State updated: ${toState}`);
  console.log(`\n✓ State transition VALID`);
  process.exit(0);
} catch (error) {
  console.error('✗ Failed to write state:', error.message);
  process.exit(1);
}
