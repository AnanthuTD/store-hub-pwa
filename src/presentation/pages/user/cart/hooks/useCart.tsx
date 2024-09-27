import { useEffect, useState } from 'react';
import { message } from 'antd';
import {
  fetchCartItems,
  incrementQuantity,
  decrementProductInCart,
  removeProduct,
  getCartTotal,
} from '@/infrastructure/services/user/cart.service';

export interface CartItem {
  _id: string;
  productId: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  quantity: number;
  variant: {
    _id: string;
    averagePrice: number;
  };
}

const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // State for cart total
  interface CartTotalState {
    totalPrice: number;
    itemCount: number;
    isLoading: boolean;
    error: string | null;
  }

  const [cartTotalState, setCartTotalState] = useState<CartTotalState>({
    totalPrice: 0,
    itemCount: 0,
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    // Fetch cart items when the component mounts
    const fetchItems = async () => {
      const data = await fetchCartItems();
      setCartItems(data);
    };
    fetchItems();
  }, []);

  // Function to fetch total price
  const fetchTotalPrice = async () => {
    setCartTotalState((prevState) => ({ ...prevState, isLoading: true, error: null }));
    try {
      const data = await getCartTotal();
      const { totalPrice, itemCount } = data;

      setCartTotalState({
        totalPrice,
        itemCount,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = (error as Error).message || 'Failed to calculate total price';
      message.error(errorMessage);
      setCartTotalState((prevState) => ({
        ...prevState,
        isLoading: false,
        error: errorMessage,
      }));
    }
  };

  useEffect(() => {
    // Re-fetch total price whenever cartItems change
    fetchTotalPrice();
  }, [cartItems]); // Add cartItems to the dependency array

  const incrementItemQuantity = async (item: CartItem) => {
    try {
      await incrementQuantity({
        productId: item._id,
        variantId: item.variant._id,
      });

      const updatedCartItems = cartItems.map((cartItem) =>
        cartItem.variant._id === item.variant._id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            }
          : cartItem,
      );

      setCartItems(updatedCartItems);
      return true;
    } catch (error) {
      message.error((error as Error).message || 'Failed to update quantity');
      return false;
    }
  };

  const decrementItemQuantity = async (item: CartItem) => {
    try {
      await decrementProductInCart({
        productId: item._id,
        variantId: item.variant._id,
      });

      const updatedCartItems = cartItems.map((cartItem) =>
        cartItem.variant._id === item.variant._id
          ? {
              ...cartItem,
              quantity: cartItem.quantity - 1,
            }
          : cartItem,
      );

      setCartItems(updatedCartItems);
      return true;
    } catch (error) {
      message.error((error as Error).message || 'Failed to update quantity');
      return false;
    }
  };

  const removeItemFromCart = async (item: CartItem) => {
    try {
      const success = await removeProduct(item._id, item.variant._id);
      if (success) {
        setCartItems(cartItems.filter((cartItem) => cartItem._id !== item._id));
        message.success('Product removed from cart');
      } else {
        message.error('Failed to remove product from cart');
      }
    } catch (error) {
      message.error((error as Error).message || 'Error removing item from cart');
    }
  };

  return {
    cartItems,
    incrementItemQuantity,
    decrementItemQuantity,
    removeItemFromCart,
    ...cartTotalState, // Spread the cart total state
  };
};

export default useCart;
