import { render, screen, fireEvent } from '@testing-library/react';
import { Review, ReviewCardProps } from '../../interfaces/review-card/ReviewCard.interface';
import Reviews from './Reviews';

jest.mock('../review-card/ReviewCard', () => ({
  __esModule: true,
  default: ({ review }: ReviewCardProps) => (
    <div data-testid="review-card">{review.text}</div>
  ),
}));

const mockReview: Review[] = [
  { id: '1', author: 'Alice', rating: 5, text: 'Great!', date: '2024-05-01', verified: true },
  { id: '2', author: 'Bob', rating: 4, text: 'Good!', date: '2024-04-01', verified: false },
  { id: '3', author: 'Charlie', rating: 3, text: 'Average!', date: '2024-03-01', verified: true },
  { id: '4', author: 'Diana', rating: 5, text: 'Excellent!', date: '2024-02-01', verified: true },
  { id: '5', author: 'Eve', rating: 2, text: 'Not great.', date: '2024-01-01', verified: false },
  { id: '6', author: 'Frank', rating: 1, text: 'Bad.', date: '2023-12-01', verified: true },
  { id: '7', author: 'George', rating: 3, text: 'Okay.', date: '2023-11-01', verified: false },
];

describe(Reviews.name, () => {
  it('renders up to 6 reviews initially', () => {
    render(<Reviews review={mockReview} />);
    expect(screen.getAllByTestId('review-card').length).toBe(6);
  });

  it('shows total number of reviews in header', () => {
    render(<Reviews review={mockReview} />);
    expect(screen.getByText(/All Reviews/i)).toHaveTextContent('(7)');
  });

  it('displays "Load More Reviews" button if more than 6 reviews', () => {
    render(<Reviews review={mockReview} />);
    expect(screen.getByText('Load More Reviews')).toBeInTheDocument();
  });

  it('loads more reviews when "Load More Reviews" is clicked', () => {
    render(<Reviews review={mockReview} />);
    fireEvent.click(screen.getByText('Load More Reviews'));
    expect(screen.getAllByTestId('review-card').length).toBe(7);
  });

  it('sorts reviews by "Latest" by default', () => {
    render(<Reviews review={mockReview} />);
    const first = screen.getAllByTestId('review-card')[0];
    expect(first).toHaveTextContent('Great!');
  });

  it('sorts reviews by "Oldest" when selected', () => {
    render(<Reviews review={mockReview} />);
    fireEvent.change(screen.getByLabelText('Sort reviews'), {
      target: { value: 'Oldest' },
    });
    const first = screen.getAllByTestId('review-card')[0];
    expect(first).toHaveTextContent('Okay.');
  });
});
