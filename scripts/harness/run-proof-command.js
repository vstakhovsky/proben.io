#!/usr/bin/env node

/**
 * Run Proof Command Script
 *
 * Executes a command, captures real stdout/stderr, computes SHA-256 hash,
 * and generates a proof manifest.
 *
 * Usage:
 *   node scripts/harness/run-proof-command.js --name <command-name> -- <command>
 *
 * Examples:
 *   node scripts/harness/run-proof-command.js --name typecheck -- npm run typecheck
 *   node scripts/harness/run-proof-command.js --name tests -- npm test
 *   node scripts/harness/run-proof-command.js --name build -- npm run build
 */

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

// Parse command line arguments
const doubleDashIndex = process.argv.indexOf('--');
let commandArgs = [];

if (doubleDashIndex === -1) {
  console.error('Missing command arguments. Use -- to separate arguments.');
  console.error('Usage: node scripts/harness/run-proof-command.js --name <command-name> -- <command>');
  process.exit(1);
}

// Parse arguments before --
const args = process.argv.slice(2, doubleDashIndex).reduce((acc, arg, index, arr) => {
  if (arg.startsWith('--')) {
    const [key, value] = arg.replace(/^--/, '').split('=');
    // If no = and next arg doesn't start with --, use next arg as value
    if (!value && arr[index + 1] && !arr[index + 1].startsWith('--')) {
      acc[key] = arr[index + 1];
    } else {
      acc[key] = value || true;
    }
  }
  return acc;
}, {});

// Command arguments after --
commandArgs = process.argv.slice(doubleDashIndex + 1);

// Required arguments
const required = ['name'];
for (const req of required) {
  if (!args[req]) {
    console.error(`Missing required argument: --${req}`);
    process.exit(1);
  }
}

// Extract command and arguments
const commandName = args.name;

// Generate run ID
const runId = uuidv4();

// Create output directory
const outputDir = path.join(process.cwd(), 'test-results', 'harness', runId);
fs.mkdirSync(outputDir, { recursive: true });

console.log(`Running proof command: ${commandName}`);
console.log(`Run ID: ${runId}`);
console.log(`Command: ${commandArgs.join(' ')}`);

if (commandArgs.length === 0) {
  console.error('No command specified after --');
  process.exit(1);
}

// Start timer
const startedAt = new Date().toISOString();

// Execute command
const startTime = Date.now();

try {
  // Execute with shell to support commands like "npm run"
  const result = spawnSync(commandArgs.join(' '), {
    stdio: 'pipe',
    shell: true,
    encoding: 'utf-8'
  });

  const endTime = Date.now();
  const finishedAt = new Date().toISOString();
  const durationMs = endTime - startTime;
  const exitCode = result.status;

  // Save output to log file
  const logPath = path.join(outputDir, `${commandName}.log`);
  fs.writeFileSync(logPath, result.stdout, 'utf8');

  // Compute SHA-256 hash (use canonical form)
  const logContent = fs.readFileSync(logPath, 'utf8');
  const canonicalContent = logContent
    .replace(/\x1b\[[0-9;]*m/g, '') // Remove ANSI codes
    .replace(/\r\n/g, '\n')         // Normalize line endings
    .replace(/\r/g, '\n');          // Normalize remaining carriage returns
  const sha256 = crypto.createHash('sha256').update(canonicalContent).digest('hex');

  // Determine status
  const status = exitCode === 0 ? 'PASSED' : 'FAILED';

  // Create proof manifest
  const manifest = {
    runId,
    command: commandArgs.join(' '),
    startedAt,
    finishedAt,
    durationMs,
    exitCode,
    logPath,
    sha256,
    status
  };

  const manifestPath = path.join(outputDir, 'proof-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');

  // Output summary
  console.log(`\nProof Manifest Created:`);
  console.log(`  Run ID: ${runId}`);
  console.log(`  Command: ${manifest.command}`);
  console.log(`  Status: ${status}`);
  console.log(`  Exit Code: ${exitCode}`);
  console.log(`  Duration: ${durationMs}ms`);
  console.log(`  SHA-256: ${sha256.substring(0, 16)}...`);
  console.log(`\nEvidence:`);
  console.log(`  Log: ${logPath}`);
  console.log(`  Manifest: ${manifestPath}`);

  // Create/update state.json
  const statePath = path.join(outputDir, 'state.json');
  let state = { runId, currentState: 'VERIFY' };

  if (fs.existsSync(statePath)) {
    state = JSON.parse(fs.readFileSync(statePath, 'utf-8'));
    state.currentState = 'VERIFY';
    state.updatedAt = finishedAt;
  } else {
    state = {
      runId,
      currentState: 'VERIFY',
      previousStates: ['IMPLEMENT'],
      revisionCount: 0,
      revisionBudget: 2,
      startedAt,
      updatedAt: finishedAt
    };
  }

  fs.writeFileSync(statePath, JSON.stringify(state, null, 2), 'utf-8');

  // Exit with same code as command (but don't fail on 0 for PASSED)
  if (exitCode !== 0 && status === 'FAILED') {
    console.error(`\nCommand FAILED with exit code ${exitCode}`);
    process.exit(1);
  }

  console.log(`\n✓ State advanced to VERIFY`);
  process.exit(0);

} catch (error) {
  const finishedAt = new Date().toISOString();
  const durationMs = Date.now() - startTime;
  const exitCode = 1;

  console.error(`\n✗ Command execution failed:`, error.message);

  // Create failure manifest
  const manifest = {
    runId,
    command: commandArgs.join(' '),
    startedAt,
    finishedAt,
    durationMs,
    exitCode,
    logPath: null,
    sha256: null,
    status: 'FAILED',
    error: error.message
  };

  const manifestPath = path.join(outputDir, 'proof-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');

  console.error(`\n✗ State stuck in IMPLEMENT (command failed)`);
  process.exit(1);
}
