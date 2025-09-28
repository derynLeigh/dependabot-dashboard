import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from '@/components/atoms/loadingSpinner';

describe('LoadingSpinner', () => {
    it('renders with default size', () => {
        render(<LoadingSpinner />);
        const spinner = screen.getByTestId('loading-spinner');
        expect(spinner).toBeInTheDocument();
        expect(spinner).toHaveClass('w-4', 'h-4');
    });

    it('renders with custom size', () => {
        render(<LoadingSpinner size="lg" />);
        const spinner = screen.getByTestId('loading-spinner');
        expect(spinner).toHaveClass('w-8', 'h-8');
    });

    it('applies custom className', () => {
        render(<LoadingSpinner className="custom-class" />);
        const spinner = screen.getByTestId('loading-spinner');
        expect(spinner).toHaveClass('custom-class');
    });
});