import { RootState } from '@/infrastructure/redux/store';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function CheckShopOwnerLoggedIn({ children }: { children: React.ReactNode }) {
  const shopOwner = useSelector<RootState>((state) => state.shopOwner.data);
  return shopOwner ? <Navigate to={'/shop/dashboard'} /> : <>{children}</>;
}

export default CheckShopOwnerLoggedIn;
