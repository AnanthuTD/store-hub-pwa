export interface OrderItem {
  productId: string;
  variantId: string;
  quantity: number;
  price: number;
  storeId: string;
  productName: string;
  storeName: string;
  storeStatus: string;
  returnStatus: string;
}

export interface Order {
  orderId: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  orderDate: string;
  paymentStatus: 'Pending' | 'Completed' | 'Failed';
  paymentId: string | null;
  paymentMethod: 'Razorpay' | 'COD';
  deliveryPartnerId: string;
  deliveryPartnerName: string;
}
