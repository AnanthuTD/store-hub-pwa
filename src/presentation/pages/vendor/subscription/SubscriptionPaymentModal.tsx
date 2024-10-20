import React, { useState } from 'react';
import { Modal, Button, Typography, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const SubscriptionPaymentModal = ({ subscriptionData, onClose }) => {
  const [isModalVisible, setIsModalVisible] = useState(true);

  const handlePayment = () => {
    if (subscriptionData && subscriptionData.shortUrl) {
      window.open(subscriptionData.shortUrl, '_blank');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(subscriptionData.shortUrl);
    message.success('Payment link copied to clipboard!');
  };

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
        <Paragraph>
          <Text strong>Amount: </Text> ₹{subscriptionData.amount}
        </Paragraph>
        <Paragraph>
          <Text strong>Status: </Text>
          <Text type={subscriptionData.status === 'pending' ? 'warning' : 'success'}>
            {subscriptionData.status.charAt(0).toUpperCase() + subscriptionData.status.slice(1)}
          </Text>
        </Paragraph>
        {(subscriptionData.status === 'pending' || subscriptionData.status === 'created') && (
          <>
            <Button type="primary" onClick={handlePayment} style={{ marginRight: '10px' }}>
              Complete Payment
            </Button>
            <Button icon={<CopyOutlined />} onClick={handleCopyLink}>
              Copy Payment Link
            </Button>
          </>
        )}
        {subscriptionData.status !== 'pending' && (
          <Paragraph>
            Your subscription is currently <Text strong>{subscriptionData.status}</Text>.
          </Paragraph>
        )}
      </Typography>
    </Modal>
  );
};

export default SubscriptionPaymentModal;
