import React, { useEffect, useState } from 'react';
import { LoadScript } from '@react-google-maps/api';
import TrackPage from './TrackPage';
import { Link, useSearchParams } from 'react-router-dom';
import axiosInstance from '@/config/axios';
import { Modal, Spin } from 'antd';
import { io } from 'socket.io-client';
import CallComponent from '../../CallComponent';
import { useSelector } from 'react-redux';
import { RootState } from '@/infrastructure/redux/store';

const socket = io('http://localhost:4000');

function Page() {
  const [useParams] = useSearchParams();
  const orderId = useParams.get('orderId');
  const [order, setOrder] = useState(null);
  const [initialLocation, setInitialLocation] = useState(null);
  const [deliveryOtp, setDeliveryOtp] = useState(null);
  const user = useSelector((state: RootState) => state.user.data);
  console.log(user);

  const fetchOrder = async () => {
    if (!orderId) return;
    const { data } = await axiosInstance.get(`/user/order/status/${orderId}`);
    console.log(data);

    if (data?.location) {
      setInitialLocation(data.location);
    }

    setDeliveryOtp(data.order.deliveryOTP);

    setOrder(data.order);
  };

  useEffect(() => {
    fetchOrder();

    const handleStatusChange = (status) => {
      setOrder((prev) => ({
        ...prev,
        deliveryStatus: status,
      }));
    };

    socket.on('order:status:change', (data) => {
      console.log(data);
      handleStatusChange(data);
    });

    return () => {
      socket.off('order:status:change', handleStatusChange);
    };
  }, []);

  if (!orderId) {
    // Redirect to a 404 page or display a message indicating the order ID is missing
    return <div>Order ID is missing</div>;
  }

  if (!order && !user.id) return <div>No order id found</div>;

  return (
    <div>
      <CallComponent to={order?.deliveryPartnerId} from={user?.id} />
      <Modal
        open={!order || ['Pending', 'Failed', 'Delivered'].includes(order.deliveryStatus)}
        closable={false}
        footer={null}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Spin />
        </div>
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          {(!order && 'Fetching order details...') ||
            (order.deliveryStatus === 'Pending' && 'Searching for delivery partners...') ||
            (order.deliveryStatus === 'Failed' &&
              'No delivery partners available. Amount will be refunded to your wallet.') ||
            (order.deliveryStatus === 'Delivered' && 'Your order has been successfully delivered.')}
          {order?.deliveryStatus}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Link to={'/orders'}>Back to orders</Link>
        </div>
      </Modal>

      <LoadScript googleMapsApiKey={import.meta.env.VITE_MAP_API_KEY} libraries={['geometry']}>
        <TrackPage orderId={orderId} initialLocation={initialLocation} deliveryOtp={deliveryOtp} />
      </LoadScript>
    </div>
  );
}

export default Page;
