import { User } from '../entities/User';

export interface RegisterUser {
  firstName: string;
  lastName: string;
  password: string;
  token: string;
}

export interface SignInParams {
  emailOrMobile: string;
  password: string;
}

export interface SignInResponse {
  data?: User;
  error?: string;
}

export interface OTPResponse {
  status:
    | 'pending'
    | 'approved'
    | 'canceled'
    | 'max_attempts_reached'
    | 'deleted'
    | 'failed'
    | 'expired';
}

export interface LoginWithOtpParams {
  countryCode: string;
  mobileNumber: string;
  otp: string;
}

export interface LoginWithOtpResponse {
  message?: string;
  user?: User;
  error?: string;
}
