import { useState, useCallback } from 'react';
import axiosInstance from '@/config/axios';

interface Shop {
  name: string;
  location: { type: string; coordinates: [number, number] };
  dist: { calculated: number };
  storeProductDetails: any[]; // You can define a more specific type if needed
}

interface NearbyShopsResponse {
  data: Shop[];
}

interface UseNearbyShopsWithProductHook {
  shops: Shop[] | null;
  loading: boolean;
  error: string | null;
  fetchNearbyShops: (
    latitude: number,
    longitude: number,
    productId: string,
    maxDistance?: number,
  ) => Promise<void>;
}

const useNearbyShopsWithProduct = (): UseNearbyShopsWithProductHook => {
  const [shops, setShops] = useState<Shop[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNearbyShops = useCallback(
    async (latitude: number, longitude: number, productId: string, maxDistance = 10000) => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.post<NearbyShopsResponse>(
          '/user/shops/nearby-with-product',
          {
            latitude,
            longitude,
            productId,
            maxDistance,
          },
        );

        setShops(response.data || []);
      } catch (err: any) {
        setError(err.response?.data?.message || 'An error occurred while fetching nearby shops');
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { shops, loading, error, fetchNearbyShops };
};

export default useNearbyShopsWithProduct;
