import axiosInstance from '@/config/axios';
import { isAxiosError } from 'axios';

export interface VendorStoresResponse {
  message: string;
  stores: {
    name: string;
    _id: string;
  }[];
}

export async function fetchVendorStores(): Promise<VendorStoresResponse['stores']> {
  try {
    const { data } = await axiosInstance.get<VendorStoresResponse>('/vendor/shop/list');
    return data.stores;
  } catch (error) {
    return handleError(error);
  }
}

function handleError(error: unknown): never {
  if (isAxiosError(error)) {
    throw new Error(error.response?.data.message || 'Failed to fetch vendor stores');
  } else {
    throw new Error((error as Error).message || 'An unexpected error occurred');
  }
}
