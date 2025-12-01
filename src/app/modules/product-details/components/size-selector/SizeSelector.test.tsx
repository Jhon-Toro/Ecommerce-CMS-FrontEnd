import { render, screen, fireEvent } from '@testing-library/react';
import SizeSelector from './SizeSelector';
import '@testing-library/jest-dom';

const mockSizes = ['S', 'M', 'L', 'XL'];
const mockOnSizeChange = jest.fn();

describe(SizeSelector.name, () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders SizeSelector with sizes and selected size', () => {
    render(
      <SizeSelector
        sizes={mockSizes}
        selectedSize="M"
        onSizeChange={mockOnSizeChange}
      />
    );

    expect(screen.getByText('Choose Size')).toBeInTheDocument();

    mockSizes.forEach((size) => {
      expect(screen.getByText(size)).toBeInTheDocument();
    });

    const selectedButton = screen.getByText('M');
    expect(selectedButton.parentElement).toHaveClass('selected');
  });

  test('calls onSizeChange when a size is clicked', () => {
    render(
      <SizeSelector
        sizes={mockSizes}
        selectedSize="S"
        onSizeChange={mockOnSizeChange}
      />
    );

    const sizeButton = screen.getByText('L');
    fireEvent.click(sizeButton);

    expect(mockOnSizeChange).toHaveBeenCalledTimes(1);
    expect(mockOnSizeChange).toHaveBeenCalledWith('L');
  });

  test('does not apply selected class to unselected sizes', () => {
    render(
      <SizeSelector
        sizes={mockSizes}
        selectedSize={mockSizes[1]}
        onSizeChange={mockOnSizeChange}
      />
    );

    const unselectedButton = screen.getByText('S');
    expect(unselectedButton).not.toHaveClass('selected');
  });

  test('renders correctly with no selected size', () => {
    render(
      <SizeSelector
        sizes={mockSizes}
        selectedSize=''
        onSizeChange={mockOnSizeChange}
      />
    );

    mockSizes.forEach((size) => {
      const sizeButton = screen.getByText(size);
      expect(sizeButton).not.toHaveClass('selected');
    });
  });
});