
import { useFilterStore } from '@/app/store/filtersStore';
import Button from '@/app/shared-components/button/Button';
import FilterSection from '../filter-section/FilterSection';
import clsx from 'clsx';
import styles from './SizeFilter.module.scss';

const sizes = ['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', '3X-Large'];

const SizeFilter = () => {
  const { sizes: selectedSizes, setSizes } = useFilterStore();

  const toggleSelection = (item: string) => {
    setSizes(
      selectedSizes.includes(item)
        ? selectedSizes.filter((i) => i !== item)
        : [...selectedSizes, item]
    );
  };

  return (
    <FilterSection title="Size">
      {sizes.map((size) => (
        <Button
          key={size}
          className={clsx(styles.sizeButton, {
            [styles.selected]: selectedSizes.includes(size),
          })}
          onClick={() => toggleSelection(size)}
          text={size}
          type='tertiary'
          size='extra-small-filter'
          typeAttribute='button'
        />
      ))}
    </FilterSection>
  );
};

export default SizeFilter;