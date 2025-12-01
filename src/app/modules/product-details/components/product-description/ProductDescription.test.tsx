import { render, screen } from '@testing-library/react';
import ProductDescription from './ProductDescription';
import '@testing-library/jest-dom';

const mockDescription = {
  overview: 'This is a great product.',
  features: ['Feature one', 'Feature two', 'Feature three'],
  origin: 'Made in Spain',
  company: {
    name: 'Awesome Inc.',
    description: 'We make awesome products.',
  },
  careInstructions: 'Keep away from fire. Hand wash only.',
};

describe(ProductDescription.name, () => {
  beforeEach(() => {
    render(<ProductDescription description={mockDescription} />);
  });

  it('renders the title', () => {
    expect(screen.getByRole('heading', { name: 'Product Description' })).toBeInTheDocument();
  });

  it('renders the overview section', () => {
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText(mockDescription.overview)).toBeInTheDocument();
  });

  it('renders the key features list', () => {
    expect(screen.getByText('Key Features')).toBeInTheDocument();
    mockDescription.features.forEach((feature) => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  it('renders the origin section', () => {
    expect(screen.getByText('Origin')).toBeInTheDocument();
    expect(screen.getByText(mockDescription.origin)).toBeInTheDocument();
  });

  it('renders the company section', () => {
    expect(screen.getByText('About the Company')).toBeInTheDocument();
    expect(screen.getByText(mockDescription.company.name)).toBeInTheDocument();
    expect(screen.getByText(mockDescription.company.description)).toBeInTheDocument();
  });

  it('renders the care instructions', () => {
    expect(screen.getByText('Care Instructions')).toBeInTheDocument();
    expect(screen.getByText(mockDescription.careInstructions)).toBeInTheDocument();
  });
});
