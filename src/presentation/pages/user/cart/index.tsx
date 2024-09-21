import React, { useEffect, useState } from 'react';
import { List, Typography, Button, Row, Col, Image, InputNumber, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import PaymentSummary from './PaymentSummary';
import {
  fetchCartItems,
  incrementQuantity,
  removeProduct,
} from '@/infrastructure/services/user/cart.service';

const { Title, Text } = Typography;

// Define the type for cart items
interface CartItem {
  _id: string;
  productId: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  quantity: number;
  variant: {
    _id: string;
    averagePrice: number;
  };
}

const CartComponent = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    fetchCartItems().then((data) => setCartItems(data));
  }, []);

  const handleIncrement = (item: CartItem, quantity: number | null) => {
    if (quantity !== null) {
      incrementQuantity({ productId: item.productId, variantId: item.variant._id, quantity })
        .then((success) => {
          if (success) {
            const updatedItems = cartItems.map((cartItem) =>
              cartItem._id === item._id ? { ...cartItem, quantity } : cartItem,
            );
            setCartItems(updatedItems);
          } else {
            message.error('Failed to update quantity');
          }
        })
        .catch(() => message.error('Failed to update quantity'));
    }
  };

  const handleRemove = (item: CartItem) => {
    removeProduct(item.productId, item.variant._id).then((success) => {
      if (success) {
        setCartItems(cartItems.filter((cartItem) => cartItem._id !== item._id));
        message.success('Product removed from cart');
      } else {
        message.error('Failed to remove product from cart');
      }
    });
  };

  return (
    <Row gutter={[24, 16]} style={{ padding: '20px' }}>
      <Col span={16}>
        <Title level={4}>Shopping Continue</Title>
        <Text>
          You have {cartItems.length} item{cartItems.length > 1 ? 's' : ''} in your cart
        </Text>
        <List
          itemLayout="horizontal"
          dataSource={cartItems}
          renderItem={(item) => (
            <List.Item
              actions={[
                <InputNumber
                  key={'count' + item._id}
                  min={1}
                  max={10}
                  defaultValue={item.quantity}
                  onChange={(value) => handleIncrement(item, value)}
                />,
                <Text key={'avg-price' + item._id}>
                  average price: ${item.variant.averagePrice}
                </Text>,
                <Button
                  key={'delete-button' + item._id}
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemove(item)}
                />,
              ]}
              style={{
                borderBottom: '1px solid #f0f0f0',
                padding: '16px 0',
              }}
            >
              <List.Item.Meta
                avatar={<Image width={80} src={item.images?.[0]} />}
                title={<Title level={5}>{item.name}</Title>}
                description={<Text>{item.description}</Text>}
              />
            </List.Item>
          )}
        />
      </Col>

      <Col span={8}>
        <PaymentSummary cartItems={cartItems} />
      </Col>
    </Row>
  );
};

export default CartComponent;
