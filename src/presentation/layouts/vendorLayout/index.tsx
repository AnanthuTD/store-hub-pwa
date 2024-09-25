import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppDispatch, RootState } from '@/infrastructure/redux/store';
import { fetchProfile } from '@/infrastructure/repositories/VendorRepository';
import { login } from '@/infrastructure/redux/slices/vendor/vendorSlice';
import Cookies from 'js-cookie'; // Make sure to install js-cookie
import { ConfigProvider, Layout, theme } from 'antd';
import Sidebar from './components/SideBar';
import HeaderBar from './components/HeaderBar';
import ContentArea from './components/ContentArea';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => setCollapsed(!collapsed);

  const shopOwner = useSelector((state: RootState) => state.vendor.data);
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
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
            navigate('/vendor/signin');
          } else {
            dispatch(login(profile));
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);

        navigate('/vendor/signin');
      }
    };

    loadProfile();
  }, [shopOwner, dispatch, navigate, searchParams]);

  // TODO: Uncomment the following line to restrict access to specific routes based on admin role

  // if (!shopOwner) {
  //   return null;
  // }

  return (
    <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
      <Layout style={{ height: '100vh' }}>
        <Sidebar collapsed={collapsed} />
        <Layout>
          <HeaderBar collapsed={collapsed} toggle={toggleCollapsed} />
          <ContentArea>{children}</ContentArea>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default MainLayout;
