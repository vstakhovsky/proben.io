# MCP (Model Context Protocol) Integrations - Proben.io

## Overview

This document describes the Model Context Protocol (MCP) server integrations configured for Proben.io. MCP enables AI assistants to interact with external systems, databases, and services in a controlled manner.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Claude Code / AI Assistant              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      MCP Client Layer                       │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ MCP Server 1 │    │ MCP Server 2 │    │ MCP Server N │
│  (Database)  │    │   (Files)    │    │  (Custom)    │
└──────────────┘    └──────────────┘    └──────────────┘
```

## Core Integrations

### 1. Database MCP Server

#### Purpose
Enables AI assistants to query and interact with the PostgreSQL database safely.

#### Configuration

```json
{
  "mcpServers": {
    "database": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres",
        "postgresql://user:password@localhost:5432/proben"
      ],
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://user:password@localhost:5432/proben"
      }
    }
  }
}
```

#### Available Tools

##### `query_database`
Execute read-only SQL queries.

```typescript
// Example usage
const result = await mcpCall('query_database', {
  query: "SELECT * FROM users WHERE created_at > NOW() - INTERVAL '7 days'"
});
```

**Constraints:**
- Read-only operations only
- Query timeout: 30 seconds
- Result limit: 1000 rows
- No DDL/DML statements

##### `describe_table`
Get table schema information.

```typescript
const schema = await mcpCall('describe_table', {
  table_name: 'users'
});
```

#### Security Considerations
- Connection string in environment variables only
- Separate read-only database user for MCP
- Query logging and monitoring
- Rate limiting on database connections

### 2. Filesystem MCP Server

#### Purpose
Controlled access to project files for reading and writing.

#### Configuration

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/veniamin/Projects/proben.io"
      ],
      "env": {
        "ALLOWED_DIRECTORIES": "/Users/veniamin/Projects/proben.io"
      }
    }
  }
}
```

#### Available Tools

##### `read_file`
Read file contents with proper error handling.

```typescript
const content = await mcpCall('read_file', {
  path: 'src/app/page.tsx'
});
```

##### `write_file`
Write content to files with validation.

```typescript
await mcpCall('write_file', {
  path: 'src/components/UserCard.tsx',
  content: 'export function UserCard() { ... }'
});
```

##### `list_directory`
List directory contents with filtering.

```typescript
const files = await mcpCall('list_directory', {
  path: 'src/app',
  recursive: false
});
```

#### Security Considerations
- Sandboxed to project directory
- No access to system files
- Write operations require confirmation
- File size limits enforced
- Binary file protection

### 3. Web Research MCP Server

#### Purpose
Enable AI to perform web searches and fetch external resources.

#### Configuration

```json
{
  "mcpServers": {
    "web-search": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-brave-search"
      ],
      "env": {
        "BRAVE_API_KEY": "${BRAVE_API_KEY}"
      }
    }
  }
}
```

#### Available Tools

##### `web_search`
Perform web searches with context awareness.

```typescript
const results = await mcpCall('web_search', {
  query: "Next.js 15 App Router best practices 2025",
  num_results: 5,
  time_range: "2024-01-01..2025-12-31"
});
```

##### `fetch_url`
Fetch and process web content.

```typescript
const content = await mcpCall('fetch_url', {
  url: "https://nextjs.org/docs/app",
  format: "markdown"
});
```

#### Security Considerations
- API key stored securely
- Rate limiting implemented
- Content filtering for malicious sites
- Timeout protection
- No access to internal resources

### 4. Git Operations MCP Server

#### Purpose
Controlled git operations for repository management.

#### Configuration

```json
{
  "mcpServers": {
    "git": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-git",
        "/Users/veniamin/Projects/proben.io"
      ]
    }
  }
}
```

#### Available Tools

##### `git_status`
Check repository status.

```typescript
const status = await mcpCall('git_status', {});
```

##### `git_diff`
View changes in files.

```typescript
const diff = await mcpCall('git_diff', {
  file: 'src/app/page.tsx',
  cached: false
});
```

##### `git_log`
View commit history.

```typescript
const history = await mcpCall('git_log', {
  max_count: 10,
  since: "1 week ago"
});
```

#### Security Considerations
- No force push allowed
- No direct main branch modification
- All destructive operations require confirmation
- Commit signing verification
- Branch protection rules enforced

### 5. Evaluation MCP Server

#### Purpose
Run evaluations and tests through MCP interface.

#### Configuration

```json
{
  "mcpServers": {
    "evaluation": {
      "command": "node",
      "args": [
        ".claude/servers/evaluation-server.js"
      ]
    }
  }
}
```

#### Available Tools

##### `run_tests`
Execute test suites.

```typescript
const results = await mcpCall('run_tests', {
  suite: "unit",
  pattern: "User*.test.ts"
});
```

##### `run_evaluations`
Run AI system evaluations.

```typescript
const evalResults = await mcpCall('run_evaluations', {
  eval_name: "content-quality",
  num_samples: 100
});
```

#### Security Considerations
- Sandbox test execution
- Resource limits enforced
- Test data isolation
- No access to production systems
- Result size limits

## Custom MCP Servers

### Creating Custom Servers

#### Template: Custom Evaluation Server

```javascript
// .claude/servers/evaluation-server.js
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new Server({
  name: 'proben-evaluation',
  version: '1.0.0'
});

server.setRequestHandler('tools/list', async () => ({
  tools: [
    {
      name: 'evaluate_feature',
      description: 'Evaluate a feature implementation',
      inputSchema: {
        type: 'object',
        properties: {
          feature_id: { type: 'string' },
          criteria: { type: 'array', items: { type: 'string' } }
        },
        required: ['feature_id']
      }
    }
  ]
}));

server.setRequestHandler('tools/call', async (request) => {
  if (request.params.name === 'evaluate_feature') {
    const { feature_id, criteria } = request.params.arguments;
    // Implementation here
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({ feature_id, score: 0.85, details: [...] })
      }]
    };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
```

## Configuration Management

### Local Configuration

Create `.claude/settings.local.json`:

```json
{
  "mcpServers": {
    "database-local": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://localhost:5432/proben_dev"
      }
    }
  }
}
```

### Production Configuration

Use environment variables:

```json
{
  "mcpServers": {
    "database": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "${DATABASE_URL}"
      }
    }
  }
}
```

## Monitoring and Debugging

### Connection Status

Check MCP server connections:

```bash
# Test MCP server connectivity
npx @modelcontextprotocol/inspector

# View server logs
tail -f .claude/logs/mcp-*.log
```

### Debugging Tools

#### MCP Inspector
```bash
npx @modelcontextprotocol/inspector
```

#### Connection Test
```typescript
import { Client } from '@modelcontextprotocol/sdk/client/index.js';

const client = new Client();
await client.connect(transport);
const tools = await client.listTools();
console.log('Available tools:', tools);
```

## Best Practices

### Security
1. **Secrets Management**
   - Use environment variables for all credentials
   - Rotate API keys regularly
   - Audit access logs
   - Implement rate limiting

2. **Access Control**
   - Principle of least privilege
   - Separate credentials per environment
   - Read-only access where possible
   - Audit trail for all operations

### Performance
1. **Connection Pooling**
   - Reuse connections when possible
   - Implement connection limits
   - Monitor connection health
   - Graceful degradation

2. **Caching**
   - Cache read operations
   - Invalidate cache on updates
   - Use TTL policies
   - Monitor cache hit rates

### Reliability
1. **Error Handling**
   - Implement retry logic
   - Circuit breakers for failures
   - Graceful degradation
   - Comprehensive logging

2. **Monitoring**
   - Track response times
   - Monitor error rates
   - Alert on anomalies
   - Regular health checks

## Troubleshooting

### Common Issues

**Connection Failed**
```bash
# Check server is running
ps aux | grep mcp

# Test connection string
psql $DATABASE_URL

# Check port availability
lsof -i :5432
```

**Timeout Errors**
- Increase timeout in configuration
- Check network connectivity
- Verify server health
- Review server logs

**Authentication Errors**
- Verify credentials
- Check API key validity
- Review permissions
- Test with manual connection

## Roadmap

### Planned Integrations
- [ ] Redis MCP Server (caching operations)
- [ ] S3 MCP Server (file storage)
- [ ] Slack MCP Server (notifications)
- [ ] Linear MCP Server (issue tracking)
- [ ] Sentry MCP Server (error tracking)

### Enhancements
- [ ] Custom evaluation metrics
- [ ] Performance monitoring dashboards
- [ ] Automated security scanning
- [ ] Integration testing framework

---

**Last Updated**: 2025-06-08
**MCP Version**: Latest
**Related Docs**: `docs/HOOKS.md`, `CLAUDE.md`
