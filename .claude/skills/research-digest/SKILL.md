# Research Digest Skill

## Purpose

Analyze research sources about AI product development and create digestible insights with application recommendations for Proben.io.

## When to Use

When you have:
- A conference talk about AI agents/engineering
- A technical blog post about AI workflows
- Official documentation about AI tools/frameworks
- A GitHub repository for AI tooling
- Product releases relevant to AI development

## Behavior

### Input Analysis

1. **Extract Metadata**
   - URL, type (video, article, paper, repo, talk)
   - Speaker/author, platform, date
   - Topic tags: agents, context engineering, evals, guardrails, MCP, UX, observability, testing, security
   - Confidence level (based on source quality and accessibility)

2. **Summarize Core Insight**
   - What is the main idea? (5-7 bullets)
   - What is new or non-obvious?
   - What problem does it solve?
   - What are the risks or limitations?
   - What assumptions are not proven?

3. **Assess Relevance**
   - How does this apply to Proben.io development?
   - Which areas does it affect?
   - Is this actionable now or later?

4. **Propose Application**
   - What changes would we make?
   - Expected benefit?
   - Effort level?
   - Risks?
   - Priority (P0/P1/P2)?

5. **Recommend Decision**
   - Adopt: Implement now, clear value, low risk
   - Test: Try in limited context first
   - Reject: Not applicable, low value, high risk
   - Watch: Monitor but don't act yet
   - Needs more evidence: Insufficient information

### Output Creation

Create three documents:
1. Source Card (docs/research/source-cards/[YYYY-MM-DD]-[slug].md)
2. Research Digest Entry (update docs/research/RESEARCH_DIGEST.md)
3. Decision Record (update docs/research/RESEARCH_DECISIONS.md)

## Quality Standards

- **Accuracy**: Don't invent quotes or claims
- **Clarity**: Core insight in 5-7 bullets
- **Actionability**: Clear application recommendations
- **Traceability**: Link to sources
- **Anti-Hype**: Practical over trendy

## Inputs

- Source URL or content
- Source type (if not obvious)

## Outputs

- Source card (markdown)
- Updated research digest
- Updated decisions

## Related

- **Research Analyst Agent**: Uses this skill
- **Context Pack Builder**: Applies insights
- **Source-to-Product Application**: Converts to implementation
