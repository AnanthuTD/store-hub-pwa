import { RegisterUser } from '@/domain/models/AuthModels';
import { AuthRepository } from '@/domain/repositories/AuthRepository';

export class RegisterUserUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute({ firstName, lastName, password, token }: RegisterUser) {
    return this.authRepository.registerUser({ firstName, lastName, password, token });
  }
}
