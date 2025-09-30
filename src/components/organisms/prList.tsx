import { PRCard } from '@/components/molecules/prCard';
import type { PRdto } from '@/types/apiTypes';

interface PRListProps {
  prs: PRdto[];
}

export function PRList({ prs }: PRListProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b">
        <h2 className="text-xl font-semibold">Pull Requests</h2>
      </div>
      <div className="p-6">
        {prs.length === 0 ? (
          <p className="text-gray-500">No Dependabot PRs found</p>
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