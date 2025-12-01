import { render, screen } from '@testing-library/react';
import Divider from './Divider';

describe(Divider.name, () => {
  it('renders an <hr> element with the correct class', () => {
    render(<Divider />);
    
    const hrElement = screen.getByRole('separator');
    expect(hrElement).toBeInTheDocument();
    expect(hrElement.tagName).toBe('HR');
    expect(hrElement).toHaveClass('hr');
  });
});
