import axiosInstance from '@/config/axios';
import { useState, useEffect } from 'react';

interface Category {
  _id: string;
  name: string;
  description?: string;
}

const useFetchCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/categories'); // Replace with your API endpoint
        setCategories(response.data || []);
        setError(null);
      } catch (err) {
        setError('Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export default useFetchCategories;
