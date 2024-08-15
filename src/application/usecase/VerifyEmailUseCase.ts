import { AuthRepository } from '@/domain/repositories/AuthRepository';

export class VerifyEmailUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(email: string) {
    return this.authRepository.verifyEmail(email);
  }
}
