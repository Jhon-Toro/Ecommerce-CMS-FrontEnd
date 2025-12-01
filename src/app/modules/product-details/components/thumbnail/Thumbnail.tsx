import { FC } from 'react';
import { ThumbnailProps } from '../../interfaces/thumbnail/Thumbnail.interface';
import { IMAGE_CONFIG } from '../../constants/ImageConfig.constant';
import clsx from 'clsx';
import Image from 'next/image';
import styles from './Thumbnail.module.scss';

const Thumbnail: FC<ThumbnailProps> = ({
  image,
  isSelected,
  onSelect,
  alt,
  ariaLabel,
  width = IMAGE_CONFIG.THUMBNAIL_WIDTH,
  height = IMAGE_CONFIG.THUMBNAIL_HEIGHT,
}) => (
  <button
    className={clsx(styles.thumbnail, { [styles.selected]: isSelected })}
    onClick={onSelect}
    role="tab"
    aria-selected={isSelected}
    aria-label={ariaLabel}
  >
    <Image
      src={image}
      alt={alt}
      width={width}
      height={height}
      className={styles.thumbnail__image}
    />
  </button>
);

export default Thumbnail;