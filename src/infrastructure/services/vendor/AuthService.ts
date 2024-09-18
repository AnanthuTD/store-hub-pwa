import axiosInstance from '@/config/axios';
import { AxiosError, AxiosResponse } from 'axios';

interface LoginParams {
  email: string;
  password: string;
}

export interface ShopOwnerResponseDTO {
  _id: string;
  documents: {
    imageUrl: string[] | null;
    type: string | null;
  }[];
  bankDetails: {
    accountHolderName: string | null;
    accountNumber: string | null;
    bankName: string | null;
    ifscCode: string | null;
  };
  authMethods: {
    provider: 'credential' | 'google' | 'otp';
  }[];
  createdAt: string | null;
  email: string | null;
  phone: string | null;
  updatedAt: string | null;
  profile: {
    address: {
      city: string | null;
      country: string | null;
      postalCode: string | null;
      state: string | null;
      street: string | null;
    };
    firstName: string;
    lastName: string;
  } | null;
}

const login = async ({
  email,
  password,
}: LoginParams): Promise<{ shopOwner: ShopOwnerResponseDTO; token: string }> => {
  try {
    const response: AxiosResponse<ShopOwnerResponseDTO> = await axiosInstance.post<
      any,
      AxiosResponse<ShopOwnerResponseDTO>
    >('/vendor/auth/signin', { email, password });

    return response.data; // Return the response data
  } catch (error: any) {
    // Extract and throw a more specific error message if available
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message || 'Failed to sign in');
    }
  }
};

interface SignUpParams {
  email: string;
  password: string;
}

interface SignUpResponse {
  success: boolean;
  message?: string;
}

const signUp = async ({ email, password }: SignUpParams): Promise<SignUpResponse> => {
  try {
    const response = await axiosInstance.post<any, AxiosResponse<SignUpResponse>>(
      '/vendor/auth/signup',
      {
        email,
        password,
      },
    );

    if (response.data.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.data.message || 'Sign up failed. Please try again.',
      };
    }
  } catch (error) {
    console.error('Error during sign up:', error);
    return {
      success: false,
      message:
        (error as AxiosError<{ message: string }>).response?.data?.message ||
        'Sign up failed. Please try again later.',
    };
  }
};

export const authService = {
  login,
  signUp,
};
