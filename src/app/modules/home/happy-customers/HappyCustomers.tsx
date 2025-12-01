import { JSX, useState, useMemo, useEffect } from 'react';
import HappyCard from '../happy-card/HappyCard';
import styles from './HappyCustomers.module.scss';
import React from 'react';
import SliderButton from '../silider-button/SliderButton';

interface Review {
  name: string;
  rating: number;
  text: string;
}

const reviews: Review[] = [
  {
    name: 'Sarah M.',
    rating: 5,
    text: "I’m blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I’ve bought has exceeded my expectations.",
  },
  {
    name: 'Alex K.',
    rating: 5,
    text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
  },
  {
    name: 'James L.',
    rating: 5,
    text: "As someone who’s always on the lookout for unique fashion pieces, I’m thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
  },
  {
    name: 'Monica P.',
    rating: 5,
    text: "Shop.co has become my go-to for all things fashion. The quality is top-notch, and the variety keeps me coming back for more!",
  },
];

const HappyCardMemo = React.memo(HappyCard);

const HappyCustomers = (): JSX.Element => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [itemsPerSlide, setItemsPerSlide] = useState<number>(3);

  const totalReviews = useMemo(() => reviews.length, []);

  const nextSlide = (): void => {
    if (totalReviews <= itemsPerSlide) return;
    setCurrentSlide((prev) => (prev === totalReviews - itemsPerSlide ? 0 : prev + 1));
  };

  const prevSlide = (): void => {
    if (totalReviews <= itemsPerSlide) return;
    setCurrentSlide((prev) => (prev === 0 ? totalReviews - itemsPerSlide : prev - 1));
  };
  const updateItemsPerSlide = () => setItemsPerSlide(
    window.innerWidth < 767 ? 1 :
    window.innerWidth < 1024 ? 2 : 3
  );

  useEffect(() => {
    updateItemsPerSlide();
    window.addEventListener('resize', updateItemsPerSlide);
    
    return () => window.removeEventListener('resize', updateItemsPerSlide);
  }, []);

  return (
    <section className={styles.happy}>
        <header className={styles.happy__title}>
            <span className={styles.happy__title_span}>OUR HAPPY CUSTOMERS</span>  
            <div className={styles.happy__title_button}>
            <SliderButton direction="left" onClick={prevSlide} disabled={totalReviews <= itemsPerSlide} />
            <SliderButton direction="right" onClick={nextSlide} disabled={totalReviews <= itemsPerSlide} />
            </div>
        </header>
      <div className={styles.happy__container}>
        <ul
          className={styles.happy__container_track}
          style={{ '--slide-offset': `${(currentSlide * 100) / itemsPerSlide}%` } as React.CSSProperties}
        >
            {reviews.map((review, index) => (
              <li className={styles.happy__container_slide} key={index}>
                <HappyCardMemo
                  name={review.name}
                  rating={review.rating}
                  text={review.text}
                />
              </li>
            ))}
          </ul>
      </div>
    </section>
  );
};

export default HappyCustomers;
