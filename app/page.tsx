import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-grid-pattern">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full mb-8">
            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
            <span className="text-sm font-medium text-amber-900">Context readiness before important meetings</span>
          </div>

          {/* Hero Content - Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Hero Text */}
            <div className="space-y-8">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-900 leading-tight text-balance">
                Know what to fix before the meeting starts.
              </h1>
              <p className="text-lg text-gray-600 max-w-xl text-balance">
                Paste rough meeting context. Proben checks your goal, strategy, evidence, stakeholder risk, and decision ask — then shows what to fix before the room does.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/app/readiness-check"
                  className="inline-flex items-center justify-center px-6 py-3 bg-brand-green hover:bg-brand-greenHover text-white font-medium rounded-md transition-colors text-base"
                  data-testid="hero-run-readiness-check"
                >
                  Run readiness check
                </Link>
                <Link
                  href="/sample-report"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 font-medium rounded-md border border-gray-300 transition-colors text-base"
                  data-testid="hero-sample-report"
                >
                  See sample report
                </Link>
              </div>

              {/* Trust Note */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>No account required</span>
                <span className="text-gray-300">·</span>
                <span>Use rough notes</span>
                <span className="text-gray-300">·</span>
                <span>Not a personality score</span>
              </div>
            </div>

            {/* Right Column - Readiness Preview Card */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8">
              {/* Context Header */}
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-1">Your context</div>
                <div className="font-medium text-gray-900">Strategy review · roadmap pivot</div>
              </div>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full mb-6">
                <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                <span className="text-sm font-medium text-amber-900">Status: Analyzed</span>
              </div>

              {/* Score */}
              <div className="mb-8">
                <div className="text-5xl font-bold text-gray-900 mb-2">6.2<span className="text-2xl text-gray-400"> / 10</span></div>
                <div className="text-sm font-medium text-amber-700">Partly ready · 3 context gaps found</div>
              </div>

              {/* Five Checks */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Goal clarity</span>
                  <span className="font-semibold text-gray-900">8.0</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Strategic context</span>
                  <span className="font-semibold text-gray-900">5.8</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '58%' }}></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Evidence</span>
                  <span className="font-semibold text-gray-900">6.0</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Stakeholder risk</span>
                  <span className="font-semibold text-gray-900">5.5</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '55%' }}></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Decision ask</span>
                  <span className="font-semibold text-gray-900">5.2</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '52%' }}></div>
                </div>
              </div>

              {/* Context Gaps */}
              <div className="border-t border-gray-200 pt-6 mb-6">
                <div className="text-sm font-medium text-gray-900 mb-3">Context gaps</div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>Business impact unclear</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>Decision threshold missing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>Stakeholder pushback likely</span>
                  </li>
                </ul>
              </div>

              {/* Top Fix */}
              <div className="border-t border-gray-200 pt-6 mb-6">
                <div className="text-sm font-medium text-gray-900 mb-3">Top fix</div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-green-900">Add a business-impact number</span>
                  </p>
                </div>
              </div>

              {/* Practice Moment */}
              <div className="border-t border-gray-200 pt-6">
                <div className="text-sm font-medium text-gray-900 mb-3">Practice moment</div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700 italic">
                    "Why now?"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl font-semibold text-gray-900 mb-12 text-center">
            What Proben Assesses
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-brand-green font-semibold mb-2">5 Key Dimensions</div>
              <h3 className="font-serif text-xl font-medium text-gray-900 mb-3">
                Goal Clarity
              </h3>
              <p className="text-gray-600">
                Is your meeting objective clearly defined and specific?
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-brand-green font-semibold mb-2">Strategic Context</div>
              <h3 className="font-serif text-xl font-medium text-gray-900 mb-3">
                Strategic Alignment
              </h3>
              <p className="text-gray-600">
                Does your request align with business goals and strategy?
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-brand-green font-semibold mb-2">Evidence-Based</div>
              <h3 className="font-serif text-xl font-medium text-gray-900 mb-3">
                Data & Evidence
              </h3>
              <p className="text-gray-600">
                Are you supporting your proposal with solid evidence?
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-brand-green font-semibold mb-2">Risk Management</div>
              <h3 className="font-serif text-xl font-medium text-gray-900 mb-3">
                Stakeholder Risk
              </h3>
              <p className="text-gray-600">
                Have you addressed potential objections and concerns?
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-brand-green font-semibold mb-2">Clear Ask</div>
              <h3 className="font-serif text-xl font-medium text-gray-900 mb-3">
                Decision Criteria
              </h3>
              <p className="text-gray-600">
                Is it clear what decision you need and by when?
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-brand-green font-semibold mb-2">Actionable Results</div>
              <h3 className="font-serif text-xl font-medium text-gray-900 mb-3">
                Practice Moment
              </h3>
              <p className="text-gray-600">
                Get specific guidance on how to improve your readiness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl font-semibold text-gray-900 mb-12 text-center">
            How It Works
          </h2>
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-brand-green text-white rounded-full flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Paste your meeting context</h3>
                <p className="text-gray-600">
                  Describe your upcoming meeting, what you're presenting, and any concerns you have.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-brand-green text-white rounded-full flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Get instant readiness assessment</h3>
                <p className="text-gray-600">
                  Receive a score out of 10 across 5 key dimensions with specific gap analysis.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-brand-green text-white rounded-full flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Identify gaps and get fixes</h3>
                <p className="text-gray-600">
                  Understand exactly where you're unprepared and how to improve before the meeting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-semibold text-gray-900 mb-6">
            Ready to assess your meeting readiness?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join solo founders who use Proben to walk into important meetings with confidence.
          </p>
          <Link
            href="/app/readiness-check"
            className="inline-flex items-center justify-center px-8 py-4 bg-brand-green hover:bg-brand-greenHover text-white font-medium rounded-md transition-colors text-lg"
            data-testid="cta-run-readiness-check"
          >
            Run readiness check
          </Link>
        </div>
      </section>
    </div>
  );
}
