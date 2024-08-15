import { SignInParams } from '@/domain/models/AuthModels';
import { AuthRepository } from '@/domain/repositories/AuthRepository';

export class SignInUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute({ emailOrMobile, password }: SignInParams) {
    return this.authRepository.signIn({ emailOrMobile, password });
  }
}
