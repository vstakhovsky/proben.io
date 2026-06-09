# Portfolio Process Page Skill

## Purpose

Convert research logs, diagrams, and documentation into a public portfolio page outline that demonstrates AI-native product development sophistication.

## When to Use

When research has been applied and documented:
- After creating source cards
- After implementing patterns
- After updating processes
- Before creating public pages

## Behavior

### Page Planning

1. **Define the page purpose**
   - What does this page show?
   - Why is it portfolio-worthy?
   - What should impress hiring managers?

2. **Structure the narrative**
   - Problem statement (why this matters)
   - Pattern studied (what we learned)
   - Our verdict (adopt/reject/reasoning)
   - Application (how we used it)
   - Results (what happened)
   - Rejections (what we didn't do)
   - Next steps (what's next)

3. **Plan the visuals**
   - Which diagrams to embed?
   - Where to place them?
   - What screenshots to include?
   - What code examples to show?

4. **Create section outlines**
   - Section title
   - Section purpose
   - Key content
   - Visual embeds
   - Links to GitHub

5. **Define acceptance criteria**
   - What makes this page complete?
   - What makes it impressive?
   - What links must work?

### Page Structure Template

```markdown
# [Page Title]

## Why This Matters
[Problem statement, why this pattern is important]

## What We Studied
[Pattern overview, key concepts]

## Our Verdict
[Decision with reasoning: adopt/test/reject]

## How We Applied It
[Specific changes to Proben.io, files created]

## Diagram: [Diagram Name]
[Embedded Mermaid diagram]

## What Worked
[Positive outcomes, lessons learned]

## What We Rejected
[What didn't fit, why rejected]

## Next Experiments
[What we're testing next]
```

## Inputs

- Source card
- Application log entry
- Decision record
- Diagram files
- Implementation details

## Outputs

- Page title
- Section outlines
- Visual placement plan
- GitHub link references
- Acceptance criteria
- "What I learned/applied/rejected" structure

## Example

**Input**: Agent looping application

**Output**:
```markdown
Page: /portfolio/build-process/agent-looping

Structure:
1. Why I Changed the Process
   - One-off prompts are fragile
   - Loops provide systematic approach

2. The Pattern I Studied
   - Single-agent loop
   - Fleet loop
   - Open vs closed looping

3. My Verdict
   - Adopt closed looping first
   - Reject open looping for now

4. How I Apply It
   - Source → Insight → Plan → Approval → Implementation → Verification

5. Diagram: Fleet Loop
   [Embed docs/diagrams/proben-agent-fleet-loop.mmd]

6. What I Rejected
   - Open looping (too expensive, risky)

7. Next Experiments
   - Research digest loop
   - QA release loop
```

## Related Skills

- **Source to Visual**: Provides visualization ideas
- **Visual Plan Builder**: Creates visual structure
- **Mermaid Diagram Generator**: Provides diagrams to embed
