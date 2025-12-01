import { useFilterStore } from '@/app/store/filtersStore';
import FilterSection from '../filter-section/FilterSection';
import clsx from 'clsx';
import styles from './DressStyleFilter.module.scss';

const dressStyles = ['Casual', 'Formal', 'Party', 'Gym'];

const DressStyleFilter = () => {
  const { dressStyles: selectedDressStyles, setDressStyles } = useFilterStore();

  const toggleSelection = (item: string) => {
    setDressStyles(
      selectedDressStyles.includes(item)
        ? selectedDressStyles.filter((i) => i !== item)
        : [...selectedDressStyles, item]
    );
  };

  return (
    <FilterSection title="Dress Style">
      <section className={styles.dress}>
        {dressStyles.map((cat) => (
          <label
            key={cat}
            className={clsx(styles.dress__option, {
              [styles.selected]: selectedDressStyles.includes(cat),
            })}
          >
            <input
              type="checkbox"
              checked={cat.includes(cat)}
              onChange={() => toggleSelection(cat)}
              className={clsx(styles.checkbox, {
                [styles.selected]: selectedDressStyles.includes(cat),
              })}
            />
            <span className={styles.dress__label}>{cat}</span>
          </label>
        ))}
      </section>
    </FilterSection>
  );
};

export default DressStyleFilter;