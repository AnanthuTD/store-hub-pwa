import React, { useEffect, useState } from 'react';
import { Row, Col, message, Spin, Modal } from 'antd';
import CartSummary from './CartSummary';
import OrderSummary from './OrderSummary';
import PaymentButton from './PaymentButton';
import useCart from '../cart/hooks/useCart';
import { fetchCartSummary } from '@/infrastructure/services/user/cart.service';
import { useNavigate } from 'react-router-dom';
import { handlePaymentSuccess } from '@/infrastructure/services/user/payment.service';
import LocationPreview from '@/presentation/components/location/LocationPreview';
import LocationMap from '@/presentation/components/location/LocationMap';
import { LocationData } from '../../vendor/shop/register/types';
import axiosInstance from '@/config/axios';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const { totalPrice } = useCart();
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  async function handleOrderCreation() {
    if (!selectedLocation) {
      message.error('Please select a delivery location.');
      return;
    }

    try {
      return await axiosInstance.post('/user/order', {
        longitude: selectedLocation?.lng,
        latitude: selectedLocation?.lat,
      });
    } catch {
      message.error('Failed to create order.');
      return null;
    }
  }

  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);
  const handleLocationSelect = (location: LocationData) => {
    setSelectedLocation(location);
  };

  return (
    <Row gutter={16}>
      <Col span={12}>{loading ? <Spin /> : <CartSummary items={cartItems} />}</Col>
      <Col span={12}>
        <OrderSummary totalPrice={totalPrice} />
        <LocationPreview selectedLocation={selectedLocation} onOpenModal={handleOpenModal} />
        <Modal
          title="Select Delivery Location"
          open={isModalVisible}
          onCancel={handleCloseModal}
          footer={null}
          width={800}
        >
          <LocationMap
            onLocationSelect={handleLocationSelect}
            selectedLocation={selectedLocation}
          />
        </Modal>
        <PaymentButton
          onSuccess={onPaymentSuccess}
          refetch={handleRefetch}
          createOrder={handleOrderCreation}
        />
      </Col>
    </Row>
  );
};

export default CheckoutPage;
