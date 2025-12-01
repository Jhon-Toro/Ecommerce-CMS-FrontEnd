import { FC } from 'react';
import { ZoomLensProps } from '../../interfaces/zoom-lens/ZoomLens.interface';
import styles from './ZoomLens.module.scss';

const ZoomLens: FC<ZoomLensProps> = ({ lensPosition }) => {
  return (
    <div
      className={styles.zoomLens}
      role='presentation'
      style={{
        left: `${lensPosition.x}px`,
        top: `${lensPosition.y}px`,
      }}
    />
  );
};

export default ZoomLens;