import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ConfigProvider, Layout, Modal, theme } from 'antd';
import { AppDispatch, RootState } from '@/infrastructure/redux/store';
import { setSelectedStore } from '@/infrastructure/redux/slices/vendor/vendorSlice';
import { useVendorStores } from './hooks/useVendorStores';
import { useProfile } from './hooks/useProfile';
import Sidebar from './components/VendorSideBar';
import HeaderBar from './components/HeaderBar';
import ContentArea from './components/ContentArea';
import { NotificationProvider } from '@/presentation/components/NotificationContext';
import { UserRole } from '@/infrastructure/repositories/NotificationRepository';
import useUserProfile from '@/hooks/useUserProfile';
import { useNavigate } from 'react-router-dom';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { stores, refetch, loading } = useVendorStores();
  const store = useSelector((state: RootState) => state.vendor.selectedStore);
  const vendor = useUserProfile('vendor');
  const navigate = useNavigate();

  useProfile(refetch);

  useEffect(() => {
    let modal = null;

    if (!loading && stores.length && !store) {
      dispatch(setSelectedStore(stores[0]));
    } else if (!loading && !store && !stores.length) {
      modal = Modal.info({
        title: 'Register new store',
        content: (
          <>
            <p>You have not registered a store yet.</p>
            <p>Would you like to register a new one now?</p>
          </>
        ),
        onOk() {
          navigate('/vendor/shop/register');
        },
        okText: 'Register',
        cancelText: 'Cancel',
        width: 520,
        centered: true,
        maskClosable: true,
        closable: true,
        style: {
          top: 20,
        },
      });
    }

    return () => {
      modal && modal.destroy();
    };
  }, [stores, store, dispatch, loading]);

  const toggleCollapsed = () => setCollapsed(!collapsed);

  return (
    <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
      <NotificationProvider userId={vendor?._id} role={UserRole.VENDOR}>
        <Layout style={{ height: '100vh' }}>
          <Sidebar collapsed={collapsed} />
          <Layout>
            <HeaderBar collapsed={collapsed} toggle={toggleCollapsed} />
            <ContentArea>{children}</ContentArea>
          </Layout>
        </Layout>
      </NotificationProvider>
    </ConfigProvider>
  );
};

export default MainLayout;
