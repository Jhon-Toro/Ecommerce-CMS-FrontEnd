import { act, render, screen, waitFor } from '@testing-library/react';
import Home from './page';
import * as React from 'react';
import { Product } from '../shared-components/product/interfaces/Product.interface';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        newArrivals: [
          { id: 1, name: 'Producto Nuevo 1' },
          { id: 2, name: 'Producto Nuevo 2' },
        ],
        topSelling: [
          { id: 3, name: 'Producto Top 1' },
          { id: 4, name: 'Producto Top 2' },
        ],
      }),
  })
) as jest.Mock;

jest.mock('@/app/modules/home/hero/Hero', () => {
  const MockHero = () => <div data-testid="hero" />;
  MockHero.displayName = 'MockHero';
  return MockHero;
});

jest.mock('@/app/modules/home/home-products/FeaturedProducts', () => {
  const MockProducts = ({ category }: Product) => (
    <div data-testid={`home-products-${category}`}>{category}</div>
  );
  MockProducts.displayName = 'MockProducts';
  return MockProducts;
});

jest.mock('@/app/modules/home/home-categories/HomeCategories', () => {
  const MockCategories = () => <div data-testid="home-categories" />;
  MockCategories.displayName = 'MockCategories';
  return MockCategories;
});

jest.mock('@/app/modules/home/happy-customers/HappyCustomers', () => {
  const MockCustomers = () => <div data-testid="happy-customers" />;
  MockCustomers.displayName = 'MockCustomers';
  return MockCustomers;
});

describe(Home.name, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Does not render anything until the products are loaded', async () => {
    await act(async () => {
      const { container } = render(<Home />);
      expect(container.innerHTML).toBe('');
    });
  });

  it('Correctly renders components when products are loaded', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByTestId('hero')).toBeInTheDocument();
      expect(screen.getByTestId('home-products-New Arrivals')).toBeInTheDocument();
      expect(screen.getByTestId('home-products-Top Selling')).toBeInTheDocument();
      expect(screen.getByTestId('home-categories')).toBeInTheDocument();
      expect(screen.getByTestId('happy-customers')).toBeInTheDocument();
    });
  });

  it('Call fetch to get the products', async () => {
    render(<Home />);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/data/products.json');
    });
  });
});
