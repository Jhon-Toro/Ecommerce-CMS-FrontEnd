import { render, screen } from '@testing-library/react';
import HappyCard from './HappyCard';
import { FC, SVGProps } from 'react';

jest.mock('@/app/shared-components/rating/Rating', () => {
  const MockRating: FC<{ rating: number }> = ({ rating }) => (
    <div data-testid="mock-rating">{`Rating: ${rating}`}</div>
  );
  MockRating.displayName = 'MockRating';
  return MockRating;
});

jest.mock('@heroicons/react/24/solid', () => {
  const CheckCircleIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg data-testid="check-icon" {...props} />
  );
  CheckCircleIcon.displayName = 'CheckCircleIcon';
  return { CheckCircleIcon };
});

describe(HappyCard.name, () => {
  const mockProps = {
    name: 'Carlos',
    rating: 4.5,
    text: '¡Muy buena experiencia!',
  };

  it('renders without crashing', () => {
    render(<HappyCard {...mockProps} />);
    expect(screen.getByText(/Carlos/)).toBeInTheDocument();
    expect(screen.getByText(/¡Muy buena experiencia!/)).toBeInTheDocument();
  });

  it('renders the rating with correct value', () => {
    render(<HappyCard {...mockProps} />);
    expect(screen.getByTestId('mock-rating')).toHaveTextContent('Rating: 4.5');
  });

  it('renders the CheckCircleIcon', () => {
    render(<HappyCard {...mockProps} />);
    expect(screen.getByTestId('check-icon')).toBeInTheDocument();
  });

  it('wraps the text in quotes', () => {
    render(<HappyCard {...mockProps} />);
    expect(screen.getByText(/"¡Muy buena experiencia!"/)).toBeInTheDocument();
  });
});
