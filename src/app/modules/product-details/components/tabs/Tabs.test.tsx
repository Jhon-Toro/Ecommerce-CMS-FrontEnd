import { render, screen, fireEvent } from '@testing-library/react';
import Tabs from './Tabs';

describe(Tabs.name, () => {
  const mockOnTabChange = jest.fn();

  beforeEach(() => {
    mockOnTabChange.mockClear();
  });

  it('renders all tabs correctly', () => {
    render(<Tabs onTabChange={mockOnTabChange} />);
    expect(screen.getByText('Product Details')).toBeInTheDocument();
    expect(screen.getByText('Rating & Reviews')).toBeInTheDocument();
    expect(screen.getByText('FAQs')).toBeInTheDocument();
  });

  it('sets active tab correctly on click', () => {
    render(<Tabs onTabChange={mockOnTabChange} />);
    const productDetailsTab = screen.getByText('Product Details');
    const reviewsTab = screen.getByText('Rating & Reviews');

    fireEvent.click(productDetailsTab);

    expect(mockOnTabChange).toHaveBeenCalledWith('Product Details');
    expect(productDetailsTab).toHaveClass('tabs__tab');
    expect(productDetailsTab).toHaveClass('active');
    expect(reviewsTab).not.toHaveClass('active');
  });

  it('has Rating & Reviews as default active tab', () => {
    render(<Tabs onTabChange={mockOnTabChange} />);
    const reviewsTab = screen.getByText('Rating & Reviews');
    expect(reviewsTab).toHaveClass('tabs__tab');
    expect(reviewsTab).toHaveClass('active');
  });
});