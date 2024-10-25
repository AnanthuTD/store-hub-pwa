import React from 'react';
import { List, Button, message, Avatar } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { WishlistItem } from '../data/schemas/WishlistSchema';

interface WishlistProps {
  items: WishlistItem[];
  onRemoveItem: (productId: string) => void; // function to handle item removal
}

const Wishlist: React.FC<WishlistProps> = ({ items, onRemoveItem }) => {
  const handleRemove = (productId: string) => {
    onRemoveItem(productId);
    message.success('Item removed from wishlist');
  };

  return (
    <List
      header={<h3>Your Wishlist</h3>}
      bordered
      dataSource={items}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Button
              key={item.id}
              type="link"
              icon={<DeleteOutlined />}
              onClick={() => handleRemove(item.productId)}
              danger
            >
              Remove
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={item.image} />}
            title={item.productName}
            description={`Added on ${new Date(item.addedAt).toLocaleDateString()}`}
          />
        </List.Item>
      )}
    />
  );
};

export default Wishlist;
