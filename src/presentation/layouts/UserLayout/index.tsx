import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/infrastructure/redux/store'; // Adjust the path to your store file
import Header from '@/presentation/pages/user/components/Header';
import { login } from '@/infrastructure/redux/slices/user/userSlice';
import { useSearchParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { fetchProfile } from '@/infrastructure/repositories/UserAuthRepository';
import useFCM, { FCMRoles } from '@/hooks/useFCM';
import useRegisterFCMToken from '@/hooks/useRegisterFCMToken';
import CallComponent from '@/presentation/components/call/CallComponent';
import axiosInstance from '@/config/axios';
import { message as antdMessage } from 'antd';

// Create a Context for FCM messages
export const OrderStatusContext = createContext<string | null>(null);

interface CartContextProps {
  cartCount: number;
  refreshCartCount: () => void;
}

export const CartContext = createContext<CartContextProps>({
  cartCount: 0,
  refreshCartCount: () => {},
});

function UserLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.data);
  const [searchParams] = useSearchParams();
  const [cartCount, setCartCount] = useState<number>(0);

  const message = useFCM(FCMRoles.USER);

  // update FCM token
  useRegisterFCMToken('/user/update-fcm-token');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const tokenFromUrl = searchParams.get('token');

        // If a token is found in the URL, store it in the cookies
        if (tokenFromUrl) {
          Cookies.remove('authToken');
          Cookies.set('authToken', tokenFromUrl);
        }

        // If no user data, attempt to fetch the profile
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
    fetchCartCount();
  }, [user, dispatch, searchParams]);

  const fetchCartCount = async () => {
    try {
      const { data } = await axiosInstance.get('/user/cart/count');
      setCartCount(data?.totalQuantity || 0);
    } catch (error) {
      antdMessage.error('Failed to mark notification as read');
    }
  };

  const refreshCartCount = () => {
    fetchCartCount();
  };

  return (
    // Provide the FCM message to all child components via Context
    <OrderStatusContext.Provider value={message}>
      <div
        style={{ height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
      >
        <CartContext.Provider value={{ cartCount, refreshCartCount }}>
          <Header />
          {user?.id ? (
            <CallComponent userId={user?.id}>
              <div style={{ flexGrow: 1, overflow: 'hidden', overflowY: 'scroll' }}>{children}</div>
            </CallComponent>
          ) : (
            <div style={{ flexGrow: 1, overflow: 'hidden', overflowY: 'scroll' }}>{children}</div>
          )}
        </CartContext.Provider>
      </div>
    </OrderStatusContext.Provider>
  );
}

export const useOrderStatus = () => {
  const message = React.useContext(OrderStatusContext);
  return message;
};

export const useCartCount = () => useContext(CartContext);

export default UserLayout;
