'use client'

import { FC, useState } from 'react';
import { ProductInfoProps } from '../../interfaces/product-info-props/ProductInfoProps.interface';
import Rating from '@/app/shared-components/rating/Rating';
import Button from '@/app/shared-components/button/Button';
import QuantityControl from '../quantity-control/QuantityControl';
import ProductPrice from '@/app/shared-components/product-price/ProductPrice';
import ColorSelector from '@/app/shared-components/select-color/SelectColor';
import SizeSelector from '@/app/modules/product-details/components/size-selector/SizeSelector';
import Divider from '../divider/Divider';
import styles from './ProductInfo.module.scss';

const ProductInfo: FC<ProductInfoProps> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <article className={styles.product}>
      <h2 className={styles.product__title}>{product.name}</h2>
      <Rating rating={product.rating} size="extra-medium" />
      <ProductPrice price={product.price} discountPrice={product.discountPrice} discount={product.discount} />
      <p className={styles.product__description}>{product.description.overview}</p>

      <Divider/>
      <ColorSelector
        colors={product.colors}
        selectedColor={selectedColor}
        onColorChange={setSelectedColor}
      />

      <Divider/>
      <SizeSelector
        sizes={product.sizes}
        selectedSize={selectedSize}
        onSizeChange={setSelectedSize}
      />

      <Divider/>
      <section className={styles.product__addToCart}>
        <QuantityControl
          quantity={quantity}
          setQuantity={setQuantity}
        />
        <Button type='primary' text='Add to Cart' size='extra-large' typeAttribute='button' />
      </section>
    </article>
  );
};

export default ProductInfo;