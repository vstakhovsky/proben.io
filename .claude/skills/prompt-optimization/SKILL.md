# Prompt Optimization Skill

## Description

Analyzes and optimizes prompts used throughout Proben.io's AI integrations to improve accuracy, reduce costs, and enhance consistency.

## Triggers

- Manual: `/prompt-optimization`
- Scheduled: Monthly prompt reviews
- On-demand: When AI performance degrades

## Optimization Areas

### 1. Claude API Prompts
- System message optimization
- User prompt structuring
- Context window management
- Token usage efficiency

### 2. Application Prompts
- Feature generation prompts
- Analysis prompts
- Content creation prompts
- Data processing prompts

### 3. Evaluation Prompts
- Quality assessment prompts
- Testing prompts
- Validation prompts
- Review prompts

## Optimization Metrics

### Quality Metrics
- Response accuracy
- Relevance to task
- Completeness of output
- Consistency across runs

### Cost Metrics
- Input tokens per request
- Output tokens per response
- Total cost per operation
- Cache hit rate

### Performance Metrics
- Response time
- Success rate
- Error rate
- Retry frequency

## Optimization Process

1. **Analyze Current Prompt**
   - Review prompt structure
   - Identify inefficiencies
   - Check for clarity issues
   - Measure current metrics

2. **Identify Improvements**
   - Add missing context
   - Remove redundancy
   - Improve structure
   - Add examples

3. **Test Variations**
   - Create A/B tests
   - Measure performance
   - Compare metrics
   - Select best version

4. **Implement & Monitor**
   - Deploy optimized prompt
   - Track metrics
   - Gather feedback
   - Iterate as needed

## Output Format

```markdown
# Prompt Optimization Report

## Current Prompt
[Original prompt text]

## Analysis
[Strengths and weaknesses identified]

## Optimized Prompt
[Improved prompt text]

## Metrics Comparison
| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Tokens | X | Y | -Z% |
| Cost | $X | $Y | -Z% |
| Quality | X% | Y% | +Z% |

## Recommendations
[Further improvement suggestions]
```

## Best Practices

- **Be Specific**: Clear, unambiguous instructions
- **Provide Context**: Relevant background information
- **Use Examples**: Show desired output format
- **Test Thoroughly**: Validate before deployment
- **Monitor Continuously**: Track performance metrics

## Configuration

- Review schedule: Monthly
- A/B test duration: 1 week
- Metrics retention: 90 days
- Auto-optimization: Disabled (manual review required)
