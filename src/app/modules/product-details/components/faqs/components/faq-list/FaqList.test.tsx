import { render, screen } from '@testing-library/react';
import FaqList from './FaqList';
import '@testing-library/jest-dom';

jest.mock('../faq-item/FaqItem', () => {
    const MockFaqItem = ({ faq }: { faq: { id: string; question: string; answer: string } }) => (
      <li data-testid="faq-item">{faq.question}</li>
    );
    MockFaqItem.displayName = 'MockFaqItem';
    return MockFaqItem;
});
  
describe(FaqList.name, () => {
  const mockFaqs = [
    {
      id: '1',
      question: 'What is your return policy?',
      answer: 'You can return items within 30 days.',
    },
    {
      id: '2',
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship worldwide.',
    },
  ];

  it('renders a list of FAQ items', () => {
    render(<FaqList faqs={mockFaqs} />);

    const items = screen.getAllByTestId('faq-item');
    expect(items).toHaveLength(mockFaqs.length);

    mockFaqs.forEach((faq) => {
      expect(screen.getByText(faq.question)).toBeInTheDocument();
    });
  });
});
