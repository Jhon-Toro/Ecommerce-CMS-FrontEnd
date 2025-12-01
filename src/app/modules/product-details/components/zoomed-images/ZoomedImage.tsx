import { FC } from 'react';
import { ZoomedImageProps } from '../../interfaces/zoomed-image/ZoomedImage.interface';
import Image from 'next/image';
import styles from './ZoomedImage.module.scss';

const ZoomedImage: FC<ZoomedImageProps> = ({
  currentMainImage,
  width,
  height,
  zoomFactor,
  translateX,
  translateY,
}) => {
  return (
    <article className={styles.zoomed}>
      <Image
        src={currentMainImage}
        alt="Enlarged image of the product"
        width={width * zoomFactor}
        height={height * zoomFactor}
        className={styles.zoomed__image}
        style={{
          transform: `translate(-${translateX}px, -${translateY}px)`,
        }}
      />
    </article>
  );
};

export default ZoomedImage;