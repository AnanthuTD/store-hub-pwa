import axiosInstance from '@/config/axios';

export const handlePaymentSuccess = async (razorpayData) => {
  return await axiosInstance.post('/user/order/payment/success', razorpayData);
};
