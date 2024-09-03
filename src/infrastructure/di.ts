import { CountryCodeRepositoryImpl } from '@/infrastructure/repositories/CountryCodeRepositoryImpl';
import { FetchCountryCodesUseCase } from '@/application/usecase/FetchCountryCodesUseCase';
import { AuthRepositoryImpl } from '@/infrastructure/repositories/UserAuthRepository';
import { VerifyEmailUseCase } from '@/application/usecase/VerifyEmailUseCase';

const authRepository = new AuthRepositoryImpl();

const countryCodeRepository = new CountryCodeRepositoryImpl();

const fetchCountryCodesUseCase = new FetchCountryCodesUseCase(countryCodeRepository);
const verifyEmailUseCase = new VerifyEmailUseCase(authRepository);

export { fetchCountryCodesUseCase, verifyEmailUseCase };
