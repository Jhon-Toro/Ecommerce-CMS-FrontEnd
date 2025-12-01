import { FC } from 'react';
import { ColorSelectorProps } from './interfaces/color-selector-props/ColorSelectorProps.interface';
import clsx from 'clsx';
import styles from './SelectColor.module.scss';

const ColorSelector: FC<ColorSelectorProps> = ({ colors, selectedColor, onColorChange }) => {
  return (
    <section className={styles.colors}>
      <p>Select Colors</p>
      <div className={styles.colors__options}>
        {colors.map((color) => (
          <button
            key={color.name}
            className={clsx(styles.colors__options_button, {[styles.selected] : selectedColor === color.name})}
            style={{ backgroundColor: color.hex }}
            onClick={() => onColorChange(color.name)}
          />
        ))}
      </div>
    </section>
  );
};

export default ColorSelector;