'use client';

import { useFilterStore } from '@/app/store/filtersStore';
import styles from './TitleAllProducts.module.scss';

interface TitleAllProductsProps {
  currentPage: number;
  productsPerPage: number;
  totalProducts: number;
}

const TitleAllProducts = ({ currentPage, productsPerPage, totalProducts }: TitleAllProductsProps) => {
  const { selectedCategoryName, sortBy, setSortBy } = useFilterStore();

  const sortOptions = [
    'Most Popular',
    'Price: Low to High',
    'Price: High to Low',
    'Newest',
  ];

  const title = selectedCategoryName || 'All Products';

  const startIndex = (currentPage - 1) * productsPerPage + 1;
  const endIndex = Math.min(currentPage * productsPerPage, totalProducts);
  const showingText = totalProducts > 0 ? `Showing ${startIndex}-${endIndex} of ${totalProducts} Products` : 'No Products Found';

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.info}>
        <p className={styles.showing}>{showingText}</p>
        <div className={styles.sort}>
          <label htmlFor="sort" className={styles.sortLabel}>
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={handleSortChange}
            className={styles.sortSelect}
          >
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
};

export default TitleAllProducts;