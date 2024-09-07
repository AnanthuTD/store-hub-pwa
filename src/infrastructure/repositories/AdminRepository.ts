import axiosInstance from '@/config/axios';
import { IAdmin } from '@/domain/entities/IAdmin';

export async function fetchProfile(): Promise<IAdmin | null> {
  try {
    const response = await axiosInstance.get('/admin/auth/profile');

    return response.data;
  } catch (err) {
    return null;
  }
}
