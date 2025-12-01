import { render, screen, act } from '@testing-library/react';
import StatsCounter from './StatsCounter';
import '@testing-library/jest-dom';

jest.useFakeTimers();

describe(StatsCounter.name, () => {
  it('Render the label correctly', () => {
    render(<StatsCounter endValue={1000} label="Active users" />);
    expect(screen.getByText('Active users')).toBeInTheDocument();
  });

  it('Renders multiple counters independently', () => {
    render(
      <>
        <StatsCounter endValue={200} label="International Brands" duration={1000} />
        <StatsCounter endValue={2000} label="High-Quality Products" duration={1000} />
        <StatsCounter endValue={30000} label="Happy Customers" duration={1000} />
      </>
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const headings = screen.getAllByRole('heading', { level: 3 });

    expect(headings[0]).toHaveTextContent('200+');
    expect(headings[1]).toHaveTextContent('2,000+');
    expect(headings[2]).toHaveTextContent('30,000+');

    expect(screen.getByText('International Brands')).toBeInTheDocument();
    expect(screen.getByText('High-Quality Products')).toBeInTheDocument();
    expect(screen.getByText('Happy Customers')).toBeInTheDocument();
  });
});
