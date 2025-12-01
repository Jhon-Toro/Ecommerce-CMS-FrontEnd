import { render, screen, fireEvent } from '@testing-library/react';
import FaqItem from './FaqItem';
import '@testing-library/jest-dom';

describe(FaqItem.name, () => {
  const mockFaq = {
    id: '1',
    question: 'What is the return policy?',
    answer: 'We accept returns within 30 days.',
  };

  it('toggles the answer visibility when the question is clicked', () => {
    render(<FaqItem faq={mockFaq} />);
    const button = screen.getByRole('button', { name: mockFaq.question });

    expect(button).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });
});
