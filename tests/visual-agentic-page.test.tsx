import { render, screen } from '@testing-library/react';
import VisualAgenticDevelopmentPage from '@/app/portfolio/visual-agentic-development/page';

describe('Visual Agentic Development Page', () => {
  it('renders the page header', () => {
    render(<VisualAgenticDevelopmentPage />);
    expect(screen.getByText('Visual Agentic Development')).toBeInTheDocument();
  });

  it('renders philosophy section', () => {
    render(<VisualAgenticDevelopmentPage />);
    expect(screen.getByText(/Why Visual Processes Matter/i)).toBeInTheDocument();
  });

  it('renders all diagram sections', () => {
    render(<VisualAgenticDevelopmentPage />);
    expect(screen.getByText(/The Core Development Loop/i)).toBeInTheDocument();
    expect(screen.getByText(/Agent Fleet Orchestration/i)).toBeInTheDocument();
    expect(screen.getByText(/Human-Agent Build Loop/i)).toBeInTheDocument();
    expect(screen.getByText(/Validation Gates/i)).toBeInTheDocument();
    expect(screen.getByText(/Research to Implementation/i)).toBeInTheDocument();
    expect(screen.getByText(/Visual Plan Lifecycle/i)).toBeInTheDocument();
  });

  it('renders validation section', () => {
    render(<VisualAgenticDevelopmentPage />);
    expect(screen.getByText(/Validated by Industry/i)).toBeInTheDocument();
    expect(screen.getByText(/LangChain's Deep Agents release/i)).toBeInTheDocument();
  });

  it('renders portfolio value section', () => {
    render(<VisualAgenticDevelopmentPage />);
    expect(screen.getByText(/For Hiring Managers/i)).toBeInTheDocument();
    expect(screen.getByText(/Pattern Recognition/i)).toBeInTheDocument();
    expect(screen.getByText(/Differentiation/i)).toBeInTheDocument();
    expect(screen.getByText(/Sophistication/i)).toBeInTheDocument();
  });

  it('has correct page structure', () => {
    const { container } = render(<VisualAgenticDevelopmentPage />);
    expect(container.querySelector('[data-testid="visual-agentic-page"]')).toBeInTheDocument();
  });
});
