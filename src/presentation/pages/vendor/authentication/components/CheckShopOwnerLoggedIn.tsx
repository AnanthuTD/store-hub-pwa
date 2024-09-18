import { RootState } from '@/infrastructure/redux/store';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function CheckShopOwnerLoggedIn({ children }: { children: React.ReactNode }) {
  const shopOwner = useSelector<RootState>((state) => state.vendor.data);
  return shopOwner ? <Navigate to={'/vendor/dashboard'} /> : <>{children}</>;
}

export default CheckShopOwnerLoggedIn;
