// components/PaymentButton.js
import axiosInstance from '@/config/axios';
import { Button } from 'antd';

const PaymentButton = ({ onSuccess }) => {
  function loadScript(src) {
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
  }

  async function displayRazorpay() {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    // creating a new order
    const result = await axiosInstance.post('/user/order');

    if (!result) {
      alert('Server error. Are you online?');
      return;
    }

    // Getting the order details back
    const { razorpayOrderId, amount, currency, key } = result.data;

    const options = {
      key: key,
      amount: amount.toString(),
      currency: currency,
      name: 'ShopHub',
      description: 'Test Transaction',
      // image: { logo },
      order_id: razorpayOrderId,
      handler: async function (response) {
        const data = {
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        onSuccess(data);
      },
      prefill: {
        name: 'ShopHub',
        email: 'shophub@shophub.com',
        contact: '9999999999',
      },
      notes: {
        address: 'Shop Hub',
      },
      theme: {
        color: '#61dafb',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <Button type="primary" onClick={displayRazorpay}>
      Pay with Razorpay
    </Button>
  );
};

export default PaymentButton;
