import React from 'react';
import { List, Typography, Button, Row, Col, Image } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import PaymentSummary from './PaymentSummary';
import QuantitySelector from './QuantitySelector';
import useCart, { CartItem } from './hooks/useCart';

const { Title, Text } = Typography;

const CartComponent = () => {
  const {
    cartItems,
    incrementItemQuantity,
    decrementItemQuantity,
    removeItemFromCart,
    totalPrice,
    itemCount,
  } = useCart();

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
          renderItem={(item: CartItem) => (
            <List.Item
              actions={[
                <QuantitySelector
                  key={'quantity-selector' + item._id}
                  item={item}
                  min={1}
                  max={10}
                  onIncrement={incrementItemQuantity}
                  onDecrement={decrementItemQuantity}
                />,
                !item.inStock ? (
                  <Text key={'out-of-stock' + item._id} type="danger">
                    Out of Stock
                  </Text>
                ) : null,

                <Text key={'avg-price' + item._id}>Rs{item.totalPrice}</Text>,
                <Button
                  key={'delete-button' + item._id}
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={() => removeItemFromCart(item)}
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
        <PaymentSummary cartItems={cartItems} totalPrice={totalPrice} itemCount={itemCount} />
      </Col>
    </Row>
  );
};

export default CartComponent;
