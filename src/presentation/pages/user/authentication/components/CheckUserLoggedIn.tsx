import { RootState } from '@/infrastructure/redux/store';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function CheckUserLoggedIn({ children }: { children: React.ReactNode }) {
  const user = useSelector<RootState>((state) => state.user.data);
  return user ? <Navigate to={'/home'} /> : <>{children}</>;
}

export default CheckUserLoggedIn;
