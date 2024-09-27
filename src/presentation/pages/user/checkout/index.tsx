// pages/CheckoutPage.js
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import CartSummary from './CartSummary';
import OrderSummary from './OrderSummary';
import PaymentButton from './PaymentButton';
import useCart from '../cart/hooks/useCart';
import { fetchCartSummary } from '@/infrastructure/services/user/cart.service';

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const { totalPrice } = useCart();

  useEffect(() => {
    // Fetch cart summary when the component mounts
    const fetchItems = async () => {
      const data = await fetchCartSummary();
      setCartItems(data);
    };
    fetchItems();
  }, []);

  const handlePaymentSuccess = (paymentId) => {
    console.log('Payment Successful, ID:', paymentId);
    // Handle post-payment actions (e.g., order confirmation, saving order details)
  };

  return (
    <Row gutter={16}>
      <Col span={12}>
        <CartSummary items={cartItems} />
      </Col>
      <Col span={12}>
        <OrderSummary totalPrice={totalPrice} />
        <PaymentButton totalPrice={totalPrice} onSuccess={handlePaymentSuccess} />
      </Col>
    </Row>
  );
};

export default CheckoutPage;
