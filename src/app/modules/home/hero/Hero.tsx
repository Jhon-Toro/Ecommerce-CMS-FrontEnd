import Button from '@/app/shared-components/button/Button';
import styles from './Hero.module.scss';
import Image from 'next/image';
import StatsCounter from '../stats-counter/StatsCounter';
import BrandsBanner from '../brand-banner/BrandsBanner';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <Image
        className={styles.hero__image}
        src="https://res.cloudinary.com/dxspvj1rj/image/upload/v1743273819/hero_oqglpz.png"
        alt="Imagen de Cloudinary"
        width={1440}
        height={663}
        priority
      />

      <Image
        className={styles.hero__image_mobile}
        src="https://res.cloudinary.com/dxspvj1rj/image/upload/v1743282458/hero-mobile_pjl4my.svg"
        alt="Imagen de Cloudinary"
        width={390}
        height={448}
        priority
      />
      
      <article className={styles.hero__article}>
        <h1 className={styles.hero__article_title}>FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
        <p  className={styles.hero__article_paragraph}>Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
        <Button type="primary" text="Shop Now" size="medium" typeAttribute='button'/>

        <div className={styles.hero__article_stats}>
          <StatsCounter endValue={200} label="International Brands" />
          <StatsCounter endValue={2000} label="High-Quality Products" />
          <StatsCounter endValue={30000} label="Happy Customers" />
        </div>
      </article>
      <BrandsBanner />
    </section>
  )
}

export default Hero
