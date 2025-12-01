import { render, screen, fireEvent } from '@testing-library/react';
import SliderButton from './SliderButton';
import { SVGProps } from 'react';

jest.mock('@heroicons/react/16/solid', () => ({
  ArrowLeftIcon: (props: SVGProps<SVGSVGElement>) => <svg data-testid="left-icon" {...props} />,
  ArrowRightIcon: (props: SVGProps<SVGSVGElement>) => <svg data-testid="right-icon" {...props} />,
}));

describe(SliderButton.name, () => {
  it('renders the left arrow icon when direction is "left"', () => {
    render(<SliderButton direction="left" onClick={() => {}} disabled={false} />);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders the right arrow icon when direction is "right"', () => {
    render(<SliderButton direction="right" onClick={() => {}} disabled={false} />);
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('calls the onClick function when clicked', () => {
    const handleClick = jest.fn();
    render(<SliderButton direction="right" onClick={handleClick} disabled={false} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disables the button when disabled is true', () => {
    render(<SliderButton direction="left" onClick={() => {}} disabled={true} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
