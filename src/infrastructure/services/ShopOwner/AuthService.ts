import axiosInstance from '@/config/axios';
import { AxiosResponse } from 'axios';

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

const login = async ({ email, password }: LoginParams): Promise<ShopOwnerResponseDTO> => {
  try {
    const response: AxiosResponse<ShopOwnerResponseDTO> = await axiosInstance.post<
      any,
      AxiosResponse<ShopOwnerResponseDTO>
    >('/shopOwner/signin', { email, password });

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

export const authService = {
  login,
};
