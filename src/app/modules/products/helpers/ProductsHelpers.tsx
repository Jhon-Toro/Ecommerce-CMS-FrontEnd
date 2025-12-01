import { FilterCreator, FilterCriteria, FilterFunction } from "../components/types/Products.type";
import type { Product } from '@/app/shared-components/product/interfaces/Product.interface';

export const filterCreators: Record<keyof Omit<FilterCriteria, 'sortBy'>, FilterCreator> = {
  category: ({ category }) => (product) =>
    category.length === 0 || category.includes(product.category!),
  priceRange: ({ priceRange }) => (product) =>
    product.price >= priceRange[0] && product.price <= priceRange[1],
  colors: ({ colors }) => (product) =>
    colors.length === 0 || colors.includes(product.color!),
  sizes: ({ sizes }) => (product) =>
    sizes.length === 0 || sizes.includes(product.size!),
  dressStyles: ({ dressStyles }) => (product) =>
    dressStyles.length === 0 || dressStyles.includes(product.dressStyle!),
};

export const createFilterPipeline = (criteria: FilterCriteria): { filters: FilterFunction[], sortedProducts: (products: Product[]) => Product[] } => {
  const filters = Object.values(filterCreators).map((creator) => creator(criteria));

  const sortFunctions: Record<string, (a: Product, b: Product) => number> = {
    'Price: Low to High': (a, b) => a.price - b.price,
    'Price: High to Low': (a, b) => b.price - a.price,
    'Newest': (a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime(),
    'Most Popular': (a, b) => (b.rating || 0) - (a.rating || 0),
  };

  const sortProducts = (products: Product[]): Product[] => {
    const sortBy = criteria.sortBy || 'Most Popular';
    const sortFunction = sortFunctions[sortBy] || sortFunctions['Most Popular'];
    return [...products].sort(sortFunction);
  };

  return { filters, sortedProducts: sortProducts };
};