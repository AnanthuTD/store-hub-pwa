import { IWishlistRepository } from '@/domain/repositories/IWishlistRepository';

export class CheckProductInWishlist {
  constructor(private wishlistRepository: IWishlistRepository) {}

  async execute(productId: string): Promise<boolean> {
    return await this.wishlistRepository.checkProductInWishlist(productId);
  }
}
