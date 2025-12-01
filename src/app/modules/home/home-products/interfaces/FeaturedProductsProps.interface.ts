import type { Product } from "@/app/shared-components/product/interfaces/Product.interface";

export interface FeaturedProductsProps {
  products: Product[];
  category: string;
}