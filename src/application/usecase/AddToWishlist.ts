import { IWishlist } from '@/domain/entities/IWishlist';
import { IWishlistRepository } from '@/domain/repositories/IWishlistRepository';

export class AddToWishlist {
  constructor(private wishlistRepository: IWishlistRepository) {}

  async execute(productId: string): Promise<IWishlist> {
    const wishlist = await this.wishlistRepository.addItem(productId);
    return wishlist;
  }
}
