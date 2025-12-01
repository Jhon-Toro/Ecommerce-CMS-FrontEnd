import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe(Button.name, () => {
  const mockClick = jest.fn();

  it('renders the button with the correct text', () => {
    render(<Button type="primary" text="Click me" onClick={mockClick} size="medium" margin="zero" typeAttribute='submit' />);

    const button = screen.getByRole('submit');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click me');
  });

  it('calls the onClick handler when clicked', () => {
    render(<Button type="primary" text="Click me" onClick={mockClick} size="medium" margin="zero" typeAttribute='submit' />);
    
    const button = screen.getByRole('submit');
    fireEvent.click(button);

    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('applies the correct CSS classes', () => {
    render(
      <Button
        type="secondary"
        text="Styled"
        onClick={() => { } }
        size="large"
        margin="zero"
        className="custom-class"
        typeAttribute='submit'/>
    );

    const button = screen.getByRole('submit');

    expect(button).toHaveClass('button');
    expect(button).toHaveClass('button--secondary');
    expect(button).toHaveClass('button--large');
    expect(button).toHaveClass('button--zero');
    expect(button).toHaveClass('custom-class');
  });
});
