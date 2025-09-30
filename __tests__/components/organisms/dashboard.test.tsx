import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Dashboard } from '@/components/organisms/dashboard';
import type { ApiResponse } from '@/types/apiTypes';

// Mock the API calls
vi.mock('@/lib/api', () => ({
  fetchPRs: vi.fn(),
  clearCache: vi.fn(),
}));

describe('Dashboard', () => {
  const mockApiResponse: ApiResponse = {
    data: [
      {
        id: 1,
        title: 'Bump typescript',
        url: 'https://github.com/test/repo/pull/1',
        repo: 'test-repo',
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T12:00:00Z'
      }
    ],
    errors: [],
    count: 1,
    fromCache: false,
    generatedAt: '2024-01-15T12:00:00Z',
    summary: {
      totalReposQueried: 2,
      successfulRepos: 2,
      failedRepos: 0
    }
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('displays loading state initially', async () => {
    const { fetchPRs } = await import('@/lib/api');
    vi.mocked(fetchPRs).mockImplementation(() => new Promise(() => {})); // Never resolves

    render(<Dashboard />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('displays data after successful fetch', async () => {
    const { fetchPRs } = await import('@/lib/api');
    vi.mocked(fetchPRs).mockResolvedValue(mockApiResponse);

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('Dependabot PRs')).toBeInTheDocument();
    });

    expect(screen.getByText('Bump typescript')).toBeInTheDocument();
  });

  it('displays error state on fetch failure', async () => {
    const { fetchPRs } = await import('@/lib/api');
    vi.mocked(fetchPRs).mockRejectedValue(new Error('API Error'));

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/API Error/i)).toBeInTheDocument();
    });
  });

  it('renders refresh button', async () => {
    const { fetchPRs } = await import('@/lib/api');
    vi.mocked(fetchPRs).mockResolvedValue(mockApiResponse);

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /refresh/i })).toBeInTheDocument();
    });
  });

  it('renders clear cache button', async () => {
    const { fetchPRs } = await import('@/lib/api');
    vi.mocked(fetchPRs).mockResolvedValue(mockApiResponse);

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /clear cache/i })).toBeInTheDocument();
    });
  });

  it('calls clearCache and refetches when clear cache button clicked', async () => {
    const { fetchPRs, clearCache } = await import('@/lib/api');
    vi.mocked(fetchPRs).mockResolvedValue(mockApiResponse);
    vi.mocked(clearCache).mockResolvedValue();

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /clear cache/i })).toBeInTheDocument();
    });

    const clearButton = screen.getByRole('button', { name: /clear cache/i });
    fireEvent.click(clearButton);

    await waitFor(() => {
      expect(clearCache).toHaveBeenCalledTimes(1);
      expect(fetchPRs).toHaveBeenCalledTimes(2); // Initial + after clear
    });
  });

  it('displays summary stats', async () => {
    const { fetchPRs } = await import('@/lib/api');
    vi.mocked(fetchPRs).mockResolvedValue(mockApiResponse);

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('Total PRs')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
    });
  });

  it('displays error list when errors present', async () => {
    const { fetchPRs } = await import('@/lib/api');
    const responseWithErrors: ApiResponse = {
      ...mockApiResponse,
      errors: [{ repo: 'failed-repo', error: 'Access denied', code: '403' }]
    };
    vi.mocked(fetchPRs).mockResolvedValue(responseWithErrors);

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/Repository Errors/i)).toBeInTheDocument();
      expect(screen.getByText(/failed-repo/i)).toBeInTheDocument();
    });
  });
});