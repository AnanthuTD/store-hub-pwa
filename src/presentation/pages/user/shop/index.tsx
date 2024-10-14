import React, { useEffect, useState } from 'react';
import ShopDetail from './ShopDetails';
import axiosInstance from '@/config/axios';
import { useSearchParams } from 'react-router-dom';
import ProductGrid, { ProductGridInterface } from '../productsList/components/ProductGrid';
import { Divider } from 'antd';

function Index() {
  const [searchQuery] = useSearchParams();
  const [shop, setShop] = useState<any | null>(null);
  const [products, setProducts] = useState<ProductGridInterface[]>([]);

  const shopId = searchQuery.get('shopId');

  useEffect(() => {
    // fetch shop information
    axiosInstance
      .get(`/user/shops/${shopId}/shop-details`, { params: { shopId } })
      .then((response) => {
        console.log(response.data);
        setShop(response.data);
      });

    // fetch products of the shop
    axiosInstance.get(`/user/shops/${shopId}/products`, { params: { shopId } }).then((response) => {
      console.log(response.data);
      setProducts(response.data);
    });
  }, []);

  if (!shop) {
    return null;
  }

  return (
    <div>
      <ShopDetail shop={shop} />
      <Divider>Products available in this store</Divider>
      <ProductGrid products={products} />
    </div>
  );
}

export default Index;
