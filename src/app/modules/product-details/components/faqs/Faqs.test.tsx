import { render, screen } from '@testing-library/react';
import { FAQ } from './interfaces/fag/faq.interface';
import Faqs from './Faqs';
import '@testing-library/jest-dom';

jest.mock('./components/faq-list/FaqList', () => {
  const FaqList = ({ faqs }: { faqs: FAQ[] }) => (
    <div>
      <ul>
        {faqs.map((faq) => (
          <li key={faq.id}>{faq.question}</li>
        ))}
      </ul>
    </div>
  );

  FaqList.displayName = 'FaqList';

  return FaqList;
});

describe(Faqs.name, () => {
  it('Renders the FAQ title', () => {
    render(<Faqs faqs={[]} />);

    expect(screen.getByText(/Frequently Asked Questions/i)).toBeInTheDocument();
  });

  it('Renders FaqList when there are FAQs', () => {
    const mockFaqs = [
      { id: '1', question: 'What is your return policy?', answer: 'We accept returns within 30 days.' },
      { id: '2', question: 'Do you offer international shipping?', answer: 'Yes, we do.' },
    ];

    render(<Faqs faqs={mockFaqs} />);

    expect(screen.getByText('What is your return policy?')).toBeInTheDocument();
    expect(screen.getByText('Do you offer international shipping?')).toBeInTheDocument();
  });

  it('Renders no FAQs message when faqs is empty', () => {
    render(<Faqs faqs={[]} />);

    expect(screen.getByText('No FAQs available at this time.')).toBeInTheDocument();
  });
});
