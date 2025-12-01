import { render, screen } from '@testing-library/react';
import ProductInfo from './ProductInfo';
import '@testing-library/jest-dom';

jest.mock('@/app/shared-components/rating/Rating', () => {
  const MockRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div data-testid="mock-rating">Rating: {rating}</div>
  );
  return MockRating;
});

jest.mock('@/app/shared-components/button/Button', () => {
  const MockButton: React.FC<{ text: string }> = ({ text }) => (
    <button>{text}</button>
  );
  return MockButton;
});

jest.mock('@/app/modules/product-details/components/quantity-control/QuantityControl', () => {
  const MockQuantityControl: React.FC<{
    quantity: number;
    setQuantity: (q: number) => void;
  }> = ({ quantity }) => <div>Quantity: {quantity}</div>;
  return MockQuantityControl;
});

jest.mock('@/app/shared-components/product-price/ProductPrice', () => {
  const MockProductPrice: React.FC<{
    price: number;
    discountPrice: number;
    discount?: number;
  }> = ({ price, discountPrice }) => (
    <div>{`Price: ${price}, Discounted: ${discountPrice}`}</div>
  );
  return MockProductPrice;
});

jest.mock('@/app/shared-components/select-color/SelectColor', () => {
  const MockColorSelector: React.FC<{
    colors: { name: string; hex: string }[];
    selectedColor: string;
    onColorChange: (color: string) => void;
  }> = ({ selectedColor }) => <div>Selected Color: {selectedColor}</div>;
  return MockColorSelector;
});

jest.mock('@/app/modules/product-details/components/size-selector/SizeSelector', () => {
  const MockSizeSelector: React.FC<{
    sizes: string[];
    selectedSize: string;
    onSizeChange: (size: string) => void;
  }> = ({ selectedSize }) => <div>Selected Size: {selectedSize}</div>;
  return MockSizeSelector;
});

jest.mock('@/app/modules/product-details/components/divider/Divider', () => {
  const MockDivider: React.FC = () => <hr />;
  return MockDivider;
});

const mockProduct = {
  id: '1',
  name: 'Cool T-Shirt',
  rating: 4.5,
  reviewsCount: 100,
  price: 50,
  discountPrice: 40,
  discount: 20,
  description: {
    overview: 'This is a stylish t-shirt.',
    features: ['Soft fabric', 'Durable'],
    origin: 'Spain',
    company: {
      name: 'CoolBrand',
      description: 'Eco-friendly fashion',
    },
    careInstructions: 'Wash at 30°C',
  },
  mainImage: 'image.jpg',
  additionalImages: ['img1.jpg', 'img2.jpg'],
  colors: [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
  ],
  sizes: ['S', 'M', 'L'],
};

describe(ProductInfo.name, () => {
  it('renders product name and description', () => {
    render(<ProductInfo product={mockProduct} />);

    expect(screen.getByText('Cool T-Shirt')).toBeInTheDocument();
    expect(screen.getByText('This is a stylish t-shirt.')).toBeInTheDocument();
  });
});
