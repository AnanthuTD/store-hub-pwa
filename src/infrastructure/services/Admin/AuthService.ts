import axiosInstance from '@/config/axios';
import { AxiosResponse } from 'axios';

interface LoginParams {
  email: string;
  password: string;
}

export interface AdminSignInResponseDTO {
  _id: string;
  role: string;
  profile: {
    address?: {
      city: string;
      country: string;
      postalCode: string;
      state: string;
      street: string;
    };
    contactNumber: string;
    name: string;
  } | null;
  isActive: boolean;
  permissions: string | null;
  lastLogin: Date | null;
  email: string;
}

const login = async ({ email, password }: LoginParams): Promise<AdminSignInResponseDTO> => {
  try {
    const response: AxiosResponse<AdminSignInResponseDTO> = await axiosInstance.post<
      any,
      AxiosResponse<AdminSignInResponseDTO>
    >('/admin/signin', { email, password });

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
