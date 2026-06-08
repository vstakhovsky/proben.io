'use client';

import { useState } from 'react';
import { assessReadiness } from '@/lib/scoring';
import type { AssessmentResult } from '@/lib/types';

export function ReadinessCheck() {
  const [context, setContext] = useState('');
  const [meetingType, setMeetingType] = useState('');
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!context.trim()) return;

    setIsAnalyzing(true);

    setTimeout(() => {
      const assessment = assessReadiness({ context, meetingType });
      setResult(assessment);
      setIsAnalyzing(false);
    }, 1000);
  };

  const handleReset = () => {
    setContext('');
    setMeetingType('');
    setResult(null);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {!result ? (
          <>
            {/* Header */}
            <div className="mb-8">
              <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-gray-900 mb-2">
                Meeting Readiness Check
              </h1>
              <p className="text-gray-600">
                Paste your meeting context below to assess your preparation and identify gaps.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6" data-testid="readiness-form">
              <div>
                <label htmlFor="context" className="block text-sm font-medium text-gray-700 mb-2">
                  Meeting Context <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="context"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  required
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-green focus:border-transparent"
                  placeholder="Describe your upcoming meeting. Include: what you're presenting, who you're meeting with, what decision you need, and any concerns you have..."
                  data-testid="readiness-context-input"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Example: "Strategy review meeting where I need to present a roadmap pivot to leadership. I'm shifting resources from customer acquisition to product stability initiatives. The business impact isn't fully quantified yet, and I'm expecting pushback on timeline and resource decisions."
                </p>
              </div>

              <div>
                <label htmlFor="meetingType" className="block text-sm font-medium text-gray-700 mb-2">
                  Meeting Type (Optional)
                </label>
                <input
                  type="text"
                  id="meetingType"
                  value={meetingType}
                  onChange={(e) => setMeetingType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-green focus:border-transparent"
                  placeholder="e.g., Strategy Review, Budget Request, Feature Launch"
                />
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={!context.trim() || isAnalyzing}
                  className="inline-flex items-center justify-center px-6 py-3 bg-brand-green hover:bg-brand-greenHover disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-md transition-colors"
                  data-testid="readiness-submit-button"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Assess Readiness'}
                </button>
                <button
                  type="button"
                  onClick={() => setContext('')}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear
                </button>
              </div>
            </form>

            {/* Sample Context */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Sample context to try:
              </p>
              <p className="text-sm text-gray-600 italic">
                "Strategy review meeting where I need to present a roadmap pivot to leadership. I'm shifting resources from customer acquisition to product stability initiatives. The business impact isn't fully quantified yet, and I'm expecting pushback on timeline and resource decisions."
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Results */}
            <div className="mb-8">
              <button
                onClick={handleReset}
                className="text-sm text-gray-500 hover:text-gray-700 mb-4"
              >
                ← Run another check
              </button>
              <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-gray-900 mb-2">
                Your Readiness Results
              </h1>
            </div>

            {/* Score Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm" data-testid="readiness-result">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-2xl font-semibold text-gray-900">
                  Overall Readiness
                </h2>
                <div
                  className="text-4xl font-bold"
                  style={{ color: result.status.color }}
                >
                  {result.score.overall}/10
                </div>
              </div>
              <div className="inline-flex px-4 py-2 rounded-full text-base font-medium" style={{ backgroundColor: `${result.status.color}20`, color: result.status.color }}>
                {result.status.status}
              </div>
            </div>

            {/* Dimension Breakdown */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
              <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
                Your Scores
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-700">Goal Clarity</span>
                    <span className="font-semibold text-gray-900">{result.score.goalClarity}/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${result.score.goalClarity >= 7 ? 'bg-brand-green' : result.score.goalClarity >= 5 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${result.score.goalClarity * 10}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-700">Strategic Context</span>
                    <span className="font-semibold text-gray-900">{result.score.strategicContext}/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${result.score.strategicContext >= 7 ? 'bg-brand-green' : result.score.strategicContext >= 5 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${result.score.strategicContext * 10}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-700">Evidence</span>
                    <span className="font-semibold text-gray-900">{result.score.evidence}/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${result.score.evidence >= 7 ? 'bg-brand-green' : result.score.evidence >= 5 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${result.score.evidence * 10}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-700">Stakeholder Risk</span>
                    <span className="font-semibold text-gray-900">{result.score.stakeholderRisk}/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${result.score.stakeholderRisk >= 7 ? 'bg-brand-green' : result.score.stakeholderRisk >= 5 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${result.score.stakeholderRisk * 10}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-700">Decision Ask</span>
                    <span className="font-semibold text-gray-900">{result.score.decisionAsk}/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${result.score.decisionAsk >= 7 ? 'bg-brand-green' : result.score.decisionAsk >= 5 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${result.score.decisionAsk * 10}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Gaps */}
            {result.gaps.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
                <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
                  Identified Gaps
                </h3>
                <div className="space-y-3">
                  {result.gaps.map((gap, index) => (
                    <div key={index} className="border-l-4 border-red-500 pl-4 py-2">
                      <div className="font-medium text-gray-900 text-sm">{gap.dimension}</div>
                      <div className="text-gray-700 text-sm">{gap.gap}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Fixes */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
              <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
                Recommended Fixes
              </h3>
              <div className="space-y-2">
                {result.fixes.map((fix, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded">
                    <div className="flex-shrink-0 w-6 h-6 bg-brand-green text-white rounded-full flex items-center justify-center text-xs font-semibold">
                      {fix.priority <= 3 ? fix.priority : ''}
                    </div>
                    <div className="flex-1 text-sm">
                      <div className="text-gray-900">{fix.fix}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Questions */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
              <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
                Likely Questions
              </h3>
              <div className="space-y-2">
                {result.questions.map((q, index) => (
                  <div key={index} className="flex items-start gap-3 text-sm">
                    <div className="flex-shrink-0 text-gray-400">Q{index + 1}:</div>
                    <div className="text-gray-700">{q.question}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Practice Moment */}
            <div className="bg-gradient-to-br from-green-50 to-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
                Your Practice Moment
              </h3>
              <div className="mb-3">
                <div className="font-medium text-gray-900 mb-2">{result.practiceMoment.scenario}</div>
                <div className="text-gray-700 mb-2">{result.practiceMoment.action}</div>
                <div className="text-sm text-gray-600 italic">{result.practiceMoment.expectedOutcome}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
