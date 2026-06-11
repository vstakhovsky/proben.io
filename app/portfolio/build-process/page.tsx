export default function BuildProcessPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" data-testid="build-process-page">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-gray-900 mb-2">
            How Proben.io is Being Built
          </h1>
          <p className="text-gray-600">
            A transparent look at the development process, technology stack, and methodology.
          </p>
        </div>

        {/* Development Philosophy */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
            Development Philosophy
          </h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-2 h-2 bg-brand-green rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-gray-900">MVP-First Approach</div>
                  <div className="text-gray-600 text-sm">Start with a working public demo, iterate based on feedback</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-2 h-2 bg-brand-green rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-gray-900">Controlled AI-Assisted Development</div>
                  <div className="text-gray-600 text-sm">Using Claude Code with structured documentation and guardrails</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-2 h-2 bg-brand-green rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-gray-900">Phase-Based Development</div>
                  <div className="text-gray-600 text-sm">Each phase adds complexity only after validating the previous one</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-2 h-2 bg-brand-green rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-gray-900">Static-First Architecture</div>
                  <div className="text-gray-600 text-sm">Begin with static site for optimal performance, add backend when needed</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
            Technology Stack (Phase 1)
          </h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Core Framework</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>Next.js 15 with App Router</li>
                  <li>React 19</li>
                  <li>TypeScript (strict mode)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Styling & UI</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>Tailwind CSS</li>
                  <li>Custom design tokens</li>
                  <li>Premium editorial aesthetic</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Testing</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>Vitest for unit tests</li>
                  <li>Playwright for E2E tests</li>
                  <li>Testing Library for components</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Deployment</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>Vercel (static export)</li>
                  <li>Zero infrastructure costs</li>
                  <li>Edge CDN delivery</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Phase 1 Scope */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
            Phase 1 Scope
          </h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Included</h3>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-brand-green">✓</span>
                    <span className="text-gray-600">Landing page with product overview</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-brand-green">✓</span>
                    <span className="text-gray-600">Sample readiness report</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-brand-green">✓</span>
                    <span className="text-gray-600">Interactive readiness check demo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-brand-green">✓</span>
                    <span className="text-gray-600">Deterministic scoring algorithm</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-brand-green">✓</span>
                    <span className="text-gray-600">Build process documentation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-brand-green">✓</span>
                    <span className="text-gray-600">Basic testing suite</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Explicitly Excluded</h3>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-gray-400">✗</span>
                    <span className="text-gray-600">User authentication</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-gray-400">✗</span>
                    <span className="text-gray-600">Database integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-gray-400">✗</span>
                    <span className="text-gray-600">Real AI providers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-gray-400">✗</span>
                    <span className="text-gray-600">Payment processing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-gray-400">✗</span>
                    <span className="text-gray-600">Admin console</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-gray-400">✗</span>
                    <span className="text-gray-600">MCP automation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture Decisions */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
            Key Architecture Decisions
          </h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="space-y-4">
              <div className="border-l-4 border-brand-green pl-4">
                <div className="font-medium text-gray-900">Static Site First</div>
                <div className="text-sm text-gray-600 mt-1">
                  Phase 1 uses static site generation for optimal performance and zero infrastructure costs. Database and authentication will be added in Phase 2+ when validated by user feedback.
                </div>
              </div>
              <div className="border-l-4 border-brand-green pl-4">
                <div className="font-medium text-gray-900">Deterministic Algorithms</div>
                <div className="text-sm text-gray-600 mt-1">
                  Readiness scoring uses deterministic, weighted algorithms rather than AI calls. This ensures consistent, reproducible results and zero API costs in Phase 1.
                </div>
              </div>
              <div className="border-l-4 border-brand-green pl-4">
                <div className="font-medium text-gray-900">Component-Based Architecture</div>
                <div className="text-sm text-gray-600 mt-1">
                  React components are designed to be reusable and composable. Custom components are preferred over heavy component libraries to maintain control and flexibility.
                </div>
              </div>
              <div className="border-l-4 border-brand-green pl-4">
                <div className="font-medium text-gray-900">Type Safety First</div>
                <div className="text-sm text-gray-600 mt-1">
                  TypeScript is used with strict mode enabled. All code is typed, and `any` types are explicitly avoided to ensure code quality and maintainability.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Development Process */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
            Development Process
          </h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center font-semibold text-sm">
                  1
                </div>
                <div className="text-gray-700">Document requirements and architecture decisions</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center font-semibold text-sm">
                  2
                </div>
                <div className="text-gray-700">Create tests before implementation (TDD)</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center font-semibold text-sm">
                  3
                </div>
                <div className="text-gray-700">Implement features in small vertical slices</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center font-semibold text-sm">
                  4
                </div>
                <div className="text-gray-700">Run security review on all changes</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center font-semibold text-sm">
                  5
                </div>
                <div className="text-gray-700">Deploy to Vercel with static export</div>
              </div>
            </div>
          </div>
        </section>

        {/* Milestones */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
            Key Milestones
          </h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="space-y-6">
              <div className="border-l-4 border-brand-green pl-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-sm font-medium text-gray-500">2026-06-11</div>
                  <div className="text-xs bg-brand-green/10 text-brand-green px-2 py-1 rounded">Domain Launch</div>
                </div>
                <div className="font-medium text-gray-900 mb-1">Connected proben.io to Vercel Production</div>
                <div className="text-sm text-gray-600 mb-2">
                  Replaced Porkbun parking DNS with Vercel DNS records and launched the Proben MVP 6 landing page publicly.
                </div>
                <div className="text-xs text-gray-500 italic">
                  <span className="font-medium">Learning:</span> A working preview deployment is not the same as a launched product.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Repository */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
            Repository
          </h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <p className="text-gray-600 mb-4">
              The complete source code, documentation, and development history is available on GitHub.
            </p>
            <a
              href="https://github.com/veniamin/proben.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-md transition-colors text-sm"
            >
              View on GitHub
            </a>
          </div>
        </section>

        {/* Documentation */}
        <section>
          <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
            Documentation
          </h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <p className="text-gray-600 mb-4">
              Comprehensive documentation is available in the `docs/` directory:
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <span className="text-gray-400">→</span>
                <span><code className="bg-gray-100 px-1 py-0.5 rounded">CLAUDE.md</code> - AI-assisted development guide</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gray-400">→</span>
                <span><code className="bg-gray-100 px-1 py-0.5 rounded">docs/PRD.md</code> - Product requirements</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gray-400">→</span>
                <span><code className="bg-gray-100 px-1 py-0.5 rounded">docs/ROADMAP.md</code> - Implementation roadmap</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gray-400">→</span>
                <span><code className="bg-gray-100 px-1 py-0.5 rounded">docs/RFC-0001-architecture.md</code> - Architecture decisions</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gray-400">→</span>
                <span><code className="bg-gray-100 px-1 py-0.5 rounded">docs/SECURITY.md</code> - Security guidelines</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
