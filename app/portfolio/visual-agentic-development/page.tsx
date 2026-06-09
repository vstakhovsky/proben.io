import { MermaidDiagram } from '@/components/MermaidDiagram';

const agentFleetLoopChart = `flowchart TD
    A[Human Product Owner] --> B[Orchestrator]

    B --> C{Complex Task?}
    C -->|No| D[Single-Agent Loop]
    C -->|Yes| E[Assign Specialists]

    E --> F[Research Analyst]
    E --> G[Product Manager]
    E --> H[Lead Architect]
    E --> I[Frontend Engineer]
    E --> J[QA Release Engineer]
    E --> K[Security Reviewer]
    E --> L[Documentation Engineer]

    F --> M[Synthesis & Recommendations]
    G --> M
    H --> M
    I --> M
    J --> M
    K --> M
    L --> M

    M --> N{Human Approve?}
    N -->|Needs Revision| B
    N -->|Approved| O[Implementation]

    O --> P[Verification]
    P --> Q{All Checks Pass?}
    Q -->|No| N
    Q -->|Yes| R[Complete]

    style A fill:#e1f5ff
    style N fill:#ffe6f0
    style R fill:#f0fff4`;

const buildLoopChart = `flowchart TB
    subgraph Human
        A[Define Goal & Spec]
        B[Review & Validate Plan]
        C[Verify Results]
        D[Approve Deployment]
    end

    subgraph Agent
        E[Create Visual Plan]
        F[Document Approach]
        G[Implement Code]
        H[Run Verification]
    end

    A --> E
    E --> F
    F --> B
    B -->|Approved| G
    B -->|Needs Revision| E
    G --> H
    H --> C
    C -->|Results OK| D

    style A fill:#e1f5ff
    style B fill:#e1f5ff
    style C fill:#e1f5ff
    style D fill:#e1f5ff
    style E fill:#f0fff4
    style F fill:#f0fff4
    style G fill:#f0fff4
    style H fill:#f0fff4`;

const validationGatesChart = `flowchart LR
    A[Code Change] --> B[Typecheck]
    B -->|Fails| B
    B -->|Passes| C[Unit Tests]

    C -->|Fails| C
    C -->|Passes| D[Build]

    D -->|Fails| D
    D -->|Passes| E[E2E Tests]

    E -->|Fails| E
    E -->|Passes| F[Browser QA]

    F -->|Issues| F
    F -->|Passes| G[Vercel Preview]

    G -->|Issues| G
    G -->|Passes| H[Production]

    style A fill:#e1f5ff
    style H fill:#f0fff4
    style B fill:#ffe6f0
    style C fill:#ffe6f0
    style D fill:#ffe6f0
    style E fill:#ffe6f0
    style F fill:#ffe6f0
    style G fill:#ffe6f0`;

const humanAgentHandoffChart = `flowchart LR
    A[Source Intake] --> B[Pattern Extraction]
    B --> C[Visual Plan]
    C --> D{Human Feedback}
    D -->|Needs Revision| C
    D -->|Approved| E[Agent Implementation]
    E --> F[Verification]
    F --> G{Decision Log}
    G --> H[Portfolio Page]

    style A fill:#e1f5ff
    style B fill:#fff4e6
    style C fill:#f0fff4
    style E fill:#fff0f5
    style F fill:#f5f0ff
    style G fill:#fffff0
    style H fill:#f0ffff`;

const researchToImplementationChart = `flowchart LR
    A[Market Source] --> B[Pattern Extraction]
    B --> C{Relevance Score}

    C -->|Low| D[Document and Watch]
    C -->|Medium| E[Monitor for Later]
    C -->|High| F[Application Hypothesis]

    F --> G{Priority}
    G -->|P2| H[Queue for Future]
    G -->|P1| I[Plan for Next Cycle]
    G -->|P0| J[Design Experiment]

    J --> K[Run Experiment]
    K --> L[Eval Results]
    L --> M{Decision}

    M -->|Adopt| N[Implement & Document]
    M -->|Test| O[Run Larger Test]
    M -->|Reject| P[Document Learning]

    style A fill:#e1f5ff
    style F fill:#fff4e6
    style J fill:#f0fff4
    style N fill:#f0fff4
    style P fill:#fff0f5`;

const visualPlanLifecycleChart = `flowchart LR
    A[Raw Idea] --> B[Markdown Brief]
    B --> C[Visual Plan]
    C --> D{Inline Feedback}

    D -->|Revision| C
    D -->|Approved| E[Implementation Ticket]

    E --> F[Agent Execution]
    F --> G[QA Report]
    G --> H{Pass?}

    H -->|No| F
    H -->|Yes| I[Portfolio Artifact]

    style A fill:#e1f5ff
    style C fill:#f0fff4
    style I fill:#fff0f5
    style G fill:#ffe6f0`;

export default function VisualAgenticDevelopmentPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" data-testid="visual-agentic-page">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-gray-900 mb-3">
            Visual Agentic Development
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            How Proben.io uses AI agents with visual planning, human oversight, and systematic
            validation to build software reliably.
          </p>
        </div>

        {/* Philosophy Section */}
        <section className="mb-16">
          <div className="bg-brand-green/5 border border-brand-green/20 rounded-lg p-8 mb-8">
            <h2 className="font-serif text-xl font-semibold text-gray-900 mb-4">
              Why Visual Processes Matter
            </h2>
            <p className="text-gray-700 mb-4">
              <strong>Invisible processes don't impress. Visible processes do.</strong>
            </p>
            <p className="text-gray-600 mb-4">
              AI-native development is complex. Agents, loops, research, validation, and human oversight
              all interact. If we only show the final code, we miss the most impressive part: the
              sophisticated system that builds the code.
            </p>
            <p className="text-gray-600">
              This page makes that system visible. Each diagram shows a different aspect of how AI
              agents and humans collaborate to build Proben.io.
            </p>
          </div>
        </section>

        {/* Core Loop */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-6">
            The Core Development Loop
          </h2>
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm mb-6">
            <MermaidDiagram chart={humanAgentHandoffChart} id="core-loop" />
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-medium text-gray-900 mb-3">How it works</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <span>
                  <strong>Source Intake:</strong> We continuously research the AI landscape for patterns
                  and best practices
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <span>
                  <strong>Pattern Extraction:</strong> Research is analyzed for applicable patterns for
                  Proben.io
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <span>
                  <strong>Visual Plan:</strong> Ideas are converted to visual plans before any code is
                  written
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <span>
                  <strong>Human Feedback:</strong> Plans are reviewed and revised before implementation
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <span>
                  <strong>Agent Implementation:</strong> Approved plans are executed by AI agents
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <span>
                  <strong>Verification:</strong> All changes are tested and validated
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <span>
                  <strong>Decision Log:</strong> Results are documented, including failures and
                  learnings
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <span>
                  <strong>Portfolio Page:</strong> Successful patterns are shared publicly
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Agent Fleet */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-6">
            Agent Fleet Orchestration
          </h2>
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm mb-6">
            <MermaidDiagram chart={agentFleetLoopChart} id="agent-fleet" />
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-medium text-gray-900 mb-3">Specialist Agents</h3>
            <p className="text-sm text-gray-600 mb-4">
              For complex tasks, we delegate to specialist agents rather than using a single
              general-purpose agent:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <div>
                  <span className="font-medium text-gray-900">Research Analyst</span>
                  <p className="text-gray-600">Market research and competitive analysis</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <div>
                  <span className="font-medium text-gray-900">Product Manager</span>
                  <p className="text-gray-600">Requirements and prioritization</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <div>
                  <span className="font-medium text-gray-900">Lead Architect</span>
                  <p className="text-gray-600">System design and technical decisions</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <div>
                  <span className="font-medium text-gray-900">Frontend Engineer</span>
                  <p className="text-gray-600">UI implementation and user experience</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <div>
                  <span className="font-medium text-gray-900">QA Release Engineer</span>
                  <p className="text-gray-600">Testing and deployment verification</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <div>
                  <span className="font-medium text-gray-900">Security Reviewer</span>
                  <p className="text-gray-600">Security analysis and vulnerability assessment</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <div>
                  <span className="font-medium text-gray-900">Documentation Engineer</span>
                  <p className="text-gray-600">Technical writing and documentation</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Build Loop */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-6">
            Human-Agent Build Loop
          </h2>
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm mb-6">
            <MermaidDiagram chart={buildLoopChart} id="build-loop" />
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-medium text-gray-900 mb-3">Human Oversight Points</h3>
            <p className="text-sm text-gray-600 mb-4">
              The build loop ensures humans remain in control at critical decision points:
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <span>
                  <strong>Define Goal:</strong> Humans specify what needs to be built and why
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <span>
                  <strong>Review Plan:</strong> Humans review and approve visual plans before
                  implementation
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <span>
                  <strong>Verify Results:</strong> Humans verify that results match requirements
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <span>
                  <strong>Approve Deployment:</strong> Humans approve production deployment
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Validation Gates */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-6">
            Validation Gates
          </h2>
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm mb-6">
            <MermaidDiagram chart={validationGatesChart} id="validation-gates" />
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-medium text-gray-900 mb-3">Every Gate Must Pass</h3>
            <p className="text-sm text-gray-600 mb-4">
              Each gate represents a quality checkpoint that must pass before proceeding:
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <span>
                  <strong>Typecheck:</strong> All TypeScript code must type-check without errors
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <span>
                  <strong>Unit Tests:</strong> All unit tests must pass
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <span>
                  <strong>Build:</strong> The production build must complete successfully
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <span>
                  <strong>E2E Tests:</strong> End-to-end tests must pass
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <span>
                  <strong>Browser QA:</strong> Manual verification in browser
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <span>
                  <strong>Vercel Preview:</strong> Preview deployment must be functional
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Research to Implementation */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-6">
            Research to Implementation
          </h2>
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm mb-6">
            <MermaidDiagram chart={researchToImplementationChart} id="research-flow" />
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-medium text-gray-900 mb-3">From Research to Practice</h3>
            <p className="text-sm text-gray-600 mb-4">
              We don't just follow trends—we research, evaluate, and apply patterns deliberately:
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <span>
                  <strong>Market Source:</strong> Research from AI industry leaders and research
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <span>
                  <strong>Pattern Extraction:</strong> Identify reusable patterns and principles
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <span>
                  <strong>Relevance Score:</strong> Evaluate applicability to Proben.io
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <span>
                  <strong>Application Hypothesis:</strong> Form specific hypothesis for testing
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <span>
                  <strong>Design Experiment:</strong> Create controlled test of the pattern
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <span>
                  <strong>Decision:</strong> Adopt, test further, or reject based on results
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Visual Plan Lifecycle */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-6">
            Visual Plan Lifecycle
          </h2>
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm mb-6">
            <MermaidDiagram chart={visualPlanLifecycleChart} id="visual-plan" />
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-medium text-gray-900 mb-3">Why Visual Plans Reduce Rework</h3>
            <p className="text-sm text-gray-600 mb-4">
              Visual plans catch misunderstandings before code is written:
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <span>
                  <strong>Raw Idea:</strong> Initial concept or requirement
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <span>
                  <strong>Markdown Brief:</strong> Initial written specification
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <span>
                  <strong>Visual Plan:</strong> Convert to diagrams and structured plans
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <span>
                  <strong>Feedback Loop:</strong> Iterate on plan until approved
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <span>
                  <strong>Implementation Ticket:</strong> Approved plan becomes implementation task
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <span>
                  <strong>Portfolio Artifact:</strong> Successful implementation becomes documented
                  evidence
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Validation */}
        <section className="mb-16">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
            <h2 className="font-serif text-xl font-semibold text-gray-900 mb-4">
              Validated by Industry
            </h2>
            <p className="text-gray-700 mb-4">
              <strong>LangChain's Deep Agents release (June 2026)</strong> validates Proben.io's
              approach:
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">✓</span>
                <span>
                  <strong>Planning first:</strong> We use visual plans → LangChain uses structured
                  TODOs
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">✓</span>
                <span>
                  <strong>Subagent delegation:</strong> We use specialist agents → LangChain uses
                  subagents
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">✓</span>
                <span>
                  <strong>Human-in-the-loop:</strong> We require approval gates → LangChain builds in
                  approval
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">✓</span>
                <span>
                  <strong>Closed loops:</strong> We use verification gates → LangChain builds on
                  LangGraph
                </span>
              </li>
            </ul>
            <p className="text-sm text-gray-600 mt-4">
              This validation demonstrates that Proben.io identified and implemented agentic
              development patterns before they became mainstream.
            </p>
          </div>
        </section>

        {/* Portfolio Value */}
        <section>
          <div className="bg-gray-900 text-gray-100 rounded-lg p-8">
            <h2 className="font-serif text-xl font-semibold text-white mb-4">
              For Hiring Managers
            </h2>
            <p className="text-gray-300 mb-4">
              This isn't just about using AI tools—it's about understanding how agent systems should
              be architected.
            </p>
            <p className="text-gray-300 mb-4">
              Proben.io demonstrates:
            </p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <span>
                  <strong>Pattern Recognition:</strong> Identified agentic patterns early through
                  research
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <span>
                  <strong>Validation:</strong> Mainstream tools now confirm our approach
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <span>
                  <strong>Sophistication:</strong> Deep understanding of agent architecture
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-green flex-shrink-0">→</span>
                <span>
                  <strong>Differentiation:</strong> Didn't follow trends—evaluated and applied correctly
                </span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
