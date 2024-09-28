import { useState, useEffect, useCallback } from 'react';
import {
  fetchVendorStores,
  VendorStoresResponse,
} from '@/infrastructure/services/vendor/storeServices';

type Stores = VendorStoresResponse['stores'];

export function useVendorStores() {
  const [stores, setStores] = useState<Stores>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadStores = async () => {
    try {
      setLoading(true);
      const data = await fetchVendorStores();
      setStores(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const refetch = useCallback(() => {
    loadStores();
  }, []);

  useEffect(() => {
    loadStores();
  }, []);

  return { stores, loading, error, refetch };
}
