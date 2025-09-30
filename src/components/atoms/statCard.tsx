interface StatCardProps {
  title: string;
  value: string | number;
  variant?: 'default' | 'success' | 'error' | 'warning';
  className?: string;
}

export function StatCard({ title, value, variant = 'default', className = '' }: StatCardProps) {
  const baseClasses = 'dark:bg-gray-800 p-4 rounded-lg shadow';

  const variantClasses = {
    default: 'text-blue-600',
    success: 'text-green-600', 
    error: 'text-red-600',
    warning: 'text-orange-600'
  };

  return (
    <div 
      role="region" 
      className={`${baseClasses} ${className}`}
    >
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </h3>
      <p className={`text-2xl font-bold ${variantClasses[variant]}`}>
        {value}
      </p>
    </div>
  );
}