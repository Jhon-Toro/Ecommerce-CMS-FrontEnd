import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from './Sidebar';

describe(Sidebar.name, () => {
  const mockToggle = jest.fn();
  const mockMenu = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Contact', href: '/contact' },
  ];

  beforeEach(() => {
    mockToggle.mockClear();
  });

  it('renders the sidebar with menu items when open', () => {
    render(<Sidebar isOpen={true} toggleSidebar={mockToggle} menu={mockMenu} />);
    
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('open');

    mockMenu.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  it('does not have "open" attribute when sidebar is closed', () => {
    render(<Sidebar isOpen={false} toggleSidebar={mockToggle} menu={mockMenu} />);
    
    const dialog = screen.getByRole('dialog', { hidden: true });
    expect(dialog).not.toHaveAttribute('open');
  });

  it('calls toggleSidebar when close icon is clicked', () => {
    render(<Sidebar isOpen={true} toggleSidebar={mockToggle} menu={mockMenu} />);
    
    const closeIcon = screen.getByTestId('sidebar-close');
    fireEvent.click(closeIcon);

    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  it('calls toggleSidebar when a menu item is clicked', () => {
    render(<Sidebar isOpen={true} toggleSidebar={mockToggle} menu={mockMenu} />);
    
    const firstMenuItem = screen.getByText('Home');
    fireEvent.click(firstMenuItem);

    expect(mockToggle).toHaveBeenCalledTimes(1);
  });
});
