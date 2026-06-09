# Research to Visual Log - Proben.io

This document tracks how research sources are converted into visual artifacts and documentation for Proben.io.

## Last Updated: 2026-06-09

---

## Purpose

Research sources are converted into visual artifacts to make the development process visible and portfolio-ready. This document defines the process and tracks conversions.

---

## The Conversion Process

### Step 1: Source Intake

Research analyst creates source card:
- URL, type, confidence level
- Core insight (5-7 bullets)
- Key concepts explained
- Critical view (what can go wrong)
- Verdict (adopt/test/reject/watch)

**Output**: Source card in `docs/research/source-cards/`

---

### Step 2: Pattern Extraction

Identify visualizable patterns:
- Is this a process flow?
- Is this a structure or system?
- Is this a decision framework?
- Can this be shown as a diagram?

**Output**: Visualization ideas in source card

---

### Step 3: Visual Hypothesis

Propose visual approach:
- What diagram type? (flowchart, graph, table)
- What's the key message?
- Who's the audience?
- What's the context? (portfolio, docs, team)

**Output**: Visual recommendation in source card

---

### Step 4: Diagram Creation

Diagram engineer creates Mermaid diagram:
- Simple structure (5-10 nodes)
- Clear labels
- Standard syntax
- GitHub-renderable

**Output**: `.mmd` file in `docs/diagrams/`

---

### Step 5: Documentation

Process storyteller writes narrative:
- What pattern did we study?
- Why does it matter?
- How did we apply it?
- What did we reject?
- What's next?

**Output**: Documentation in `docs/visual-process/` or `docs/research/`

---

### Step 6: Portfolio Integration

Portfolio documentation engineer plans public page:
- Page structure
- Narrative sections
- Embedded diagrams
- Links to source cards
- "What I learned / applied / rejected" sections

**Output**: Page plan in `docs/research/`

---

## Conversion Log

### 2026-06-09: Agent Looping Pattern

**Source**: Agent Looping / Loop Engineering

**Visual Artifacts Created**:
1. Single-Agent Loop Diagram (`docs/diagrams/proben-build-loop.mmd`)
2. Fleet Loop Diagram (`docs/diagrams/proben-agent-fleet-loop.mmd`)
3. Human-Agent Handoff Diagram (`docs/diagrams/proben-human-agent-handoff.mmd`)

**Documentation Created**:
- Agent Loop Visuals guide (`docs/visual-process/AGENT_LOOP_VISUALS.md`)
- Loop Policy (`docs/LOOP_POLICY.md`)
- AI Development Loop (`docs/AI_DEVELOPMENT_LOOP.md`)

**Portfolio Page Planned**:
- `/portfolio/build-process/agent-looping` (planned, not implemented)

**Status**: Documentation complete, page plan created

---

### 2026-06-09: Visual Plans for Agentic Engineering

**Source**: Agentic engineering workflow patterns

**Visual Artifacts Created**:
1. Visual Plan Lifecycle Diagram (`docs/diagrams/proben-visual-plan-lifecycle.mmd`)
2. Validation Gates Diagram (`docs/diagrams/proben-validation-gates.mmd`)

**Documentation Created**:
- Visual Plan Template (`docs/visual-process/VISUAL_PLAN_TEMPLATE.md`)
- Diagram Library (`docs/visual-process/DIAGRAM_LIBRARY.md`)

**Portfolio Page Planned**:
- `/portfolio/build-process/visual-agentic-development` (planned, not implemented)

**Status**: Documentation complete, page plan created

---

### 2026-06-09: Data Viz Style Guides

**Source**: Data Viz Project, Ferdio notebooks

**Visual Artifacts Created**:
- Diagram system philosophy (`docs/visual-process/VISUAL_PROCESS_SYSTEM.md`)

**Documentation Created**:
- Diagram standards and conventions
- Visual quality criteria

**Status**: Philosophy and standards documented

---

## Template for Future Conversions

```markdown
### [Date]: [Pattern Name]

**Source**: [Source card link]

**Visual Artifacts Created**:
1. [Diagram name] ([location])
2. [Diagram name] ([location])

**Documentation Created**:
- [Doc name] ([location])
- [Doc name] ([location])

**Portfolio Page**:
- [Page route] ([status])

**Status**: [Documentation/Plan/Page complete]
```

---

## Visual Quality Criteria

Every diagram must meet these standards:

### Clarity
- [ ] Purpose is obvious at a glance
- [ ] Labels are specific and clear
- [ ] Flow direction is consistent
- [ ] No ambiguous paths

### Simplicity
- [ ] 5-10 nodes maximum
- [ ] No unnecessary complexity
- [ ] Standard Mermaid syntax only
- [ ] Renders correctly in GitHub

### Accuracy
- [ ] Represents actual process (not aspirational)
- [ ] All key steps shown
- [ ] Decision points accurate
- [ ] Feedback loops correct

### Utility
- [ ] Serves clear purpose
- [ ] Fits intended audience
- [ ] Supports decision-making
- [ ] Can be referenced in docs

---

## Portfolio Evidence

### What Hiring Managers See

Visual artifacts demonstrate:
- **Systematic thinking**: You design before coding
- **Process awareness**: You understand agentic workflows
- **Communication skills**: You can explain complex systems
- **Quality standards**: You validate before deploying
- **Learning mindset**: You study and apply patterns

### What Proben.io Shows

**Not just**: "I used AI to build this"

**But**: "Here's my system for AI-assisted development"
- Here are the loops I use
- Here's where humans intervene
- Here's how I validate quality
- Here's what I learned from research
- Here's what I rejected and why

---

## Related Documentation

- **Visual Process System**: `docs/visual-process/VISUAL_PROCESS_SYSTEM.md` - Overall philosophy
- **Diagram Library**: `docs/visual-process/DIAGRAM_LIBRARY.md` - Diagram types
- **Visual Plan Template**: `docs/visual-process/VISUAL_PLAN_TEMPLATE.md` - Plan structure

---

## See Also

- **Source Cards**: `docs/research/source-cards/*.md` - Source analyses
- **Agent Loop Visuals**: `docs/visual-process/AGENT_LOOP_VISUALS.md` - Loop diagrams
