import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PRList } from '@/components/organisms/prList';
import type { PRdto } from '@/types/apiTypes';

describe('PRList', () => {
  const mockPRs: PRdto[] = [
    {
      id: 1,
      title: 'Bump typescript from 5.0.0 to 5.1.0',
      url: 'https://github.com/test/repo1/pull/1',
      repo: 'repo1',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T12:00:00Z'
    },
    {
      id: 2,
      title: 'Update eslint to version 9',
      url: 'https://github.com/test/repo2/pull/2',
      repo: 'repo2',
      createdAt: '2024-01-16T09:00:00Z',
      updatedAt: '2024-01-16T10:00:00Z'
    }
  ];

  it('renders section heading', () => {
    render(<PRList prs={mockPRs} />);
    expect(screen.getByText('Pull Requests')).toBeInTheDocument();
  });

  it('renders all PR cards', () => {
    render(<PRList prs={mockPRs} />);
    expect(screen.getByText('Bump typescript from 5.0.0 to 5.1.0')).toBeInTheDocument();
    expect(screen.getByText('Update eslint to version 9')).toBeInTheDocument();
  });

  it('displays empty state when no PRs', () => {
    render(<PRList prs={[]} />);
    expect(screen.getByText(/No Dependabot PRs found/i)).toBeInTheDocument();
  });

  it('does not render PR cards when empty', () => {
    render(<PRList prs={[]} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('applies consistent spacing between cards', () => {
    const { container } = render(<PRList prs={mockPRs} />);
    const listContainer = container.querySelector('.space-y-4');
    expect(listContainer).toBeInTheDocument();
  });

  it('renders within a card container', () => {
    const { container } = render(<PRList prs={mockPRs} />);
    const card = container.querySelector('.bg-white.rounded-lg.shadow');
    expect(card).toBeInTheDocument();
  });
});