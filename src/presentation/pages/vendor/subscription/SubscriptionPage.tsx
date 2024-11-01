import axiosInstance from '@/config/axios';
import { Badge, Card, Divider, message, Modal, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import SubscriptionPaymentModal from './SubscriptionPaymentModal';
import SubscriptionTable from './SubscriptionTable';
import { io, Socket } from 'socket.io-client';
import Cookies from 'js-cookie';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper/modules';
import ActiveSubscriptionModal from './ActiveSubscriptionModal';
import PaynowButton from './PaynowButton';

interface SubscriptionPlan {
  planId: string;
  name: string;
  price: number;
  productLimit: number;
  duration: number;
  active: boolean;
}

interface SubscriptionData {
  status: string;
  shortUrl: string;
  subscriptionType: string;
  amount: number;
}

export interface ActivePlan extends SubscriptionPlan {
  startDate: Date;
  endDate: Date;
  chargeAt: Date;
  remainingCount: number;
  totalCount: number;
  cancelledAt?: Date | null;
  amount: number;
  shortUrl: string;
  status: string;
  currentEnd: Date;
  currentStart: Date;
}

const socket: Socket = io(`${import.meta.env.VITE_API_BASE_URL}/vendor`, {
  auth: {
    token: Cookies.get('authToken'),
  },
  transports: ['websocket'],
});

function SubscriptionPage() {
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);
  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>([]);
  const [activePlan, setActivePlan] = useState<ActivePlan | null>(null);

  const checkCanSubscribe = async (): Promise<boolean> => {
    try {
      await axiosInstance.get('/vendor/subscriptions/canSubscribe');
      return true;
    } catch (error: any) {
      console.error('Error checking product addition:', error);

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

  const handleSubscription = async (planId: string) => {
    try {
      const canSubscribe = await checkCanSubscribe();
      if (!canSubscribe) return;

      const response = await axiosInstance.post('/vendor/subscriptions/subscribe', { planId });
      setSubscriptionData(response.data);
      console.log(response);
    } catch (err: any) {
      console.error(err);
      message.error(err.response?.data?.message || 'Failed to subscribe!');
    }
  };

  const cancelSubscription = async () => {
    try {
      const response = await axiosInstance.post('/vendor/subscriptions/cancel');
      setSubscriptionData((prevData) => (prevData ? { ...prevData, status: 'cancelled' } : null));
      setActivePlan(null);
      console.log(response);
    } catch (err: any) {
      console.error(err);
      message.error(err.response?.data?.message || 'Failed to cancel subscription!');
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

                  {activePlan && plan.active ? (
                    <ActiveSubscriptionModal
                      activePlan={activePlan}
                      cancelSubscription={cancelSubscription}
                    />
                  ) : (
                    <PaynowButton
                      activePlan={activePlan}
                      onSubscribe={handleSubscription}
                      plan={plan}
                      key={plan.planId}
                    />
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
