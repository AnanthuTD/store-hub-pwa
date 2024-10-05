import React, { useState } from 'react';
import { Button, message } from 'antd';
import { AxiosError } from 'axios';
import { VerifyTransactionProps } from './walletService';

interface RazorpayButtonProps {
  onSuccess: (paymentData: VerifyTransactionProps) => void;
  onDismiss: (paymentId: string) => void;
  createTransaction: () => Promise<{
    razorpayOrderId: string;
    amount: number;
    currency: string;
    key: string;
    transactionId: string;
  }>;
}

const RazorpayButton: React.FC<RazorpayButtonProps> = ({
  onSuccess,
  onDismiss,
  createTransaction,
}) => {
  const [isPaymentLoading, setPaymentLoading] = useState<boolean>(false);

  // Function to load Razorpay's script
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Function to handle payment processing
  const displayRazorpay = async (): Promise<void> => {
    setPaymentLoading(true);

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      message.error('Failed to load Razorpay SDK. Please check your connection.');
      setPaymentLoading(false);
      return;
    }

    try {
      // Create transaction/order and get necessary details
      const result = await createTransaction();

      if (!result) {
        message.error('Failed to create the transaction. Please try again later.');
        setPaymentLoading(false);
        return;
      }

      const { razorpayOrderId, amount, currency, key, transactionId } = result;
      initiateRazorpayPayment({ razorpayOrderId, amount, currency, key, transactionId });
    } catch (error) {
      if (error instanceof AxiosError) {
        message.error('An error occurred while creating the transaction.');
        console.error(error.message);
      }
      setPaymentLoading(false);
    }
  };

  // Function to initiate the Razorpay payment flow
  const initiateRazorpayPayment = ({
    razorpayOrderId,
    amount,
    currency,
    key,
    transactionId,
  }: {
    razorpayOrderId: string;
    amount: number;
    currency: string;
    key: string;
    transactionId: string;
  }): void => {
    const options = {
      key,
      amount: amount.toString(),
      currency,
      name: 'ShopHub',
      description: 'Transaction for Order #' + transactionId,
      order_id: razorpayOrderId,
      handler: async function (response) {
        try {
          onSuccess({ ...response, transactionId }); // Callback to handle success scenario
        } catch (error) {
          console.error('Error in payment success handler:', error);
          message.error('Payment was successful, but processing failed. Contact support.');
        } finally {
          setPaymentLoading(false);
        }
      },
      modal: {
        ondismiss: () => onDismiss(transactionId),
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

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      <Button type="primary" onClick={displayRazorpay} loading={isPaymentLoading}>
        Pay with Razorpay
      </Button>
    </>
  );
};

export default RazorpayButton;
