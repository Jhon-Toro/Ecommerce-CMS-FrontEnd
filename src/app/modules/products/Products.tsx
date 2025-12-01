'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import type { Product } from '@/app/shared-components/product/interfaces/Product.interface';
import { useFilterStore } from '@/app/store/filtersStore';
import { FilterCriteria } from './components/types/Products.type';
import { createFilterPipeline } from './helpers/ProductsHelpers';
import ProductCard from '@/app/shared-components/product/ProductCard';
import productsData from '../../../../public/data/all-products.json';
import styles from './Products.module.scss';
import Filters from './components/filters/Filters';
import Divider from '../product-details/components/divider/Divider';
import Pagination from './components/pagination/Pagination';
import useClickOutside from '@/app/hooks/useClickOutside';
import useEscKey from '@/app/hooks/useEscKey';
import clsx from 'clsx';
import TitleAllProducts from './components/filters/components/title-all-products/TitleAllProducts';

const PRODUCTS_PER_PAGE = 9;

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { category, priceRange, colors, sizes, dressStyles, isFiltersOpen, setIsFiltersOpen, sortBy } = useFilterStore();

  const filterCriteria: FilterCriteria = useMemo(
    () => ({
      category,
      priceRange,
      colors,
      sizes,
      dressStyles,
      sortBy,
    }),
    [category, priceRange, colors, sizes, dressStyles, sortBy]
  );

  useEffect(() => {
    const { filters, sortedProducts } = createFilterPipeline(filterCriteria);
  
    let filteredProducts: Product[] = productsData.filter((product) =>
      filters.every((filter) => filter(product))
    );
    filteredProducts = sortedProducts(filteredProducts);
    setProducts(filteredProducts);
  }, [filterCriteria]);

  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = useMemo(
    () => products.slice(startIndex, endIndex),
    [products, startIndex, endIndex]
  );

  const filtersRef = useRef<HTMLElement>(null);
  const productsRef = useRef<HTMLElement>(null);

  useClickOutside(filtersRef, () => {
    if (isFiltersOpen) setIsFiltersOpen(false);
  });

  useEscKey(productsRef, () => {
    setIsFiltersOpen(false);
  }, isFiltersOpen);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className={styles.products} ref={productsRef}>
      <section
        ref={filtersRef}
        className={clsx(styles.products__filters, { [styles.filtersOpen]: isFiltersOpen })}
      >
        <Filters />
      </section>
      <section className={styles.products__cards}>
        <TitleAllProducts
          currentPage={currentPage}
          productsPerPage={PRODUCTS_PER_PAGE}
          totalProducts={totalProducts}
        />
        <article className={styles.products__cards__product}>
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              discountPrice={product.discountPrice}
              rating={product.rating}
              image={product.image}
              discount={product.discount}
            />
          ))}
        </article>
        <Divider />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </main>
  );
};

export default Products;