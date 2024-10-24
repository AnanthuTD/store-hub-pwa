import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { message } from 'antd';
import { io } from 'socket.io-client';
import NotificationRepository, {
  UserRole,
} from '@/infrastructure/repositories/NotificationRepository';

const socket = io(`${import.meta.env.VITE_API_BASE_URL}/notifications`);

interface NotificationContextProps {
  unreadNotificationCount: number;
  refreshUnreadNotificationCount: () => void;
}

const NotificationContext = createContext<NotificationContextProps>({
  unreadNotificationCount: 0,
  refreshUnreadNotificationCount: () => {},
});

export const NotificationProvider = ({
  children,
  role,
  userId,
}: {
  children: ReactNode;
  role: UserRole;
  userId: string;
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

  // Set up socket connection and listen for new notifications
  useEffect(() => {
    // Join the room with the userId to receive personal notifications
    if (userId) {
      socket.emit('join', userId);
    }

    // Listen for new notifications
    socket.on('notification', () => {
      refreshUnreadNotificationCount();
    });

    return () => {
      socket.off('notification');
    };
  }, [userId]);

  // Fetch the unread notification count once when the component mounts
  useEffect(() => {
    fetchUnreadNotificationCount();
  }, []);

  return (
    <NotificationContext.Provider
      value={{ unreadNotificationCount, refreshUnreadNotificationCount }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
