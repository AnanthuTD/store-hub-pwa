import axiosInstance from '@/config/axios';
import { IVendor } from '@/domain/entities/IVendor';

export async function fetchProfile(): Promise<IVendor | null> {
  try {
    const response = await axiosInstance.get('/vendor/auth/profile');

    return response.data;
  } catch (err) {
    return null;
  }
}
