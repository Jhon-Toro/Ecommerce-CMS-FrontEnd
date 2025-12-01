'use client';

import { FC } from 'react';
import { goToPreviousPage, goToNextPage, generatePageElements } from '../../helpers/PaginationHelpers';
import { PageElement, PaginationProps } from '../../interfaces/Pagination/Pagination.interface';
import Button from '@/app/shared-components/button/Button';
import styles from './Pagination.module.scss';
import { useMediaQuery } from 'react-responsive';

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const isMobile = useMediaQuery({ maxWidth: 576 });
  const renderPageElements = () => {
    const elements: PageElement[] = generatePageElements(
      currentPage,
      totalPages,
      onPageChange,
      isMobile
    );
    return elements.map((element) => {
      if (element.isEllipsis) {
        return (
          <span key={element.key} className={styles.ellipsis}>
            {element.content}
          </span>
        );
      }

      return (
        <Button
          key={element.key}
          type="tertiary"
          text={element.content.toString()}
          onClick={element.onClick}
          className={element.isActive ? styles.active : ''}
          size="small"
          margin="zero" 
          typeAttribute='button'       
        />
      );
    });
  };

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <Button
        type="secondary"
        text="Previous"
        onClick={() => goToPreviousPage(currentPage, onPageChange)}
        className={styles.navButton}
        size="small-pagination"
        margin="zero"
        icon="chevron-left"
        iconPosition="left"
        disabled={currentPage === 1} 
        typeAttribute='button'      
      />
      <ul className={styles.pageNumbers}>{renderPageElements()}</ul>
      <Button
        type="secondary"
        text="Next"
        onClick={() => goToNextPage(currentPage, totalPages, onPageChange)}
        className={styles.navButton}
        size="small-pagination"
        margin="zero"
        icon="chevron-right"
        iconPosition="right"
        disabled={currentPage === totalPages} 
        typeAttribute='button'     
      />
    </nav>
  );
};

export default Pagination;