import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ErrorList } from '@/components/molecules/errorList';
import type { RepoError } from '@/types/apiTypes';

describe('ErrorList', () => {
  const mockErrors: RepoError[] = [
    {
      repo: 'repo1',
      error: 'Forbidden: insufficient permissions',
      code: '403',
    },
    {
      repo: 'repo2',
      error: 'Not found',
      code: '404',
    },
  ];

  it('renders all errors', () => {
    render(<ErrorList errors={mockErrors} />);

    expect(screen.getByText(/repo1/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Forbidden: insufficient permissions/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/repo2/i)).toBeInTheDocument();
    expect(screen.getByText(/Not found/i)).toBeInTheDocument();
  });

  it('renders section heading', () => {
    render(<ErrorList errors={mockErrors} />);
    expect(screen.getByText(/Repository Errors/i)).toBeInTheDocument();
  });

  it('does not render when errors array is empty', () => {
    const { container } = render(<ErrorList errors={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('applies error styling to container', () => {
    render(<ErrorList errors={mockErrors} />);
    const heading = screen.getByText(/Repository Errors/i);
    expect(heading).toHaveClass('text-red-800');
  });

  it('displays error code when provided', () => {
    render(<ErrorList errors={mockErrors} />);
    expect(screen.getByText(/403/i)).toBeInTheDocument();
  });

  it('handles errors without code', () => {
    const errorsWithoutCode: RepoError[] = [
      { repo: 'repo3', error: 'Network timeout' },
    ];
    render(<ErrorList errors={errorsWithoutCode} />);
    expect(screen.getByText(/repo3/i)).toBeInTheDocument();
    expect(screen.getByText(/Network timeout/i)).toBeInTheDocument();
  });
});
