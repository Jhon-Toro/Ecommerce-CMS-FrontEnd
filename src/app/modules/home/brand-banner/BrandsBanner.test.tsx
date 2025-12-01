import { render, screen } from '@testing-library/react';
import BrandsBanner from './BrandsBanner';

describe(BrandsBanner.name, () => {
  it('renders without crashing', () => {
    render(<BrandsBanner />);
    const banner = screen.getByRole('img', { name: /brand 0/i });
    expect(banner).toBeInTheDocument();
  });

  it('renders exactly 5 brand images', () => {
    render(<BrandsBanner />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(5);
  });

  it('each image has correct src and alt attributes', () => {
    render(<BrandsBanner />);
    const images = screen.getAllByRole('img');

    images.forEach((img, index) => {
      expect(img).toHaveAttribute('alt', `Brand ${index}`);
      expect(img).toHaveAttribute('src');
    });
  });
});
