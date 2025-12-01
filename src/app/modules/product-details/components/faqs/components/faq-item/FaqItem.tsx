import { FC, useState } from 'react';
import { FaqItemProps } from '../../interfaces/faq-item-props/FaqItemProps.interface';
import styles from './FaqItem.module.scss';
import clsx from 'clsx';

const FaqItem: FC<FaqItemProps> = ({ faq }) => {
  const [isActive, setIsActive] = useState(false);
  const toggleFaq = () => setIsActive(!isActive);

  return (
    <li className={styles.faqItem}>
      <h3>
        <button
          className={clsx(styles.faqItem__question, {[styles.active] : isActive})}
          onClick={toggleFaq}
          aria-expanded={isActive}
          aria-controls={`answer-${faq.id}`}
          id={`question-${faq.id}`}
        >
          {faq.question}
          <span className={styles.faqItem__icon} aria-hidden="true">
            {isActive ? '−' : '+'}
          </span>
        </button>
      </h3>
      <section
        id={`answer-${faq.id}`}
        className={clsx(styles.faqItem__answer, {[styles.active] : isActive})}
        role="region"
        aria-labelledby={`question-${faq.id}`}
      >
        <p>{faq.answer}</p>
      </section>
    </li>
  );
};

export default FaqItem;