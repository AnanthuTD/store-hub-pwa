import { CountryCode } from '@/domain/entities/CountryCode';
import { fetchCountryCodesUseCase } from '@/infrastructure/di';
import { useState, useEffect } from 'react';

const useCountryCodes = () => {
  const [countryCodes, setCountryCodes] = useState<CountryCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCountryCodes = async () => {
      try {
        const codes = await fetchCountryCodesUseCase.execute();
        setCountryCodes(codes);
      } catch (err) {
        setError('Failed to load country codes');
      } finally {
        setLoading(false);
      }
    };

    loadCountryCodes();
  }, []);

  return { countryCodes, loading, error };
};

export default useCountryCodes;
