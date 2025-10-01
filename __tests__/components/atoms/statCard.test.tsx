import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatCard } from '@/components/atoms/statCard';

describe('StatCard', () => {
  it('renders with title and value', () => {
    render(<StatCard title="Total PRs" value="5" />);
    
    expect(screen.getByText('Total PRs')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('applies color variant classes', () => {
    render(<StatCard title="Success" value="3" variant="success" />);
    
    const valueElement = screen.getByText('3');
    expect(valueElement).toHaveClass('text-green-600');
  });

  it('renders with default variant', () => {
    render(<StatCard title="Default" value="1" />);
    
    const valueElement = screen.getByText('1');
    // Check for light mode class (dark mode class won't be active in tests)
    expect(valueElement.className).toContain('text-blue-600');
  });

  it('applies custom className', () => {
    render(<StatCard title="Custom" value="2" className="custom-class" />);
    
    const container = screen.getByRole('region');
    expect(container).toHaveClass('custom-class');
  });
});