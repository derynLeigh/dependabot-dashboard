import type { PRdto } from '@/types/apiTypes';

interface PRCardProps {
  pr: PRdto;
}

export function PRCard({ pr }: PRCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 mb-2 text-base"> 
            {pr.title}
          </h3>
          <p className="text-base text-gray-700 mb-1">
            Repository: {pr.repo}
          </p>
          <p className="text-sm text-gray-600">
            Created: {formatDate(pr.createdAt)}
          </p>
        </div>
        <a 
          href={pr.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded text-base font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
        >
          View PR
        </a>
      </div>
    </div>
  );
}