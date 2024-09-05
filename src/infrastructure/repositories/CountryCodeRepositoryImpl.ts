import axios from '@/config/axios';
import { CountryCode } from '@/domain/entities/CountryCode';
import { CountryCodeRepository } from '@/domain/repositories/CountryCodeRepository';

export class CountryCodeRepositoryImpl implements CountryCodeRepository {
  async fetchCountryCodes(): Promise<CountryCode[]> {
    try {
      const response = await axios.get<CountryCode[]>('/countries/codes');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch country codes', error);
      throw error;
    }
  }
}
