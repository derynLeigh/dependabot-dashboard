// src/components/organisms/dashboard.tsx
'use client';

import { useState, useEffect } from 'react';
import { fetchPRs, clearCache } from '@/lib/api';
import type { ApiResponse } from '@/types/apiTypes';
import { Button } from '@/components/atoms/button';
import { LoadingSpinner } from '@/components/atoms/loadingSpinner';
import { ErrorMessage } from '@/components/atoms/errorMessage';
import { SummaryStats } from '@/components/molecules/summaryStats';
import { ErrorList } from '@/components/molecules/errorList';
import { PRList } from '@/components/organisms/prList';

export function Dashboard() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchPRs();
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleClearCache = async () => {
    try {
      setError(null);
      await clearCache();
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear cache');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner size="lg" />
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dependabot PRs</h1>
        <div className="flex gap-4">
          <Button onClick={loadData}>Refresh</Button>
          <Button variant="danger" onClick={handleClearCache}>
            Clear Cache
          </Button>
        </div>
      </div>

      {data && (
        <div className="space-y-6">
          <SummaryStats
            summary={{
              totalPRs: data.count,
              successfulRepos: data.summary.successfulRepos,
              failedRepos: data.summary.failedRepos,
              fromCache: data.fromCache
            }}
          />

          <PRList prs={data.data} />

          <ErrorList errors={data.errors} />
        </div>
      )}
    </div>
  );
}