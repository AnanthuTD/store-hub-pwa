import React, { useCallback, useEffect, useState } from 'react';
import { Card, Descriptions, Button, Spin, Result, Typography } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axiosInstance from '@/config/axios';

const { Text } = Typography;

interface OrderStatus {
  paymentStatus: string;
  paymentId: string;
  updatedAt: string;
  createdAt: string;
  totalAmount: number;
}

const OrderSuccessComponent: React.FC = () => {
  const [order, setOrder] = useState<OrderStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const navigate = useNavigate();

  const fetchOrderStatus = useCallback(async () => {
    try {
      if (!orderId) {
        setError('Order ID is missing in the URL parameters.');
        setLoading(false);
        return;
      }

      const response = await axiosInstance.get(`/user/order/status/${orderId}`);
      if (!response.data.order) throw new Error();
      setOrder(response.data.order);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch order details. Please try again later.');
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrderStatus();
  }, [fetchOrderStatus]);

  if (loading) {
    return (
      <Spin
        size="large"
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      />
    );
  }

  if (error) {
    return (
      <Result
        status="error"
        title="Something went wrong"
        subTitle={error}
        extra={
          <Button type="primary" onClick={fetchOrderStatus}>
            Try Again
          </Button>
        }
      />
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto', marginTop: '50px' }}>
      <Card>
        <Result
          status="success"
          title="Payment Success!"
          subTitle={`Payment ID: ${order?.paymentId}`}
          extra={[
            <Button key="track" type="primary">
              Track your order
            </Button>,
            <Button key="continue" type="default" onClick={() => navigate('/home')}>
              Continue Shopping
            </Button>,
          ]}
        />
        {order ? (
          <Descriptions title="Order Details" bordered column={1} style={{ marginTop: '20px' }}>
            <Descriptions.Item label="Payment Status">{order?.paymentStatus}</Descriptions.Item>
            <Descriptions.Item label="Payment ID">
              <Text copyable>{order?.paymentId}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Total Amount">{`$${order?.totalAmount}`}</Descriptions.Item>
            <Descriptions.Item label="Order Created At">
              {new Date(order.createdAt).toLocaleString()}
            </Descriptions.Item>
            {order?.paymentStatus === 'Completed' && (
              <Descriptions.Item label="Payment Time">
                {new Date(order.updatedAt).toLocaleString()}
              </Descriptions.Item>
            )}
          </Descriptions>
        ) : null}
      </Card>
    </div>
  );
};

export default OrderSuccessComponent;
