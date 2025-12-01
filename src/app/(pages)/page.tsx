'use client'

import { useEffect, useState } from "react";
import Hero from "@/app/modules/home/hero/Hero";
import HomeProducts from "@/app/modules/home/home-products/FeaturedProducts";
import HomeCategories from "@/app/modules/home/home-categories/HomeCategories";
import { Product } from "@/app/shared-components/product/interfaces/Product.interface";
import HappyCustomers from "@/app/modules/home/happy-customers/HappyCustomers";

export default function Home() {
  const [products, setProducts] = useState<{ newArrivals: Product[]; topSelling: Product[] } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch('/data/products.json');
    const data = await res.json();
    setProducts(data);
  };
  
  if (!products) return;
  
  return (
    <>
      <Hero />
      <HomeProducts products={products.newArrivals} category="New Arrivals" />
      <HomeProducts products={products.topSelling} category="Top Selling" />
      <HomeCategories/>
      <HappyCustomers/>
    </>
  );
}
