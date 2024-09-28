import { login } from '@/infrastructure/redux/slices/vendor/vendorSlice';
import { AppDispatch, RootState } from '@/infrastructure/redux/store';
import { fetchProfile } from '@/infrastructure/repositories/VendorRepository';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function CheckShopOwnerLoggedIn({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const vendor = useSelector<RootState>((state) => state.vendor.data);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const checkProfile = async () => {
      try {
        if (!vendor) {
          const profile = await fetchProfile();
          if (profile) {
            dispatch(login(profile));
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    checkProfile();
  }, [vendor, dispatch]);

  if (loading) {
    return <div>Loading...</div>; // Render a loading state while fetching
  }

  // If the vendor exists, redirect to the dashboard
  if (vendor) {
    return <Navigate to={'/vendor/dashboard'} />;
  }

  return <>{children}</>; // If not logged in, render the children (i.e., the SignIn form)
}

export default CheckShopOwnerLoggedIn;
