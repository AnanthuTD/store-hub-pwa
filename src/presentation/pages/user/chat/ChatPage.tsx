import axiosInstance from '@/config/axios';
import { RootState } from '@/infrastructure/redux/store';
import ChatBox, { Chat } from '@/presentation/components/chat/ChatBox';
import { Col, Row, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function ChatPage() {
  const adminId = '66d30359f1ed6b7dd8ac7709';
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const user = useSelector((state: RootState) => state.user.data);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (!adminId) return;

        setLoading(true);
        const { data } = await axiosInstance.get(`/user/chats/${adminId}/`);
        setChats(data);
      } catch (error) {
        console.error('Error during Axios request:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [adminId]);

  useEffect(() => {
    const markAsRead = async () => {
      if (chats[0]?.conversationId) {
        try {
          await axiosInstance.put(`/user/chats/mark-as-read/${chats[0].conversationId}`);
        } catch (error) {
          console.error('Failed to mark chat as read:', error);
        }
      }
    };

    if (chats.length > 0) {
      markAsRead();
    }
  }, [chats]);

  if (!user || !user.id) {
    return (
      <Row justify="center" align="middle" style={{ height: '100vh' }}>
        <Spin size="large" tip="Loading..." />
      </Row>
    );
  }

  if (loading) {
    return (
      <Row justify="center" align="middle" style={{ height: '100vh' }}>
        <Spin size="large" tip="Loading Chats..." />
      </Row>
    );
  }

  return (
    <Row style={{ overflow: 'hidden', height: '100%' }}>
      <Col style={{ overflow: 'hidden', height: '100%' }} md={24} lg={24}>
        <ChatBox recipient={adminId} pastChats={chats} senderId={user.id} />
      </Col>
    </Row>
  );
}

export default ChatPage;
