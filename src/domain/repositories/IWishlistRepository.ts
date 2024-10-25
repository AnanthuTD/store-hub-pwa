import { IWishlist } from '../entities/IWishlist';

export interface IWishlistRepository {
  getWishlist(): Promise<IWishlist[]>;
  addItem(productId: string): Promise<IWishlist>;
  removeItem(productId: string): Promise<void>;
  checkProductInWishlist(productId: string): Promise<boolean>;
}
