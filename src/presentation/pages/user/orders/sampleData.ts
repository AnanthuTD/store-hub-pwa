import { Order } from './types';

export const orderData: Order[] = [
  {
    orderId: 'ORD001',
    userId: 'USER001',
    items: [
      {
        productId: 'PROD001',
        variantId: 'VAR001',
        quantity: 1,
        price: 1000,
        storeId: 'STORE001',
        storeName: 'Apple Store',
        productName: 'Apple iPhone 14',
        storeStatus: 'Collected',
        returnStatus: 'Not Requested',
      },
      {
        productId: 'PROD002',
        variantId: 'VAR002',
        quantity: 2,
        price: 1500,
        storeId: 'STORE001',
        storeName: 'Apple Store',
        productName: 'AirPods Pro',
        storeStatus: 'Failed', // Product not available
        returnStatus: 'Not Requested',
      },
    ],
    totalAmount: 3000,
    orderDate: '2024-09-20',
    paymentStatus: 'Completed',
    paymentId: 'PAYID12345',
    paymentMethod: 'Razorpay',
    deliveryPartnerId: 'DELIVERY001', // Assuming a delivery partner ID is linked
    deliveryPartnerName: 'John Doe', // Sample delivery partner name
  },
];
