'use client';

import { FC, useState } from 'react';
import { ThumbnailProps } from '../../interfaces/thumbnail/Thumbnail.interface';
import { IMAGE_CONFIG } from '../../constants/ImageConfig.constant';
import clsx from 'clsx';
import Image from 'next/image';
import styles from './Thumbnail.module.scss';
import Skeleton from '@/app/components/skeleton/Skeleton';

const Thumbnail: FC<ThumbnailProps> = ({
  image,
  isSelected,
  onSelect,
  alt,
  ariaLabel,
  width = IMAGE_CONFIG.THUMBNAIL_WIDTH,
  height = IMAGE_CONFIG.THUMBNAIL_HEIGHT,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <button
      className={clsx(styles.thumbnail, {
        [styles.selected]: isSelected,
        [styles.loading]: !imageLoaded,
      })}
      onClick={onSelect}
      role="tab"
      aria-selected={isSelected}
      aria-label={ariaLabel}
      disabled={!imageLoaded}
    >
      {!imageLoaded && <Skeleton />}

      <Image
        src={image}
        alt={alt}
        width={width}
        height={height}
        className={styles.thumbnail__image}
        onLoad={() => setImageLoaded(true)}
      />
    </button>
  );
};

export default Thumbnail;
