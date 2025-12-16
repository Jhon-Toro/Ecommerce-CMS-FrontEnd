'use client';

import { useFilterStore } from '@/app/store/filtersStore';
import { SORT_OPTIONS } from './constants/constants';
import { TitleAllProductsProps } from './interfaces/TitleAllProducts.interface';
import { getShowingText } from './helpers/helpers';
import styles from './TitleAllProducts.module.scss';
import Select from '@/app/shared-components/select/Select';

const TitleAllProducts = ({currentPage, productsPerPage, totalProducts}: TitleAllProductsProps) => {
  const { selectedCategoryName, sortBy, setSortBy } = useFilterStore();

  const title = selectedCategoryName?.trim() ? selectedCategoryName : 'All Products';

  const showingText = getShowingText({ currentPage, productsPerPage, totalProducts });

  return (
    <section className={styles.container}>
      <h2 className={styles.container__title}>{title}</h2>

      <div className={styles.container__info}>
        <p className={styles.container__showing}>{showingText}</p>

        <Select
          value={sortBy}
          options={SORT_OPTIONS}
          onChange={setSortBy}
        />

      </div>
    </section>
  );
};

export default TitleAllProducts;