import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Box from '@mui/material/Box';
import routes from '..';
import { getPageHeight } from './utils';
import AdminLayout from '@/presentation/layouts/AdminLayout';
import UserLayout from '@/presentation/layouts/UserLayout';
import DeliveryPartnerLayout from '@/presentation/layouts/DeliveryPartnerLayout';
import ShopOwnerLayout from '@/presentation/layouts/ShopOwnerLayout';
import type { LayoutType } from '../types';

function Pages() {
  const getLayout = (type: LayoutType) => {
    switch (type) {
      case 'admin':
        return AdminLayout;
      case 'user':
        return UserLayout;
      case 'deliveryPartner':
        return DeliveryPartnerLayout;
      case 'shopOwner':
        return ShopOwnerLayout;
      default:
        return React.Fragment;
    }
  };

  return (
    <Box sx={{ height: (theme) => getPageHeight(theme) }}>
      <Routes>
        {Object.values(routes).map(({ path, component: Component, layoutType }) => {
          const Layout = getLayout(layoutType);
          return (
            <Route
              key={path}
              path={path}
              element={
                <Layout>
                  <Component />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </Box>
  );
}

export default Pages;
