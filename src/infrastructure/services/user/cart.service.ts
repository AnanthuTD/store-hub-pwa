import axiosInstance from '@/config/axios';

export const fetchCartItems = async () => {
  try {
    const { data } = await axiosInstance.get('/user/cart');
    return data.cartItems;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const incrementQuantity = async (params: {
  productId: string;
  variantId: string;
  quantity: number;
}) => {
  try {
    await axiosInstance.post('/user/cart/add', params);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const removeProduct = async (productId: string, variantId: string) => {
  try {
    await axiosInstance.delete('/user/cart/remove', { params: { productId, variantId } });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
