import ChatBox from '@/presentation/components/chat/ChatBox';
import ConversationList from '@/presentation/components/chat/ConversationList';
import { Col, Row } from 'antd';
import React from 'react';

function ChatPage() {
  return (
    <Row style={{ overflow: 'hidden', height: '100%' }}>
      <Col style={{ overflow: 'hidden', height: '100%' }} md={12} lg={12}>
        <ConversationList />
      </Col>
      <Col style={{ overflow: 'hidden', height: '100%' }} md={12} lg={12}>
        <ChatBox recipient="asf" key={'sdf'} />
      </Col>
    </Row>
  );
}

export default ChatPage;
