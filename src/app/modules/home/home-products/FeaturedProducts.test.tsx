import { render, screen } from '@testing-library/react';
import FeaturedProducts from './FeaturedProducts';
import type { Product } from '@/app/shared-components/product/interfaces/Product.interface';

jest.mock('@/app/shared-components/button/Button', () => ({
  __esModule: true,
  default: ({ text }: { text: string }) => <button>{text}</button>,
}));

jest.mock('@/app/shared-components/product/ProductCard', () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => (
    <div data-testid="product-card">{name}</div>
  ),
}));

describe('FeaturedProducts Component', () => {
  const mockProducts: Product[] = [
    {
      id: 1,
      name: 'T-shirt',
      price: 30,
      discountPrice: 25,
      rating: 4.3,
      image: '/tshirt.jpg',
      category: 'clothing',
      discount: 20,
    },
    {
      id: 2,
      name: 'Sneakers',
      price: 100,
      discountPrice: null,
      rating: 4.8,
      image: '/sneakers.jpg',
    },
  ];

  it('renders the category title', () => {
    render(<FeaturedProducts category="Top Picks" products={mockProducts} />);
    expect(screen.getByText('Top Picks')).toBeInTheDocument();
  });

  it('renders all ProductCards passed', () => {
    render(<FeaturedProducts category="Top Picks" products={mockProducts} />);
    const productCards = screen.getAllByTestId('product-card');
    expect(productCards).toHaveLength(2);
    expect(screen.getByText('T-shirt')).toBeInTheDocument();
    expect(screen.getByText('Sneakers')).toBeInTheDocument();
  });

  it('renders the "View All" button', () => {
    render(<FeaturedProducts category="Top Picks" products={mockProducts} />);
    expect(screen.getByRole('button', { name: /View All/i })).toBeInTheDocument();
  });
});
