import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '@/components/atoms/button';

describe('Button', () => {
    it('renders with text', () => {
        render(<Button>Click me</Button>);
        expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('calls onClick when clicked', () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Click me</Button>);

        fireEvent.click(screen.getByRole('button'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('applies variant styles correctly', () => {
        render(<Button variant="primary">Primary</Button>);
        const button = screen.getByRole('button');
        expect(button).toHaveClass('bg-blue-600');
    });

    it('applies disabled state', () => {
        render(<Button disabled>Disabled</Button>);
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
        expect(button).toHaveClass('opacity-50');
    });

    it('shows loading state', () => {
        render(<Button loading>Loading</Button>);
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeDisabled();
    });
});