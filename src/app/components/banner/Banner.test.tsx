import { render, screen } from '@testing-library/react';
import Banner from './Banner';
import '@testing-library/jest-dom';

describe(Banner.name, () => {
  it('Renders correctly with the message and link', () => {
    render(<Banner />);

    expect(
      screen.getByText(/Sign up and get 20% off to your first order/i)
    ).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /Sign Up Now/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');

    const icon = screen.getByRole('img', { name: /close icon/i });
    expect(icon).toBeInTheDocument();
  });
});
