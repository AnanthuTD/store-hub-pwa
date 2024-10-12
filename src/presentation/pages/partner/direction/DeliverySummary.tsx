import React, { useEffect, useState } from 'react';
import { Button, Card, Typography, Row, Col } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axiosInstance from '@/config/axios';

const DeliverySummary = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [earnings, setEarnings] = useState(0);

  const handleHomeRedirect = () => {
    navigate('/order');
  };

  const orderId = searchParams.get('orderId');

  useEffect(() => {
    axiosInstance.get(`/partner/${orderId}/earnings`).then((response) => {
      const { earnings } = response.data;
      setEarnings(earnings);
    });
  }, [orderId]);

  return (
    <div style={{ padding: '20px' }}>
      <Card bordered={false} style={{ maxWidth: 600, margin: '0 auto' }}>
        <Typography.Title level={4}>Delivery Summary</Typography.Title>

        <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
          <Col span={12}>
            <Typography.Text strong>Order ID:</Typography.Text>
          </Col>
          <Col span={12}>
            <Typography.Text>{orderId}</Typography.Text>
          </Col>

          <Col span={12}>
            <Typography.Text strong>Total Amount:</Typography.Text>
          </Col>

          <Col span={12}>
            <Typography.Text strong>Earnings from Delivery:</Typography.Text>
          </Col>
          <Col span={12}>
            <Typography.Text>{earnings} Rs</Typography.Text>
          </Col>
        </Row>

        <Button type="primary" onClick={handleHomeRedirect}>
          Go to Home Page
        </Button>
      </Card>
    </div>
  );
};

export default DeliverySummary;
