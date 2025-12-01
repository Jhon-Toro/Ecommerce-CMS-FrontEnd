import { render, screen } from '@testing-library/react';
import ZoomedImage from './ZoomedImage';
import '@testing-library/jest-dom';

describe(ZoomedImage.name, () => {
  const props = {
    currentMainImage: 'https://via.placeholder.com/300',
    width: 300,
    height: 200,
    zoomFactor: 2,
    translateX: 100,
    translateY: 50,
  };

  it('renders the image with correct alt and src', () => {
    render(<ZoomedImage {...props} />);
    const image = screen.getByAltText('Enlarged image of the product') as HTMLImageElement;

    expect(image).toBeInTheDocument();
    expect(image.src).toContain(props.currentMainImage);
  });

  it('sets the correct zoomed image dimensions', () => {
    render(<ZoomedImage {...props} />);
    const image = screen.getByAltText('Enlarged image of the product') as HTMLImageElement;

    expect(image.width).toBe(props.width * props.zoomFactor);
    expect(image.height).toBe(props.height * props.zoomFactor);
  });

  it('applies the correct transform style for zoom translation', () => {
    render(<ZoomedImage {...props} />);
    const image = screen.getByAltText('Enlarged image of the product');

    expect(image).toHaveStyle(
      `transform: translate(-${props.translateX}px, -${props.translateY}px)`
    );
  });
});
