'use client';

import { FC, useState } from 'react';
import type { MenuData } from './interfaces/menu-data/MenuData.interface';
import { Bars3Icon, MagnifyingGlassIcon, ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import menuData from '../../../assets/menu.json';
import Sidebar from '../sidebar/Sidebar';
import styles from './Navbar.module.scss';

const Navbar: FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const data: MenuData = menuData;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className={styles.navbar}>
      <nav className={styles.navbar__container}>
        <ul className={styles.navbar__list}>
          <section className={styles.navbar__logo}>
            <Bars3Icon onClick={toggleSidebar} className={styles.navbar__hamburger} />
            <strong className={styles.navbar__brand}>SHOP.COM</strong>
          </section>
          {data.navbar.map((item, index) => (
            <li key={index} className={styles.navbar__item}>
              <Link href={item.href} className={styles.navbar__link}>{item.label}</Link>
            </li>
          ))}
          <div className={styles.navbar__search}>
            <label htmlFor="search" className={styles.navbar__search_icon}><MagnifyingGlassIcon /></label>
            <input type="text" id="search" name="search" placeholder="Search for products..." aria-label="Search for products" className={styles.navbar__search_input}/>
          </div>
          <section className={styles.navbar__right_icon}>
            <MagnifyingGlassIcon className={styles.navbar__icon} />
            <ShoppingCartIcon className={styles.navbar__icon} />
            <UserCircleIcon className={styles.navbar__icon} />
          </section>
        </ul>

        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} menu={data.sidebar} />
      </nav>
    </header>
  );
};

export default Navbar;
