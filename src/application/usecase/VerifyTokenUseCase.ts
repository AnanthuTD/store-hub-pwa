import { AuthRepository } from '@/domain/repositories/AuthRepository';

export class VerifyTokenUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(token: string) {
    return this.authRepository.verifyToken(token);
  }
}
