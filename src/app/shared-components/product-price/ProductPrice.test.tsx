import { render, screen } from '@testing-library/react';
import ProductPrice from './ProductPrice';

describe(ProductPrice.name, () => {
  it('should render the price correctly when there is no discount', () => {
    render(<ProductPrice price={100} currency="USD" />);

    const priceElement = screen.getByText('$100.00');
    expect(priceElement).toBeInTheDocument();
  });

  it('should render the price and discount price when discountPrice is provided', () => {
    render(
      <ProductPrice price={100} discountPrice={80} currency="USD" discount={20} />
    );

    const discountPriceElement = screen.getByText('$80.00');
    const originalPriceElement = screen.getByText('$100.00');
    expect(discountPriceElement).toBeInTheDocument();
    expect(originalPriceElement).toBeInTheDocument();

    const discountElement = screen.getByText('-20%');
    expect(discountElement).toBeInTheDocument();
  });

  it('should display the price with the correct currency symbol', () => {
    render(<ProductPrice price={100} currency="EUR" />);

    const priceElement = screen.getByText('€100.00');
    expect(priceElement).toBeInTheDocument();
  });

  it('should render the discount without a discount price correctly', () => {
    render(<ProductPrice price={100} discount={10} currency="USD" />);

    const priceElement = screen.getByText('$100.00');
    const discountElement = screen.getByText('-10%');
    expect(priceElement).toBeInTheDocument();
    expect(discountElement).toBeInTheDocument();
  });

  it('should format price correctly for USD currency by default', () => {
    render(<ProductPrice price={2500} />);

    const priceElement = screen.getByText('$2,500.00');
    expect(priceElement).toBeInTheDocument();
  });
});
