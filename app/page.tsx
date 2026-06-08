import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6 text-balance">
            Don't walk into important meetings unprepared
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto text-balance">
            Assess your readiness for critical meetings and product launches. Get clarity on your preparedness, identify gaps, and prioritize improvements in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
              data-testid="sample-report-link"
            >
              View sample report
            </Link>
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
