import { render, screen } from '@testing-library/react';
import Rating from './Rating';
import '@testing-library/jest-dom';

describe(Rating.name, () => {
  it('renders full, half, and empty stars correctly based on rating', () => {
    const { container } = render(<Rating rating={3.5} size="medium" numbers={false} />);

    expect(container.querySelectorAll(`.${'star'}.${'full'}`).length).toBe(3);
    expect(container.querySelectorAll(`.${'star'}.${'half'}`).length).toBe(1);
    expect(container.querySelectorAll(`.${'star'}.${'empty'}`).length).toBe(1);
  });

  it('does not render a half star if rating is an integer', () => {
    const { container } = render(<Rating rating={4} size="medium" numbers={false} />);

    expect(container.querySelectorAll(`.${'star'}.${'half'}`).length).toBe(0);
  });


  it('does not display the rating number when "numbers" prop is false', () => {
    render(<Rating rating={4.2} size="medium" numbers={false} />);
    
    expect(screen.queryByText('4.2/5')).not.toBeInTheDocument();
  });

  it('applies the correct CSS classes based on the "size" prop', () => {
    const { container } = render(<Rating rating={4} size="medium" numbers={false} />);

    expect(container.querySelector(`.${'rating'}.${'medium'}`)).toBeInTheDocument();
  });
});
