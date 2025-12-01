import { FC } from 'react';
import { SizeSelectorProps } from '../../interfaces/size-selector-props/SizeSelectorProps.interface';
import clsx from 'clsx';
import Button from '../../../../shared-components/button/Button';
import styles from './SizeSelector.module.scss';

const SizeSelector: FC<SizeSelectorProps> = ({ sizes, selectedSize, onSizeChange }) => {
  return (
    <section className={styles.sizes}>
      <p>Choose Size</p>
      <div className={styles.sizes__options}>
        {sizes.map((size) => (
          <Button
            key={size}
            type="tertiary"
            text={size}
            size="extra-small-product"
            margin="zero"
            className={clsx(styles.sizes__button, { [styles.selected]: selectedSize === size })}
            onClick={() => onSizeChange(size)} 
            typeAttribute='submit'
          />
        ))}
      </div>
    </section>
  );
};

export default SizeSelector;