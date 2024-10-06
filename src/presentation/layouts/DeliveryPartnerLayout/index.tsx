import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '@/infrastructure/redux/store';
import { login } from '@/infrastructure/redux/slices/partner/partnerSlice';
import { fetchProfile } from '@/infrastructure/repositories/PartnerAuthRepository';
import { notification } from 'antd';
import { useProgressTimer } from './useProgressTimer';
import { useDeliveryPartnerSocket } from './useDeliveryPartnerSocket';
import OrderAlertModal from './OrderAlertModal';
import {
  deliveryPartnerSocket,
  DeliveryPartnerSocketEvents,
} from '@/infrastructure/socket/deliveryPartnerSocket';

const DeliveryPartnerLayout = ({ children }: { children: React.ReactNode }) => {
  const deliveryPartner = useSelector<RootState>((state) => state.partner.data);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [newOrder, setNewOrder] = useState(null);

  const progress = useProgressTimer(newOrder, setNewOrder);
  useDeliveryPartnerSocket(setNewOrder);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        if (!deliveryPartner) {
          const profile = await fetchProfile();
          if (!profile) {
            navigate('/partner/signup');
          } else {
            dispatch(login(profile));
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        navigate('/partner/signup');
      }
    };

    loadProfile();
  }, [deliveryPartner, dispatch, navigate]);

  const handleOrderAcceptance = () => {
    if (!newOrder) return;
    console.log('Order accepted', newOrder);
    deliveryPartnerSocket.emit(DeliveryPartnerSocketEvents.OrderAccepted, newOrder.orderId);
    setNewOrder(null);
    notification.success({ message: 'Order accepted' });
  };

  if (!deliveryPartner) return null;

  return (
    <div>
      {children}
      <OrderAlertModal
        newOrder={newOrder}
        progress={progress}
        handleOrderAcceptance={handleOrderAcceptance}
      />
    </div>
  );
};

export default DeliveryPartnerLayout;
