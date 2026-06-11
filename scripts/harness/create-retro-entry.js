#!/usr/bin/env node

/**
 * Create Retro Entry Script
 *
 * Generates a draft markdown retro entry for learning documentation.
 *
 * Usage:
 *   node scripts/harness/create-retro-entry.js --run-id <run-id> --phase <phase> --slice <slice>
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
const required = ['run-id', 'phase', 'slice'];
for (const req of required) {
  if (!args[req]) {
    console.error(`Missing required argument: --${req}`);
    console.error('Usage: node scripts/harness/create-retro-entry.js --run-id <run-id> --phase <phase> --slice <slice>');
    process.exit(1);
  }
}

const runId = args['run-id'];
const phase = args.phase;
const slice = args.slice;

console.log(`Creating retro entry for run: ${runId}`);
console.log(`Phase: ${phase}, Slice: ${slice}`);

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

// Generate retro entry
const retroDir = path.join(process.cwd(), 'docs', 'product-build-history', 'retro');
fs.mkdirSync(retroDir, { recursive: true });

const retroPath = path.join(retroDir, `${phase}-${slice}-${runId}.md`);

const retroContent = `# Retro: Phase ${phase} Slice ${slice}

## Run Metadata

- **Run ID:** ${runId}
- **Phase:** ${phase}
- **Slice:** ${slice}
- **Started At:** ${state.startedAt || 'Unknown'}
- **Finished At:** ${state.updatedAt || 'Unknown'}
- **Duration:** ${state.durationMs || 'Unknown'}ms
- **Revision Count:** ${state.revisionCount || 0}/${state.revisionBudget || 2}

## What Was Attempted

<!-- TODO: Describe what was implemented -->

## What Passed

<!-- TODO: List what worked correctly -->

- Example: Tests passed
- Example: Typecheck passed
- Example: Build succeeded

## What Failed

<!-- TODO: List what failed or didn't work -->

- Example: Visual parity below threshold
- Example: DOM blocker failed
- Example: Generic SaaS pattern detected

## Repeated Tool Loops

<!-- TODO: Identify any repeated patterns or loops -->

- Example: Same revision attempted twice
- Example: Agent got stuck in loop
- Example: Command retried without progress

## Missing Evidence

<!-- TODO: Identify any missing or incomplete evidence -->

- Example: BEFORE screenshot missing
- Example: DOM blocker results incomplete
- Example: Proof manifest missing

## Wrong Assumptions

<!-- TODO: Identify incorrect assumptions made -->

- Example: Assumed generic layout was acceptable
- Example: Assumed tests passing meant visual acceptance
- Example: Assumed agent PASS was final approval

## New Gotcha Needed

<!-- TODO: Propose new gotchas to prevent recurrence -->

<!-- Example:
### Gotcha: [Title]

**What agents get wrong:** [Description]

**Reality:** [What is actually required]

**Evidence Required:** [What proves the gotcha]
-->

## New Eval Needed

<!-- TODO: Propose new eval cases to prevent recurrence -->

<!-- Example:
### EV-XXX-XXX: [Title]

**Trigger:** [When this eval should run]

**Expected Behavior:** [What should happen]

**Actual Behavior:** [What actually happened]

**Prevention:** [How to prevent recurrence]
-->

## New Gate Needed

<!-- TODO: Propose new gates or gate updates -->

<!-- Example:
### Gate Update: [Gate Name]

**Current State:** [Current gate behavior]

**Problem:** [What the current gate doesn't prevent]

**Proposed Update:** [How to fix the gate]

**Evidence:** [Why this will help]
-->

## Agent/Skill Changes

<!-- TODO: Identify if any agents or skills should be changed -->

<!-- Example:
- **Agent:** [agent-name]
  - **Issue:** [What went wrong]
  - **Change Needed:** [How to fix]
  - **Action:** [UPDATE/DOWNGRADE/DELETE/MERGE]

- **Skill:** [skill-name]
  - **Issue:** [What went wrong]
  - **Change Needed:** [How to fix]
  - **Action:** [KEEP/REWRITE/MERGE/DISABLE/DELETE]
-->

## Learning Outcomes

<!-- TODO: Summarize what was learned -->

1. **Learning:** [What was learned]
   - **How to apply:** [How to use this learning]
   - **Related:** [[related-bld-entry]]

## Related Documentation

- **State:** \`test-results/harness/${runId}/state.json\`
- **Proof Manifest:** \`test-results/harness/${runId}/proof-manifest.json\`
- **Build Learning Log:** \`docs/product-build-history/BUILD_LEARNING_DECISION_LOG.md\`

---

**Created:** ${new Date().toISOString()}
**Status:** Draft (needs human completion)
`;

// Write retro entry
try {
  fs.writeFileSync(retroPath, retroContent, 'utf-8');
  console.log(`✓ Retro entry created: ${retroPath}`);
  console.log(`\n⚠ Retro entry is a DRAFT and requires human completion`);
  console.log(`  Update with actual outcomes, failures, and learnings`);
  process.exit(0);
} catch (error) {
  console.error('✗ Failed to write retro entry:', error.message);
  process.exit(1);
}
