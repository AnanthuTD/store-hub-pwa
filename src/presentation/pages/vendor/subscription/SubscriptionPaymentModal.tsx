import React, { useState } from 'react';
import { Modal, Button, Typography, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
// import axiosInstance from '@/config/axios';

const { Title, Text, Paragraph } = Typography;

const SubscriptionPaymentModal = ({ subscriptionData, onClose }) => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [subscriptionStatus /* , setSubscriptionStatus */] = useState(subscriptionData.status);

  /*  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  } */

  /*   const handlePayment = async () => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const options = {
      key: subscriptionData.razorpayKeyId,
      subscription_id: subscriptionData.razorpaySubscriptionId,
      description: subscriptionData.description || 'Subscription Plan',
      callback_url: subscriptionData.callbackUrl,
      prefill: subscriptionData.prefill || {
        name: 'John Doe',
        email: 'john.doe@example.com',
        contact: '+919876543210',
      },
      notes: subscriptionData.notes || {},
      theme: {
        color: '#F37254',
      },
      handler: function (response) {
        message.success('Payment successful: ' + response.razorpay_payment_id);
        // You can update your backend or state here to reflect the payment status
        axiosInstance.post('/vendor/subscriptions/payment-success', response).then(() => {
          setSubscriptionStatus('active');
        });
      },
      modal: {
        ondismiss: function () {
          message.warning('Payment was closed by the user');
        },
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }; */

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
          <Text type={subscriptionStatus === 'pending' ? 'warning' : 'success'}>
            {subscriptionStatus?.charAt(0).toUpperCase() + subscriptionStatus?.slice(1)}
          </Text>
        </Paragraph>
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
      </Typography>
    </Modal>
  );
};

export default SubscriptionPaymentModal;
