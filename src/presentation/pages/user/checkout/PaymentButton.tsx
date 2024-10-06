import React, { useState } from 'react';
import { Button, message, Modal, List } from 'antd';
import axiosInstance from '@/config/axios';
import { AxiosError } from 'axios';

const PaymentButton = ({ onSuccess, refetch, createOrder }) => {
  const [outOfStockProducts, setOutOfStockProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

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

    // Creating a new order
    try {
      const order = await createOrder();
      if (!order) {
        return;
      }

      const { razorpayOrderId, amount, currency, key, orderId, outOfStockProducts } = order.data;

      // Check if there are any out-of-stock products
      if (outOfStockProducts && outOfStockProducts.length > 0) {
        setOutOfStockProducts(outOfStockProducts); // Set the out-of-stock products in state
        setOrderDetails({ razorpayOrderId, amount, currency, key, orderId }); // Store order details
        setShowModal(true); // Show modal to the user
        refetch();
      } else {
        proceedToPayment({ razorpayOrderId, amount, currency, key, orderId });
      }
    } catch (error) {
      console.error(error);
      message.error('Failed to create order');
    }
  }

  const proceedToPayment = ({ razorpayOrderId, amount, currency, key, orderId }) => {
    const options = {
      key: key,
      amount: amount.toString(),
      currency: currency,
      name: 'ShopHub',
      description: 'Test Transaction',
      order_id: razorpayOrderId,
      handler: async function (response) {
        const data = {
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        onSuccess(data);
      },
      modal: {
        ondismiss: async function () {
          try {
            // If the user closes the payment window, cancel the order on the backend
            await axiosInstance.post('/user/order/cancel', { orderId: orderId });
          } catch (error) {
            if (error instanceof AxiosError) message.error(error.response?.data.message);
            else message.error('Failed to cancel the order');
          }
        },
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
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    if (orderDetails) {
      proceedToPayment(orderDetails);
    }
  };

  return (
    <>
      <Button type="primary" onClick={displayRazorpay}>
        Pay with Razorpay
      </Button>

      <Modal
        title="Out of Stock Products"
        open={showModal}
        onOk={handleModalConfirm}
        onCancel={() => setShowModal(false)}
        okText="Proceed to Payment"
        cancelText="Cancel"
      >
        <p>The following products are out of stock:</p>
        <List
          dataSource={outOfStockProducts}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta title={item} />
            </List.Item>
          )}
        />
        <p>Do you want to proceed with the remaining items?</p>
      </Modal>
    </>
  );
};

export default PaymentButton;
