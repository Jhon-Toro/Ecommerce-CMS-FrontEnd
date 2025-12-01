import { render, screen } from '@testing-library/react';
import { Review } from '../../interfaces/review-card/ReviewCard.interface';
import ReviewCard from './ReviewCard';
import { RatingProps } from '@/app/shared-components/rating/interfaces/Rating.interface';

jest.mock('@/app/shared-components/rating/Rating', () => ({
  __esModule: true,
  default: ({ rating }: RatingProps) => <div data-testid="rating">Rating: {rating}</div>,
}));

const review: Review = {
  id: '1',
  author: 'Jane Doe',
  rating: 4,
  text: 'Very nice product!',
  date: '2024-04-10',
  verified: true,
};

describe('ReviewCard', () => {
  it('renders review data correctly', () => {
    render(<ReviewCard review={review} />);

    expect(screen.getByTestId('rating')).toHaveTextContent('Rating: 4');
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText(/"Very nice product!"/)).toBeInTheDocument();
    expect(screen.getByText(/Posted on 2024-04-10/)).toBeInTheDocument();
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('does not show CheckCircleIcon if not verified', () => {
    const unverifiedReview = { ...review, verified: false };
    render(<ReviewCard review={unverifiedReview} />);

    expect(document.querySelector('svg')).not.toBeInTheDocument();
  });
});
