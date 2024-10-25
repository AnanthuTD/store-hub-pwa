import { GetWishlistItems } from '@/application/usecase/GetWishlistItems';
import { RemoveWishlistItem } from '@/application/usecase/RemoveWishlistItem';
import { IWishlist } from '@/domain/entities/IWishlist';
import { WishlistRepository } from '@/infrastructure/repositories/WishlistRepository';
import Wishlist from '@/presentation/components/Wishlist';
import React, { useEffect, useState } from 'react';

const WishlistContainer: React.FC = () => {
  const [items, setItems] = useState<IWishlist[]>([]);

  const wishlistRepository = new WishlistRepository();
  const removeFromWishlist = new RemoveWishlistItem(wishlistRepository);
  const getWishlist = new GetWishlistItems(wishlistRepository);

  useEffect(() => {
    const fetchWishlist = async () => {
      const wishlist = await getWishlist.execute();
      setItems(wishlist);
    };
    fetchWishlist();
  }, []);

  const handleRemoveItem = async (productId: string) => {
    await removeFromWishlist.execute(productId);
    setItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
  };

  return <Wishlist items={items} onRemoveItem={handleRemoveItem} />;
};

export default WishlistContainer;
