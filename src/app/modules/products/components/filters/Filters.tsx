import ResetFilterButton from './components/apply-filter-button/ResetFilterButton';
import CategoryFilter from './components/category-filter/CategoryFilter';
import ColorFilter from './components/color-filter/ColorFilter';
import DressStyleFilter from './components/dress-style-filter/DressStyleFilter';
import PriceFilter from './components/price-filter/PriceFilter';
import SizeFilter from './components/size-filter/SizeFilter';
import styles from './Filters.module.scss';

const Filters = () => {
  return (
    <section className={styles.filters}>
      <h2>Filters</h2>
      <CategoryFilter />
      <PriceFilter />
      <ColorFilter />
      <SizeFilter />
      <DressStyleFilter />
      <ResetFilterButton />
    </section>
  );
};

export default Filters;