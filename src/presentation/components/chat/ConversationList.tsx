import React from 'react';
import { Avatar, List, Typography } from 'antd';
import VirtualList from 'rc-virtual-list';

export interface Conversation {
  _id: string;
  name: string;
  lastMessage: string;
  avatar: string;
  participants: string[];
}

interface ConversationListProps {
  conversations: Conversation[];
  onClick: (conversation: Conversation) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({ conversations, onClick }) => (
  <div style={{ height: '100%', overflowY: 'auto' }}>
    <List style={{ margin: 0 }}>
      <VirtualList data={conversations} itemKey="_id" style={{ height: '100%' }}>
        {(item) => (
          <List.Item key={item._id} onClick={() => onClick(item)} style={{ cursor: 'pointer' }}>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={item.name}
              description={
                <Typography.Text type="secondary" ellipsis>
                  {item.lastMessage}
                </Typography.Text>
              }
            />
          </List.Item>
        )}
      </VirtualList>
    </List>
  </div>
);

export default ConversationList;
