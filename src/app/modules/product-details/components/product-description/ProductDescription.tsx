'use client';

import { FC } from 'react';
import { ProductDescriptionProps } from '../faqs/interfaces/product-description-props/ProductDescriptionProps.interface';
import clsx from 'clsx';
import styles from './ProductDescription.module.scss';

const ProductDescription: FC<ProductDescriptionProps> = ({ description }) => {
  return (
    <div className={styles.details}>
      <h2 className={styles.details__title}>Product Description</h2>

      <section className={styles.details__section}>
        <h3 className={styles.details__section__subtitle}>Overview</h3>
        <p className={styles.details__section__text}>{description.overview}</p>
      </section>

      <section className={styles.details__section}>
        <h3 className={styles.details__section__subtitle}>Key Features</h3>
        <ul className={styles.details__section__featureList}>
          {description.features.map((feature, index) => (
            <li
              key={index}
              className={styles.details__section__featureList__featureItem}
            >
              {feature}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.details__section}>
        <h3 className={styles.details__section__subtitle}>Origin</h3>
        <p className={styles.details__section__text}>{description.origin}</p>
      </section>

      <section className={styles.details__section}>
        <h3 className={styles.details__section__subtitle}>About the Company</h3>
        <p
          className={clsx(
            styles.details__section__text,
            styles['details__section__text--companyName']
          )}
        >
          {description.company.name}
        </p>
        <p className={styles.details__section__text}>
          {description.company.description}
        </p>
      </section>

      <section className={styles.details__section}>
        <h3 className={styles.details__section__subtitle}>Care Instructions</h3>
        <p className={styles.details__section__text}>
          {description.careInstructions}
        </p>
      </section>
    </div>
  );
};

export default ProductDescription;