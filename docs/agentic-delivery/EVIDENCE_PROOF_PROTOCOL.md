# Evidence Proof Protocol

## Purpose

Define requirements for proof manifests, SHA-256 verification, and evidence validation for the Proben.io agent harness system. Prevents fake evidence and ensures real verification.

## Core Principle

> **A marker file alone is not evidence. The proof must be derived from real command output.**

**Verification Hierarchy:**
1. **Real command output** — Captured stdout/stderr
2. **SHA-256 hash** — Cryptographic proof of output
3. **Proof manifest** — Metadata linking hash to output
4. **State transition** — Verified before allowing progression

## Proof Manifest

### Required Fields

```json
{
  "runId": "uuid-v4",
  "command": "npm run typecheck",
  "startedAt": "2026-06-10T18:00:00.000Z",
  "finishedAt": "2026-06-10T18:00:05.123Z",
  "durationMs": 5123,
  "exitCode": 0,
  "logPath": "test-results/harness/abc123/typecheck.log",
  "sha256": "a1b2c3d4e5f6...",
  "status": "PASSED"
}
```

### Field Definitions

- **runId** — Unique identifier for this harness run
- **command** — Full command that was executed
- **startedAt** — ISO timestamp when command started
- **finishedAt** — ISO timestamp when command finished
- **durationMs** — Duration in milliseconds
- **exitCode** — Process exit code (0 = success, non-zero = failure)
- **logPath** — Path to captured log file
- **sha256** — SHA-256 hash of log file contents
- **status** — PASSED or FAILED

### Status Determination

**PASSED:** exitCode === 0

**FAILED:** exitCode !== 0

**Critical:** Status must be derived from real exitCode, not claimed.

## SHA-256 Hashing

### Hash Computation

**Script:** `scripts/harness/run-proof-command.js`

**Process:**
1. Execute command
2. Capture stdout/stderr to log file
3. Compute SHA-256 hash of log file
4. Store hash in proof manifest
5. Store log file for verification

**Hash Requirements:**
- Must use SHA-256 (not MD5, not SHA-1)
- Must hash complete log file
- Must be verifiable (recomputable)

### Hash Verification

**Script:** `scripts/harness/verify-proof-manifest.js`

**Process:**
1. Read proof manifest
2. Read log file from logPath
3. Recompute SHA-256 of log file
4. Compare with manifest.sha256
5. Verify match

**Fail Conditions:**
- Log file missing
- Hash mismatch (tampering detected)
- Manifest malformed
- Stale manifest (old timestamp)

## Proof Command Execution

### Script: run-proof-command.js

**Usage:**
```bash
node scripts/harness/run-proof-command.js --name <command-name> -- <command>
```

**Examples:**
```bash
node scripts/harness/run-proof-command.js --name typecheck -- npm run typecheck
node scripts/harness/run-proof-command.js --name tests -- npm test
node scripts/harness/run-proof-command.js --name build -- npm run build
node scripts/harness/run-proof-command.js --name dom-blockers -- npm test -- slice-a-header-parity
```

### Output Structure

```
test-results/harness/<run-id>/
├── typecheck.log
├── tests.log
├── build.log
├── proof-manifest.json
└── state.json
```

### Log File Format

**Captured Output:**
- Complete stdout
- Complete stderr
- Exit code
- Start timestamp
- Finish timestamp
- Duration

**Not Captured:**
- Interactive input (should be automated)
- Terminal colors (plaintext output)
- ANSI codes (stripped for hash consistency)

## Required Commands for Release

### For All Work

**Minimum Required:**
1. `typecheck` — TypeScript compilation
2. `tests` — Test execution
3. `build` — Build verification

**Release-Critical Work:**
- All of above plus:
- Custom tests for specific functionality

### For UI Work (Release-Critical)

**Required:**
1. `typecheck` — TypeScript compilation
2. `tests` — Test execution
3. `build` — Build verification
4. `DOM blocker test` — Required/forbidden elements
5. `visual evidence report` — Screenshot comparison

**Visual Evidence Requirements:**
- BEFORE screenshot
- TARGET screenshot
- AFTER screenshot
- DIFF or side-by-side report
- DOM blocker results
- Visual report
- Human override section

## Proof Verification

### Script: verify-proof-manifest.js

**Usage:**
```bash
node scripts/harness/verify-proof-manifest.js <run-id>
```

**Verification Steps:**

1. **Read Manifest**
   - Load `proof-manifest.json`
   - Validate structure
   - Check timestamp (not stale)

2. **Verify Log File Exists**
   - Check logPath file exists
   - Fail if missing

3. **Recompute SHA-256**
   - Read log file
   - Compute SHA-256 hash
   - Compare with manifest.sha256

4. **Verify Status**
   - Check manifest.status === "PASSED"
   - Verify derived from exitCode === 0

5. **Verify Timestamp**
   - Check not stale (within current work session)
   - Verify reasonable duration

**Fail Conditions:**
- ❌ Manifest file missing
- ❌ Log file missing
- ❌ SHA-256 mismatch (tampering)
- ❌ Status claims PASSED but exitCode !== 0
- ❌ Manifest is stale
- ❌ Duration is suspicious (too fast/slow)

### Exit Codes

**On Success:** Exit 0

**On Failure:** Exit 1 with error message describing verification failure

## Evidence Package

### For UI Work

**Required Evidence:**

1. **Proof Manifests**
   - `typecheck.proof-manifest.json`
   - `tests.proof-manifest.json`
   - `build.proof-manifest.json`
   - `dom-blockers.proof-manifest.json`

2. **Log Files**
   - `typecheck.log`
   - `tests.log`
   - `build.log`
   - `dom-blockers.log`

3. **Visual Evidence**
   - `before.png`
   - `target.png`
   - `after.png`
   - `diff.html` or `side-by-side-report.html`

4. **DOM Blocker Results**
   - `dom-blocker-results.json`

5. **Visual Report**
   - `visual-review-report.html`

### Evidence Package Completeness

**For UI ACCEPTANCE:**
- ✅ All proof manifests valid
- ✅ All SHA-256 hashes verified
- ✅ All required commands passed
- ✅ DOM blockers passed
- ✅ Visual evidence complete (BEFORE/TARGET/AFTER)
- ✅ Visual report generated
- ✅ Human override section filled

**Missing Evidence = BLOCK:**
- ❌ Cannot transition from VERIFY to REVIEW
- ❌ Cannot transition from REVIEW to CLOSE
- ❌ Cannot complete CLOSE state

## State Transition Evidence Requirements

### IMPLEMENT → VERIFY

**Required Evidence:**
- Implementation complete
- Tests written and passing
- Proof manifests generated (if required commands run)
- Evidence captured (if UI work)

**Verification:**
- Check state.json shows IMPLEMENT
- Check tests passing
- Check proof manifests exist

### VERIFY → REVIEW

**Required Evidence:**
- All proof manifests PASSED
- SHA-256 hashes verified
- Evidence complete (if UI work)

**Verification:**
- Run `verify-proof-manifest.js` for all required commands
- Check visual evidence exists (if UI work)
- Validate all exit codes === 0

### REVIEW → CLOSE

**Required Evidence:**
- Review complete
- Evidence verified
- Review verdict: ACCEPTED
- No outstanding blockers

**Verification:**
- Check review report exists
- Check human approval recorded
- Check harness report generated

### CLOSE → RETRO

**Required Evidence:**
- Evidence package complete
- All proofs verified
- Harness report generated
- Human approval recorded

**Verification:**
- Check evidence package complete
- Check all proofs verified
- Check retro entry exists

## Fake Evidence Prevention

### Marker Files Are Not Evidence

**Problem:** Marker files (like `.done`, `.success`) can be created without real verification.

**Solution:** SHA-256 hash of real command output.

**Prevention:**
- Hash must be computed from real output
- Hash must be verifiable
- Hash must be recomputable
- Log file must exist with content

### Test Execution Verification

**Problem:** Tests may be marked as "passing" without real execution.

**Solution:** Real test output with SHA-256 hash.

**Prevention:**
- Capture test output
- Hash test output
- Verify test output contains test results
- Verify test duration is reasonable (not instantaneous)

### UI Evidence Verification

**Problem:** Screenshots can be faked or stale.

**Solution:** Multi-part evidence with timestamps.

**Prevention:**
- BEFORE screenshot (timestamped)
- AFTER screenshot (timestamped)
- Target screenshot (reference)
- Diff comparison (generated)
- Evidence manifest (metadata)
- All components must be consistent

## Hash Computation Details

### SHA-256 Algorithm

**Node.js Implementation:**
```javascript
const crypto = require('crypto');
const fs = require('fs');

function computeSHA256(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex');
}
```

### Hash Consistency

**Important:** Hash must be computed consistently:

**DO:**
- Hash raw file content
- Use UTF-8 encoding for text files
- Include complete file (no truncation)
- Use canonical line endings

**DON'T:**
- Hash with formatting/stripping
- Hash only first N lines
- Hash with encoding changes
- Hash with platform-specific paths

## Proof Manifest Best Practices

### DO

- **DO** include all required fields
- **DO** use ISO 8601 timestamps
- **DO** compute SHA-256 from complete log file
- **DO** verify hash before trusting status
- **DO** check log file exists before trusting hash
- **DO** validate timestamps are recent

### DON'T

- **DON'T** create marker files instead of running commands
- **DON'T** claim PASSED without exitCode === 0
- **DON'T** use old manifests (stale evidence)
- **DON'T** modify log files after hashing (breaks hash)
- **DON'T** trust manifests without log files
- **DON'T** ignore SHA-256 mismatches

## State Transition Verification

### Script: validate-state-transition.js

**Purpose:** Validate state transitions are allowed and evidence is complete.

**Usage:**
```bash
node scripts/harness/validate-state-transition.js --from IMPLEMENT --to VERIFY --run-id <run-id>
```

**Validates:**
- Transition is allowed (not in forbidden list)
- Entry criteria met for target state
- Exit criteria met for source state
- Evidence requirements satisfied
- Revision budget available (if IMPLEMENT target)

**Blocks if:**
- Invalid transition
- Evidence missing
- Proof manifests failed
- Budget exhausted

## Related Documentation

- **[CASE_INSPIRED_AGENT_HARNESS.md](CASE_INSPIRED_AGENT_HARNESS.md)** — Harness overview
- **[AGENT_STATE_MACHINE.md](AGENT_STATE_MACHINE.md)** — State machine details
- **[REVISION_LOOP_POLICY.md](REVISION_LOOP_POLICY.md)** — Revision budget
- **[../../CLAUDE.md](../../CLAUDE.md)** — Harness rules
- **[../../docs/PHASE_GATE_POLICY.md](../../docs/PHASE_GATE_POLICY.md)** — Harness gate

---

**Last Updated:** 2026-06-10
**Version:** 1.0
**Inspired By:** Nick Nisi's "Case" from WorkOS
