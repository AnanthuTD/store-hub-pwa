import axiosInstance from '@/config/axios';
import { Badge, Button, Card, Divider, message, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import SubscriptionPaymentModal from './SubscriptionPaymentModal';
import SubscriptionTable from './SubscriptionTable';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';

const socket = io(`${import.meta.env.VITE_API_BASE_URL}/vendor`, {
  auth: {
    token: Cookies.get('authToken'),
  },
  transports: ['websocket'],
});

function SubscriptionPage() {
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [activePlan, setActivePlan] = useState(null);

  const fetchSubscriptionPlans = async () => {
    try {
      const response = await axiosInstance.get('/vendor/subscriptions/plans');
      const { plans, activeSubscription } = response.data;

      setSubscriptionPlans(plans);

      setActivePlan(activeSubscription);
    } catch (err) {
      console.error(err);
      message.error('Failed to fetch subscription plans!');
    }
  };

  useEffect(() => {
    fetchSubscriptionPlans();

    socket.on('subscription:status:update', () => {
      fetchSubscriptionPlans();
    });

    return () => {
      socket.off('subscription:status:update');
    };
  }, []);

  const handleSubscription = async (planId) => {
    try {
      const response = await axiosInstance.post('/vendor/subscriptions/subscribe', { planId });
      setSubscriptionData(response.data);
      console.log(response);
    } catch (err) {
      console.error(err);
      message.error(err.response.data.message || 'Failed to subscribe!');
    }
  };

  const cancelSubscription = async () => {
    try {
      const response = await axiosInstance.post('/vendor/subscriptions/cancel');
      setSubscriptionData({ ...subscriptionData, status: 'cancelled' });
      setActivePlan(null);
      console.log(response);
    } catch (err) {
      console.error(err);
      message.error(err.response.data.message || 'Failed to cancel subscribe!');
    }
  };

  return (
    <div>
      <Card style={{ padding: '2rem' }}>
        <Space size={'large'} align="center" style={{ width: '100%' }}>
          {/* Map over the subscriptionPlans to create a card for each plan */}
          {subscriptionPlans.map((plan) => (
            <Badge.Ribbon
              text={activePlan?.planId === plan.planId ? 'Active' : null}
              key={plan.planId}
              color={activePlan?.planId === plan.planId ? 'green' : undefined} // Optional: Set a color for the active badge
            >
              <Card
                style={{
                  padding: '1rem',
                  width: '300px',
                  textAlign: 'center',
                  opacity: activePlan ? (plan.active ? 1 : 0.5) : 1, // Opacity based on whether the plan is active
                  pointerEvents: activePlan ? (plan.active ? 'auto' : 'none') : 'auto', // Enable pointer events only for active plans
                }}
              >
                <Typography.Text type="secondary">{plan.name} Plan</Typography.Text>
                <Typography.Title level={3}>₹ {plan.price} / month</Typography.Title>
                <Typography.Paragraph>{plan.productLimit} products allowed</Typography.Paragraph>
                <Typography.Paragraph>Duration: {plan.duration} months</Typography.Paragraph>

                <Button
                  type="primary"
                  onClick={() => {
                    if (!plan.active) {
                      handleSubscription(plan.planId);
                    } else {
                      if (!activePlan) {
                        message.error('Subscription not found!');
                        return;
                      }

                      if (activePlan && activePlan.shortUrl) {
                        window.open(activePlan.shortUrl, '_blank');
                      } else {
                        message.error('Short URL not available for this subscription.');
                      }
                    }
                  }}
                  disabled={activePlan ? !plan.active : false} // Disable if the plan is not active
                >
                  {activePlan?.planId === plan.planId ? 'Update Payment' : 'Pay Now'}
                </Button>

                {activePlan?.planId === plan.planId && (
                  <Button
                    type="primary"
                    onClick={() => {
                      if (plan.active) {
                        if (!activePlan) {
                          message.error('Subscription not found!');
                          return;
                        }

                        cancelSubscription();
                      }
                    }}
                  >
                    Cancel Subscription
                  </Button>
                )}
              </Card>
            </Badge.Ribbon>
          ))}
        </Space>
      </Card>

      <Divider>Subscription History</Divider>

      {subscriptionData && (
        <SubscriptionPaymentModal
          onClose={() => setSubscriptionData(null)}
          subscriptionData={subscriptionData}
          key={'sub-history'}
        />
      )}

      {/* Subscription History */}
      <SubscriptionTable />
    </div>
  );
}

export default SubscriptionPage;
