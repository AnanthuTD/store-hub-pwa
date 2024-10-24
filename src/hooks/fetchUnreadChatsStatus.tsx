import { useState, useEffect } from 'react';
import { message } from 'antd';
import axiosInstance from '@/config/axios';
import { io } from 'socket.io-client';

const socket = io(`${import.meta.env.VITE_API_BASE_URL}/notifications`);

const useChat = (role: 'user' | 'admin', userId) => {
  const [hasUnreadChats, setHasUnreadChats] = useState<boolean>(false);

  // Function to fetch unread chat status from the API
  const fetchUnreadChatStatus = async () => {
    try {
      const response = await axiosInstance.get(`/${role}/chats/unread-messages`);
      const { hasUnread } = response.data; // Assuming API returns { hasUnread: boolean }
      setHasUnreadChats(hasUnread);
    } catch (error) {
      message.error('Failed to fetch unread chat status');
    }
  };

  useEffect(() => {
    if (userId) {
      socket.emit('join', userId);

      socket.on('chatMessage', () => {
        fetchUnreadChatStatus();
      });

      // Initial fetch when the component mounts
      fetchUnreadChatStatus();

      return () => {
        socket.off('chatMessage');
      };
    }
  }, [userId]);

  return { hasUnreadChats };
};

export default useChat;
