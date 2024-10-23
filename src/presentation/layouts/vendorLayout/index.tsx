import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ConfigProvider, Layout, theme } from 'antd';
import { AppDispatch, RootState } from '@/infrastructure/redux/store';
import { setSelectedStore } from '@/infrastructure/redux/slices/vendor/vendorSlice';
import { useVendorStores } from './hooks/useVendorStores';
import { useProfile } from './hooks/useProfile';
import Sidebar from './components/SideBar';
import HeaderBar from './components/HeaderBar';
import ContentArea from './components/ContentArea';
import { NotificationProvider } from '@/presentation/components/NotificationContext';
import { UserRole } from '@/infrastructure/repositories/NotificationRepository';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { stores, refetch } = useVendorStores();
  const store = useSelector((state: RootState) => state.vendor.selectedStore);

  useProfile(refetch);

  useEffect(() => {
    if (stores.length && !store) {
      dispatch(setSelectedStore(stores[0])); // Set default store
    }
  }, [stores, store, dispatch]);

  const toggleCollapsed = () => setCollapsed(!collapsed);

  return (
    <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
      <NotificationProvider role={UserRole.VENDOR}>
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
