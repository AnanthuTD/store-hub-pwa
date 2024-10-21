import React, { useEffect, useState } from 'react';
import { Table, Typography, Tag, Button } from 'antd';
import axiosInstance from '@/config/axios';
import SubscriptionPaymentModal from './SubscriptionPaymentModal';

const { Title } = Typography;

const SubscriptionTable = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axiosInstance.get('/vendor/subscriptions');
        setSubscriptions(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  const columns = [
    {
      title: 'Vendor',
      dataIndex: 'vendorId',
      key: 'vendorId',
      render: (vendorId) => <Typography.Text>{vendorId}</Typography.Text>, // Assuming vendorId will be displayed
    },
    {
      title: 'Subscription Type',
      dataIndex: 'subscriptionType',
      key: 'subscriptionType',
      render: (type) => <Typography.Text>{type}</Typography.Text>,
    },
    {
      title: 'Amount (₹)',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `₹${amount}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color;
        switch (status) {
          case 'active':
            color = 'green';
            break;
          case 'pending':
            color = 'orange';
            break;
          case 'canceled':
          case 'expired':
            color = 'red';
            break;
          default:
            color = 'blue';
        }
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <span>
          <Button onClick={() => setSelectedSubscription(record)} type="primary">
            Details
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Title level={3}>Vendor Subscriptions</Title>
      <Table
        columns={columns}
        dataSource={subscriptions}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
      {selectedSubscription && (
        <SubscriptionPaymentModal
          onClose={() => setSelectedSubscription(null)}
          subscriptionData={selectedSubscription}
          key={'sub-history'}
        />
      )}
    </div>
  );
};

export default SubscriptionTable;
