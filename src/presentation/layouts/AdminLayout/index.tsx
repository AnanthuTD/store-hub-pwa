import React, { useEffect, useState } from 'react';
import { ConfigProvider, Layout, theme } from 'antd';
import Sidebar from './components/SideBar';
import HeaderBar from './components/HeaderBar';
import ContentArea from './components/ContentArea';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppDispatch, RootState } from '@/infrastructure/redux/store';
import { fetchProfile } from '@/infrastructure/repositories/AdminRepository';
import Cookies from 'js-cookie';
import { login } from '@/infrastructure/redux/slices/admin/adminSlice';
import { NotificationProvider } from '@/presentation/components/NotificationContext';
import { UserRole } from '@/infrastructure/repositories/NotificationRepository';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => setCollapsed(!collapsed);

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

  // TODO: Uncomment the following line to restrict access to specific routes based on admin role
  /*   if (!admin) {
    return null;
  } */

  return (
    <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
      <NotificationProvider role={UserRole.ADMIN}>
        <Layout style={{ height: '100vh' }}>
          <Sidebar collapsed={collapsed} />
          <Layout>
            <HeaderBar collapsed={collapsed} toggle={toggleCollapsed} />
            <ContentArea>{children}</ContentArea>
          </Layout>
        </Layout>
      </NotificationProvider>
    </ConfigProvider>
  );
};

export default MainLayout;
