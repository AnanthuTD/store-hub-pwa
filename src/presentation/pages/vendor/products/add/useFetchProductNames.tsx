import axiosInstance from '@/config/axios';
import { useState, useEffect } from 'react';

interface Product {
  _id: string;
  name: string;
}

type Products = Product[];

const useFetchProductNames = (searchTerm: string) => {
  const [products, setProducts] = useState<Products>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (searchTerm) {
      const fetchProductNames = async () => {
        setLoading(true);
        setError(null);

        try {
          const { data }: { data: Products } = await axiosInstance.get('/vendor/products', {
            params: { search: searchTerm },
          });
          setProducts(data);
        } catch (err) {
          setError('Failed to fetch product names');
        } finally {
          setLoading(false);
        }
      };

      fetchProductNames();
    } else {
      setProducts([]); // Clear products when search term is empty
    }
  }, [searchTerm]);

  return { products, loading, error };
};

export default useFetchProductNames;
