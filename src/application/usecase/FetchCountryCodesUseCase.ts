import { CountryCode } from '@/domain/entities/CountryCode';
import { CountryCodeRepository } from '@/domain/repositories/CountryCodeRepository';

export class FetchCountryCodesUseCase {
  constructor(private countryCodeRepository: CountryCodeRepository) {}

  async execute(): Promise<CountryCode[]> {
    return this.countryCodeRepository.fetchCountryCodes();
  }
}
