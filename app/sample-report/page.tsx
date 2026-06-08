import { sampleAssessment } from '@/data/mock-assessments';

export default function SampleReportPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-gray-900 mb-2">
            Sample Readiness Report
          </h1>
          <p className="text-gray-600">
            Strategy Review / Roadmap Pivot Meeting
          </p>
        </div>

        {/* Score Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl font-semibold text-gray-900">
              Overall Readiness
            </h2>
            <div
              className="text-3xl font-bold"
              style={{ color: sampleAssessment.status.color }}
            >
              {sampleAssessment.score.overall}/10
            </div>
          </div>
          <div className="inline-flex px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: `${sampleAssessment.status.color}20`, color: sampleAssessment.status.color }}>
            {sampleAssessment.status.status}
          </div>
        </div>

        {/* Dimension Scores */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 shadow-sm">
          <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
            Dimension Scores
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Goal Clarity</span>
              <span className="font-semibold text-gray-900">{sampleAssessment.score.goalClarity}/10</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gray-600 h-2 rounded-full"
                style={{ width: `${sampleAssessment.score.goalClarity * 10}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700">Strategic Context</span>
              <span className="font-semibold text-gray-900">{sampleAssessment.score.strategicContext}/10</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gray-600 h-2 rounded-full"
                style={{ width: `${sampleAssessment.score.strategicContext * 10}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700">Evidence</span>
              <span className="font-semibold text-gray-900">{sampleAssessment.score.evidence}/10</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-brand-green h-2 rounded-full"
                style={{ width: `${sampleAssessment.score.evidence * 10}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700">Stakeholder Risk</span>
              <span className="font-semibold text-gray-900">{sampleAssessment.score.stakeholderRisk}/10</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gray-600 h-2 rounded-full"
                style={{ width: `${sampleAssessment.score.stakeholderRisk * 10}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700">Decision Ask</span>
              <span className="font-semibold text-gray-900">{sampleAssessment.score.decisionAsk}/10</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gray-600 h-2 rounded-full"
                style={{ width: `${sampleAssessment.score.decisionAsk * 10}%` }}
              />
            </div>
          </div>
        </div>

        {/* Context Gaps */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 shadow-sm">
          <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
            Context Gaps
          </h3>
          <div className="space-y-4">
            {sampleAssessment.gaps.map((gap, index) => (
              <div key={index} className="border-l-4 border-red-500 pl-4 py-2">
                <div className="font-medium text-gray-900 mb-1">{gap.dimension}</div>
                <div className="text-sm text-gray-700 mb-1">{gap.gap}</div>
                <div className="text-sm text-gray-600 italic">{gap.impact}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Fixes */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 shadow-sm">
          <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
            Top Fixes
          </h3>
          <div className="space-y-3">
            {sampleAssessment.fixes.map((fix, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded">
                <div className="flex-shrink-0 w-6 h-6 bg-brand-green text-white rounded-full flex items-center justify-center text-xs font-semibold">
                  {fix.priority}
                </div>
                <div className="flex-1">
                  <div className="text-gray-900">{fix.fix}</div>
                  <div className="text-xs text-gray-500 mt-1">Effort: {fix.effort}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Likely Questions */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 shadow-sm">
          <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
            Likely Questions
          </h3>
          <div className="space-y-3">
            {sampleAssessment.questions.map((q, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 text-gray-400">Q{index + 1}:</div>
                <div>
                  <div className="text-gray-900 font-medium">{q.question}</div>
                  <div className="text-xs text-gray-500">Category: {q.category}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Practice Moment */}
        <div className="bg-gradient-to-br from-green-50 to-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
            Practice Moment
          </h3>
          <div className="mb-4">
            <div className="font-medium text-gray-900 mb-2">{sampleAssessment.practiceMoment.scenario}</div>
            <div className="text-gray-700 mb-3">{sampleAssessment.practiceMoment.action}</div>
            <div className="text-sm text-gray-600 italic">{sampleAssessment.practiceMoment.expectedOutcome}</div>
          </div>
        </div>

        {/* Try It Yourself */}
        <div className="mt-12 text-center">
          <h3 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
            Assess Your Own Readiness
          </h3>
          <p className="text-gray-600 mb-6">
            Paste your meeting context and get instant feedback on your preparation.
          </p>
          <a
            href="/app/readiness-check"
            className="inline-flex items-center justify-center px-6 py-3 bg-brand-green hover:bg-brand-greenHover text-white font-medium rounded-md transition-colors"
          >
            Run readiness check
          </a>
        </div>
      </div>
    </div>
  );
}
