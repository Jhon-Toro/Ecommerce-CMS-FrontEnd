import { useFilterStore } from '@/app/store/filtersStore';
import clsx from 'clsx';
import FilterSection from '../filter-section/FilterSection';
import styles from './ColorFilter.module.scss';

const colors = ['#00C12B', '#F50606', '#F5DD06', '#F57906', '#06CAF5', '#063AF5', '#7D06F5', '#F506A4', 'white', 'black'];

const ColorFilter = () => {
  const { colors: selectedColors, setColors } = useFilterStore();

  const toggleSelection = (item: string) => {
    setColors(
      selectedColors.includes(item)
        ? selectedColors.filter((i) => i !== item)
        : [...selectedColors, item]
    );
  };

  return (
    <FilterSection title="Colors">
      <section className={styles.color}>
        {colors.map((color) => (
          <article
            key={color}
            className={clsx(styles.color__circle, {
              [styles.selected]: selectedColors.includes(color),
            })}
            style={{ backgroundColor: color }}
            data-color={color}
            onClick={() => toggleSelection(color)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && toggleSelection(color)}
          />
        ))}
      </section>
    </FilterSection>
  );
};

export default ColorFilter;