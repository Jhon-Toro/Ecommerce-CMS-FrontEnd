import { render, screen, fireEvent } from '@testing-library/react';
import Thumbnail from './Thumbnail';
import '@testing-library/jest-dom';

const mockImage = 'https://via.placeholder.com/150';
const mockAlt = 'Product Thumbnail';
const mockAriaLabel = 'Thumbnail Image';
const mockOnSelect = jest.fn();

describe(Thumbnail.name, () => {
  it('should render the Thumbnail component with correct attributes', () => {

    render(
      <Thumbnail
            image={mockImage}
            alt={mockAlt}
            ariaLabel={mockAriaLabel}
            onSelect={mockOnSelect} isSelected={false}      />
    );

    const button = screen.getByRole('tab');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', mockAriaLabel);

    const image = screen.getByAltText(mockAlt);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockImage);
    expect(image).toHaveAttribute('alt', mockAlt);
  });

  it('should call onSelect when the button is clicked', () => {

    render(
      <Thumbnail
            image={mockImage}
            alt={mockAlt}
            ariaLabel={mockAriaLabel}
            onSelect={mockOnSelect} isSelected={true}
        />
    );

    const button = screen.getByRole('tab');
    fireEvent.click(button);

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
  });

  it('should apply selected class when isSelected is true', () => {
    render(
      <Thumbnail
        image={mockImage}
        alt={mockAlt}
        ariaLabel={mockAriaLabel}
        onSelect={mockOnSelect}
        isSelected={true}
      />
    );

    const button = screen.getByRole('tab');
    expect(button).toHaveClass('selected');
  });

  it('should not apply selected class when isSelected is false', () => {

    render(
      <Thumbnail
        image={mockImage}
        alt={mockAlt}
        ariaLabel={mockAriaLabel}
        onSelect={mockOnSelect}
        isSelected={false}
      />
    );

    const button = screen.getByRole('tab');
    expect(button).not.toHaveClass('selected');
  });
});
