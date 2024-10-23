import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '@/infrastructure/redux/store';
import { login } from '@/infrastructure/redux/slices/partner/partnerSlice';
import { fetchProfile } from '@/infrastructure/repositories/PartnerAuthRepository';
import { notification, Layout } from 'antd';
import { useProgressTimer } from './components/useProgressTimer';
import OrderAlertModal from './components/OrderAlertModal';
import {
  deliveryPartnerSocket,
  DeliveryPartnerSocketEvents,
} from '@/infrastructure/socket/deliveryPartnerSocket';
import AppHeader from '@/presentation/layouts/DeliveryPartnerLayout/components/AppHeader';
import BottomNavigationBar from '@/presentation/layouts/DeliveryPartnerLayout/components/BottomNavigationBar';
import { useDeliveryPartnerSocket } from './components/useDeliveryPartnerSocket';
import { UserRole } from '@/infrastructure/repositories/NotificationRepository';
import { NotificationProvider } from '@/presentation/components/NotificationContext';

const { Header, Content, Footer } = Layout;

const DeliveryPartnerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const deliveryPartner = useSelector<RootState>((state) => state.partner.data);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [newOrder, setNewOrder] = useState<any>(null);

  const progress = useProgressTimer(newOrder, setNewOrder);
  useDeliveryPartnerSocket(setNewOrder);

  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);

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

  useEffect(() => {
    const updateContentHeight = () => {
      const headerHeight = headerRef.current?.clientHeight || 0;
      const footerHeight = footerRef.current?.clientHeight || 0;
      const totalHeight = headerHeight + footerHeight + 20; // 20 for additional padding
      const viewportHeight = window.innerHeight;
      setContentHeight(viewportHeight - totalHeight);
    };

    // Initial calculation
    updateContentHeight();

    // Update on window resize
    window.addEventListener('resize', updateContentHeight);
    return () => window.removeEventListener('resize', updateContentHeight);
  }, [headerRef, footerRef]);

  const handleOrderAcceptance = () => {
    if (!newOrder) return;
    console.log('Order accepted', newOrder);
    deliveryPartnerSocket.emit(DeliveryPartnerSocketEvents.OrderAccepted, newOrder.orderId);
    setNewOrder(null);
    notification.success({ message: 'Order accepted' });
  };

  if (!deliveryPartner) return null;

  // check if direction page
  const directionPage = window.location.pathname.split('/').includes('direction');

  // avoid layout in direction page
  if (directionPage) return children;

  return (
    <NotificationProvider role={UserRole.VENDOR}>
      <Layout style={{ maxHeight: '100vh' }}>
        <Header
          ref={headerRef}
          style={{
            backgroundColor: 'rgb(238 238 238)',
            padding: '0',
            display: 'flex',
          }}
        >
          <AppHeader />
        </Header>
        <Content style={{ padding: '0px', overflow: 'clip', height: contentHeight }}>
          <div
            style={{
              height: '100%',
              overflowY: 'auto',
              overflowX: 'hidden',
              padding: '20px',
              backgroundColor: 'rgb(238 238 238)',
              borderRadius: '8px',
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          ref={footerRef}
          style={{
            backgroundColor: 'white',
            borderTop: '1px solid #e8e8e8',
            boxShadow: '0px -2px 15px rgba(0, 0, 0, 0.1)',
            padding: 0,
          }}
        >
          <BottomNavigationBar />
        </Footer>
        <OrderAlertModal
          newOrder={newOrder}
          progress={progress}
          handleOrderAcceptance={handleOrderAcceptance}
        />
      </Layout>
    </NotificationProvider>
  );
};

export default DeliveryPartnerLayout;
