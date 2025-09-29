import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PRCard } from '@/components/molecules/prCard';
import type { PRdto } from '@/types/apiTypes';

describe('PRCard', () => {
  const mockPR: PRdto = {
    id: 1,
    title: 'Bump typescript from 5.0.0 to 5.1.0',
    url: 'https://github.com/test/repo/pull/1',
    repo: 'test-repo',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T12:00:00Z'
  };

  it('renders PR title', () => {
    render(<PRCard pr={mockPR} />);
    expect(screen.getByText('Bump typescript from 5.0.0 to 5.1.0')).toBeInTheDocument();
  });

  it('renders repository name', () => {
    render(<PRCard pr={mockPR} />);
    expect(screen.getByText(/test-repo/i)).toBeInTheDocument();
  });

  it('renders formatted created date', () => {
    render(<PRCard pr={mockPR} />);
    expect(screen.getByText(/Created:/i)).toBeInTheDocument();
  });

  it('renders link to PR with correct href', () => {
    render(<PRCard pr={mockPR} />);
    const link = screen.getByRole('link', { name: /view pr/i });
    expect(link).toHaveAttribute('href', 'https://github.com/test/repo/pull/1');
  });

  it('opens link in new tab', () => {
    render(<PRCard pr={mockPR} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});