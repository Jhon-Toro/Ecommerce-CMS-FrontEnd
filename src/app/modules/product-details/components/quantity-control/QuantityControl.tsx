import { FC } from 'react';
import { QuantityControlProps } from './interfaces/QuantityControlProps.interface';
import Button from '@/app/shared-components/button/Button';
import styles from './QuantityControl.module.scss';

const QuantityControl: FC<QuantityControlProps> = ({ quantity, setQuantity }) => {
  const handleDecrement = () => {
    setQuantity(quantity > 1 ? quantity - 1 : 1);
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className={styles.quantity} role="group" aria-label="Control de cantidad">
      <Button
        text="−"
        onClick={handleDecrement}
        className={styles.quantity__button}
        type={'text'}
        size={'small'} 
        typeAttribute='button'     
      />
      <span className={styles.quantity__value}>{quantity}</span>
      <Button
        text="+"
        onClick={handleIncrement}
        className={styles.quantity__button}
        type={'text'}
        size={'small'} 
        typeAttribute='button'     
      />
    </div>
  );
};

export default QuantityControl;