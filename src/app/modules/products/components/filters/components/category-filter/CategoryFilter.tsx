import { useFilterStore } from '@/app/store/filtersStore';
import clsx from 'clsx';
import FilterSection from '../filter-section/FilterSection';
import styles from './CategoryFilter.module.scss';

const categories = ['T-Shirts', 'Shorts', 'Hoodie', 'Jeans'];

const CategoryFilter = () => {
  const { category, setCategory } = useFilterStore();

  const toggleSelection = (item: string) => {
    setCategory(
      category.includes(item)
        ? category.filter((i) => i !== item)
        : [...category, item]
    );
  };

  return (
    <FilterSection title="Categories">
      <section className={styles.list}>
        {categories.map((cat) => (
          <label
            key={cat}
            className={clsx(styles.list__option, {
              [styles.selected]: category.includes(cat),
            })}
          >
            <input
              type="checkbox"
              checked={category.includes(cat)}
              onChange={() => toggleSelection(cat)}
              className={clsx(styles.checkbox, {
                [styles.selected]: category.includes(cat),
              })}
            />
            <span className={styles.list__label}>{cat}</span>
          </label>
        ))}
      </section>
    </FilterSection>
  );
};

export default CategoryFilter;