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
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 mb-1">
            {pr.title}
          </h3>
          <p className="text-sm text-gray-600 mb-1">
            Repository: {pr.repo}
          </p>
          <p className="text-sm text-gray-500">
            Created: {formatDate(pr.createdAt)}
          </p>
        </div>
        <a 
          href={pr.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="ml-4 px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm hover:bg-blue-200 transition-colors whitespace-nowrap"
        >
          View PR
        </a>
      </div>
    </div>
  );
}