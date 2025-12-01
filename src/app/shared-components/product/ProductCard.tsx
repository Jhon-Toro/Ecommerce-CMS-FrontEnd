import { FC } from 'react';
import type { Product } from './interfaces/Product.interface';
import Image from 'next/image';
import Rating from '../rating/Rating';
import ProductPrice from '../product-price/ProductPrice';
import styles from './ProductCard.module.scss';

const ProductCard: FC<Product> = ({
  id,
  name,
  price,
  discountPrice,
  rating,
  image,
  discount,
}) => {
  return (
    <article key={id} className={styles.product}>
      <Image src={image} alt={name} width={300} height={298} className={styles.product__image}/>
      <section className={styles.product__info}>
        <h3 className={styles.product__name}>{name}</h3>
        <Rating rating={rating} size='medium'/>
        <ProductPrice price={price} discountPrice={discountPrice!} discount={discount}/>
      </section>
    </article>
  );
};

export default ProductCard;
