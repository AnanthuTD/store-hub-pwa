import React from 'react';
import { Avatar, List, Typography } from 'antd';
import VirtualList from 'rc-virtual-list'; // Make sure this is imported

const ConversationList: React.FC = ({ conversations, onClick }) => (
  <div style={{ height: '100%', overflow: 'hidden', overflowY: 'scroll' }}>
    <List>
      <VirtualList data={conversations} itemKey="_id">
        {(item) => (
          <List.Item key={item._id} onClick={() => onClick(item)}>
            <List.Item.Meta
              avatar={
                <Avatar src={'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnM.png'} />
              }
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
