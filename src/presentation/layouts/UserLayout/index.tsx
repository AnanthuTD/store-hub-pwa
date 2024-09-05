import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/infrastructure/redux/store'; // Adjust the path to your store file
import Header from '@/presentation/pages/user/components/Header';
import { fetchProfile } from '@/infrastructure/repositories/UserAuthRepository';
import { login } from '@/infrastructure/redux/slices/user/userSlice';

function UserLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    fetchProfile().then((profile) => {
      // Update Redux store with fetched profile data
      dispatch(login(profile));
    });
  }, [dispatch]);

  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default UserLayout;
