import axiosInstance from '@/config/axios';
import { IProduct } from '@/domain/entities/IProduct';
import { AxiosError } from 'axios';
import { useState, useEffect } from 'react';

function useProductDetails(productId: string) {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchProductDetails(productId: string) {
    try {
      const {
        data: { product },
      } = await axiosInstance.get(`/user/products/shop/${productId}/details`);
      setProduct(product);
    } catch (err) {
      if (err instanceof AxiosError && err.response && err.response.data) {
        const { message } = err.response.data;
        if (message) {
          setError(message);
          return;
        }
      }
      setError('Failed to fetch product details');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProductDetails(productId);
  }, [productId]);

  return { product, loading, error };
}

export default useProductDetails;
