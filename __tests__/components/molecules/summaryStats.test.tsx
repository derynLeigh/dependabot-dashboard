import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SummaryStats } from '@/components/molecules/summaryStats';

describe('SummaryStats', () => {
  const mockSummary = {
    totalPRs: 5,
    successfulRepos: 3,
    failedRepos: 1,
    fromCache: false,
  };

  it('renders all stat cards', () => {
    render(<SummaryStats summary={mockSummary} />);

    expect(screen.getByText('Total PRs')).toBeInTheDocument();
    expect(screen.getByText('Successful Repos')).toBeInTheDocument();
    expect(screen.getByText('Failed Repos')).toBeInTheDocument();
    expect(screen.getByText('Cache Status')).toBeInTheDocument();
  });

  it('displays correct values', () => {
    render(<SummaryStats summary={mockSummary} />);

    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('shows Fresh when not from cache', () => {
    render(<SummaryStats summary={mockSummary} />);
    expect(screen.getByText('Fresh')).toBeInTheDocument();
  });

  it('shows Cached when from cache', () => {
    render(<SummaryStats summary={{ ...mockSummary, fromCache: true }} />);
    expect(screen.getByText('Cached')).toBeInTheDocument();
  });

  it('applies success variant to successful repos', () => {
    render(<SummaryStats summary={mockSummary} />);
    const successValue = screen.getByText('3');
    expect(successValue).toHaveClass('text-green-600');
  });

  it('applies error variant to failed repos', () => {
    render(<SummaryStats summary={mockSummary} />);
    const errorValue = screen.getByText('1');
    expect(errorValue).toHaveClass('text-red-600');
  });

  it('uses grid layout for responsive design', () => {
    const { container } = render(<SummaryStats summary={mockSummary} />);
    const grid = container.firstChild;
    expect(grid).toHaveClass('grid');
  });
});
