import { useEffect } from 'react';
import { getToken } from 'firebase/messaging';
import { messaging } from '@/infrastructure/firebase/firebaseConfig';
import axiosInstance from '@/config/axios';

const useRegisterFCMToken = (url: string) => {
  useEffect(() => {
    const registerFCMToken = async () => {
      try {
        const fcmToken = await getToken(messaging, { vapidKey: import.meta.env.VITE_VAPID_KEY });

        console.log('fcmToken: ', fcmToken);

        if (fcmToken) {
          // Send token to your server to associate it with the user
          await axiosInstance.post(url, {
            fcmToken,
          });
        }
      } catch (error) {
        console.error('Error getting FCM token:', error);
      }
    };

    registerFCMToken();
  }, [url]);
};

export default useRegisterFCMToken;
