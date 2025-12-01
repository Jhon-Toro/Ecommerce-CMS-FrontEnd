import { render, screen, fireEvent, act } from '@testing-library/react';
import HappyCustomers from './HappyCustomers';

jest.mock('../happy-card/HappyCard', () => {
  return function MockHappyCard({ name, rating, text }: { name: string; rating: number; text: string }) {
    return (
      <div data-testid="mock-happy-card">
        <p>{name}</p>
        <p>{rating}</p>
        <p>{text}</p>
      </div>
    );
  };
});

jest.mock('../silider-button/SliderButton', () => {
  return function MockSliderButton({ direction, onClick, disabled }: { direction: string; onClick: () => void; disabled: boolean }) {
    return (
      <button
        data-testid={`slider-button-${direction}`}
        onClick={onClick}
        disabled={disabled}
      >
        {direction}
      </button>
    );
  };
});

describe(HappyCustomers.name, () => {
  it('renders title and all reviews', () => {
    render(<HappyCustomers />);
    
    expect(screen.getByText(/OUR HAPPY CUSTOMERS/i)).toBeInTheDocument();
    expect(screen.getAllByTestId('mock-happy-card')).toHaveLength(4);
  });

  it('disables slider buttons if total reviews <= itemsPerSlide', () => {
    global.innerWidth = 1600;
    render(<HappyCustomers />);

    const leftButton = screen.getByTestId('slider-button-left') as HTMLButtonElement;
    const rightButton = screen.getByTestId('slider-button-right') as HTMLButtonElement;

    expect(leftButton.disabled).toBe(false);
    expect(rightButton.disabled).toBe(false);
  });

  it('navigates to next and previous slides', async () => {
    global.innerWidth = 1024;
    render(<HappyCustomers />);

    const leftButton = screen.getByTestId('slider-button-left');
    const rightButton = screen.getByTestId('slider-button-right');

    expect(screen.getAllByTestId('mock-happy-card')[0]).toBeInTheDocument();

    fireEvent.click(rightButton);

    await act(async () => {
      expect(screen.getAllByTestId('mock-happy-card')[1]).toBeInTheDocument();
    });

    fireEvent.click(leftButton);

    await act(async () => {
      expect(screen.getAllByTestId('mock-happy-card')[0]).toBeInTheDocument();
    });
  });

});
