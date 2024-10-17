import React from 'react';
import { Card, Row, Space, Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

interface PaymentSummaryProps {
  totalPrice: number;
  itemCount: number;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({ totalPrice, itemCount }) => {
  const navigate = useNavigate();
  return (
    <Card style={{ borderRadius: '8px', backgroundColor: '#f0f5ff' }}>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Row justify="space-between">
          <Text>Subtotal</Text>
          <Text>Rs {totalPrice}</Text>
        </Row>
        <Row justify="space-between">
          <Text>Proceed to checkout {itemCount} items</Text>
        </Row>
        <Button
          block
          type="primary"
          style={{ background: '#22d3ee' }}
          onClick={() => navigate('/checkout')}
        >
          Checkout
        </Button>
        {/*  <Button block type="default" style={{ background: '#a7f3d0' }}>
          Home Deliver + $10 delivery
        </Button> */}

        {/*  <Card style={{ borderRadius: '8px' }}>
          <Text>Shops to Visit</Text>
          <List>
            <List.Item>shop 1 - 1 KM</List.Item>
            <List.Item>shop 2 - 0.5 KM</List.Item>
            <List.Item>shop 3 - 0.2 KM</List.Item>
          </List>
          <Row justify="space-between">
            <Text>Total Distance</Text>
            <Text>1.7 KM</Text>
          </Row>
          <Row justify="space-between">
            <Text>Estimated Time</Text>
            <Text>20 minutes</Text>
          </Row>
        </Card> */}
      </Space>
    </Card>
  );
};

export default PaymentSummary;
