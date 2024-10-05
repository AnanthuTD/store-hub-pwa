// src/presentation/components/WalletComponent.tsx

import React, { useEffect, useState } from 'react';
import { Input, List, message, Card, Typography } from 'antd';
import { VerifyTransactionProps, WalletService } from './walletService';
import RazorpayButton from './RazorpayButton';

const { Title } = Typography;

const statusColors = {
  PENDING: 'orange',
  SUCCESS: 'green',
  FAILED: 'red',
};

const WalletComponent: React.FC = () => {
  const {
    getBalance,
    createTransaction,
    getTransactionHistory,
    verifyTransaction,
    cancelTransaction,
  } = new WalletService();

  const [balance, setBalance] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [refetch, setRefetch] = useState<boolean>(false);

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const walletBalance = await getBalance();
        setBalance(walletBalance || 0); // Ensure balance defaults to 0

        const transactionHistory = await getTransactionHistory();
        setTransactions(transactionHistory || []);
      } catch (error) {
        message.error('Failed to fetch wallet data');
      }
    };

    fetchWalletData();
  }, [refetch, getBalance, getTransactionHistory]);

  const handleSuccess = async (paymentData: VerifyTransactionProps) => {
    try {
      const { message: responseMessage } = await verifyTransaction(paymentData);
      message.success(responseMessage);
      setRefetch((prev) => !prev);
    } catch (error) {
      message.error((error as Error).message || 'Failed to verify payment');
    }
  };

  const handleDismiss = async (transactionId: string) => {
    try {
      const resMessage = await cancelTransaction(transactionId);
      message.success(resMessage);
    } catch (error) {
      message.error((error as Error).message);
    }
  };

  const handleCreateTransaction = async () => {
    if (amount <= 0) {
      message.error('Please enter a valid amount');
      return;
    }

    try {
      const transaction = await createTransaction(amount);
      return transaction; // Return transaction details for RazorpayButton
    } catch (error) {
      message.error('Failed to create transaction');
      console.error(error);
    }
  };

  return (
    <Card title="Wallet">
      <Title level={4}>Wallet Balance: ₹{balance || 0}</Title>
      <Input
        placeholder="Enter amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />

      {/* Razorpay Payment Button */}
      <RazorpayButton
        createTransaction={handleCreateTransaction}
        onDismiss={handleDismiss}
        onSuccess={handleSuccess}
        key={'razorpay-button'}
      />

      <Title level={5} style={{ marginTop: '20px' }}>
        Transaction History
      </Title>
      <List
        bordered
        dataSource={transactions}
        renderItem={(item) => (
          <List.Item>
            <strong>{item.type}</strong>: ₹{item.amount} on {new Date(item.date).toLocaleString()}
            <span style={{ color: statusColors[item.status] || 'black', marginLeft: '10px' }}>
              ({item.status})
            </span>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default WalletComponent;
