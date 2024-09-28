import React from 'react';
import { Card, Typography, Row, Col, Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const PaymentSuccess: React.FC = () => {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
      <Card
        style={{
          width: 400,
          textAlign: 'center',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}
        styles={{ body: { padding: '2rem' } }}
      >
        {/* Success Icon */}
        <CheckCircleOutlined style={{ fontSize: '3rem', color: '#52c41a' }} />

        {/* Payment Success Title */}
        <Title level={3} style={{ marginTop: '1rem' }}>
          Payment Success!
        </Title>
        <Title level={2} style={{ color: '#000' }}>
          IDR 1,000,000
        </Title>

        <div style={{ margin: '1.5rem 0' }}>
          <Row justify="space-between" style={{ marginBottom: '1rem' }}>
            <Col span={12} style={{ textAlign: 'left' }}>
              <Text strong>Ref Number:</Text>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Text>000085752257</Text>
            </Col>
          </Row>

          <Row justify="space-between" style={{ marginBottom: '1rem' }}>
            <Col span={12} style={{ textAlign: 'left' }}>
              <Text strong>Payment Time:</Text>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Text>25-02-2023, 13:22:16</Text>
            </Col>
          </Row>

          <Row justify="space-between" style={{ marginBottom: '1rem' }}>
            <Col span={12} style={{ textAlign: 'left' }}>
              <Text strong>Payment Method:</Text>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Text>UPI</Text>
            </Col>
          </Row>

          <Row justify="space-between">
            <Col span={12} style={{ textAlign: 'left' }}>
              <Text strong>Amount:</Text>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Text>IDR 1,000,000</Text>
            </Col>
          </Row>
        </div>

        {/* Track Order Button */}
        <Button type="primary" size="large" style={{ borderRadius: '8px' }}>
          Track Your Order
        </Button>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
