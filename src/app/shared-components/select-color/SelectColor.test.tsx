import { render, screen, fireEvent } from '@testing-library/react';
import SelectColor from './SelectColor';
import '@testing-library/jest-dom';

describe(SelectColor.name, () => {
  const mockOnColorChange = jest.fn();

  const mockColors = [
    { name: 'Red', hex: '#ff0000' },
    { name: 'Green', hex: '#00ff00' },
    { name: 'Blue', hex: '#0000ff' },
  ];

  beforeEach(() => {
    mockOnColorChange.mockClear();
  });

  it('renders the title and all color buttons', () => {
    render(
      <SelectColor
        colors={mockColors}
        selectedColor="Green"
        onColorChange={mockOnColorChange}
      />
    );

    expect(screen.getByText('Select Colors')).toBeInTheDocument();
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(mockColors.length);
  });

  it('applies the selected class to the correct color', () => {
    const { container } = render(
      <SelectColor
        colors={mockColors}
        selectedColor="Green"
        onColorChange={mockOnColorChange}
      />
    );

    const selectedButton = container.querySelector(`.${'colors__options_button'}.${'selected'}`);
    expect(selectedButton).toBeInTheDocument();
    expect(selectedButton).toHaveStyle({ backgroundColor: '#00ff00' });
  });

  it('calls onColorChange when a color button is clicked', () => {
    render(
      <SelectColor
        colors={mockColors}
        selectedColor="Red"
        onColorChange={mockOnColorChange}
      />
    );

    const greenButton = screen.getAllByRole('button')[1];
    fireEvent.click(greenButton);

    expect(mockOnColorChange).toHaveBeenCalledWith('Green');
  });
});
