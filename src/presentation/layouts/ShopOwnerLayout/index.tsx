import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SideBarShop from './components/SideBar';
import BackgroundWrapper from '@/presentation/components/BackgroundWrapper';
import { AppDispatch, RootState } from '@/infrastructure/redux/store';
import { fetchProfile } from '@/infrastructure/repositories/shopOwnerRepository';
import { login } from '@/infrastructure/redux/slices/shopOwner/shopOwnerSlice';
import Cookies from 'js-cookie'; // Make sure to install js-cookie

function ShopOwnerLayout({ children }: { children: React.ReactNode }) {
  const shopOwner = useSelector((state: RootState) => state.shopOwner.data);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const tokenFromUrl = searchParams.get('token');

        // If a token is found in the URL, store it in the cookies
        if (tokenFromUrl) {
          Cookies.remove('authToken');
          Cookies.set('authToken', tokenFromUrl);
        }

        // If no shopOwner data, attempt to fetch the profile
        if (!shopOwner) {
          const profile = await fetchProfile();
          if (!profile) {
            navigate('/shop/signin');
          } else {
            // Update Redux store with fetched profile data
            dispatch(login(profile));
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        navigate('/shop/signin'); // Navigate to sign-in if fetching profile fails
      }
    };

    loadProfile();
  }, [shopOwner, dispatch, navigate, searchParams]);

  if (!shopOwner) {
    return null; // Show a loading spinner or placeholder if necessary
  }

  return (
    <BackgroundWrapper>
      <div style={{ display: 'flex' }}>
        <SideBarShop />
        {children}
      </div>
    </BackgroundWrapper>
  );
}

export default ShopOwnerLayout;
