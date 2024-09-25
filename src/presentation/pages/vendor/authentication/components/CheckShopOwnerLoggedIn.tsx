import { login } from '@/infrastructure/redux/slices/vendor/vendorSlice';
import { AppDispatch, RootState } from '@/infrastructure/redux/store';
import { fetchProfile } from '@/infrastructure/repositories/VendorRepository';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function CheckShopOwnerLoggedIn({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const vendor = useSelector<RootState>((state) => state.vendor.data);

  if (!vendor) {
    fetchProfile().then((profile) => {
      if (profile) {
        dispatch(login(profile));
      }
    });
  }

  return vendor ? <Navigate to={'/vendor/dashboard'} /> : <>{children}</>;
}

export default CheckShopOwnerLoggedIn;
