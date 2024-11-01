import React, { useState } from 'react';
import { Button, Modal, Card, Typography, Divider } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import { ActivePlan } from './SubscriptionPage';

const { Title, Text } = Typography;

interface ActiveSubscriptionModalProps {
  activePlan: ActivePlan | null;
  cancelSubscription: () => void;
}

const ActiveSubscriptionModal: React.FC<ActiveSubscriptionModalProps> = ({
  activePlan,
  cancelSubscription,
}) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        View Subscription Details
      </Button>
      <Modal
        title="Active Subscription Details"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Card style={{ padding: '2rem' }}>
          <Title level={4}>Subscription</Title>
          <SubscriptionDetails activePlan={activePlan} cancelSubscription={cancelSubscription} />
        </Card>
      </Modal>
    </>
  );
};

// Define props for SubscriptionDetails component
interface SubscriptionDetailsProps {
  activePlan: ActivePlan | null;
  cancelSubscription: () => void;
}

const SubscriptionDetails: React.FC<SubscriptionDetailsProps> = ({
  activePlan,
  cancelSubscription,
}) => {
  if (!activePlan) return null;

  const isCanceled = !!activePlan.cancelledAt;

  return (
    <>
      <Text type="secondary">Status: {isCanceled ? 'Canceled' : activePlan.status}</Text>
      <Divider />
      <Text>
        <strong>Start Date:</strong> {new Date(activePlan.startDate).toLocaleDateString()}
      </Text>
      <br />
      <Text>
        <strong>End Date:</strong> {new Date(activePlan.endDate).toLocaleDateString()}
      </Text>
      <Divider />
      <Text>
        <strong>Amount:</strong> ₹ {activePlan.amount} per billing cycle
      </Text>
      <br />
      <Text>
        <strong>Next Billing Date:</strong> {new Date(activePlan.chargeAt).toLocaleDateString()}
      </Text>
      <Divider />
      <Text>
        <strong>Remaining Billing Cycles:</strong>{' '}
        {isCanceled ? 'N/A' : `${activePlan.remainingCount} / ${activePlan.totalCount}`}
      </Text>
      <Divider />

      {isCanceled ? (
        <Paragraph>
          Your subscription has been <Text strong>canceled</Text> and will continue until{' '}
          <Text strong>{new Date(activePlan.currentEnd || '').toLocaleDateString()}</Text>.
        </Paragraph>
      ) : (
        <>
          <Button
            type="primary"
            onClick={() => window.open(activePlan.shortUrl, '_blank')}
            disabled={!activePlan.shortUrl}
          >
            Update Payment
          </Button>
          <Button type="default" onClick={cancelSubscription} style={{ marginLeft: '1rem' }} danger>
            Cancel Subscription
          </Button>
        </>
      )}
    </>
  );
};

export default ActiveSubscriptionModal;
