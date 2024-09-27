import React, { useEffect, useState } from 'react';
import { List, Typography, Button, Row, Col, Image, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import PaymentSummary from './PaymentSummary';
import QuantitySelector from './QuantitySelector'; // Import the new component
import {
  decrementProductInCart,
  fetchCartItems,
  incrementQuantity,
  removeProduct,
} from '@/infrastructure/services/user/cart.service';

const { Title, Text } = Typography;

// Define the type for cart items
export interface CartItem {
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

  const handleIncrement = async (item: CartItem) => {
    try {
      const totalPrice = await incrementQuantity({
        productId: item._id,
        variantId: item.variant._id,
      });

      const cartItem = cartItems.find((cartItem) => item.variant._id === cartItem.variant._id);
      if (cartItem) {
        const updatedCartItems = cartItems.map((cartItem) =>
          cartItem.variant._id === item.variant._id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
                totalPrice,
              }
            : cartItem,
        );
        setCartItems(updatedCartItems);
      }

      return true;
    } catch (error) {
      message.error((error as Error).message || 'Failed to update quantity');
      return false;
    }
  };

  const handleDecrement = async (item: CartItem) => {
    try {
      const totalPrice = await decrementProductInCart({
        productId: item._id,
        variantId: item.variant._id,
      });

      const cartItem = cartItems.find((cartItem) => item.variant._id === cartItem.variant._id);
      if (cartItem) {
        const updatedCartItems = cartItems.map((cartItem) =>
          cartItem.variant._id === item.variant._id
            ? {
                ...cartItem,
                quantity: cartItem.quantity - 1,
                totalPrice,
              }
            : cartItem,
        );
        setCartItems(updatedCartItems);
      }

      return true;
    } catch (error) {
      message.error((error as Error).message || 'Failed to update quantity');
      return false;
    }
  };

  const handleRemove = (item: CartItem) => {
    removeProduct(item._id, item.variant._id).then((success) => {
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
                <QuantitySelector
                  key={'quantity-selector' + item._id}
                  item={item}
                  min={1}
                  max={10}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                />,
                <Text key={'avg-price' + item._id}>${item.totalPrice}</Text>,
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
