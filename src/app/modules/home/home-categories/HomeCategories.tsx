import HomeCategory from '../home-category/HomeCategory';
import styles from './HomeCategories.module.scss';

const HomeCategories = () => {
  return (
    <section className={styles.categories}>
      <h2 className={styles.categories__title}>BROWSE BY DESS STYLE</h2>
      <HomeCategory />
    </section>
  )
}

export default HomeCategories
