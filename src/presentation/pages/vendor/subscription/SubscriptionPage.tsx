import axiosInstance from '@/config/axios';
import { Badge, Button, Card, Divider, message, Modal, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import SubscriptionPaymentModal from './SubscriptionPaymentModal';
import SubscriptionTable from './SubscriptionTable';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper/modules';

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

  const checkCanSubscribe = async () => {
    try {
      await axiosInstance.get('/vendor/subscriptions/canSubscribe');
      return true;
    } catch (error) {
      // Error handling
      console.error('Error checking product addition:', error);

      // Displaying error modal
      Modal.error({
        title: 'Error',
        content: error.response?.data?.message || 'An unexpected error occurred. Please try again.',
      });

      return false;
    }
  };

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
    checkCanSubscribe();

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
      const canSubscribe = await checkCanSubscribe();
      if (!canSubscribe) {
        return;
      }
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
      <Card style={{ padding: '2rem', position: 'relative' }}>
        <Swiper
          slidesPerView="auto"
          spaceBetween={20}
          navigation={false}
          pagination={{ clickable: true }}
          modules={[Pagination, Navigation]}
          style={{ padding: '1rem 0' }}
        >
          {subscriptionPlans.map((plan) => (
            <SwiperSlide key={plan.planId} style={{ width: '300px' }}>
              <Badge.Ribbon
                text={activePlan?.planId === plan.planId ? 'Active' : null}
                color={activePlan?.planId === plan.planId ? 'green' : undefined}
              >
                <Card
                  style={{
                    padding: '1rem',
                    textAlign: 'center',
                    opacity: activePlan ? (plan.active ? 1 : 0.5) : 1,
                    pointerEvents: activePlan ? (plan.active ? 'auto' : 'none') : 'auto',
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
                    disabled={activePlan ? !plan.active : false}
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
            </SwiperSlide>
          ))}
        </Swiper>
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
