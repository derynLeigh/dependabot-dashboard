import { PRCard } from '@/components/molecules/prCard';
import type { PRdto } from '@/types/apiTypes';

interface PRListProps {
  prs: PRdto[];
}

export function PRList({ prs }: PRListProps) {
  return (
    <div className="dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold dark:text-gray-100">Pull Requests</h2>
      </div>
      <div className="p-6">
        {prs.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 text-base">No Dependabot PRs found</p>
        ) : (
          <div className="space-y-4">
            {prs.map((pr) => (
              <PRCard key={pr.id} pr={pr} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}