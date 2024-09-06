import axiosInstance from '@/config/axios';
import { IShopOwner } from '@/domain/entities/IShopOwner';

export async function fetchProfile(): Promise<IShopOwner | null> {
  try {
    const response = await axiosInstance.get('shopOwner/auth/profile');

    return response.data;
  } catch (err) {
    return null;
  }
}
