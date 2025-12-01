'use client';

import { FC } from 'react';
import { XMarkIcon } from '@heroicons/react/16/solid';
import clsx from 'clsx';
import Link from 'next/link';
import type { SidebarProps } from './interfaces/sidebar-props/SidebarProps.interface';
import styles from './Sidebar.module.scss';

const Sidebar: FC<SidebarProps> = ({ isOpen, toggleSidebar, menu }) => {
  return (
    <dialog role='dialog' open={isOpen} className={clsx(styles.sidebar, {[styles.open] : isOpen})}>
      <strong className={styles.navbar__brand}>SHOP.COM</strong>
      <XMarkIcon className={styles.sidebar__close} onClick={toggleSidebar} data-testid="sidebar-close"/>
      <ul className={styles.sidebar__list}>
        {menu.map((item, index) => (
          <li key={index} className={styles.sidebar__item}>
            <Link href={item.href} className={styles.sidebar__link} onClick={toggleSidebar}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </dialog>
  );
};

export default Sidebar;
