'use client';

import { Product as MockProducts } from './interfaces/product-details/ProductDetails.interface';
import { useEffect, useState } from 'react';
import { Product } from '@/app/shared-components/product/interfaces/Product.interface';
import { FAQ } from './components/faqs/interfaces/fag/faq.interface';
import { Review } from './interfaces/reviews/Reviews.interface';
import mockProduct from '../../../assets/mockProduct.json';
import ProductInfo from './components/product-info/ProductInfo';
import styles from './ProductDetails.module.scss';
import ProductImages from './components/product-images/ProductImages';
import FeaturedProducts from '../home/home-products/FeaturedProducts';
import Tabs from './components/tabs/Tabs';
import ProductDescription from './components/product-description/ProductDescription';
import Faqs from './components/faqs/Faqs';
import Reviews from './components/reviews/Reviews';
import clsx from 'clsx';

const ProductDetails = () => {
  const product: MockProducts = mockProduct;
  const [reviews, setReviews] = useState<Review[]>();
  const [faqs, setFaqs] = useState<FAQ[]>();
  const [products, setProducts] = useState<{ newArrivals: Product[]; topSelling: Product[] } | null>(null);
  const [activeTab, setActiveTab] = useState('Rating & Reviews');
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch('/data/products.json');
    const responseReviews = await fetch('/data/reviews.json');
    const responseFaqs = await fetch('/data/faqs.json');
    const data = await res.json();
    const dataReviews = await responseReviews.json();
    const dataFaqs = await responseFaqs.json();
    setProducts(data);
    setReviews(dataReviews);
    setFaqs(dataFaqs);
  };

  const handleTabChange = (tab: string) => {
    setAnimate(false);
    setTimeout(() => {
      setActiveTab(tab);
      setAnimate(true);
    }, 50);
  };

  if (!products || !reviews) return null;

  return (
    <section className={styles.container}>
      <main className={styles.container__main}>
        <ProductImages
          mainImage={product.mainImage}
          additionalImages={product.additionalImages}
        />
        <ProductInfo product={product} />
      </main>
      <Tabs onTabChange={handleTabChange} />
      <div className={clsx(styles.tabContent, { [styles.animate]: animate })}>
        {activeTab === 'Product Details' && (
          <ProductDescription description={product.description} />
        )}
        {activeTab === 'Rating & Reviews' && <Reviews review={reviews} />}
        {activeTab === 'FAQs' && <Faqs faqs={faqs} />}
      </div>
      <FeaturedProducts products={products.topSelling} category="YOU MIGHT ALSO LIKE" />
    </section>
  );
};

export default ProductDetails;