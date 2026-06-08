import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import HomePage from '@/app/page';

describe('Smoke Tests', () => {
  describe('Page Components', () => {
    it('should render home page without crashing', () => {
      expect(() => render(<HomePage />)).not.toThrow();
    });

    it('should have required metadata', () => {
      const { container } = render(<HomePage />);

      // Check for key elements
      expect(container.textContent).toContain('Don\'t walk into important meetings unprepared');
      expect(container.textContent).toContain('Run readiness check');
      expect(container.textContent).toContain('View sample report');
    });

    it('should have navigation link to readiness check', () => {
      const { container } = render(<HomePage />);

      expect(container.innerHTML).toContain('/app/readiness-check');
    });

    it('should have navigation link to sample report', () => {
      const { container } = render(<HomePage />);

      expect(container.innerHTML).toContain('/sample-report');
    });
  });
});
