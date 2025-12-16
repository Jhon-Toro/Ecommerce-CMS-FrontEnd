'use client';

import { FC, useState } from 'react';
import type { FeaturedProductsProps } from './interfaces/FeaturedProductsProps.interface';
import ProductCard from '@/app/shared-components/product/ProductCard';
import Button from '@/app/shared-components/button/Button';
import styles from './FeaturedProducts.module.scss';

const INITIAL_VISIBLE_PRODUCTS = 4;

const FeaturedProducts: FC<FeaturedProductsProps> = ({ products, category }) => {
  const [showAll, setShowAll] = useState(false);

  const visibleProducts = showAll
    ? products
    : products.slice(0, INITIAL_VISIBLE_PRODUCTS);

  const hasMoreProducts = products.length > INITIAL_VISIBLE_PRODUCTS;
  
  return (
    <section className={styles.products}>
      <hr className={styles.products__hr}/>
      <h2 className={styles.products__title}>{category}</h2>
      <div className={styles.products__list}>
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
      {!showAll && hasMoreProducts && (
        <Button
          type="secondary"
          text="View All"
          size="medium"
          typeAttribute="button"
          onClick={() => setShowAll(true)}
        />
      )}
    </section>
  );
};

export default FeaturedProducts;
