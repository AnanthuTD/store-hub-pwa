import { AxiosResponse } from 'axios';
import { RegisterUser, SignInParams, SignInResponse } from '../models/AuthModels';

export interface AuthRepository {
  verifyToken(token: string): Promise<{ email?: string; message?: string }>;
  verifyEmail(email: string): Promise<{ valid: boolean; email: string; message: string }>;
  registerUser(user: RegisterUser): Promise<AxiosResponse>;
  signIn(params: SignInParams): Promise<SignInResponse>;
}
