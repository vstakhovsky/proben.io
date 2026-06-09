# Research Digest - Proben.io

This document summarizes key insights from reviewed sources and their application to Proben.io.

## Last Updated: 2026-06-09

---

## Insight: Production-Grade Agents Validate Our Approach

**Source**: [Deep Agents - LangChain](https://lnkd.in/dDgDAijZ) - LangChain team

**Core Insight**: LangChain's Deep Agents release validates the planning-first, human-in-the-loop, subagent-delegation approach that Proben.io implements. We're ahead of mainstream adoption.

**Key Points**:
- Planning first: Agents write structured TODO lists before executing (validates our visual plan approach)
- Subagent delegation: Complex tasks split across isolated sub-agents (validates our fleet loop model)
- Human-in-the-loop built in: Tools require approval before running (validates our approval gates)
- Filesystem access: Agents read/write files (useful for Phase 2+ context management)
- Long-term memory: `/memories/` persist across conversations (useful for Phase 2+ research)

**Relevance to Proben.io**:
- **Validates our approach**: We implemented planning-first workflows before this was mainstream
- **Shows market direction**: Industry moving from "prompt → generate" to "plan → approve → execute"
- **Portfolio value**: "We implemented this before LangChain released Deep Agents"

**Application Status**: Validates our approach; defer framework adoption to Phase 2+

---

## Insight: Design Loops, Not Prompts

**Source**: [Agent Looping / Loop Engineering Pattern](https://loops.elorm.xyz/loops) - Peter Steinberger (quote), multiple practitioners

**Core Insight**: Instead of manually writing one-off prompts for coding agents, design loops that systematically progress through discovery → planning → execution → verification → iteration.

**Key Points**:
- Single-agent loop: One agent handles task end-to-end with discovery, planning, execution, verification, iteration
- Fleet loop: Orchestrator owns goal, specialist agents own subproblems, every agent runs same cycle
- Open looping: Wide exploration—powerful but expensive and risky
- Closed looping: Human defines path first—cheaper, safer, repeatable
- Termination is critical: Loops must stop when acceptance criteria met or max iterations reached
- Verification gates: Every step needs checks against goals and standards

**Relevance to Proben.io**:
- Provides systematic structure for AI-assisted development
- Enables predictable cost through iteration limits
- Makes development process visible and traceable
- Supports portfolio credibility through visible methodology

**Application Status**: Adopted (closed looping first, open looping rejected for now)

---

## Insight: More Context Can Make Agents Dumber

**Source**: [Why More Context Makes Your Agent Dumber and What to Do About It](https://www.youtube.com/watch?v=EcqMYoIV57A) - Nupur Sharma, Qodo

**Core Insight**: Feeding agents more context doesn't make them smarter. Large context windows cause the "U curve" problem: models attend to the start and end of context while dropping information in the middle.

**Key Points**:
- Context window expansion hasn't fixed agent performance issues
- Models struggle with "lost in the middle" phenomenon
- Self-generated context degrades performance over time
- Strategic context optimization outperforms maximal context

**Relevance to Proben.io**:
- Explains why full-codebase context dumps lead to missed requirements
- Validates need for task-specific context packs
- Supports implementation critic before code changes
- Justifies 80/20 approach: heavy reasoning for planning, lightweight for validation

**Application Status**: In review (see source card for details)

---

## Template for Future Insights

```
## Insight: [Title]

**Source**: [Link] - [Author/Speaker]

**Core Insight**: [One sentence summary]

**Key Points**:
- [Point 1]
- [Point 2]
- [Point 3]

**Relevance to Proben.io**:
- [How it applies]

**Application Status**: [Status]
```
