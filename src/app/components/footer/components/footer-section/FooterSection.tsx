import { FC } from 'react';
import { FooterSection } from '../../footerData';
import Link from 'next/link';
import styles from './FooterSection.module.scss';

const FooterSectionComponent: FC<{ section: FooterSection }> = ({ section }) => (
  <section className={styles.footerSection} aria-labelledby={`footer-${section.title.toLowerCase()}`}>
    <h3 className={styles.footerSection__title} id={`footer-${section.title.toLowerCase()}`}>
      {section.title}
    </h3>
    <ul className={styles.footerSection__list}>
      {section.links.map((link) => (
        <li className={styles.footerSection__list_li} key={link.label}>
          <Link href={link.href} className={styles.footerSection__link}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </section>
);

export default FooterSectionComponent;