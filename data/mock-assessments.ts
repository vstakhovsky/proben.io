import type { AssessmentResult } from '@/lib/types';

// Sample readiness report for strategy review / roadmap pivot scenario
export const sampleAssessment: AssessmentResult = {
  score: {
    overall: 6.2,
    goalClarity: 5.5,
    strategicContext: 4.8,
    evidence: 3.8,
    stakeholderRisk: 7.2,
    decisionAsk: 6.8,
  },
  status: {
    score: 6.2,
    status: 'Partly ready',
    color: '#F59E0B',
  },
  gaps: [
    {
      dimension: 'Evidence',
      gap: 'Limited user validation or market data to support the proposed pivot direction',
      impact: 'Leadership may question whether the pivot is based on assumptions vs. market signals',
    },
    {
      dimension: 'Strategic Context',
      gap: 'Business impact and success metrics for new direction not clearly quantified',
      impact: 'Without clear ROI, difficult to justify resource reallocation for pivot',
    },
    {
      dimension: 'Goal Clarity',
      gap: 'Decision scope unclear - are you seeking approval to explore pivot or commitment to full pivot?',
      impact: 'Ambiguity may lead to "let\'s discuss more" instead of clear decision',
    },
  ],
  fixes: [
    {
      priority: 1,
      fix: 'Gather 3-5 data points supporting pivot rationale (user feedback, market trends, competitive analysis)',
      effort: 'High',
    },
    {
      priority: 2,
      fix: 'Quantify expected business impact: revenue impact, timeline, resource requirements',
      effort: 'Medium',
    },
    {
      priority: 3,
      fix: 'Define decision scope explicitly: "Seeking approval to [explore/commit/validate]"',
      effort: 'Low',
    },
    {
      priority: 4,
      fix: 'Identify and prepare responses to top 3 likely stakeholder objections',
      effort: 'Medium',
    },
    {
      priority: 5,
      fix: 'Create one-page pivot summary with problem, solution, and ask',
      effort: 'Low',
    },
  ],
  questions: [
    {
      question: 'What data or insights are driving this pivot recommendation?',
      category: 'Strategy',
    },
    {
      question: 'What happens if we don\'t pivot - what\'s the opportunity cost?',
      category: 'Business Case',
    },
    {
      question: 'What resources will be required to execute this pivot successfully?',
      category: 'Execution',
    },
    {
      question: 'How does this impact existing commitments and timelines?',
      category: 'Stakeholder',
    },
    {
      question: 'What\'s the timeline for validating this pivot direction?',
      category: 'Execution',
    },
  ],
  practiceMoment: {
    scenario: 'Ground Your Pivot in Evidence',
    action: 'Your biggest gap is evidence validation. Before the meeting, identify 3 specific data points that support the pivot: 1 user feedback signal, 1 market trend, and 1 competitive insight. Lead your presentation with these evidence points, not your conclusions.',
    expectedOutcome: 'Stakeholders will perceive the pivot as data-driven rather than assumption-based, significantly increasing approval likelihood',
  },
};

// Additional sample scenarios for variety
export const additionalScenarios = {
  featureLaunch: {
    context: 'Product manager presenting new feature proposal to engineering leadership for development slot allocation',
    expectedScore: 7.8,
    expectedStatus: 'Partly ready',
  },
  budgetRequest: {
    context: 'Team lead requesting additional headcount for Q3 to address backlog',
    expectedScore: 5.2,
    expectedStatus: 'Partly ready',
  },
  strategyReview: {
    context: 'Quarterly strategy review with executive team to present Q3 priorities and resource allocation',
    expectedScore: 8.5,
    expectedStatus: 'Ready',
  },
};
