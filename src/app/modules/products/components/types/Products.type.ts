import { Product } from "@/app/shared-components/product/interfaces/Product.interface";

export type FilterCriteria = {
  category: string[];
  priceRange: [number, number];
  colors: string[];
  sizes: string[];
  dressStyles: string[];
  sortBy?: string;
};

export type FilterFunction = (product: Product) => boolean;

export type FilterCreator = (criteria: FilterCriteria) => FilterFunction;