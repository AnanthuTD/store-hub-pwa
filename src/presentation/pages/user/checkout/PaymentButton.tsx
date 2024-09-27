// components/PaymentButton.js
import axiosInstance from '@/config/axios';
import { Button } from 'antd';
import { useEffect } from 'react';

const PaymentButton = ({ totalPrice, onSuccess }) => {
  console.log(totalPrice, onSuccess);

  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    loadScript('https://checkout.razorpay.com/v1/checkout.js');
  }, []);

  /*   const handlePayment = () => {
    const options = {
      key: 'YOUR_RAZORPAY_KEY',
      amount: totalPrice * 100,
      currency: 'INR',
      name: 'Your App Name',
      description: 'Purchase Description',
      handler: function (response) {
        onSuccess(response.razorpay_payment_id);
      },
      prefill: {
        name: 'Ananthu',
        email: 'ananthu@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }; */

  const directOrder = () => {
    axiosInstance.post('/user/order');
  };

  return (
    <Button type="primary" onClick={directOrder}>
      Pay with Razorpay
    </Button>
  );
};

export default PaymentButton;
