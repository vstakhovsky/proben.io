#!/usr/bin/env node

/**
 * Verify Proof Manifest Script
 *
 * Verifies proof manifests by:
 * - Reading proof-manifest.json
 * - Recomputing SHA-256 from log files
 * - Verifying hashes match
 * - Verifying exitCode === 0 for required commands
 * - Failing if logs are missing
 * - Failing if manifest is stale
 *
 * Usage:
 *   node scripts/harness/verify-proof-manifest.js <run-id>
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Parse command line arguments
const runId = process.argv[2];

if (!runId) {
  console.error('Missing required argument: run-id');
  console.error('Usage: node scripts/harness/verify-proof-manifest.js <run-id>');
  process.exit(1);
}

// Construct paths
const harnessDir = path.join(process.cwd(), 'test-results', 'harness', runId);
const manifestPath = path.join(harnessDir, 'proof-manifest.json');

console.log(`Verifying proof manifest for run: ${runId}`);
console.log(`Manifest path: ${manifestPath}`);

// Check if manifest exists
if (!fs.existsSync(manifestPath)) {
  console.error('✗ Manifest file does not exist');
  process.exit(1);
}

// Read manifest
let manifest;
try {
  const manifestContent = fs.readFileSync(manifestPath, 'utf-8');
  manifest = JSON.parse(manifestContent);
} catch (error) {
  console.error('✗ Failed to read or parse manifest:', error.message);
  process.exit(1);
}

console.log(`\nManifest loaded for command: ${manifest.command}`);

// Verification results
const errors = [];
const warnings = [];

// 1. Verify log file exists
if (!manifest.logPath) {
  errors.push('Manifest missing logPath');
} else {
  // Handle both absolute and relative paths
  const logFullPath = path.isAbsolute(manifest.logPath)
    ? manifest.logPath
    : path.join(process.cwd(), manifest.logPath);

  if (!fs.existsSync(logFullPath)) {
    errors.push(`Log file does not exist: ${manifest.logPath}`);
  } else {
    console.log(`✓ Log file exists: ${manifest.logPath}`);

    // 2. Recompute SHA-256
    try {
      const logContent = fs.readFileSync(logFullPath, 'utf8');

      // Use canonical form for hash comparison (strip ANSI codes, normalize line endings)
      const canonicalContent = logContent
        .replace(/\x1b\[[0-9;]*m/g, '') // Remove ANSI codes
        .replace(/\r\n/g, '\n')         // Normalize line endings
        .replace(/\r/g, '\n');          // Normalize remaining carriage returns

      const canonicalHash = crypto.createHash('sha256').update(canonicalContent).digest('hex');

      if (!manifest.sha256) {
        errors.push('Manifest missing sha256');
      } else if (canonicalHash !== manifest.sha256) {
        errors.push(`SHA-256 mismatch: expected ${manifest.sha256}, got ${canonicalHash}`);
      } else {
        console.log(`✓ SHA-256 verified: ${manifest.sha256.substring(0, 16)}...`);
      }
    } catch (error) {
      errors.push(`Failed to compute SHA-256: ${error.message}`);
    }

    // 3. Verify exit code
    if (manifest.exitCode === undefined) {
      warnings.push('Manifest missing exitCode');
    } else if (manifest.exitCode !== 0) {
      errors.push(`Command failed with exit code ${manifest.exitCode}`);
    } else {
      console.log(`✓ Exit code valid: ${manifest.exitCode}`);
    }

    // 4. Verify status consistency
    if (!manifest.status) {
      warnings.push('Manifest missing status');
    } else {
      const expectedStatus = manifest.exitCode === 0 ? 'PASSED' : 'FAILED';
      if (manifest.status !== expectedStatus) {
        errors.push(`Status inconsistent: status is ${manifest.status}, but exitCode suggests ${expectedStatus}`);
      } else {
        console.log(`✓ Status consistent: ${manifest.status}`);
      }
    }

    // 5. Verify manifest not stale
    if (manifest.startedAt && manifest.finishedAt) {
      const started = new Date(manifest.startedAt);
      const finished = new Date(manifest.finishedAt);
      const logStats = fs.statSync(logFullPath);
      const logModified = new Date(logStats.mtime);

      // Log file should be newer than or equal to finishedAt
      if (logModified < finished) {
        warnings.push('Manifest may be stale (log file older than manifest finishedAt)');
      } else {
        console.log(`✓ Manifest appears fresh`);
      }

      // Verify duration is reasonable
      const duration = finished - started;
      if (duration < 0) {
        errors.push('Invalid duration (finishedAt before startedAt)');
      } else if (duration < 10) {
        warnings.push('Suspiciously short duration (may be fake execution)');
      } else {
        console.log(`✓ Duration reasonable: ${manifest.durationMs || duration}ms`);
      }
    } else {
      warnings.push('Manifest missing timestamps (cannot verify staleness)');
    }
  }
}

// Output results
console.log(`\n=== Verification Results ===`);

if (errors.length === 0 && warnings.length === 0) {
  console.log(`✓ Proof manifest VALID`);
  console.log(`\nVerified:`);
  console.log(`  Run ID: ${runId}`);
  console.log(`  Command: ${manifest.command}`);
  console.log(`  Status: ${manifest.status}`);
  console.log(`  SHA-256: ${manifest.sha256?.substring(0, 16)}...`);
  console.log(`  Log: ${manifest.logPath}`);
  process.exit(0);
} else {
  if (errors.length > 0) {
    console.error(`\n✗ Proof manifest INVALID`);
    console.error(`\nErrors:`);
    errors.forEach(error => console.error(`  ✗ ${error}`));
  }

  if (warnings.length > 0) {
    console.warn(`\nWarnings:`);
    warnings.forEach(warning => console.warn(`  ⚠ ${warning}`));
  }

  console.error(`\n✗ Verification FAILED`);
  process.exit(1);
}
