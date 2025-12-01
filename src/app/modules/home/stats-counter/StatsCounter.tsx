'use client'

import { useEffect, useState, useCallback, FC } from 'react';
import type { StatsCounterProps } from './interfaces/StatsCounterProps';
import styles from './StatsCounter.module.scss';

const StatsCounter: FC<StatsCounterProps> = ({ endValue, label, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  const incrementValue = useCallback(() => {
    const increment = Math.ceil(endValue / (duration / 100));
    let currentValue = 0;

    const interval = setInterval(() => {
      currentValue += increment;
      if (currentValue >= endValue) {
        clearInterval(interval);
        setCount(endValue);
      } else {
        setCount(currentValue);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [endValue, duration]);

  useEffect(() => {
    incrementValue();
  }, [incrementValue]);

  return (
    <section className={styles.stat}>
      <h3 className={styles.stat__number}>{count.toLocaleString()}+</h3>
      <p className={styles.stat__label}>{label}</p>
    </section>
  );
};

export default StatsCounter;
