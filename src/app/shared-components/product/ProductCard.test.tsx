import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';
import '@testing-library/jest-dom';

describe(ProductCard.name, () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    price: 100,
    discountPrice: 80,
    rating: 4.5,
    image: 'https://via.placeholder.com/300',
    discount: 20,
  };

  it('should render the product card with the correct name', () => {
    render(<ProductCard {...mockProduct} />);

    const productName = screen.getByText(mockProduct.name);
    expect(productName).toBeInTheDocument();
  });

  it('should render the product image with the correct src and alt', () => {
    render(<ProductCard {...mockProduct} />);
  
    const productImage = screen.getByAltText(mockProduct.name) as HTMLImageElement;
    expect(productImage).toBeInTheDocument();
  
    expect(productImage.src).toContain('via.placeholder.com'); 
  });
  
  
  it('should render the rating component with the correct rating', () => {
    render(<ProductCard {...mockProduct} />);

    const rating = screen.getByText(/4.5/);
    expect(rating).toBeInTheDocument();
  });

  it('should render the price and discount correctly', () => {
    render(<ProductCard {...mockProduct} />);

    const discountedPrice = screen.getByText('$80.00');
    expect(discountedPrice).toBeInTheDocument();

    const originalPrice = screen.getByText('$100.00');
    expect(originalPrice).toBeInTheDocument();

    const discountPercentage = screen.getByText('-20%');
    expect(discountPercentage).toBeInTheDocument();
  });

  it('should render the product card without discountPrice correctly if discountPrice is not provided', () => {
    const productWithoutDiscount = {
      ...mockProduct,
      discountPrice: undefined,
    };
    render(<ProductCard {...productWithoutDiscount} />);

    const price = screen.getByText('$100.00');
    expect(price).toBeInTheDocument();
  });
});
