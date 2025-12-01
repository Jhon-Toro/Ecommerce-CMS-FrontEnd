import { FC, JSX } from 'react';
import type { ButtonProps } from './interfaces/ButtonProps';
import styles from './Button.module.scss';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const Button: FC<ButtonProps> = ({
  type,
  text,
  onClick,
  className,
  size,
  margin,
  icon,
  iconPosition,
  disabled,
  typeAttribute = 'submit',
}) => {
  const icons: { [key: string]: JSX.Element } = {
    'chevron-left': <ArrowLeftIcon className={styles.iconSvg} />,
    'chevron-right': <ArrowRightIcon className={styles.iconSvg} />,
  };

  const renderIcon = () => {
    if (!icon || !icons[icon]) return null;
    return <span className={styles.icon}>{icons[icon]}</span>;
  };

  return (
    <button
      type={typeAttribute}
      className={`
        ${styles.button} 
        ${styles[`button--${type}`]} 
        ${styles[`button--${size}`]} 
        ${styles[`button--${margin}`]} 
        ${iconPosition ? styles[`button--icon-${iconPosition}`] : ''} 
        ${className ?? ''}
      `}
      onClick={onClick}
      role={typeAttribute}
      disabled={disabled}
    >
      {iconPosition === 'left' && renderIcon()}
      <span className={styles.text}>{text}</span>
      {iconPosition === 'right' && renderIcon()}
    </button>
  );
};

export default Button;