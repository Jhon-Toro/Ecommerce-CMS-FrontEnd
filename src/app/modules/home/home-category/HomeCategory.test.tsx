import { render, screen } from '@testing-library/react';
import HomeCategory from './HomeCategory';

jest.mock('../../../../assets/home-category.json', () => [
  {
    title: 'Category 1',
    image: 'https://example.com/category1.jpg',
    link: '/category-1',
    twoColumn: false,
  },
  {
    title: 'Category 2',
    image: 'https://example.com/category2.jpg',
    link: '/category-2',
    twoColumn: true,
  },
]);


describe(HomeCategory.name, () => {
  it('renders category cards correctly', () => {
    render(<HomeCategory />);
    
    expect(screen.getByText('Category 1')).toBeInTheDocument();
    expect(screen.getByText('Category 2')).toBeInTheDocument();

    const images = screen.getAllByAltText(/Clothes/);
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', 'https://example.com/category1.jpg');
    expect(images[1]).toHaveAttribute('src', 'https://example.com/category2.jpg');

    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/category-1');
    expect(links[1]).toHaveAttribute('href', '/category-2');
  });

  it('applies correct classes for two-column categories', () => {
    render(<HomeCategory />);
   
    const secondCategory = screen.getAllByRole('link')[1].closest('div');
    expect(secondCategory).toHaveClass('category__card_twoColumn');
  });
});
