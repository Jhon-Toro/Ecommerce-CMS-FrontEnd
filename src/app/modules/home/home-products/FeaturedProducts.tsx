
import { FC } from 'react';
import type { FeaturedProductsProps } from './interfaces/FeaturedProductsProps.interface';
import ProductCard from '@/app/shared-components/product/ProductCard';
import Button from '@/app/shared-components/button/Button';
import styles from './FeaturedProducts.module.scss';

const FeaturedProducts: FC<FeaturedProductsProps> = ({ products, category }) => {
  return (
    <section className={styles.products}>
      <hr className={styles.products__hr}/>
      <h2 className={styles.products__title}>{category}</h2>
      <div className={styles.products__list}>
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
      <Button type='secondary' text='View All' size='medium' typeAttribute='button'/>
    </section>
  );
};

export default FeaturedProducts;
