# Source Card: Data Visualization & Presentation Style Guides

## Source

**Source title**: Data Viz Project, Ferdio Notebooks, Visualization Style Research

**Source type**: Style guides / Design references

**URL**:
- Data Viz Project (design system for data visualization)
- Ferdio notebook on presentations
- Ferdio notebook on animation
- Alvita Ottley / visualization style guide research

**Date reviewed**: 2026-06-09

**Confidence level**: High (established design resources)

**Related tags**:
- data visualization
- presentation design
- diagram choice
- visual communication
- process diagrams
- portfolio design
- information design

---

## Core Idea

**Summary**: Diagram choice and visual design matter significantly for comprehension, decision-making, and portfolio credibility. Good visuals make complex systems understandable; poor visuals confuse or mislead.

**Key points** (5-8 bullets):

1. **Diagram choice is communication**: The right diagram type makes the message clear; wrong type obscures it
2. **Visuals support decision-making**: Good visuals enable faster, better decisions; bad visuals mislead
3. **Process diagrams build credibility**: Showing how you work is as impressive as what you built
4. **Style guides ensure consistency**: Standards make visuals recognizable and professional
5. **Animation should be purposeful**: Motion should clarify, not decorate
6. **Less is more**: Simple visuals beat complex; clarity beats decoration
7. **Portfolio visuals show sophistication**: Design choices demonstrate thoughtfulness and professionalism

---

## Key Concepts

### Diagram Choice Matters

**Right diagram for the job**:
- Flowchart: Shows sequence and decisions
- Graph: Shows relationships and hierarchies
- Table: Compares options and trade-offs
- Map: Shows spatial or conceptual relationships
- State diagram: Shows lifecycles and transitions

**Wrong diagram obscures**:
- Using a graph for a sequence (hard to follow)
- Using a table for a lifecycle (doesn't show flow)
- Using a flowchart for comparisons (hard to scan)

**Principle**: Choose diagram type that matches the information structure

### Visuals Support Decision-Making

**How visuals help**:
- Make relationships visible at a glance
- Enable faster comparison of options
- Reveal gaps and inconsistencies
- Show dependencies clearly
- Make feedback loops obvious

**How visuals mislead**:
- Over-complex diagrams hide information
- Poor labeling creates ambiguity
- Wrong diagram type obscures relationships
- Inconsistent style creates confusion

### Process Diagrams Build Portfolio Credibility

**Why process visuals matter**:
- Show systematic thinking (not just "I used AI")
- Show sophistication (I understand loops, orchestration, validation)
- Show learning (I study patterns and apply them)
- Show standards (I have a visual system, not ad-hoc diagrams)

**What they demonstrate**:
- You can break down complex problems
- You can communicate visually
- You can plan before implementing
- You can validate results

### Style Guides Ensure Consistency

**Benefits of standards**:
- Recognizable as "yours"
- Professional appearance
- Easier to create (reuse patterns)
- Easier to maintain (clear conventions)
- Easier to understand (familiar structure)

**Elements to standardize**:
- Color palette (minimal use for diagrams)
- Typography (for presentations)
- Shape conventions (same shapes = same meanings)
- Layout patterns (headers, sections, visuals)
- Label style (specific, not generic)

### Animation Should Be Purposeful

**When animation helps**:
- Showing flow or movement
- Revealing complexity progressively
- Drawing attention to specific elements
- Demonstrating behavior over time

**When animation hurts**:
- Decoration without purpose
- Distracting from content
- Slowing down comprehension
- Not working in static medium (PDF, GitHub)

**Principle**: Use animation only when it clarifies something static can't

### Less Is More

**Simplicity principles**:
- 5-10 nodes maximum in diagrams
- One message per visual
- Remove decorative elements
- Use white space effectively
- Label clearly and specifically

**Complexity indicators**:
- If legend is needed, diagram is too complex
- If explanation is required, diagram is too complex
- If it takes >1 minute to understand, simplify

---

## Why It Matters

### For AI Product Development

- **Communication quality**: Good visuals help teams understand processes and architectures
- **Decision quality**: Clear diagrams enable better decisions about complex choices
- **Onboarding quality**: Visual docs help new team members understand faster

### For Coding with AI Agents

- **Plan quality**: Visual plans reduce agent misinterpretation
- **Review speed**: Visuals reviewed faster than long specs
- **Traceability**: Diagrams link plan to implementation

### For Portfolio Credibility

- **Shows sophistication**: You understand visual communication
- **Shows systematic approach**: You plan before coding
- **Shows learning**: You study design and apply it
- **Shows professionalism**: You have standards, not ad-hoc approaches

---

## Critical View

### When This Is Useful

**Good for**:
- Complex processes that need explanation
- Portfolio pages that show process
- Documentation that needs to be understood quickly
- Presentations and demos

**Not good for**:
- Simple self-evident information
- Quick decisions among experts
- Code comments (text is fine)

### When It Becomes Expensive

- **Over-designing**: Spending more time on visuals than content
- **Over-standardizing**: Creating rigid systems that don't adapt
- **Decoration for its own sake**: Visuals that don't communicate

### When It Creates Low-Quality Output

- **Style over substance**: Pretty visuals that don't communicate
- **Over-complex diagrams**: So much detail that nothing is clear
- **Inconsistent application**: Standards applied inconsistently

---

## Verdict

**RECOMMENDATION: ADOPT the principles, APPLY selectively**

### Adopt These Principles

**For diagrams**:
- Choose the right diagram type
- Keep it simple (5-10 nodes)
- Use clear, specific labels
- Show decision points explicitly
- Make feedback loops visible

**For portfolio**:
- Use visuals to show process
- Maintain diagram library
- Keep visual style consistent
- Show learning, not just results

**For documentation**:
- Use diagrams when they clarify
- Don't force diagrams everywhere
- Prefer visuals over long prose for complex structures

### Apply Selectively

**Use visuals when**:
- Information is complex or ambiguous
- Relationships are hard to describe in text
- Speed of understanding matters
- Portfolio credibility is goal

**Skip visuals when**:
- Information is simple
- Text is clearer or shorter
- Visual would take longer to create than value it provides

---

## Application to Proben.io

### How to Apply

**Create diagram library**:
- 7 standard diagram types defined
- Each with purpose, audience, acceptance criteria
- All created as Mermaid files

**Use visual plans**:
- For complex tasks before implementation
- Make requirements visible
- Make trade-offs visible
- Make validation criteria visible

**Document process**:
- Use diagrams in build-process pages
- Use diagrams in agent loop docs
- Use diagrams in research logs
- Link diagrams to source cards

**Maintain consistency**:
- Use same shapes for same concepts
- Use consistent label style
- Use simple color (minimal, if at all)
- Keep diagrams readable in GitHub

### Portfolio Integration

**In build-process pages**:
- Show how we use agent loops
- Show how we validate quality
- Show how we apply research
- Link to GitHub docs

**Design inspiration**:
- Data Viz Project: Minimal, data-focused
- Ferdio: Clear, structured, educational
- Don't copy pixel-by-pixel, but learn principles

---

## Proposed Changes

### P0 Changes (Documentation - Created)

**Created**:
- [x] Visual process system philosophy
- [x] Diagram library with 7 diagram types
- [x] Visual plan template
- [x] Agent loop visuals guide
- [x] Research to visual log
- [x] 6 Mermaid diagrams created
- [x] Agent definitions for visual roles
- [x] Skill definitions for visual work

### P1 Changes (Portfolio Pages - Future)

- [ ] `/portfolio/build-process/agent-looping` page
- [ ] `/portfolio/build-process/visual-agentic-development` page
- [ ] `/portfolio/research-log` page
- [ ] Embedded diagrams with explanations

### P2 Changes (Enhancements - Future)

- [ ] Interactive diagram explorer
- [ ] Animated flows (where helpful)
- [ ] Diagram version history
- [ ] Design system refinement

---

## Evaluation Plan

### Success Metrics

**Documentation metrics**:
- Number of diagram types defined (target: 7)
- Diagram readability in GitHub (target: all render correctly)
- Diagram usage in docs (target: every complex process has diagram)

**Portfolio metrics**:
- Page engagement (time on page)
- Questions about process in interviews
- Compliments on process sophistication
- Links to portfolio from hiring managers

**Quality metrics**:
- Can non-technical person understand diagrams?
- Can diagrams be explained in 1 minute?
- Do diagrams support decision-making?

---

## Decision

**RECOMMENDATION: ADOPT principles and documentation**

**Confidence**: High

**Rationale**:
- Strong evidence that visuals improve communication
- Portfolio value is clear (shows sophistication)
- Low risk (documentation only, no code changes)
- Aligns with professional practices

**Adopt**:
- Diagram library with standards
- Visual plan templates
- Agent roles for visual work
- Mermaid diagrams for all complex processes

**Apply selectively**:
- Use visuals when they clarify
- Don't force diagrams everywhere
- Keep it simple (5-10 nodes)
- Focus on communication, not decoration

---

## Related Sources

- **Agent Looping**: docs/research/source-cards/2026-06-agent-looping.md
- **Visual Plans**: docs/research/source-cards/2026-06-visual-plans-agentic-engineering.md

---

## Notes

- Data Viz Project: Design system reference for minimal, data-focused visuals
- Ferdio: Reference for structured, educational presentation approach
- Alvita Ottley: Research on visualization style and comprehension
- These are inspiration sources, not templates to copy
- Focus on principles, not specific designs

*Uncertain Assumptions*:
- Specific Ferdio/Data Viz Project details (using as concept reference)
- Exact Alvita Ottley research findings (using as general guidance)
