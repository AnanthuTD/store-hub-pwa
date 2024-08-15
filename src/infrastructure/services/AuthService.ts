import { RegisterUserUseCase } from '@/application/usecase/RegisterUserUseCase';
import { SignInUseCase } from '@/application/usecase/SignInUseCase';
import { VerifyEmailUseCase } from '@/application/usecase/VerifyEmailUseCase';
import { VerifyTokenUseCase } from '@/application/usecase/VerifyTokenUseCase';
import { RegisterUser, SignInParams } from '@/domain/models/AuthModels';

export class AuthService {
  constructor(
    private verifyTokenUseCase: VerifyTokenUseCase,
    private verifyEmailUseCase: VerifyEmailUseCase,
    private registerUserUseCase: RegisterUserUseCase,
    private signInUseCase: SignInUseCase,
  ) {}

  async verifyToken(token: string) {
    return this.verifyTokenUseCase.execute(token);
  }

  async verifyEmail(email: string) {
    return this.verifyEmailUseCase.execute(email);
  }

  async registerUser(user: RegisterUser) {
    return this.registerUserUseCase.execute(user);
  }

  async signIn(params: SignInParams) {
    return this.signInUseCase.execute(params);
  }
}
