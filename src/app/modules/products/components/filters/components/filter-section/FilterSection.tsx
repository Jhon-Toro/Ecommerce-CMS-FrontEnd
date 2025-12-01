import { useState, ReactNode } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import styles from './FilterSection.module.scss';

type FilterSectionProps = {
  title: string;
  children: ReactNode;
};

const FilterSection = ({ title, children }: FilterSectionProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={styles.filter}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.filter__toggleButton}>
        <span className={styles.filter__toggleButton__title}>{title}</span>
        <ChevronDownIcon
          className={styles.filter__toggleButton__chevronIcon}
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>
      {isOpen && <div className={styles.filter__options}>{children}</div>}
    </div>
  );
};

export default FilterSection;