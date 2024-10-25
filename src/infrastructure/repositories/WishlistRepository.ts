import axiosInstance from '@/config/axios';
import { IWishlist } from '@/domain/entities/IWishlist';
import { IWishlistRepository } from '@/domain/repositories/IWishlistRepository';

export class WishlistRepository implements IWishlistRepository {
  async getWishlist(): Promise<IWishlist[]> {
    const response = await axiosInstance.get<IWishlist[]>(`/user/wishlist`);
    return response.data;
  }

  async addItem(productId: string): Promise<IWishlist> {
    const response = await axiosInstance.post<IWishlist>(`user/wishlist/add`, { productId });
    return response.data;
  }

  async removeItem(productId: string): Promise<void> {
    await axiosInstance.delete(`/user/wishlist/${productId}/remove`);
  }

  async checkProductInWishlist(productId: string): Promise<boolean> {
    const { data } = await axiosInstance.get(`/user/wishlist/check/${productId}`);
    return data.isInWishlist;
  }
}
