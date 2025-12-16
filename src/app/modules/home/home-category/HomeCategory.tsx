'use client';

import Image from 'next/image';
import style from './HomeCategory.module.scss';
import Link from 'next/link';
import categories from '../../../../assets/home-category.json';
import clsx from 'clsx';
import { useState } from 'react';
import Skeleton from '@/app/components/skeleton/Skeleton';

const HomeCategory = () => {
  return (
    <section className={style.category}>
      {categories.map((category, index) => {
        const [imageLoaded, setImageLoaded] = useState(false);

        return (
          <div
            key={index}
            className={clsx(style.category__card, {
              [style.category__card_twoColumn]: category.twoColumn,
            })}
          >
            {!imageLoaded && <Skeleton />}

            <Link
              href={category.link}
              className={clsx(style.category__card_link, {
                [style.loading]: !imageLoaded,
              })}
            >
              <h3 className={style.category__card_title}>
                {category.title}
              </h3>

              <Image
                className={style.category__card_image}
                src={category.image}
                alt={`Clothes ${category.title}`}
                width={407}
                height={289}
                onLoad={() => setImageLoaded(true)}
              />
            </Link>
          </div>
        );
      })}
    </section>
  );
};

export default HomeCategory;
