// Scoring types for readiness assessment

export interface ReadinessScore {
  overall: number; // 0-10 scale for display
  goalClarity: number; // 0-10
  strategicContext: number; // 0-10
  evidence: number; // 0-10
  stakeholderRisk: number; // 0-10
  decisionAsk: number; // 0-10
}

export interface ReadinessStatus {
  score: number;
  status: 'Not ready' | 'Partly ready' | 'Ready';
  color: string;
}

export interface ContextGap {
  dimension: string;
  gap: string;
  impact: string;
}

export interface FixRecommendation {
  priority: number;
  fix: string;
  effort: 'Low' | 'Medium' | 'High';
}

export interface LikelyQuestion {
  question: string;
  category: string;
}

export interface PracticeMoment {
  scenario: string;
  action: string;
  expectedOutcome: string;
}

export interface AssessmentInput {
  context: string;
  meetingType?: string;
}

export interface AssessmentResult {
  score: ReadinessScore;
  status: ReadinessStatus;
  gaps: ContextGap[];
  fixes: FixRecommendation[];
  questions: LikelyQuestion[];
  practiceMoment: PracticeMoment;
}
