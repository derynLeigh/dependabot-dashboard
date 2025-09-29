import { StatCard } from '@/components/atoms/statCard';

interface SummaryStatsProps {
  summary: {
    totalPRs: number;
    successfulRepos: number;
    failedRepos: number;
    fromCache: boolean;
  };
}

export function SummaryStats({ summary }: SummaryStatsProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      <StatCard title='Total PRs' value={summary.totalPRs} variant='default' />
      <StatCard
        title='Successful Repos'
        value={summary.successfulRepos}
        variant='success'
      />
      <StatCard
        title='Failed Repos'
        value={summary.failedRepos}
        variant='error'
      />
      <StatCard
        title='Cache Status'
        value={summary.fromCache ? 'Cached' : 'Fresh'}
        variant={summary.fromCache ? 'default' : 'warning'}
      />
    </div>
  );
}
