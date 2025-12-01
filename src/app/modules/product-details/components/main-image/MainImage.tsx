'use client';

import { useState, useRef, useEffect, useCallback, FC } from 'react';
import { IMAGE_CONFIG } from '../../constants/ImageConfig.constant';
import { MainImageProps } from '../../interfaces/main-image/MainImage.interface';
import { calculateLensPosition, calculateZoomedImageTranslate } from '../../helpers/imageZoomUtils';
import Image from 'next/image';
import ZoomLens from '../zoom-lens/ZoomLens';
import ZoomedImage from '../zoomed-images/ZoomedImage';
import styles from './MainImage.module.scss';

const MainImage: FC<MainImageProps> = ({ currentMainImage, isMobile }) => {
  const [isZooming, setIsZooming] = useState(false);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const imageWidth = isMobile ? IMAGE_CONFIG.ZOOMED_IMAGE_WIDTH_MOBILE : IMAGE_CONFIG.ZOOMED_IMAGE_WIDTH;
  const imageHeight = isMobile ? IMAGE_CONFIG.ZOOMED_IMAGE_HEIGHT_MOBILE : IMAGE_CONFIG.ZOOMED_IMAGE_HEIGHT;

  const updateLensPosition = useCallback((x: number, y: number) => {
    setLensPosition({ x, y });
  }, []);

  const handleMouseMove = (MouseEvent: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || isMobile) return;

    const rect = imageRef.current.getBoundingClientRect();
    const newPosition = calculateLensPosition(MouseEvent.clientX, MouseEvent.clientY, rect);
    setLensPosition(newPosition);
    setIsZooming(true);
  };

  const handleTouchStart = (TouchEvent: React.TouchEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const touch = TouchEvent.touches[0];
    const rect = imageRef.current.getBoundingClientRect();
    const newPosition = calculateLensPosition(touch.clientX, touch.clientY, rect);
    setLensPosition(newPosition);
    setIsZooming(true);
  };

  const handleTouchMove = useCallback(
    (TouchEvent: TouchEvent) => {
      if (!imageRef.current) return;

      TouchEvent.preventDefault();

      const touch = TouchEvent.touches[0];
      const rect = imageRef.current.getBoundingClientRect();
      const newPosition = calculateLensPosition(touch.clientX, touch.clientY, rect);

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        updateLensPosition(newPosition.x, newPosition.y);
        setIsZooming(true);
      });
    },
    [updateLensPosition]
  );

  const handleTouchEnd = () => {
    setIsZooming(false);
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    setIsZooming(false);
  };

  useEffect(() => {
    const element = imageRef.current;
    if (!element) return;

    element.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      element.removeEventListener('touchmove', handleTouchMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [handleTouchMove]);

  const zoomedTranslate = calculateZoomedImageTranslate(lensPosition, imageWidth, imageHeight);

  return (
    <article
      className={styles.main}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      ref={imageRef}
      role="region"
      aria-label="Main product image with zoom"
    >
      <Image
        src={currentMainImage}
        alt="Main product image"
        width={imageWidth}
        height={imageHeight}
        className={styles.main__image}
        priority
      />
      {isZooming && <ZoomLens lensPosition={lensPosition} />}
      {isZooming && (
        <ZoomedImage
          currentMainImage={currentMainImage}
          width={imageWidth}
          height={imageHeight}
          zoomFactor={IMAGE_CONFIG.ZOOM_FACTOR}
          translateX={zoomedTranslate.x}
          translateY={zoomedTranslate.y}
        />
      )}
    </article>
  );
};

export default MainImage;