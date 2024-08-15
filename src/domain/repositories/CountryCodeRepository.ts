import { CountryCode } from '@/domain/entities/CountryCode';

export interface CountryCodeRepository {
  fetchCountryCodes(): Promise<CountryCode[]>;
}
