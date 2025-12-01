import { IMAGE_CONFIG } from '../constants/ImageConfig.constant';
import { Position } from '../interfaces/position/Position.interface';
import { Rect } from '../interfaces/rect/Rect.interface';

export const calculateLensPosition = (
  clientX: number,
  clientY: number,
  rect: Rect
): Position => {
  const x = clientX - rect.left;
  const y = clientY - rect.top;

  const lensX = Math.max(
    IMAGE_CONFIG.LENS_SIZE / 2,
    Math.min(rect.width - IMAGE_CONFIG.LENS_SIZE / 2, x)
  );
  const lensY = Math.max(
    IMAGE_CONFIG.LENS_SIZE / 2,
    Math.min(rect.height - IMAGE_CONFIG.LENS_SIZE / 2, y)
  );

  return { x: lensX, y: lensY };
};

export const calculateZoomedImageTranslate = (
  lensPosition: Position,
  width: number,
  height: number
): Position => {
  const translateX = Math.min(
    Math.max(0, (lensPosition.x - IMAGE_CONFIG.LENS_SIZE / 2) * IMAGE_CONFIG.ZOOM_FACTOR),
    width * IMAGE_CONFIG.ZOOM_FACTOR - width
  );
  const translateY = Math.min(
    Math.max(0, (lensPosition.y - IMAGE_CONFIG.LENS_SIZE / 2) * IMAGE_CONFIG.ZOOM_FACTOR),
    height * IMAGE_CONFIG.ZOOM_FACTOR - height
  );

  return { x: translateX, y: translateY };
};