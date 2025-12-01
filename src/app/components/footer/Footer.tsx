import { FC } from 'react';
import { footerSections, socialLinks } from './footerData';
import FooterSocialIcons from './components/footer-social-icons/FooterSocialIcons';
import FooterSectionComponent from './components/footer-section/FooterSection';
import PaymentMethods from './components/footer-payment-methods/FooterPaymentMethods';
import styles from './Footer.module.scss';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.footer__container}>
        <section className={styles.footer__column} aria-labelledby="footer-shop">
          <h3 className={styles.footer__title} id="footer-shop">
            SHOP.CO
          </h3>
          <p className={styles.footer__text}>
            We have clothes that suits your style and which you’re proud to wear. From women to men.
          </p>
          <FooterSocialIcons links={socialLinks} />
        </section>

        {footerSections.map((section) => (
          <FooterSectionComponent key={section.title} section={section} />
        ))}
      </div>

      <div className={styles.footer__bottom}>
        <p className={styles.footer__bottom_copyright}>
          Shop.co © 2025-{currentYear}, All Rights Reserved
        </p>
        <PaymentMethods />
      </div>
    </footer>
  );
};

export default Footer;