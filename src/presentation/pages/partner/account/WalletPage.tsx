// src/presentation/components/WalletComponent.tsx

import React, { useEffect, useState } from 'react';
import { List, message, Card, Typography } from 'antd';
import { WalletService } from './walletService';

const { Title } = Typography;

const statusColors = {
  PENDING: 'orange',
  SUCCESS: 'green',
  FAILED: 'red',
};

const WalletComponent: React.FC = () => {
  const { getBalance, getTransactionHistory } = new WalletService();

  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<any[]>([]);

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
  }, [getBalance, getTransactionHistory]);

  return (
    <Card title="Wallet">
      <Title level={4}>Wallet Balance: ₹{balance || 0}</Title>

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
