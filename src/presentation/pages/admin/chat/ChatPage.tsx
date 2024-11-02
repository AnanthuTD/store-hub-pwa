import axiosInstance from '@/config/axios';
import { RootState } from '@/infrastructure/redux/store';
import { Col, Row, Spin } from 'antd';
import React, { useEffect, useState, Suspense, useCallback } from 'react';
import { useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { Chat } from '@/presentation/components/chat/ChatBox';
import { Conversation } from '@/presentation/components/chat/ConversationList';

// Lazy load components
const ChatBox = React.lazy(() => import('@/presentation/components/chat/ChatBox'));
const ConversationList = React.lazy(
  () => import('@/presentation/components/chat/ConversationList'),
);

function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const admin = useSelector((state: RootState) => state.admin?.data);
  const [recipient, setSelectedRecipient] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch messages for a specific conversation, with debouncing to avoid multiple quick calls
  const fetchMessages = useCallback(
    debounce(async (conversationId: string) => {
      if (!conversationId) return;

      try {
        const { data } = await axiosInstance.get(`/admin/chats/${conversationId}/conversation`);
        setChats(data);
      } catch (error) {
        console.error('Error during Axios request:', error);
      }
    }, 300),
    [],
  );

  // Fetch conversations on initial load
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const { data } = await axiosInstance.get(`/admin/chats/conversations`);
        setConversations(data);
        setLoading(false);
      } catch (error) {
        console.error('Error during Axios request:', error);
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  // Handle selection of a conversation
  const handleConversationClick = (conversation: Conversation) => {
    const recipientId = conversation?.participants.find((participant) => participant !== admin?.id);
    setSelectedRecipient(recipientId || null);

    if (conversation._id) {
      fetchMessages(conversation._id);
    }

    // Mark the conversation as read
    axiosInstance.put(`/admin/chats/mark-as-read/${conversation._id}`).catch(() => {});
  };

  // Show loading spinner if admin data is not ready
  if (!admin || !admin.id) {
    return (
      <Row justify="center" align="middle" style={{ height: '100vh' }}>
        <Spin size="large" tip="Loading..." />
      </Row>
    );
  }

  // Show loading spinner while fetching conversations
  if (loading) {
    return (
      <Row justify="center" align="middle" style={{ height: '100vh' }}>
        <Spin size="large" tip="Loading Conversations..." />
      </Row>
    );
  }

  return (
    <Row style={{ overflow: 'hidden', height: '100%' }}>
      <Suspense fallback={<Spin tip="Loading Conversations..." />}>
        <Col style={{ overflow: 'hidden', height: '100%' }} md={12} lg={12}>
          <ConversationList
            conversations={conversations}
            onClick={handleConversationClick}
            userId={admin.id || ''}
          />
        </Col>
      </Suspense>
      {recipient && (
        <Suspense fallback={<Spin tip="Loading Chat..." />}>
          <Col style={{ overflow: 'hidden', height: '100%' }} md={12} lg={12}>
            <ChatBox recipient={recipient} pastChats={chats} senderId={admin.id || ''} />
          </Col>
        </Suspense>
      )}
    </Row>
  );
}

export default React.memo(ChatPage);
