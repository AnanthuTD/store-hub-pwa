import axiosInstance from '@/config/axios';
import { RootState } from '@/infrastructure/redux/store';
import ChatBox from '@/presentation/components/chat/ChatBox';
import ConversationList from '@/presentation/components/chat/ConversationList';
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [conversations, setConversations] = useState<Chat[]>([]);
  const admin = useSelector((state: RootState) => state.admin.data);
  const [recipient, setSelectedRecipient] = useState(null);

  const fetchMessages = async (conversationId) => {
    try {
      if (!conversationId) return;

      const { data } = await axiosInstance.get(`/admin/chats/${conversationId}/conversation`);
      setChats(data);
    } catch (error) {
      console.error('Error during Axios request:', error);
    }
  };

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const { data } = await axiosInstance.get(`/admin/chats/conversations`);
        console.log(data);
        setConversations(data);
      } catch (error) {
        console.error('Error during Axios request:', error);
      }
    };

    fetchConversations();
  }, []);

  const handleConversationClick = (conversation: Chat) => {
    const recipient = conversation?.participants.filter((participant) => participant !== admin?.id);

    console.log(recipient);

    setSelectedRecipient(recipient[0]);

    fetchMessages(conversation._id);
  };

  return (
    <Row style={{ overflow: 'hidden', height: '100%' }}>
      <Col style={{ overflow: 'hidden', height: '100%' }} md={12} lg={12}>
        <ConversationList
          conversations={conversations}
          onClick={handleConversationClick}
          userId={admin.id}
        />
      </Col>
      <Col style={{ overflow: 'hidden', height: '100%' }} md={12} lg={12}>
        <ChatBox recipient={recipient} pastChats={chats} senderId={admin.id} />
      </Col>
    </Row>
  );
}

export default ChatPage;
