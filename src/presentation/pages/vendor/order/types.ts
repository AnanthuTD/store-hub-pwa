export interface OrderItem {
  productId: string;
  quantity: number;
  variantId: string;
  storeId: string;
  price: number;
  _id: string;
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  orderDate: string; // Can be converted to a Date object when needed
  paymentStatus: 'Pending' | 'Completed' | 'Failed'; // Possible statuses
  paymentId: string | null;
  paymentMethod: 'Razorpay' | 'PayPal' | 'Stripe'; // Example payment methods
  shippingAddress: string | null;
  createdAt: string;
  updatedAt: string;
}
