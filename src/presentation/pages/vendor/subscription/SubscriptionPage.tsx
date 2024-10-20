import axiosInstance from '@/config/axios';
import { Button, Card, Divider, message, Space, Typography } from 'antd';
import React, { useState } from 'react';
import SubscriptionPaymentModal from './SubscriptionPaymentModal';
import SubscriptionTable from './SubscriptionTable';

function SubscriptionPage() {
  const [subscriptionData, setSubscriptionData] = useState(null);

  const handleSubscription = async () => {
    try {
      const response = await axiosInstance.post('/vendor/subscriptions/subscribe');
      setSubscriptionData(response.data);

      console.log(response);
    } catch (err) {
      console.error(err);
      message.error('Failed to subscribe!');
    }
  };

  return (
    <div>
      <Card style={{ padding: '2rem' }}>
        <Space direction="vertical" align="center">
          <Card style={{ padding: '1rem' }}>
            <Typography.Text type="secondary">Premium Plan</Typography.Text>
            <Typography.Title level={3}>₹ 5000</Typography.Title>
          </Card>
          <Button type="primary" onClick={handleSubscription}>
            Pay Now
          </Button>

          {subscriptionData && (
            <SubscriptionPaymentModal
              onClose={() => setSubscriptionData(null)}
              subscriptionData={subscriptionData}
              key={'sub'}
            />
          )}
        </Space>
      </Card>

      <Divider>Subscription History</Divider>

      {/* Subscription History */}

      <SubscriptionTable />
    </div>
  );
}

export default SubscriptionPage;
