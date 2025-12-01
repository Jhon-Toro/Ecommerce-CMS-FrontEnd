import Image from 'next/image';
import styles from './BrandsBanner.module.scss';

const brandImages: string[] = [
  'https://res.cloudinary.com/dxspvj1rj/image/upload/v1743280453/versacce_xucuwa.svg',
  'https://res.cloudinary.com/dxspvj1rj/image/upload/v1743280453/zara_t2sniu.svg',
  'https://res.cloudinary.com/dxspvj1rj/image/upload/v1743280454/gucci_fmosjl.svg',
  'https://res.cloudinary.com/dxspvj1rj/image/upload/v1743280454/calvin_ghh0te.svg',
  'https://res.cloudinary.com/dxspvj1rj/image/upload/v1743280454/prada_haqr5t.svg',
];

const BrandsBanner = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.banner__container}>
        {brandImages.map((image, index) => (
          <div key={index} className={styles.banner__container_brand}>
            <Image
              src={image}
              alt={`Brand ${index}`}
              className={styles.banner__container_image}
              width={166}
              height={33}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandsBanner;
