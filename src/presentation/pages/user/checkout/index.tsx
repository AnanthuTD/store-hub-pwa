import React, { useEffect, useState } from 'react';
import { Row, Col, message, Spin, Modal, Button } from 'antd';
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
import axios from 'axios';
import UnavailableProductsModal from './unavailableProductsModel';
import CouponList from './CouponList';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [unavailableProducts, setUnavailableProducts] = useState([]);
  const [useWallet, setUseWallet] = useState(false);
  const { totalPrice, fetchTotalPrice } = useCart();
  const [couponCode, setCouponCode] = useState(null);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [platformFee, setPlatformFee] = useState(0);

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
      const response = await axiosInstance.post('/user/order', {
        longitude: selectedLocation?.lng,
        latitude: selectedLocation?.lat,
        useWallet,
        couponCode,
      });

      if (useWallet) {
        message.success('Order created successfully! Redirecting to checkout...');
        navigate(`/payment/success?orderId=${response.data.orderId}`);
        return;
      }
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { data } = error.response;

        if (data.unavailableProducts && data.unavailableProducts.length) {
          message.error('Some products are currently unavailable for delivery.');
          setUnavailableProducts(data.unavailableProducts);
        } else message.error(data.message || 'Failed to create order.');
      } else message.error('Failed to create order.');
      return null;
    }
  }

  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);
  const handleLocationSelect = (location: LocationData) => {
    setSelectedLocation(location);
  };

  const toggleWallet = (checked: boolean) => {
    if (checked) {
      setUseWallet(true);
    } else {
      setUseWallet(false);
    }
  };

  useEffect(() => {
    fetchTotalPrice(useWallet, couponCode);
  }, [useWallet, couponCode]);

  const onCouponChange = (couponCode: string) => {
    console.log(couponCode);
    setCouponCode(couponCode);
  };

  useEffect(() => {
    if (selectedLocation) {
      axiosInstance
        .get('/user/order/calculate-delivery-charge', {
          params: {
            userLat: selectedLocation.lat,
            userLng: selectedLocation.lng,
          },
        })
        .then((response) => {
          setDeliveryCharge(response.data.deliveryCharge);
        })
        .catch((error) => {
          message.error(error?.response?.data?.message);
        });
    }
  }, [selectedLocation]);

  useEffect(() => {
    axiosInstance.get('/user/order/platform-fee').then((response) => {
      setPlatformFee(response.data.platformFee);
    });
  }, []);

  return (
    <>
      <UnavailableProductsModal
        onClose={() => setUnavailableProducts([])}
        unavailableProducts={unavailableProducts}
      />
      <Row gutter={16}>
        <Col span={12}>{loading ? <Spin /> : <CartSummary items={cartItems} />}</Col>
        <Col span={12}>
          <OrderSummary
            totalPrice={totalPrice}
            toggleWallet={toggleWallet}
            deliveryCharge={deliveryCharge}
            platformFee={platformFee}
          />
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
          {totalPrice === 0 ? (
            <Button onClick={handleOrderCreation}>Pay</Button>
          ) : (
            <PaymentButton
              onSuccess={onPaymentSuccess}
              refetch={handleRefetch}
              createOrder={handleOrderCreation}
            />
          )}
        </Col>
      </Row>
      <Row>
        <CouponList onChange={onCouponChange} totalAmount={totalPrice} />
      </Row>
    </>
  );
};

export default CheckoutPage;
