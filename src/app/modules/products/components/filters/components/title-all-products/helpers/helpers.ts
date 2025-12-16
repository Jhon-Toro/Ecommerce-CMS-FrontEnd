import { ShowingTextParams } from "../interfaces/TitleAllProducts.interface";

export const getShowingText = ({
  currentPage,
  productsPerPage,
  totalProducts,
}: ShowingTextParams): string => {
  if (totalProducts === 0) return 'No Products Found';

  const startIndex = (currentPage - 1) * productsPerPage + 1;
  const endIndex = Math.min(currentPage * productsPerPage, totalProducts);

  return `Showing ${startIndex}-${endIndex} of ${totalProducts} Products`;
};