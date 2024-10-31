import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { Button } from '@mui/material';
import { message } from 'antd'; // Import Ant Design message
import axiosInstance from '@/config/axios';
import { useDispatch } from 'react-redux';
import { login as loginUser } from '@/infrastructure/redux/slices/user/userSlice';
import { login as loginVendor } from '@/infrastructure/redux/slices/vendor/vendorSlice';
import { login as loginAdmin } from '@/infrastructure/redux/slices/admin/adminSlice';
import axios from 'axios';

interface ReactAuthGoogleProps {
  api: string;
  role: 'user' | 'vendor' | 'admin'; // The role of the user (user, vendor, admin)
}

const ReactAuthGoogle: React.FC<ReactAuthGoogleProps> = ({ api, role }) => {
  const dispatch = useDispatch();
  const url = `/${api}`;

  const responseGoogle = async (authResult: { code?: string; [key: string]: any }) => {
    try {
      if (authResult.code) {
        console.log(authResult.code);

        // Call the API with the auth code
        const { data } = await axiosInstance.get(`${url}?code=${authResult.code}`);

        // Dispatch the login action based on role
        if (data && data.user) {
          switch (role) {
            case 'user':
              dispatch(loginUser(data.user));
              break;
            case 'vendor':
              dispatch(loginVendor(data.user));
              break;
            case 'admin':
              dispatch(loginAdmin(data.user));
              break;
            default:
              throw new Error('Invalid user role');
          }
          message.success('Successfully logged in');
        } else {
          throw new Error('User data not found in response');
        }
      } else {
        console.error('Auth result does not contain code:', authResult);
        throw new Error('No code returned from Google');
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        message.error(e.response?.data?.error || 'Failed to login with Google');
        return;
      } else {
        message.error('Login failed. Please try again.');
      }
      console.error('Error during Google login:', e);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: (error) => {
      console.error('Google login error:', error);
      message.error('Login failed. Please try again.');
    },
    flow: 'auth-code',
  });

  return (
    <Button
      variant="outlined"
      startIcon={<img src="/google-logo.svg" alt="Google Logo" />}
      sx={{
        // backgroundColor: '#505ABB',
        borderRadius: '50px',
        padding: '10px 20px',
        borderColor: 'rgba(0, 0, 0, 0.2)',
        textTransform: 'none',
        fontWeight: 'normal',
        color: 'black',
        '&:hover': {
          borderColor: 'rgba(0, 0, 0, 0.4)',
        },
      }}
      fullWidth
      onClick={googleLogin}
    >
      Sign up with your Google account
    </Button>
  );
};

export default ReactAuthGoogle;
