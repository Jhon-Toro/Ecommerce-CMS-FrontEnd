import { useState } from 'react';
import { useFilterStore } from '@/app/store/filtersStore';
import FilterSection from '../filter-section/FilterSection';
import styles from './PriceFilter.module.scss';

const PriceFilter = () => {
  const { priceRange, setPriceRange } = useFilterStore();
  const [activeSlider, setActiveSlider] = useState<'min' | 'max' | null>(null);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (activeSlider !== 'min') return;
    const newMin = parseInt(e.target.value);
    const currentMax = priceRange[1];
    const minGap = 10;
    if (newMin <= currentMax - minGap) {
      setPriceRange([newMin, currentMax]);
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (activeSlider !== 'max') return;
    const newMax = parseInt(e.target.value);
    const currentMin = priceRange[0];
    const minGap = 10;
    if (newMax >= currentMin + minGap) {
      setPriceRange([currentMin, newMax]);
    }
  };

  return (
    <FilterSection title="Price">
      <section className={styles.price}>
        <section className={styles.price__range}>
          <input
            type="range"
            min="0"
            max="250"
            value={priceRange[0]}
            onChange={handleMinPriceChange}
            onMouseDown={() => setActiveSlider('min')}
            onMouseUp={() => setActiveSlider(null)}
            onTouchStart={() => setActiveSlider('min')}
            onTouchEnd={() => setActiveSlider(null)}
            style={{ '--min-value': priceRange[0], '--max-value': priceRange[1] } as React.CSSProperties}
          />
          <input
            type="range"
            min="0"
            max="250"
            value={priceRange[1]}
            onChange={handleMaxPriceChange}
            onMouseDown={() => setActiveSlider('max')}
            onMouseUp={() => setActiveSlider(null)}
            onTouchStart={() => setActiveSlider('max')}
            onTouchEnd={() => setActiveSlider(null)}
            style={{ '--min-value': priceRange[0], '--max-value': priceRange[1] } as React.CSSProperties}
          />
        </section>
        <div className={styles.price__labels}>
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </section>
    </FilterSection>
  );
};

export default PriceFilter;