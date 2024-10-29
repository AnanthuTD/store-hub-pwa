import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Box from '@mui/material/Box';
import routes from '..'; // Ensure this is pointing to the correct routes file
import { getPageHeight } from './utils';
import AdminLayout from '@/presentation/layouts/AdminLayout';
import UserLayout from '@/presentation/layouts/UserLayout';
import DeliveryPartnerLayout from '@/presentation/layouts/DeliveryPartnerLayout';
import VendorLayout from '@/presentation/layouts/vendorLayout';
import type { LayoutType } from '../types';

// Error Boundary Component
const ErrorBoundary = ({ children }) => {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};

function Pages() {
  const getLayout = (type: LayoutType) => {
    switch (type) {
      case 'admin':
        return AdminLayout;
      case 'user':
        return UserLayout;
      case 'deliveryPartner':
        return DeliveryPartnerLayout;
      case 'vendor':
        return VendorLayout;
      default:
        return React.Fragment;
    }
  };

  return (
    <Box sx={{ height: (theme) => getPageHeight(theme) }}>
      <Routes>
        {Object.values(routes).map(({ path, component: Component, layoutType }) => {
          const Layout = getLayout(layoutType);

          // Console log to verify route information
          // console.log(`Path: ${path}, Component: ${Component?.name}, Layout Type: ${layoutType}`);

          return (
            <Route
              key={path}
              path={path}
              element={
                <ErrorBoundary>
                  <Layout>
                    <Component />
                  </Layout>
                </ErrorBoundary>
              }
            />
          );
        })}
      </Routes>
    </Box>
  );
}

export default Pages;
