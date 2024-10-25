import { IWishlistRepository } from '@/domain/repositories/IWishlistRepository';

export class RemoveWishlistItem {
  constructor(private wishlistRepository: IWishlistRepository) {}

  async execute(productId: string): Promise<void> {
    await this.wishlistRepository.removeItem(productId);
  }
}
