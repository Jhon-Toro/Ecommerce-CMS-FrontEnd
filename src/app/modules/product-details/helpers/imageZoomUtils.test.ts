import { calculateLensPosition, calculateZoomedImageTranslate } from './imageZoomUtils';
import { IMAGE_CONFIG } from '../constants/ImageConfig.constant';

describe('calculateLensPosition', () => {
  const rect = {
    top: 0,
    left: 0,
    width: 400,
    height: 300,
  };

  it('should return centered lens position when mouse is well within bounds', () => {
    const result = calculateLensPosition(200, 150, rect);
    expect(result).toEqual({ x: 200, y: 150 });
  });

  it('should clamp lens position to minimum edges', () => {
    const result = calculateLensPosition(10, 10, rect);
    expect(result).toEqual({
      x: IMAGE_CONFIG.LENS_SIZE / 2,
      y: IMAGE_CONFIG.LENS_SIZE / 2,
    });
  });

  it('should clamp lens position to maximum edges', () => {
    const result = calculateLensPosition(390, 290, rect);
    expect(result).toEqual({
      x: rect.width - IMAGE_CONFIG.LENS_SIZE / 2,
      y: rect.height - IMAGE_CONFIG.LENS_SIZE / 2,
    });
  });
});

describe('calculateZoomedImageTranslate', () => {
  const width = 400;
  const height = 300;

  it('should calculate correct translate values within bounds', () => {
    const lensPosition = { x: 150, y: 100 };
    const result = calculateZoomedImageTranslate(lensPosition, width, height);

    const expectedX = (lensPosition.x - IMAGE_CONFIG.LENS_SIZE / 2) * IMAGE_CONFIG.ZOOM_FACTOR;
    const expectedY = (lensPosition.y - IMAGE_CONFIG.LENS_SIZE / 2) * IMAGE_CONFIG.ZOOM_FACTOR;

    expect(result).toEqual({ x: expectedX, y: expectedY });
  });

  it('should clamp translateX to the maximum value', () => {
    const lensPosition = { x: width, y: height / 2 };
    const result = calculateZoomedImageTranslate(lensPosition, width, height);

    expect(result.x).toBeLessThanOrEqual(width * IMAGE_CONFIG.ZOOM_FACTOR - width);
  });

  it('should clamp translateY to the maximum value', () => {
    const lensPosition = { x: width / 2, y: height };
    const result = calculateZoomedImageTranslate(lensPosition, width, height);

    expect(result.y).toBeLessThanOrEqual(height * IMAGE_CONFIG.ZOOM_FACTOR - height);
  });
});
