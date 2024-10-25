import { IWishlist } from '@/domain/entities/IWishlist';
import { IWishlistRepository } from '@/domain/repositories/IWishlistRepository';

export class GetWishlistItems {
  constructor(private wishlistRepository: IWishlistRepository) {}

  async execute(): Promise<IWishlist[]> {
    const wishlist = await this.wishlistRepository.getWishlist();
    return wishlist || [];
  }
}
