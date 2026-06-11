import Link from 'next/link';

export default function HowProbenWasBuiltPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-gray-900 mb-6">
            How Proben.io Was Built
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            From Green Tests to Real Quality: An AI-Assisted Development Experiment
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full">
            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
            <span className="text-sm font-medium text-amber-900">Live Experiment — Updated After Each Release</span>
          </div>
        </div>
      </section>

      {/* Why This Page Exists */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl font-semibold text-gray-900 mb-6">
            Why This Page Exists
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Proben.io is not only a product. It is an experiment in AI-assisted product development quality.
          </p>
          <p className="text-lg text-gray-600 mb-4">
            Most AI-assisted development showcases focus on speed: &quot;Look how fast we built this!&quot;
            But speed without quality is a trap. Green tests and successful builds don't mean the product is actually good.
          </p>
          <p className="text-lg text-gray-600">
            This page documents our quality journey—every failure, every process change, every lesson learned.
            It shows how we're learning to build better with AI, not just faster.
          </p>
        </div>
      </section>

      {/* Initial Failure */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl font-semibold text-gray-900 mb-6">
            The Initial Failure
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            In the first iteration, we had:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-600 space-y-2 mb-6">
            <li>✅ All tests passing</li>
            <li>✅ Successful builds</li>
            <li>✅ Green CI checks</li>
            <li>✅ Agent reports claiming success</li>
          </ul>
          <p className="text-lg text-gray-600 mb-4">
            But the actual quality did not match our PRD, RFC, ADR, or design standards.
          </p>
          <p className="text-lg text-gray-600">
            <strong>The problem:</strong> Technical correctness is not product acceptance. Green tests are necessary but not sufficient.
          </p>
        </div>
      </section>

      {/* Process Evolution Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl font-semibold text-gray-900 mb-6">
            Process Evolution Timeline
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Each failure led to a specific improvement. Here's how our quality system evolved:
          </p>

          <div className="space-y-6">
            {/* Card 1 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-semibold text-gray-600">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Builder-Only Workflow</h3>
                  <p className="text-gray-600 mb-2">
                    <strong>Status:</strong> ❌ Failed — Green tests but poor quality
                  </p>
                  <p className="text-sm text-gray-500">
                    Agents built code, tests passed, but product didn't match requirements.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-brand-green rounded-full flex items-center justify-center font-semibold text-white">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Visual Agentic Delivery System</h3>
                  <p className="text-gray-600 mb-2">
                    <strong>Status:</strong> ✅ Implemented — Separated builders from reviewers
                  </p>
                  <p className="text-sm text-gray-500">
                    Created 4-level agent authority system. Builders (Level 1) cannot approve own work.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-brand-green rounded-full flex items-center justify-center font-semibold text-white">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Visual Evidence Workbench</h3>
                  <p className="text-gray-600 mb-2">
                    <strong>Status:</strong> ✅ Implemented — Screenshot evidence required
                  </p>
                  <p className="text-sm text-gray-500">
                    UI acceptance now requires side-by-side screenshots, not text descriptions.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-brand-green rounded-full flex items-center justify-center font-semibold text-white">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">DOM Blockers</h3>
                  <p className="text-gray-600 mb-2">
                    <strong>Status:</strong> ✅ Implemented — Deterministic tests
                  </p>
                  <p className="text-sm text-gray-500">
                    Required/forbidden elements tested automatically. P0 failures = automatic REJECT.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 5 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-brand-green rounded-full flex items-center justify-center font-semibold text-white">
                  5
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Three-Way Comparison</h3>
                  <p className="text-gray-600 mb-2">
                    <strong>Status:</strong> ✅ Implemented — Before/Target/After/Diff
                  </p>
                  <p className="text-sm text-gray-500">
                    Must prove AFTER is closer to TARGET than BEFORE.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 6 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-brand-green rounded-full flex items-center justify-center font-semibold text-white">
                  6
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Agent Consolidation</h3>
                  <p className="text-gray-600 mb-2">
                    <strong>Status:</strong> ✅ Implemented — 20+ agents → 8 core roles
                  </p>
                  <p className="text-sm text-gray-500">
                    Fewer agents with clear authority beats many agents with vague responsibilities.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 7 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-semibold text-white">
                  7
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Experimentation Infrastructure</h3>
                  <p className="text-gray-600 mb-2">
                    <strong>Status:</strong> ✅ Implemented — Learning loops
                  </p>
                  <p className="text-sm text-gray-500">
                    Every failure becomes an eval case. Every decision becomes a documented learning.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 8 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-brand-green rounded-full flex items-center justify-center font-semibold text-white">
                  8
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Case-Inspired Agent Harness</h3>
                  <p className="text-gray-600 mb-2">
                    <strong>Status:</strong> ✅ Implemented — State machine + evidence gates
                  </p>
                  <p className="text-sm text-gray-500">
                    Moved from agent sprawl to 5-role harness model. Do not trust agent claims; trust artifacts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning 008 - Harness Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green text-white rounded-full mb-6">
            <span className="text-sm font-medium">Learning 008</span>
          </div>
          <h2 className="font-serif text-3xl font-semibold text-gray-900 mb-6">
            From Agent Sprawl to Evidence Gates
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            We initially tried to improve quality by adding more agents, skills, hooks, and review instructions. But the key learning was that <strong>more roles can still create false confidence</strong> if transitions are not enforced.
          </p>

          <div className="mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">The New Model</h3>
            <p className="text-lg text-gray-600 mb-4">
              We moved from "many agents" to a harness model with 5 state-machine roles:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="font-semibold text-gray-900 mb-2">1. Implementer</div>
                <div className="text-sm text-gray-600">Creates the change (code, UI, docs, tests)</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="font-semibold text-gray-900 mb-2">2. Verifier</div>
                <div className="text-sm text-gray-600">Verifies it works (proof, tests, screenshots)</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="font-semibold text-gray-900 mb-2">3. Reviewer</div>
                <div className="text-sm text-gray-600">Checks quality (evidence-first review)</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="font-semibold text-gray-900 mb-2">4. Closer</div>
                <div className="text-sm text-gray-600">Checks release readiness (final gate)</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:col-span-2">
                <div className="font-semibold text-gray-900 mb-2">5. Retro</div>
                <div className="text-sm text-gray-600">System learning (governance)</div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">The Workflow</h3>
            <p className="text-lg text-gray-600 mb-4">
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">Implement → Verify → Review → Close → Retro</code>
            </p>
          </div>

          <div className="mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">The Principle</h3>
            <p className="text-xl text-gray-900 mb-4 font-semibold">
              "Do not trust agent claims. Trust artifacts."
            </p>
            <p className="text-lg text-gray-600 mb-4">
              We now trust verifiable artifacts, not text messages:
            </p>
            <ul className="text-lg text-gray-600 space-y-2">
              <li>• <strong>Logs</strong> — Real command output</li>
              <li>• <strong>SHA-256 hashes</strong> — Cryptographic proof</li>
              <li>• <strong>Screenshots</strong> — Before/target/after for UI</li>
              <li>• <strong>DOM blockers</strong> — Deterministic tests</li>
              <li>• <strong>Manifests</strong> — Metadata with hashes</li>
              <li>• <strong>Human approval</strong> — Final authority</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">New KPIs</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-900 mb-1">0</div>
                <div className="text-sm text-gray-600">False PASS rate target</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-900 mb-1">100%</div>
                <div className="text-sm text-gray-600">Evidence completeness target</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-900 mb-1">≤ 2</div>
                <div className="text-sm text-gray-600">Revision loops maximum</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-900 mb-1">Measured</div>
                <div className="text-sm text-gray-600">Skill usefulness (by evals)</div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-white border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Next Step</h3>
            <p className="text-lg text-gray-600 mb-2">
              Before continuing to Slice B, Slice A must pass through the harness. If the header is still generic, the harness must block the process.
            </p>
            <p className="text-sm text-gray-500">
              This ensures our quality gates actually work before we rely on them for more features.
            </p>
          </div>
        </div>
      </section>

      {/* Key Decision Log Preview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl font-semibold text-gray-900 mb-6">
            Key Decisions (Preview)
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Selected entries from our Build Learning & Decision Log:
          </p>

          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">BLD-001 — Green Tests Were Not Enough</h3>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Decision:</strong> Separate builders from reviewers. Create visual quality gates.
              </p>
              <p className="text-sm text-gray-500">
                <strong>Learning:</strong> Functional success is not product acceptance.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">BLD-002 — Builders Can't Be Reviewers</h3>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Decision:</strong> No self-approval. Independent review required.
              </p>
              <p className="text-sm text-gray-500">
                <strong>Learning:</strong> The agent that builds cannot accept its own work.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">BLD-003 — Text-Only Review Failed</h3>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Decision:</strong> Require screenshot evidence. Browser state = source of truth.
              </p>
              <p className="text-sm text-gray-500">
                <strong>Learning:</strong> UI acceptance must be evidence-based, not checklist-only.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">BLD-004 — Need Deterministic Blockers</h3>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Decision:</strong> Add DOM tests. P0 failures = automatic REJECT.
              </p>
              <p className="text-sm text-gray-500">
                <strong>Learning:</strong> Some criteria should be deterministic, not subjective.
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="https://github.com/veniaminproben/proben.io/blob/main/docs/product-build-history/BUILD_LEARNING_DECISION_LOG.md"
              className="inline-flex items-center px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-md transition-colors"
            >
              View Full Decision Log →
            </Link>
          </div>
        </div>
      </section>

      {/* Quality Metrics */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl font-semibold text-gray-900 mb-6">
            Quality Metrics (Early Results)
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Target metrics for Phase 2.1:
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">≥ 4.5/5</div>
              <div className="text-sm text-gray-600">Visual Parity Target</div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
              <div className="text-sm text-gray-600">Evidence Completeness</div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">0</div>
              <div className="text-sm text-gray-600">False PASS Target</div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
              <div className="text-sm text-gray-600">DOM Blocker Pass Target</div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sm:col-span-2">
              <div className="text-3xl font-bold text-gray-900 mb-2">≤ 2</div>
              <div className="text-sm text-gray-600">Revision Loops Maximum</div>
            </div>
          </div>
        </div>
      </section>

      {/* What Changed */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl font-semibold text-gray-900 mb-6">
            What Changed
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-red-600 mb-4">Before</h3>
              <p className="text-gray-600 mb-4">
                Prompt → Build → Tests → Green text → Human finds issue late
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>❌ Agent approval treated as acceptance</li>
                <li>❌ Text-only reviews</li>
                <li>❌ No visual evidence</li>
                <li>❌ No deterministic blockers</li>
                <li>❌ Failures not documented</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-brand-green mb-4">After</h3>
              <p className="text-gray-600 mb-4">
                Visual plan → Human approval → Isolated build → Evidence → Fresh review → Principal gates → Human approval
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>✅ Agent PASS is advisory only</li>
                <li>✅ Screenshot evidence required</li>
                <li>✅ DOM blockers for objective checks</li>
                <li>✅ Three-way comparison</li>
                <li>✅ Every failure → gate + learning</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Key Lesson */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green text-white rounded-full mb-6">
            <span className="text-sm font-medium">Key Lesson</span>
          </div>
          <blockquote className="font-serif text-2xl sm:text-3xl text-gray-900 mb-8">
            &quot;AI-assisted development needs quality architecture, not just more agents.&quot;
          </blockquote>
          <p className="text-lg text-gray-600">
            The bottleneck moves from building to validating and learning. We need systematic quality gates, not faster building.
          </p>
        </div>
      </section>

      {/* Next */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl font-semibold text-gray-900 mb-6">
            What's Next
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            This page will be updated after every major release and process change.
          </p>
          <p className="text-lg text-gray-600 mb-4">
            Current focus: Phase 2.1 — Landing page design parity with Proben MVP 6.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700">
              <strong>Important:</strong> Before proceeding to Slice B, Slice A must pass through the new harness system. If the header is still generic, the harness must block progression. This ensures our quality gates actually work.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-brand-green hover:bg-brand-greenHover text-white font-medium rounded-md transition-colors"
            >
              See Proben.io →
            </Link>
            <Link
              href="https://github.com/veniaminproben/proben.io"
              className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 font-medium rounded-md border border-gray-300 transition-colors"
            >
              View on GitHub →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
