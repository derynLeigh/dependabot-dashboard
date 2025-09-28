import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ErrorMessage } from '@/components/atoms/errorMessage';

describe('ErrorMessage', () => {
  it('renders error message text', () => {
    render(<ErrorMessage message="Something went wrong" />);
    
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders with error icon', () => {
    render(<ErrorMessage message="Error occurred" />);
    
    expect(screen.getByTestId('error-icon')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<ErrorMessage message="Error" className="custom-error" />);
    
    const container = screen.getByRole('alert');
    expect(container).toHaveClass('custom-error');
  });

  it('uses alert role for accessibility', () => {
    render(<ErrorMessage message="Alert message" />);
    
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('handles empty message gracefully', () => {
    render(<ErrorMessage message="" />);
    
    const container = screen.getByRole('alert');
    expect(container).toBeInTheDocument();
  });
});