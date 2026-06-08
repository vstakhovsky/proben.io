import type { ReadinessScore, ReadinessStatus, AssessmentResult, ContextGap, FixRecommendation, LikelyQuestion, PracticeMoment, AssessmentInput } from './types';

// Internal 0-100 scale for calculations, converted to 0-10 for display
interface InternalScore {
  overall: number; // 0-100 internal
  goalClarity: number; // 0-100 internal
  strategicContext: number; // 0-100 internal
  evidence: number; // 0-100 internal
  stakeholderRisk: number; // 0-100 internal
  decisionAsk: number; // 0-100 internal
}

// Convert internal 0-100 score to display 0-10 score
function toDisplayScore(internalScore: number): number {
  return Math.round((internalScore / 100) * 10 * 10) / 10; // Round to 1 decimal
}

// Determine readiness status based on score
function getReadinessStatus(score: number): ReadinessStatus {
  if (score >= 7.5) {
    return { score, status: 'Ready', color: '#10B981' }; // Green
  } else if (score >= 5.0) {
    return { score, status: 'Partly ready', color: '#F59E0B' }; // Yellow/Orange
  } else {
    return { score, status: 'Not ready', color: '#EF4444' }; // Red
  }
}

// Deterministic scoring algorithm based on content analysis
function calculateScore(input: AssessmentInput): InternalScore {
  const context = input.context.toLowerCase();
  const meetingType = input.meetingType?.toLowerCase() || '';

  // Base scores - deterministic algorithm
  let goalClarity = 50;
  let strategicContext = 50;
  let evidence = 50;
  let stakeholderRisk = 50;
  let decisionAsk = 50;

  // Goal clarity indicators
  if (context.includes('goal') || context.includes('objective') || context.includes('target')) {
    goalClarity += 15;
  }
  if (context.includes('pivot') && !context.includes('clear pivot to')) {
    goalClarity -= 10;
  }
  if (context.includes('unclear') || context.includes('unsure') || context.includes('uncertain')) {
    goalClarity -= 20;
  }
  if (context.includes('specific') || context.includes('measurable') || context.includes('defined')) {
    goalClarity += 20;
  }

  // Strategic context indicators
  if (context.includes('strategy') || context.includes('roadmap') || context.includes('plan')) {
    strategicContext += 15;
  }
  if (context.includes('business impact') || context.includes('roi') || context.includes('business case')) {
    strategicContext += 20;
  }
  if (context.includes('decision threshold') || context.includes('criteria')) {
    strategicContext += 15;
  }
  if (context.includes('stakeholder') || context.includes('leadership') || context.includes('team')) {
    strategicContext += 10;
  }

  // Evidence indicators
  if (context.includes('data') || context.includes('evidence') || context.includes('research')) {
    evidence += 20;
  }
  if (context.includes('user feedback') || context.includes('customer') || context.includes('validation')) {
    evidence += 15;
  }
  if (context.includes('assumption') || context.includes('guess') || context.includes('think')) {
    evidence -= 15;
  }

  // Stakeholder risk indicators
  if (context.includes('objection') || context.includes('concern') || context.includes('pushback')) {
    stakeholderRisk -= 15;
  }
  if (context.includes('alignment') || context.includes('agreement') || context.includes('buy-in')) {
    stakeholderRisk += 15;
  }
  if (context.includes('leadership') || context.includes('executive') || context.includes('management')) {
    stakeholderRisk += 10;
  }

  // Decision ask indicators
  if (context.includes('decision') || context.includes('approval') || context.includes('sign-off')) {
    decisionAsk += 15;
  }
  if (context.includes('next step') || context.includes('action') || context.includes('follow-up')) {
    decisionAsk += 10;
  }
  if (context.includes('approve') || context.includes('invest') || context.includes('fund')) {
    decisionAsk += 20;
  }
  if (context.includes('feedback only') || context.includes('inform') || context.includes('update')) {
    decisionAsk -= 10;
  }

  // Clamp scores to 0-100 range
  goalClarity = Math.max(0, Math.min(100, goalClarity));
  strategicContext = Math.max(0, Math.min(100, strategicContext));
  evidence = Math.max(0, Math.min(100, evidence));
  stakeholderRisk = Math.max(0, Math.min(100, stakeholderRisk));
  decisionAsk = Math.max(0, Math.min(100, decisionAsk));

  // Calculate overall score (weighted average)
  const weights = { goalClarity: 0.25, strategicContext: 0.20, evidence: 0.20, stakeholderRisk: 0.20, decisionAsk: 0.15 };
  const overall = (
    goalClarity * weights.goalClarity +
    strategicContext * weights.strategicContext +
    evidence * weights.evidence +
    stakeholderRisk * weights.stakeholderRisk +
    decisionAsk * weights.decisionAsk
  );

  return { overall, goalClarity, strategicContext, evidence, stakeholderRisk, decisionAsk };
}

// Generate context gaps based on low-scoring dimensions
function generateGaps(internalScore: InternalScore, context: string): ContextGap[] {
  const gaps: ContextGap[] = [];
  const ctx = context.toLowerCase();

  // Goal clarity gaps
  if (internalScore.goalClarity < 60) {
    gaps.push({
      dimension: 'Goal Clarity',
      gap: 'Meeting objective not clearly defined or specific',
      impact: 'Stakeholders may be unclear about the purpose and expected outcomes',
    });
  }

  // Strategic context gaps
  if (internalScore.strategicContext < 60) {
    gaps.push({
      dimension: 'Strategic Context',
      gap: 'Business impact or strategic rationale not clearly articulated',
      impact: 'Hard to justify prioritization without clear business case',
    });
  }

  // Evidence gaps
  if (internalScore.evidence < 60) {
    gaps.push({
      dimension: 'Evidence',
      gap: 'Lack supporting data or user validation for proposed changes',
      impact: 'Decisions based on assumptions rather than evidence may be challenged',
    });
  }

  // Stakeholder risk gaps
  if (internalScore.stakeholderRisk < 60) {
    gaps.push({
      dimension: 'Stakeholder Risk',
      gap: 'Potential objections or concerns not addressed',
      impact: 'Unprepared for pushback may derail the meeting',
    });
  }

  // Decision ask gaps
  if (internalScore.decisionAsk < 60) {
    gaps.push({
      dimension: 'Decision Ask',
      gap: 'Clear next steps or decision criteria not specified',
      impact: 'Meeting may end without clear resolution or action items',
    });
  }

  return gaps.slice(0, 3); // Return top 3 gaps
}

// Generate fix recommendations based on gaps
function generateFixes(gaps: ContextGap[]): FixRecommendation[] {
  const fixes: FixRecommendation[] = [];

  gaps.forEach((gap, index) => {
    switch (gap.dimension) {
      case 'Goal Clarity':
        fixes.push({ priority: index + 1, fix: 'Define specific meeting objective and success criteria', effort: 'Low' });
        fixes.push({ priority: index + 1, fix: 'Document what decision you need and why now', effort: 'Low' });
        break;
      case 'Strategic Context':
        fixes.push({ priority: index + 1, fix: 'Quantify business impact and ROI projection', effort: 'Medium' });
        fixes.push({ priority: index + 1, fix: 'Map this decision to broader company goals', effort: 'Medium' });
        break;
      case 'Evidence':
        fixes.push({ priority: index + 1, fix: 'Gather user feedback or data supporting your proposal', effort: 'High' });
        fixes.push({ priority: index + 1, fix: 'Include competitive analysis or market research', effort: 'High' });
        break;
      case 'Stakeholder Risk':
        fixes.push({ priority: index + 1, fix: 'Pre-meeting: identify key stakeholders and their concerns', effort: 'Medium' });
        fixes.push({ priority: index + 1, fix: 'Prepare responses to likely objections', effort: 'Medium' });
        break;
      case 'Decision Ask':
        fixes.push({ priority: index + 1, fix: 'Define clear decision criteria and timeline', effort: 'Low' });
        fixes.push({ priority: index + 1, fix: 'Prepare specific next steps for each outcome', effort: 'Medium' });
        break;
    }
  });

  // Add universal fixes
  fixes.push({ priority: 99, fix: 'Create one-page summary document', effort: 'Low' });
  fixes.push({ priority: 99, fix: 'Schedule 15-minute pre-meeting with key stakeholder', effort: 'Low' });

  return fixes.slice(0, 5); // Return top 5 fixes
}

// Generate likely questions based on context
function generateQuestions(context: string): LikelyQuestion[] {
  const ctx = context.toLowerCase();
  const questions: LikelyQuestion[] = [];

  // Strategy questions
  if (ctx.includes('pivot') || ctx.includes('change')) {
    questions.push({ question: 'Why is this pivot necessary?', category: 'Strategy' });
    questions.push({ question: 'What data supports this direction?', category: 'Strategy' });
    questions.push({ question: 'What happens if we don\'t pivot?', category: 'Strategy' });
  }

  // Business impact questions
  questions.push({ question: 'What\'s the expected business impact?', category: 'Business Case' });
  questions.push({ question: 'What are the risks and mitigation plans?', category: 'Risk' });

  // Execution questions
  questions.push({ question: 'What resources are needed to execute this?', category: 'Execution' });
  questions.push({ question: 'What\'s the timeline for implementation?', category: 'Execution' });

  // Stakeholder questions
  if (ctx.includes('stakeholder') || ctx.includes('team')) {
    questions.push({ question: 'How does this impact other teams?', category: 'Stakeholder' });
    questions.push({ question: 'Who else needs to be involved?', category: 'Stakeholder' });
  }

  return questions.slice(0, 5); // Return top 5 questions
}

// Generate practice moment based on lowest scoring dimension
function generatePracticeMoment(internalScore: InternalScore, context: string): PracticeMoment {
  const dimensions = [
    { name: 'goalClarity', score: internalScore.goalClarity },
    { name: 'strategicContext', score: internalScore.strategicContext },
    { name: 'evidence', score: internalScore.evidence },
    { name: 'stakeholderRisk', score: internalScore.stakeholderRisk },
    { name: 'decisionAsk', score: internalScore.decisionAsk },
  ];

  // Find lowest scoring dimension
  const lowest = dimensions.reduce((min, dim) => (dim.score < min.score ? dim : min));

  switch (lowest.name) {
    case 'goalClarity':
      return {
        scenario: 'Clarify Your Objective',
        action: 'Write down in one sentence: "The purpose of this meeting is to get decision/approval on [specific thing] by [specific criteria]." Read this aloud at the start of the meeting.',
        expectedOutcome: 'Everyone understands the meeting\'s purpose and decision criteria from the beginning',
      };
    case 'strategicContext':
      return {
        scenario: 'Connect to Business Goals',
        action: 'Before the meeting, identify 2-3 company objectives this decision supports. State explicitly: "This decision advances our goal of [X] by [Y]."',
        expectedOutcome: 'Stakeholders see the strategic rationale and business justification',
      };
    case 'evidence':
      return {
        scenario: 'Ground in Evidence',
        action: 'Identify your weakest assumption. Find one data point, user feedback, or comparable example that supports it. Lead with this evidence.',
        expectedOutcome: 'Your proposal is perceived as data-driven rather than opinion-based',
      };
    case 'stakeholderRisk':
      return {
        scenario: 'Address Likely Objections',
        action: 'Write down the 3 most likely objections. Prepare specific, data-backed responses to each. Raise these objections yourself if no one else does.',
        expectedOutcome: 'You demonstrate preparedness and build trust by addressing concerns proactively',
      };
    case 'decisionAsk':
      return {
        scenario: 'Define the Decision',
        action: 'State clearly what you need: "I\'m looking for a decision on [X] by [date]" or "I need approval to proceed with [Y]." Prepare fallback options if the primary ask is rejected.',
        expectedOutcome: 'The meeting concludes with a clear decision, not ambiguity',
      };
    default:
      return {
        scenario: 'Practice Your Opening',
        action: 'Write and practice your opening 3 sentences. They should state: the context, the request, and the decision needed. Memorize this.',
        expectedOutcome: 'You start the meeting confidently and set clear expectations',
      };
  }
}

// Main assessment function
export function assessReadiness(input: AssessmentInput): AssessmentResult {
  const internalScore = calculateScore(input);
  const displayScore = {
    overall: toDisplayScore(internalScore.overall),
    goalClarity: toDisplayScore(internalScore.goalClarity),
    strategicContext: toDisplayScore(internalScore.strategicContext),
    evidence: toDisplayScore(internalScore.evidence),
    stakeholderRisk: toDisplayScore(internalScore.stakeholderRisk),
    decisionAsk: toDisplayScore(internalScore.decisionAsk),
  };

  const status = getReadinessStatus(displayScore.overall);
  const gaps = generateGaps(internalScore, input.context);
  const fixes = generateFixes(gaps);
  const questions = generateQuestions(input.context);
  const practiceMoment = generatePracticeMoment(internalScore, input.context);

  return {
    score: displayScore,
    status,
    gaps,
    fixes,
    questions,
    practiceMoment,
  };
}
