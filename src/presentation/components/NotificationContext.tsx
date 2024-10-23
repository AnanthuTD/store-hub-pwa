import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { message } from 'antd';
import NotificationRepository, {
  UserRole,
} from '@/infrastructure/repositories/NotificationRepository';

// Define the shape of the context
interface NotificationContextProps {
  unreadNotificationCount: number;
  refreshUnreadNotificationCount: () => void;
}

// Create the context with default values
const NotificationContext = createContext<NotificationContextProps>({
  unreadNotificationCount: 0,
  refreshUnreadNotificationCount: () => {},
});

// Define a provider component that will wrap the app and provide notification data
export const NotificationProvider = ({
  children,
  role,
}: {
  children: ReactNode;
  role: UserRole;
}) => {
  const [unreadNotificationCount, setUnreadNotificationCount] = useState<number>(0);

  // Function to fetch the unread notification count from the server
  const fetchUnreadNotificationCount = async () => {
    try {
      const count = await new NotificationRepository(role).getUnreadNotificationCount();
      setUnreadNotificationCount(count);
    } catch (error) {
      message.error('Failed to fetch unread notification count');
    }
  };

  // Trigger a re-fetch of the unread notification count
  const refreshUnreadNotificationCount = () => {
    fetchUnreadNotificationCount();
  };

  // Fetch the unread notification count once when the component mounts
  useEffect(() => {
    fetchUnreadNotificationCount();
  }, []);

  // Provide the unread notification count and the refresh function to child components
  return (
    <NotificationContext.Provider
      value={{ unreadNotificationCount, refreshUnreadNotificationCount }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook to access the notification context easily
export const useNotification = () => useContext(NotificationContext);
