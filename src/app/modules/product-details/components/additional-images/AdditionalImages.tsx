'use client';

import { FC } from 'react';
import { IMAGE_CONFIG } from '../../constants/ImageConfig.constant';
import { AdditionalImagesProps } from '../../interfaces/additional-images/AdditionalImages.interface';
import Thumbnail from '../thumbnail/Thumbnail';
import styles from './AdditionalImages.module.scss';

const AdditionalImages: FC<AdditionalImagesProps> = ({
  currentMainImage,
  mainImage,
  setCurrentMainImage,
  additionalImages,
}) => {
  return (
    <article className={styles.thumbnails} role="tablist" aria-label="Thumbnail images">
      <Thumbnail
        image={mainImage}
        isSelected={currentMainImage === mainImage}
        onSelect={() => setCurrentMainImage(mainImage)}
        alt="Thumbnail of the main image"
        ariaLabel="Select main product image"
        width={IMAGE_CONFIG.THUMBNAIL_MAIN_WIDTH}
        height={IMAGE_CONFIG.THUMBNAIL_MAIN_HEIGHT}
      />
      {additionalImages.map((image, index) => (
        <Thumbnail
          key={`${image}-${index}`}
          image={image}
          isSelected={currentMainImage === image}
          onSelect={() => setCurrentMainImage(image)}
          alt={`Miniature ${index + 1} of the product`}
          ariaLabel={`Select thumbnail ${index + 1} of the product`}
        />
      ))}
    </article>
  );
};

export default AdditionalImages;