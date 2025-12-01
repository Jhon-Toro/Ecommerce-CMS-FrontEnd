import { render, screen, fireEvent } from '@testing-library/react';
import AdditionalImages from './AdditionalImages';
import '@testing-library/jest-dom';
import Image from 'next/image';

jest.mock('../thumbnail/Thumbnail', () => {
    const Thumbnail: React.FC<{
      image: string;
      isSelected: boolean;
      onSelect: () => void;
      alt: string;
      ariaLabel: string;
    }> = ({ image, isSelected, onSelect, alt }) => (
      <div
        role="tab"
        aria-selected={isSelected}
        onClick={onSelect}
        data-testid={`thumbnail-${alt}`}
      >
        <Image src={image} alt={alt} />
      </div>
    );
  
    Thumbnail.displayName = 'Thumbnail';
  
    return Thumbnail;
  });

describe('AdditionalImages', () => {
  const mockSetCurrentMainImage = jest.fn();
  const mockMainImage = 'mockMainImage.jpg';
  const mockAdditionalImages = ['image1.jpg', 'image2.jpg'];

  beforeEach(() => {
    render(
      <AdditionalImages
        currentMainImage={mockMainImage}
        mainImage={mockMainImage}
        setCurrentMainImage={mockSetCurrentMainImage}
        additionalImages={mockAdditionalImages}
      />
    );
  });

  it('renders main image and additional images as thumbnails', () => {
    expect(screen.getByTestId('thumbnail-Thumbnail of the main image')).toBeInTheDocument();
    
    mockAdditionalImages.forEach((image, index) => {
      expect(screen.getByTestId(`thumbnail-Miniature ${index + 1} of the product`)).toBeInTheDocument();
    });
  });

  it('marks the current main image thumbnail as selected', () => {
    expect(screen.getByTestId('thumbnail-Thumbnail of the main image')).toHaveAttribute('aria-selected', 'true');
    
    mockAdditionalImages.forEach((image, index) => {
      expect(screen.getByTestId(`thumbnail-Miniature ${index + 1} of the product`)).toHaveAttribute('aria-selected', 'false');
    });
  });

  it('calls setCurrentMainImage when a thumbnail is clicked', () => {
    fireEvent.click(screen.getByTestId('thumbnail-Miniature 1 of the product'));
    expect(mockSetCurrentMainImage).toHaveBeenCalledWith(mockAdditionalImages[0]);
  });
});
