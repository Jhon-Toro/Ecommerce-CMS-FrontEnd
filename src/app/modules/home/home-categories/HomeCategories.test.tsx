import { render, screen } from '@testing-library/react';
import HomeCategories from './HomeCategories';

jest.mock('../home-category/HomeCategory', () => {
  return function MockHomeCategory() {
    return <div>Mock HomeCategory</div>;
  };
});

describe(HomeCategories.name, () => {
  it('renders the section with correct title', () => {
    render(<HomeCategories />);
    
    expect(screen.getByText(/BROWSE BY DESS STYLE/i)).toBeInTheDocument();
  });

  it('renders the HomeCategory component', () => {
    render(<HomeCategories />);
    
    expect(screen.getByText(/Mock HomeCategory/i)).toBeInTheDocument();
  });
});
