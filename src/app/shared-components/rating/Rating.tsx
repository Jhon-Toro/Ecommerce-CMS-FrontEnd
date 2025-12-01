import { FC } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { RatingProps } from './interfaces/Rating.interface';
import styles from './Rating.module.scss';

const Rating: FC<RatingProps> = ({ rating, size, numbers = true }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <section className={`${styles.rating} ${styles[size]}`}>
      {Array.from({ length: fullStars }, (_, i) => (
        <StarIcon key={`full-${i}`} className={`${styles.star} ${styles.full} ${styles[size]}`} />
      ))}

      {halfStar && (
        <StarIcon
          key="half"
          className={`${styles.star} ${styles.half} ${styles[size]}`}
        />
      )}

      {Array.from({ length: emptyStars }, (_, i) => (
        <StarIcon key={`empty-${i}`} className={`${styles.star} ${styles.empty} ${styles[size]}`} />
      ))}
      {numbers && <p className={styles.rating__number}>{rating}/<span className={styles.rating__number_last}>5</span></p>}
    </section>
  );
};

export default Rating;
