import React, { useState } from 'react';
import { Modal, Button, Typography, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const SubscriptionPaymentModal = ({ subscriptionData, onClose }) => {
  const [isModalVisible, setIsModalVisible] = useState(true);

  const handleClose = () => {
    setIsModalVisible(false);
    onClose();
  };

  return (
    <Modal
      title="Complete Your Subscription"
      open={isModalVisible}
      onCancel={handleClose}
      footer={null}
      closable
    >
      <Typography>
        <Title level={4}>Subscription: {subscriptionData.subscriptionType}</Title>
        {subscriptionData.amount && (
          <Paragraph>
            <Text strong>Amount: </Text> ₹{subscriptionData.amount}
          </Paragraph>
        )}
        <SubscriptionStatus subscriptionData={subscriptionData} />
      </Typography>
    </Modal>
  );
};

const SubscriptionStatus = ({ subscriptionData }) => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(subscriptionData.shortUrl);
    message.success('Payment link copied to clipboard!');
  };

  const subscriptionStatus = subscriptionData.status;
  const isCanceled = !!subscriptionData.cancelledAt;

  return (
    <>
      <Paragraph>
        <Text strong>Status: </Text>
        <Text type={subscriptionStatus === 'pending' ? 'warning' : 'success'}>
          {subscriptionStatus?.charAt(0).toUpperCase() + subscriptionStatus?.slice(1)}
        </Text>
      </Paragraph>

      {isCanceled ? (
        <Paragraph>
          Your subscription has been <Text strong>canceled</Text> and will continue until{' '}
          <Text strong>{new Date(subscriptionData.currentEnd).toLocaleDateString()}</Text>.
        </Paragraph>
      ) : (
        <>
          {(subscriptionStatus === 'pending' || subscriptionStatus === 'created') && (
            <>
              <Button
                type="primary"
                onClick={() => window.open(subscriptionData.shortUrl, '_blank')}
                style={{ marginRight: '10px' }}
              >
                Complete Payment
              </Button>
              <Button icon={<CopyOutlined />} onClick={handleCopyLink}>
                Copy Payment Link
              </Button>
            </>
          )}
          {subscriptionStatus !== 'pending' && (
            <Paragraph>
              Your subscription is currently <Text strong>{subscriptionStatus}</Text>.
            </Paragraph>
          )}
        </>
      )}
    </>
  );
};

export default SubscriptionPaymentModal;
