import { describe, it, expect } from 'vitest';
import { assessReadiness } from '@/lib/scoring';

describe('Scoring Algorithm', () => {
  describe('assessReadiness', () => {
    it('should return a result with all required fields', () => {
      const input = {
        context: 'Test meeting context for strategy review',
      };

      const result = assessReadiness(input);

      expect(result).toHaveProperty('score');
      expect(result).toHaveProperty('status');
      expect(result).toHaveProperty('gaps');
      expect(result).toHaveProperty('fixes');
      expect(result).toHaveProperty('questions');
      expect(result).toHaveProperty('practiceMoment');
    });

    it('should calculate scores in valid range (0-10)', () => {
      const input = {
        context: 'Test meeting context with clear goals, strategy, evidence, stakeholders, and decision criteria',
      };

      const result = assessReadiness(input);

      expect(result.score.overall).toBeGreaterThanOrEqual(0);
      expect(result.score.overall).toBeLessThanOrEqual(10);
      expect(result.score.goalClarity).toBeGreaterThanOrEqual(0);
      expect(result.score.goalClarity).toBeLessThanOrEqual(10);
      expect(result.score.strategicContext).toBeGreaterThanOrEqual(0);
      expect(result.score.strategicContext).toBeLessThanOrEqual(10);
      expect(result.score.evidence).toBeGreaterThanOrEqual(0);
      expect(result.score.evidence).toBeLessThanOrEqual(10);
      expect(result.score.stakeholderRisk).toBeGreaterThanOrEqual(0);
      expect(result.score.stakeholderRisk).toBeLessThanOrEqual(10);
      expect(result.score.decisionAsk).toBeGreaterThanOrEqual(0);
      expect(result.score.decisionAsk).toBeLessThanOrEqual(10);
    });

    it('should return high readiness score for comprehensive input', () => {
      const input = {
        context: 'Meeting with clear goal defined, strong strategic context, data-backed evidence, stakeholder alignment, and specific decision criteria for approval',
        meetingType: 'Decision meeting',
      };

      const result = assessReadiness(input);

      expect(result.score.overall).toBeGreaterThanOrEqual(7.0);
      expect(result.status.status).toMatch(/Partly ready|Ready/);
    });

    it('should return exactly "Ready" status for excellent input', () => {
      const input = {
        context: 'Comprehensive strategy review meeting with clearly defined and specific goal, strong strategic context backed by quantified business impact, substantial data and user validation evidence, full stakeholder alignment and support, and very clear approval criteria and timeline',
        meetingType: 'Decision meeting',
      };

      const result = assessReadiness(input);

      expect(result.score.overall).toBeGreaterThanOrEqual(7.5);
      expect(result.status.status).toBe('Ready');
      expect(result.status.color).toBe('#10B981');
    });

    it('should return "Partly ready" status for score between 5.0 and 7.4', () => {
      const input = {
        context: 'Strategy review with some clear elements but lacking comprehensive evidence and stakeholder preparation',
        meetingType: 'Strategy review',
      };

      const result = assessReadiness(input);

      expect(result.score.overall).toBeGreaterThanOrEqual(5.0);
      expect(result.score.overall).toBeLessThan(7.5);
      expect(result.status.status).toBe('Partly ready');
      expect(result.status.color).toBe('#F59E0B');
    });

    it('should return "Not ready" status for score < 5.0', () => {
      const input = {
        context: 'Unclear meeting with vague objectives and no preparation',
        meetingType: 'General discussion',
      };

      const result = assessReadiness(input);

      expect(result.score.overall).toBeLessThan(5.0);
      expect(result.status.status).toBe('Not ready');
      expect(result.status.color).toBe('#EF4444');
    });

    it('should generate gaps for low-scoring dimensions', () => {
      const input = {
        context: 'Meeting with unclear objectives and no evidence',
        meetingType: 'Strategy review',
      };

      const result = assessReadiness(input);

      expect(result.gaps).toBeDefined();
      expect(Array.isArray(result.gaps)).toBe(true);
      expect(result.gaps.length).toBeGreaterThan(0);
      expect(result.gaps.length).toBeLessThanOrEqual(3); // Max 3 gaps
    });

    it('should generate fix recommendations', () => {
      const input = {
        context: 'Test meeting with some gaps',
        meetingType: 'Review',
      };

      const result = assessReadiness(input);

      expect(result.fixes).toBeDefined();
      expect(Array.isArray(result.fixes)).toBe(true);
      expect(result.fixes.length).toBeGreaterThan(0);
      // Check first fix has required properties
      expect(result.fixes[0]).toHaveProperty('priority');
      expect(result.fixes[0]).toHaveProperty('fix');
      expect(result.fixes[0]).toHaveProperty('effort');
    });

    it('should generate likely questions', () => {
      const input = {
        context: 'Strategy review meeting with leadership team',
        meetingType: 'Strategy review',
      };

      const result = assessReadiness(input);

      expect(result.questions).toBeDefined();
      expect(Array.isArray(result.questions)).toBe(true);
      expect(result.questions.length).toBeGreaterThan(0);
      // Check first question has required properties
      expect(result.questions[0]).toHaveProperty('question');
      expect(result.questions[0]).toHaveProperty('category');
    });

    it('should generate practice moment', () => {
      const input = {
        context: 'Meeting context',
        meetingType: 'Review',
      };

      const result = assessReadiness(input);

      expect(result.practiceMoment).toBeDefined();
      expect(result.practiceMoment).toHaveProperty('scenario');
      expect(result.practiceMoment).toHaveProperty('action');
      expect(result.practiceMoment).toHaveProperty('expectedOutcome');
    });

    it('should be deterministic - same input produces same output', () => {
      const input = {
        context: 'Deterministic test context with specific goals, strategy, and evidence',
        meetingType: 'Strategy review',
      };

      const result1 = assessReadiness(input);
      const result2 = assessReadiness(input);

      expect(result1.score.overall).toBe(result2.score.overall);
      expect(result1.score.goalClarity).toBe(result2.score.goalClarity);
      expect(result1.status.status).toBe(result2.status.status);
    });

    it('should handle empty context gracefully', () => {
      const input = {
        context: '',
        meetingType: '',
      };

      const result = assessReadiness(input);

      expect(result).toBeDefined();
      expect(result.score.overall).toBeGreaterThanOrEqual(0);
      expect(result.score.overall).toBeLessThanOrEqual(10);
    });

    it('should boost goal clarity score for specific keywords', () => {
      const specificInput = {
        context: 'Meeting with clearly defined goal, specific objective, and measurable target',
        meetingType: 'Goal-setting',
      };

      const vagueInput = {
        context: 'Meeting with unclear, uncertain, undefined objectives',
        meetingType: 'Goal-setting',
      };

      const specificResult = assessReadiness(specificInput);
      const vagueResult = assessReadiness(vagueInput);

      expect(specificResult.score.goalClarity).toBeGreaterThan(vagueResult.score.goalClarity);
    });

    it('should boost strategic context for business impact keywords', () => {
      const businessInput = {
        context: 'Strategy review with clear business impact, ROI projection, and decision criteria aligned with company goals',
        meetingType: 'Strategy review',
      };

      const weakBusinessInput = {
        context: 'Strategy review with minimal business context',
        meetingType: 'Strategy review',
      };

      const businessResult = assessReadiness(businessInput);
      const weakResult = assessReadiness(weakBusinessInput);

      expect(businessResult.score.strategicContext).toBeGreaterThan(weakResult.score.strategicContext);
    });

    it('should boost evidence score for data keywords', () => {
      const dataInput = {
        context: 'Meeting with supporting data, user feedback, research evidence, and validation',
        meetingType: 'Data review',
      };

      const assumptionInput = {
        context: 'Meeting based on assumptions, guesses, and opinions without validation',
        meetingType: 'Planning',
      };

      const dataResult = assessReadiness(dataInput);
      const assumptionResult = assessReadiness(assumptionInput);

      expect(dataResult.score.evidence).toBeGreaterThan(assumptionResult.score.evidence);
    });

    it('should handle strategy review scenario correctly', () => {
      const input = {
        context: 'Strategy review where I need to present a roadmap pivot to leadership. Business impact and success metrics not fully quantified. Expecting questions on timeline and resource reallocation.',
        meetingType: 'Strategy review / roadmap pivot',
      };

      const result = assessReadiness(input);

      expect(result.score.overall).toBeGreaterThanOrEqual(4.0);
      expect(result.score.overall).toBeLessThanOrEqual(7.5);
      expect(result.gaps.some(gap => gap.dimension === 'Evidence' || gap.dimension === 'Strategic Context')).toBe(true);
    });
  });
});
