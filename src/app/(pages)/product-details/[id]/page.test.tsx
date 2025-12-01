import { render, screen } from '@testing-library/react';
import ProductPage from './page';

jest.mock('@/app/modules/product-details/ProductDetails', () => {
  const MockProductDetails = () => <div data-testid="product-details">Product Details</div>;
  MockProductDetails.displayName = 'MockProductDetails';
  return MockProductDetails;
});

describe(ProductPage.name, () => {
  it('renders the ProductDetails component', () => {
    render(<ProductPage />);

    expect(screen.getByTestId('product-details')).toBeInTheDocument();
  });
});