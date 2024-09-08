import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/infrastructure/redux/store'; // Adjust the path to your store file
import Header from '@/presentation/pages/user/components/Header';
import { login } from '@/infrastructure/redux/slices/user/userSlice';
import { useSearchParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { fetchProfile } from '@/infrastructure/repositories/UserAuthRepository';

function UserLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.data);
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
        if (!user) {
          const profile = await fetchProfile();
          if (profile) {
            // Update Redux store with fetched profile data
            console.log(profile);

            dispatch(login(profile));
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    loadProfile();
  }, [user, dispatch, searchParams]);

  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default UserLayout;
