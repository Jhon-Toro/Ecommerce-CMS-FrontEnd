import { render, screen, fireEvent } from '@testing-library/react';
import QuantityControl from './QuantityControl';
import '@testing-library/jest-dom';

describe(QuantityControl.name, () => {
  it('renders with the initial quantity', () => {
    const setQuantity = jest.fn();
    render(<QuantityControl quantity={2} setQuantity={setQuantity} />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('increments the quantity when "+" button is clicked', () => {
    const setQuantity = jest.fn();
    render(<QuantityControl quantity={2} setQuantity={setQuantity} />);
    const incrementButton = screen.getByText('+');
    fireEvent.click(incrementButton);
    expect(setQuantity).toHaveBeenCalledWith(3);
  });

  it('decrements the quantity when "−" button is clicked', () => {
    const setQuantity = jest.fn();
    render(<QuantityControl quantity={2} setQuantity={setQuantity} />);
    const decrementButton = screen.getByText('−');
    fireEvent.click(decrementButton);
    expect(setQuantity).toHaveBeenCalledWith(1);
  });

  it('does not decrement below 1', () => {
    const setQuantity = jest.fn();
    render(<QuantityControl quantity={1} setQuantity={setQuantity} />);
    const decrementButton = screen.getByText('−');
    fireEvent.click(decrementButton);
    expect(setQuantity).toHaveBeenCalledWith(1);
  });
});
