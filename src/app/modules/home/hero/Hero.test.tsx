import { render, screen } from '@testing-library/react';
import Hero from './Hero';

jest.mock('@/app/shared-components/button/Button', () => {
  return function MockButton({ text }: { text: string }) {
    return <button>{text}</button>;
  };
});

jest.mock('../stats-counter/StatsCounter', () => {
  return function MockStatsCounter({ endValue, label }: { endValue: number; label: string }) {
    return <div>{`${label}: ${endValue}`}</div>;
  };
});

jest.mock('../brand-banner/BrandsBanner', () => {
  return function MockBrandsBanner() {
    return <div>Mock Brands Banner</div>;
  };
});

describe(Hero.name, () => {
  it('renders the Hero section correctly', () => {
    render(<Hero />);
    
    expect(screen.getByText(/FIND CLOTHES THAT MATCHES YOUR STYLE/i)).toBeInTheDocument();
    expect(screen.getByText(/Browse through our diverse range of meticulously crafted garments/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Shop Now/i })).toBeInTheDocument();
  });

  it('renders StatsCounter with correct values', () => {
    render(<Hero />);
    
    expect(screen.getByText(/International Brands: 200/i)).toBeInTheDocument();
    expect(screen.getByText(/High-Quality Products: 2000/i)).toBeInTheDocument();
    expect(screen.getByText(/Happy Customers: 30000/i)).toBeInTheDocument();
  });

  it('renders BrandsBanner', () => {
    render(<Hero />);
    
    expect(screen.getByText(/Mock Brands Banner/i)).toBeInTheDocument();
  });

  it('calls Button with "Shop Now" text', () => {
    render(<Hero />);
    
    expect(screen.getByRole('button', { name: /Shop Now/i })).toBeInTheDocument();
  });

  it('renders both hero images correctly', () => {
    render(<Hero />);

    const images = screen.getAllByAltText(/Imagen de Cloudinary/i);
    expect(images).toHaveLength(2);
  
    const desktopImage = images[0];
    const mobileImage = images[1];
  
    expect(desktopImage).toHaveAttribute('src', 'https://res.cloudinary.com/dxspvj1rj/image/upload/v1743273819/hero_oqglpz.png');
    expect(mobileImage).toHaveAttribute('src', 'https://res.cloudinary.com/dxspvj1rj/image/upload/v1743282458/hero-mobile_pjl4my.svg');
  });
});
