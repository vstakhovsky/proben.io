# Claude Code Hooks - Proben.io

## Overview

This document describes the Claude Code hooks configured for Proben.io. Hooks enable automated workflows that trigger at specific points during AI-assisted development.

## Hook Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Claude Code Session                      │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  Tool Hooks  │    │ Session Hooks│    │  Agent Hooks │
│              │    │              │    │              │
│ - Edit tool  │    │ - On start   │    │ - Before     │
│ - Read tool  │    │ - On end     │    │   agent spawn│
│ - Bash tool  │    │ - On error   │    │ - After      │
│ - Write tool │    │              │    │   agent exit │
└──────────────┘    └──────────────┘    └──────────────┘
```

## Configuration Structure

### Settings File Location
- Global: `~/.claude/settings.json`
- Project: `.claude/settings.json`
- Local: `.claude/settings.local.json` (gitignored)

### Priority Order
1. Local settings (highest priority)
2. Project settings
3. Global settings (lowest priority)

## Tool Hooks

### Pre-Edit Hook
Triggers before file editing operations.

```json
{
  "hooks": {
    "tool": {
      "pre-edit": {
        "command": "bash",
        "args": [
          "-c",
          "echo \"Editing: ${FILE_PATH}\" >> .claude/logs/edit.log"
        ],
        "env": {
          "FILE_PATH": "${file_path}"
        }
      }
    }
  }
}
```

### Post-Edit Hook
Triggers after successful file edits.

```json
{
  "hooks": {
    "tool": {
      "post-edit": {
        "command": "node",
        "args": [
          ".claude/hooks/update-timestamp.js",
          "${file_path}"
        ]
      }
    }
  }
}
```

### Pre-Bash Hook
Triggers before shell command execution.

```json
{
  "hooks": {
    "tool": {
      "pre-bash": {
        "command": "bash",
        "args": [
          "-c",
          "if echo \"${command}\" | grep -q 'git push'; then echo \"🔒 Git push requires approval\"; exit 1; fi"
        ],
        "env": {
          "command": "${command}"
        }
      }
    }
  }
}
```

### Post-Bash Hook
Triggers after shell command execution.

```json
{
  "hooks": {
    "tool": {
      "post-bash": {
        "command": "bash",
        "args": [
          "-c",
          "echo \"Command: ${command} | Exit: ${exit_code}\" >> .claude/logs/bash.log"
        ],
        "env": {
          "command": "${command}",
          "exit_code": "${exit_code}"
        }
      }
    }
  }
}
```

## Session Hooks

### On Session Start
Initializes environment when Claude Code starts.

```json
{
  "hooks": {
    "session": {
      "on-start": {
        "command": "bash",
        "args": [
          "-c",
          "mkdir -p .claude/logs && echo \"Session started: $(date)\" > .claude/logs/session.log"
        ]
      }
    }
  }
}
```

### On Session End
Cleanup when Claude Code exits.

```json
{
  "hooks": {
    "session": {
      "on-end": {
        "command": "bash",
        "args": [
          "-c",
          "echo \"Session ended: $(date)\" >> .claude/logs/session.log && echo \"Duration: ${DURATION}s\" >> .claude/logs/session.log"
        ],
        "env": {
          "DURATION": "${session_duration}"
        }
      }
    }
  }
}
```

### On Error
Triggers on session errors.

```json
{
  "hooks": {
    "session": {
      "on-error": {
        "command": "bash",
        "args": [
          "-c",
          "echo \"Error: ${ERROR_MESSAGE}\" >> .claude/logs/errors.log"
        ],
        "env": {
          "ERROR_MESSAGE": "${error_message}"
        }
      }
    }
  }
}
```

## Agent Hooks

### Pre-Agent-Spawn
Triggers before spawning a new agent.

```json
{
  "hooks": {
    "agent": {
      "pre-spawn": {
        "command": "bash",
        "args": [
          "-c",
          "echo \"Spawning agent: ${AGENT_TYPE}\" >> .claude/logs/agents.log"
        ],
        "env": {
          "AGENT_TYPE": "${agent_type}",
          "AGENT_ID": "${agent_id}"
        }
      }
    }
  }
}
```

### Post-Agent-Exit
Triggers after agent completion.

```json
{
  "hooks": {
    "agent": {
      "post-exit": {
        "command": "bash",
        "args": [
          "-c",
          "echo \"Agent ${AGENT_ID} completed with status: ${STATUS}\" >> .claude/logs/agents.log"
        ],
        "env": {
          "AGENT_ID": "${agent_id}",
          "STATUS": "${exit_status}",
          "DURATION": "${duration}"
        }
      }
    }
  }
}
```

## Custom Hook Implementations

### Security Scanner Hook
Automatically scan files for security issues.

```javascript
// .claude/hooks/security-scanner.js
const fs = require('fs');
const path = require('path');

const filePath = process.env.FILE_PATH;
const content = fs.readFileSync(filePath, 'utf8');

// Security checks
const issues = [];

// Check for secrets
if (/password|secret|api[_-]?key/i.test(content) && /=.*['"][^'"]{10,}['"]/.test(content)) {
  issues.push('Potential secret detected');
}

// Check for eval
if (/\beval\s*\(/.test(content)) {
  issues.push('Dangerous eval() usage');
}

// Check for innerHTML
if (/\.innerHTML\s*=/.test(content)) {
  issues.push('Potential XSS vulnerability via innerHTML');
}

if (issues.length > 0) {
  console.error('Security issues found:');
  issues.forEach(issue => console.error(`  - ${issue}`));
  process.exit(1);
}
```

Configuration:
```json
{
  "hooks": {
    "tool": {
      "post-edit": {
        "command": "node",
        "args": [".claude/hooks/security-scanner.js"]
      }
    }
  }
}
```

### Test Runner Hook
Run relevant tests after code changes.

```javascript
// .claude/hooks/test-runner.js
const { execSync } = require('child_process');

const filePath = process.env.FILE_PATH;
const isTestFile = filePath.includes('.test.') || filePath.includes('.spec.');

if (isTestFile) {
  console.log('Running updated test...');
  try {
    execSync(`pnpm test ${filePath}`, { stdio: 'inherit' });
  } catch (error) {
    console.error('Test failed');
    process.exit(1);
  }
} else if (filePath.startsWith('src/')) {
  console.log('Running related tests...');
  try {
    execSync(`pnpm test --changed`, { stdio: 'inherit' });
  } catch (error) {
    console.error('Related tests failed');
    process.exit(1);
  }
}
```

### Memory Update Hook
Update memory based on conversation context.

```javascript
// .claude/hooks/memory-updater.js
const fs = require('fs');
const path = require('path');

const memoryDir = path.join(process.cwd(), '.claude', 'memory');
const sessionLog = process.env.SESSION_LOG_PATH;

if (sessionLog && fs.existsSync(sessionLog)) {
  const content = fs.readFileSync(sessionLog, 'utf8');
  
  // Extract key information
  const userPreferences = content.match(/User prefers: (.+)/gi);
  const decisions = content.match(/Decision: (.+)/gi);
  
  if (userPreferences || decisions) {
    const timestamp = new Date().toISOString();
    const entry = {
      timestamp,
      preferences: userPreferences || [],
      decisions: decisions || []
    };
    
    const memoryPath = path.join(memoryDir, `session-${Date.now()}.json`);
    fs.writeFileSync(memoryPath, JSON.stringify(entry, null, 2));
    console.log('Memory updated');
  }
}
```

## Environment Variables

### Available Variables

#### Tool Hooks
- `${file_path}`: File being edited/read/written
- `${command}`: Bash command being executed
- `${exit_code}`: Exit code from bash command
- `${tool_name}`: Name of tool being used

#### Session Hooks
- `${session_id}`: Unique session identifier
- `${session_duration}`: Session duration in seconds
- `${error_message}`: Error message (on error)

#### Agent Hooks
- `${agent_type}`: Type of agent being spawned
- `${agent_id}`: Unique agent identifier
- `${exit_status}`: Agent exit status
- `${duration}`: Agent execution duration

## Logging and Monitoring

### Log Structure

```
.claude/logs/
├── session.log       # Session lifecycle events
├── edit.log          # File edit operations
├── bash.log          # Bash command execution
├── agents.log        # Agent lifecycle
├── errors.log        # Error events
└── hooks.log         # Hook execution logs
```

### Log Rotation

```javascript
// .claude/hooks/log-rotator.js
const fs = require('fs');
const path = require('path');

const logsDir = path.join(process.cwd(), '.claude', 'logs');
const maxLogSize = 10 * 1024 * 1024; // 10MB

fs.readdirSync(logsDir).forEach(file => {
  const logPath = path.join(logsDir, file);
  const stats = fs.statSync(logPath);
  
  if (stats.size > maxLogSize) {
    const timestamp = new Date().toISOString().split('T')[0];
    const archivePath = path.join(logsDir, `${file}.${timestamp}.gz`);
    
    // Compress and archive
    // (implementation depends on compression library)
    
    // Clear current log
    fs.writeFileSync(logPath, '');
  }
});
```

## Best Practices

### Performance
1. **Keep Hooks Fast**: Hooks execute synchronously
2. **Background Processing**: Use background jobs for heavy tasks
3. **Error Handling**: Always handle errors gracefully
4. **Resource Limits**: Monitor CPU/memory usage

### Security
1. **No Secrets in Hooks**: Use environment variables
2. **Validate Inputs**: Check all user-provided data
3. **Least Privilege**: Run with minimal permissions
4. **Audit Logs**: Track all hook executions

### Reliability
1. **Idempotency**: Hooks should be safe to retry
2. **Failure Handling**: Don't break the workflow on hook failure
3. **Testing**: Test hooks in isolation
4. **Monitoring**: Track hook success/failure rates

## Troubleshooting

### Hook Not Executing
1. Check file permissions
2. Verify shebang (#!/bin/bash, #!/usr/bin/env node)
3. Test command manually
4. Check hook logs

### Hook Timeout
1. Optimize hook performance
2. Add timeout configuration
3. Use background processing
4. Monitor resource usage

### Environment Variables Not Available
1. Check variable name spelling
2. Verify hook type supports variable
3. Test with echo command
4. Review hook documentation

## Example Configurations

### Development Hooks
```json
{
  "hooks": {
    "tool": {
      "post-edit": {
        "command": "bash",
        "args": ["-c", "pnpm type-check 2>&1 | grep -i error || true"]
      }
    },
    "session": {
      "on-start": {
        "command": "bash",
        "args": ["-c", "echo '🚀 Development session started'"]
      }
    }
  }
}
```

### Production Hooks
```json
{
  "hooks": {
    "tool": {
      "post-edit": {
        "command": "bash",
        "args": [
          "-c",
          "node .claude/hooks/security-scanner.js && pnpm test --changed"
        ]
      }
    },
    "session": {
      "on-end": {
        "command": "bash",
        "args": ["-c", "node .claude/hooks/session-summary.js"]
      }
    }
  }
}
```

## Roadmap

### Planned Enhancements
- [ ] Async hook execution
- [ ] Hook composition/chaining
- [ ] Conditional hook execution
- [ ] Hook marketplace/templates
- [ ] Performance metrics dashboard

---

**Last Updated**: 2025-06-08
**Hook Version**: Latest
**Related Docs**: `docs/MCP_INTEGRATIONS.md`, `CLAUDE.md`
