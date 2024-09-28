import React, { useEffect, useState } from 'react';
import { Row, Col, message, Spin } from 'antd';
import CartSummary from './CartSummary';
import OrderSummary from './OrderSummary';
import PaymentButton from './PaymentButton';
import useCart from '../cart/hooks/useCart';
import { fetchCartSummary } from '@/infrastructure/services/user/cart.service';
import { useNavigate } from 'react-router-dom';
import { handlePaymentSuccess } from '@/infrastructure/services/user/payment.service';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const { totalPrice } = useCart();
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await fetchCartSummary();
        setCartItems(data);
      } catch (err) {
        message.error('Failed to fetch cart items.');
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [refetch]);

  const onPaymentSuccess = async (razorpayData) => {
    try {
      const { data } = await handlePaymentSuccess(razorpayData);
      message.success('Payment successful! Redirecting...');
      navigate(`/payment/success?orderId=${data.orderId}`);
    } catch (err) {
      message.error('Payment verification failed!');
    }
  };

  function handleRefetch() {
    setRefetch((prev) => !prev);
  }

  return (
    <Row gutter={16}>
      <Col span={12}>{loading ? <Spin /> : <CartSummary items={cartItems} />}</Col>
      <Col span={12}>
        <OrderSummary totalPrice={totalPrice} />
        <PaymentButton onSuccess={onPaymentSuccess} refetch={handleRefetch} />
      </Col>
    </Row>
  );
};

export default CheckoutPage;
