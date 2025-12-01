import { render, screen } from '@testing-library/react';
import ProductsPage from './page';

jest.mock('@/app/modules/products/Products', () => {
  const MockProducts = () => <div data-testid="products">Products</div>;
  MockProducts.displayName = 'MockProducts';
  return MockProducts;
});

describe(ProductsPage.name, () => {
  it('renders the Products component', () => {
    render(<ProductsPage />);

    expect(screen.getByTestId('products')).toBeInTheDocument();
  });
});