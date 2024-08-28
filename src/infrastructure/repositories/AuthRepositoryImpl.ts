import axiosInstance from '@/config/axios';
import { VerifyEmailError, RegisterUserError } from '@/application/errors';
import { ZodError } from 'zod';
import { emailSchema } from '@/validators/Shared';
import axios, { AxiosResponse } from 'axios';
import {
  LoginWithOtpParams,
  LoginWithOtpResponse,
  OTPResponse,
  RegisterUser,
  SignInParams,
  SignInResponse,
} from '@/domain/models/AuthModels';
import { AuthRepository } from '@/domain/repositories/AuthRepository';
import { User } from '@/domain/entities/User';

export class AuthRepositoryImpl implements AuthRepository {
  async verifyToken(token: string): Promise<{ email?: string; message?: string }> {
    try {
      const response = await axiosInstance.post(`/auth/verify-token`, { token });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Token verification failed');
      } else {
        throw new Error('Error verifying token');
      }
    }
  }

  async verifyEmail(email: string): Promise<{ valid: boolean; email: string; message: string }> {
    try {
      emailSchema.parse(email);
      const response = await axiosInstance.post('/auth/verify-email', { email });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new VerifyEmailError(
          error.response.data.message || 'Email verification process failed',
        );
      } else if (error instanceof ZodError) {
        throw new VerifyEmailError('Invalid email format');
      } else {
        throw new VerifyEmailError('Error verifying email! Please try again after sometime');
      }
    }
  }

  async registerUser(user: RegisterUser): Promise<AxiosResponse> {
    try {
      return await axiosInstance.post('/auth/register/email', user);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { status, data } = error.response;
        if ([401, 500].includes(status) && data.message) {
          throw new RegisterUserError(data.message);
        } else if (status === 400 && data.errors) {
          throw new RegisterUserError(`Validation errors: ${data.errors.join(', ')}`);
        } else {
          throw new RegisterUserError(data.message || 'An unknown error occurred.');
        }
      } else {
        throw new RegisterUserError('Network error. Please check your connection.');
      }
    }
  }

  async signIn(params: SignInParams): Promise<SignInResponse> {
    try {
      const response = await axiosInstance.post('/auth/sign-in/credentials', params);
      return { data: response.data };
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const { status, data } = err.response;
        if (status === 401) {
          return { error: 'Invalid credentials. Please try again.' };
        } else if (status === 500) {
          return { error: 'Server error. Please try again later.' };
        } else {
          return { error: data.message || 'An unknown error occurred.' };
        }
      } else {
        return { error: 'Network error. Please check your connection.' };
      }
    }
  }

  async sendOTP(countryCode: string, mobileNumber: string): Promise<OTPResponse> {
    try {
      const response = await axiosInstance.post('/auth/otp/send', { countryCode, mobileNumber });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { data } = error.response;
        throw new Error(data?.error || 'An error occurred while sending OTP.');
      } else {
        throw new Error('Network error. Please check your connection.');
      }
    }
  }

  async loginWithOtp(params: LoginWithOtpParams): Promise<LoginWithOtpResponse> {
    try {
      const response = await axiosInstance.post('/auth/signin/otp', params);

      return {
        message: response.data.message,
        user: response.data.user,
      };
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const { status, data } = err.response;

        if (status === 400) {
          return { error: data.error || 'Invalid request. Please check your input.' };
        } else if (status === 404) {
          return { error: 'User not found.' };
        } else if (status === 500) {
          return { error: 'Server error. Please try again later.' };
        } else {
          return { error: data.message || 'An unknown error occurred.' };
        }
      } else {
        return { error: 'Network error. Please check your connection.' };
      }
    }
  }

  async signupWithOTP({
    countryCode,
    mobileNumber,
    firstName,
    lastName,
    password,
    otp,
  }: {
    countryCode: string;
    mobileNumber: string;
    firstName: string;
    lastName: string;
    password: string;
    otp: string;
  }): Promise<LoginWithOtpResponse> {
    try {
      const response = await axiosInstance.post('/auth/register/mobile', {
        countryCode,
        mobileNumber,
        firstName,
        lastName,
        password,
        otp,
      });

      return {
        message: response.data.message,
        user: response.data.user,
      };
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const { status, data } = err.response;

        if (status === 400) {
          return { error: data.error || 'Invalid request. Please check your input.' };
        } else if (status === 404) {
          return { error: 'User not found.' };
        } else if (status === 500) {
          return { error: 'Server error. Please try again later.' };
        } else {
          return { error: data.message || 'An unknown error occurred.' };
        }
      } else {
        return { error: 'Network error. Please check your connection.' };
      }
    }
  }

  async fetchProfile(): Promise<User | null> {
    try {
      const response = await axiosInstance.get('/auth/profile');

      return response.data;
    } catch (err) {
      return null;
    }
  }
}
