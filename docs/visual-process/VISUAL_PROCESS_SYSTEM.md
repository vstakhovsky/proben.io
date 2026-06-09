# Visual Process System - Proben.io

## Purpose

Proben.io should show the development process as a visible system, not just as code. This document defines the philosophy and structure for making AI-native product development visible through diagrams, visual plans, and process storytelling.

## Last Updated: 2026-06-09

---

## Core Philosophy

**Invisible processes don't impress. Visible processes do.**

AI-native product development is complex. Agents, loops, research, validation, and human oversight all interact. If we only show the final code, we miss the most impressive part: the sophisticated system that builds the code.

**Portfolio value**: Hiring managers want to see how you think, not just what you built. A visible process demonstrates:

- Systematic approach to AI development
- Understanding of agent orchestration
- Research-driven decision making
- Quality through validation gates
- Credibility through transparency

---

## The Core Loop

Proben.io development follows this visible loop:

```
Source → Insight → Product Hypothesis → Visual Plan → Human Feedback → 
Agent Implementation → Validation → Decision Log → Portfolio Page
```

### Why This Loop Matters

**Source → Insight**: We don't just code. We research and learn from the AI community.

**Insight → Hypothesis**: We don't apply everything. We form testable hypotheses about what might work.

**Hypothesis → Visual Plan**: We don't jump to code. We create visual plans that make feedback easy.

**Visual Plan → Human Feedback**: We don't let agents run autonomously. Humans review before implementation.

**Human Feedback → Agent Implementation**: Agents execute approved plans with clear boundaries.

**Implementation → Validation**: We don't assume success. We verify with tests and E2E checks.

**Validation → Decision Log**: We don't hide failures. We document what worked and what didn't.

**Decision → Portfolio Page**: We don't keep process private. We share learning publicly.

---

## Why Visual Plans Matter

### 1. Reduce Ambiguity

**Text-based specs are fragile**:
- Long markdown walls hide requirements
- Prose makes trade-offs invisible
- Ambiguity leads to agent errors

**Visual plans are clear**:
- Flowcharts show sequence explicitly
- Diagrams make relationships visible
- Tables make comparisons clear

### 2. Enable Faster Feedback

**Reading text is slow**:
- Scan through paragraphs
- Parse requirements mentally
- Reconstruct relationships

**Reviewing visuals is fast**:
- See structure at a glance
- Spot gaps quickly
- Compare options side-by-side

### 3. Support Better Decisions

**Text obscures trade-offs**:
- Requirements buried in prose
- Constraints scattered across sections
- Dependencies hidden in paragraphs

**Visuals reveal trade-offs**:
- Decision trees show options
- Flowcharts show dependencies
- Tables show pros and cons

### 4. Create Portfolio Evidence

**Code doesn't show process**:
- Final product hides the work
- Git commits don't tell the story
- README doesn't show sophistication

**Visuals show sophistication**:
- Diagrams demonstrate planning
- Process charts show systematic approach
- Before/after visuals show iteration

---

## Why Agent Loops Need Visual Validation Gates

### The Problem: Agents Report Success Prematurely

Agents often say "done" when:
- Code compiles
- Tests pass
- No obvious errors

But the product might be:
- Broken in browser
- Missing requirements
- Inconsistent with design
- Failing E2E tests

### The Solution: Visual Validation Gates

**Every gate is visible**:
- Type check gate
- Unit test gate
- Build gate
- E2E test gate
- Browser QA gate
- Deployment gate

**Every gate has criteria**:
- What must pass
- What we check
- What happens if it fails

**Every gate is documented**:
- In diagrams
- In run logs
- In portfolio pages

---

## Portfolio Credibility Through Visibility

### What Hiring Managers Want to See

Not just:
- "I built this with AI"
- "I used Cursor/Claude Code"
- "I have agents that write code"

But:
- "Here's my system for AI development"
- "Here's how I validate agent output"
- "Here's where humans intervene"
- "Here's what I learned from research"
- "Here's what I rejected and why"

### What Proben.io Shows

**Visible research**:
- Source cards with insights
- Application decisions with rationale
- Rejected patterns with reasoning

**Visible process**:
- Agent loop diagrams
- Fleet loop structure
- Human-agent handoffs
- Validation gates

**Visible validation**:
- Test results
- E2E checks
- Browser verification
- Deployment status

**Visible learning**:
- What worked
- What failed
- What changed
- What's next

---

## System Components

### 1. Diagram Library

Standardized diagrams for common patterns:
- Agent Loop Diagram
- Fleet Loop Diagram
- Human-Agent Handoff Diagram
- Research-to-Application Diagram
- Validation Gates Diagram
- Visual Plan Lifecycle Diagram
- Context Pack Diagram

**Location**: `docs/diagrams/`

### 2. Visual Plan Templates

Standardized templates for visual planning:
- Task map template
- Flow diagram template
- Risk assessment template
- Validation gate template

**Location**: `docs/visual-process/VISUAL_PLAN_TEMPLATE.md`

### 3. Agent Roles with Visual Responsibilities

Agents that contribute to visual process:
- Visual Systems Designer
- Diagram Engineer
- Process Storyteller
- Portfolio Documentation Engineer

**Location**: `.claude/agents/`

### 4. Skills for Visual Work

Skills for converting to visuals:
- Source to Visual
- Visual Plan Builder
- Mermaid Diagram Generator
- Portfolio Process Page

**Location**: `.claude/skills/`

---

## Process Quality Through Visuals

### AI Coding Quality Depends on Planning Quality

**Garbage in, garbage out**:
- Poor specs → poor agent output
- Ambiguous requirements → agent errors
- Missing validation → broken products

**Quality planning, quality execution**:
- Clear visual plans → focused agent work
- Explicit trade-offs → informed decisions
- Visible validation → caught errors

### Visual Plans Reduce Rework

**Without visual plans**:
- Agent implements wrong interpretation
- Human reviews after code written
- Rework required to fix issues
- Time and tokens wasted

**With visual plans**:
- Human reviews plan before code
- Misunderstandings caught early
- Agent implements correct interpretation
- Less rework, less waste

---

## Implementation Phases

### Phase 1: Documentation (Current)

Create the visual process system:
- [x] VISUAL_PROCESS_SYSTEM.md (this file)
- [ ] DIAGRAM_LIBRARY.md
- [ ] VISUAL_PLAN_TEMPLATE.md
- [ ] AGENT_LOOP_VISUALS.md
- [ ] RESEARCH_TO_VISUAL_LOG.md

Create the diagram library:
- [ ] Mermaid diagrams for all 7 diagram types

Create agent and skill definitions:
- [ ] Visual system roles
- [ ] Diagram maintenance
- [ ] Process storytelling
- [ ] Portfolio documentation

Create source cards:
- [ ] Agent looping source card
- [ ] Visual plans source card
- [ ] Data viz style guides source card

### Phase 2: Portfolio Pages (Future)

Create public pages that show the process:
- [ ] `/portfolio/build-process/visual-agentic-development`
- [ ] Embedded diagrams
- [ ] Process narrative
- [ ] Evidence of application

### Phase 3: Interactive Visuals (Future)

Add interactive elements:
- [ ] Expandable diagram sections
- [ ] Hover for details
- [ ] Click for source cards
- [ ] Animated flows (where helpful)

---

## Quality Standards

### Diagram Quality

Every diagram must be:
- **Readable**: Clear labels, simple structure
- **Accurate**: Represents actual process, not aspirational
- **Complete**: Shows all key steps and decisions
- **Maintained**: Updated when process changes
- **GitHub-renderable**: Works in standard Mermaid syntax

### Visual Plan Quality

Every visual plan must be:
- **Focused**: One task or decision, not everything
- **Explicit**: Clear requirements, trade-offs, constraints
- **Validatable**: Testable acceptance criteria
- **Traceable**: Links to source cards and decisions
- **Reviewable**: Easy for human to review quickly

### Portfolio Quality

Portfolio evidence must be:
- **Specific**: Concrete examples, not vague claims
- **Visual**: Diagrams and visuals, not just text
- **Honest**: Show failures and rejections, not just successes
- **Traceable**: Links to GitHub evidence
- **Impressive**: Shows sophistication, not just completion

---

## Related Documentation

- **Diagram Library**: `docs/visual-process/DIAGRAM_LIBRARY.md` - All diagram types and when to use them
- **Visual Plan Template**: `docs/visual-process/VISUAL_PLAN_TEMPLATE.md` - How to create visual plans
- **Agent Loop Visuals**: `docs/visual-process/AGENT_LOOP_VISUALS.md` - Agent loop diagram specifics
- **Research to Visual Log**: `docs/visual-process/RESEARCH_TO_VISUAL_LOG.md` - Converting research to visuals

---

## See Also

- **AI Development Loop**: `docs/AI_DEVELOPMENT_LOOP.md` - Overall loop structure
- **Loop Policy**: `docs/LOOP_POLICY.md` - When to use which loop type
- **Agent Roles**: `.claude/agents/*.md` - Individual agent responsibilities
