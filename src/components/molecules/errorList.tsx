import type { RepoError } from '@/types/apiTypes';

interface ErrorListProps {
  errors: RepoError[];
}

export function ErrorList({ errors }: ErrorListProps) {
  if (errors.length === 0) {
    return null;
  }

  return (
    <div className='bg-red-50 border border-red-200 rounded-lg p-6'>
      <h2 className='text-xl font-semibold text-red-800 mb-4'>
        Repository Errors
      </h2>
      <div className='space-y-3'>
        {errors.map((error, index) => (
          <div key={index} className='text-red-700'>
            <span className='font-semibold'>{error.repo}</span>
            {error.code && (
              <span className='text-red-600 ml-2'>({error.code})</span>
            )}
            <span className='ml-2'>- {error.error}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
