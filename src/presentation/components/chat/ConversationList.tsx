import React from 'react';
import { Avatar, List, Typography } from 'antd';
import VirtualList from 'rc-virtual-list'; // Make sure this is imported

// Sample data
const data = Array.from({ length: 20 }, (_, index) => ({
  _id: index.toString(), // Ensure keys are strings to avoid React key warnings
  userName: `John Doe ${index + 1}`,
  lastMessage: `Hey, how are you? Message number ${index + 1}`,
  avatarUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnM.png',
}));

// const ContainerHeight = 400;

const ConversationList: React.FC = () => (
  <div style={{ height: '100%', overflow: 'hidden', overflowY: 'scroll' }}>
    <List>
      <VirtualList
        data={data}
        // height={ContainerHeight}
        // itemHeight={47} // Adjust this if the item height doesn't match the actual rendered height
        itemKey="_id"
        // onScroll={onScroll} // Uncomment and define if you need scroll logic
      >
        {(item) => (
          <List.Item key={item._id}>
            <List.Item.Meta
              avatar={<Avatar src={item.avatarUrl} />}
              title={item.userName}
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
