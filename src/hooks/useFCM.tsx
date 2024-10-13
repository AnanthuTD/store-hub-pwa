import { useEffect } from 'react';
import { getMessaging, onMessage } from 'firebase/messaging';
import { notification } from 'antd';

export enum FCMRoles {
  ADMIN = 'admin',
  VENDOR = 'vendor',
  DELIVERY_PARTNER = 'delivery_partner',
  USER = 'user',
}

interface FCMMessagePayload {
  title: string;
  body: string;
  role: FCMRoles;
}

const useFCM = (role: FCMRoles) => {
  useEffect(() => {
    const messaging = getMessaging();

    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);

      const { title, body, role: messageRole } = payload.data as FCMMessagePayload;

      // Check if the role in the payload matches the current user's role
      if (messageRole !== role) return;

      handleForegroundMessage({ title, body, role: messageRole });
    });

    return () => {
      unsubscribe();
    };
  }, [role]);
};

const handleForegroundMessage = (payload: FCMMessagePayload) => {
  const { title, body, role } = payload;

  notification.open({
    message: title,
    description: (
      <div>
        <p>{body}</p>
        <p>
          <strong>Role:</strong> {role}
        </p>
      </div>
    ),
    onClick: () => {
      console.log('Notification Clicked!');
    },

    placement: 'topRight',
    duration: 3,
  });
};

export default useFCM;
