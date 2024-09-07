import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SideBarAdmin from './components/SideBar';
import BackgroundWrapper from '@/presentation/components/BackgroundWrapper';
import { AppDispatch, RootState } from '@/infrastructure/redux/store';
import Cookies from 'js-cookie';
import { fetchProfile } from '@/infrastructure/repositories/AdminRepository';
import { login } from '@/infrastructure/redux/slices/admin/adminSlice';

function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = useSelector((state: RootState) => state.admin.data);
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
        if (!admin) {
          const profile = await fetchProfile();
          if (!profile) {
            navigate('/admin/signin');
          } else {
            // Update Redux store with fetched profile data
            console.log(profile);

            dispatch(login(profile));
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        navigate('/admin/signin'); // Navigate to sign-in if fetching profile fails
      }
    };

    loadProfile();
  }, [admin, dispatch, navigate, searchParams]);

  if (!admin) {
    return null; // Show a loading spinner or placeholder if necessary
  }

  return (
    <BackgroundWrapper>
      <div style={{ display: 'flex' }}>
        <SideBarAdmin />
        {children}
      </div>
    </BackgroundWrapper>
  );
}

export default AdminLayout;
