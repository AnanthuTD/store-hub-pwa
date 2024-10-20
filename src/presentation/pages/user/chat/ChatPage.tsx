import axiosInstance from '@/config/axios';
import { RootState } from '@/infrastructure/redux/store';
import ChatBox from '@/presentation/components/chat/ChatBox';
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function ChatPage() {
  const adminId = '66d30359f1ed6b7dd8ac7709';
  const [chats, setChats] = useState<Chat[]>([]);
  const user = useSelector((state: RootState) => state.user.data);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (!adminId) return;

        const { data } = await axiosInstance.get(`/user/chats/${adminId}/`);
        setChats(data);
      } catch (error) {
        console.error('Error during Axios request:', error);
      }
    };

    fetchMessages();
  }, [adminId]);

  return (
    <Row style={{ overflow: 'hidden', height: '100%' }}>
      <Col style={{ overflow: 'hidden', height: '100%' }} md={24} lg={24}>
        <ChatBox recipient={adminId} pastChats={chats} key={'sdf'} senderId={user.id} />
      </Col>
    </Row>
  );
}

export default ChatPage;
