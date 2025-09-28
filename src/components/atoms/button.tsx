// src/components/atoms/Button.tsx
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { LoadingSpinner } from './loadingSpinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'danger';
    loading?: boolean;
}

export function Button({
    children,
    variant = 'primary',
    loading = false,
    disabled,
    className = '',
    ...props
}: ButtonProps) {
    const baseClasses = 'px-4 py-2 rounded font-medium transition-colors';

    const variantClasses = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        danger: 'bg-red-600 text-white hover:bg-red-700'
    };

    const disabledClasses = (disabled || loading) ? 'opacity-50 cursor-not-allowed' : '';

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <div className="flex items-center gap-2">
                    <LoadingSpinner size="sm" />
                    {children}
                </div>
            ) : (
                children
            )}
        </button>
    );
}