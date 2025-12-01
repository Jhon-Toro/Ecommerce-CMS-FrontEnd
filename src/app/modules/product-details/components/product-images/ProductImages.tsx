'use client';

import { useState, useEffect, FC } from 'react';
import { ProductImagesProps } from '../../interfaces/product-images/ProductImages.interface';
import { IMAGE_CONFIG } from '../../constants/ImageConfig.constant';
import AdditionalImages from '../additional-images/AdditionalImages';
import MainImage from '../main-image/MainImage';
import styles from './ProductImages.module.scss';

const ProductImages: FC<ProductImagesProps> = ({ mainImage, additionalImages }) => {
  const [currentMainImage, setCurrentMainImage] = useState(mainImage);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleResize = () => setIsMobile(window.innerWidth <= IMAGE_CONFIG.IS_MOBILE);
  
  return (
    <section className={styles.product__images} aria-label="Product images">
      <MainImage
        currentMainImage={currentMainImage}
        isMobile={isMobile}
        width={isMobile ? 340 : 444}
        height={isMobile ? 300 : 530}
      />
      <AdditionalImages
        currentMainImage={currentMainImage}
        mainImage={mainImage}
        setCurrentMainImage={setCurrentMainImage}
        additionalImages={additionalImages}
      />
    </section>
  );
};

export default ProductImages;