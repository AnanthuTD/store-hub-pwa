import React, { useState } from 'react';
import { ConfigProvider, Layout, theme } from 'antd';
import Sidebar from './components/SideBar';
import HeaderBar from './components/HeaderBar';
import ContentArea from './components/ContentArea';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => setCollapsed(!collapsed);

  return (
    <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
      <Layout style={{ height: '100vh' }}>
        <Sidebar collapsed={collapsed} />
        <Layout>
          <HeaderBar collapsed={collapsed} toggle={toggleCollapsed} />
          <ContentArea>{children}</ContentArea>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default MainLayout;
