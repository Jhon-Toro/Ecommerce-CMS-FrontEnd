'use client';

import { FC, useState } from 'react';
import { TabsProps } from '../../interfaces/tabs/Tabs.interface';
import clsx from 'clsx';
import styles from './Tabs.module.scss';

const Tabs: FC<TabsProps> = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('Rating & Reviews');
  const tabs = ['Product Details', 'Rating & Reviews', 'FAQs'];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <nav className={styles.tabs}>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={clsx(styles.tabs__tab, { [styles.active]: activeTab === tab })}
          onClick={() => handleTabClick(tab)}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
};

export default Tabs;